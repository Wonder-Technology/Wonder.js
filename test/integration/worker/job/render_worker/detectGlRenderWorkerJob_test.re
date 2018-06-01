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
    describe("detect extension", () =>
      testPromise("detect instanced_arrays", () => {
        let renderWorkerState =
          RenderWorkerStateTool.createStateAndSetToStateData();
        let renderWorkerState =
          renderWorkerState
          |> FakeGlWorkerTool.setFakeGlToRenderWorkerState(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        TestMainWorkerTool.closeContractCheck();
        WorkerJobWorkerTool.execRenderWorkerJob(
          ~e=
            Some({
              "data": {
                "bufferData": {
                  "textureCountPerMaterial": 16,
                },
              },
            }),
          ~execJobFunc=DetectGlRenderWorkerJob.execJob,
          ~completeFunc=
            state => {
              let gl = GlRenderWorkerTool.unsafeGetGl(state) |> Obj.magic;
              gl##getExtension |> expect |> toCalledOnce |> resolve;
            },
          (),
        );
      })
    );
  });