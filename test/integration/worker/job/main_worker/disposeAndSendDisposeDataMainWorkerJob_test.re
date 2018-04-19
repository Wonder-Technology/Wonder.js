open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test dispose and send dispose data main worker job",
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
            TestToolMainWorker.initWithJobConfig(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "actually do the dispose work",
        () =>
          describe(
            "dispose components",
            () =>
              describe(
                "test disposeGameObjectBoxGeometryComponent",
                () =>
                  describe(
                    "dispose data in dispose job",
                    () =>
                      describe(
                        "not dispose main state->vbo buffer data",
                        () => {
                          /* TODO duplicate */
                          let _prepare = (state) => {
                            let (state, gameObject1, geometry1) =
                              BoxGeometryTool.createGameObject(state^);
                            let state =
                              VboBufferTool.addVboBufferToBoxGeometryBufferMap(
                                geometry1,
                                state
                              );
                            let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                            (state, gameObject1, geometry1)
                          };
                          testPromise(
                            "not add buffer to pool",
                            () => {
                              open VboBufferType;
                              let (state, gameObject1, geometry1) = _prepare(state);
                              let state =
                                state
                                |> FakeGlToolWorker.setFakeGl(
                                     FakeGlToolWorker.buildFakeGl(~sandbox, ())
                                   );
                              let state = MainStateTool.setState(state);
                              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                                ~state,
                                ~sandbox,
                                ~completeFunc=
                                  (postMessageToRenderWorker) => {
                                    let state = MainStateTool.unsafeGetState();
                                    let {vertexArrayBufferPool, elementArrayBufferPool} =
                                      VboBufferTool.getVboBufferRecord(state);
                                    (
                                      vertexArrayBufferPool
                                      |> WonderCommonlib.SparseMapService.has(geometry1),
                                      elementArrayBufferPool
                                      |> WonderCommonlib.SparseMapService.has(geometry1)
                                    )
                                    |> expect == (false, false)
                                    |> resolve
                                  },
                                ()
                              )
                            }
                          )
                        }
                      )
                  )
              )
          )
      );
      describe(
        "dispose gameObjects",
        () => {
          /* TODO duplicate */
          let _prepare = (state) => {
            let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state^);
            let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
            (state, gameObject1, gameObject2)
          };
          describe(
            "test disposeGameObject",
            () =>
              testPromise(
                "dispose data",
                () => {
                  let (state, gameObject1, gameObject2) = _prepare(state);
                  let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                  let state =
                    state |> FakeGlToolWorker.setFakeGl(FakeGlToolWorker.buildFakeGl(~sandbox, ()));
                  let state = MainStateTool.setState(state);
                  RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                    ~state,
                    ~sandbox,
                    ~completeFunc=
                      (postMessageToRenderWorker) =>
                        MainStateTool.unsafeGetState()
                        |> MeshRendererTool.getRenderArray
                        |> Js.Array.length
                        |> expect === 1
                        |> resolve,
                    ()
                  )
                }
              )
          )
        }
      );
      describe(
        "send data to render worker",
        () =>
          testPromise(
            "send dispose data",
            () => {
              let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
              let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
              let (state, gameObject3, geometry3) = CustomGeometryTool.createGameObject(state);
              let state =
                state
                |> GameObjectAPI.batchDisposeGameObject([|gameObject1, gameObject2, gameObject3|]);
              let state =
                state |> FakeGlToolWorker.setFakeGl(FakeGlToolWorker.buildFakeGl(~sandbox, ()));
              let state = MainStateTool.setState(state);
              let state = MainStateTool.setState(state);
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=
                  (postMessageToRenderWorker) =>
                    postMessageToRenderWorker
                    |> expect
                    |> toCalledWith([|
                         {
                           "operateType": "DISPOSE",
                           "boxGeometryNeedDisposeVboBufferArr": [|geometry1, geometry2|],
                           "customGeometryNeedDisposeVboBufferArr": [|geometry3|]
                         }
                       |])
                    |> resolve,
                ()
              )
            }
          )
      )
    }
  );