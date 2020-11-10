open Js.Typed_array;

let create = () => JobEntity.create("update_pathTracing");

let _findIndex = (isSameFunc, component, components) => {
  components
  ->ListSt.reducei(None, (indexOpt, sourceComponent, index) => {
      switch (indexOpt) {
      | Some(_) => indexOpt
      | None => isSameFunc(sourceComponent, component) ? Some(index) : None
      }
    })
  ->OptionSt.get;
};

let _buildAndSetSceneDescBufferData =
    (
      device,
      allRenderGameObjects,
      allRenderGeometries,
      allRenderBSDFMaterials,
    ) => {
  let gameObjectCount = allRenderGameObjects->ListSt.length;

  let dataCount = 4 + 12 + 16;
  let bufferData = Float32Array.fromLength(gameObjectCount * dataCount);
  let bufferSize = bufferData->Float32Array.byteLength;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst
        lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.storage,
      (),
    );

  allRenderGameObjects
  ->ListSt.traverseResultM(gameObject => {
      Tuple3.collectOption(
        GameObjectRunAPI.getTransform(gameObject),
        GameObjectRunAPI.getGeometry(gameObject),
        GameObjectRunAPI.getBSDFMaterial(gameObject),
      )
    })
  ->Result.bind(list => {
      list->ListSt.traverseReduceResultM(
        0, (offset, (transform, geometry, bsdfMaterial)) => {
        Tuple2.collectResult(
          _findIndex(GeometryRunAPI.isSame, geometry, allRenderGeometries),
          _findIndex(
            BSDFMaterialRunAPI.isSame,
            bsdfMaterial,
            allRenderBSDFMaterials,
          ),
        )
        ->Result.bind(((geometryIndex, bsdfMaterialIndex)) => {
            ListResult.mergeResults([
              TypeArrayCPRepoUtils.setFloat2(
                offset + 0,
                (
                  geometryIndex->Belt.Float.fromInt,
                  bsdfMaterialIndex->Belt.Float.fromInt,
                ),
                bufferData,
              ),
              TypeArrayCPRepoUtils.setMat3Data(
                offset + 4,
                TransformRunAPI.getNormalMatrix(transform)
                ->NormalMatrixVO.value,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat16WithFloat32Array(
                offset + 4 + 12,
                TransformRunAPI.getLocalToWorldMatrix(transform)
                ->LocalToWorldMatrixVO.value,
                bufferData,
              ),
            ])
          })
        ->Result.mapSuccess(() => {offset + 4 + 12 + 16})
      })
    })
  ->Result.mapSuccess(_ => {
      WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubFloat32Data(
        0,
        bufferData,
        buffer->StorageBufferVO.value,
      );

      PathTracingPassCPRepo.setSceneDescBufferData((
        buffer,
        bufferSize,
        bufferData,
      ));
    });
};

let _computeVertexCount = vertices => {
  vertices->VerticesVO.getCount;
};

let _computeFaceCount = indices => {
  indices->IndicesVO.getCount;
};

let _computeFaceOptCount = indicesOpt => {
  switch (indicesOpt) {
  | None => 0
  | Some(indices) => indices->_computeFaceCount
  };
};

let _buildAndSetPointIndexBufferData = (device, allRenderGeometries) => {
  let geometryCount = allRenderGeometries->ListSt.length;
  let dataCount = 2;
  let bufferData = Uint32Array.fromLength(geometryCount * dataCount);
  let bufferSize = bufferData->Uint32Array.byteLength;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst
        lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.storage,
      (),
    );

  let stride = dataCount;

  allRenderGeometries
  ->ListSt.traverseReduceResultMi(
      (0, 0), ((vertexIndex, faceIndex), (geometryIndex, geometry)) => {
      ListResult.mergeResults([
        TypeArrayCPRepoUtils.setUint32_1(
          geometryIndex * stride,
          vertexIndex,
          bufferData,
        ),
        TypeArrayCPRepoUtils.setUint32_1(
          geometryIndex * stride + 1,
          faceIndex,
          bufferData,
        ),
      ])
      ->Result.mapSuccess(() =>
          (
            vertexIndex
            + GeometryRunAPI.getVertices(geometry)->_computeVertexCount,
            faceIndex
            + GeometryRunAPI.getIndices(geometry)->_computeFaceOptCount,
          )
        )
    })
  ->Result.mapSuccess(_ => {
      WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubUint32Data(
        0,
        bufferData,
        buffer->StorageBufferVO.value,
      );

      PathTracingPassCPRepo.setPointIndexBufferData((
        buffer,
        bufferSize,
        bufferData,
      ));
    });
};

let _computeAllVertexCount = allRenderGeometries => {
  allRenderGeometries->ListSt.reduce(0, (vertexCount, geometry) => {
    vertexCount + GeometryRunAPI.getVertices(geometry)->_computeVertexCount
  });
};

let _flipY = texCoordY => {
  1.0 -. texCoordY;
};

let _getVertexBufferStride = () => 16;

let _createVertexBufferData = allRenderGeometries => {
  let bufferData =
    Float32Array.fromLength(
      _computeAllVertexCount(allRenderGeometries) * _getVertexBufferStride(),
    );

  let _ =
    allRenderGeometries->ListSt.reduce(
      0,
      (offset, geometry) => {
        let stride = _getVertexBufferStride();

        let vertices = GeometryRunAPI.getVertices(geometry)->VerticesVO.value;

        let length = vertices->Float32Array.length;

        let i = ref(0);
        let j = ref(offset);
        while (i^ < length) {
          Float32Array.unsafe_set(
            bufferData,
            j^,
            Float32Array.unsafe_get(vertices, i^),
          );
          Float32Array.unsafe_set(
            bufferData,
            j^ + 1,
            Float32Array.unsafe_get(vertices, i^ + 1),
          );
          Float32Array.unsafe_set(
            bufferData,
            j^ + 2,
            Float32Array.unsafe_get(vertices, i^ + 2),
          );

          i := i^ + 3;
          j := j^ + stride;
        };

        let newOffset = j^;

        switch (
          GeometryRunAPI.getTexCoords(geometry)
          ->OptionSt.map(TexCoordsVO.value)
        ) {
        | Some(texCoords) =>
          let length = texCoords->Float32Array.length;

          let getTexCoordYFunc =
            GeometryRunAPI.isFlipTexCoordY(geometry)
              ? (i => Float32Array.unsafe_get(texCoords, i^ + 1)->_flipY)
              : (i => Float32Array.unsafe_get(texCoords, i^ + 1));

          let i = ref(0);
          let j = ref(offset);
          while (i^ < length) {
            Float32Array.unsafe_set(
              bufferData,
              j^ + 4,
              Float32Array.unsafe_get(texCoords, i^),
            );
            Float32Array.unsafe_set(bufferData, j^ + 5, getTexCoordYFunc(i));

            i := i^ + 2;
            j := j^ + stride;
          };
        | None => ()
        };

        switch (
          GeometryRunAPI.getNormals(geometry)->OptionSt.map(NormalsVO.value)
        ) {
        | Some(normals) =>
          let length = normals->Float32Array.length;

          let i = ref(0);
          let j = ref(offset);
          while (i^ < length) {
            Float32Array.unsafe_set(
              bufferData,
              j^ + 8,
              Float32Array.unsafe_get(normals, i^),
            );
            Float32Array.unsafe_set(
              bufferData,
              j^ + 9,
              Float32Array.unsafe_get(normals, i^ + 1),
            );
            Float32Array.unsafe_set(
              bufferData,
              j^ + 10,
              Float32Array.unsafe_get(normals, i^ + 2),
            );

            i := i^ + 3;
            j := j^ + stride;
          };
        | None => ()
        };

        switch (
          GeometryRunAPI.getTangents(geometry)
          ->OptionSt.map(TangentsVO.value)
        ) {
        | Some(tangents) =>
          let length = tangents->Float32Array.length;

          let i = ref(0);
          let j = ref(offset);
          while (i^ < length) {
            Float32Array.unsafe_set(
              bufferData,
              j^ + 12,
              Float32Array.unsafe_get(tangents, i^),
            );
            Float32Array.unsafe_set(
              bufferData,
              j^ + 13,
              Float32Array.unsafe_get(tangents, i^ + 1),
            );
            Float32Array.unsafe_set(
              bufferData,
              j^ + 14,
              Float32Array.unsafe_get(tangents, i^ + 2),
            );

            i := i^ + 3;
            j := j^ + stride;
          };
        | None => ()
        };

        newOffset;
      },
    );

  bufferData;
};

let _buildAndSetVertexBufferData = (device, allRenderGeometries) => {
  let bufferData = _createVertexBufferData(allRenderGeometries);
  let bufferSize = bufferData->Float32Array.byteLength;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst
        lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.storage,
      (),
    );

  WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubFloat32Data(
    0,
    bufferData,
    buffer->StorageBufferVO.value,
  );

  PathTracingPassCPRepo.setVertexBufferData((buffer, bufferSize, bufferData));
};

let _computeAllFaceCount = allRenderGeometries => {
  allRenderGeometries->ListSt.reduce(0, (faceCount, geometry) => {
    faceCount + GeometryRunAPI.getIndices(geometry)->_computeFaceOptCount
  });
};

let _createIndexBufferData = allRenderGeometries => {
  let stride = 1;
  let bufferData =
    Uint32Array.fromLength(
      _computeAllFaceCount(allRenderGeometries) * stride,
    );

  allRenderGeometries
  ->ListSt.traverseReduceResultM(0, (offset, geometry) => {
      switch (GeometryRunAPI.getIndices(geometry)) {
      | Some(indices) =>
        TypeArrayCPRepoUtils.fillUint32ArrayWithOffset(
          bufferData,
          indices->IndicesVO.value,
          offset,
        )
        ->Result.mapSuccess(() => {offset + indices->_computeFaceCount})
      | None => Result.succeed(offset)
      }
    })
  ->Result.mapSuccess(_ => bufferData);
};

let _buildAndSetIndexBufferData = (device, allRenderGeometries) => {
  _createIndexBufferData(allRenderGeometries)
  ->Result.mapSuccess(bufferData => {
      let bufferSize = bufferData->Uint32Array.byteLength;

      let buffer =
        StorageBufferVO.createFromDevice(
          ~device,
          ~bufferSize,
          ~usage=
            WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst
            lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.storage,
          (),
        );

      WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubUint32Data(
        0,
        bufferData,
        buffer->StorageBufferVO.value,
      );

      PathTracingPassCPRepo.setIndexBufferData((buffer, bufferSize));
    });
};

let _getMapLayerIndexForNotExist = () => 5000;

let _getMapLayerIndex = mapImageIdOpt => {
  (
    switch (mapImageIdOpt) {
    | None => _getMapLayerIndexForNotExist()
    | Some(imageId) =>
      TextureArrayWebGPUCPRepo.getLayerIndex(imageId->ImageIdVO.value)
      ->OptionSt.getWithDefault(_getMapLayerIndexForNotExist())
    }
  )
  ->Belt.Float.fromInt;
};

let _computeMapScale = mapImageIdOpt => {
  let defaultScale = (1.0, 1.0);

  (
    switch (mapImageIdOpt) {
    | None => defaultScale
    | Some(imageId) =>
      switch (AssetRunAPI.getImageData(imageId)) {
      | None => defaultScale
      | Some(({width, height}: ImageRepoType.data)) =>
        let (textureArrayLayerWidth, textureArrayLayerHeight) =
          WebGPUCoreRunAPI.getTextureArrayLayerSize();

        (
          Number.dividInt(width, textureArrayLayerWidth),
          Number.dividInt(height, textureArrayLayerHeight),
        );
      }
    }
  )
  ->Contract.ensureCheck(
      ((scaleX, scaleY)) => {
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|map scale in (0.0, 1.0]|j},
                ~actual={j|not |j},
              ),
              () => {
              scaleX
              >. 0.0
              && scaleX
              <=. 1.0
              && scaleY
              >. 0.0
              && scaleY
              <=. 1.0
            })
          )
        )
      },
      DpContainer.unsafeGetConfigDp().getIsDebug(),
    );
};

let _buildAndSetBSDFMaterialBufferData = (device, allRenderBSDFMaterials) => {
  let bsdfMaterialCount = allRenderBSDFMaterials->ListSt.length;
  let dataCount = 32;
  let bufferData = Float32Array.fromLength(bsdfMaterialCount * dataCount);
  let bufferSize = bufferData->Float32Array.byteLength;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst
        lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.storage,
      (),
    );

  allRenderBSDFMaterials
  ->ListSt.traverseReduceResultM(
      0,
      (offset, bsdfMaterial) => {
        let diffuse =
          BSDFMaterialRunAPI.getDiffuseColor(bsdfMaterial)
          ->DiffuseVO.getPrimitiveValue;
        let specularColor =
          BSDFMaterialRunAPI.getSpecularColor(bsdfMaterial)
          ->SpecularColorVO.getPrimitiveValue;
        let specular =
          BSDFMaterialRunAPI.getSpecular(bsdfMaterial)->SpecularVO.value;
        let roughness =
          BSDFMaterialRunAPI.getRoughness(bsdfMaterial)->RoughnessVO.value;
        let metalness =
          BSDFMaterialRunAPI.getMetalness(bsdfMaterial)->MetalnessVO.value;
        let transmission =
          BSDFMaterialRunAPI.getTransmission(bsdfMaterial)
          ->TransmissionVO.value;
        let ior = BSDFMaterialRunAPI.getIOR(bsdfMaterial)->IORVO.value;

        let diffuseMapImageId =
          BSDFMaterialRunAPI.getDiffuseMapImageId(bsdfMaterial);
        let channelRoughnessMetallicMapImageId =
          BSDFMaterialRunAPI.getChannelRoughnessMetallicMapImageId(
            bsdfMaterial,
          );
        let emissionMapImageId =
          BSDFMaterialRunAPI.getEmissionMapImageId(bsdfMaterial);
        let normalMapImageId =
          BSDFMaterialRunAPI.getNormalMapImageId(bsdfMaterial);
        let transmissionMapImageId =
          BSDFMaterialRunAPI.getTransmissionMapImageId(bsdfMaterial);
        let specularMapImageId =
          BSDFMaterialRunAPI.getSpecularMapImageId(bsdfMaterial);

        Tuple6.collectResult(
          _computeMapScale(diffuseMapImageId),
          _computeMapScale(channelRoughnessMetallicMapImageId),
          _computeMapScale(emissionMapImageId),
          _computeMapScale(normalMapImageId),
          _computeMapScale(transmissionMapImageId),
          _computeMapScale(specularMapImageId),
        )
        ->Result.bind(
            (
              (
                diffuseMapScale,
                channelRoughnessMetallicMapScale,
                emissionMapScale,
                normalMapScale,
                transmissionMapScale,
                specularMapScale,
              ),
            ) => {
            ListResult.mergeResults([
              TypeArrayCPRepoUtils.setFloat3(offset + 0, diffuse, bufferData),
              TypeArrayCPRepoUtils.setFloat3(
                offset + 4,
                specularColor,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat4(
                offset + 8,
                (metalness, roughness, specular, transmission),
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat4(
                offset + 12,
                (
                  ior,
                  _getMapLayerIndex(diffuseMapImageId),
                  _getMapLayerIndex(channelRoughnessMetallicMapImageId),
                  _getMapLayerIndex(emissionMapImageId),
                ),
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat3(
                offset + 16,
                (
                  _getMapLayerIndex(normalMapImageId),
                  _getMapLayerIndex(transmissionMapImageId),
                  _getMapLayerIndex(specularMapImageId),
                ),
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 20,
                diffuseMapScale,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 22,
                channelRoughnessMetallicMapScale,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 24,
                emissionMapScale,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 26,
                normalMapScale,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 28,
                transmissionMapScale,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 30,
                specularMapScale,
                bufferData,
              ),
            ])
          })
        ->Result.mapSuccess(() => {offset + 32});
      },
    )
  ->Result.mapSuccess(_ => {
      WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubFloat32Data(
        0,
        bufferData,
        buffer->StorageBufferVO.value,
      );
      PathTracingPassCPRepo.setBSDFMaterialBufferData((
        buffer,
        bufferSize,
        bufferData,
      ));
    });
};

let _buildAndSetAllBufferData = (device, sceneGameObject) => {
  let allRenderGeometries =
    GameObjectRunAPI.getAllRenderGeometries(sceneGameObject);
  let allRenderBSDFMaterials =
    GameObjectRunAPI.getAllRenderBSDFMaterials(sceneGameObject);

  ListResult.mergeResults([
    _buildAndSetSceneDescBufferData(
      device,
      GameObjectRunAPI.getAllRenderGameObjects(sceneGameObject),
      allRenderGeometries,
      allRenderBSDFMaterials,
    ),
    _buildAndSetPointIndexBufferData(device, allRenderGeometries),
    _buildAndSetVertexBufferData(device, allRenderGeometries)->Result.succeed,
    _buildAndSetIndexBufferData(device, allRenderGeometries),
    _buildAndSetBSDFMaterialBufferData(device, allRenderBSDFMaterials),
  ]);
};

let _createAndAddRayTracingBindGroup =
    (
      device,
      instanceContainer,
      (
        (sceneDescBuffer, sceneDescBufferSize, _),
        (pointIndexBuffer, pointIndexBufferSize, _),
        (vertexBuffer, vertexBufferSize, _),
        (indexBuffer, indexBufferSize),
        (bsdfMaterialBuffer, bsdfMaterialBufferSize, _),
        textureSampler,
        textureArrayView,
      ),
      ((pixelBuffer, pixelBufferSize), (commonBuffer, commonBufferData)),
    ) => {
  let rtBindGroupLayout =
    WebGPUCoreDpRunAPI.unsafeGet().device.createBindGroupLayout(
      {
        "entries": [|
          IWebGPUCoreDp.layoutBinding(
            ~binding=0,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_generation
              lor WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.
                    ray_closest_hit,
            ~type_="acceleration-container",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=1,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_generation,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=2,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_generation,
            ~type_="uniform-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=3,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=4,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=5,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=6,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=7,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=8,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_closest_hit,
            ~type_="sampler",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=9,
            ~visibility=
              WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_closest_hit,
            ~type_="sampled-texture",
            ~viewDimension="2d-array",
            (),
          ),
        |],
      },
      device,
    );

  PathTracingPassCPRepo.addStaticBindGroupData(
    0,
    WebGPURayTracingDpRunAPI.unsafeGet().device.createRayTracingBindGroup(
      {
        "layout": rtBindGroupLayout,
        "entries": [|
          IWebGPURayTracingDp.binding(
            ~binding=0,
            ~accelerationContainer=instanceContainer,
            ~offset=0,
            ~size=0,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=1,
            ~buffer=pixelBuffer->StorageBufferVO.value,
            ~offset=0,
            ~size=pixelBufferSize,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=2,
            ~buffer=commonBuffer->UniformBufferVO.value,
            ~offset=0,
            ~size=commonBufferData->PassCPDoService.getCommonBufferDataSize,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=3,
            ~buffer=sceneDescBuffer->StorageBufferVO.value,
            ~offset=0,
            ~size=sceneDescBufferSize,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=4,
            ~buffer=pointIndexBuffer->StorageBufferVO.value,
            ~offset=0,
            ~size=pointIndexBufferSize,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=5,
            ~buffer=vertexBuffer->StorageBufferVO.value,
            ~offset=0,
            ~size=vertexBufferSize,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=6,
            ~buffer=indexBuffer->StorageBufferVO.value,
            ~offset=0,
            ~size=indexBufferSize,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=7,
            ~buffer=bsdfMaterialBuffer->StorageBufferVO.value,
            ~offset=0,
            ~size=bsdfMaterialBufferSize,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=8,
            ~sampler=textureSampler,
            ~size=0,
            (),
          ),
          IWebGPURayTracingDp.binding(
            ~binding=9,
            ~textureView=textureArrayView,
            ~size=0,
            (),
          ),
        |],
      },
      device,
    ),
  );

  rtBindGroupLayout;
};

let _createAndSetPipeline = (device, rtBindGroupLayout) => {
  Tuple3.collectOption(
    PathTracingPassCPRepo.getShaderBindingTable(),
    PathTracingPassCPRepo.getCameraBindGroupLayout(),
    PathTracingPassCPRepo.getDirectionLightBindGroupLayout(),
  )
  ->Result.mapSuccess(
      (
        (
          shaderBindingTable,
          cameraBindGroupLayout,
          directionLightBindGroupLayout,
        ),
      ) => {
      WebGPURayTracingDpRunAPI.unsafeGet().device.createRayTracingPipeline(
        IWebGPURayTracingDp.pipelineRayTracingDescriptor(
          ~layout=
            WebGPUCoreDpRunAPI.unsafeGet().device.createPipelineLayout(
              {
                "bindGroupLayouts": [|
                  rtBindGroupLayout,
                  cameraBindGroupLayout,
                  directionLightBindGroupLayout,
                |],
              },
              device,
            ),
          ~rayTracingState={
            IWebGPURayTracingDp.rayTracingState(
              ~shaderBindingTable,
              ~maxRecursionDepth=1,
              ~maxPayloadSize=
                3
                * 3
                * Float32Array._BYTES_PER_ELEMENT
                + 1
                * Uint32Array._BYTES_PER_ELEMENT
                + 1
                * Float32Array._BYTES_PER_ELEMENT
                + 1
                * Float32Array._BYTES_PER_ELEMENT
                + 3
                * Float32Array._BYTES_PER_ELEMENT,
            );
          },
        ),
        device,
      )
      ->PathTracingPassCPRepo.setPipeline
    });
};

let exec = () => {
  Tuple2.collectOption(WebGPUCPRepo.getDevice(), WebGPUCPRepo.getQueue())
  ->Result.bind(((device, queue)) => {
      WebGPURayTracingRunAPI.buildContainers(device, queue)
      ->Result.bind(instanceContainer => {
          _buildAndSetAllBufferData(device, SceneRunAPI.getSceneGameObject())
          ->Result.bind(() => {
              Tuple2.collectOption(
                PassCPRepo.getPixelBufferData(),
                PassCPRepo.getCommonBufferData(),
              )
              ->Result.bind(passAllBufferData => {
                  Tuple7.collectOption(
                    PathTracingPassCPRepo.getSceneDescBufferData(),
                    PathTracingPassCPRepo.getPointIndexBufferData(),
                    PathTracingPassCPRepo.getVertexBufferData(),
                    PathTracingPassCPRepo.getIndexBufferData(),
                    PathTracingPassCPRepo.getBSDFMaterialBufferData(),
                    TextureArrayWebGPUCPRepo.getTextureSampler(),
                    TextureArrayWebGPUCPRepo.getTextureArrayView(),
                  )
                  ->Result.bind(pathTracingAllBufferDataAndTextureArrayData => {
                      _createAndAddRayTracingBindGroup(
                        device,
                        instanceContainer,
                        pathTracingAllBufferDataAndTextureArrayData,
                        passAllBufferData,
                      )
                      ->_createAndSetPipeline(device, _)
                    })
                })
            })
        })
    })
  ->WonderBsMost.Most.just;
};
