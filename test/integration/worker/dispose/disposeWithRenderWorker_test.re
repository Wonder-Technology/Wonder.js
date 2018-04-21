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
            TestToolMainWorker.initWithJobConfig(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~transformDataBufferCount=5,
                  ~basicMaterialDataBufferCount=5,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
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
      )
    }
  );