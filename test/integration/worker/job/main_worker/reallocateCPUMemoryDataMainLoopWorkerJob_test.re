open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test reallocate cpu memory main worker job",
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
              ~buffer=SettingTool.buildBufferConfigStr(),
              ()
            )
        }
      );
      afterEach(() => TestWorkerTool.clear(sandbox));
      describe(
        "should only reallocate once in one loop",
        () => {
          testPromise(
            "test reallocate gameObject",
            () => {
              let (state, gameObject1, gameObject2, gameObject3) =
                ReallocateGameObjectCPUMemoryTool.prepareForOptimize(state);
              let state =
                state |> FakeGlWorkerTool.setFakeGl(FakeGlWorkerTool.buildFakeGl(~sandbox, ()));
              let state = MainStateTool.setState(state);
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=
                  (postMessageToRenderWorker) => {
                    let state = MainStateTool.unsafeGetState();
                    ReallocateGameObjectCPUMemoryTool.judgeForOptimize(
                      state,
                      gameObject1,
                      gameObject2,
                      gameObject3
                    )
                    |> resolve
                  },
                ()
              )
            }
          );
          testPromise(
            "test reallocate geometry",
            () => {
              let (
                state,
                (gameObject1, gameObject2, gameObject3),
                (geometry1, geometry2, geometry3),
                (vertices1, vertices2, vertices3),
                (texCoords1, texCoords2, texCoords3),
                (normals1, normals2, normals3),
                (indices1, indices2, indices3)
              ) =
                ReallocateGeometryCPUMemoryTool.prepareForOptimize(state);
              let state =
                state |> FakeGlWorkerTool.setFakeGl(FakeGlWorkerTool.buildFakeGl(~sandbox, ()));
              let state = MainStateTool.setState(state);
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=
                  (postMessageToRenderWorker) => {
                    let state = MainStateTool.unsafeGetState();
                    ReallocateGeometryCPUMemoryTool.judgeForOptimize(
                      state,
                      (gameObject1, gameObject2, gameObject3),
                      (geometry1, geometry2, geometry3),
                      (vertices1, vertices2, vertices3),
                      (texCoords1, texCoords2, texCoords3),
                      (normals1, normals2, normals3),
                      (indices1, indices2, indices3)
                    )
                    |> resolve
                  },
                ()
              )
            }
          )
        }
      )
    }
  );