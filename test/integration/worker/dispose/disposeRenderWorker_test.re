open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test dispose with render worker",
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
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      /* describe(
           "defer dispose and create operations should all be mutable.(because custom main worker job which has these operation shouldn't set the result main state to main stateData)",
           () => {
             let _prepare = (state) => {
               let (state, gameObject1, _, _, _) =
                 RenderBasicJobTool.prepareGameObject(sandbox, state^);
               (state, gameObject1)
             };
             let _disposeAndCreate = (disposedGameObject, preparedState) => {
               let state =
                 preparedState |> GameObjectAPI.batchDisposeGameObject([|disposedGameObject|]);
               let (state, gameObject, _, _, _) =
                 RenderBasicJobTool.prepareGameObject(sandbox, state);
               gameObject
             };
             test(
               "test",
               () => {
                 let (preparedState, gameObject1) = _prepare(state);
                 let gameObject2 = _disposeAndCreate(gameObject1, preparedState);
                 let gameObject3 = _disposeAndCreate(gameObject2, preparedState);
                 gameObject3 |> expect == gameObject2 + 1
               }
             )
           }
         ); */
      describe(
        "the material data send to render worker for init should remove the disposed ones",
        () => {
          describe(
            "test basic material",
            () =>
              BasicMaterialType.(
                testPromise(
                  "test",
                  () => {
                    let (state, gameObject1, material1) =
                      BasicMaterialTool.createGameObject(state^);
                    let (state, gameObject2, material2) =
                      BasicMaterialTool.createGameObject(state);
                    let (state, gameObject3, material3) =
                      BasicMaterialTool.createGameObject(state);
                    let state =
                      state
                      |> GameObjectAPI.initGameObject(gameObject1)
                      |> GameObjectAPI.initGameObject(gameObject2)
                      |> GameObjectAPI.initGameObject(gameObject3);
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectBasicMaterialComponent(
                           gameObject2,
                           material2
                         )
                      |> GameObjectAPI.disposeGameObject(gameObject3);
                    WorkerWorkerTool.setFakeWorkersAndSetState(state);
                    WorkerJobWorkerTool.execMainWorkerJob(
                      ~execJobFunc=DisposeAndSendDisposeDataMainWorkerJob.execJob,
                      ~completeFunc=
                        (state) => {
                          let {materialArrayForWorkerInit} = BasicMaterialTool.getRecord(state);
                          materialArrayForWorkerInit |> expect == [|material1|] |> resolve
                        },
                      ()
                    )
                  }
                )
              )
          );
          describe(
            "test light material",
            () =>
              LightMaterialType.(
                testPromise(
                  "test",
                  () => {
                    let (state, gameObject1, material1) =
                      LightMaterialTool.createGameObject(state^);
                    let (state, gameObject2, material2) =
                      LightMaterialTool.createGameObject(state);
                    let (state, gameObject3, material3) =
                      LightMaterialTool.createGameObject(state);
                    let state =
                      state
                      |> GameObjectAPI.initGameObject(gameObject1)
                      |> GameObjectAPI.initGameObject(gameObject2)
                      |> GameObjectAPI.initGameObject(gameObject3);
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectLightMaterialComponent(
                           gameObject2,
                           material2
                         )
                      |> GameObjectAPI.disposeGameObject(gameObject3);
                    WorkerWorkerTool.setFakeWorkersAndSetState(state);
                    WorkerJobWorkerTool.execMainWorkerJob(
                      ~execJobFunc=DisposeAndSendDisposeDataMainWorkerJob.execJob,
                      ~completeFunc=
                        (state) => {
                          let {materialArrayForWorkerInit} = LightMaterialTool.getRecord(state);
                          materialArrayForWorkerInit |> expect == [|material1|] |> resolve
                        },
                      ()
                    )
                  }
                )
              )
          )
        }
      )
      /* describe
         ("fix batchDisposeMeshRendererComponent",
         (
         () => {
         testPromise(
         "aaaaa",
         (
         () => {

           let (state, gameObject1, meshRenderer1) = MeshRendererTool.createBasicMaterialGameObject(state^);



           let (state, gameObject2, meshRenderer2) = MeshRendererTool.createBasicMaterialGameObject(state);


                       let state =
                         state
                         |> GameObjectAPI. batchDisposeGameObject (
                              [|gameObject2|]
                            );


                       WorkerWorkerTool.setFakeWorkersAndSetState(state);



                       DisposeAndSendDisposeDataMainWorkerJob.execJob(
                         Some([|""|]),
                         MainStateTool.getStateData()
                       )
                       |> Most.drain
                       |> then_(
                            () => {
                              let state = MainStateTool.unsafeGetState();


                         state |> MeshRendererTool.getRenderArray |> expect == [|gameObject1|]
                         |> resolve



                            })




         })
         )
         })
         ); */
    }
  );