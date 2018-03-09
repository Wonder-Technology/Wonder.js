open Wonder_jest;

open SceneAPI;

let _ =
  describe(
    "SceneCameraService",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getCurrentCameraGameObject",
        () => {
          describe(
            "if not set current cameraGameObject before, find the first gameObject who has basicCameraView component",
            () => {
              test(
                "if not find, return None",
                () => getCurrentCameraGameObject(state^) |> expect == None
              );
              test(
                "if find, return Some(gameObject)",
                () => {
                  let (state, gameObject1, _) = GameObjectTool.createGameObject(state^);
                  let (state, gameObject2, _, _) = CameraTool.createCameraGameObject(state);
                  let (state, gameObject3, _, _) = CameraTool.createCameraGameObject(state);
                  getCurrentCameraGameObject(state) |> expect == Some(gameObject2)
                }
              )
            }
          );
          test(
            "else, return setted one",
            () => {
              let (state, gameObject1, _, _) = CameraTool.createCameraGameObject(state^);
              let (state, gameObject2, _, _) = CameraTool.createCameraGameObject(state);
              let state = state |> setCurrentCameraGameObject(gameObject2);
              getCurrentCameraGameObject(state) |> expect == Some(gameObject2)
            }
          )
        }
      )
    }
  );