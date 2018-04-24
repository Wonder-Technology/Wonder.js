open Wonder_jest;

open Js.Promise;

open BasicMaterialType;

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
            TestToolMainWorker.initWithJobConfig(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test render data->init material which is sended to render worker",
        () =>
          /* TODO test light material */
          describe(
            "test basic material",
            () => {
              let _prepare = (state) => {
                let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                let state =
                  state
                  |> GameObjectAPI.initGameObject(gameObject1)
                  |> GameObjectAPI.initGameObject(gameObject2);
                let state = WorkerToolWorker.setFakeWorkersAndSetState(state);
                (state, (gameObject1, gameObject2), (material1, material2))
              };
              testPromise(
                "send need-init-basic-material data",
                () => {
                  let (state, (gameObject1, gameObject2), (material1, material2)) =
                    _prepare(state);
                  let renderWorker = WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state);
                  let postMessageToRenderWorker =
                    WorkerToolWorker.stubPostMessage(sandbox, renderWorker);
                  WorkerJobToolWorker.execMainWorkerJob(
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
                                     |],
                                     "index": 2,
                                     "disposedIndexArray": Sinon.matchAny
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
                "clear basicMaterialRecord->materialArrayForWorkerInit after send",
                () => {
                  let (state, _, _) = _prepare(state);
                  WorkerJobToolWorker.execMainWorkerJob(
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
          )
      )
    }
  );