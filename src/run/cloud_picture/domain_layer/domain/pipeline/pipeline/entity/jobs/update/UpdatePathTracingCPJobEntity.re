open Js.Typed_array;

let create = () => JobEntity.create("update_pathTracing");

let _updateSceneDescBufferData =
    (
      (sceneDescBuffer, sceneDescBufferSize, sceneDescBufferData),
      allRenderGameObjects,
    ) => {
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
                sceneDescBufferData,
              ),
              TypeArrayCPRepoUtils.setMat3Data(
                offset + 4,
                normalMatrix->NormalMatrixVO.value,
                sceneDescBufferData,
              ),
              TypeArrayCPRepoUtils.setMat3Data(
                offset + 4 + 12,
                TransformRunAPI.getLocalToWorldMatrix(transform)
                ->LocalToWorldMatrixVO.value,
                sceneDescBufferData,
              ),
            ])
          })
        ->Result.mapSuccess(() => {offset + 4 + 12 + 16})
      })
    })
  ->Result.mapSuccess(_ => {
      DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubFloat32Data(
        0,
        sceneDescBufferData,
        sceneDescBuffer->StorageBufferVO.value,
      );

      PathTracingPassCPRepo.setSceneDescBufferData((
        sceneDescBuffer,
        sceneDescBufferSize,
        sceneDescBufferData,
      ));
    });
};

let _updatePointIndexBufferData =
    (
      (pointIndexBuffer, pointIndexBufferSize, pointIndexBufferData),
      allRenderGeometries,
    ) => {
  let dataCount = 2;
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
        ((geometry, (vertexStartIndex, _), (indexStartIndex, _))) => {
        ListResult.mergeResults([
          TypeArrayCPRepoUtils.setUint32_1(
            geometry * stride,
            (vertexStartIndex->Belt.Float.fromInt /. 3. *. 8.)
            ->Belt.Int.fromFloat,
            pointIndexBufferData,
          ),
          TypeArrayCPRepoUtils.setUint32_1(
            geometry * stride + 1,
            indexStartIndex,
            pointIndexBufferData,
          ),
        ])
      })
    })
  ->Result.mapSuccess(_ => {
      DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubUint32Data(
        0,
        pointIndexBufferData,
        pointIndexBuffer->StorageBufferVO.value,
      );

      PathTracingPassCPRepo.setPointIndexBufferData((
        pointIndexBuffer,
        pointIndexBufferSize,
        pointIndexBufferData,
      ));
    });
};

let _updateVertexBufferData =
    ((vertexBuffer, vertexBufferSize, vertexBufferData)) => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
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
          )
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.tap(() => {
      let vertices = PointsGeometryCPRepo.getVerticesTypeArr();
      let normals = PointsGeometryCPRepo.getNormalsTypeArr();

      let length = vertices->Float32Array.length;

      let i = ref(0);
      let j = ref(0);
      while (i^ < length) {
        Float32Array.unsafe_set(
          vertexBufferData,
          j^,
          Float32Array.unsafe_get(vertices, i^),
        );
        Float32Array.unsafe_set(
          vertexBufferData,
          j^ + 1,
          Float32Array.unsafe_get(vertices, i^ + 1),
        );
        Float32Array.unsafe_set(
          vertexBufferData,
          j^ + 2,
          Float32Array.unsafe_get(vertices, i^ + 2),
        );

        Float32Array.unsafe_set(
          vertexBufferData,
          j^ + 4,
          Float32Array.unsafe_get(normals, i^),
        );
        Float32Array.unsafe_set(
          vertexBufferData,
          j^ + 5,
          Float32Array.unsafe_get(normals, i^ + 1),
        );
        Float32Array.unsafe_set(
          vertexBufferData,
          j^ + 6,
          Float32Array.unsafe_get(normals, i^ + 2),
        );

        i := i^ + 3;
        j := j^ + 8;
      };

      DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubFloat32Data(
        0,
        vertexBufferData,
        vertexBuffer->StorageBufferVO.value,
      );

      PathTracingPassCPRepo.setVertexBufferData((
        vertexBuffer,
        vertexBufferSize,
        vertexBufferData,
      ));
    });
};

let _updateIndexBufferData = ((indexBuffer, indexBufferSize)) => {
  let indices = PointsGeometryCPRepo.getIndicesTypeArr();

  DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubUint32Data(
    0,
    indices,
    indexBuffer->StorageBufferVO.value,
  );

  PathTracingPassCPRepo.setIndexBufferData((indexBuffer, indexBufferSize));
};

let _updatePBRMaterialBufferData =
    (
      (pbrMaterialBuffer, pbrMaterialBufferSize, pbrMaterialBufferData),
      allRenderPBRMaterials,
    ) => {
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

        ListResult.mergeResults([
          TypeArrayCPRepoUtils.setFloat3(
            offset + 0,
            diffuse,
            pbrMaterialBufferData,
          ),
          TypeArrayCPRepoUtils.setFloat3(
            offset + 4,
            (metalness, roughness, specular),
            pbrMaterialBufferData,
          ),
        ])
        ->Result.mapSuccess(() => {offset + 4 + 4});
      },
    )
  ->Result.mapSuccess(_ => {
      DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubFloat32Data(
        0,
        pbrMaterialBufferData,
        pbrMaterialBuffer->StorageBufferVO.value,
      );
      PathTracingPassCPRepo.setPBRMaterialBufferData((
        pbrMaterialBuffer,
        pbrMaterialBufferSize,
        pbrMaterialBufferData,
      ));
    });
};

let _updateAllBufferData =
    (
      (
        (sceneDescBuffer, sceneDescBufferSize, sceneDescBufferData),
        (pointIndexBuffer, pointIndexBufferSize, pointIndexBufferData),
        (vertexBuffer, vertexBufferSize, vertexBufferData),
        (indexBuffer, indexBufferSize),
        (pbrMaterialBuffer, pbrMaterialBufferSize, pbrMaterialBufferData),
      ),
    ) => {
  let allRenderGeometries = GameObjectRunAPI.getAllRenderGeometries();

  ListResult.mergeResults([
    _updateSceneDescBufferData(
      (sceneDescBuffer, sceneDescBufferSize, sceneDescBufferData),
      GameObjectRunAPI.getAllRenderGameObjects(),
    ),
    _updatePointIndexBufferData(
      (pointIndexBuffer, pointIndexBufferSize, pointIndexBufferData),
      allRenderGeometries,
    ),
    _updateVertexBufferData((
      vertexBuffer,
      vertexBufferSize,
      vertexBufferData,
    )),
    _updateIndexBufferData((indexBuffer, indexBufferSize))->Result.succeed,
    _updatePBRMaterialBufferData(
      (pbrMaterialBuffer, pbrMaterialBufferSize, pbrMaterialBufferData),
      GameObjectRunAPI.getAllRenderPBRMaterials(),
    ),
  ]);
};

let _createAndAddRayTracingBindGroup =
    (
      device,
      instanceContainer,
      (
        (sceneDescBuffer, sceneDescBufferSize),
        (pointIndexBuffer, pointIndexBufferSize),
        (vertexBuffer, vertexBufferSize),
        (indexBuffer, indexBufferSize),
        (pbrMaterialBuffer, pbrMaterialBufferSize),
      ),
      (
        (pixelBuffer, pixelBufferSize),
        (commonDataBuffer, commonDataBufferData),
      ),
    ) => {
  let rtBindGroupLayout =
    DpContainer.unsafeGetWebGPUCoreDp().device.createBindGroupLayout(
      {
        "entries": [|
          IWebGPUCoreDp.layoutBinding(
            ~binding=0,
            ~visibility=
              DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                ray_generation
              lor DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                    ray_closest_hit,
            ~type_="acceleration-container",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=1,
            ~visibility=
              DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                ray_generation,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=2,
            ~visibility=
              DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                ray_generation
              lor DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                    ray_closest_hit,
            ~type_="uniform-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=3,
            ~visibility=
              DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=4,
            ~visibility=
              DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=5,
            ~visibility=
              DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=6,
            ~visibility=
              DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=7,
            ~visibility=
              DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                ray_closest_hit,
            ~type_="storage-buffer",
            (),
          ),
        |],
      },
      device,
    );

  PathTracingPassCPRepo.addStaticBindGroupData(
    0,
    DpContainer.unsafeGetWebGPURayTracingDp().device.createRayTracingBindGroup(
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
            ~buffer=commonDataBuffer->UniformBufferVO.value,
            ~offset=0,
            ~size=
              commonDataBufferData->PassCPDoService.getCommonDataBufferSize,
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
      DpContainer.unsafeGetWebGPURayTracingDp().device.createRayTracingPipeline(
        IWebGPURayTracingDp.pipelineRayTracingDescriptor(
          ~layout=
            DpContainer.unsafeGetWebGPUCoreDp().device.createPipelineLayout(
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
      BuildAccerlerationContainerDoService.buildContainers(device, queue)
      ->Result.bind(instanceContainer => {
          Tuple5.collectOption(
            PathTracingPassCPRepo.getSceneDescBufferData(),
            PathTracingPassCPRepo.getPointIndexBufferData(),
            PathTracingPassCPRepo.getVertexBufferData(),
            PathTracingPassCPRepo.getIndexBufferData(),
            PathTracingPassCPRepo.getPBRMaterialBufferData(),
          )
          ->Result.bind(
              (
                (
                  (sceneDescBuffer, sceneDescBufferSize, sceneDescBufferData),
                  (
                    pointIndexBuffer,
                    pointIndexBufferSize,
                    pointIndexBufferData,
                  ),
                  (vertexBuffer, vertexBufferSize, vertexBufferData),
                  (indexBuffer, indexBufferSize),
                  (
                    pbrMaterialBuffer,
                    pbrMaterialBufferSize,
                    pbrMaterialBufferData,
                  ),
                ) as allBufferData,
              ) => {
              _updateAllBufferData(allBufferData)
              ->Result.bind(() => {
                  Tuple2.collectOption(
                    PassCPRepo.getPixelBufferData(),
                    PassCPRepo.getCommonBufferData(),
                  )
                  ->Result.bind(passAllBufferData => {
                      _createAndAddRayTracingBindGroup(
                        device,
                        instanceContainer,
                        (
                          (sceneDescBuffer, sceneDescBufferSize),
                          (pointIndexBuffer, pointIndexBufferSize),
                          (vertexBuffer, vertexBufferSize),
                          (indexBuffer, indexBufferSize),
                          (pbrMaterialBuffer, pbrMaterialBufferSize),
                        ),
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
