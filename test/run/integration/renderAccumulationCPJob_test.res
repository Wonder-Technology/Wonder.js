open Wonder_jest

open Wonderjs

let _ = describe("test render_accumulation_pass job", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  let _prepare = () => {
    let device = WebGPUDependencyTool.createDeviceObject()
    WebGPUCPTool.setDevice(device)
    let window = WebGPUDependencyTool.createWindowObject()
    WebGPUCPTool.setWindow(window)
    let queue = WebGPUDependencyTool.createQueueObject()
    WebGPUCPTool.setQueue(queue)
    let swapChain = WebGPUDependencyTool.createSwapChainObject()
    WebGPUCPTool.setSwapChain(swapChain)

    AccumulationPassCPTool.createAndSetPipeline()
    AccumulationPassCPTool.createAndSetAllBindGroups()

    (device, window, queue, swapChain)
  }

  beforeEach(() => {
    sandbox := createSandbox()
    TestCPTool.init(
      ~sandbox,
      ~renderPipelineData={
        name: "render",
        firstGroup: "frame",
        groups: list{
          {
            name: "frame",
            link: Concat,
            elements: list{{name: "render_accumulation_pass", type_: Job}},
          },
        },
      },
      (),
    )
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  testPromise("begin render pass", () => {
    let (device, window, queue, swapChain) = _prepare()
    let commandEncoder = WebGPUDependencyTool.createCommandEncoderObject()
    let createCommandEncoderStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(commandEncoder)
      ->SinonTool.createTwoArgsEmptyStubData
    let backBufferView = WebGPUDependencyTool.createTextureViewObject()
    let getCurrentTextureViewStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(backBufferView)
      ->SinonTool.createTwoArgsEmptyStubData
    let beginRenderPassStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData

    WebGPUDependencyTool.build(
      ~sandbox,
      ~createCommandEncoder=createCommandEncoderStubData->SinonTool.getDpFunc,
      ~getCurrentTextureView=getCurrentTextureViewStubData->SinonTool.getDpFunc,
      ~beginRenderPass=beginRenderPassStubData->SinonTool.getDpFunc,
      (),
    )->WebGPUDependencyTool.set

    DirectorCPTool.initAndRender(~handleSuccessFunc=() =>
      (
        createCommandEncoderStubData
        ->SinonTool.getStub
        ->SinonTool.calledWithArg2(Wonderjs.IWebGPUCoreDp.commandEncoderDescriptor(), device),
        beginRenderPassStubData
        ->SinonTool.getStub
        ->SinonTool.calledWithArg2(
          Wonderjs.IWebGPUCoreDp.passEncoderRenderDescriptor(
            ~colorAttachments=[
              {
                "clearColor": {
                  "r": 0.0,
                  "g": 0.0,
                  "b": 0.0,
                  "a": 1.0,
                },
                "loadOp": "clear",
                "storeOp": "store",
                "attachment": backBufferView,
              },
            ],
            (),
          ),
          commandEncoder,
        ),
      )->expect == (true, true)
    , ())
  })
  testPromise("set pipeline", () => {
    let (device, window, queue, swapChain) = _prepare()
    let setPipelineStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
    let pass = WebGPUDependencyTool.createPassEncoderRenderObject()
    let beginRenderPassStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(pass)
      ->SinonTool.createTwoArgsEmptyStubData
    WebGPUDependencyTool.build(
      ~sandbox,
      ~setPipeline_render=setPipelineStubData->SinonTool.getDpFunc,
      ~beginRenderPass=beginRenderPassStubData->SinonTool.getDpFunc,
      (),
    )->WebGPUDependencyTool.set

    DirectorCPTool.initAndRender(~handleSuccessFunc=() => {
      let pipeline = AccumulationPassCPTool.getPipeline()

      setPipelineStubData->SinonTool.getStub->SinonTool.calledWithArg2(pipeline, pass)->expect ==
        true
    }, ())
  })
  testPromise("set bind group", () => {
    let (device, window, queue, swapChain) = _prepare()
    let setBindGroupStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createThreeArgsEmptyStubData
    let pass = WebGPUDependencyTool.createPassEncoderRenderObject()
    let beginRenderPassStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(pass)
      ->SinonTool.createTwoArgsEmptyStubData
    WebGPUDependencyTool.build(
      ~sandbox,
      ~beginRenderPass=beginRenderPassStubData->SinonTool.getDpFunc,
      ~setBindGroup_render=setBindGroupStubData->SinonTool.getDpFunc,
      (),
    )->WebGPUDependencyTool.set

    DirectorCPTool.initAndRender(~handleSuccessFunc=() => {
      let bindGroupData = AccumulationPassCPTool.getStaticBindGroupData()

      setBindGroupStubData
      ->SinonTool.getStub
      ->SinonTool.calledWithArg3(bindGroupData.setSlot, bindGroupData.bindGroup, pass)
      ->expect == true
    }, ())
  })
  testPromise("draw", () => {
    let (device, window, queue, swapChain) = _prepare()
    let drawStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createFiveArgsEmptyStubData
    let pass = WebGPUDependencyTool.createPassEncoderRenderObject()
    let beginRenderPassStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(pass)
      ->SinonTool.createTwoArgsEmptyStubData

    WebGPUDependencyTool.build(
      ~sandbox,
      ~draw=drawStubData->SinonTool.getDpFunc,
      ~beginRenderPass=beginRenderPassStubData->SinonTool.getDpFunc,
      (),
    )->WebGPUDependencyTool.set
    DirectorCPTool.initAndRender(
      ~handleSuccessFunc=() =>
        drawStubData->SinonTool.getStub->expect->SinonTool.toCalledWith((3, 1, 0, 0, pass)),
      (),
    )
  })
  testPromise("end pass and finish and submit", () => {
    let (device, window, queue, swapChain) = _prepare()
    let endPass = createEmptyStub(refJsObjToSandbox(sandbox.contents))
    let commandBufferObject = WebGPUDependencyTool.createCommandBufferObject()
    let finish = createEmptyStub(refJsObjToSandbox(sandbox.contents))
    finish->onCall(0, _)->SinonTool.returns(commandBufferObject)
    let submitStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
    let pass = WebGPUDependencyTool.createPassEncoderRenderObject()
    let beginRenderPassStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(pass)
      ->SinonTool.createTwoArgsEmptyStubData
    WebGPUDependencyTool.build(
      ~sandbox,
      ~finish,
      ~endPass_render=endPass,
      ~submit=submitStubData->SinonTool.getDpFunc,
      ~beginRenderPass=beginRenderPassStubData->SinonTool.getDpFunc,
      (),
    )->WebGPUDependencyTool.set

    DirectorCPTool.initAndRender(
      ~handleSuccessFunc=() =>
        (
          endPass->SinonTool.calledWith(pass),
          submitStubData->SinonTool.getStub->SinonTool.calledWithArg2([commandBufferObject], queue),
        )->expect == (true, true),
      (),
    )
  })
})
