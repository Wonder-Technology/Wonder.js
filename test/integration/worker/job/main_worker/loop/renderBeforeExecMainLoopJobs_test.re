open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test render before exec main loop jobs",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestMainWorkerTool.initWithJobConfig(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~transformCount=5,
                  ~basicMaterialCount=8,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => TestWorkerTool.clear(sandbox));
      describe(
        "not render in render worker in the first frame",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          testPromise(
            "not send uniform data",
            () => {
              let state = _prepare(sandbox, state^);
              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlWorkerTool.setFakeGl(
                     FakeGlWorkerTool.buildFakeGl(~sandbox, ~uniformMatrix4fv, ~uniform3f, ())
                   );
              let state = MainStateTool.setState(state);
              RenderJobsRenderWorkerTool.init(
                (state) =>
                  RenderJobsRenderWorkerTool.render(
                    sandbox,
                    Obj.magic(1),
                    (_) =>
                      (uniformMatrix4fv |> getCallCount, uniform3f |> getCallCount)
                      |> expect == (0, 0)
                      |> resolve
                  ),
                state
              )
            }
          );
          testPromise(
            "not drawElements",
            () => {
              let state = _prepare(sandbox, state^);
              let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlWorkerTool.setFakeGl(
                     FakeGlWorkerTool.buildFakeGl(~sandbox, ~drawElements, ())
                   );
              let state = MainStateTool.setState(state);
              RenderJobsRenderWorkerTool.init(
                (state) =>
                  RenderJobsRenderWorkerTool.render(
                    sandbox,
                    Obj.magic(1),
                    (_) => drawElements |> expect |> not_ |> toCalled |> resolve
                  ),
                state
              )
            }
          )
        }
      )
    }
  );