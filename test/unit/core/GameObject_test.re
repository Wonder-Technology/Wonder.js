open Jest;

open GameObject;

open GameObjectTool;

let _ =
  describe
    "GameObject"
    (
      fun () => {
        open Expect;
        open! Expect.Operators;
        open Sinon;
        let sandbox = getSandboxDefaultVal ();
        let state = ref (StateSystem.createState ());
        beforeEach (
          fun () => {
            sandbox := createSandbox ();
            state := TestTool.init ()
          }
        );
        afterEach (fun () => restoreSandbox (refJsObjToSandbox !sandbox));
        describe
          "createGameObject"
          (
            fun () => {
              test
                "create a new gameObject which is just uidStr(string)"
                (
                  fun () => {
                    let (_, gameObject) = createGameObject !state;
                    expect gameObject == "0"
                  }
                );
              test
                "add new transform component"
                (
                  fun () => {
                    let (state, gameObject) = createGameObject !state;
                    hasGameObjectTransformComponent gameObject state |> expect == true
                  }
                );
              describe
                "change state"
                (
                  fun () =>
                    test
                      "state->uid + 1"
                      (
                        fun () => {
                          let (state, _) = createGameObject !state;
                          getData state |> (fun data => expect data.uid == 1)
                        }
                      )
                )
            }
          );
        describe
          "test operate component"
          (
            fun () => {
              describe
                "test transform component"
                (
                  fun () => {
                    describe
                      "addGameObjectTransformComponent"
                      (
                        fun () => {
                          test
                            "if this type of component is already exist, error"
                            (
                              fun () => {
                                let (state, gameObject) = createGameObject !state;
                                expect (
                                  fun () => {
                                    let (state, transform) = Transform.createTransform state;
                                    addGameObjectTransformComponent gameObject transform state
                                  }
                                )
                                |> toThrowMessage "this type of component is already exist"
                              }
                            );
                          /* todo: test after add disposeGameObjectTransformComponet */
                          /* test "add transform component" (fun () => {
                             }); */
                          test
                            "can get component's gameObject"
                            (
                              fun () => {
                                let (state, gameObject) = createGameObject !state;
                                Transform.getTransformGameObject
                                  (getGameObjectTransformComponent gameObject state) state
                                |> expect
                                == gameObject
                              }
                            )
                        }
                      );
                    describe
                      "getGameObjectTransformComponent"
                      (
                        fun () =>
                          test
                            "get transform component"
                            (
                              fun () => {
                                let (state, gameObject) = createGameObject !state;
                                getGameObjectTransformComponent gameObject state
                                |> TransformTool.isTransform
                              }
                            )
                      );
                    describe
                      "hasGameObjectTransformComponent"
                      (
                        fun () =>
                          test
                            "has transform component"
                            (
                              fun () => {
                                let (state, gameObject) = createGameObject !state;
                                hasGameObjectTransformComponent gameObject state |> expect == true
                              }
                            )
                      )
                  }
                );
              describe
                "test cameraController component"
                (
                  fun () => {
                    let prepare () => {
                      open CameraController;
                      let (state, gameObject) = createGameObject !state;
                      let (state, cameraController) = createCameraController state;
                      let state =
                        state |> addGameObjectCameraControllerComponent gameObject cameraController;
                      (state, gameObject, cameraController)
                    };
                    describe
                      "addGameObjectCameraControllerComponent"
                      (
                        fun () => {
                          test
                            "if this type of component is already exist, error"
                            (
                              fun () => {
                                open CameraController;
                                let (state, gameObject, _) = prepare ();
                                expect (
                                  fun () => {
                                    let (state, cameraController) = createCameraController state;
                                    addGameObjectCameraControllerComponent
                                      gameObject cameraController state
                                  }
                                )
                                |> toThrowMessage "this type of component is already exist"
                              }
                            );
                          test
                            "can get component's gameObject"
                            (
                              fun () => {
                                open CameraController;
                                let (state, gameObject, _) = prepare ();
                                state
                                |> getCameraControllerGameObject (
                                     getGameObjectCameraControllerComponent gameObject state
                                   )
                                |> expect
                                == gameObject
                              }
                            )
                        }
                      );
                    describe
                      "getGameObjectCameraControllerComponent"
                      (
                        fun () =>
                          test
                            "get cameraController component"
                            (
                              fun () => {
                                let (state, gameObject, _) = prepare ();
                                state
                                |> getGameObjectCameraControllerComponent gameObject
                                |> CameraControllerTool.isCameraController
                              }
                            )
                      );
                    describe
                      "hasGameObjectCameraControllerComponent"
                      (
                        fun () =>
                          test
                            "has cameraController component"
                            (
                              fun () => {
                                let (state, gameObject, _) = prepare ();
                                state
                                |> hasGameObjectCameraControllerComponent gameObject
                                |> expect
                                == true
                              }
                            )
                      )
                  }
                )
            }
          )
      }
    );