open Wonder_jest;

let _ =
  describe("test end_render job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      let window = WebGPUDependencyTool.createWindowObject();
      WebGPUCPTool.setWindow(window);
      let swapChain = WebGPUDependencyTool.createSwapChainObject();
      WebGPUCPTool.setSwapChain(swapChain);

      (window, swapChain);
    };

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~renderPipelineData={
          name: "render",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "end_render", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("present", () => {
      let (window, swapChain) = _prepare();
      let present = createEmptyStub(refJsObjToSandbox(sandbox^));

      WebGPUDependencyTool.build(~sandbox, ~present, ())
      ->WebGPUDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {present->expect->SinonCPTool.toCalledWith([|swapChain|])},
        (),
      );
    });
    testPromise("poll events", () => {
      let (window, swapChain) = _prepare();
      let pollEvents = createEmptyStub(refJsObjToSandbox(sandbox^));

      WebGPUDependencyTool.build(~sandbox, ~pollEvents, ())
      ->WebGPUDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {pollEvents->expect->SinonCPTool.toCalledWith([|window|])},
        (),
      );
    });
  });
