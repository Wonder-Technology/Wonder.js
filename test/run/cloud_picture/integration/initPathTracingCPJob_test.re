open Wonder_jest;

let _ =
  describe("test init_pathTracing job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = sandbox => {
      let (gameObject, light) = DirectionLightTool.createGameObject();

      let device = WebGPUDependencyTool.createDeviceObject();
      WebGPUCPTool.setDevice(device);
      let queue = WebGPUDependencyTool.createQueueObject();
      WebGPUCPTool.setQueue(queue);

      WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;
      WebGPURayTracingDependencyTool.build(~sandbox, ())
      ->WebGPURayTracingDependencyTool.set;

      CameraCPTool.buildAndSetAllBufferData(device);

      ((device, queue), (gameObject, light));
    };

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~initPipelineData={
          name: "init",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "init_pathTracing", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("create shader binding table and set to po", () => {
      testPromise("create all shader modules", () => {
        let ((device, _), _) = _prepare(sandbox);
        let baseShaderPath = "src/run/cloud_picture/domain_layer/domain/shader/ray_tracing";
        let buffer = WebGPUDependencyTool.createBufferObject();
        let rayGenGLSL = "a1";
        let rayRChitGLSL = "a2";
        let rayMissGLSL = "a3";
        let rayMissShadowGLSL = "a4";
        let loadGLSL = createEmptyStub(refJsObjToSandbox(sandbox^));
        loadGLSL->onCall(0, _)->SinonTool.returns(rayGenGLSL);
        loadGLSL->onCall(1, _)->SinonTool.returns(rayRChitGLSL);
        loadGLSL->onCall(2, _)->SinonTool.returns(rayMissGLSL);
        loadGLSL->onCall(3, _)->SinonTool.returns(rayMissShadowGLSL);
        let createShaderModuleStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.createTwoArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createShaderModule=createShaderModuleStubData->SinonTool.getDpFunc,
          ~loadGLSL,
          (),
        )
        ->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              (
                (
                  createShaderModuleStubData
                  ->SinonTool.getStub
                  ->getCall(0, _)
                  ->SinonTool.calledWithArg2({"code": rayGenGLSL}, device),
                  createShaderModuleStubData
                  ->SinonTool.getStub
                  ->getCall(1, _)
                  ->SinonTool.calledWithArg2({"code": rayRChitGLSL}, device),
                  createShaderModuleStubData
                  ->SinonTool.getStub
                  ->getCall(2, _)
                  ->SinonTool.calledWithArg2({"code": rayMissGLSL}, device),
                  createShaderModuleStubData
                  ->SinonTool.getStub
                  ->getCall(3, _)
                  ->SinonTool.calledWithArg2(
                      {"code": rayMissShadowGLSL},
                      device,
                    ),
                ),
                (
                  loadGLSL
                  ->getCall(0, _)
                  ->SinonTool.calledWith(
                      {j|$(baseShaderPath)/ray-generation.rgen|j},
                    ),
                  loadGLSL
                  ->getCall(1, _)
                  ->SinonTool.calledWith(
                      {j|$(baseShaderPath)/ray-closest-hit.rchit|j},
                    ),
                  loadGLSL
                  ->getCall(2, _)
                  ->SinonTool.calledWith(
                      {j|$(baseShaderPath)/ray-miss.rmiss|j},
                    ),
                  loadGLSL
                  ->getCall(3, _)
                  ->SinonTool.calledWith(
                      {j|$(baseShaderPath)/ray-miss-shadow.rmiss|j},
                    ),
                ),
              )
              ->expect
              == ((true, true, true, true), (true, true, true, true))
            },
          (),
        );
      });
      testPromise("create ray tracing shader binding table", () => {
        let ((device, _), _) = _prepare(sandbox);
        let buffer = WebGPUDependencyTool.createBufferObject();
        let rayGenShaderModule =
          WebGPUDependencyTool.createShaderModuleObject();
        let rayRChitShaderModule =
          WebGPUDependencyTool.createShaderModuleObject();
        let rayMissShaderModule =
          WebGPUDependencyTool.createShaderModuleObject();
        let rayMissShadowShaderModule =
          WebGPUDependencyTool.createShaderModuleObject();
        let createShaderModuleStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^));
        createShaderModuleStubData
        ->onCall(0, _)
        ->SinonTool.returns(rayGenShaderModule);
        createShaderModuleStubData
        ->onCall(1, _)
        ->SinonTool.returns(rayRChitShaderModule);
        createShaderModuleStubData
        ->onCall(2, _)
        ->SinonTool.returns(rayMissShaderModule);
        createShaderModuleStubData
        ->onCall(3, _)
        ->SinonTool.returns(rayMissShadowShaderModule);
        let createShaderModuleStubData =
          createShaderModuleStubData->SinonTool.createTwoArgsEmptyStubData;
        let createRayTracingShaderBindingTableStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.createTwoArgsEmptyStubData;
        let ray_generation = 0;
        let ray_closest_hit = 1;
        let ray_miss = 2;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createShaderModule=createShaderModuleStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        WebGPURayTracingDependencyTool.build(
          ~sandbox,
          ~ray_generation,
          ~ray_closest_hit,
          ~ray_miss,
          ~createRayTracingShaderBindingTable=
            createRayTracingShaderBindingTableStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPURayTracingDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              createRayTracingShaderBindingTableStubData
              ->SinonTool.getStub
              ->expect
              ->SinonTool.toCalledWith((
                  {
                    "stages": [|
                      {"module": rayGenShaderModule, "stage": ray_generation},
                      {
                        "module": rayRChitShaderModule,
                        "stage": ray_closest_hit,
                      },
                      {"module": rayMissShaderModule, "stage": ray_miss},
                      {
                        "module": rayMissShadowShaderModule,
                        "stage": ray_miss,
                      },
                    |],
                    "groups": [|
                      IWebGPURayTracingDp.group(
                        ~type_="general-hit-group",
                        ~generalIndex=0,
                        (),
                      ),
                      IWebGPURayTracingDp.group(
                        ~type_="triangles-hit-group",
                        ~closestHitIndex=1,
                        (),
                      ),
                      IWebGPURayTracingDp.group(
                        ~type_="general",
                        ~generalIndex=2,
                        (),
                      ),
                      IWebGPURayTracingDp.group(
                        ~type_="general",
                        ~generalIndex=3,
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
    });

    describe("create bind group layout and set to po", () => {
      testPromise("create camera bind group layout and set to po", () => {
        let ((device, _), _) = _prepare(sandbox);
        let layout = WebGPUDependencyTool.createBindGroupLayoutObject();
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(layout)
          ->SinonTool.createTwoArgsEmptyStubData;
        let ray_generation = 0;
        let ray_closest_hit = 1;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        WebGPURayTracingDependencyTool.build(
          ~sandbox,
          ~ray_generation,
          ~ray_closest_hit,
          (),
        )
        ->WebGPURayTracingDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              (
                createBindGroupLayoutStubData
                ->SinonTool.getStub
                ->getCall(0, _)
                ->SinonTool.calledWithArg2(
                    {
                      "entries": [|
                        IWebGPUCoreDp.layoutBinding(
                          ~binding=0,
                          ~visibility=ray_generation,
                          ~type_="uniform-buffer",
                          (),
                        ),
                      |],
                    },
                    device,
                  ),
                PathTracingPassCPTool.getCameraBindGroupLayout(),
              )
              ->expect
              == (true, layout)
            },
          (),
        );
      });
      testPromise("create direction light bind group layout and set to po", () => {
        let ((device, _), _) = _prepare(sandbox);
        let layout = WebGPUDependencyTool.createBindGroupLayoutObject();
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(1, _)
          ->SinonTool.returns(layout)
          ->SinonTool.createTwoArgsEmptyStubData;
        let ray_generation = 0;
        let ray_closest_hit = 1;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        WebGPURayTracingDependencyTool.build(
          ~sandbox,
          ~ray_generation,
          ~ray_closest_hit,
          (),
        )
        ->WebGPURayTracingDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              (
                createBindGroupLayoutStubData
                ->SinonTool.getStub
                ->getCall(1, _)
                ->SinonTool.calledWithArg2(
                    {
                      "entries": [|
                        IWebGPUCoreDp.layoutBinding(
                          ~binding=0,
                          ~visibility=ray_closest_hit,
                          ~type_="storage-buffer",
                          (),
                        ),
                      |],
                    },
                    device,
                  ),
                PathTracingPassCPTool.getDirectionLightBindGroupLayout(),
              )
              ->expect
              == (true, layout)
            },
          (),
        );
      });
    });

    describe("create bind group and add to po", () => {
      testPromise("create camera bind group and add to po", () => {
        let ((device, _), _) = _prepare(sandbox);
        let layout = WebGPUDependencyTool.createBindGroupLayoutObject();
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(layout)
          ->SinonTool.createTwoArgsEmptyStubData;
        let bindGroup = WebGPUDependencyTool.createBindGroupObject();
        let createBindGroupStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonTool.returns(bindGroup)
          ->SinonTool.createTwoArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonTool.getDpFunc,
          ~createBindGroup=createBindGroupStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (cameraBuffer, cameraBufferData) =
                CameraCPTool.getCameraBufferData();

              (
                createBindGroupStubData
                ->SinonTool.getStub
                ->getCall(0, _)
                ->SinonTool.calledWithArg2(
                    {
                      "layout": layout,
                      "entries": [|
                        IWebGPUCoreDp.binding(
                          ~binding=0,
                          ~buffer=cameraBuffer->UniformBufferVO.value,
                          ~offset=0,
                          ~size=
                            cameraBufferData->Js.Typed_array.Float32Array.byteLength,
                          (),
                        ),
                      |],
                    },
                    device,
                  ),
                PathTracingPassCPTool.getAllStaticBindGroupData()
                ->ListSt.nth(1)
                ->OptionSt.getExn,
              )
              ->expect
              == (true, {setSlot: 1, bindGroup});
            },
          (),
        );
      });

      describe("create direction light bind group and add to po", () => {
        let _computeDirectionLightBufferSize = directionLightCount =>
          directionLightCount
          * (4 + 4)
          * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT;

        describe("build direction light buffer data", () => {
          describe("contract check", () => {
            testPromise("should only has one direction light", () => {
              let ((device, _), _) = _prepare(sandbox);
              let (gameObject2, light2) =
                DirectionLightTool.createGameObject();

              ExpectStreamTool.toFail(
                ~execFunc=DirectorCPTool.init,
                ~message="expect only has one direction light",
              );
            })
          });

          testPromise("create buffer", () => {
            let ((device, _), _) = _prepare(sandbox);
            let directionLightCount = 10;
            POConfigTool.setAllCount(~directionLightCount, ());
            let buffer = WebGPUDependencyTool.createBufferObject();
            let createBufferStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->onCall(0, _)
              ->SinonTool.returns(buffer)
              ->SinonTool.createTwoArgsEmptyStubData;
            let copy_dst = 2;
            let storage = 3;
            let setSubFloat32DataStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonTool.createThreeArgsEmptyStubData;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
              ~setSubFloat32Data=
                setSubFloat32DataStubData->SinonTool.getDpFunc,
              ~storage_bufferUsage=storage,
              ~copy_dst_bufferUsage=copy_dst,
              (),
            )
            ->WebGPUDependencyTool.set;

            DirectorCPTool.init(
              ~handleSuccessFunc=
                () => {
                  (
                    createBufferStubData
                    ->SinonTool.getStub
                    ->SinonTool.calledWithArg2(
                        {
                          "size":
                            directionLightCount->_computeDirectionLightBufferSize,
                          "usage": copy_dst lor storage,
                        },
                        device,
                      ),
                    setSubFloat32DataStubData
                    ->SinonTool.getStub
                    ->getCall(0, _)
                    ->getArgs
                    ->ListSt.nth(2)
                    ->OptionSt.getExn,
                  )
                  ->expect
                  == (true, buffer)
                },
              (),
            );
          });

          describe("set buffer's data", () => {
            testPromise("test buffer's data", () => {
              let ((device, _), (gameObject, light)) = _prepare(sandbox);
              let intensity = 2.0;
              TransformGameObjectTool.setLocalPosition(
                gameObject,
                (1., 2., 3.)->PositionVO.create,
              );
              DirectionLightCPAPI.setIntensity(
                light,
                intensity->IntensityVO.create,
              )
              ->ResultTool.getExnSuccessValueIgnore;
              let createBufferStubData =
                createEmptyStub(refJsObjToSandbox(sandbox^))
                ->SinonTool.createTwoArgsEmptyStubData;
              let setSubFloat32DataStubData =
                createEmptyStub(refJsObjToSandbox(sandbox^))
                ->SinonTool.createThreeArgsEmptyStubData;
              WebGPUDependencyTool.build(
                ~sandbox,
                ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
                ~setSubFloat32Data=
                  setSubFloat32DataStubData->SinonTool.getDpFunc,
                (),
              )
              ->WebGPUDependencyTool.set;

              DirectorCPTool.init(
                ~handleSuccessFunc=
                  () => {
                    let typeArr =
                      setSubFloat32DataStubData
                      ->SinonTool.getStub
                      ->getCall(0, _)
                      ->getArgs
                      ->ListSt.nth(1)
                      ->OptionSt.getExn;

                    let (x, y, z) =
                      DirectionLightCPAPI.getDirection(light)
                      ->OptionSt.getExn
                      ->DirectionVO.value;

                    typeArr->TypeArrayCPTool.Float32Array.slice(0, 10)->expect
                    == Js.Typed_array.Float32Array.make([|
                         intensity,
                         0.,
                         0.,
                         0.,
                         x,
                         y,
                         z,
                         0.,
                         0.,
                         0.,
                       |]);
                  },
                (),
              );
            })
          });
        });

        testPromise("create direction light bind group and add to po", () => {
          let ((device, _), _) = _prepare(sandbox);
          let directionLightCount = 5;
          POConfigTool.setAllCount(~directionLightCount, ());
          let buffer = WebGPUDependencyTool.createBufferObject();
          let createBufferStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->onCall(0, _)
            ->SinonTool.returns(buffer)
            ->SinonTool.createTwoArgsEmptyStubData;
          let layout = WebGPUDependencyTool.createBindGroupLayoutObject();
          let createBindGroupLayoutStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->onCall(1, _)
            ->SinonTool.returns(layout)
            ->SinonTool.createTwoArgsEmptyStubData;
          let bindGroup = WebGPUDependencyTool.createBindGroupObject();
          let createBindGroupStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->onCall(1, _)
            ->SinonTool.returns(bindGroup)
            ->SinonTool.createTwoArgsEmptyStubData;
          WebGPUDependencyTool.build(
            ~sandbox,
            ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
            ~createBindGroupLayout=
              createBindGroupLayoutStubData->SinonTool.getDpFunc,
            ~createBindGroup=createBindGroupStubData->SinonTool.getDpFunc,
            (),
          )
          ->WebGPUDependencyTool.set;

          DirectorCPTool.init(
            ~handleSuccessFunc=
              () => {
                (
                  createBindGroupStubData
                  ->SinonTool.getStub
                  ->getCall(1, _)
                  ->SinonTool.calledWithArg2(
                      {
                        "layout": layout,
                        "entries": [|
                          IWebGPUCoreDp.binding(
                            ~binding=0,
                            ~buffer,
                            ~offset=0,
                            ~size=
                              directionLightCount->_computeDirectionLightBufferSize,
                            (),
                          ),
                        |],
                      },
                      device,
                    ),
                  PathTracingPassCPTool.getAllStaticBindGroupData()
                  ->ListSt.nth(0)
                  ->OptionSt.getExn,
                )
                ->expect
                == (true, {setSlot: 2, bindGroup})
              },
            (),
          );
        });
      });
    });
  });
