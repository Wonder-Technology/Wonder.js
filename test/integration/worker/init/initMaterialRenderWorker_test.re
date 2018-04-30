open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test init material with render worker",
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
      describe(
        "test render data->init material which is sended to render worker",
        () => {
          let _buildDisposeData = (basicMaterialDataForWorkerInit, lightMaterialDataForWorkerInit) => {
            "operateType": Sinon.matchAny,
            "directionLightData": Sinon.matchAny,
            "pointLightData": Sinon.matchAny,
            "initData": {
              "materialData": {
                "basicMaterialData": {"materialDataForWorkerInit": basicMaterialDataForWorkerInit},
                "lightMaterialData": {"materialDataForWorkerInit": lightMaterialDataForWorkerInit}
              }
            },
            "renderData": Sinon.matchAny
          };
          describe(
            "test basic material",
            () => {
              open BasicMaterialType;
              let _prepare = (state) => {
                let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                let state =
                  state
                  |> GameObjectAPI.initGameObject(gameObject1)
                  |> GameObjectAPI.initGameObject(gameObject2);
                let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
                (state, (gameObject1, gameObject2), (material1, material2))
              };
              describe(
                "send need-init-basic-material data",
                () => {
                  testPromise(
                    "test",
                    () => {
                      let (state, (gameObject1, gameObject2), (material1, material2)) =
                        _prepare(state);
                      let renderWorker = WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
                      let postMessageToRenderWorker =
                        WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
                      WorkerJobWorkerTool.execMainWorkerJob(
                        ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                        ~completeFunc=
                          (_) =>
                            postMessageToRenderWorker
                            |> expect
                            |> toCalledWith([|
                                 {
                                   "operateType": Sinon.matchAny,
                                   "directionLightData": Sinon.matchAny,
                                   "pointLightData": Sinon.matchAny,
                                   "initData": {
                                     "materialData": {
                                       "basicMaterialData": {
                                         "materialDataForWorkerInit": [|
                                           (material1, false),
                                           (material2, false)
                                         |]
                                       },
                                       "lightMaterialData": Sinon.matchAny
                                     }
                                   },
                                   "renderData": Sinon.matchAny
                                 }
                               |])
                            |> resolve,
                        ()
                      )
                    }
                  );
                  testPromise(
                    "materialDataForWorkerInit shouldn't contain duplicate data",
                    () => {
                      let (state, (gameObject1, gameObject2), (material1, material2)) =
                        _prepare(state);
                      let (state, gameObject3, material3) =
                        BasicMaterialTool.createGameObjectWithMaterial(material1, state);
                      let (state, gameObject4, material4) =
                        BasicMaterialTool.createGameObjectWithMaterial(material2, state);
                      let state =
                        state
                        |> GameObjectAPI.initGameObject(gameObject1)
                        |> GameObjectAPI.initGameObject(gameObject2)
                        |> GameObjectAPI.initGameObject(gameObject3)
                        |> GameObjectAPI.initGameObject(gameObject4);
                      let renderWorker = WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
                      let postMessageToRenderWorker =
                        WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
                      WorkerJobWorkerTool.execMainWorkerJob(
                        ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                        ~completeFunc=
                          (_) =>
                            postMessageToRenderWorker
                            |> expect
                            |> toCalledWith([|
                                 _buildDisposeData(
                                   [|(material1, false), (material2, false)|],
                                   [||]
                                 )
                               |])
                            |> resolve,
                        ()
                      )
                    }
                  )
                }
              );
              testPromise(
                "clear basicMaterialRecord->materialArrayForWorkerInit after send",
                () => {
                  let (state, _, _) = _prepare(state);
                  WorkerJobWorkerTool.execMainWorkerJob(
                    ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                    ~completeFunc=
                      (state) => {
                        let {materialArrayForWorkerInit} = BasicMaterialTool.getRecord(state);
                        materialArrayForWorkerInit |> Js.Array.length |> expect == 0 |> resolve
                      },
                    ()
                  )
                }
              )
            }
          );
          describe(
            "test light material",
            () => {
              open LightMaterialType;
              let _prepare = (state) => {
                let (state, gameObject1, material1) = LightMaterialTool.createGameObject(state^);
                let (state, gameObject2, material2) = LightMaterialTool.createGameObject(state);
                let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
                (state, (gameObject1, gameObject2), (material1, material2))
              };
              describe(
                "send need-init-light-material data",
                () => {
                  testPromise(
                    "test",
                    () => {
                      let (state, (gameObject1, gameObject2), (material1, material2)) =
                        _prepare(state);
                      let state =
                        state
                        |> GameObjectAPI.initGameObject(gameObject1)
                        |> GameObjectAPI.initGameObject(gameObject2);
                      let renderWorker = WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
                      let postMessageToRenderWorker =
                        WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
                      WorkerJobWorkerTool.execMainWorkerJob(
                        ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                        ~completeFunc=
                          (_) =>
                            postMessageToRenderWorker
                            |> expect
                            |> toCalledWith([|
                                 _buildDisposeData(
                                   [||],
                                   [|(material1, false), (material2, false)|]
                                 )
                               |])
                            |> resolve,
                        ()
                      )
                    }
                  );
                  testPromise(
                    "materialDataForWorkerInit shouldn't contain duplicate data",
                    () => {
                      let (state, (gameObject1, gameObject2), (material1, material2)) =
                        _prepare(state);
                      let (state, gameObject3, material3) =
                        LightMaterialTool.createGameObjectWithMaterial(material1, state);
                      let (state, gameObject4, material4) =
                        LightMaterialTool.createGameObjectWithMaterial(material2, state);
                      let state =
                        state
                        |> GameObjectAPI.initGameObject(gameObject1)
                        |> GameObjectAPI.initGameObject(gameObject3)
                        |> GameObjectAPI.initGameObject(gameObject2)
                        |> GameObjectAPI.initGameObject(gameObject4);
                      let renderWorker = WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
                      let postMessageToRenderWorker =
                        WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
                      WorkerJobWorkerTool.execMainWorkerJob(
                        ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                        ~completeFunc=
                          (_) =>
                            postMessageToRenderWorker
                            |> expect
                            |> toCalledWith([|
                                 _buildDisposeData(
                                   [||],
                                   [|(material1, false), (material2, false)|]
                                 )
                               |])
                            |> resolve,
                        ()
                      )
                    }
                  )
                }
              );
              testPromise(
                "clear lightMaterialRecord->materialArrayForWorkerInit after send",
                () => {
                  let (state, _, _) = _prepare(state);
                  WorkerJobWorkerTool.execMainWorkerJob(
                    ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
                    ~completeFunc=
                      (state) => {
                        let {materialArrayForWorkerInit} = LightMaterialTool.getRecord(state);
                        materialArrayForWorkerInit |> Js.Array.length |> expect == 0 |> resolve
                      },
                    ()
                  )
                }
              )
            }
          )
        }
      )
    }
  );