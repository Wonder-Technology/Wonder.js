open Wonder_jest;

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
              expect(gameObject) == 0
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
      );
      describe(
        "dispose",
        () => {
          describe(
            "test alive",
            () => {
              test(
                "disposed one shouldn't alive before reallocate",
                () => {
                  let (state, gameObject) = createGameObject(state^);
                  /* isGameObjectAlive(gameObject, state) */
                  let state = state |> disposeGameObject(gameObject);
                  state |> isGameObjectAlive(gameObject) |> expect == false
                }
              );
              test(
                "disposed one shouldn't alive after reallocate",
                () => {
                  let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                  let (state, gameObject1) = createGameObject(state);
                  let (state, gameObject2) = createGameObject(state);
                  let (state, gameObject3) = createGameObject(state);
                  let (state, gameObject4) = createGameObject(state);
                  let state = state |> disposeGameObject(gameObject1);
                  let state = state |> disposeGameObject(gameObject2);
                  let state = state |> disposeGameObject(gameObject3);
                  (
                    isGameObjectAlive(gameObject1, state),
                    isGameObjectAlive(gameObject2, state),
                    isGameObjectAlive(gameObject3, state),
                    isGameObjectAlive(gameObject4, state)
                  )
                  |> expect == (false, false, false, true)
                }
              )
            }
          );
          describe(
            "should dispose all components",
            () => {
              test(
                "dispose tranform component",
                () => {
                  let (state, gameObject1) = createGameObject(state^);
                  let (state, gameObject2) = createGameObject(state);
                  let transform1 = getGameObjectTransformComponent(gameObject1, state);
                  let transform2 = getGameObjectTransformComponent(gameObject2, state);
                  let state =
                    state
                    |> Transform.setTransformParent(Js.Nullable.return(transform1), transform2);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (2., 3., 4.);
                  let state =
                    state
                    |> Transform.setTransformLocalPosition(transform1, pos1)
                    |> Transform.setTransformLocalPosition(transform2, pos2);
                  let state = state |> disposeGameObject(gameObject1);
                  let state = state |> TransformTool.update;
                  state |> Transform.getTransformPosition(transform2) |> expect == pos2
                }
              );
              test(
                "dispose meshRenderer component",
                () => {
                  let (state, gameObject1, meshRenderer1) =
                    MeshRendererTool.createGameObject(state^);
                  let (state, gameObject2, meshRenderer2) =
                    MeshRendererTool.createGameObject(state);
                  let state = state |> disposeGameObject(gameObject1);
                  state |> MeshRendererTool.getRenderArray |> expect == [|gameObject2|]
                }
              );
              test(
                "dispose material component",
                () => {
                  open MaterialType;
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  let state = state |> disposeGameObject(gameObject1);
                  let {disposedIndexArray} = state |> MaterialTool.getData;
                  (
                    disposedIndexArray |> Js.Array.includes(material1),
                    disposedIndexArray |> Js.Array.includes(material2)
                  )
                  |> expect == (true, false)
                }
              );
              test(
                "dispose geometry component",
                () => {
                  TestTool.closeContractCheck();
                  open StateDataType;
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                  let state = state |> disposeGameObject(gameObject1);
                  let {disposedIndexMap} = state |> GeometryTool.getData;
                  (
                    disposedIndexMap |> SparseMapSystem.has(geometry1),
                    disposedIndexMap |> SparseMapSystem.has(geometry2)
                  )
                  |> expect == (true, false)
                }
              );
              test(
                "dispose cameraController component",
                () => {
                  open CameraControllerType;
                  let (state, gameObject1, _, cameraController1) =
                    CameraControllerTool.createCameraGameObject(state^);
                  let (state, gameObject2, _, cameraController2) =
                    CameraControllerTool.createCameraGameObject(state);
                  let state = state |> disposeGameObject(gameObject1);
                  let {disposedIndexArray} = state |> CameraControllerTool.getData;
                  (
                    disposedIndexArray |> Js.Array.includes(cameraController1),
                    disposedIndexArray |> Js.Array.includes(cameraController2)
                  )
                  |> expect == (true, false)
                }
              )
            }
          );
          describe(
            "test reallocate gameObject",
            () =>
              describe(
                "if have dispose too many gameObjects, reallocate gameObject",
                () => {
                  describe(
                    "reallocate component maps",
                    () => {
                      test(
                        "new transformMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1) = createGameObject(state);
                          let (state, gameObject2) = createGameObject(state);
                          let (state, gameObject3) = createGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let {transformMap} = GameObjectTool.getData(state);
                          (
                            transformMap |> SparseMapSystem.has(gameObject1),
                            transformMap |> SparseMapSystem.has(gameObject2),
                            transformMap |> SparseMapSystem.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      test(
                        "new meshRendererMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1) = createGameObject(state);
                          let (state, gameObject2) = createGameObject(state);
                          let (state, gameObject3) = createGameObject(state);
                          let (state, meshRenderer1) = MeshRenderer.createMeshRenderer(state);
                          let (state, meshRenderer2) = MeshRenderer.createMeshRenderer(state);
                          let (state, meshRenderer3) = MeshRenderer.createMeshRenderer(state);
                          let state =
                            state
                            |> addGameObjectMeshRendererComponent(gameObject1, meshRenderer1)
                            |> addGameObjectMeshRendererComponent(gameObject2, meshRenderer2)
                            |> addGameObjectMeshRendererComponent(gameObject3, meshRenderer3);
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let {meshRendererMap} = GameObjectTool.getData(state);
                          (
                            meshRendererMap |> SparseMapSystem.has(gameObject1),
                            meshRendererMap |> SparseMapSystem.has(gameObject2),
                            meshRendererMap |> SparseMapSystem.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      test(
                        "new geometryMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state =
                            TestTool.init(
                              ~bufferConfig=
                                Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
                              ()
                            );
                          TestTool.closeContractCheck();
                          let state = MemoryConfigTool.setConfig(state, ~maxDisposeCount=2, ());
                          let (state, gameObject1, geometry1) =
                            BoxGeometryTool.createGameObject(state);
                          let (state, gameObject2, geometry2) =
                            BoxGeometryTool.createGameObject(state);
                          let (state, gameObject3, geometry3) =
                            BoxGeometryTool.createGameObject(state);
                          let state = state |> GeometryTool.initGeometrys;
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let {geometryMap} = GameObjectTool.getData(state);
                          (
                            geometryMap |> SparseMapSystem.has(gameObject1),
                            geometryMap |> SparseMapSystem.has(gameObject2),
                            geometryMap |> SparseMapSystem.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      test(
                        "new materialMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1, material1) =
                            BasicMaterialTool.createGameObject(state);
                          let (state, gameObject2, material2) =
                            BasicMaterialTool.createGameObject(state);
                          let (state, gameObject3, material3) =
                            BasicMaterialTool.createGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let {materialMap} = GameObjectTool.getData(state);
                          (
                            materialMap |> SparseMapSystem.has(gameObject1),
                            materialMap |> SparseMapSystem.has(gameObject2),
                            materialMap |> SparseMapSystem.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      test(
                        "new cameraControllerMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1, _, cameraController1) =
                            CameraControllerTool.createCameraGameObject(state);
                          let (state, gameObject2, _, cameraController2) =
                            CameraControllerTool.createCameraGameObject(state);
                          let (state, gameObject3, _, cameraController3) =
                            CameraControllerTool.createCameraGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let {cameraControllerMap} = GameObjectTool.getData(state);
                          (
                            cameraControllerMap |> SparseMapSystem.has(gameObject1),
                            cameraControllerMap |> SparseMapSystem.has(gameObject2),
                            cameraControllerMap |> SparseMapSystem.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      )
                    }
                  );
                  describe(
                    "test reallocate twice",
                    () =>
                      test(
                        "test reallocate component maps",
                        () => {
                          open GameObjectType;
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1) = createGameObject(state);
                          let (state, gameObject2) = createGameObject(state);
                          let (state, gameObject3) = createGameObject(state);
                          let (state, gameObject4) = createGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let state = state |> disposeGameObject(gameObject3);
                          let state = state |> disposeGameObject(gameObject4);
                          let {transformMap} = GameObjectTool.getData(state);
                          (
                            transformMap |> SparseMapSystem.has(gameObject1),
                            transformMap |> SparseMapSystem.has(gameObject2),
                            transformMap |> SparseMapSystem.has(gameObject3),
                            transformMap |> SparseMapSystem.has(gameObject4)
                          )
                          |> expect == (false, false, false, false)
                        }
                      )
                  );
                  test(
                    "empty disposedUidMap",
                    () => {
                      open GameObjectType;
                      let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                      let (state, gameObject1) = createGameObject(state);
                      let (state, gameObject2) = createGameObject(state);
                      let (state, gameObject3) = createGameObject(state);
                      let state = state |> disposeGameObject(gameObject1);
                      let state = state |> disposeGameObject(gameObject2);
                      let state = state |> disposeGameObject(gameObject3);
                      let {disposedUidMap} = GameObjectTool.getData(state);
                      (
                        disposedUidMap |> SparseMapSystem.has(gameObject1),
                        disposedUidMap |> SparseMapSystem.has(gameObject2),
                        disposedUidMap |> SparseMapSystem.has(gameObject3)
                      )
                      |> expect == (false, false, true)
                    }
                  );
                  test(
                    "update aliveUidArray",
                    () => {
                      open GameObjectType;
                      let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                      let (state, gameObject1) = createGameObject(state);
                      let (state, gameObject2) = createGameObject(state);
                      let (state, gameObject3) = createGameObject(state);
                      let state = state |> disposeGameObject(gameObject1);
                      let state = state |> disposeGameObject(gameObject2);
                      let state = state |> disposeGameObject(gameObject3);
                      let {aliveUidArray} = GameObjectTool.getData(state);
                      aliveUidArray |> expect == [|gameObject3|]
                    }
                  )
                }
              )
          )
        }
      );
      describe(
        "batchDispose",
        () => {
          describe(
            "batch dispose all components",
            () => {
              test(
                "batch dispose meshRenderer components",
                () => {
                  let (state, gameObject1, meshRenderer1) =
                    MeshRendererTool.createGameObject(state^);
                  let (state, gameObject2, meshRenderer2) =
                    MeshRendererTool.createGameObject(state);
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
                  state |> MeshRendererTool.getRenderArray |> expect == [||]
                }
              );
              test(
                "batch dispose transform componets",
                () => {
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
                  let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
                  let state =
                    state
                    |> Transform.setTransformParent(Js.Nullable.return(transform1), transform2)
                    |> Transform.setTransformParent(Js.Nullable.return(transform2), transform3);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (2., 3., 4.);
                  let pos3 = (4., 3., 4.);
                  let state =
                    state
                    |> Transform.setTransformLocalPosition(transform1, pos1)
                    |> Transform.setTransformLocalPosition(transform2, pos2)
                    |> Transform.setTransformLocalPosition(transform3, pos3);
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
                  let state = state |> TransformTool.update;
                  state |> Transform.getTransformPosition(transform3) |> expect == pos3
                }
              );
              test(
                "batch dispose material componets",
                () => {
                  open MaterialType;
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
                  let {disposedIndexArray} = state |> MaterialTool.getData;
                  (
                    disposedIndexArray |> Js.Array.includes(material1),
                    disposedIndexArray |> Js.Array.includes(material2)
                  )
                  |> expect == (true, true)
                }
              );
              test(
                "batch dispose geometry componets",
                () => {
                  TestTool.closeContractCheck();
                  open StateDataType;
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
                  let {disposedIndexMap} = state |> GeometryTool.getData;
                  (
                    disposedIndexMap |> SparseMapSystem.has(geometry1),
                    disposedIndexMap |> SparseMapSystem.has(geometry2)
                  )
                  |> expect == (true, true)
                }
              );
              test(
                "batch dispose cameraController componets",
                () => {
                  open CameraControllerType;
                  let (state, gameObject1, _, cameraController1) =
                    CameraControllerTool.createCameraGameObject(state^);
                  let (state, gameObject2, _, cameraController2) =
                    CameraControllerTool.createCameraGameObject(state);
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
                  let {disposedIndexArray} = state |> CameraControllerTool.getData;
                  (
                    disposedIndexArray |> Js.Array.includes(cameraController1),
                    disposedIndexArray |> Js.Array.includes(cameraController2)
                  )
                  |> expect == (true, true)
                }
              )
            }
          );
          describe(
            "test reallocate gameObject",
            () =>
              test(
                "if have dispose too many gameObjects, reallocate gameObject",
                () => {
                  open GameObjectType;
                  let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                  let (state, gameObject1) = createGameObject(state);
                  let (state, gameObject2) = createGameObject(state);
                  let (state, gameObject3) = createGameObject(state);
                  let (state, gameObject4) = createGameObject(state);
                  let state =
                    state
                    |> batchDisposeGameObject([|
                         gameObject1,
                         gameObject2,
                         gameObject3,
                         gameObject4
                       |]);
                  let {transformMap, disposeCount} = GameObjectTool.getData(state);
                  (
                    disposeCount,
                    transformMap |> SparseMapSystem.has(gameObject1),
                    transformMap |> SparseMapSystem.has(gameObject2),
                    transformMap |> SparseMapSystem.has(gameObject3),
                    transformMap |> SparseMapSystem.has(gameObject4)
                  )
                  |> expect == (0, false, false, false, false)
                }
              )
          )
        }
      );
      describe(
        "initGameObject",
        () =>
          describe(
            "init components",
            () => {
              beforeEach(() => state := InitBasicMaterialJobTool.initWithRenderConfig());
              test(
                "init material component",
                () => {
                  let (state, gameObject, _, _) =
                    InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                  let attachShader = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~attachShader, ()));
                  let state = state |> initGameObject(gameObject);
                  getCallCount(attachShader) |> expect == 2
                }
              );
              test(
                "init geometry component",
                () => {
                  let (state, gameObject) = createGameObject(state^);
                  let (state, geometry) = BoxGeometry.createBoxGeometry(state);
                  let state = state |> BoxGeometryTool.setDefaultConfigData(geometry);
                  let state = state |> addGameObjectGeometryComponent(gameObject, geometry);
                  let state = state |> initGameObject(gameObject);
                  Geometry.getGeometryVertices(geometry, state)
                  |> expect == BoxGeometryTool.getDefaultVertices()
                }
              )
            }
          )
      );
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if gameObject is disposed",
            () => {
              let _testTwoParamFunc = (func) => {
                let (state, gameObject) = createGameObject(state^);
                let state = state |> disposeGameObject(gameObject);
                expect(() => func(gameObject, state)) |> toThrowMessage("gameObject should alive")
              };
              let _testThreeParmFunc = (func) => {
                let (state, gameObject) = createGameObject(state^);
                let state = state |> disposeGameObject(gameObject);
                expect(() => func(Obj.magic(gameObject), Obj.magic(1), state))
                |> toThrowMessage("gameObject should alive")
              };
              test(
                "getGameObjectTransformComponent should error",
                () => _testTwoParamFunc(getGameObjectTransformComponent)
              );
              test(
                "getGameObjectMaterialComponent should error",
                () => _testTwoParamFunc(getGameObjectMaterialComponent)
              );
              test(
                "getGameObjectMeshRendererComponent should error",
                () => _testTwoParamFunc(getGameObjectMeshRendererComponent)
              );
              test(
                "getGameObjectGeometryComponent should error",
                () => _testTwoParamFunc(getGameObjectGeometryComponent)
              );
              test(
                "getGameObjectCameraControllerComponent should error",
                () => _testTwoParamFunc(getGameObjectCameraControllerComponent)
              );
              test("disposeGameObject should error", () => _testTwoParamFunc(disposeGameObject));
              test(
                "batchDisposeGameObject should error",
                () => {
                  let (state, gameObject) = createGameObject(state^);
                  let state = state |> disposeGameObject(gameObject);
                  expect(() => batchDisposeGameObject([|gameObject|], state))
                  |> toThrowMessage("gameObject should alive")
                }
              );
              test("initGameObject should error", () => _testTwoParamFunc(initGameObject));
              test(
                "hasGameObjectGeometryComponent should error",
                () => _testTwoParamFunc(hasGameObjectGeometryComponent)
              );
              test(
                "addGameObjectTransformComponent should error",
                () => _testThreeParmFunc(addGameObjectTransformComponent)
              );
              test(
                "disposeGameObjectTransformComponent should error",
                () => _testThreeParmFunc(disposeGameObjectTransformComponent)
              );
              test(
                "addGameObjectCameraControllerComponent should error",
                () => _testThreeParmFunc(addGameObjectCameraControllerComponent)
              );
              test(
                "disposeGameObjectCameraControllerComponent should error",
                () => _testThreeParmFunc(disposeGameObjectCameraControllerComponent)
              );
              test(
                "addGameObjectMaterialComponent should error",
                () => _testThreeParmFunc(addGameObjectMaterialComponent)
              );
              test(
                "disposeGameObjectMaterialComponent should error",
                () => _testThreeParmFunc(disposeGameObjectMaterialComponent)
              );
              test(
                "addGameObjectMeshRendererComponent should error",
                () => _testThreeParmFunc(addGameObjectTransformComponent)
              );
              test(
                "addGameObjectMeshRendererComponent should error",
                () => _testThreeParmFunc(addGameObjectTransformComponent)
              );
              test(
                "disposeGameObjectMeshRendererComponent should error",
                () => _testThreeParmFunc(disposeGameObjectMeshRendererComponent)
              );
              test(
                "addGameObjectGeometryComponent should error",
                () => _testThreeParmFunc(addGameObjectGeometryComponent)
              );
              test(
                "disposeGameObjectGeometryComponent should error",
                () => _testThreeParmFunc(disposeGameObjectGeometryComponent)
              )
            }
          )
      )
    }
  );