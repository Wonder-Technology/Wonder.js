open Wonder_jest;

open GameObjectAPI;

let _ =
  describe(
    "GameObject",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
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
                  GameObjectTool.getGameObjectRecord(state)
                  |> ((record) => expect(record.uid) == 1)
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
                          let (state, transform) = TransformAPI.createTransform(state);
                          addGameObjectTransformComponent(gameObject, transform, state)
                        }
                      )
                      |> toThrowMessage(
                           "expect this type of the component shouldn't be added before, but actual not"
                         )
                    }
                  );
                  /* TODO: test after add disposeGameObjectTransformComponet */
                  /* test "add transform component" (fun () => {
                     }); */
                  test(
                    "can get component's gameObject",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      TransformAPI.unsafeGetTransformGameObject(
                        unsafeGetGameObjectTransformComponent(gameObject, state),
                        state
                      )
                      |> expect == gameObject
                    }
                  )
                }
              );
              describe(
                "unsafeGetGameObjectTransformComponent",
                () =>
                  test(
                    "get transform component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      unsafeGetGameObjectTransformComponent(gameObject, state)
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
                "unsafeGetGameObjectBasicMaterialComponent",
                () =>
                  test(
                    "get material component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, material) = BasicMaterialAPI.createBasicMaterial(state);
                      let state =
                        state |> addGameObjectBasicMaterialComponent(gameObject, material);
                      hasGameObjectBasicMaterialComponent(gameObject, state) |> expect == true
                    }
                  )
              );
              describe(
                "hasGameObjectBasicMaterialComponent",
                () =>
                  test(
                    "has material component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, material) = BasicMaterialAPI.createBasicMaterial(state);
                      let state =
                        state |> addGameObjectBasicMaterialComponent(gameObject, material);
                      hasGameObjectBasicMaterialComponent(gameObject, state) |> expect == true
                    }
                  )
              );
              describe(
                "unsafeGetGameObjectLightMaterialComponent",
                () =>
                  test(
                    "get material component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, material) = LightMaterialAPI.createLightMaterial(state);
                      let state =
                        state |> addGameObjectLightMaterialComponent(gameObject, material);
                      hasGameObjectLightMaterialComponent(gameObject, state) |> expect == true
                    }
                  )
              );
              describe(
                "hasGameObjectLightMaterialComponent",
                () =>
                  test(
                    "has material component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, material) = LightMaterialAPI.createLightMaterial(state);
                      let state =
                        state |> addGameObjectLightMaterialComponent(gameObject, material);
                      hasGameObjectLightMaterialComponent(gameObject, state) |> expect == true
                    }
                  )
              )
            }
          );
          describe(
            "test geometry component",
            () => {
              describe(
                "unsafeGetGeometryComponent",
                () =>
                  test(
                    "get last added geometry component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, boxGeometry) = BoxGeometryAPI.createBoxGeometry(state);
                      let (state, customGeometry1) = CustomGeometryAPI.createCustomGeometry(state);
                      let (state, customGeometry2) = CustomGeometryAPI.createCustomGeometry(state);
                      let state =
                        state
                        |> addGameObjectBoxGeometryComponent(gameObject, boxGeometry)
                        |> addGameObjectCustomGeometryComponent(gameObject, customGeometry2);
                      unsafeGetGameObjectGeometryComponent(gameObject, state)
                      |> expect == customGeometry2
                    }
                  )
              );
              describe(
                "test box geometry component",
                () =>
                  describe(
                    "hasGameObjectBoxGeometryComponent",
                    () =>
                      test(
                        "has geometry component",
                        () => {
                          let (state, gameObject) = createGameObject(state^);
                          let (state, geometry) = BoxGeometryAPI.createBoxGeometry(state);
                          let state =
                            state |> addGameObjectBoxGeometryComponent(gameObject, geometry);
                          hasGameObjectBoxGeometryComponent(gameObject, state) |> expect == true
                        }
                      )
                  )
              );
              describe(
                "test custom geometry component",
                () =>
                  describe(
                    "hasGameObjectCustomGeometryComponent",
                    () =>
                      test(
                        "has geometry component",
                        () => {
                          let (state, gameObject) = createGameObject(state^);
                          let (state, geometry) = CustomGeometryAPI.createCustomGeometry(state);
                          let state =
                            state |> addGameObjectCustomGeometryComponent(gameObject, geometry);
                          hasGameObjectCustomGeometryComponent(gameObject, state) |> expect == true
                        }
                      )
                  )
              )
            }
          );
          describe(
            "test meshRenderer component",
            () => {
              describe(
                "unsafeGetGameObjectMeshRendererComponent",
                () =>
                  test(
                    "get meshRenderer component",
                    () => {
                      let (state, gameObject, meshRenderer) =
                        MeshRendererTool.createBasicMaterialGameObject(state^);
                      unsafeGetGameObjectMeshRendererComponent(gameObject, state)
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
                      let (state, gameObject, meshRenderer) =
                        MeshRendererTool.createBasicMaterialGameObject(state^);
                      hasGameObjectMeshRendererComponent(gameObject, state) |> expect == true
                    }
                  )
              )
            }
          );
          describe(
            "test light component",
            () => {
              describe(
                "unsafeGetGameObjectAmbientLightComponent",
                () =>
                  test(
                    "get light component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, light) = AmbientLightAPI.createAmbientLight(state);
                      let state = state |> addGameObjectAmbientLightComponent(gameObject, light);
                      unsafeGetGameObjectAmbientLightComponent(gameObject, state)
                      |> expect == light
                    }
                  )
              );
              describe(
                "hasGameObjectAmbientLightComponent",
                () =>
                  test(
                    "has light component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, light) = AmbientLightAPI.createAmbientLight(state);
                      let state = state |> addGameObjectAmbientLightComponent(gameObject, light);
                      hasGameObjectAmbientLightComponent(gameObject, state) |> expect == true
                    }
                  )
              )
            }
          );
          describe(
            "test basicCameraView component",
            () => {
              let _prepare = () => {
                open BasicCameraViewAPI;
                let (state, gameObject) = createGameObject(state^);
                let (state, basicCameraView) = createBasicCameraView(state);
                let state =
                  state |> addGameObjectBasicCameraViewComponent(gameObject, basicCameraView);
                (state, gameObject, basicCameraView)
              };
              describe(
                "addGameObjectBasicCameraViewComponent",
                () => {
                  test(
                    "if this type of component is already exist, error",
                    () => {
                      open BasicCameraViewAPI;
                      let (state, gameObject, _) = _prepare();
                      expect(
                        () => {
                          let (state, basicCameraView) = createBasicCameraView(state);
                          addGameObjectBasicCameraViewComponent(gameObject, basicCameraView, state)
                        }
                      )
                      |> toThrowMessage(
                           "expect this type of the component shouldn't be added before, but actual not"
                         )
                    }
                  );
                  test(
                    "can get component's gameObject",
                    () => {
                      open BasicCameraViewAPI;
                      let (state, gameObject, _) = _prepare();
                      state
                      |> unsafeGetGameObjectBasicCameraView(
                           unsafeGetGameObjectBasicCameraViewComponent(gameObject, state)
                         )
                      |> expect == gameObject
                    }
                  )
                }
              );
              describe(
                "unsafeGetGameObjectBasicCameraViewComponent",
                () =>
                  test(
                    "get basicCameraView component",
                    () => {
                      let (state, gameObject, _) = _prepare();
                      state
                      |> unsafeGetGameObjectBasicCameraViewComponent(gameObject)
                      |> BasicCameraViewTool.isBasicCameraView
                    }
                  )
              );
              describe(
                "hasGameObjectBasicCameraViewComponent",
                () =>
                  test(
                    "has basicCameraView component",
                    () => {
                      let (state, gameObject, _) = _prepare();
                      state |> hasGameObjectBasicCameraViewComponent(gameObject) |> expect == true
                    }
                  )
              )
            }
          );
          describe(
            "test perspectiveCameraProjection component",
            () => {
              let _prepare = () => {
                open PerspectiveCameraProjectionAPI;
                let (state, gameObject) = createGameObject(state^);
                let (state, perspectiveCameraProjection) =
                  createPerspectiveCameraProjection(state);
                let state =
                  state
                  |> addGameObjectPerspectiveCameraProjectionComponent(
                       gameObject,
                       perspectiveCameraProjection
                     );
                (state, gameObject, perspectiveCameraProjection)
              };
              describe(
                "addGameObjectPerspectiveCameraProjectionComponent",
                () => {
                  test(
                    "if this type of component is already exist, error",
                    () => {
                      open PerspectiveCameraProjectionAPI;
                      let (state, gameObject, _) = _prepare();
                      expect(
                        () => {
                          let (state, perspectiveCameraProjection) =
                            createPerspectiveCameraProjection(state);
                          addGameObjectPerspectiveCameraProjectionComponent(
                            gameObject,
                            perspectiveCameraProjection,
                            state
                          )
                        }
                      )
                      |> toThrowMessage(
                           "expect this type of the component shouldn't be added before, but actual not"
                         )
                    }
                  );
                  test(
                    "can get component's gameObject",
                    () => {
                      open PerspectiveCameraProjectionAPI;
                      let (state, gameObject, _) = _prepare();
                      state
                      |> unsafeGetPerspectiveCameraProjectionGameObject(
                           unsafeGetGameObjectPerspectiveCameraProjectionComponent(
                             gameObject,
                             state
                           )
                         )
                      |> expect == gameObject
                    }
                  )
                }
              );
              describe(
                "unsafeGetGameObjectPerspectiveCameraProjectionComponent",
                () =>
                  test(
                    "get perspectiveCameraProjection component",
                    () => {
                      let (state, gameObject, _) = _prepare();
                      state
                      |> unsafeGetGameObjectPerspectiveCameraProjectionComponent(gameObject)
                      |> PerspectiveCameraProjectionTool.isPerspectiveCameraProjection
                    }
                  )
              );
              describe(
                "hasGameObjectPerspectiveCameraProjectionComponent",
                () =>
                  test(
                    "has perspectiveCameraProjection component",
                    () => {
                      let (state, gameObject, _) = _prepare();
                      state
                      |> hasGameObjectPerspectiveCameraProjectionComponent(gameObject)
                      |> expect == true
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
                  let state = state |> GameObjectTool.disposeGameObject(gameObject);
                  state |> isGameObjectAlive(gameObject) |> expect == false
                }
              );
              test(
                "disposed one shouldn't alive after reallocate",
                () => {
                  let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                  let (state, gameObject1) = createGameObject(state);
                  let (state, gameObject2) = createGameObject(state);
                  let (state, gameObject3) = createGameObject(state);
                  let (state, gameObject4) = createGameObject(state);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject3);
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
                  let transform1 = unsafeGetGameObjectTransformComponent(gameObject1, state);
                  let transform2 = unsafeGetGameObjectTransformComponent(gameObject2, state);
                  let state =
                    state
                    |> TransformAPI.setTransformParent(Js.Nullable.return(transform1), transform2);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (2., 3., 4.);
                  let state =
                    state
                    |> TransformAPI.setTransformLocalPosition(transform1, pos1)
                    |> TransformAPI.setTransformLocalPosition(transform2, pos2);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                  state |> TransformAPI.getTransformPosition(transform2) |> expect == pos2
                }
              );
              test(
                "dispose meshRenderer component",
                () => {
                  let (state, gameObject1, meshRenderer1) =
                    MeshRendererTool.createBasicMaterialGameObject(state^);
                  let (state, gameObject2, meshRenderer2) =
                    MeshRendererTool.createBasicMaterialGameObject(state);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                  state
                  |> MeshRendererTool.getBasicMaterialRenderArray
                  |> expect == [|gameObject2|]
                }
              );
              describe(
                "dispose material component",
                () => {
                  test(
                    "test basic material component",
                    () => {
                      open BasicMaterialType;
                      let (state, gameObject1, material1) =
                        BasicMaterialTool.createGameObject(state^);
                      let (state, gameObject2, material2) =
                        BasicMaterialTool.createGameObject(state);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                      let {disposedIndexArray} = state |> BasicMaterialTool.getRecord;
                      (
                        disposedIndexArray |> Js.Array.includes(material1),
                        disposedIndexArray |> Js.Array.includes(material2)
                      )
                      |> expect == (true, false)
                    }
                  );
                  test(
                    "test light material component",
                    () => {
                      open LightMaterialType;
                      let (state, gameObject1, material1) =
                        LightMaterialTool.createGameObject(state^);
                      let (state, gameObject2, material2) =
                        LightMaterialTool.createGameObject(state);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                      let {disposedIndexArray} = state |> LightMaterialTool.getRecord;
                      (
                        disposedIndexArray |> Js.Array.includes(material1),
                        disposedIndexArray |> Js.Array.includes(material2)
                      )
                      |> expect == (true, false)
                    }
                  )
                }
              );
              describe(
                "dispose geometry component",
                () => {
                  test(
                    "test box geometry component",
                    () => {
                      TestTool.closeContractCheck();
                      open GameObjectType;
                      let (state, gameObject1, geometry1) =
                        BoxGeometryTool.createGameObject(state^);
                      let (state, gameObject2, geometry2) =
                        BoxGeometryTool.createGameObject(state);
                      /*let state = state |> BoxGeometryTool.initGeometrys;*/
                      let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                      (
                        BoxGeometryTool.isGeometryDisposed(geometry1, state),
                        BoxGeometryTool.isGeometryDisposed(geometry2, state)
                      )
                      |> expect == (true, false)
                    }
                  );
                  test(
                    "test custom geometry component",
                    () => {
                      TestTool.closeContractCheck();
                      open GameObjectType;
                      let (state, gameObject1, geometry1) =
                        CustomGeometryTool.createGameObject(state^);
                      let (state, gameObject2, geometry2) =
                        CustomGeometryTool.createGameObject(state);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                      (
                        CustomGeometryTool.isGeometryDisposed(geometry1, state),
                        CustomGeometryTool.isGeometryDisposed(geometry2, state)
                      )
                      |> expect == (true, false)
                    }
                  )
                }
              );
              describe(
                "dispose light component",
                () => {
                  describe(
                    "test ambient light component",
                    () => {
                      test(
                        "test dispose one",
                        () => {
                          TestTool.closeContractCheck();
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            AmbientLightTool.createGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          (
                            AmbientLightTool.isAlive(light1, state),
                            AmbientLightTool.isAlive(light2, state)
                          )
                          |> expect == (false, true)
                        }
                      );
                      test(
                        "test dispose two",
                        () => {
                          TestTool.closeContractCheck();
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            AmbientLightTool.createGameObject(state);
                          let (state, gameObject3, light3) =
                            AmbientLightTool.createGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject3);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          (
                            AmbientLightTool.isAlive(light1, state),
                            AmbientLightTool.isAlive(light2, state),
                            AmbientLightTool.isAlive(light3, state)
                          )
                          |> expect == (false, true, false)
                        }
                      );
                      test(
                        "test dispose three",
                        () => {
                          TestTool.closeContractCheck();
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            AmbientLightTool.createGameObject(state);
                          let (state, gameObject3, light3) =
                            AmbientLightTool.createGameObject(state);
                          let (state, gameObject4, light4) =
                            AmbientLightTool.createGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject3);
                          (
                            AmbientLightTool.isAlive(light1, state),
                            AmbientLightTool.isAlive(light2, state),
                            AmbientLightTool.isAlive(light3, state),
                            AmbientLightTool.isAlive(light4, state)
                          )
                          |> expect == (false, false, false, true)
                        }
                      )
                    }
                  );
                  describe(
                    "test direction light component",
                    () =>
                      test(
                        "test dispose one",
                        () => {
                          TestTool.closeContractCheck();
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            DirectionLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            DirectionLightTool.createGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          (
                            DirectionLightTool.isAlive(light1, state),
                            DirectionLightTool.isAlive(light2, state)
                          )
                          |> expect == (false, true)
                        }
                      )
                  );
                  describe(
                    "test point light component",
                    () =>
                      test(
                        "test dispose one",
                        () => {
                          TestTool.closeContractCheck();
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            PointLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            PointLightTool.createGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          (
                            PointLightTool.isAlive(light1, state),
                            PointLightTool.isAlive(light2, state)
                          )
                          |> expect == (false, true)
                        }
                      )
                  )
                }
              );
              test(
                "dispose basicCameraView component",
                () => {
                  open BasicCameraViewType;
                  let (state, gameObject1, _, (basicCameraView1, _)) =
                    CameraTool.createCameraGameObject(state^);
                  let (state, gameObject2, _, (basicCameraView2, _)) =
                    CameraTool.createCameraGameObject(state);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                  let {disposedIndexArray} = state.basicCameraViewRecord;
                  (
                    disposedIndexArray |> Js.Array.includes(basicCameraView1),
                    disposedIndexArray |> Js.Array.includes(basicCameraView2)
                  )
                  |> expect == (true, false)
                }
              );
              test(
                "dispose perspectiveCameraProjection component",
                () => {
                  open PerspectiveCameraProjectionType;
                  let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
                    CameraTool.createCameraGameObject(state^);
                  let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
                    CameraTool.createCameraGameObject(state);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                  let {disposedIndexArray} = state.perspectiveCameraProjectionRecord;
                  (
                    disposedIndexArray |> Js.Array.includes(perspectiveCameraProjection1),
                    disposedIndexArray |> Js.Array.includes(perspectiveCameraProjection2)
                  )
                  |> expect == (true, false)
                }
              );
              test(
                "dispose sourceInstance component",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state |> VboBufferTool.addVboBufferToSourceInstanceBufferMap(sourceInstance);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject);
                  let {disposedIndexArray} = state |> SourceInstanceTool.getRecord;
                  disposedIndexArray |> expect == [|sourceInstance|]
                }
              );
              test(
                "dispose objectInstance component",
                () => {
                  open ObjectInstanceType;
                  let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                    ObjectInstanceTool.createObjectInstanceGameObject(state^);
                  let state = state |> GameObjectTool.disposeGameObject(objectInstanceGameObject);
                  let {disposedIndexArray} = state |> ObjectInstanceTool.getObjectInstanceRecord;
                  disposedIndexArray |> expect == [|objectInstance|]
                }
              )
            }
          );
          describe(
            "test reallocate gameObject",
            () => {
              describe(
                "if have dispose too many gameObjects, reallocate gameObject",
                () => {
                  describe(
                    "reallocate component maps",
                    () => {
                      test(
                        "new transformMap should only has alive record",
                        () => {
                          open GameObjectType;
                          let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1) = createGameObject(state);
                          let (state, gameObject2) = createGameObject(state);
                          let (state, gameObject3) = createGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                          let {transformMap} = GameObjectTool.getGameObjectRecord(state);
                          (
                            transformMap |> WonderCommonlib.SparseMapService.has(gameObject1),
                            transformMap |> WonderCommonlib.SparseMapService.has(gameObject2),
                            transformMap |> WonderCommonlib.SparseMapService.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      test(
                        "new meshRendererMap should only has alive record",
                        () => {
                          open GameObjectType;
                          let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1, meshRenderer1) =
                            MeshRendererTool.createBasicMaterialGameObject(state);
                          let (state, gameObject2, meshRenderer2) =
                            MeshRendererTool.createBasicMaterialGameObject(state);
                          let (state, gameObject3, meshRenderer3) =
                            MeshRendererTool.createBasicMaterialGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                          let {meshRendererMap} = GameObjectTool.getGameObjectRecord(state);
                          (
                            meshRendererMap |> WonderCommonlib.SparseMapService.has(gameObject1),
                            meshRendererMap |> WonderCommonlib.SparseMapService.has(gameObject2),
                            meshRendererMap |> WonderCommonlib.SparseMapService.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      describe(
                        "test current component data map",
                        () =>
                          test(
                            "new currentGeometryDataMap should only has alive record",
                            () => {
                              open GameObjectType;
                              let state = TestTool.initWithoutBuildFakeDom(~sandbox, ());
                              TestTool.closeContractCheck();
                              let state = SettingTool.setMemory(state, ~maxDisposeCount=2, ());
                              let (state, gameObject1, geometry1) =
                                BoxGeometryTool.createGameObject(state);
                              let (state, gameObject2, geometry2) =
                                BoxGeometryTool.createGameObject(state);
                              let (state, gameObject3, geometry3) =
                                BoxGeometryTool.createGameObject(state);
                              /*let state = state |> BoxGeometryTool.initGeometrys;*/
                              let {currentGeometryDataMap as oldCurrentGeometryDataMap} =
                                GameObjectTool.getGameObjectRecord(state);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                              let {currentGeometryDataMap} =
                                GameObjectTool.getGameObjectRecord(state);
                              (
                                ArrayTool.isArraySame(
                                  currentGeometryDataMap,
                                  oldCurrentGeometryDataMap
                                ),
                                currentGeometryDataMap
                                |> WonderCommonlib.SparseMapService.has(gameObject1),
                                currentGeometryDataMap
                                |> WonderCommonlib.SparseMapService.has(gameObject2),
                                currentGeometryDataMap
                                |> WonderCommonlib.SparseMapService.has(gameObject3)
                              )
                              |> expect == (false, false, false, true)
                            }
                          )
                      );
                      describe(
                        "test geometry map",
                        () =>
                          test(
                            "new currentGeometryDataMap should only has alive record",
                            () => {
                              open GameObjectType;
                              let state = TestTool.initWithoutBuildFakeDom(~sandbox, ());
                              TestTool.closeContractCheck();
                              let state = SettingTool.setMemory(state, ~maxDisposeCount=2, ());
                              let (state, gameObject1, geometry1) =
                                BoxGeometryTool.createGameObject(state);
                              let (state, gameObject2, geometry2) =
                                BoxGeometryTool.createGameObject(state);
                              let (state, gameObject3, geometry3) =
                                BoxGeometryTool.createGameObject(state);
                              /*let state = state |> BoxGeometryTool.initGeometrys;*/
                              let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                              let {currentGeometryDataMap} =
                                GameObjectTool.getGameObjectRecord(state);
                              (
                                currentGeometryDataMap
                                |> WonderCommonlib.SparseMapService.has(gameObject1),
                                currentGeometryDataMap
                                |> WonderCommonlib.SparseMapService.has(gameObject2),
                                currentGeometryDataMap
                                |> WonderCommonlib.SparseMapService.has(gameObject3)
                              )
                              |> expect == (false, false, true)
                            }
                          )
                      );
                      describe(
                        "test material map",
                        () => {
                          test(
                            "new basicMaterialMap should only has alive record",
                            () => {
                              open GameObjectType;
                              let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                              let (state, gameObject1, material1) =
                                BasicMaterialTool.createGameObject(state);
                              let (state, gameObject2, material2) =
                                BasicMaterialTool.createGameObject(state);
                              let (state, gameObject3, material3) =
                                BasicMaterialTool.createGameObject(state);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                              let {basicMaterialMap} = GameObjectTool.getGameObjectRecord(state);
                              (
                                basicMaterialMap
                                |> WonderCommonlib.SparseMapService.has(gameObject1),
                                basicMaterialMap
                                |> WonderCommonlib.SparseMapService.has(gameObject2),
                                basicMaterialMap
                                |> WonderCommonlib.SparseMapService.has(gameObject3)
                              )
                              |> expect == (false, false, true)
                            }
                          );
                          test(
                            "new lightMaterialMap should only has alive record",
                            () => {
                              open GameObjectType;
                              let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                              let (state, gameObject1, material1) =
                                LightMaterialTool.createGameObject(state);
                              let (state, gameObject2, material2) =
                                LightMaterialTool.createGameObject(state);
                              let (state, gameObject3, material3) =
                                LightMaterialTool.createGameObject(state);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                              let {lightMaterialMap} = GameObjectTool.getGameObjectRecord(state);
                              (
                                lightMaterialMap
                                |> WonderCommonlib.SparseMapService.has(gameObject1),
                                lightMaterialMap
                                |> WonderCommonlib.SparseMapService.has(gameObject2),
                                lightMaterialMap
                                |> WonderCommonlib.SparseMapService.has(gameObject3)
                              )
                              |> expect == (false, false, true)
                            }
                          )
                        }
                      );
                      describe(
                        "test light map",
                        () => {
                          let _test = (createGameObjectFunc, getDataMapFunc, state) => {
                            open GameObjectType;
                            let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                            let (state, gameObject1, light1) = createGameObjectFunc(state);
                            let (state, gameObject2, light2) = createGameObjectFunc(state);
                            let (state, gameObject3, light3) = createGameObjectFunc(state);
                            let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                            let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                            let lightMap =
                              getDataMapFunc(GameObjectTool.getGameObjectRecord(state));
                            (
                              lightMap |> WonderCommonlib.SparseMapService.has(gameObject1),
                              lightMap |> WonderCommonlib.SparseMapService.has(gameObject2),
                              lightMap |> WonderCommonlib.SparseMapService.has(gameObject3)
                            )
                            |> expect == (false, false, true)
                          };
                          test(
                            "new ambientLightMap should only has alive record",
                            () =>
                              GameObjectType.(
                                _test(
                                  AmbientLightTool.createGameObject,
                                  ({ambientLightMap}) => ambientLightMap,
                                  state
                                )
                              )
                          );
                          test(
                            "new directionLightMap should only has alive record",
                            () =>
                              GameObjectType.(
                                _test(
                                  DirectionLightTool.createGameObject,
                                  ({directionLightMap}) => directionLightMap,
                                  state
                                )
                              )
                          );
                          test(
                            "new pointLightMap should only has alive record",
                            () =>
                              GameObjectType.(
                                _test(
                                  PointLightTool.createGameObject,
                                  ({pointLightMap}) => pointLightMap,
                                  state
                                )
                              )
                          )
                        }
                      );
                      test(
                        "new basicCameraViewMap should only has alive record",
                        () => {
                          open GameObjectType;
                          let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1, _, basicCameraView1) =
                            CameraTool.createCameraGameObject(state);
                          let (state, gameObject2, _, basicCameraView2) =
                            CameraTool.createCameraGameObject(state);
                          let (state, gameObject3, _, basicCameraView3) =
                            CameraTool.createCameraGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                          let {basicCameraViewMap} = GameObjectTool.getGameObjectRecord(state);
                          (
                            basicCameraViewMap |> WonderCommonlib.SparseMapService.has(gameObject1),
                            basicCameraViewMap |> WonderCommonlib.SparseMapService.has(gameObject2),
                            basicCameraViewMap |> WonderCommonlib.SparseMapService.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      test(
                        "new sourceInstanceMap should only has alive record",
                        () => {
                          open GameObjectType;
                          let state = SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
                          let (state, gameObject1, _) =
                            SourceInstanceTool.createSourceInstanceGameObject(state);
                          let (state, gameObject2, _) =
                            SourceInstanceTool.createSourceInstanceGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          let {sourceInstanceMap} = GameObjectTool.getGameObjectRecord(state);
                          (
                            sourceInstanceMap |> WonderCommonlib.SparseMapService.has(gameObject1),
                            sourceInstanceMap |> WonderCommonlib.SparseMapService.has(gameObject2)
                          )
                          |> expect == (false, true)
                        }
                      );
                      test(
                        "new objectInstanceMap should only has alive record",
                        () => {
                          open GameObjectType;
                          let state = SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
                          let (state, _, _, objectInstanceGameObject1, _) =
                            ObjectInstanceTool.createObjectInstanceGameObject(state);
                          let (state, _, _, objectInstanceGameObject2, _) =
                            ObjectInstanceTool.createObjectInstanceGameObject(state);
                          let state =
                            state |> GameObjectTool.disposeGameObject(objectInstanceGameObject1);
                          let {objectInstanceMap} = GameObjectTool.getGameObjectRecord(state);
                          (
                            objectInstanceMap
                            |> WonderCommonlib.SparseMapService.has(objectInstanceGameObject1),
                            objectInstanceMap
                            |> WonderCommonlib.SparseMapService.has(objectInstanceGameObject2)
                          )
                          |> expect == (false, true)
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
                          let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1) = createGameObject(state);
                          let (state, gameObject2) = createGameObject(state);
                          let (state, gameObject3) = createGameObject(state);
                          let (state, gameObject4) = createGameObject(state);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject3);
                          let state = state |> GameObjectTool.disposeGameObject(gameObject4);
                          let {transformMap} = GameObjectTool.getGameObjectRecord(state);
                          (
                            transformMap |> WonderCommonlib.SparseMapService.has(gameObject1),
                            transformMap |> WonderCommonlib.SparseMapService.has(gameObject2),
                            transformMap |> WonderCommonlib.SparseMapService.has(gameObject3),
                            transformMap |> WonderCommonlib.SparseMapService.has(gameObject4)
                          )
                          |> expect == (false, false, false, false)
                        }
                      )
                  );
                  test(
                    "empty disposedUidMap",
                    () => {
                      open GameObjectType;
                      let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                      let (state, gameObject1) = createGameObject(state);
                      let (state, gameObject2) = createGameObject(state);
                      let (state, gameObject3) = createGameObject(state);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject3);
                      let {disposedUidMap} = GameObjectTool.getGameObjectRecord(state);
                      (
                        disposedUidMap |> WonderCommonlib.SparseMapService.has(gameObject1),
                        disposedUidMap |> WonderCommonlib.SparseMapService.has(gameObject2),
                        disposedUidMap |> WonderCommonlib.SparseMapService.has(gameObject3)
                      )
                      |> expect == (false, false, true)
                    }
                  );
                  test(
                    "update aliveUidArray",
                    () => {
                      open GameObjectType;
                      let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                      let (state, gameObject1) = createGameObject(state);
                      let (state, gameObject2) = createGameObject(state);
                      let (state, gameObject3) = createGameObject(state);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject3);
                      let {aliveUidArray} = GameObjectTool.getGameObjectRecord(state);
                      aliveUidArray |> expect == [|gameObject3|]
                    }
                  )
                }
              );
              describe(
                "optimize: should only reallocate once in one loop",
                () => {
                  test(
                    "test can correctly reallocate",
                    () => {
                      let (state, gameObject1, gameObject2, gameObject3) =
                        ReallocateGameObjectCPUMemoryTool.prepareForOptimize(state);
                      ReallocateGameObjectCPUMemoryTool.judgeForOptimize(
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3
                      )
                    }
                  );
                  test(
                    "test dispose sourceInstance",
                    () => {
                      open GameObjectType;
                      let state = SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
                      let (
                        state,
                        gameObject1,
                        sourceInstance1,
                        objectInstanceGameObject1,
                        objectInstance1
                      ) =
                        ObjectInstanceTool.createObjectInstanceGameObject(state);
                      let (
                        state,
                        gameObject2,
                        sourceInstance2,
                        objectInstanceGameObject2,
                        objectInstance2
                      ) =
                        ObjectInstanceTool.createObjectInstanceGameObject(state);
                      let (
                        state,
                        gameObject3,
                        sourceInstance3,
                        objectInstanceGameObject3,
                        objectInstance3
                      ) =
                        ObjectInstanceTool.createObjectInstanceGameObject(state);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                      let state = state |> GameObjectTool.disposeGameObject(gameObject2);
                      let {objectInstanceMap} = GameObjectTool.getGameObjectRecord(state);
                      (
                        objectInstanceMap
                        |> WonderCommonlib.SparseMapService.has(objectInstanceGameObject1),
                        objectInstanceMap
                        |> WonderCommonlib.SparseMapService.has(objectInstanceGameObject2),
                        objectInstanceMap
                        |> WonderCommonlib.SparseMapService.has(objectInstanceGameObject3)
                      )
                      |> expect == (false, false, true)
                    }
                  )
                }
              )
            }
          )
        }
      );
      describe(
        "disposeKeepOrder",
        () =>
          test(
            "not change its current parent's children order",
            () => {
              let (state, parent, tra) = GameObjectTool.createGameObject(state^);
              let (state, child1, tra1) = GameObjectTool.createGameObject(state);
              let (state, child2, tra2) = GameObjectTool.createGameObject(state);
              let (state, child3, tra3) = GameObjectTool.createGameObject(state);
              let state =
                state
                |> TransformAPI.setTransformParent(Js.Nullable.return(tra), tra1)
                |> TransformAPI.setTransformParent(Js.Nullable.return(tra), tra2)
                |> TransformAPI.setTransformParent(Js.Nullable.return(tra), tra3);
              let state = state |> GameObjectTool.disposeGameObjectKeepOrder(child1);
              TransformAPI.unsafeGetTransformChildren(tra, state) |> expect == [|tra2, tra3|]
            }
          )
      );
      describe(
        "test batchDispose gameObject",
        () =>
          /* describe(
               "batch dispose all components",
               () => {
                 test(
                   "batch dispose meshRenderer components",
                   () => {
                     let (state, gameObject1, meshRenderer1) =
                       MeshRendererTool.createBasicMaterialGameObject(state^);
                     let (state, gameObject2, meshRenderer2) =
                       MeshRendererTool.createBasicMaterialGameObject(state);
                     let state =
                       state |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
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
                       |> TransformAPI.setTransformParent(Js.Nullable.return(transform1), transform2)
                       |> TransformAPI.setTransformParent(Js.Nullable.return(transform2), transform3);
                     let pos1 = (1., 2., 3.);
                     let pos2 = (2., 3., 4.);
                     let pos3 = (4., 3., 4.);
                     let state =
                       state
                       |> TransformAPI.setTransformLocalPosition(transform1, pos1)
                       |> TransformAPI.setTransformLocalPosition(transform2, pos2)
                       |> TransformAPI.setTransformLocalPosition(transform3, pos3);
                     let state =
                       state |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                     state |> TransformAPI.getTransformPosition(transform3) |> expect == pos3
                   }
                 );
                 describe(
                   "batch dispose material components",
                   () => {
                     test(
                       "test basic material componet",
                       () => {
                         open BasicMaterialType;
                         let (state, gameObject1, material1) =
                           BasicMaterialTool.createGameObject(state^);
                         let (state, gameObject2, material2) =
                           BasicMaterialTool.createGameObject(state);
                         let state =
                           state
                           |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                         let {disposedIndexArray} = state |> BasicMaterialTool.getRecord;
                         (
                           disposedIndexArray |> Js.Array.includes(material1),
                           disposedIndexArray |> Js.Array.includes(material2)
                         )
                         |> expect == (true, true)
                       }
                     );
                     test(
                       "test light material componet",
                       () => {
                         open LightMaterialType;
                         let (state, gameObject1, material1) =
                           LightMaterialTool.createGameObject(state^);
                         let (state, gameObject2, material2) =
                           LightMaterialTool.createGameObject(state);
                         let state =
                           state
                           |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                         let {disposedIndexArray} = state |> LightMaterialTool.getRecord;
                         (
                           disposedIndexArray |> Js.Array.includes(material1),
                           disposedIndexArray |> Js.Array.includes(material2)
                         )
                         |> expect == (true, true)
                       }
                     )
                   }
                 );
                 describe(
                   "batch dispose light components",
                   () => {
                     let _test = ((createGameObjectFunc, isAliveFunc), state) => {
                       TestTool.closeContractCheck();
                       open GameObjectType;
                       let (state, gameObject1, light1) = createGameObjectFunc(state^);
                       let (state, gameObject2, light2) = createGameObjectFunc(state);
                       let state =
                         state |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                       (isAliveFunc(light1, state), isAliveFunc(light2, state))
                       |> expect == (false, false)
                     };
                     test(
                       "test ambient light component",
                       () =>
                         _test((AmbientLightTool.createGameObject, AmbientLightTool.isAlive), state)
                     );
                     test(
                       "test direction light component",
                       () =>
                         _test(
                           (DirectionLightTool.createGameObject, DirectionLightTool.isAlive),
                           state
                         )
                     );
                     test(
                       "test point light component",
                       () => _test((PointLightTool.createGameObject, PointLightTool.isAlive), state)
                     )
                   }
                 );
                 describe(
                   "batch dispose geometry components",
                   () => {
                     test(
                       "test box geometry component",
                       () => {
                         TestTool.closeContractCheck();
                         open GameObjectType;
                         let (state, gameObject1, geometry1) =
                           BoxGeometryTool.createGameObject(state^);
                         let (state, gameObject2, geometry2) =
                           BoxGeometryTool.createGameObject(state);
                         /*let state = state |> BoxGeometryTool.initGeometrys;*/
                         let state =
                           state
                           |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                         (
                           BoxGeometryTool.isGeometryDisposed(geometry1, state),
                           BoxGeometryTool.isGeometryDisposed(geometry2, state)
                         )
                         |> expect == (true, true)
                       }
                     );
                     test(
                       "test custom geometry component",
                       () => {
                         TestTool.closeContractCheck();
                         open GameObjectType;
                         let (state, gameObject1, geometry1) =
                           CustomGeometryTool.createGameObject(state^);
                         let (state, gameObject2, geometry2) =
                           CustomGeometryTool.createGameObject(state);
                         let state =
                           state
                           |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                         (
                           CustomGeometryTool.isGeometryDisposed(geometry1, state),
                           CustomGeometryTool.isGeometryDisposed(geometry2, state)
                         )
                         |> expect == (true, true)
                       }
                     )
                   }
                 );
                 test(
                   "batch dispose basicCameraView componets",
                   () => {
                     open BasicCameraViewType;
                     let (state, gameObject1, _, (basicCameraView1, _)) =
                       CameraTool.createCameraGameObject(state^);
                     let (state, gameObject2, _, (basicCameraView2, _)) =
                       CameraTool.createCameraGameObject(state);
                     let state =
                       state |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                     let {disposedIndexArray} = state.basicCameraViewRecord;
                     (
                       disposedIndexArray |> Js.Array.includes(basicCameraView1),
                       disposedIndexArray |> Js.Array.includes(basicCameraView2)
                     )
                     |> expect == (true, true)
                   }
                 );
                 test(
                   "batch dispose perspectiveCameraProjection componets",
                   () => {
                     open PerspectiveCameraProjectionType;
                     let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
                       CameraTool.createCameraGameObject(state^);
                     let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
                       CameraTool.createCameraGameObject(state);
                     let state =
                       state |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                     let {disposedIndexArray} = state.perspectiveCameraProjectionRecord;
                     (
                       disposedIndexArray |> Js.Array.includes(perspectiveCameraProjection1),
                       disposedIndexArray |> Js.Array.includes(perspectiveCameraProjection2)
                     )
                     |> expect == (true, true)
                   }
                 );
                 describe(
                   "batch dispose objectInstance componets",
                   () => {
                     describe(
                       "dispose data",
                       () => {
                         test(
                           "remove from sourceInstanceMap, gameObjectMap",
                           () => {
                             open ObjectInstanceType;
                             let (
                               state,
                               gameObject,
                               sourceInstance,
                               objectInstanceGameObjectArr,
                               objectInstanceArr
                             ) =
                               ObjectInstanceTool.createObjectInstanceGameObjectArr(2, state^);
                             let state =
                               state
                               |> GameObjectTool.batchDisposeGameObject(objectInstanceGameObjectArr);
                             let {sourceInstanceMap, gameObjectMap} =
                               ObjectInstanceTool.getObjectInstanceRecord(state);
                             (
                               sourceInstanceMap
                               |> WonderCommonlib.SparseMapService.has(objectInstanceArr[0]),
                               sourceInstanceMap
                               |> WonderCommonlib.SparseMapService.has(objectInstanceArr[1]),
                               gameObjectMap
                               |> WonderCommonlib.SparseMapService.has(objectInstanceArr[0]),
                               sourceInstanceMap
                               |> WonderCommonlib.SparseMapService.has(objectInstanceArr[1])
                             )
                             |> expect == (false, false, false, false)
                           }
                         );
                         test(
                           "remove from sourceInstance->objectInstanceTransforms",
                           () => {
                             open SourceInstanceType;
                             let (
                               state,
                               gameObject,
                               sourceInstance,
                               objectInstanceGameObjectArr,
                               objectInstanceArr
                             ) =
                               ObjectInstanceTool.createObjectInstanceGameObjectArr(3, state^);
                             let state =
                               state
                               |> GameObjectTool.batchDisposeGameObject(objectInstanceGameObjectArr);
                             SourceInstanceAPI.getSourceInstanceObjectInstanceTransformArray(
                               sourceInstance,
                               state
                             )
                             |> expect == [||]
                           }
                         )
                       }
                     );
                     describe(
                       "contract check",
                       () =>
                         test(
                           "all objectInstance should belong to the same sourceInstance",
                           () => {
                             open ObjectInstanceType;
                             let (state, _, _, objectInstanceGameObject1, _) =
                               ObjectInstanceTool.createObjectInstanceGameObject(state^);
                             let (state, _, _, objectInstanceGameObject2, _) =
                               ObjectInstanceTool.createObjectInstanceGameObject(state);
                             expect(
                               () => {
                                 let state =
                                   state
                                   |> GameObjectTool.batchDisposeGameObject([|
                                        objectInstanceGameObject1,
                                        objectInstanceGameObject2
                                      |]);
                                 ()
                               }
                             )
                             |> toThrowMessage(
                                  "expect all objectInstance belong to the same sourceInstance, but actual not"
                                )
                           }
                         )
                     )
                   }
                 );
                 describe(
                   "batch dispose sourceInstance componets",
                   () =>
                     describe(
                       "dispose data",
                       () => {
                         test(
                           "remove from map",
                           () => {
                             open SourceInstanceType;
                             let (state, gameObjectArr, sourceInstanceArr) =
                               SourceInstanceTool.createSourceInstanceGameObjectArr(2, state^);
                             let state =
                               sourceInstanceArr
                               |> ReduceStateMainService.reduceState(
                                    [@bs]
                                    (
                                      (state, sourceInstance) =>
                                        VboBufferTool.addVboBufferToSourceInstanceBufferMap(
                                          sourceInstance,
                                          state
                                        )
                                    ),
                                    state
                                  );
                             let state =
                               state |> GameObjectTool.batchDisposeGameObject(gameObjectArr);
                             (
                               SourceInstanceTool.hasObjectInstanceTransform(
                                 sourceInstanceArr[0],
                                 state
                               ),
                               SourceInstanceTool.hasObjectInstanceTransform(
                                 sourceInstanceArr[1],
                                 state
                               )
                             )
                             |> expect == (false, false)
                           }
                         );
                         /* test(
                           "remove from buffer map",
                           () => {
                             open VboBufferType;
                             let (state, gameObjectArr, sourceInstanceArr) =
                               SourceInstanceTool.createSourceInstanceGameObjectArr(2, state^);
                             let state =
                               sourceInstanceArr
                               |> ReduceStateMainService.reduceState(
                                    [@bs]
                                    (
                                      (state, sourceInstance) =>
                                        VboBufferTool.addVboBufferToSourceInstanceBufferMap(
                                          sourceInstance,
                                          state
                                        )
                                    ),
                                    state
                                  );
                             let state =
                               state |> GameObjectTool.batchDisposeGameObject(gameObjectArr);
                             let {matrixInstanceBufferMap} = VboBufferTool.getVboBufferRecord(state);
                             (
                               matrixInstanceBufferMap
                               |> WonderCommonlib.SparseMapService.has(sourceInstanceArr[0]),
                               matrixInstanceBufferMap
                               |> WonderCommonlib.SparseMapService.has(sourceInstanceArr[1])
                             )
                             |> expect == (false, false)
                           }
                         ) */
                       }
                     )
                 )
               }
             ); */
          describe(
            "test reallocate gameObject",
            () =>
              test(
                "if have dispose too many gameObjects, reallocate gameObject",
                () => {
                  open GameObjectType;
                  let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                  let (state, gameObject1) = createGameObject(state);
                  let (state, gameObject2) = createGameObject(state);
                  let (state, gameObject3) = createGameObject(state);
                  let (state, gameObject4) = createGameObject(state);
                  let state =
                    state
                    |> GameObjectTool.batchDisposeGameObject([|
                         gameObject1,
                         gameObject2,
                         gameObject3,
                         gameObject4
                       |]);
                  let {transformMap, disposeCount} = GameObjectTool.getGameObjectRecord(state);
                  (
                    disposeCount,
                    transformMap |> WonderCommonlib.SparseMapService.has(gameObject1),
                    transformMap |> WonderCommonlib.SparseMapService.has(gameObject2),
                    transformMap |> WonderCommonlib.SparseMapService.has(gameObject3),
                    transformMap |> WonderCommonlib.SparseMapService.has(gameObject4)
                  )
                  |> expect == (0, false, false, false, false)
                }
              )
          )
      );
      describe(
        "initGameObject",
        () =>
          describe(
            "init components",
            () => {
              beforeEach(
                () =>
                  state :=
                    InitBasicMaterialJobTool.initWithJobConfigWithoutBuildFakeDom(
                      sandbox,
                      NoWorkerJobConfigTool.buildNoWorkerJobConfig()
                    )
              );
              test(
                "init basic material component",
                () => {
                  let (state, gameObject, _, _) =
                    InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                  let attachShader = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~attachShader, ()));
                  let state = AllMaterialTool.prepareForInit(state);
                  let state = state |> initGameObject(gameObject);
                  getCallCount(attachShader) |> expect == 2
                }
              );
              test(
                "init light material component",
                () => {
                  let (state, gameObject, _, _) =
                    InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
                  let attachShader = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~attachShader, ()));
                  let state = AllMaterialTool.prepareForInit(state);
                  let state = state |> initGameObject(gameObject);
                  getCallCount(attachShader) |> expect == 2
                }
              );
              describe(
                "init maps",
                () => {
                  describe(
                    "init basic material->map",
                    () => {
                      test(
                        "if has no map, not init map",
                        () => {
                          let (state, gameObject, _, _) =
                            InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                          let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ())
                               );
                          let state = AllMaterialTool.prepareForInit(state);
                          let state = state |> initGameObject(gameObject);
                          getCallCount(createTexture) |> expect == 0
                        }
                      );
                      test(
                        "else, init map",
                        () => {
                          let (state, gameObject, _, _) =
                            InitBasicMaterialJobTool.prepareGameObjectWithCreatedMap(
                              sandbox,
                              state^
                            );
                          let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ())
                               );
                          let state = AllMaterialTool.prepareForInit(state);
                          let state = state |> initGameObject(gameObject);
                          getCallCount(createTexture) |> expect == 1
                        }
                      )
                    }
                  );
                  describe(
                    "init light material->map",
                    () => {
                      describe(
                        "test basic source texture",
                        () => {
                          test(
                            "if has no map, not init map",
                            () => {
                              let (state, gameObject, _, _) =
                                InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
                              let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                              let state =
                                state
                                |> FakeGlTool.setFakeGl(
                                     FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ())
                                   );
                              let state = AllMaterialTool.prepareForInit(state);
                              let state = state |> initGameObject(gameObject);
                              getCallCount(createTexture) |> expect == 0
                            }
                          );
                          test(
                            "else, init map",
                            () => {
                              let (state, gameObject, _, _) =
                                InitLightMaterialJobTool.prepareGameObjectWithCreatedMap(
                                  sandbox,
                                  state^
                                );
                              let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                              let state =
                                state
                                |> FakeGlTool.setFakeGl(
                                     FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ())
                                   );
                              let state = AllMaterialTool.prepareForInit(state);
                              let state = state |> initGameObject(gameObject);
                              getCallCount(createTexture) |> expect == 2
                            }
                          )
                        }
                      );
                      describe(
                        "test arrayBufferView source texture",
                        () =>
                          test(
                            "test init map",
                            () => {
                              let (state, texture1) =
                                ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                                  state^
                                );
                              let (state, texture2) =
                                ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                                  state
                                );
                              let (state, gameObject, _, _) =
                                InitLightMaterialJobTool.prepareGameObjectWithMap(
                                  sandbox,
                                  texture1,
                                  texture2,
                                  state
                                );
                              let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                              let state =
                                state
                                |> FakeGlTool.setFakeGl(
                                     FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ())
                                   );
                              let state = AllMaterialTool.prepareForInit(state);
                              let state = state |> initGameObject(gameObject);
                              getCallCount(createTexture) |> expect == 2
                            }
                          )
                      )
                    }
                  )
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
              let _getErrorMsg = () => "expect gameObject alive, but actual not";
              let _testTwoParamFunc = (func) => {
                let (state, gameObject) = createGameObject(state^);
                let state = state |> GameObjectTool.disposeGameObject(gameObject);
                expect(() => func(gameObject, state)) |> toThrowMessage(_getErrorMsg())
              };
              let _testThreeParmFunc = (func) => {
                let (state, gameObject) = createGameObject(state^);
                let state = state |> GameObjectTool.disposeGameObject(gameObject);
                expect(() => func(Obj.magic(gameObject), Obj.magic(1), state))
                |> toThrowMessage(_getErrorMsg())
              };
              let _testFourParmFunc = (func) => {
                let (state, gameObject) = createGameObject(state^);
                let state = state |> GameObjectTool.disposeGameObject(gameObject);
                expect(() => func(Obj.magic(gameObject), Obj.magic(1), Obj.magic(2), state))
                |> toThrowMessage(_getErrorMsg())
              };
              test(
                "unsafeGetGameObjectTransformComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectTransformComponent)
              );
              test(
                "unsafeGetGameObjectBasicMaterialComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectBasicMaterialComponent)
              );
              test(
                "unsafeGetGameObjectLightMaterialComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectLightMaterialComponent)
              );
              test(
                "unsafeGetGameObjectAmbientLightComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectAmbientLightComponent)
              );
              test(
                "unsafeGetGameObjectMeshRendererComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectMeshRendererComponent)
              );
              test(
                "unsafeGetGeometryComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectGeometryComponent)
              );
              test(
                "unsafeGetGameObjectBasicCameraViewComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectBasicCameraViewComponent)
              );
              test("disposeGameObject should error", () => _testTwoParamFunc(disposeGameObject));
              test(
                "batchDisposeGameObject should error",
                () => {
                  let (state, gameObject) = createGameObject(state^);
                  let state = state |> GameObjectTool.disposeGameObject(gameObject);
                  expect(() => GameObjectAPI.batchDisposeGameObject([|gameObject|], state))
                  |> toThrowMessage(_getErrorMsg())
                }
              );
              test("initGameObject should error", () => _testTwoParamFunc(initGameObject));
              test(
                "hasGameObjectBoxGeometryComponent should error",
                () => _testTwoParamFunc(hasGameObjectBoxGeometryComponent)
              );
              test(
                "hasGameObjectCustomGeometryComponent should error",
                () => _testTwoParamFunc(hasGameObjectCustomGeometryComponent)
              );
              test(
                "addGameObjectTransformComponent should error",
                () => _testThreeParmFunc(addGameObjectTransformComponent)
              );
              test(
                "disposeGameObjectTransformComponent should error",
                () => _testFourParmFunc(disposeGameObjectTransformComponent)
              );
              test(
                "addGameObjectBasicCameraViewComponent should error",
                () => _testThreeParmFunc(addGameObjectBasicCameraViewComponent)
              );
              test(
                "disposeGameObjectBasicCameraViewComponent should error",
                () => _testThreeParmFunc(disposeGameObjectBasicCameraViewComponent)
              );
              test(
                "addGameObjectBasicMaterialComponent should error",
                () => _testThreeParmFunc(addGameObjectBasicMaterialComponent)
              );
              test(
                "disposeGameObjectBasicMaterialComponent should error",
                () => _testThreeParmFunc(disposeGameObjectBasicMaterialComponent)
              );
              test(
                "addGameObjectLightMaterialComponent should error",
                () => _testThreeParmFunc(addGameObjectLightMaterialComponent)
              );
              test(
                "disposeGameObjectLightMaterialComponent should error",
                () => _testThreeParmFunc(disposeGameObjectLightMaterialComponent)
              );
              test(
                "addGameObjectAmbientLightComponent should error",
                () => _testThreeParmFunc(addGameObjectAmbientLightComponent)
              );
              test(
                "disposeGameObjectAmbientLightComponent should error",
                () => _testThreeParmFunc(disposeGameObjectAmbientLightComponent)
              );
              test(
                "addGameObjectMeshRendererComponent should error",
                () => _testThreeParmFunc(addGameObjectMeshRendererComponent)
              );
              test(
                "disposeGameObjectMeshRendererComponent should error",
                () => _testThreeParmFunc(disposeGameObjectMeshRendererComponent)
              );
              test(
                "addGameObjectBoxGeometryComponent should error",
                () => _testThreeParmFunc(addGameObjectBoxGeometryComponent)
              );
              test(
                "disposeGameObjectBoxGeometryComponentshould error",
                () => _testThreeParmFunc(disposeGameObjectBoxGeometryComponent)
              );
              test(
                "addGameObjectCustomGeometryComponent should error",
                () => _testThreeParmFunc(addGameObjectCustomGeometryComponent)
              );
              test(
                "disposeGameObjectCustomGeometryComponentshould error",
                () => _testThreeParmFunc(disposeGameObjectCustomGeometryComponent)
              )
            }
          )
      )
    }
  );