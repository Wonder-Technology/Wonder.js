open Wonder_jest

let _ = describe("test init_webgpu job", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  let _prepare = sandbox => {
    let width = 10
    let height = 20
    DirectorCPTool.prepare(~pictureSize=(width, height), ())
    let window = WebGPUDependencyTool.createWindowObject()
    let make = createEmptyStubWithJsObjSandbox(sandbox)->SinonTool.returns(window)
    let adapter = WebGPUDependencyTool.createAdapterObject()
    let requestAdapter =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(
        Js.Promise.make((~resolve, ~reject) => resolve(. adapter)),
      )
    let device = WebGPUDependencyTool.createDeviceObject()
    let requestDeviceStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(Js.Promise.make((~resolve, ~reject) => resolve(. device)))
      ->SinonTool.createTwoArgsEmptyStubData
    let swapChainFormat = "2"
    let getSwapChainPreferredFormatStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(Js.Promise.make((~resolve, ~reject) => resolve(. swapChainFormat)))
      ->SinonTool.createTwoArgsEmptyStubData
    let swapChain = WebGPUDependencyTool.createSwapChainObject()
    let configureSwapChainStubData =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))
      ->SinonTool.returns(swapChain)
      ->SinonTool.createTwoArgsEmptyStubData
    let context = WebGPUDependencyTool.createContextObject()
    let getContext =
      createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(context)
    let queue = WebGPUDependencyTool.createQueueObject()
    let getQueue = createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(queue)
    WebGPUDependencyTool.build(
      ~sandbox,
      ~make,
      ~getContext,
      ~getQueue,
      ~requestAdapter,
      ~requestDevice=requestDeviceStubData->SinonTool.getDpFunc,
      ~configureSwapChain=configureSwapChainStubData->SinonTool.getDpFunc,
      ~getSwapChainPreferredFormat=getSwapChainPreferredFormatStubData->SinonTool.getDpFunc,
      (),
    )->WebGPUDependencyTool.set

    (
      (width, height),
      (window, adapter, device, swapChainFormat, swapChain, queue, context),
      (
        make,
        requestAdapter,
        requestDeviceStubData,
        getSwapChainPreferredFormatStubData,
        configureSwapChainStubData,
        getContext,
        getQueue,
      ),
    )
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
            elements: list{{name: "init_webgpu", type_: Job}},
          },
        },
      },
      (),
    )
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  testPromise("make window", () => {
    let (
      (width, height),
      (window, adapter, device, swapChainFormat, swapChain, queue, context),
      (
        make,
        requestAdapter,
        requestDeviceStubData,
        getSwapChainPreferredFormatStubData,
        configureSwapChainStubData,
        getContext,
        getQueue,
      ),
    ) = _prepare(sandbox)

    DirectorCPTool.init(~handleSuccessFunc=() =>
      make
      ->expect
      ->SinonTool.toCalledWith({
        "width": width,
        "height": height,
        "title": "Cloud Picture",
        "resizable": false,
      })
    , ())
  })
  testPromise("request adapter", () => {
    let (
      (width, height),
      (window, adapter, device, swapChainFormat, swapChain, queue, context),
      (
        make,
        requestAdapter,
        requestDeviceStubData,
        getSwapChainPreferredFormatStubData,
        configureSwapChainStubData,
        getContext,
        getQueue,
      ),
    ) = _prepare(sandbox)

    DirectorCPTool.init(
      ~handleSuccessFunc=() =>
        requestAdapter
        ->expect
        ->SinonTool.toCalledWith(
          IWebGPUCoreDp.adapterDescriptor(~window, ~preferredBackend="Vulkan", ()),
        ),
      (),
    )
  })
  testPromise("request device", () => {
    let (
      (width, height),
      (window, adapter, device, swapChainFormat, swapChain, queue, context),
      (
        make,
        requestAdapter,
        requestDeviceStubData,
        getSwapChainPreferredFormatStubData,
        configureSwapChainStubData,
        getContext,
        getQueue,
      ),
    ) = _prepare(sandbox)

    DirectorCPTool.init(
      ~handleSuccessFunc=() =>
        requestDeviceStubData
        ->SinonTool.getStub
        ->expect
        ->SinonTool.toCalledWith(({"extensions": ["ray_tracing"]}, adapter)),
      (),
    )
  })
  testPromise("configure swap chain", () => {
    let (
      (width, height),
      (window, adapter, device, swapChainFormat, swapChain, queue, context),
      (
        make,
        requestAdapter,
        requestDeviceStubData,
        getSwapChainPreferredFormatStubData,
        configureSwapChainStubData,
        getContext,
        getQueue,
      ),
    ) = _prepare(sandbox)

    DirectorCPTool.init(
      ~handleSuccessFunc=() =>
        configureSwapChainStubData
        ->SinonTool.getStub
        ->expect
        ->SinonTool.toCalledWith(({"device": device, "format": swapChainFormat}, context)),
      (),
    )
  })
  testPromise("set window", () => {
    let (
      (width, height),
      (window, adapter, device, swapChainFormat, swapChain, queue, context),
      (
        make,
        requestAdapter,
        requestDeviceStubData,
        getSwapChainPreferredFormatStubData,
        configureSwapChainStubData,
        getContext,
        getQueue,
      ),
    ) = _prepare(sandbox)

    DirectorCPTool.init(
      ~handleSuccessFunc=() => WebGPUCPTool.getWindow()->OptionSt.getExn->expect == window,
      (),
    )
  })
  testPromise("set device, adapter, context, queue, swapChainFormat, swapChain", () => {
    let (
      (width, height),
      (window, adapter, device, swapChainFormat, swapChain, queue, context),
      (
        make,
        requestAdapter,
        requestDeviceStubData,
        getSwapChainPreferredFormatStubData,
        configureSwapChainStubData,
        getContext,
        getQueue,
      ),
    ) = _prepare(sandbox)

    DirectorCPTool.init(
      ~handleSuccessFunc=() =>
        (
          WebGPUCPTool.getDevice()->OptionSt.getExn,
          WebGPUCPTool.getAdapter()->OptionSt.getExn,
          WebGPUCPTool.getContext()->OptionSt.getExn,
          WebGPUCPTool.getQueue()->OptionSt.getExn,
          WebGPUCPTool.getSwapChainFormat()->OptionSt.getExn,
          WebGPUCPTool.getSwapChain()->OptionSt.getExn,
        )->expect == (device, adapter, context, queue, swapChainFormat, swapChain),
      (),
    )
  })
})
