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
        loadGLSL->onCall(0, _)->SinonCPTool.returns(rayGenGLSL);
        loadGLSL->onCall(1, _)->SinonCPTool.returns(rayRChitGLSL);
        loadGLSL->onCall(2, _)->SinonCPTool.returns(rayMissGLSL);
        loadGLSL->onCall(3, _)->SinonCPTool.returns(rayMissShadowGLSL);
        let createShaderModuleStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonCPTool.createTwoArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createShaderModule=
            createShaderModuleStubData->SinonCPTool.getDpFunc,
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
                  ->SinonCPTool.getStub
                  ->getCall(0, _)
                  ->SinonCPTool.calledWithArg2({"code": rayGenGLSL}, device),
                  createShaderModuleStubData
                  ->SinonCPTool.getStub
                  ->getCall(1, _)
                  ->SinonCPTool.calledWithArg2(
                      {"code": rayRChitGLSL},
                      device,
                    ),
                  createShaderModuleStubData
                  ->SinonCPTool.getStub
                  ->getCall(2, _)
                  ->SinonCPTool.calledWithArg2(
                      {"code": rayMissGLSL},
                      device,
                    ),
                  createShaderModuleStubData
                  ->SinonCPTool.getStub
                  ->getCall(3, _)
                  ->SinonCPTool.calledWithArg2(
                      {"code": rayMissShadowGLSL},
                      device,
                    ),
                ),
                (
                  loadGLSL
                  ->getCall(0, _)
                  ->SinonCPTool.calledWith(
                      {j|$(baseShaderPath)/ray-generation.rgen|j},
                    ),
                  loadGLSL
                  ->getCall(1, _)
                  ->SinonCPTool.calledWith(
                      {j|$(baseShaderPath)/ray-closest-hit.rchit|j},
                    ),
                  loadGLSL
                  ->getCall(2, _)
                  ->SinonCPTool.calledWith(
                      {j|$(baseShaderPath)/ray-miss.rmiss|j},
                    ),
                  loadGLSL
                  ->getCall(3, _)
                  ->SinonCPTool.calledWith(
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
        ->SinonCPTool.returns(rayGenShaderModule);
        createShaderModuleStubData
        ->onCall(1, _)
        ->SinonCPTool.returns(rayRChitShaderModule);
        createShaderModuleStubData
        ->onCall(2, _)
        ->SinonCPTool.returns(rayMissShaderModule);
        createShaderModuleStubData
        ->onCall(3, _)
        ->SinonCPTool.returns(rayMissShadowShaderModule);
        let createShaderModuleStubData =
          createShaderModuleStubData->SinonCPTool.createTwoArgsEmptyStubData;
        let createRayTracingShaderBindingTableStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonCPTool.createTwoArgsEmptyStubData;
        let ray_generation = 0;
        let ray_closest_hit = 1;
        let ray_miss = 2;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createShaderModule=
            createShaderModuleStubData->SinonCPTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        WebGPURayTracingDependencyTool.build(
          ~sandbox,
          ~ray_generation,
          ~ray_closest_hit,
          ~ray_miss,
          ~createRayTracingShaderBindingTable=
            createRayTracingShaderBindingTableStubData->SinonCPTool.getDpFunc,
          (),
        )
        ->WebGPURayTracingDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              createRayTracingShaderBindingTableStubData
              ->SinonCPTool.getStub
              ->expect
              ->SinonCPTool.toCalledWith((
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
                        ~closestHitIndex=2,
                        (),
                      ),
                      IWebGPURayTracingDp.group(
                        ~type_="general",
                        ~closestHitIndex=3,
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
          ->SinonCPTool.returns(layout)
          ->SinonCPTool.createTwoArgsEmptyStubData;
        let ray_generation = 0;
        let ray_closest_hit = 1;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonCPTool.getDpFunc,
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
                ->SinonCPTool.getStub
                ->getCall(0, _)
                ->SinonCPTool.calledWithArg2(
                    {
                      "entries": [|
                        IWebGPUCoreDp.layoutBinding(
                          ~binding=0,
                          ~visibility=ray_generation lor ray_closest_hit,
                          ~type_="uniform-buffer",
                          (),
                        ),
                      |],
                    },
                    device,
                  ),
                PathTracingPassCPTool.getCameraBindGroupLayout()
                ->OptionSt.getExn,
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
          ->SinonCPTool.returns(layout)
          ->SinonCPTool.createTwoArgsEmptyStubData;
        let ray_generation = 0;
        let ray_closest_hit = 1;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonCPTool.getDpFunc,
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
                ->SinonCPTool.getStub
                ->getCall(1, _)
                ->SinonCPTool.calledWithArg2(
                    {
                      "entries": [|
                        IWebGPUCoreDp.layoutBinding(
                          ~binding=0,
                          ~visibility=ray_generation lor ray_closest_hit,
                          ~type_="storage-buffer",
                          (),
                        ),
                      |],
                    },
                    device,
                  ),
                PathTracingPassCPTool.getDirectionLightBindGroupLayout()
                ->OptionSt.getExn,
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
          ->SinonCPTool.returns(layout)
          ->SinonCPTool.createTwoArgsEmptyStubData;
        let bindGroup = WebGPUDependencyTool.createBindGroupObject();
        let createBindGroupStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonCPTool.returns(bindGroup)
          ->SinonCPTool.createTwoArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonCPTool.getDpFunc,
          ~createBindGroup=createBindGroupStubData->SinonCPTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (cameraBuffer, cameraBufferData) =
                CameraCPTool.getCameraBufferData()->OptionSt.getExn;

              (
                createBindGroupStubData
                ->SinonCPTool.getStub
                ->getCall(0, _)
                ->SinonCPTool.calledWithArg2(
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
            POConfigCPTool.setDirectionLightCount(directionLightCount);
            let buffer = WebGPUDependencyTool.createBufferObject();
            let createBufferStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->onCall(0, _)
              ->SinonCPTool.returns(buffer)
              ->SinonCPTool.createTwoArgsEmptyStubData;
            let copy_dst = 2;
            let storage = 3;
            let setSubFloat32DataStubData =
              createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonCPTool.createThreeArgsEmptyStubData;
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
              ~setSubFloat32Data=
                setSubFloat32DataStubData->SinonCPTool.getDpFunc,
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
                    ->SinonCPTool.getStub
                    ->SinonCPTool.calledWithArg2(
                        {
                          "size":
                            directionLightCount->_computeDirectionLightBufferSize,
                          "usage": copy_dst lor storage,
                        },
                        device,
                      ),
                    setSubFloat32DataStubData
                    ->SinonCPTool.getStub
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
              DirectionLightRunAPI.setIntensity(
                light,
                intensity->IntensityVO.create,
              )
              ->ResultTool.getExnSuccessValueIgnore;
              let createBufferStubData =
                createEmptyStub(refJsObjToSandbox(sandbox^))
                ->SinonCPTool.createTwoArgsEmptyStubData;
              let setSubFloat32DataStubData =
                createEmptyStub(refJsObjToSandbox(sandbox^))
                ->SinonCPTool.createThreeArgsEmptyStubData;
              WebGPUDependencyTool.build(
                ~sandbox,
                ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
                ~setSubFloat32Data=
                  setSubFloat32DataStubData->SinonCPTool.getDpFunc,
                (),
              )
              ->WebGPUDependencyTool.set;

              DirectorCPTool.init(
                ~handleSuccessFunc=
                  () => {
                    let typeArr =
                      setSubFloat32DataStubData
                      ->SinonCPTool.getStub
                      ->getCall(0, _)
                      ->getArgs
                      ->ListSt.nth(1)
                      ->OptionSt.getExn;

                    let (x, y, z) =
                      DirectionLightRunAPI.getDirection(light)
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
          POConfigCPTool.setDirectionLightCount(directionLightCount);
          let buffer = WebGPUDependencyTool.createBufferObject();
          let createBufferStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->onCall(0, _)
            ->SinonCPTool.returns(buffer)
            ->SinonCPTool.createTwoArgsEmptyStubData;
          let layout = WebGPUDependencyTool.createBindGroupLayoutObject();
          let createBindGroupLayoutStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->onCall(1, _)
            ->SinonCPTool.returns(layout)
            ->SinonCPTool.createTwoArgsEmptyStubData;
          let bindGroup = WebGPUDependencyTool.createBindGroupObject();
          let createBindGroupStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->onCall(1, _)
            ->SinonCPTool.returns(bindGroup)
            ->SinonCPTool.createTwoArgsEmptyStubData;
          WebGPUDependencyTool.build(
            ~sandbox,
            ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
            ~createBindGroupLayout=
              createBindGroupLayoutStubData->SinonCPTool.getDpFunc,
            ~createBindGroup=createBindGroupStubData->SinonCPTool.getDpFunc,
            (),
          )
          ->WebGPUDependencyTool.set;

          DirectorCPTool.init(
            ~handleSuccessFunc=
              () => {
                (
                  createBindGroupStubData
                  ->SinonCPTool.getStub
                  ->getCall(1, _)
                  ->SinonCPTool.calledWithArg2(
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

    describe("build buffer data and set to po", () => {
      let _test =
          (
            ~getBufferSizeFunc,
            ~makeTypeArrFunc,
            ~setCountFunc,
            ~getBufferDataFunc,
          ) => {
        let _prepare = sandbox => {
          let ((device, queue), _) = _prepare(sandbox);
          let count = 3;
          setCountFunc(count);

          (device, count);
        };

        testPromise("create buffer", () => {
          let (device, count) = _prepare(sandbox);
          let buffer = WebGPUDependencyTool.createBufferObject();
          let createBufferStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonCPTool.returns(buffer)
            ->SinonCPTool.createTwoArgsEmptyStubData;
          let copy_dst = 2;
          let storage = 3;
          WebGPUDependencyTool.build(
            ~sandbox,
            ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
            ~storage_bufferUsage=storage,
            ~copy_dst_bufferUsage=copy_dst,
            (),
          )
          ->WebGPUDependencyTool.set;

          DirectorCPTool.init(
            ~handleSuccessFunc=
              () => {
                let (buffer, bufferSize, _) =
                  getBufferDataFunc()->OptionSt.getExn;

                (
                  bufferSize,
                  createBufferStubData
                  ->SinonCPTool.getStub
                  ->SinonCPTool.calledWithArg2(
                      {"size": bufferSize, "usage": copy_dst lor storage},
                      device,
                    ),
                )
                ->expect
                == (getBufferSizeFunc(count), true);
              },
            (),
          );
        });

        testPromise("create type arr", () => {
          let (device, count) = _prepare(sandbox);

          DirectorCPTool.init(
            ~handleSuccessFunc=
              () => {
                let (_, _, typeArr) = getBufferDataFunc()->OptionSt.getExn;

                typeArr->expect == makeTypeArrFunc(count);
              },
            (),
          );
        });
      };

      describe("build scene desc buffer data and set to po", () => {
        _test(
          ~getBufferSizeFunc=
            count =>
              (4 + 12 + 16)
              * count
              * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
          ~makeTypeArrFunc=
            count =>
              ((4 + 12 + 16) * count)->Js.Typed_array.Float32Array.fromLength,
          ~setCountFunc=POConfigCPTool.setTransformCount,
          ~getBufferDataFunc=PathTracingPassCPTool.getSceneDescBufferData,
        )
      });

      describe("build point index buffer data and set to po", () => {
        _test(
          ~getBufferSizeFunc=
            count => 2 * count * Js.Typed_array.Uint32Array._BYTES_PER_ELEMENT,
          ~makeTypeArrFunc=
            count => (2 * count)->Js.Typed_array.Uint32Array.fromLength,
          ~setCountFunc=POConfigCPTool.setGeometryCount,
          ~getBufferDataFunc=PathTracingPassCPTool.getPointIndexBufferData,
        )
      });

      describe("build vertex buffer data and set to po", () => {
        _test(
          ~getBufferSizeFunc=
            count =>
              4 * 2 * count * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
          ~makeTypeArrFunc=
            count => (4 * 2 * count)->Js.Typed_array.Float32Array.fromLength,
          ~setCountFunc=POConfigCPTool.setGeometryPointCount,
          ~getBufferDataFunc=PathTracingPassCPTool.getVertexBufferData,
        )
      });

      describe("build index buffer data and set to po", () => {
        let _prepare = sandbox => {
          let ((device, queue), _) = _prepare(sandbox);
          let count = 3;
          POConfigCPTool.setGeometryPointCount(count);

          (device, count);
        };

        testPromise("create buffer", () => {
          let (device, count) = _prepare(sandbox);
          let buffer = WebGPUDependencyTool.createBufferObject();
          let createBufferStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonCPTool.returns(buffer)
            ->SinonCPTool.createTwoArgsEmptyStubData;
          let copy_dst = 2;
          let storage = 3;
          WebGPUDependencyTool.build(
            ~sandbox,
            ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
            ~storage_bufferUsage=storage,
            ~copy_dst_bufferUsage=copy_dst,
            (),
          )
          ->WebGPUDependencyTool.set;

          DirectorCPTool.init(
            ~handleSuccessFunc=
              () => {
                let (buffer, bufferSize) =
                  PathTracingPassCPTool.getIndexBufferData()->OptionSt.getExn;

                (
                  bufferSize,
                  createBufferStubData
                  ->SinonCPTool.getStub
                  ->SinonCPTool.calledWithArg2(
                      {"size": bufferSize, "usage": copy_dst lor storage},
                      device,
                    ),
                )
                ->expect
                == (
                     1 * count * Js.Typed_array.Uint32Array._BYTES_PER_ELEMENT,
                     true,
                   );
              },
            (),
          );
        });
      });

      describe("build pbr material buffer data and set to po", () => {
        _test(
          ~getBufferSizeFunc=
            count =>
              (4 + 4) * count * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
          ~makeTypeArrFunc=
            count => ((4 + 4) * count)->Js.Typed_array.Float32Array.fromLength,
          ~setCountFunc=POConfigCPTool.setPBRMaterialCount,
          ~getBufferDataFunc=PathTracingPassCPTool.getPBRMaterialBufferData,
        )
      });
    });
  });
