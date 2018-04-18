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
      describe(
        "actually do the dispose work",
        () => {
          describe(
            "test dispose component",
            () =>
              describe(
                "test disposeGameObjectBasicCameraViewComponent",
                () => {
                  open BasicCameraViewType;
                  let _prepare = (state) => {
                    let (state, gameObject1, _, (basicCameraView1, _)) =
                      CameraTool.createCameraGameObject(state^);
                    let (state, gameObject2, _, (basicCameraView2, _)) =
                      CameraTool.createCameraGameObject(state);
                    let (state, gameObject3, _, (basicCameraView3, _)) =
                      CameraTool.createCameraGameObject(state);
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                           gameObject1,
                           basicCameraView1
                         )
                      |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                           gameObject3,
                           basicCameraView3
                         );
                    (
                      state,
                      (gameObject1, gameObject2, gameObject3),
                      (basicCameraView1, basicCameraView2, basicCameraView3)
                    )
                  };
                  test(
                    "shouldn't dispose data",
                    () => {
                      let (
                        state,
                        (gameObject1, gameObject2, gameObject3),
                        (basicCameraView1, basicCameraView2, basicCameraView3)
                      ) =
                        _prepare(state);
                      let {disposedIndexArray} = state.basicCameraViewRecord;
                      (
                        disposedIndexArray |> Js.Array.includes(basicCameraView1),
                        disposedIndexArray |> Js.Array.includes(basicCameraView2),
                        disposedIndexArray |> Js.Array.includes(basicCameraView3)
                      )
                      |> expect == (false, false, false)
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (
                        state,
                        (gameObject1, gameObject2, gameObject3),
                        (basicCameraView1, basicCameraView2, basicCameraView3)
                      ) =
                        _prepare(state);
                      let state = state |> DisposeJob.execJob(None);
                      let {disposedIndexArray} = state.basicCameraViewRecord;
                      (
                        disposedIndexArray |> Js.Array.includes(basicCameraView1),
                        disposedIndexArray |> Js.Array.includes(basicCameraView2),
                        disposedIndexArray |> Js.Array.includes(basicCameraView3)
                      )
                      |> expect == (true, false, true)
                    }
                  )
                }
              )
          );
          describe(
            "test dispose gameObject",
            () => {
              let _prepare = (state) => {
                let (state, gameObject1, meshRenderer1) =
                  MeshRendererTool.createGameObject(state^);
                let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
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
                      let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 2
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (state, gameObject1, gameObject2) = _prepare(state);
                      let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
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
                      let state = state |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject1);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 2
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (state, gameObject1, gameObject2) = _prepare(state);
                      let state = state |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject1);
                      let state = state |> DisposeJob.execJob(None);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 1
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  );