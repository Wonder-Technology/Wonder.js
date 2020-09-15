open Wonder_jest;

let _ =
  describe("test init_webgpu job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = sandbox => {
      let width = 10;
      let height = 20;
      DirectorCPTool.prepare(~pictureSize=(width, height), ());
      let window = WebGPUDependencyTool.createWindowObject();
      let make =
        createEmptyStubWithJsObjSandbox(sandbox)
        ->SinonCPTool.returns(window);
      let adapter = WebGPUDependencyTool.createAdapterObject();
      let requestAdapter =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(
            Js.Promise.make((~resolve, ~reject) => resolve(. adapter)),
          );
      let device = WebGPUDependencyTool.createDeviceObject();
      let requestDeviceStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(
            Js.Promise.make((~resolve, ~reject) => resolve(. device)),
          )
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let swapChainFormat = "2";
      let getSwapChainPreferredFormatStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(
            Js.Promise.make((~resolve, ~reject) =>
              resolve(. swapChainFormat)
            ),
          )
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let swapChain = WebGPUDependencyTool.createSwapChainObject();
      let configureSwapChainStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(swapChain)
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let context = WebGPUDependencyTool.createContextObject();
      let getContext =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(context);
      let queue = WebGPUDependencyTool.createQueueObject();
      let getQueue =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(queue);
      WebGPUDependencyTool.build(
        ~sandbox,
        ~make,
        ~getContext,
        ~getQueue,
        ~requestAdapter,
        ~requestDevice=requestDeviceStubData->SinonCPTool.getDpFunc,
        ~configureSwapChain=configureSwapChainStubData->SinonCPTool.getDpFunc,
        ~getSwapChainPreferredFormat=
          getSwapChainPreferredFormatStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;

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
      );
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
              elements: [{name: "init_webgpu", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

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
      ) =
        _prepare(sandbox);

      DirectorCPTool.init(
        ~handleSuccessFunc=
          () => {
            make
            ->expect
            ->SinonCPTool.toCalledWith({
                "width": width,
                "height": height,
                "title": "Cloud Picture",
                "resizable": false,
              })
          },
        (),
      );
    });
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
      ) =
        _prepare(sandbox);

      DirectorCPTool.init(
        ~handleSuccessFunc=
          () => {
            requestAdapter
            ->expect
            ->SinonCPTool.toCalledWith(
                IWebGPUCoreDp.adapterDescriptor(
                  ~window,
                  ~preferredBackend="Vulkan",
                  (),
                ),
              )
          },
        (),
      );
    });
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
      ) =
        _prepare(sandbox);

      DirectorCPTool.init(
        ~handleSuccessFunc=
          () => {
            requestDeviceStubData
            ->SinonCPTool.getStub
            ->expect
            ->SinonCPTool.toCalledWith((
                {"extensions": [|"ray_tracing"|]},
                adapter,
              ))
          },
        (),
      );
    });
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
      ) =
        _prepare(sandbox);

      DirectorCPTool.init(
        ~handleSuccessFunc=
          () => {
            configureSwapChainStubData
            ->SinonCPTool.getStub
            ->expect
            ->SinonCPTool.toCalledWith((
                {"device": device, "format": swapChainFormat},
                context,
              ))
          },
        (),
      );
    });
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
      ) =
        _prepare(sandbox);

      DirectorCPTool.init(
        ~handleSuccessFunc=
          () => {WebGPUCPTool.getWindow()->OptionSt.getExn->expect == window},
        (),
      );
    });
    testPromise(
      "set device, adapter, context, queue, swapChainFormat, swapChain", () => {
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
      ) =
        _prepare(sandbox);

      DirectorCPTool.init(
        ~handleSuccessFunc=
          () => {
            (
              WebGPUCPTool.getDevice()->OptionSt.getExn,
              WebGPUCPTool.getAdapter()->OptionSt.getExn,
              WebGPUCPTool.getContext()->OptionSt.getExn,
              WebGPUCPTool.getQueue()->OptionSt.getExn,
              WebGPUCPTool.getSwapChainFormat()->OptionSt.getExn,
              WebGPUCPTool.getSwapChain()->OptionSt.getExn,
            )
            ->expect
            == (device, adapter, context, queue, swapChainFormat, swapChain)
          },
        (),
      );
    });
  });
