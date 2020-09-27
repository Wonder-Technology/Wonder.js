open Js.Typed_array;

let create = () => JobEntity.create("update_pathTracing");

let _buildAndSetSceneDescBufferData = (device, allRenderGameObjects) => {
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
        GameObjectRunAPI.getPBRMaterial(gameObject),
      )
    })
  ->Result.bind(list => {
      list->ListSt.traverseReduceResultM(
        0, (offset, (transform, geometry, pbrMaterial)) => {
        TransformRunAPI.getNormalMatrix(transform)
        ->Result.bind(normalMatrix => {
            ListResult.mergeResults([
              TypeArrayCPRepoUtils.setFloat2(
                offset + 0,
                (
                  geometry->GeometryEntity.value->Belt.Float.fromInt,
                  pbrMaterial->PBRMaterialEntity.value->Belt.Float.fromInt,
                ),
                bufferData,
              ),
              TypeArrayCPRepoUtils.setMat3Data(
                offset + 4,
                normalMatrix->NormalMatrixVO.value,
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

let _convertVertexStartIndexFromAlignedInPOToInVertexBufferData =
    vertexStartIndex => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          test(
            Log.buildAssertMessage(
              ~expect={j|vertexStartIndex:$vertexStartIndex be 3 times|j},
              ~actual={j|not|j},
            ),
            () => {
              let x = Number.dividInt(vertexStartIndex, 3);

              x -. x->Js.Math.floor_float ==. 0.0;
            },
          )
        )
      )
    },
    OtherConfigDpRunAPI.unsafeGet().getIsDebug(),
  )
  ->Result.mapSuccess(() => {vertexStartIndex / 3});
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
  ->ListSt.traverseResultM(geometry => {
      let geometry = geometry->GeometryEntity.value;

      Tuple3.collectResult(
        geometry->Result.succeed,
        PointsGeometryCPRepo.getVertexInfo(geometry),
        PointsGeometryCPRepo.getIndexInfo(geometry),
      );
    })
  ->Result.bind(list => {
      list->ListSt.traverseResultM(
        ((geometry, (vertexStartIndex, _), (faceStartIndex, _))) => {
        _convertVertexStartIndexFromAlignedInPOToInVertexBufferData(
          vertexStartIndex,
        )
        ->Result.bind(vertexStartIndex => {
            ListResult.mergeResults([
              TypeArrayCPRepoUtils.setUint32_1(
                geometry * stride,
                vertexStartIndex,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setUint32_1(
                geometry * stride + 1,
                faceStartIndex,
                bufferData,
              ),
            ])
          })
      })
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

let _buildAndSetVertexBufferData = device => {
  Contract.requireCheck(
    () => {
      open Contract;
      open Operators;

      test(
        Log.buildAssertMessage(
          ~expect={j|vertices.length == normals.length|j},
          ~actual={j|not|j},
        ),
        () => {
          let vertices = PointsGeometryCPRepo.getSubUsedVerticesTypeArr();
          let normals = PointsGeometryCPRepo.getSubUsedNormalsTypeArr();

          vertices->Float32Array.length == normals->Float32Array.length;
        },
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|verticesOffset == normalsOffset|j},
          ~actual={j|not|j},
        ),
        () => {
        PointsGeometryCPRepo.getVerticesOffset()
        == PointsGeometryCPRepo.getNormalsOffset()
      });
    },
    OtherConfigDpRunAPI.unsafeGet().getIsDebug(),
  )
  ->Result.bind(() => {
      PointsGeometryCPRepo.getVertexCount()
      ->Result.mapSuccess(vertexCount => {
          let bufferData = Float32Array.fromLength(vertexCount * 16);
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

          let vertices = PointsGeometryCPRepo.getSubUsedVerticesTypeArr();
          let texCoords = PointsGeometryCPRepo.getSubUsedTexCoordsTypeArr();
          let normals = PointsGeometryCPRepo.getSubUsedNormalsTypeArr();
          let tangents = PointsGeometryCPRepo.getSubUsedTangentsTypeArr();

          let length = vertexCount * 3;

          let i = ref(0);
          let texCoordsIndex = ref(0);
          let j = ref(0);
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

            Float32Array.unsafe_set(
              bufferData,
              j^ + 4,
              Float32Array.unsafe_get(texCoords, texCoordsIndex^),
            );
            Float32Array.unsafe_set(
              bufferData,
              j^ + 5,
              1.0 -. Float32Array.unsafe_get(texCoords, texCoordsIndex^ + 1),
            );

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
            texCoordsIndex := texCoordsIndex^ + 2;
            j := j^ + 16;
          };

          WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubFloat32Data(
            0,
            bufferData,
            buffer->StorageBufferVO.value,
          );

          PathTracingPassCPRepo.setVertexBufferData((
            buffer,
            bufferSize,
            bufferData,
          ));
        })
    });
};

let _buildAndSetIndexBufferData = device => {
  let bufferData = PointsGeometryCPRepo.getCopyUsedIndicesTypeArr();
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
      | Some(({width, height}: ImagePOType.data)) =>
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
      DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
    );
};

let _buildAndSetPBRMaterialBufferData = (device, allRenderPBRMaterials) => {
  let pbrMaterialCount = allRenderPBRMaterials->ListSt.length;
  let dataCount = 4 + 4 + 4 + 8;
  let bufferData = Float32Array.fromLength(pbrMaterialCount * dataCount);
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

  allRenderPBRMaterials
  ->ListSt.traverseReduceResultM(
      0,
      (offset, pbrMaterial) => {
        let diffuse =
          PBRMaterialRunAPI.getDiffuseColor(pbrMaterial)
          ->DiffuseVO.getPrimitiveValue;
        let specular =
          PBRMaterialRunAPI.getSpecular(pbrMaterial)->SpecularVO.value;
        let roughness =
          PBRMaterialRunAPI.getRoughness(pbrMaterial)->RoughnessVO.value;
        let metalness =
          PBRMaterialRunAPI.getMetalness(pbrMaterial)->MetalnessVO.value;

        let diffuseMapImageId =
          PBRMaterialRunAPI.getDiffuseMapImageId(pbrMaterial);
        let channelRoughnessMetallicMapImageId =
          PBRMaterialRunAPI.getChannelRoughnessMetallicMapImageId(
            pbrMaterial,
          );
        let emissionMapImageId =
          PBRMaterialRunAPI.getEmissionMapImageId(pbrMaterial);
        let normalMapImageId =
          PBRMaterialRunAPI.getNormalMapImageId(pbrMaterial);

        Tuple4.collectResult(
          _computeMapScale(diffuseMapImageId),
          _computeMapScale(channelRoughnessMetallicMapImageId),
          _computeMapScale(emissionMapImageId),
          _computeMapScale(normalMapImageId),
        )
        ->Result.bind(
            (
              (
                diffuseMapScale,
                channelRoughnessMetallicMapScale,
                emissionMapScale,
                normalMapScale,
              ),
            ) => {
            ListResult.mergeResults([
              TypeArrayCPRepoUtils.setFloat3(offset + 0, diffuse, bufferData),
              TypeArrayCPRepoUtils.setFloat3(
                offset + 4,
                (metalness, roughness, specular),
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat4(
                offset + 8,
                (
                  _getMapLayerIndex(diffuseMapImageId),
                  _getMapLayerIndex(channelRoughnessMetallicMapImageId),
                  _getMapLayerIndex(emissionMapImageId),
                  _getMapLayerIndex(normalMapImageId),
                ),
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 12,
                diffuseMapScale,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 14,
                channelRoughnessMetallicMapScale,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 16,
                emissionMapScale,
                bufferData,
              ),
              TypeArrayCPRepoUtils.setFloat2(
                offset + 18,
                normalMapScale,
                bufferData,
              ),
            ])
          })
        ->Result.mapSuccess(() => {offset + 20});
      },
    )
  ->Result.mapSuccess(_ => {
      WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubFloat32Data(
        0,
        bufferData,
        buffer->StorageBufferVO.value,
      );
      PathTracingPassCPRepo.setPBRMaterialBufferData((
        buffer,
        bufferSize,
        bufferData,
      ));
    });
};

let _buildAndSetAllBufferData = device => {
  let allRenderGeometries = GameObjectRunAPI.getAllRenderGeometries();

  ListResult.mergeResults([
    _buildAndSetSceneDescBufferData(
      device,
      GameObjectRunAPI.getAllRenderGameObjects(),
    ),
    _buildAndSetPointIndexBufferData(device, allRenderGeometries),
    _buildAndSetVertexBufferData(device),
    _buildAndSetIndexBufferData(device)->Result.succeed,
    _buildAndSetPBRMaterialBufferData(
      device,
      GameObjectRunAPI.getAllRenderPBRMaterials(),
    ),
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
        (pbrMaterialBuffer, pbrMaterialBufferSize, _),
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
            ~buffer=pbrMaterialBuffer->StorageBufferVO.value,
            ~offset=0,
            ~size=pbrMaterialBufferSize,
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
          _buildAndSetAllBufferData(device)
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
                    PathTracingPassCPRepo.getPBRMaterialBufferData(),
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
