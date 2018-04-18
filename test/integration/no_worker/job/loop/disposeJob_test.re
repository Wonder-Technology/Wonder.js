open Wonder_jest;

let _ =
  describe(
    "test dispose job",
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
            RenderJobsTool.initWithJobConfig(sandbox, LoopRenderJobTool.buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe
        (
          "actually do the dispose work",
          () =>{

                let _prepare = (state) => {
                  let (state, gameObject1, meshRenderer1) =
                    MeshRendererTool.createGameObject(state^);
                  let (state, gameObject2, meshRenderer2) =
                    MeshRendererTool.createGameObject(state);
                  (state, gameObject1, gameObject2)
                };
            describe(
              "test batchDisposeGameObject",
              () => {
                test(
                  "shouldn't dispose data",
                  () => {
                    let (state, gameObject1, gameObject2) = _prepare(state);
                    let state =
                      state |> GameObjectAPI.batchDisposeGameObject([|gameObject1, gameObject2|]);
                    state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 2
                  }
                );
                test(
                  "dispose data in dispose job",
                  () => {
                    let (state, gameObject1, gameObject2) = _prepare(state);
                    let state =
                      state |> GameObjectAPI.batchDisposeGameObject([|gameObject1, gameObject2|]);
                    let state = state |> DisposeJob.execJob(None);
                    state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 0
                  }
                )
              }
            );
            describe(
              "test disposeGameObject",
              () => {
                test(
                  "shouldn't dispose data",
                  () => {
                    let (state, gameObject1, gameObject2) = _prepare(state);
                    let state =
                      state |> GameObjectAPI.disposeGameObject(gameObject1);
                    state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 2
                  }
                );
                test(
                  "dispose data in dispose job",
                  () => {
                    let (state, gameObject1, gameObject2) = _prepare(state);
                    let state =
                      state |> GameObjectAPI.disposeGameObject(gameObject1);
                    let state = state |> DisposeJob.execJob(None);
                    state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 1
                  }
                )
              }
            );
            describe(
              "test disposeGameObjectKeepOrder",
              () => {
                test(
                  "shouldn't dispose data",
                  () => {
                    let (state, gameObject1, gameObject2) = _prepare(state);
                    let state =
                      state |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject1);
                    state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 2
                  }
                );
                test(
                  "dispose data in dispose job",
                  () => {
                    let (state, gameObject1, gameObject2) = _prepare(state);
                    let state =
                      state |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject1);
                    let state = state |> DisposeJob.execJob(None);
                    state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 1
                  }
                )
              }
            )
          }
        )
    }
  );