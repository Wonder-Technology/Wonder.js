open Wonder_jest;

let _ =
  describe("test init_accumulation job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      let device = WebGPUDependencyTool.createDeviceObject();
      WebGPUCPTool.setDevice(device);
      let window = WebGPUDependencyTool.createWindowObject();
      WebGPUCPTool.setWindow(window);
      let swapChainFormat = "swapChainFormat";
      WebGPUCPTool.setSwapChainFormat(swapChainFormat);

      WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;
      //   WebGPURayTracingDependencyTool.build(~sandbox, ())
      //   ->WebGPURayTracingDependencyTool.set;

      PassCPTool.buildAndSetAllBufferData(window, device);

      (window, device, swapChainFormat);
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
              elements: [{name: "init_accumulation", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("build buffer data and set to po", () => {
      describe("build accumulation pixel buffer data and set to po", () => {
        testPromise("create buffer", () => {
          let (window, device, swapChainFormat) = _prepare();
          let width = 10;
          let height = 20;
          let getWidth =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonCPTool.returns(width);
          let getHeight =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonCPTool.returns(height);
          let buffer = WebGPUDependencyTool.createBufferObject();
          let createBufferStubData =
            createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonCPTool.returns(buffer)
            ->SinonCPTool.createTwoArgsEmptyStubData;
          let storage = 3;
          let copy_dst = 4;
          WebGPUDependencyTool.build(
            ~sandbox,
            ~createBuffer=createBufferStubData->SinonCPTool.getDpFunc,
            ~storage_bufferUsage=storage,
            ~copy_dst_bufferUsage=copy_dst,
            ~getWidth,
            ~getHeight,
            (),
          )
          ->WebGPUDependencyTool.set;

          DirectorCPTool.init(
            ~handleSuccessFunc=
              () => {
                let (buffer, bufferSize) =
                  AccumulationPassCPTool.getAccumulationPixelBufferData();

                (
                  bufferSize,
                  createBufferStubData
                  ->SinonCPTool.getStub
                  ->getCall(0, _)
                  ->SinonCPTool.calledWithArg2(
                      {"size": bufferSize, "usage": copy_dst lor storage},
                      device,
                    ),
                )
                ->expect
                == (
                     width
                     * height
                     * 4
                     * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
                     true,
                   );
              },
            (),
          );
        })
      })
    });

    describe("create bind group and set to po", () => {
      testPromise("create bind group layout", () => {
        let (window, device, swapChainFormat) = _prepare();
        let layout = WebGPUDependencyTool.createBindGroupLayoutObject();
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonCPTool.returns(layout)
          ->SinonCPTool.createTwoArgsEmptyStubData;
        let fragment = 2;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~fragment,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonCPTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              createBindGroupLayoutStubData
              ->SinonCPTool.getStub
              ->getCall(0, _)
              ->expect
              ->SinonCPTool.toCalledWith((
                  {
                    "entries": [|
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=0,
                        ~visibility=fragment,
                        ~type_="storage-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=1,
                        ~visibility=fragment,
                        ~type_="storage-buffer",
                        (),
                      ),
                      IWebGPUCoreDp.layoutBinding(
                        ~binding=2,
                        ~visibility=fragment,
                        ~type_="uniform-buffer",
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
        let (window, device, swapChainFormat) = _prepare();
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
              let (resolutionBuffer, resolutionBufferData) =
                PassCPTool.getResolutionBufferData();
              let (pixelBuffer, pixelBufferSize) =
                PassCPTool.getPixelBufferData();
              let (accumulationPixelBuffer, accumulationPixelBufferSize) =
                AccumulationPassCPTool.getAccumulationPixelBufferData();

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
                          ~buffer=pixelBuffer->StorageBufferVO.value,
                          ~offset=0,
                          ~size=pixelBufferSize,
                          (),
                        ),
                        IWebGPUCoreDp.binding(
                          ~binding=1,
                          ~buffer=
                            accumulationPixelBuffer->StorageBufferVO.value,
                          ~offset=0,
                          ~size=accumulationPixelBufferSize,
                          (),
                        ),
                        IWebGPUCoreDp.binding(
                          ~binding=2,
                          ~buffer=resolutionBuffer->UniformBufferVO.value,
                          ~offset=0,
                          ~size=
                            resolutionBufferData->PassCPDoService.getResolutionBufferDataSize,
                          (),
                        ),
                      |],
                    },
                    device,
                  ),
                AccumulationPassCPTool.getStaticBindGroupData(),
              )
              ->expect
              == (true, {setSlot: 0, bindGroup});
            },
          (),
        );
      });
    });

    describe("create pipeline and set to po", () => {
      testPromise("create all shader modules", () => {
        let (window, device, swapChainFormat) = _prepare();
        let baseShaderPath = "src/run/cloud_picture/domain_layer/domain/shader/accumulation";
        let buffer = WebGPUDependencyTool.createBufferObject();
        let vertexGLSL = "a1";
        let fragmentGLSL = "a2";
        let loadGLSL = createEmptyStub(refJsObjToSandbox(sandbox^));
        loadGLSL->onCall(0, _)->SinonCPTool.returns(vertexGLSL);
        loadGLSL->onCall(1, _)->SinonCPTool.returns(fragmentGLSL);
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
                  ->SinonCPTool.calledWithArg2({"code": vertexGLSL}, device),
                  createShaderModuleStubData
                  ->SinonCPTool.getStub
                  ->getCall(1, _)
                  ->SinonCPTool.calledWithArg2(
                      {"code": fragmentGLSL},
                      device,
                    ),
                ),
                (
                  loadGLSL
                  ->getCall(0, _)
                  ->SinonCPTool.calledWith(
                      {j|$(baseShaderPath)/accumulation.vert|j},
                    ),
                  loadGLSL
                  ->getCall(1, _)
                  ->SinonCPTool.calledWith(
                      {j|$(baseShaderPath)/accumulation.frag|j},
                    ),
                ),
              )
              ->expect
              == ((true, true), (true, true))
            },
          (),
        );
      });
      testPromise("create pipeline and set to po", () => {
        let (window, device, swapChainFormat) = _prepare();
        let vertexShaderModule =
          WebGPUDependencyTool.createShaderModuleObject();
        let fragmentShaderModule =
          WebGPUDependencyTool.createShaderModuleObject();
        let createShaderModuleStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^));
        createShaderModuleStubData
        ->onCall(0, _)
        ->SinonCPTool.returns(vertexShaderModule);
        createShaderModuleStubData
        ->onCall(1, _)
        ->SinonCPTool.returns(fragmentShaderModule);
        let createShaderModuleStubData =
          createShaderModuleStubData->SinonCPTool.createTwoArgsEmptyStubData;
        let bindGroupLayout =
          WebGPUDependencyTool.createBindGroupLayoutObject();
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonCPTool.returns(bindGroupLayout)
          ->SinonCPTool.createTwoArgsEmptyStubData;
        let pipelineLayout = WebGPUDependencyTool.createPipelineLayout();
        let createPipelineLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonCPTool.returns(pipelineLayout)
          ->SinonCPTool.createTwoArgsEmptyStubData;
        let renderPipeline = WebGPUDependencyTool.createRenderPipelineObject();
        let createRenderPipelineStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->onCall(0, _)
          ->SinonCPTool.returns(renderPipeline)
          ->SinonCPTool.createTwoArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createShaderModule=
            createShaderModuleStubData->SinonCPTool.getDpFunc,
          ~createBindGroupLayout=
            createBindGroupLayoutStubData->SinonCPTool.getDpFunc,
          ~createPipelineLayout=
            createPipelineLayoutStubData->SinonCPTool.getDpFunc,
          ~createRenderPipeline=
            createRenderPipelineStubData->SinonCPTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (resolutionBuffer, resolutionBufferData) =
                PassCPTool.getResolutionBufferData();
              let (pixelBuffer, pixelBufferSize) =
                PassCPTool.getPixelBufferData();
              let (accumulationPixelBuffer, accumulationPixelBufferSize) =
                AccumulationPassCPTool.getAccumulationPixelBufferData();

              (
                createPipelineLayoutStubData
                ->SinonCPTool.getStub
                ->getCall(0, _)
                ->SinonCPTool.calledWithArg2(
                    {"bindGroupLayouts": [|bindGroupLayout|]},
                    device,
                  ),
                createRenderPipelineStubData
                ->SinonCPTool.getStub
                ->getCall(0, _)
                ->SinonCPTool.calledWithArg2(
                    IWebGPUCoreDp.pipelineRenderDescriptor(
                      ~layout=pipelineLayout,
                      ~vertexStage={
                        IWebGPUCoreDp.vertexStage(
                          ~module_=vertexShaderModule,
                          ~entryPoint="main",
                        );
                      },
                      ~fragmentStage={
                        IWebGPUCoreDp.fragmentStage(
                          ~module_=fragmentShaderModule,
                          ~entryPoint="main",
                        );
                      },
                      ~primitiveTopology="triangle-list",
                      ~vertexState=
                        IWebGPUCoreDp.vertexState(~indexFormat="uint32", ()),
                      ~rasterizationState=IWebGPUCoreDp.rasterizationState(),
                      ~colorStates=[|
                        IWebGPUCoreDp.colorState(
                          ~format=swapChainFormat,
                          ~alphaBlend=IWebGPUCoreDp.blendDescriptor(),
                          ~colorBlend=IWebGPUCoreDp.blendDescriptor(),
                        ),
                      |],
                      (),
                    ),
                    device,
                  ),
                AccumulationPassCPTool.getPipeline(),
              )
              ->expect
              == (true, true, renderPipeline);
            },
          (),
        );
      });
    });
  });
