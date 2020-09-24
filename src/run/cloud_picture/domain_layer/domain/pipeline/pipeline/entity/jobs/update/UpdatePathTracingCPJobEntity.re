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

let _computeTangents = [%bs.raw
  {|
(vertices, texCoords, normals, indices) =>{
  let tangents = new Float32Array(vertices.length);
  // let bitangents = new Float32Array(vertices.length);

  for (let ii = 0; ii < indices.length; ii += 3) {
    let i0 = indices[ii + 0];
    let i1 = indices[ii + 1];
    let i2 = indices[ii + 2];

    let xv0 = vertices[i0 * 3 + 0];
    let yv0 = vertices[i0 * 3 + 1];
    let zv0 = vertices[i0 * 3 + 2];

    let xuv0 = texCoords[i0 * 2 + 0];
    let yuv0 = texCoords[i0 * 2 + 1];

    let xv1 = vertices[i1 * 3 + 0];
    let yv1 = vertices[i1 * 3 + 1];
    let zv1 = vertices[i1 * 3 + 2];

    let xuv1 = texCoords[i1 * 2 + 0];
    let yuv1 = texCoords[i1 * 2 + 1];

    let xv2 = vertices[i2 * 3 + 0];
    let yv2 = vertices[i2 * 3 + 1];
    let zv2 = vertices[i2 * 3 + 2];

    let xuv2 = texCoords[i2 * 2 + 0];
    let yuv2 = texCoords[i2 * 2 + 1];

    let deltaPosX1 = xv1 - xv0;
    let deltaPosY1 = yv1 - yv0;
    let deltaPosZ1 = zv1 - zv0;

    let deltaPosX2 = xv2 - xv0;
    let deltaPosY2 = yv2 - yv0;
    let deltaPosZ2 = zv2 - zv0;

    let uvDeltaPosX1 = xuv1 - xuv0;
    let uvDeltaPosY1 = yuv1 - yuv0;

    let uvDeltaPosX2 = xuv2 - xuv0;
    let uvDeltaPosY2 = yuv2 - yuv0;

    let rInv = uvDeltaPosX1 * uvDeltaPosY2 - uvDeltaPosY1 * uvDeltaPosX2;
    let r = 1.0 / (Math.abs(rInv < 0.0001) ? 1.0 : rInv);

    // tangent
    let xt = (deltaPosX1 * uvDeltaPosY2 - deltaPosX2 * uvDeltaPosY1) * r;
    let yt = (deltaPosY1 * uvDeltaPosY2 - deltaPosY2 * uvDeltaPosY1) * r;
    let zt = (deltaPosZ1 * uvDeltaPosY2 - deltaPosZ2 * uvDeltaPosY1) * r;

    // // bitangent
    // let xb = (deltaPosX2 * uvDeltaPosX1 - deltaPosX1 * uvDeltaPosX2) * r;
    // let yb = (deltaPosY2 * uvDeltaPosX1 - deltaPosY1 * uvDeltaPosX2) * r;
    // let zb = (deltaPosZ2 * uvDeltaPosX1 - deltaPosZ1 * uvDeltaPosX2) * r;

    // orthogonalize
    let xn0 = normals[i0 * 3 + 0];
    let yn0 = normals[i0 * 3 + 1];
    let zn0 = normals[i0 * 3 + 2];

    let xn1 = normals[i1 * 3 + 0];
    let yn1 = normals[i1 * 3 + 1];
    let zn1 = normals[i1 * 3 + 2];

    let xn2 = normals[i2 * 3 + 0];
    let yn2 = normals[i2 * 3 + 1];
    let zn2 = normals[i2 * 3 + 2];

    // tangent
    let xTangent0 = xt - xn0 * (xt * xn0 + yt * yn0 + zt * zn0);
    let yTangent0 = yt - yn0 * (xt * xn0 + yt * yn0 + zt * zn0);
    let zTangent0 = zt - zn0 * (xt * xn0 + yt * yn0 + zt * zn0);

    let xTangent1 = xt - xn1 * (xt * xn1 + yt * yn1 + zt * zn1);
    let yTangent1 = yt - yn1 * (xt * xn1 + yt * yn1 + zt * zn1);
    let zTangent1 = zt - zn1 * (xt * xn1 + yt * yn1 + zt * zn1);

    let xTangent2 = xt - xn2 * (xt * xn2 + yt * yn2 + zt * zn2);
    let yTangent2 = yt - yn2 * (xt * xn2 + yt * yn2 + zt * zn2);
    let zTangent2 = zt - zn2 * (xt * xn2 + yt * yn2 + zt * zn2);

    let magTangent0 = Math.sqrt(xTangent0 * xTangent0 + yTangent0 * yTangent0 + zTangent0 * zTangent0);
    let magTangent1 = Math.sqrt(xTangent1 * xTangent1 + yTangent1 * yTangent1 + zTangent1 * zTangent1);
    let magTangent2 = Math.sqrt(xTangent2 * xTangent2 + yTangent2 * yTangent2 + zTangent2 * zTangent2);

    // // bitangent
    // let N0oBt = xb * xn0 + yb * yn0 + zb * zn0;
    // let N1oBt = xb * xn1 + yb * yn1 + zb * zn1;
    // let N2oBt = xb * xn2 + yb * yn2 + zb * zn2;

    // let magBitangent0 = Math.sqrt(
    //   (xb - xn0 * N0oBt) * 2 +
    //   (yb - yn0 * N0oBt) * 2 +
    //   (zb - zn0 * N0oBt) * 2
    // );
    // let magBitangent1 = Math.sqrt(
    //   (xb - xn1 * N1oBt) * 2 +
    //   (yb - yn1 * N1oBt) * 2 +
    //   (zb - zn1 * N1oBt) * 2
    // );
    // let magBitangent2 = Math.sqrt(
    //   (xb - xn2 * N2oBt) * 2 +
    //   (yb - yn2 * N2oBt) * 2 +
    //   (zb - zn2 * N2oBt) * 2
    // );

    tangents[i0 * 3 + 0] += xTangent0 / magTangent0;
    tangents[i0 * 3 + 1] += yTangent0 / magTangent0;
    tangents[i0 * 3 + 2] += zTangent0 / magTangent0;

    tangents[i1 * 3 + 0] += xTangent1 / magTangent1;
    tangents[i1 * 3 + 1] += yTangent1 / magTangent1;
    tangents[i1 * 3 + 2] += zTangent1 / magTangent1;

    tangents[i2 * 3 + 0] += xTangent2 / magTangent2;
    tangents[i2 * 3 + 1] += yTangent2 / magTangent2;
    tangents[i2 * 3 + 2] += zTangent2 / magTangent2;

    // bitangents[i0 * 3 + 0] += (xb - xn0 * N0oBt) / magBitangent0;
    // bitangents[i0 * 3 + 1] += (yb - yn0 * N0oBt) / magBitangent0;
    // bitangents[i0 * 3 + 2] += (zb - zn0 * N0oBt) / magBitangent0;

    // bitangents[i1 * 3 + 0] += (xb - xn1 * N1oBt) / magBitangent1;
    // bitangents[i1 * 3 + 1] += (yb - yn1 * N1oBt) / magBitangent1;
    // bitangents[i1 * 3 + 2] += (zb - zn1 * N1oBt) / magBitangent1;

    // bitangents[i2 * 3 + 0] += (xb - xn2 * N2oBt) / magBitangent2;
    // bitangents[i2 * 3 + 1] += (yb - yn2 * N2oBt) / magBitangent2;
    // bitangents[i2 * 3 + 2] += (zb - zn2 * N2oBt) / magBitangent2;
  };

  return tangents;
}
|}
];

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
          let vertices = PointsGeometryCPRepo.getVerticesTypeArr();
          let normals = PointsGeometryCPRepo.getNormalsTypeArr();

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
      test(
        Log.buildAssertMessage(
          ~expect={j|verticesOffset be 3 times|j},
          ~actual={j|not|j},
        ),
        () => {
          let x =
            Number.dividInt(PointsGeometryCPRepo.getVerticesOffset(), 3);

          x -. x->Js.Math.floor_float ==. 0.0;
        },
      );
    },
    OtherConfigDpRunAPI.unsafeGet().getIsDebug(),
  )
  ->Result.mapSuccess(() => {
      let bufferData =
        Float32Array.fromLength(
          PointsGeometryCPRepo.getVerticesOffset() / 3 * 16,
        );
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

      let vertices = PointsGeometryCPRepo.getVerticesTypeArr();
      let texCoords = PointsGeometryCPRepo.getTexCoordsTypeArr();
      let normals = PointsGeometryCPRepo.getNormalsTypeArr();
      let tangents =
        _computeTangents(
          vertices,
          texCoords,
          normals,
          PointsGeometryCPRepo.getIndicesTypeArr(),
        );

      let length = PointsGeometryCPRepo.getVerticesOffset();

      let i = ref(0);
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
          Float32Array.unsafe_get(texCoords, i^),
        );
        Float32Array.unsafe_set(
          bufferData,
          j^ + 5,
          Float32Array.unsafe_get(texCoords, i^ + 1),
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
      ->OptionSt.fromNullable
      ->OptionSt.getWithDefault(_getMapLayerIndexForNotExist())
    }
  )
  ->Belt.Float.fromInt;
};

let _computeMapOffset = mapImageIdOpt => {
  let defaultOffset = (0.0, 0.0);

  switch (mapImageIdOpt) {
  | None => defaultOffset
  | Some(imageId) =>
    switch (AssetRunAPI.getImageData(imageId)) {
    | None => defaultOffset
    | Some(({width, height}: ImagePOType.data)) =>
      let (imageWidth, imageHeight) = WebGPUCoreRunAPI.getTextureArraySize();

      (
        Number.dividInt(width, imageWidth),
        Number.dividInt(height, imageHeight),
      );
    }
  };
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
        let metalRoughnessMapImageId =
          PBRMaterialRunAPI.getMetalRoughnessMapImageId(pbrMaterial);
        let emissionMapImageId =
          PBRMaterialRunAPI.getEmissionMapImageId(pbrMaterial);
        let normalMapImageId =
          PBRMaterialRunAPI.getNormalMapImageId(pbrMaterial);

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
              _getMapLayerIndex(metalRoughnessMapImageId),
              _getMapLayerIndex(emissionMapImageId),
              _getMapLayerIndex(normalMapImageId),
            ),
            bufferData,
          ),
          TypeArrayCPRepoUtils.setFloat2(
            offset + 12,
            _computeMapOffset(diffuseMapImageId),
            bufferData,
          ),
          TypeArrayCPRepoUtils.setFloat2(
            offset + 14,
            _computeMapOffset(metalRoughnessMapImageId),
            bufferData,
          ),
          TypeArrayCPRepoUtils.setFloat2(
            offset + 16,
            _computeMapOffset(emissionMapImageId),
            bufferData,
          ),
          TypeArrayCPRepoUtils.setFloat2(
            offset + 18,
            _computeMapOffset(normalMapImageId),
            bufferData,
          ),
        ])
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
