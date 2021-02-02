open Wonder_jest

let _ = describe("test init_accumulation_pass job", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  let _prepare = () => {
    let device = WebGPUDependencyTool.createDeviceObject()
    WebGPUCPTool.setDevice(device)
    let window = WebGPUDependencyTool.createWindowObject()
    WebGPUCPTool.setWindow(window)
    let swapChainFormat = "swapChainFormat"
    WebGPUCPTool.setSwapChainFormat(swapChainFormat)

    WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set

    PassCPTool.buildAndSetAllBufferData(window, device)

    (window, device, swapChainFormat)
  }

  beforeEach(() => {
    sandbox := createSandbox()
    TestCPTool.init(
      ~sandbox,
      ~initPipelineData={
        name: "init",
        firstGroup: "frame",
        groups: list{
          {
            name: "frame",
            link: Concat,
            elements: list{{name: "init_accumulation_pass", type_: Job}},
          },
        },
      },
      (),
    )
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("build buffer data and set to po", () =>
    describe("build accumulation pixel buffer data and set to po", () =>
      testPromise("create buffer", () => {
        let (window, device, swapChainFormat) = _prepare()
        let width = 10
        let height = 20
        let getWidth =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(width)
        let getHeight =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(height)
        let buffer = WebGPUDependencyTool.createBufferObject()
        let createBufferStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->SinonTool.returns(buffer)
          ->SinonTool.createTwoArgsEmptyStubData
        let storage = 3
        let copy_dst = 4
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
          ~storage_bufferUsage=storage,
          ~copy_dst_bufferUsage=copy_dst,
          ~getWidth,
          ~getHeight,
          (),
        )->WebGPUDependencyTool.set

        DirectorCPTool.init(~handleSuccessFunc=() => {
          let (buffer, bufferSize) = AccumulationPassCPTool.getAccumulationPixelBufferData()

          (
            bufferSize,
            createBufferStubData
            ->SinonTool.getStub
            ->getCall(0, _)
            ->SinonTool.calledWithArg2(
              {"size": bufferSize, "usage": lor(copy_dst, storage)},
              device,
            ),
          )->expect == (width * height * 4 * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT, true)
        }, ())
      })
    )
  )

  describe("create bind group and set to po", () => {
    testPromise("create bind group layout", () => {
      let (window, device, swapChainFormat) = _prepare()
      let layout = WebGPUDependencyTool.createBindGroupLayoutObject()
      let createBindGroupLayoutStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(layout)
        ->SinonTool.createTwoArgsEmptyStubData
      let fragment = 2
      WebGPUDependencyTool.build(
        ~sandbox,
        ~fragment,
        ~createBindGroupLayout=createBindGroupLayoutStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set

      DirectorCPTool.init(~handleSuccessFunc=() =>
        createBindGroupLayoutStubData
        ->SinonTool.getStub
        ->getCall(0, _)
        ->expect
        ->SinonTool.toCalledWith((
          {
            "entries": [
              Wonderjs.IWebGPUCoreDp.layoutBinding(
                ~binding=0,
                ~visibility=fragment,
                ~type_="storage-buffer",
                (),
              ),
              Wonderjs.IWebGPUCoreDp.layoutBinding(
                ~binding=1,
                ~visibility=fragment,
                ~type_="storage-buffer",
                (),
              ),
              Wonderjs.IWebGPUCoreDp.layoutBinding(
                ~binding=2,
                ~visibility=fragment,
                ~type_="uniform-buffer",
                (),
              ),
              Wonderjs.IWebGPUCoreDp.layoutBinding(
                ~binding=3,
                ~visibility=fragment,
                ~type_="uniform-buffer",
                (),
              ),
            ],
          },
          device,
        ))
      , ())
    })
    testPromise("create bind group and set to po", () => {
      let (window, device, swapChainFormat) = _prepare()
      let layout = WebGPUDependencyTool.createBindGroupLayoutObject()
      let createBindGroupLayoutStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(layout)
        ->SinonTool.createTwoArgsEmptyStubData
      let bindGroup = WebGPUDependencyTool.createBindGroupObject()
      let createBindGroupStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(bindGroup)
        ->SinonTool.createTwoArgsEmptyStubData
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createBindGroupLayout=createBindGroupLayoutStubData->SinonTool.getDpFunc,
        ~createBindGroup=createBindGroupStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set

      DirectorCPTool.init(~handleSuccessFunc=() => {
        let (resolutionBuffer, resolutionBufferData) = PassCPTool.getResolutionBufferData()
        let (pixelBuffer, pixelBufferSize) = PassCPTool.getPixelBufferData()
        let (commonBuffer, commonBufferData) = PassCPTool.getCommonBufferData()
        let (
          accumulationPixelBuffer,
          accumulationPixelBufferSize,
        ) = AccumulationPassCPTool.getAccumulationPixelBufferData()

        (
          createBindGroupStubData
          ->SinonTool.getStub
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(
            {
              "layout": layout,
              "entries": [
                Wonderjs.IWebGPUCoreDp.binding(
                  ~binding=0,
                  ~buffer=pixelBuffer->Wonderjs.StorageBufferVO.value,
                  ~offset=0,
                  ~size=pixelBufferSize,
                  (),
                ),
                Wonderjs.IWebGPUCoreDp.binding(
                  ~binding=1,
                  ~buffer=accumulationPixelBuffer->Wonderjs.StorageBufferVO.value,
                  ~offset=0,
                  ~size=accumulationPixelBufferSize,
                  (),
                ),
                Wonderjs.IWebGPUCoreDp.binding(
                  ~binding=2,
                  ~buffer=resolutionBuffer->Wonderjs.UniformBufferVO.value,
                  ~offset=0,
                  ~size=resolutionBufferData->PassCPDoService.getResolutionBufferDataSize,
                  (),
                ),
                Wonderjs.IWebGPUCoreDp.binding(
                  ~binding=3,
                  ~buffer=commonBuffer->Wonderjs.UniformBufferVO.value,
                  ~offset=0,
                  ~size=commonBufferData->PassCPDoService.getCommonBufferDataSize,
                  (),
                ),
              ],
            },
            device,
          ),
          AccumulationPassCPTool.getStaticBindGroupData(),
        )->expect == (true, {setSlot: 0, bindGroup: bindGroup})
      }, ())
    })
  })

  describe("create pipeline and set to po", () => {
    testPromise("create all shader modules", () => {
      let (window, device, swapChainFormat) = _prepare()
      let baseShaderPath = "src/run/rtx_path_tracer/domain_layer/domain/shader/accumulation"
      let buffer = WebGPUDependencyTool.createBufferObject()
      let vertexGLSL = "a1"
      let fragmentGLSL = "a2"
      let loadGLSL = createEmptyStub(refJsObjToSandbox(sandbox.contents))
      loadGLSL->onCall(0, _)->SinonTool.returns(vertexGLSL)
      loadGLSL->onCall(1, _)->SinonTool.returns(fragmentGLSL)
      let createShaderModuleStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createShaderModule=createShaderModuleStubData->SinonTool.getDpFunc,
        ~loadGLSL,
        (),
      )->WebGPUDependencyTool.set

      DirectorCPTool.init(
        ~handleSuccessFunc=() =>
          (
            (
              createShaderModuleStubData
              ->SinonTool.getStub
              ->getCall(0, _)
              ->SinonTool.calledWithArg2({"code": vertexGLSL}, device),
              createShaderModuleStubData
              ->SinonTool.getStub
              ->getCall(1, _)
              ->SinonTool.calledWithArg2({"code": fragmentGLSL}, device),
            ),
            (
              loadGLSL->getCall(0, _)->SinonTool.calledWith(j`$(baseShaderPath)/accumulation.vert`),
              loadGLSL->getCall(1, _)->SinonTool.calledWith(j`$(baseShaderPath)/accumulation.frag`),
            ),
          )->expect == ((true, true), (true, true)),
        (),
      )
    })
    testPromise("create pipeline and set to po", () => {
      let (window, device, swapChainFormat) = _prepare()
      let vertexShaderModule = WebGPUDependencyTool.createShaderModuleObject()
      let fragmentShaderModule = WebGPUDependencyTool.createShaderModuleObject()
      let createShaderModuleStubData = createEmptyStub(refJsObjToSandbox(sandbox.contents))
      createShaderModuleStubData->onCall(0, _)->SinonTool.returns(vertexShaderModule)
      createShaderModuleStubData->onCall(1, _)->SinonTool.returns(fragmentShaderModule)
      let createShaderModuleStubData =
        createShaderModuleStubData->SinonTool.createTwoArgsEmptyStubData
      let bindGroupLayout = WebGPUDependencyTool.createBindGroupLayoutObject()
      let createBindGroupLayoutStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(bindGroupLayout)
        ->SinonTool.createTwoArgsEmptyStubData
      let pipelineLayout = WebGPUDependencyTool.createPipelineLayout()
      let createPipelineLayoutStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(pipelineLayout)
        ->SinonTool.createTwoArgsEmptyStubData
      let renderPipeline = WebGPUDependencyTool.createRenderPipelineObject()
      let createRenderPipelineStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(renderPipeline)
        ->SinonTool.createTwoArgsEmptyStubData
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createShaderModule=createShaderModuleStubData->SinonTool.getDpFunc,
        ~createBindGroupLayout=createBindGroupLayoutStubData->SinonTool.getDpFunc,
        ~createPipelineLayout=createPipelineLayoutStubData->SinonTool.getDpFunc,
        ~createRenderPipeline=createRenderPipelineStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set

      DirectorCPTool.init(~handleSuccessFunc=() => {
        let (resolutionBuffer, resolutionBufferData) = PassCPTool.getResolutionBufferData()
        let (pixelBuffer, pixelBufferSize) = PassCPTool.getPixelBufferData()
        let (
          accumulationPixelBuffer,
          accumulationPixelBufferSize,
        ) = AccumulationPassCPTool.getAccumulationPixelBufferData()

        (
          createPipelineLayoutStubData
          ->SinonTool.getStub
          ->getCall(0, _)
          ->SinonTool.calledWithArg2({"bindGroupLayouts": [bindGroupLayout]}, device),
          createRenderPipelineStubData
          ->SinonTool.getStub
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(
            Wonderjs.IWebGPUCoreDp.pipelineRenderDescriptor(
              ~layout=pipelineLayout,
              ~vertexStage=Wonderjs.IWebGPUCoreDp.vertexStage(
                ~module_=vertexShaderModule,
                ~entryPoint="main",
              ),
              ~fragmentStage=Wonderjs.IWebGPUCoreDp.fragmentStage(
                ~module_=fragmentShaderModule,
                ~entryPoint="main",
              ),
              ~primitiveTopology="triangle-list",
              ~vertexState=Wonderjs.IWebGPUCoreDp.vertexState(~indexFormat="uint32", ()),
              ~rasterizationState=Wonderjs.IWebGPUCoreDp.rasterizationState(),
              ~colorStates=[
                Wonderjs.IWebGPUCoreDp.colorState(
                  ~format=swapChainFormat,
                  ~alphaBlend=Wonderjs.IWebGPUCoreDp.blendDescriptor(),
                  ~colorBlend=Wonderjs.IWebGPUCoreDp.blendDescriptor(),
                ),
              ],
              (),
            ),
            device,
          ),
          AccumulationPassCPTool.getPipeline(),
        )->expect == (true, true, renderPipeline)
      }, ())
    })
  })
})
