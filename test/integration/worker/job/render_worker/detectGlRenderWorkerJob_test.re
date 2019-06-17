open Wonder_jest;

open Js.Promise;

let _ =
  describe("test detect gl render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~buffer=SettingTool.buildBufferConfigStr(),
          (),
        );
    });
    afterEach(() => TestWorkerTool.clear(sandbox));
    describe("detect extension", () => {
      let _test = (callIndex, extensionStr) => {
        let renderWorkerState =
          RenderWorkerStateTool.createStateAndSetToStateData();
        let renderWorkerState =
          renderWorkerState
          |> FakeGlWorkerTool.setFakeGlToRenderWorkerState(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        TestMainWorkerTool.closeContractCheck();
        WorkerJobWorkerTool.execRenderWorkerJob(
          ~e=Some({
               "data": {
                 "bufferData": {},
               },
             }),
          ~execJobFunc=DetectGlRenderWorkerJob.execJob,
          ~completeFunc=
            state => {
              let gl = GlRenderWorkerTool.unsafeGetGl(state) |> Obj.magic;
              gl##getExtension
              |> getCall(callIndex)
              |> expect
              |> toCalledWith([|extensionStr|])
              |> resolve;
            },
          (),
        );
      };

      testPromise("detect instanced_arrays", () =>
        _test(0, "ANGLE_instanced_arrays")
      );
      testPromise("detect element_index_uint", () =>
        _test(1, "OES_element_index_uint")
      );
    });
  });