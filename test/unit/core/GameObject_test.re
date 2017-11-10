open Jest;

open GameObject;

let _ =
  describe(
    "GameObject",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "createGameObject",
        () => {
          test(
            "create a new gameObject which is just uidStr(string)",
            () => {
              let (_, gameObject) = createGameObject(state^);
              expect(gameObject) == "0"
            }
          );
          test(
            "add new transform component",
            () => {
              let (state, gameObject) = createGameObject(state^);
              hasGameObjectTransformComponent(gameObject, state) |> expect == true
            }
          );
          describe(
            "change state",
            () =>
              test(
                "state->uid + 1",
                () => {
                  let (state, _) = createGameObject(state^);
                  GameObjectTool.getData(state) |> ((data) => expect(data.uid) == 1)
                }
              )
          )
        }
      );
      describe(
        "test operate component",
        () => {
          describe(
            "test transform component",
            () => {
              describe(
                "addGameObjectTransformComponent",
                () => {
                  test(
                    "if this type of component is already exist, error",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      expect(
                        () => {
                          let (state, transform) = Transform.createTransform(state);
                          addGameObjectTransformComponent(gameObject, transform, state)
                        }
                      )
                      |> toThrowMessage("this type of component is already exist")
                    }
                  );
                  /* todo: test after add disposeGameObjectTransformComponet */
                  /* test "add transform component" (fun () => {
                     }); */
                  test(
                    "can get component's gameObject",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      Transform.getTransformGameObject(
                        getGameObjectTransformComponent(gameObject, state),
                        state
                      )
                      |> expect == gameObject
                    }
                  )
                }
              );
              describe(
                "getGameObjectTransformComponent",
                () =>
                  test(
                    "get transform component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      getGameObjectTransformComponent(gameObject, state)
                      |> TransformTool.isTransform
                    }
                  )
              );
              describe(
                "hasGameObjectTransformComponent",
                () =>
                  test(
                    "has transform component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      hasGameObjectTransformComponent(gameObject, state) |> expect == true
                    }
                  )
              )
            }
          );
          describe(
            "test material component",
            () => {
              describe(
                "getGameObjectMaterialComponent",
                () =>
                  test(
                    "get material component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, material) = BasicMaterial.createBasicMaterial(state);
                      let state = state |> addGameObjectMaterialComponent(gameObject, material);
                      getGameObjectMaterialComponent(gameObject, state) |> MaterialTool.isMaterial
                    }
                  )
              );
              describe(
                "hasGameObjectMaterialComponent",
                () =>
                  test(
                    "has material component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, material) = BasicMaterial.createBasicMaterial(state);
                      let state = state |> addGameObjectMaterialComponent(gameObject, material);
                      hasGameObjectMaterialComponent(gameObject, state) |> expect == true
                    }
                  )
              )
            }
          );
          describe(
            "test geometry component",
            () => {
              describe(
                "getGameObjectMaterialComponent",
                () =>
                  test(
                    "get geometry component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, geometry) = BoxGeometry.createBoxGeometry(state);
                      let state = state |> addGameObjectGeometryComponent(gameObject, geometry);
                      getGameObjectGeometryComponent(gameObject, state) |> GeometryTool.isGeometry
                    }
                  )
              );
              describe(
                "hasGameObjectGeometryComponent",
                () =>
                  test(
                    "has geometry component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, geometry) = BoxGeometry.createBoxGeometry(state);
                      let state = state |> addGameObjectGeometryComponent(gameObject, geometry);
                      hasGameObjectGeometryComponent(gameObject, state) |> expect == true
                    }
                  )
              )
            }
          );
          describe(
            "test meshRenderer component",
            () => {
              describe(
                "getGameObjectMeshRendererComponent",
                () =>
                  test(
                    "get meshRenderer component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, meshRenderer) = MeshRenderer.createMeshRenderer(state);
                      let state =
                        state |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
                      getGameObjectMeshRendererComponent(gameObject, state)
                      |> MeshRendererTool.isMeshRenderer
                    }
                  )
              );
              describe(
                "hasGameObjectMeshRendererComponent",
                () =>
                  test(
                    "has meshRenderer component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, meshRenderer) = MeshRenderer.createMeshRenderer(state);
                      let state =
                        state |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
                      hasGameObjectMeshRendererComponent(gameObject, state) |> expect == true
                    }
                  )
              )
            }
          );
          describe(
            "test cameraController component",
            () => {
              let prepare = () => {
                open CameraController;
                let (state, gameObject) = createGameObject(state^);
                let (state, cameraController) = createCameraController(state);
                let state =
                  state |> addGameObjectCameraControllerComponent(gameObject, cameraController);
                (state, gameObject, cameraController)
              };
              describe(
                "addGameObjectCameraControllerComponent",
                () => {
                  test(
                    "if this type of component is already exist, error",
                    () => {
                      open CameraController;
                      let (state, gameObject, _) = prepare();
                      expect(
                        () => {
                          let (state, cameraController) = createCameraController(state);
                          addGameObjectCameraControllerComponent(
                            gameObject,
                            cameraController,
                            state
                          )
                        }
                      )
                      |> toThrowMessage("this type of component is already exist")
                    }
                  );
                  test(
                    "can get component's gameObject",
                    () => {
                      open CameraController;
                      let (state, gameObject, _) = prepare();
                      state
                      |> getCameraControllerGameObject(
                           getGameObjectCameraControllerComponent(gameObject, state)
                         )
                      |> expect == gameObject
                    }
                  )
                }
              );
              describe(
                "getGameObjectCameraControllerComponent",
                () =>
                  test(
                    "get cameraController component",
                    () => {
                      let (state, gameObject, _) = prepare();
                      state
                      |> getGameObjectCameraControllerComponent(gameObject)
                      |> CameraControllerTool.isCameraController
                    }
                  )
              );
              describe(
                "hasGameObjectCameraControllerComponent",
                () =>
                  test(
                    "has cameraController component",
                    () => {
                      let (state, gameObject, _) = prepare();
                      state |> hasGameObjectCameraControllerComponent(gameObject) |> expect == true
                    }
                  )
              )
            }
          )
        }
      )
    }
  );