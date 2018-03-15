open BasicCameraViewAPI;

open MainStateDataType;

open BasicCameraViewType;

open Wonder_jest;

let _ =
  describe(
    "BasicCameraView",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "createBasicCameraView",
        () => {
          test(
            "create a new camera which is just index(int)",
            () => {
              let (_, cameraView) = createBasicCameraView(state^);
              expect(cameraView) == 0
            }
          );
          describe(
            "change state",
            () =>
              test(
                "state->index + 1",
                () => {
                  let (state, _) = createBasicCameraView(state^);
                  state.basicCameraViewRecord |> ((record) => expect(record.index) == 1)
                }
              )
          )
        }
      );
      describe(
        "unsafeGetGameObjectBasicCameraView",
        () =>
          test(
            "get cameraView's gameObject",
            () => {
              open GameObjectAPI;
              let (state, cameraView) = createBasicCameraView(state^);
              let (state, gameObject) = state |> GameObjectAPI.createGameObject;
              let state = state |> addGameObjectBasicCameraViewComponent(gameObject, cameraView);
              state |> unsafeGetGameObjectBasicCameraView(cameraView) |> expect == gameObject
            }
          )
      );
      describe(
        "dispose component",
        () => {
          let _prepareTwo = (state) => {
            let (state, gameObject1, _, (basicCameraView1, _)) =
              CameraTool.createCameraGameObject(state);
            let (state, gameObject2, _, (basicCameraView2, _)) =
              CameraTool.createCameraGameObject(state);
            (state, gameObject1, basicCameraView1, gameObject2, basicCameraView2)
          };
          describe(
            "dispose record",
            () =>
              test(
                "remove from gameObjectMap",
                () => {
                  open BasicCameraViewType;
                  let (state, gameObject1, _, (basicCameraView1, _)) =
                    CameraTool.createCameraGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                         gameObject1,
                         basicCameraView1
                       );
                  let {gameObjectMap} = state.basicCameraViewRecord;
                  gameObjectMap
                  |> WonderCommonlib.SparseMapService.has(basicCameraView1)
                  |> expect == false
                }
              )
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  let (state, gameObject1, basicCameraView1, gameObject2, basicCameraView2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                         gameObject1,
                         basicCameraView1
                       );
                  let (state, gameObject3, _, (basicCameraView3, _)) =
                    CameraTool.createCameraGameObject(state);
                  basicCameraView3 |> expect == basicCameraView1
                }
              );
              test(
                "if has no disposed index, get index from meshRendererRecord.index",
                () => {
                  let (state, gameObject1, basicCameraView1, gameObject2, basicCameraView2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                         gameObject1,
                         basicCameraView1
                       );
                  let (state, gameObject3, _, (basicCameraView3, _)) =
                    CameraTool.createCameraGameObject(state);
                  let (state, gameObject4, _, (basicCameraView4, _)) =
                    CameraTool.createCameraGameObject(state);
                  (basicCameraView3, basicCameraView4)
                  |> expect == (basicCameraView1, basicCameraView2 + 1)
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "expect dispose the alive component, but actual not",
                () => {
                  let (state, gameObject1, basicCameraView1, gameObject2, basicCameraView2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                         gameObject1,
                         basicCameraView1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                             gameObject1,
                             basicCameraView1
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("expect dispose the alive component, but actual not")
                }
              )
          )
        }
      )
    }
  );