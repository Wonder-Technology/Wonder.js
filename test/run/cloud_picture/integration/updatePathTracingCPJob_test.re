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

      WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;
      WebGPURayTracingDependencyTool.build(~sandbox, ())
      ->WebGPURayTracingDependencyTool.set;

      PathTracingPassCPTool.buildAndSetAllBufferData(device);
      PathTracingPassCPTool.createAndSetShaderBindingTable();
      PathTracingPassCPTool.createAndSetAllBindGroupLayoutsAndBindGroups();
      PassCPTool.buildAndSetAllBufferData(
        WebGPUDependencyTool.createWindowObject(),
        device,
      );

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
          (vertices1, vertices2),
          (normals1, normals2),
          (indices1, indices2),
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
        ->SinonCPTool.returns(geometryContainer1);
        createRayTracingAccelerationContainerStubData
        ->onCall(1, _)
        ->SinonCPTool.returns(geometryContainer2);
        createRayTracingAccelerationContainerStubData
        ->onCall(2, _)
        ->SinonCPTool.returns(instanceContainer);
        let createRayTracingAccelerationContainerStubData =
          createRayTracingAccelerationContainerStubData->SinonCPTool.createTwoArgsEmptyStubData;
        // WebGPURayTracingDependencyTool.build(
        //   ~sandbox,
        //   ~createRayTracingAccelerationContainer=
        //     createRayTracingAccelerationContainerStubData->SinonCPTool.getDpFunc,
        //   (),
        // )
        // ->WebGPURayTracingDependencyTool.set;

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
        describe("test two geometries for render", () => {
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
            ->SinonCPTool.returns(vertexBuffer1);
            createBufferStubData
            ->onCall(1, _)
            ->SinonCPTool.returns(indexBuffer1);
            createBufferStubData
            ->onCall(2, _)
            ->SinonCPTool.returns(vertexBuffer2);
            createBufferStubData
            ->onCall(3, _)
            ->SinonCPTool.returns(indexBuffer2);
            let createBufferStubData =
              createBufferStubData->SinonCPTool.createTwoArgsEmptyStubData;
            // WebGPUDependencyTool.build(
            //   ~sandbox,
            //   ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
            //   (),
            // )
            // ->WebGPUDependencyTool.set;

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
              ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
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
                    ->SinonCPTool.getStub
                    ->getCall(0, _)
                    ->SinonCPTool.calledWithArg2(
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
                    ->SinonCPTool.getStub
                    ->getCall(1, _)
                    ->SinonCPTool.calledWithArg2(
                        {
                          "size":
                            indices1->IndicesVO.value->Uint32Array.byteLength,
                          "usage": copy_dst lor ray_tracing,
                        },
                        device,
                      ),
                    createBufferStubData
                    ->SinonCPTool.getStub
                    ->getCall(2, _)
                    ->SinonCPTool.calledWithArg2(
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
                    ->SinonCPTool.getStub
                    ->getCall(3, _)
                    ->SinonCPTool.calledWithArg2(
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
              ->SinonCPTool.createThreeArgsEmptyStubData;
            let setSubFloat32DataStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonCPTool.createThreeArgsEmptyStubData;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
              ~setSubUint32Data=
                setSubUint32DataStubData->SinonCPTool.getDpFunc,
              ~setSubFloat32Data=
                setSubFloat32DataStubData->SinonCPTool.getDpFunc,
              (),
            )
            ->WebGPUDependencyTool.set;

            DirectorCPTool.initAndUpdate(
              ~handleSuccessFunc=
                () => {
                  (
                    setSubFloat32DataStubData
                    ->SinonCPTool.getStub
                    ->getCall(0, _)
                    ->SinonCPTool.calledWithArg3(
                        0,
                        vertices1->VerticesVO.value,
                        vertexBuffer1,
                      ),
                    setSubUint32DataStubData
                    ->SinonCPTool.getStub
                    ->getCall(0, _)
                    ->SinonCPTool.calledWithArg3(
                        0,
                        indices1->IndicesVO.value,
                        indexBuffer1,
                      ),
                    setSubFloat32DataStubData
                    ->SinonCPTool.getStub
                    ->getCall(1, _)
                    ->SinonCPTool.calledWithArg3(
                        0,
                        vertices2->VerticesVO.value,
                        vertexBuffer2,
                      ),
                    setSubUint32DataStubData
                    ->SinonCPTool.getStub
                    ->getCall(1, _)
                    ->SinonCPTool.calledWithArg3(
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
              ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
              (),
            )
            ->WebGPUDependencyTool.set;
            WebGPURayTracingDependencyTool.build(
              ~sandbox,
              ~createRayTracingAccelerationContainer=
                createRayTracingAccelerationContainerStubData->SinonCPTool.getDpFunc,
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
                    ->SinonCPTool.getStub
                    ->getCall(0, _)
                    ->SinonCPTool.calledWithArg2(
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
                    ->SinonCPTool.getStub
                    ->getCall(1, _)
                    ->SinonCPTool.calledWithArg2(
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
                                    vertices1->VerticesVO.value,
                                  ),
                              },
                              "index": {
                                "buffer": indexBuffer2,
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
        describe("test two geometries for render", () => {
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
                createRayTracingAccelerationContainerStubData->SinonCPTool.getDpFunc,
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
                    ->SinonCPTool.getStub
                    ->getCallCount,
                    createRayTracingAccelerationContainerStubData
                    ->SinonCPTool.getStub
                    ->SinonCPTool.calledWithArg2(
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
          ->SinonCPTool.returns(commandEncoder1);
          createCommandEncoderStubData
          ->onCall(1, _)
          ->SinonCPTool.returns(commandEncoder2);
          let createCommandEncoderStubData =
            createCommandEncoderStubData->SinonCPTool.createTwoArgsEmptyStubData;

          let commandBufferObject1 =
            WebGPUDependencyTool.createCommandBufferObject();
          let commandBufferObject2 =
            WebGPUDependencyTool.createCommandBufferObject();
          let finish = createEmptyStub(refJsObjToSandbox(sandbox^));
          finish->onCall(0, _)->SinonCPTool.returns(commandBufferObject1);
          finish->onCall(1, _)->SinonCPTool.returns(commandBufferObject2);

          let submitStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonCPTool.createTwoArgsEmptyStubData;

          let buildRayTracingAccelerationContainerStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonCPTool.createTwoArgsEmptyStubData;

          WebGPUDependencyTool.build(
            ~sandbox,
            ~createCommandEncoder=
              createCommandEncoderStubData->SinonCPTool.getDpFunc,
            ~finish,
            ~submit=submitStubData->SinonCPTool.getDpFunc,
            (),
          )
          ->WebGPUDependencyTool.set;
          WebGPURayTracingDependencyTool.build(
            ~sandbox,
            ~createRayTracingAccelerationContainer=
              createRayTracingAccelerationContainerStubData->SinonCPTool.getDpFunc,
            ~buildRayTracingAccelerationContainer=
              buildRayTracingAccelerationContainerStubData->SinonCPTool.getDpFunc,
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
                  ->SinonCPTool.getStub
                  ->getCall(0, _)
                  ->SinonCPTool.calledWithArg2(
                      geometryContainer1,
                      commandEncoder1,
                    ),
                  buildRayTracingAccelerationContainerStubData
                  ->SinonCPTool.getStub
                  ->getCall(1, _)
                  ->SinonCPTool.calledWithArg2(
                      geometryContainer2,
                      commandEncoder1,
                    ),
                  submitStubData
                  ->SinonCPTool.getStub
                  ->getCall(0, _)
                  ->SinonCPTool.calledWithArg2(
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
                  ->SinonCPTool.getStub
                  ->getCall(2, _)
                  ->SinonCPTool.calledWithArg2(
                      instanceContainer,
                      commandEncoder2,
                    ),
                  submitStubData
                  ->SinonCPTool.getStub
                  ->getCall(1, _)
                  ->SinonCPTool.calledWithArg2(
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
    // describe("update all path tracing's buffer data", () =>
    //   {}
    // );
    // describe("create ray tracing bind group and add to po", () =>
    //   {}
    // );
    // describe("create pipeline and set to po", () =>
    //   {}
    // );
  });
