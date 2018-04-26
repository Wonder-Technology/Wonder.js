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
      afterEach(() => TestToolWorker.clear(sandbox));
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
                        () =>
                          testPromise(
                            "not add buffer to pool",
                            () => {
                              open VboBufferType;
                              let (state, gameObject1, geometry1) =
                                DisposeForNoWorkerAndWorkerJobTool.prepareForDisposeBoxGeometryVboBuffer(
                                  state
                                );
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
                      )
                  )
              )
          )
      );
      describe(
        "dispose gameObjects",
        () => {
          let _prepare = (state) =>
            DisposeForNoWorkerAndWorkerJobTool.prepareForDisposeGameObjects(state);
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
          /* testPromise(
               "test dispose sourceInstance gameObject",
               () => {
                 let (state, gameObject, _) =
                   RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(
                     sandbox,
                     state^
                   );
                 let state = state |> GameObjectAPI.disposeGameObject(gameObject);
                 WorkerToolWorker.setFakeWorkersAndSetState(state);
                 WorkerJobToolWorker.execMainWorkerJob(
                   ~execJobFunc=DisposeAndSendDisposeDataMainWorkerJob.execJob,
                   ~completeFunc=(state) => 1 |> expect == 1 |> resolve,
                   ()
                 )
               }
             ) */
        }
      );
      describe(
        "send data to render worker",
        () =>
          testPromise(
            "send dispose data",
            () => {
              let (
                state,
                (gameObject1, gameObject2, gameObject3),
                (geometry1, geometry2, geometry3)
              ) =
                DisposeForNoWorkerAndWorkerJobTool.prepareBoxAndCustomGeometryGameObjects(state);
              let (state, gameObject4, (geometry4, _, _, sourceInstance4, _)) =
                RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(sandbox, state);
              let state =
                state
                |> GameObjectAPI.batchDisposeGameObject([|
                     gameObject1,
                     gameObject2,
                     gameObject3,
                     gameObject4
                   |]);
              let state =
                state |> FakeGlToolWorker.setFakeGl(FakeGlToolWorker.buildFakeGl(~sandbox, ()));
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
                           "boxGeometryNeedDisposeVboBufferArr": [|
                             geometry1,
                             geometry2,
                             geometry4
                           |],
                           "customGeometryNeedDisposeVboBufferArr": [|geometry3|],
                           "sourceInstanceNeedDisposeVboBufferArr": [|sourceInstance4|]
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