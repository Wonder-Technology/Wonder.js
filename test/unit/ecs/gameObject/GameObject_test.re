open Wonder_jest;

open GameObject;

open GameObjectAPI;

open GameObjectAPI;

let _ =
  describe(
    "GameObject",
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
                  GameObjectTool.getGameObjectData(state) |> ((data) => expect(data.uid) == 1)
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
                "getGameObjectBasicMaterialComponent",
                () =>
                  test(
                    "get material component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, material) = BasicMaterial.createBasicMaterial(state);
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
                      let (state, material) = BasicMaterial.createBasicMaterial(state);
                      let state =
                        state |> addGameObjectBasicMaterialComponent(gameObject, material);
                      hasGameObjectBasicMaterialComponent(gameObject, state) |> expect == true
                    }
                  )
              );
              describe(
                "getGameObjectLightMaterialComponent",
                () =>
                  test(
                    "get material component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, material) = LightMaterial.createLightMaterial(state);
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
                      let (state, material) = LightMaterial.createLightMaterial(state);
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
                "",
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
            "test light component",
            () => {
              describe(
                "getGameObjectAmbientLightComponent",
                () =>
                  test(
                    "get light component",
                    () => {
                      let (state, gameObject) = createGameObject(state^);
                      let (state, light) = AmbientLight.createAmbientLight(state);
                      let state = state |> addGameObjectAmbientLightComponent(gameObject, light);
                      getGameObjectAmbientLightComponent(gameObject, state) |> expect == light
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
                      let (state, light) = AmbientLight.createAmbientLight(state);
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
                  let state = state |> disposeGameObject(gameObject1);
                  state |> TransformAPI.getTransformPosition(transform2) |> expect == pos2
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
                      let state = state |> disposeGameObject(gameObject1);
                      let {disposedIndexArray} = state |> BasicMaterialTool.getMaterialData;
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
                      let state = state |> disposeGameObject(gameObject1);
                      let {disposedIndexArray} = state |> LightMaterialTool.getMaterialData;
                      (
                        disposedIndexArray |> Js.Array.includes(material1),
                        disposedIndexArray |> Js.Array.includes(material2)
                      )
                      |> expect == (true, false)
                    }
                  )
                }
              );
              test(
                "dispose geometry component",
                () => {
                  TestTool.closeContractCheck();
                  open StateDataType;
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                  let state = state |> GeometryTool.initGeometrys;
                  let state = state |> disposeGameObject(gameObject1);
                  (
                    GeometryTool.isGeometryDisposed(geometry1, state),
                    GeometryTool.isGeometryDisposed(geometry2, state)
                  )
                  |> expect == (true, false)
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
                          open StateDataType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            AmbientLightTool.createGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
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
                          open StateDataType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            AmbientLightTool.createGameObject(state);
                          let (state, gameObject3, light3) =
                            AmbientLightTool.createGameObject(state);
                          let state = state |> disposeGameObject(gameObject3);
                          let state = state |> disposeGameObject(gameObject1);
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
                          open StateDataType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            AmbientLightTool.createGameObject(state);
                          let (state, gameObject3, light3) =
                            AmbientLightTool.createGameObject(state);
                          let (state, gameObject4, light4) =
                            AmbientLightTool.createGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let state = state |> disposeGameObject(gameObject3);
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
                          open StateDataType;
                          let (state, gameObject1, light1) =
                            DirectionLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            DirectionLightTool.createGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
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
                          open StateDataType;
                          let (state, gameObject1, light1) =
                            PointLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            PointLightTool.createGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
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
                  let state = state |> disposeGameObject(gameObject1);
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
                  let state = state |> disposeGameObject(gameObject1);
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
                    state
                    |> VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(
                         sourceInstance
                       );
                  let state = state |> disposeGameObject(gameObject);
                  let {disposedIndexArray} = state |> SourceInstanceTool.getSourceInstanceData;
                  disposedIndexArray |> expect == [|sourceInstance|]
                }
              );
              test(
                "dispose objectInstance component",
                () => {
                  open ObjectInstanceType;
                  let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                    ObjectInstanceTool.createObjectInstanceGameObject(state^);
                  let state = state |> disposeGameObject(objectInstanceGameObject);
                  let {disposedIndexArray} = state |> ObjectInstanceTool.getObjectInstanceData;
                  disposedIndexArray |> expect == [|objectInstance|]
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
                          let {transformMap} = GameObjectTool.getGameObjectData(state);
                          (
                            transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                            transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                            transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject3)
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
                          let {meshRendererMap} = GameObjectTool.getGameObjectData(state);
                          (
                            meshRendererMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                            meshRendererMap |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                            meshRendererMap |> WonderCommonlib.SparseMapSystem.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      test(
                        "new geometryMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state =
                            TestTool.initWithoutBuildFakeDom(
                              ~sandbox,
                              /* ~bufferConfig=
                                 Js.Nullable.return(GeometryTool.buildBufferConfig(1000)), */
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
                          let {geometryMap} = GameObjectTool.getGameObjectData(state);
                          (
                            geometryMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                            geometryMap |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                            geometryMap |> WonderCommonlib.SparseMapSystem.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      describe(
                        "test light material map",
                        () => {
                          test(
                            "new basicMaterialMap should only has alive data",
                            () => {
                              open GameObjectType;
                              let state =
                                MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                              let (state, gameObject1, material1) =
                                BasicMaterialTool.createGameObject(state);
                              let (state, gameObject2, material2) =
                                BasicMaterialTool.createGameObject(state);
                              let (state, gameObject3, material3) =
                                BasicMaterialTool.createGameObject(state);
                              let state = state |> disposeGameObject(gameObject1);
                              let state = state |> disposeGameObject(gameObject2);
                              let {basicMaterialMap} = GameObjectTool.getGameObjectData(state);
                              (
                                basicMaterialMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                                basicMaterialMap
                                |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                                basicMaterialMap
                                |> WonderCommonlib.SparseMapSystem.has(gameObject3)
                              )
                              |> expect == (false, false, true)
                            }
                          );
                          test(
                            "new lightMaterialMap should only has alive data",
                            () => {
                              open GameObjectType;
                              let state =
                                MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                              let (state, gameObject1, material1) =
                                LightMaterialTool.createGameObject(state);
                              let (state, gameObject2, material2) =
                                LightMaterialTool.createGameObject(state);
                              let (state, gameObject3, material3) =
                                LightMaterialTool.createGameObject(state);
                              let state = state |> disposeGameObject(gameObject1);
                              let state = state |> disposeGameObject(gameObject2);
                              let {lightMaterialMap} = GameObjectTool.getGameObjectData(state);
                              (
                                lightMaterialMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                                lightMaterialMap
                                |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                                lightMaterialMap
                                |> WonderCommonlib.SparseMapSystem.has(gameObject3)
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
                            let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                            let (state, gameObject1, light1) = createGameObjectFunc(state);
                            let (state, gameObject2, light2) = createGameObjectFunc(state);
                            let (state, gameObject3, light3) = createGameObjectFunc(state);
                            let state = state |> disposeGameObject(gameObject1);
                            let state = state |> disposeGameObject(gameObject2);
                            let lightMap = getDataMapFunc(GameObjectTool.getGameObjectData(state));
                            (
                              lightMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                              lightMap |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                              lightMap |> WonderCommonlib.SparseMapSystem.has(gameObject3)
                            )
                            |> expect == (false, false, true)
                          };
                          test(
                            "new ambientLightMap should only has alive data",
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
                            "new directionLightMap should only has alive data",
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
                            "new pointLightMap should only has alive data",
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
                        "new basicCameraViewMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1, _, basicCameraView1) =
                            CameraTool.createCameraGameObject(state);
                          let (state, gameObject2, _, basicCameraView2) =
                            CameraTool.createCameraGameObject(state);
                          let (state, gameObject3, _, basicCameraView3) =
                            CameraTool.createCameraGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let {basicCameraViewMap} = GameObjectTool.getGameObjectData(state);
                          (
                            basicCameraViewMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                            basicCameraViewMap |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                            basicCameraViewMap |> WonderCommonlib.SparseMapSystem.has(gameObject3)
                          )
                          |> expect == (false, false, true)
                        }
                      );
                      test(
                        "new sourceInstanceMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=1, ());
                          let (state, gameObject1, _) =
                            SourceInstanceTool.createSourceInstanceGameObject(state);
                          let (state, gameObject2, _) =
                            SourceInstanceTool.createSourceInstanceGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
                          let {sourceInstanceMap} = GameObjectTool.getGameObjectData(state);
                          (
                            sourceInstanceMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                            sourceInstanceMap |> WonderCommonlib.SparseMapSystem.has(gameObject2)
                          )
                          |> expect == (false, true)
                        }
                      );
                      test(
                        "new objectInstanceMap should only has alive data",
                        () => {
                          open GameObjectType;
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=1, ());
                          let (state, _, _, objectInstanceGameObject1, _) =
                            ObjectInstanceTool.createObjectInstanceGameObject(state);
                          let (state, _, _, objectInstanceGameObject2, _) =
                            ObjectInstanceTool.createObjectInstanceGameObject(state);
                          let state = state |> disposeGameObject(objectInstanceGameObject1);
                          let {objectInstanceMap} = GameObjectTool.getGameObjectData(state);
                          (
                            objectInstanceMap
                            |> WonderCommonlib.SparseMapSystem.has(objectInstanceGameObject1),
                            objectInstanceMap
                            |> WonderCommonlib.SparseMapSystem.has(objectInstanceGameObject2)
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
                          let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ());
                          let (state, gameObject1) = createGameObject(state);
                          let (state, gameObject2) = createGameObject(state);
                          let (state, gameObject3) = createGameObject(state);
                          let (state, gameObject4) = createGameObject(state);
                          let state = state |> disposeGameObject(gameObject1);
                          let state = state |> disposeGameObject(gameObject2);
                          let state = state |> disposeGameObject(gameObject3);
                          let state = state |> disposeGameObject(gameObject4);
                          let {transformMap} = GameObjectTool.getGameObjectData(state);
                          (
                            transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                            transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                            transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject3),
                            transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject4)
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
                      let {disposedUidMap} = GameObjectTool.getGameObjectData(state);
                      (
                        disposedUidMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                        disposedUidMap |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                        disposedUidMap |> WonderCommonlib.SparseMapSystem.has(gameObject3)
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
                      let {aliveUidArray} = GameObjectTool.getGameObjectData(state);
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
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
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
                      let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
                      let {disposedIndexArray} = state |> BasicMaterialTool.getMaterialData;
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
                      let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
                      let {disposedIndexArray} = state |> LightMaterialTool.getMaterialData;
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
                    open StateDataType;
                    let (state, gameObject1, light1) = createGameObjectFunc(state^);
                    let (state, gameObject2, light2) = createGameObjectFunc(state);
                    let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
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
              test(
                "batch dispose geometry componets",
                () => {
                  TestTool.closeContractCheck();
                  open StateDataType;
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                  let state = state |> GeometryTool.initGeometrys;
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
                  (
                    GeometryTool.isGeometryDisposed(geometry1, state),
                    GeometryTool.isGeometryDisposed(geometry2, state)
                  )
                  |> expect == (true, true)
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
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
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
                  let state = state |> batchDisposeGameObject([|gameObject1, gameObject2|]);
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
                          let state = state |> batchDisposeGameObject(objectInstanceGameObjectArr);
                          let {sourceInstanceMap, gameObjectMap} =
                            ObjectInstanceTool.getObjectInstanceData(state);
                          (
                            sourceInstanceMap
                            |> WonderCommonlib.SparseMapSystem.has(objectInstanceArr[0]),
                            sourceInstanceMap
                            |> WonderCommonlib.SparseMapSystem.has(objectInstanceArr[1]),
                            gameObjectMap
                            |> WonderCommonlib.SparseMapSystem.has(objectInstanceArr[0]),
                            sourceInstanceMap
                            |> WonderCommonlib.SparseMapSystem.has(objectInstanceArr[1])
                          )
                          |> expect == (false, false, false, false)
                        }
                      );
                      test(
                        "remove from sourceInstance->objectInstanceArrayMap",
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
                          let state = state |> batchDisposeGameObject(objectInstanceGameObjectArr);
                          let {objectInstanceArrayMap} =
                            SourceInstanceTool.getSourceInstanceData(state);
                          objectInstanceArrayMap
                          |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
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
                                |> batchDisposeGameObject([|
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
                            |> ArraySystem.reduceState(
                                 [@bs]
                                 (
                                   (state, sourceInstance) =>
                                     VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(
                                       sourceInstance,
                                       state
                                     )
                                 ),
                                 state
                               );
                          let state = state |> batchDisposeGameObject(gameObjectArr);
                          let {objectInstanceArrayMap} =
                            SourceInstanceTool.getSourceInstanceData(state);
                          (
                            objectInstanceArrayMap
                            |> WonderCommonlib.SparseMapSystem.has(sourceInstanceArr[0]),
                            objectInstanceArrayMap
                            |> WonderCommonlib.SparseMapSystem.has(sourceInstanceArr[1])
                          )
                          |> expect == (false, false)
                        }
                      );
                      test(
                        "remove from buffer map",
                        () => {
                          open VboBufferType;
                          let (state, gameObjectArr, sourceInstanceArr) =
                            SourceInstanceTool.createSourceInstanceGameObjectArr(2, state^);
                          let state =
                            sourceInstanceArr
                            |> ArraySystem.reduceState(
                                 [@bs]
                                 (
                                   (state, sourceInstance) =>
                                     VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(
                                       sourceInstance,
                                       state
                                     )
                                 ),
                                 state
                               );
                          let state = state |> batchDisposeGameObject(gameObjectArr);
                          let {matrixInstanceBufferMap} = VboBufferTool.getVboBufferData(state);
                          (
                            matrixInstanceBufferMap
                            |> WonderCommonlib.SparseMapSystem.has(sourceInstanceArr[0]),
                            matrixInstanceBufferMap
                            |> WonderCommonlib.SparseMapSystem.has(sourceInstanceArr[1])
                          )
                          |> expect == (false, false)
                        }
                      )
                    }
                  )
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
                  let {transformMap, disposeCount} = GameObjectTool.getGameObjectData(state);
                  (
                    disposeCount,
                    transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject1),
                    transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject2),
                    transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject3),
                    transformMap |> WonderCommonlib.SparseMapSystem.has(gameObject4)
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
              beforeEach(
                () =>
                  state :=
                    InitBasicMaterialJobTool.initWithJobConfigWithoutBuildFakeDom(
                      sandbox,
                      NoWorkerJobConfigTool.buildNoWorkerJobConfig()
                    )
              );
              test(
                "init material component",
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
              let _getErrorMsg = () => "expect gameObject alive, but actual not";
              let _testTwoParamFunc = (func) => {
                let (state, gameObject) = createGameObject(state^);
                let state = state |> disposeGameObject(gameObject);
                expect(() => func(gameObject, state)) |> toThrowMessage(_getErrorMsg())
              };
              let _testThreeParmFunc = (func) => {
                let (state, gameObject) = createGameObject(state^);
                let state = state |> disposeGameObject(gameObject);
                expect(() => func(Obj.magic(gameObject), Obj.magic(1), state))
                |> toThrowMessage(_getErrorMsg())
              };
              test(
                "unsafeGetGameObjectTransformComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectTransformComponent)
              );
              test(
                "getGameObjectBasicMaterialComponent should error",
                () => _testTwoParamFunc(getGameObjectBasicMaterialComponent)
              );
              test(
                "getGameObjectLightMaterialComponent should error",
                () => _testTwoParamFunc(getGameObjectLightMaterialComponent)
              );
              test(
                "getGameObjectAmbientLightComponent should error",
                () => _testTwoParamFunc(getGameObjectAmbientLightComponent)
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
                "unsafeGetGameObjectBasicCameraViewComponent should error",
                () => _testTwoParamFunc(unsafeGetGameObjectBasicCameraViewComponent)
              );
              test("disposeGameObject should error", () => _testTwoParamFunc(disposeGameObject));
              test(
                "batchDisposeGameObject should error",
                () => {
                  let (state, gameObject) = createGameObject(state^);
                  let state = state |> disposeGameObject(gameObject);
                  expect(() => batchDisposeGameObject([|gameObject|], state))
                  |> toThrowMessage(_getErrorMsg())
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