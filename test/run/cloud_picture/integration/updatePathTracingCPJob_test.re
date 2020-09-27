open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test update_pathTracing job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      let device = WebGPUDependencyTool.createDeviceObject();
      WebGPUCPTool.setDevice(device);
      let queue = WebGPUDependencyTool.createQueueObject();
      WebGPUCPTool.setQueue(queue);

      PathTracingPassCPTool.createAndSetShaderBindingTable();
      PathTracingPassCPTool.createAndSetAllBindGroupLayoutsAndBindGroupsExceptRayTracing();
      PassCPTool.buildAndSetAllBufferData(
        WebGPUDependencyTool.createWindowObject(),
        device,
      );
      TextureArrayCPTool.createAndSetTextureArrayViewAndTextureSampler();

      (device, queue);
    };

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~updatePipelineData={
          name: "update",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "update_pathTracing", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("build accerleration containers", () => {
      let _prepare = () => {
        let (device, queue) = _prepare();
        let (
          (gameObject1, gameObject2),
          (geometry1, geometry2),
          (
            (vertices1, vertices2),
            _,
            (normals1, normals2),
            (indices1, indices2),
          ),
        ) =
          GeometryCPTool.createTwoGameObjectsAndSetPointData();
        let _ =
          PBRMaterialCPTool.createAndAddTwoMaterials(
            gameObject1,
            gameObject2,
          );
        let geometryContainer1 =
          WebGPURayTracingDependencyTool.createAccelerationContainerObject();
        let geometryContainer2 =
          WebGPURayTracingDependencyTool.createAccelerationContainerObject();
        let instanceContainer =
          WebGPURayTracingDependencyTool.createAccelerationContainerObject();
        let createRayTracingAccelerationContainerStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^));
        createRayTracingAccelerationContainerStubData
        ->onCall(0, _)
        ->SinonTool.returns(geometryContainer1);
        createRayTracingAccelerationContainerStubData
        ->onCall(1, _)
        ->SinonTool.returns(geometryContainer2);
        createRayTracingAccelerationContainerStubData
        ->onCall(2, _)
        ->SinonTool.returns(instanceContainer);
        let createRayTracingAccelerationContainerStubData =
          createRayTracingAccelerationContainerStubData->SinonTool.createTwoArgsEmptyStubData;

        (
          (
            (gameObject1, gameObject2),
            (geometry1, geometry2),
            (vertices1, vertices2),
            (normals1, normals2),
            (indices1, indices2),
          ),
          (device, queue),
          (
            ((geometryContainer1, geometryContainer2), instanceContainer),
            createRayTracingAccelerationContainerStubData,
          ),
        );
      };

      describe("build geometry containers", () => {
        describe("test two render geometries", () => {
          let _prepare = () => {
            let (
              (
                (gameObject1, gameObject2),
                (geometry1, geometry2),
                (vertices1, vertices2),
                (normals1, normals2),
                (indices1, indices2),
              ),
              (device, queue),
              (
                ((geometryContainer1, geometryContainer2), instanceContainer),
                createRayTracingAccelerationContainerStubData,
              ),
            ) =
              _prepare();
            let vertexBuffer1 = WebGPUDependencyTool.createBufferObject();
            let vertexBuffer2 = WebGPUDependencyTool.createBufferObject();
            let indexBuffer1 = WebGPUDependencyTool.createBufferObject();
            let indexBuffer2 = WebGPUDependencyTool.createBufferObject();
            let createBufferStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^));
            createBufferStubData
            ->onCall(0, _)
            ->SinonTool.returns(vertexBuffer1);
            createBufferStubData
            ->onCall(1, _)
            ->SinonTool.returns(indexBuffer1);
            createBufferStubData
            ->onCall(2, _)
            ->SinonTool.returns(vertexBuffer2);
            createBufferStubData
            ->onCall(3, _)
            ->SinonTool.returns(indexBuffer2);
            let createBufferStubData =
              createBufferStubData->SinonTool.createTwoArgsEmptyStubData;

            (
              (
                (gameObject1, gameObject2),
                (geometry1, geometry2),
                (vertices1, vertices2),
                (normals1, normals2),
                (indices1, indices2),
              ),
              (device, queue),
              (vertexBuffer1, vertexBuffer2, indexBuffer1, indexBuffer2),
              createBufferStubData,
              (
                ((geometryContainer1, geometryContainer2), instanceContainer),
                createRayTracingAccelerationContainerStubData,
              ),
            );
          };

          testPromise(
            "create each geometry's vertex buffer and index buffer", () => {
            let (
              (
                (gameObject1, gameObject2),
                (geometry1, geometry2),
                (vertices1, vertices2),
                (normals1, normals2),
                (indices1, indices2),
              ),
              (device, queue),
              (vertexBuffer1, vertexBuffer2, indexBuffer1, indexBuffer2),
              createBufferStubData,
              _,
            ) =
              _prepare();
            let ray_tracing = 3;
            let copy_dst = 4;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
              (),
            )
            ->WebGPUDependencyTool.set;
            WebGPURayTracingDependencyTool.build(
              ~sandbox,
              ~ray_tracing,
              ~copy_dst,
              (),
            )
            ->WebGPURayTracingDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  (
                    createBufferStubData
                    ->SinonTool.getStub
                    ->getCall(0, _)
                    ->SinonTool.calledWithArg2(
                        {
                          "size":
                            vertices1
                            ->VerticesVO.value
                            ->Float32Array.byteLength,
                          "usage": copy_dst lor ray_tracing,
                        },
                        device,
                      ),
                    createBufferStubData
                    ->SinonTool.getStub
                    ->getCall(1, _)
                    ->SinonTool.calledWithArg2(
                        {
                          "size":
                            indices1->IndicesVO.value->Uint32Array.byteLength,
                          "usage": copy_dst lor ray_tracing,
                        },
                        device,
                      ),
                    createBufferStubData
                    ->SinonTool.getStub
                    ->getCall(2, _)
                    ->SinonTool.calledWithArg2(
                        {
                          "size":
                            vertices2
                            ->VerticesVO.value
                            ->Float32Array.byteLength,
                          "usage": copy_dst lor ray_tracing,
                        },
                        device,
                      ),
                    createBufferStubData
                    ->SinonTool.getStub
                    ->getCall(3, _)
                    ->SinonTool.calledWithArg2(
                        {
                          "size":
                            indices2->IndicesVO.value->Uint32Array.byteLength,
                          "usage": copy_dst lor ray_tracing,
                        },
                        device,
                      ),
                  )
                  ->expect
                  == (true, true, true, true)
                },
              (),
            );
          });
          testPromise("set the buffers' data", () => {
            let (
              (
                (gameObject1, gameObject2),
                (geometry1, geometry2),
                (vertices1, vertices2),
                (normals1, normals2),
                (indices1, indices2),
              ),
              (device, queue),
              (vertexBuffer1, vertexBuffer2, indexBuffer1, indexBuffer2),
              createBufferStubData,
              _,
            ) =
              _prepare();
            let setSubUint32DataStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonTool.createThreeArgsEmptyStubData;
            let setSubFloat32DataStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonTool.createThreeArgsEmptyStubData;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
              ~setSubUint32Data=setSubUint32DataStubData->SinonTool.getDpFunc,
              ~setSubFloat32Data=
                setSubFloat32DataStubData->SinonTool.getDpFunc,
              (),
            )
            ->WebGPUDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  (
                    setSubFloat32DataStubData
                    ->SinonTool.getStub
                    ->getCall(0, _)
                    ->SinonTool.calledWithArg3(
                        0,
                        vertices1->VerticesVO.value,
                        vertexBuffer1,
                      ),
                    setSubUint32DataStubData
                    ->SinonTool.getStub
                    ->getCall(0, _)
                    ->SinonTool.calledWithArg3(
                        0,
                        indices1->IndicesVO.value,
                        indexBuffer1,
                      ),
                    setSubFloat32DataStubData
                    ->SinonTool.getStub
                    ->getCall(1, _)
                    ->SinonTool.calledWithArg3(
                        0,
                        vertices2->VerticesVO.value,
                        vertexBuffer2,
                      ),
                    setSubUint32DataStubData
                    ->SinonTool.getStub
                    ->getCall(1, _)
                    ->SinonTool.calledWithArg3(
                        0,
                        indices2->IndicesVO.value,
                        indexBuffer2,
                      ),
                  )
                  ->expect
                  == (true, true, true, true)
                },
              (),
            );
          });
          testPromise("create geometry containers", () => {
            let (
              (
                (gameObject1, gameObject2),
                (geometry1, geometry2),
                (vertices1, vertices2),
                (normals1, normals2),
                (indices1, indices2),
              ),
              (device, queue),
              (vertexBuffer1, vertexBuffer2, indexBuffer1, indexBuffer2),
              createBufferStubData,
              (
                ((geometryContainer1, geometryContainer2), instanceContainer),
                createRayTracingAccelerationContainerStubData,
              ),
            ) =
              _prepare();
            let prefer_fast_trace = 3;
            let opaque = 5;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
              (),
            )
            ->WebGPUDependencyTool.set;
            WebGPURayTracingDependencyTool.build(
              ~sandbox,
              ~createRayTracingAccelerationContainer=
                createRayTracingAccelerationContainerStubData->SinonTool.getDpFunc,
              ~prefer_fast_trace,
              ~opaque,
              (),
            )
            ->WebGPURayTracingDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  (
                    createRayTracingAccelerationContainerStubData
                    ->SinonTool.getStub
                    ->getCall(0, _)
                    ->SinonTool.calledWithArg2(
                        IWebGPURayTracingDp.accelerationContainerDescriptor(
                          ~usage=prefer_fast_trace,
                          ~level="bottom",
                          ~geometries=[|
                            {
                              "usage": opaque,
                              "type": "triangles",
                              "vertex": {
                                "buffer": vertexBuffer1,
                                "format": "float3",
                                "stride": 3 * Float32Array._BYTES_PER_ELEMENT,
                                "count":
                                  Float32Array.length(
                                    vertices1->VerticesVO.value,
                                  ),
                              },
                              "index": {
                                "buffer": indexBuffer1,
                                "format": "uint32",
                                "count":
                                  Uint32Array.length(
                                    indices1->IndicesVO.value,
                                  ),
                              },
                            },
                          |],
                          (),
                        ),
                        device,
                      ),
                    createRayTracingAccelerationContainerStubData
                    ->SinonTool.getStub
                    ->getCall(1, _)
                    ->SinonTool.calledWithArg2(
                        IWebGPURayTracingDp.accelerationContainerDescriptor(
                          ~usage=prefer_fast_trace,
                          ~level="bottom",
                          ~geometries=[|
                            {
                              "usage": opaque,
                              "type": "triangles",
                              "vertex": {
                                "buffer": vertexBuffer2,
                                "format": "float3",
                                "stride": 3 * Float32Array._BYTES_PER_ELEMENT,
                                "count":
                                  Float32Array.length(
                                    vertices2->VerticesVO.value,
                                  ),
                              },
                              "index": {
                                "buffer": indexBuffer2,
                                "format": "uint32",
                                "count":
                                  Uint32Array.length(
                                    indices2->IndicesVO.value,
                                  ),
                              },
                            },
                          |],
                          (),
                        ),
                        device,
                      ),
                  )
                  ->expect
                  == (true, true)
                },
              (),
            );
          });
        })
      });

      describe("build one instance container", () => {
        describe("test two render geometries", () => {
          testPromise("create one instance container with two instances", () => {
            let (
              (
                (gameObject1, gameObject2),
                (geometry1, geometry2),
                (vertices1, vertices2),
                (normals1, normals2),
                (indices1, indices2),
              ),
              (device, queue),
              (
                ((geometryContainer1, geometryContainer2), instanceContainer),
                createRayTracingAccelerationContainerStubData,
              ),
            ) =
              _prepare();
            let _ =
              TransformCPTool.setTwoTransformsData(gameObject1, gameObject2);
            let prefer_fast_trace = 3;
            let triangle_cull_disable = 5;
            WebGPURayTracingDependencyTool.build(
              ~sandbox,
              ~createRayTracingAccelerationContainer=
                createRayTracingAccelerationContainerStubData->SinonTool.getDpFunc,
              ~prefer_fast_trace,
              ~triangle_cull_disable,
              (),
            )
            ->WebGPURayTracingDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  (
                    createRayTracingAccelerationContainerStubData
                    ->SinonTool.getStub
                    ->getCallCount,
                    createRayTracingAccelerationContainerStubData
                    ->SinonTool.getStub
                    ->SinonTool.calledWithArg2(
                        {
                          IWebGPURayTracingDp.accelerationContainerDescriptor(
                            ~usage=
                              DpContainer.unsafeGetWebGPURayTracingDp().
                                accelerationContainerUsage.
                                prefer_fast_trace,
                            ~level="top",
                            ~instances=[|
                              IWebGPURayTracingDp.instance(
                                ~usage=triangle_cull_disable,
                                ~mask=0xFF,
                                ~instanceId=0,
                                ~transformMatrix=
                                  Float32Array.make([|
                                    0.9980211853981018,
                                    (-0.10343948751688004),
                                    0.10727924853563309,
                                    0.,
                                    0.05230407789349556,
                                    1.997018575668335,
                                    (-0.046806808561086655),
                                    1.,
                                    (-0.03489949554204941),
                                    0.03488355129957199,
                                    2.997715950012207,
                                    0.,
                                  |]),
                                ~instanceOffset=0,
                                ~geometryContainer=geometryContainer1,
                                (),
                              ),
                              IWebGPURayTracingDp.instance(
                                ~usage=triangle_cull_disable,
                                ~mask=0xFF,
                                ~instanceId=1,
                                ~transformMatrix=
                                  Float32Array.make([|
                                    4.264342784881592,
                                    (-4.832843780517578),
                                    5.9284281730651855,
                                    2.,
                                    2.462019205093384,
                                    8.703600883483887,
                                    0.10258511453866959,
                                    1.,
                                    (-0.8682408928871155),
                                    0.9438963532447815,
                                    29.40821647644043,
                                    0.,
                                  |]),
                                ~instanceOffset=0,
                                ~geometryContainer=geometryContainer2,
                                (),
                              ),
                            |],
                            (),
                          );
                        },
                        device,
                      ),
                  )
                  ->expect
                  == (2 + 1, true)
                },
              (),
            );
          })
        })
      });

      describe("build all containers to webgpu", () => {
        let _prepare = () => {
          let (
            (
              (gameObject1, gameObject2),
              (geometry1, geometry2),
              (vertices1, vertices2),
              (normals1, normals2),
              (indices1, indices2),
            ),
            (device, queue),
            (
              ((geometryContainer1, geometryContainer2), instanceContainer),
              createRayTracingAccelerationContainerStubData,
            ),
          ) =
            _prepare();

          let commandEncoder1 =
            WebGPUDependencyTool.createCommandEncoderObject();
          let commandEncoder2 =
            WebGPUDependencyTool.createCommandEncoderObject();
          let createCommandEncoderStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^));
          createCommandEncoderStubData
          ->onCall(0, _)
          ->SinonTool.returns(commandEncoder1);
          createCommandEncoderStubData
          ->onCall(1, _)
          ->SinonTool.returns(commandEncoder2);
          let createCommandEncoderStubData =
            createCommandEncoderStubData->SinonTool.createTwoArgsEmptyStubData;

          let commandBufferObject1 =
            WebGPUDependencyTool.createCommandBufferObject();
          let commandBufferObject2 =
            WebGPUDependencyTool.createCommandBufferObject();
          let finish = createEmptyStub(refJsObjToSandbox(sandbox^));
          finish->onCall(0, _)->SinonTool.returns(commandBufferObject1);
          finish->onCall(1, _)->SinonTool.returns(commandBufferObject2);

          let submitStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonTool.createTwoArgsEmptyStubData;

          let buildRayTracingAccelerationContainerStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonTool.createTwoArgsEmptyStubData;

          WebGPUDependencyTool.build(
            ~sandbox,
            ~createCommandEncoder=
              createCommandEncoderStubData->SinonTool.getDpFunc,
            ~finish,
            ~submit=submitStubData->SinonTool.getDpFunc,
            (),
          )
          ->WebGPUDependencyTool.set;
          WebGPURayTracingDependencyTool.build(
            ~sandbox,
            ~createRayTracingAccelerationContainer=
              createRayTracingAccelerationContainerStubData->SinonTool.getDpFunc,
            ~buildRayTracingAccelerationContainer=
              buildRayTracingAccelerationContainerStubData->SinonTool.getDpFunc,
            (),
          )
          ->WebGPURayTracingDependencyTool.set;

          (
            (device, queue),
            (
              ((geometryContainer1, geometryContainer2), instanceContainer),
              createRayTracingAccelerationContainerStubData,
            ),
            (
              (
                (commandEncoder1, commandEncoder2),
                createCommandEncoderStubData,
              ),
              ((commandBufferObject1, commandBufferObject2), finish),
              submitStubData,
              buildRayTracingAccelerationContainerStubData,
            ),
          );
        };

        testPromise("build all geometry containers to webgpu", () => {
          let (
            (device, queue),
            (
              ((geometryContainer1, geometryContainer2), instanceContainer),
              createRayTracingAccelerationContainerStubData,
            ),
            (
              (
                (commandEncoder1, commandEncoder2),
                createCommandEncoderStubData,
              ),
              ((commandBufferObject1, commandBufferObject2), finish),
              submitStubData,
              buildRayTracingAccelerationContainerStubData,
            ),
          ) =
            _prepare();

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                (
                  buildRayTracingAccelerationContainerStubData
                  ->SinonTool.getStub
                  ->getCall(0, _)
                  ->SinonTool.calledWithArg2(
                      geometryContainer1,
                      commandEncoder1,
                    ),
                  buildRayTracingAccelerationContainerStubData
                  ->SinonTool.getStub
                  ->getCall(1, _)
                  ->SinonTool.calledWithArg2(
                      geometryContainer2,
                      commandEncoder1,
                    ),
                  submitStubData
                  ->SinonTool.getStub
                  ->getCall(0, _)
                  ->SinonTool.calledWithArg2(
                      [|commandBufferObject1|],
                      queue,
                    ),
                )
                ->expect
                == (true, true, true)
              },
            (),
          );
        });
        testPromise("build instance container to webgpu", () => {
          let (
            (device, queue),
            (
              ((geometryContainer1, geometryContainer2), instanceContainer),
              createRayTracingAccelerationContainerStubData,
            ),
            (
              (
                (commandEncoder1, commandEncoder2),
                createCommandEncoderStubData,
              ),
              ((commandBufferObject1, commandBufferObject2), finish),
              submitStubData,
              buildRayTracingAccelerationContainerStubData,
            ),
          ) =
            _prepare();

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                (
                  buildRayTracingAccelerationContainerStubData
                  ->SinonTool.getStub
                  ->getCall(2, _)
                  ->SinonTool.calledWithArg2(
                      instanceContainer,
                      commandEncoder2,
                    ),
                  submitStubData
                  ->SinonTool.getStub
                  ->getCall(1, _)
                  ->SinonTool.calledWithArg2(
                      [|commandBufferObject2|],
                      queue,
                    ),
                )
                ->expect
                == (true, true)
              },
            (),
          );
        });
      });
    });

    describe("build and set all path tracing's buffer data", () => {
      let _prepare = () => {
        let (device, queue) = _prepare();
        let (
          (gameObject1, gameObject2),
          (geometry1, geometry2),
          (
            (vertices1, vertices2),
            (texCoords1, texCoords2),
            (normals1, normals2),
            (indices1, indices2),
          ),
        ) =
          GeometryCPTool.createTwoGameObjectsAndSetPointData();
        let ((material1, material2), _) =
          PBRMaterialCPTool.createAndAddTwoMaterials(
            gameObject1,
            gameObject2,
          );
        let _ =
          TransformCPTool.setTwoTransformsData(gameObject1, gameObject2);

        (
          device,
          (gameObject1, gameObject2),
          ((geometry1, geometry2), (material1, material2)),
        );
      };

      let _testCreateBuffer = (~getBufferSizeFunc, ~getBufferDataFunc) => {
        testPromise("create buffer", ()
          => {
            let (device, _, _) = _prepare();
            let buffer = WebGPUDependencyTool.createBufferObject();
            let createBufferStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonTool.returns(buffer)
              ->SinonTool.createTwoArgsEmptyStubData;
            let copy_dst = 2;
            let storage = 3;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
              ~storage_bufferUsage=storage,
              ~copy_dst_bufferUsage=copy_dst,
              (),
            )
            ->WebGPUDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  let (buffer, bufferSize, _) = getBufferDataFunc();

                  (
                    bufferSize,
                    createBufferStubData
                    ->SinonTool.getStub
                    ->SinonTool.calledWithArg2(
                        {"size": bufferSize, "usage": copy_dst lor storage},
                        device,
                      ),
                  )
                  ->expect
                  == (getBufferSizeFunc(), true);
                },
              (),
            );
          });
          // testPromise("create type arr", () => {
          //   let device = _prepare();
          //   DirectorCPTool.init(
          //     ~handleSuccessFunc=
          //       () => {
          //         let (_, _, typeArr) = getBufferDataFunc();
          //         typeArr->expect == makeTypeArrFunc();
          //       },
          //     (),
          //   );
          // });
      };

      describe("build and set scene desc buffer data", () => {
        // beforeEach(() => {
        //   // TestCPTool.updateBufferCount(~transformCount=2, ())
        // });

        describe("build scene desc buffer data", () => {
          _testCreateBuffer(
            ~getBufferSizeFunc=
              () =>
                (4 + 12 + 16)
                * 2
                * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
            ~getBufferDataFunc=PathTracingPassCPTool.getSceneDescBufferData,
          )
        });

        testPromise(
          "set each render gameObject's geometry, pbrMateral, normalMatrix, localToWorldMatrix to buffer data",
          () => {
            let _ = _prepare();

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  let (_, _, typeArr) =
                    PathTracingPassCPTool.getSceneDescBufferData();

                  typeArr->expect
                  == Js.Typed_array.Float32Array.make([|
                       0.,
                       0.,
                       0.,
                       0.,
                       0.9980211853981018,
                       0.05230407789349556,
                       (-0.03489949554204941),
                       0.,
                       (-0.02585987187922001),
                       0.49925467371940613,
                       0.008720887824892998,
                       0.,
                       0.011919915676116943,
                       (-0.005200756248086691),
                       0.3330795168876648,
                       0.,
                       0.9980211853981018,
                       0.05230407789349556,
                       (-0.03489949554204941),
                       0.,
                       (-0.10343948006629944),
                       1.997018575668335,
                       0.03488355129957199,
                       0.,
                       0.10727924853563309,
                       (-0.046806808561086655),
                       2.997715950012207,
                       0.,
                       0.,
                       1.,
                       0.,
                       1.,
                       1.,
                       1.,
                       0.,
                       0.,
                       0.17057371139526367,
                       0.09848077595233917,
                       (-0.03472963720560074),
                       0.,
                       (-0.04832844436168671),
                       0.08703601360321045,
                       0.009438963606953621,
                       0.,
                       0.006587142590433359,
                       0.00011398360948078334,
                       0.03267579525709152,
                       0.,
                       4.264342784881592,
                       2.462019205093384,
                       (-0.8682408928871155),
                       0.,
                       (-4.832844257354736),
                       8.703600883483887,
                       0.9438963532447815,
                       0.,
                       5.9284281730651855,
                       0.10258530080318451,
                       29.40821647644043,
                       0.,
                       2.,
                       1.,
                       0.,
                       1.,
                     |]);
                },
              (),
            );
          },
        );
        testPromise("set buffer's data", () => {
          let _ = _prepare();
          let setSubFloat32DataStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonTool.createThreeArgsEmptyStubData;
          WebGPUDependencyTool.build(
            ~sandbox,
            ~setSubFloat32Data=setSubFloat32DataStubData->SinonTool.getDpFunc,
            (),
          )
          ->WebGPUDependencyTool.set;

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                let (buffer, _, typeArr) =
                  PathTracingPassCPTool.getSceneDescBufferData();

                setSubFloat32DataStubData
                ->SinonTool.getStub
                ->expect
                ->SinonTool.toCalledWith((
                    0,
                    typeArr,
                    buffer->StorageBufferVO.value,
                  ));
              },
            (),
          );
        });
      });

      describe("build and set point index buffer data", () => {
        // beforeEach(() => {
        //   TestCPTool.updateBufferCount(~geometryCount=2, ())
        // });

        describe("build point index buffer data", () => {
          _testCreateBuffer(
            ~getBufferSizeFunc=
              () => 2 * 2 * Js.Typed_array.Uint32Array._BYTES_PER_ELEMENT,
            ~getBufferDataFunc=PathTracingPassCPTool.getPointIndexBufferData,
          )
        });

        testPromise(
          "set each render geometry's vertex start index, face start index to buffer data",
          () => {
            let _ = _prepare();

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  let (_, _, typeArr) =
                    PathTracingPassCPTool.getPointIndexBufferData();

                  typeArr->expect
                  == Js.Typed_array.Uint32Array.make([|0, 0, 3, 3|]);
                },
              (),
            );
          },
        );
        testPromise("set buffer's data", () => {
          let _ = _prepare();
          let setSubUint32DataStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonTool.createThreeArgsEmptyStubData;
          WebGPUDependencyTool.build(
            ~sandbox,
            ~setSubUint32Data=setSubUint32DataStubData->SinonTool.getDpFunc,
            (),
          )
          ->WebGPUDependencyTool.set;

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                let (buffer, _, typeArr) =
                  PathTracingPassCPTool.getPointIndexBufferData();

                setSubUint32DataStubData
                ->SinonTool.getStub
                ->expect
                ->SinonTool.toCalledWith((
                    0,
                    typeArr,
                    buffer->StorageBufferVO.value,
                  ));
              },
            (),
          );
        });
      });

      describe("build and set vertex buffer data", () => {
        describe("build vertex buffer data", () => {
          _testCreateBuffer(
            ~getBufferSizeFunc=
              () => 56 * 2 * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
            ~getBufferDataFunc=PathTracingPassCPTool.getVertexBufferData,
          )
        });

        testPromise(
          "set each render geometry's vertices, texCoords(should flip vertical), normals, tangents(compute) to buffer data and set buffer's data",
          () => {
            let _ = _prepare();
            let setSubFloat32DataStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonTool.createThreeArgsEmptyStubData;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~setSubFloat32Data=
                setSubFloat32DataStubData->SinonTool.getDpFunc,
              (),
            )
            ->WebGPUDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  let (buffer, _, _) =
                    PathTracingPassCPTool.getVertexBufferData();

                  setSubFloat32DataStubData
                  ->SinonTool.getStub
                  ->expect
                  ->SinonTool.toCalledWith((
                      0,
                      Js.Typed_array.Float32Array.make([|
                        10.,
                        10.,
                        11.,
                        0.,
                        0.5,
                        1.,
                        0.,
                        0.,
                        1.,
                        2.,
                        3.,
                        0.,
                        (-0.24470466375350952),
                        (-0.5224775075912476),
                        (-0.8167845010757446),
                        0.,
                        1.5,
                        2.,
                        3.,
                        0.,
                        0.10000000149011612,
                        0.,
                        0.,
                        0.,
                        2.,
                        1.5,
                        3.,
                        0.,
                        (-0.5092150568962097),
                        (-0.3632996380329132),
                        (-0.7802008390426636),
                        0.,
                        2.5,
                        2.,
                        3.5,
                        0.,
                        0.20000000298023224,
                        0.5,
                        0.,
                        0.,
                        3.,
                        3.5,
                        4.5,
                        0.,
                        (-0.4640968143939972),
                        (-0.5406073331832886),
                        (-0.7016821503639221),
                        0.,
                        20.,
                        10.,
                        11.,
                        0.,
                        0.10000000149011612,
                        0.8999999761581421,
                        0.,
                        0.,
                        2.,
                        (-1.),
                        3.5,
                        0.,
                        (-0.46341636776924133),
                        0.28125104308128357,
                        (-0.8403232097625732),
                        0.,
                        1.5,
                        3.,
                        1.,
                        0.,
                        0.6000000238418579,
                        0.30000001192092896,
                        0.,
                        0.,
                        2.,
                        1.,
                        3.5,
                        0.,
                        (-0.4861387014389038),
                        (-0.2385973036289215),
                        (-0.8406785726547241),
                        0.,
                        2.5,
                        2.5,
                        (-1.5),
                        0.,
                        0.11999999731779099,
                        0.5,
                        0.,
                        0.,
                        3.,
                        5.5,
                        (-2.5),
                        0.,
                        (-0.3303399085998535),
                        (-0.7303808927536011),
                        0.5978455543518066,
                        0.,
                        2.,
                        3.,
                        10.,
                        0.,
                        0.6000000238418579,
                        0.7599999904632568,
                        0.,
                        0.,
                        (-1.),
                        2.,
                        3.,
                        0.,
                        0.2768343389034271,
                        (-0.5682389140129089),
                        (-0.7748982310295105),
                        0.,
                      |]),
                      buffer->StorageBufferVO.value,
                    ));
                },
              (),
            );
          },
        );
        // describe("fix bug", () => {
        //   testPromise(
        //     "test tangents for two render geometries",
        //     () => {
        //       let _ = _prepare();
        //       let setSubFloat32DataStubData =
        //         createEmptyStub(refJsObjToSandbox(sandbox^))
        //         ->SinonTool.createThreeArgsEmptyStubData;
        //       WebGPUDependencyTool.build(
        //         ~sandbox,
        //         ~setSubFloat32Data=
        //           setSubFloat32DataStubData->SinonTool.getDpFunc,
        //         (),
        //       )
        //       ->WebGPUDependencyTool.set;
        //       DirectorCPTool.initAndUpdate(
        //         ~handleSuccessFunc=
        //           () => {
        //             let (buffer, _, _) =
        //               PathTracingPassCPTool.getVertexBufferData();
        //             setSubFloat32DataStubData
        //             ->SinonTool.getStub
        //             ->expect
        //             ->SinonTool.toCalledWith((
        //                 0,
        //                 Js.Typed_array.Float32Array.make(
        //                   [||]
        //                 ),
        //                 buffer->StorageBufferVO.value,
        //               ));
        //           },
        //         (),
        //       );
        //     },
        //   )
        // });
      });

      describe("build and set index buffer data", () => {
        // beforeEach(() => {
        //   TestCPTool.updateBufferCount(
        //     ~geometryCount=2,
        //     ~geometryPointCount=100,
        //     (),
        //   )
        // });

        describe("build index buffer data", () => {
          testPromise("create buffer", () => {
            let (device, _, _) = _prepare();
            let buffer = WebGPUDependencyTool.createBufferObject();
            let createBufferStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonTool.returns(buffer)
              ->SinonTool.createTwoArgsEmptyStubData;
            let copy_dst = 2;
            let storage = 3;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
              ~storage_bufferUsage=storage,
              ~copy_dst_bufferUsage=copy_dst,
              (),
            )
            ->WebGPUDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  let (buffer, bufferSize) =
                    PathTracingPassCPTool.getIndexBufferData();

                  (
                    bufferSize,
                    createBufferStubData
                    ->SinonTool.getStub
                    ->SinonTool.calledWithArg2(
                        {"size": bufferSize, "usage": copy_dst lor storage},
                        device,
                      ),
                  )
                  ->expect
                  == (9 * Js.Typed_array.Uint32Array._BYTES_PER_ELEMENT, true);
                },
              (),
            );
          })
        });

        testPromise(
          "set each render geometry's indices to buffer data and set buffer's data",
          () => {
            let _ = _prepare();
            let setSubUint32DataStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonTool.createThreeArgsEmptyStubData;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~setSubUint32Data=setSubUint32DataStubData->SinonTool.getDpFunc,
              (),
            )
            ->WebGPUDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  let (buffer, _) =
                    PathTracingPassCPTool.getIndexBufferData();

                  setSubUint32DataStubData
                  ->SinonTool.getStub
                  ->expect
                  ->SinonTool.toCalledWith((
                      0,
                      Uint32Array.make([|2, 1, 0, 2, 0, 1, 3, 1, 2|]),
                      buffer->StorageBufferVO.value,
                    ));
                },
              (),
            );
          },
        );
      });

      describe("build and set pbr material buffer data", () => {
        // beforeEach(() => {
        //   TestCPTool.updateBufferCount(~pbrMaterialCount=3, ())
        // });

        describe("build pbr material buffer data", () => {
          _testCreateBuffer(
            ~getBufferSizeFunc=
              count =>
                (4 + 4 + 4 + 8)
                * 2
                * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
            ~getBufferDataFunc=PathTracingPassCPTool.getPBRMaterialBufferData,
          )
        });

        testPromise(
          "set each render pbrMaterial's diffuse, specular, roughness, metalness, diffuseMapLayerIndex, channelRoughnessMetallicMapLayerIndex, emissionMapLayerIndex, normalMapLayerIndex, diffuseMapScale, channelRoughnessMetallicScaleScale, emissionMapScale, normalMapScale to buffer data",
          () => {
            open ImagePOType;
            let (
              device,
              (gameObject1, gameObject2),
              ((geometry1, geometry2), (material1, material2)),
            ) =
              _prepare();
            let _ = PBRMaterialCPTool.setMapData(material1, material2);
            TextureArrayCPTool.setMapBetweenAllUsedImageIdToLayerIndex();
            let (textureArrayLayerWidth, textureArrayLayerHeight) = (8, 8);
            WebGPUDependencyTool.build(
              ~sandbox,
              ~getTextureArrayLayerSize=
                () => (textureArrayLayerWidth, textureArrayLayerHeight),
              (),
            )
            ->WebGPUDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  let (_, _, typeArr) =
                    PathTracingPassCPTool.getPBRMaterialBufferData();

                  typeArr->expect
                  == Js.Typed_array.Float32Array.make([|
                       1.,
                       0.,
                       0.,
                       0.,
                       1.,
                       0.5,
                       0.5,
                       0.,
                       2.,
                       1.,
                       5000.,
                       3.,
                       0.25,
                       0.25,
                       0.25,
                       0.125,
                       1.,
                       1.,
                       0.25,
                       0.25,
                       0.,
                       1.,
                       0.,
                       0.,
                       2.,
                       1.5,
                       1.,
                       0.,
                       2.,
                       1.,
                       0.,
                       5000.,
                       0.25,
                       0.25,
                       0.25,
                       0.125,
                       0.5,
                       0.25,
                       1.,
                       1.,
                     |]);
                },
              (),
            );
          },
        );
        testPromise("set buffer's data", () => {
          let _ = _prepare();
          let setSubFloat32DataStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonTool.createThreeArgsEmptyStubData;
          WebGPUDependencyTool.build(
            ~sandbox,
            ~setSubFloat32Data=setSubFloat32DataStubData->SinonTool.getDpFunc,
            (),
          )
          ->WebGPUDependencyTool.set;

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                let (buffer, _, typeArr) =
                  PathTracingPassCPTool.getPBRMaterialBufferData();

                setSubFloat32DataStubData
                ->SinonTool.getStub
                ->expect
                ->SinonTool.toCalledWith((
                    0,
                    typeArr,
                    buffer->StorageBufferVO.value,
                  ));
              },
            (),
          );
        });
      });
    });

    describe("create ray tracing bind group and add to po", () => {
      let _prepare = () => {
        let (device, queue) = _prepare();

        let instanceContainer =
          WebGPURayTracingDependencyTool.createAccelerationContainerObject();
        let createRayTracingAccelerationContainerStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^));
        createRayTracingAccelerationContainerStubData->SinonTool.returns(
          instanceContainer,
        );
        let createRayTracingAccelerationContainerStubData =
          createRayTracingAccelerationContainerStubData->SinonTool.createTwoArgsEmptyStubData;

        (
          device,
          (instanceContainer, createRayTracingAccelerationContainerStubData),
        );
      };

      testPromise("create ray tracing bind group layout", () => {
        let (
          device,
          (instanceContainer, createRayTracingAccelerationContainerStubData),
        ) =
          _prepare();
        let layout = WebGPUDependencyTool.createBindGroupLayoutObject();
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(layout)
          ->SinonTool.createTwoArgsEmptyStubData;
        let ray_generation = 2;
        let ray_closest_hit = 3;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        WebGPURayTracingDependencyTool.build(
          ~sandbox,
          ~createRayTracingAccelerationContainer=
            createRayTracingAccelerationContainerStubData->SinonTool.getDpFunc,
          ~ray_generation,
          ~ray_closest_hit,
          (),
        )
        ->WebGPURayTracingDependencyTool.set;

        DirectorCPTool.initAndUpdate(
          ~handleSuccessFunc=
            () => {
              createBindGroupLayoutStubData
              ->SinonTool.getStub
              ->expect
              ->SinonTool.toCalledWith((
                  {
                    "entries": [|
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=0,
                        ~visibility=ray_generation lor ray_closest_hit,
                        ~type_="acceleration-container",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=1,
                        ~visibility=ray_generation,
                        ~type_="storage-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=2,
                        ~visibility=ray_generation,
                        ~type_="uniform-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=3,
                        ~visibility=ray_closest_hit,
                        ~type_="storage-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=4,
                        ~visibility=ray_closest_hit,
                        ~type_="storage-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=5,
                        ~visibility=ray_closest_hit,
                        ~type_="storage-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=6,
                        ~visibility=ray_closest_hit,
                        ~type_="storage-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=7,
                        ~visibility=ray_closest_hit,
                        ~type_="storage-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=8,
                        ~visibility=
                          WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.
                            ray_closest_hit,
                        ~type_="sampler",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=9,
                        ~visibility=
                          WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.
                            ray_closest_hit,
                        ~type_="sampled-texture",
                        ~viewDimension="2d-array",
                        (),
                      ),
                    |],
                  },
                  device,
                ))
            },
          (),
        );
      });
      testPromise("create bind group and set to po", () => {
        let (
          device,
          (instanceContainer, createRayTracingAccelerationContainerStubData),
        ) =
          _prepare();
        let layout = WebGPUDependencyTool.createBindGroupLayoutObject();
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(layout)
          ->SinonTool.createTwoArgsEmptyStubData;
        let rtBindGroup = WebGPUDependencyTool.createBindGroupObject();
        let createRayTracingBindGroupStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(rtBindGroup)
          ->SinonTool.createTwoArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        WebGPURayTracingDependencyTool.build(
          ~sandbox,
          ~createRayTracingAccelerationContainer=
            createRayTracingAccelerationContainerStubData->SinonTool.getDpFunc,
          ~createRayTracingBindGroup=
            createRayTracingBindGroupStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPURayTracingDependencyTool.set;

        DirectorCPTool.initAndUpdate(
          ~handleSuccessFunc=
            () => {
              let (pixelBuffer, pixelBufferSize) =
                PassCPTool.getPixelBufferData();
              let (commonBuffer, commonBufferData) =
                PassCPTool.getCommonBufferData();
              let (sceneDescBuffer, sceneDescBufferSize, _) =
                PathTracingPassCPTool.getSceneDescBufferData();

              let (pointIndexBuffer, pointIndexBufferSize, _) =
                PathTracingPassCPTool.getPointIndexBufferData();

              let (vertexBuffer, vertexBufferSize, _) =
                PathTracingPassCPTool.getVertexBufferData();
              let (indexBuffer, indexBufferSize) =
                PathTracingPassCPTool.getIndexBufferData();
              let (pbrMaterialBuffer, pbrMaterialBufferSize, _) =
                PathTracingPassCPTool.getPBRMaterialBufferData();

              (
                createRayTracingBindGroupStubData
                ->SinonTool.getStub
                ->SinonTool.calledWithArg2(
                    {
                      "layout": layout,
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
                          ~size=
                            commonBufferData->PassCPDoService.getCommonBufferDataSize,
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
                          ~sampler=TextureArrayCPTool.getTextureSampler(),
                          ~size=0,
                          (),
                        ),
                        IWebGPURayTracingDp.binding(
                          ~binding=9,
                          ~textureView=
                            TextureArrayCPTool.getTextureArrayView(),
                          ~size=0,
                          (),
                        ),
                      |],
                    },
                    device,
                  ),
                PathTracingPassCPTool.getAllStaticBindGroupData()
                ->ListSt.head
                ->OptionSt.getExn,
              )
              ->expect
              == (true, {setSlot: 0, bindGroup: rtBindGroup});
            },
          (),
        );
      });
    });

    describe("create pipeline and set to po", () => {
      testPromise("test", () => {
        let (device, queue) = _prepare();
        let rtBindGroupLayout =
          WebGPUDependencyTool.createBindGroupLayoutObject();
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(rtBindGroupLayout)
          ->SinonTool.createTwoArgsEmptyStubData;
        let pipelineLayout = WebGPUDependencyTool.createPipelineLayout();
        let createPipelineLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(pipelineLayout)
          ->SinonTool.createTwoArgsEmptyStubData;
        let pipeline =
          WebGPURayTracingDependencyTool.createRayTracingPipelineObject();
        let createRayTracingPipelineStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(pipeline)
          ->SinonTool.createTwoArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonTool.getDpFunc,
          ~createPipelineLayout=
            createPipelineLayoutStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        WebGPURayTracingDependencyTool.build(
          ~sandbox,
          ~createRayTracingPipeline=
            createRayTracingPipelineStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPURayTracingDependencyTool.set;

        DirectorCPTool.initAndUpdate(
          ~handleSuccessFunc=
            () => {
              let cameraBindGroupLayout =
                PathTracingPassCPTool.getCameraBindGroupLayout();
              let directionLightBindGroupLayout =
                PathTracingPassCPTool.getDirectionLightBindGroupLayout();
              let shaderBindingTable =
                PathTracingPassCPTool.getShaderBindingTable();

              WebGPUDependencyTool.createBindGroupLayoutObject()
              ->PathTracingPassCPRepo.setDirectionLightBindGroupLayout;

              (
                createPipelineLayoutStubData
                ->SinonTool.getStub
                ->SinonTool.calledWithArg2(
                    {
                      "bindGroupLayouts": [|
                        rtBindGroupLayout,
                        cameraBindGroupLayout,
                        directionLightBindGroupLayout,
                      |],
                    },
                    device,
                  ),
                createRayTracingPipelineStubData
                ->SinonTool.getStub
                ->SinonTool.calledWithArg2(
                    IWebGPURayTracingDp.pipelineRayTracingDescriptor(
                      ~layout=pipelineLayout,
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
                  ),
                PathTracingPassCPTool.getPipeline(),
              )
              ->expect
              == (true, true, pipeline);
            },
          (),
        );
      })
    });
  });
