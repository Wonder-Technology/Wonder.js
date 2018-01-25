open Wonder_jest;

open GameObject;

let _ =
  describe(
    "clone gameObject",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _cloneGameObject = (gameObject, count, state) =>
        CloneTool.cloneGameObject(gameObject, count, false, state);
      let _getClonedTransformDataArr = (gameObject, count, state) => {
        let (state, clonedGameObjectArr) = _cloneGameObject(gameObject, count, state);
        (
          clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
          clonedGameObjectArr
          |> CloneTool.getFlattenClonedGameObjectArr
          |> Js.Array.map(
               (clonedGameObject) => getGameObjectTransformComponent(clonedGameObject, state)
             )
        )
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfig(
              ~sandbox,
              ~bufferConfig=Js.Nullable.return(BufferConfigTool.buildBufferConfig(1000)),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "clone gameObject",
        () => {
          open GameObjectType;
          let (state, gameObject1) = createGameObject(state^);
          let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
          clonedGameObjectArr |> expect == [|[|1, 2|]|]
        }
      );
      describe(
        "clone components",
        () => {
          describe(
            "contract check",
            () => {
              test(
                "shouldn't clone sourceInstance gameObject",
                () => {
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  expect(() => _cloneGameObject(gameObject, 2, state) |> ignore)
                  |> toThrowMessage("expect not clone sourceInstance gameObject, but actual do")
                }
              );
              test(
                "shouldn't clone objectInstance gameObject",
                () => {
                  let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                    ObjectInstanceTool.createObjectInstanceGameObject(state^);
                  expect(() => _cloneGameObject(objectInstanceGameObject, 2, state) |> ignore)
                  |> toThrowMessage("expect not clone objectInstance gameObject, but actual do")
                }
              )
            }
          );
          describe(
            "test clone meshRenderer component",
            () => {
              test(
                "test clone specific count of meshRenderers",
                () => {
                  open GameObjectType;
                  let (state, gameObject1, meshRenderer1) =
                    MeshRendererTool.createGameObject(state^);
                  let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         getGameObjectMeshRendererComponent(clonedGameObject, state)
                     )
                  |> Js.Array.length
                  |> expect == 2
                }
              );
              test(
                "add cloned gameObject to renderGameObjectArray",
                () => {
                  open GameObjectType;
                  let (state, gameObject1, meshRenderer1) =
                    MeshRendererTool.createGameObject(state^);
                  let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                  state
                  |> MeshRendererTool.getRenderArray
                  |>
                  expect == (
                              [|gameObject1|]
                              |> Js.Array.concat(
                                   clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr
                                 )
                            )
                }
              )
            }
          );
          describe(
            "test clone geometry component",
            () => {
              let _createAndInitGameObject = (state) => {
                let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state);
                let state = state |> initGameObject(gameObject1);
                (state, gameObject1, geometry1)
              };
              let _prepare = (state) => {
                open GameObjectType;
                let (state, gameObject1, geometry1) = _createAndInitGameObject(state);
                CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 2)
              };
              test(
                "test clone specific count of geometrys",
                () => {
                  let (_, _, _, _, clonedGeometryArr) = _prepare(state^);
                  clonedGeometryArr |> Js.Array.length |> expect == 2
                }
              )
            }
          );
          describe(
            "test clone material component",
            () => {
              let _prepare = () => {
                let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                let state = state |> MaterialTool.setShaderIndex(material1, 1);
                let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                (
                  state,
                  gameObject1,
                  material1,
                  clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         getGameObjectMaterialComponent(clonedGameObject, state)
                     )
                )
              };
              test(
                "test clone specific count of materials",
                () => {
                  let (state, _, _, _, clonedMaterialArr) = _prepare();
                  clonedMaterialArr |> Js.Array.length |> expect == 2
                }
              );
              describe(
                "test init cloned material",
                () =>
                  test(
                    "can correctly set cloned one's shader index",
                    () => {
                      let (state, _, _, clonedGameObjectArr, clonedMaterialArr) = _prepare();
                      let state =
                        state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                      let state = MaterialTool.prepareForInit(state);
                      let state =
                        state
                        |> GameObject.initGameObject(clonedGameObjectArr[0])
                        |> GameObject.initGameObject(clonedGameObjectArr[1]);
                      (
                        MaterialTool.unsafeGetShaderIndex(clonedMaterialArr[0], state),
                        MaterialTool.unsafeGetShaderIndex(clonedMaterialArr[1], state)
                      )
                      |> expect == (1, 1)
                    }
                  )
              );
              test(
                "add cloned material's gameObject to map",
                () => {
                  let (state, _, _, clonedGameObjectArr, clonedMaterialArr) = _prepare();
                  (
                    Material.getMaterialGameObject(clonedMaterialArr[0], state),
                    Material.getMaterialGameObject(clonedMaterialArr[1], state)
                  )
                  |> expect == (clonedGameObjectArr[0], clonedGameObjectArr[1])
                }
              );
              describe(
                "set cloned material data",
                () => {
                  let _prepare = () => {
                    let (state, gameObject1, material1) =
                      BasicMaterialTool.createGameObject(state^);
                    /* let state = state |> MaterialTool.setShaderIndex(material1, 0); */
                    (state, gameObject1, material1)
                  };
                  let _clone = (gameObject, state) => {
                    let (state, clonedGameObjectArr) = _cloneGameObject(gameObject, 2, state);
                    (
                      state,
                      clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
                      clonedGameObjectArr
                      |> CloneTool.getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             getGameObjectMaterialComponent(clonedGameObject, state)
                         )
                    )
                  };
                  test(
                    "set color",
                    () => {
                      let (state, gameObject, material) = _prepare();
                      let color = [|1., 0.2, 0.3|];
                      let state = state |> Material.setMaterialColor(material, color);
                      let (state, _, clonedMaterialArr) = _clone(gameObject, state);
                      let state =
                        state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                      let state = MaterialTool.prepareForInit(state);
                      (
                        Material.getMaterialColor(clonedMaterialArr[0], state),
                        Material.getMaterialColor(clonedMaterialArr[1], state)
                      )
                      |> expect == (color, color)
                    }
                  )
                }
              );
              describe(
                "fix bug",
                () =>
                  test(
                    "if source material's shaderIndex not exist, not set cloned material's shaderIndex",
                    () => {
                      let (state, gameObject1, material1) =
                        BasicMaterialTool.createGameObject(state^);
                      let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 1, state);
                      let clonedMaterialArr =
                        clonedGameObjectArr
                        |> CloneTool.getFlattenClonedGameObjectArr
                        |> Js.Array.map(
                             (clonedGameObject) =>
                               getGameObjectMaterialComponent(clonedGameObject, state)
                           );
                      MaterialTool.hasShaderIndex(clonedMaterialArr[0], state) |> expect == false
                    }
                  )
              )
            }
          );
          describe(
            "test clone transform component",
            () => {
              let _prepare = () => {
                let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                let (clonedGameObjectArr, clonedTransformArr) =
                  _getClonedTransformDataArr(gameObject1, 2, state);
                (state, gameObject1, transform1, clonedGameObjectArr, clonedTransformArr)
              };
              test(
                "test clone specific count of transforms",
                () => {
                  let (state, gameObject1, transform1, _, clonedTransformArr) = _prepare();
                  clonedTransformArr |> Js.Array.length |> expect == 2
                }
              );
              describe(
                "set cloned transform's localPosition by source transform's localPosition",
                () => {
                  test(
                    "test",
                    () => {
                      open Transform;
                      let (state, gameObject1, transform1) =
                        GameObjectTool.createGameObject(state^);
                      let pos1 = (1., 2., 3.);
                      let state = state |> setTransformLocalPosition(transform1, pos1);
                      let (_, clonedTransformArr) =
                        _getClonedTransformDataArr(gameObject1, 2, state);
                      clonedTransformArr
                      |> Js.Array.map((transform) => getTransformLocalPosition(transform, state))
                      |> expect == [|pos1, pos1|]
                    }
                  );
                  describe(
                    "fix bug",
                    () =>
                      test(
                        "source transform,cloned transforms shouldn't affect each other",
                        () => {
                          open Transform;
                          let (state, gameObject1, transform1) =
                            GameObjectTool.createGameObject(state^);
                          let pos1 = (1., 2., 3.);
                          let state = state |> setTransformLocalPosition(transform1, pos1);
                          let (_, clonedTransformArr) =
                            _getClonedTransformDataArr(gameObject1, 2, state);
                          let pos2 = (2., 4., 6.);
                          let state =
                            state |> setTransformLocalPosition(clonedTransformArr[1], pos2);
                          (
                            getTransformLocalPosition(transform1, state),
                            clonedTransformArr
                            |> Js.Array.map(
                                 (transform) => getTransformLocalPosition(transform, state)
                               )
                          )
                          |> expect == (pos1, [|pos1, pos2|])
                        }
                      )
                  )
                }
              );
              test(
                "add cloned transform's gameObject to map",
                () => {
                  let (state, _, _, clonedGameObjectArr, clonedTransformArr) = _prepare();
                  (
                    Transform.getTransformGameObject(clonedTransformArr[0], state),
                    Transform.getTransformGameObject(clonedTransformArr[1], state)
                  )
                  |> expect == (clonedGameObjectArr[0], clonedGameObjectArr[1])
                }
              )
            }
          );
          describe(
            "test clone cameraController component",
            () => {
              let _prepare = (state) => {
                open GameObjectType;
                let (state, gameObject1, _, cameraController1) =
                  CameraControllerTool.createCameraGameObject(state);
                let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                (
                  state,
                  gameObject1,
                  cameraController1,
                  clonedGameObjectArr,
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         getGameObjectCameraControllerComponent(clonedGameObject, state)
                     )
                )
              };
              test(
                "test clone specific count of cameraControllers",
                () => {
                  let (_, _, _, _, clonedCameraControllerArr) = _prepare(state^);
                  clonedCameraControllerArr |> Js.Array.length |> expect == 2
                }
              );
              test(
                "set cloned cameraController's near by source one's near",
                () => {
                  let (state, _, cameraController1, _, clonedCameraControllerArr) =
                    _prepare(state^);
                  let sourceNear =
                    PerspectiveCamera.getPerspectiveCameraNear(cameraController1, state);
                  clonedCameraControllerArr
                  |> Js.Array.map(
                       (cameraController) =>
                         PerspectiveCamera.getPerspectiveCameraNear(cameraController, state)
                     )
                  |> expect == [|sourceNear, sourceNear|]
                }
              );
              test(
                "set cloned cameraController's far by source one's far",
                () => {
                  let (state, _, cameraController1, _, clonedCameraControllerArr) =
                    _prepare(state^);
                  let sourceFar =
                    PerspectiveCamera.getPerspectiveCameraFar(cameraController1, state);
                  clonedCameraControllerArr
                  |> Js.Array.map(
                       (cameraController) =>
                         PerspectiveCamera.getPerspectiveCameraFar(cameraController, state)
                     )
                  |> expect == [|sourceFar, sourceFar|]
                }
              );
              test(
                "set cloned cameraController's fovy by source one's fovy",
                () => {
                  let (state, _, cameraController1, _, clonedCameraControllerArr) =
                    _prepare(state^);
                  let sourceFovy =
                    PerspectiveCamera.getPerspectiveCameraFovy(cameraController1, state);
                  clonedCameraControllerArr
                  |> Js.Array.map(
                       (cameraController) =>
                         PerspectiveCamera.getPerspectiveCameraFovy(cameraController, state)
                     )
                  |> expect == [|sourceFovy, sourceFovy|]
                }
              );
              test(
                "set cloned cameraController's aspect by source one's aspect",
                () => {
                  let (state, _, cameraController1, _, clonedCameraControllerArr) =
                    _prepare(state^);
                  let sourceAspect =
                    PerspectiveCamera.getPerspectiveCameraAspect(cameraController1, state);
                  clonedCameraControllerArr
                  |> Js.Array.map(
                       (cameraController) =>
                         PerspectiveCamera.getPerspectiveCameraAspect(cameraController, state)
                     )
                  |> expect == [|sourceAspect, sourceAspect|]
                }
              )
            }
          )
        }
      );
      describe(
        "clone children",
        () => {
          open Transform;
          describe(
            "test clone gameObject",
            () =>
              test(
                "get all cloned gameObjects(include cloned children)",
                () => {
                  open GameObjectType;
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
                  let state =
                    state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                  let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                  clonedGameObjectArr |> expect == [|[|2, 3|], [|4, 5|]|]
                }
              )
          );
          describe(
            "cloned children's components",
            () => {
              let _createMeshRendererGameObject = (state) => {
                let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state);
                (
                  state,
                  gameObject1,
                  meshRenderer1,
                  getGameObjectTransformComponent(gameObject1, state)
                )
              };
              test(
                "test clone meshRenderer component",
                () => {
                  open GameObjectType;
                  let (state, gameObject1, meshRenderer1, transform1) =
                    _createMeshRendererGameObject(state^);
                  let (state, gameObject2, meshRenderer2, transform2) =
                    _createMeshRendererGameObject(state);
                  let state =
                    state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                  let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         getGameObjectMeshRendererComponent(clonedGameObject, state)
                     )
                  |> Js.Array.length
                  |> expect == 4
                }
              );
              describe(
                "test clone geometry component",
                () =>
                  test(
                    "test clone specific count of geometrys",
                    () => {
                      open GameObjectType;
                      let (state, gameObject1, geometry1) =
                        BoxGeometryTool.createGameObject(state^);
                      let transform1 = getGameObjectTransformComponent(gameObject1, state);
                      let (state, gameObject2, geometry2) =
                        BoxGeometryTool.createGameObject(state);
                      let transform2 = getGameObjectTransformComponent(gameObject2, state);
                      let state =
                        state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                      let state = state |> GeometryTool.initGeometrys;
                      let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                      clonedGameObjectArr
                      |> CloneTool.getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             getGameObjectGeometryComponent(clonedGameObject, state)
                         )
                      |> Js.Array.length
                      |> expect == 4
                    }
                  )
              );
              describe(
                "test clone material component",
                () =>
                  test(
                    "test clone specific count of materials",
                    () => {
                      open GameObjectType;
                      let (state, gameObject1, material1) =
                        BasicMaterialTool.createGameObject(state^);
                      let state = state |> MaterialTool.setShaderIndex(material1, 0);
                      let transform1 = getGameObjectTransformComponent(gameObject1, state);
                      let (state, gameObject2, material2) =
                        BasicMaterialTool.createGameObject(state);
                      let state = state |> MaterialTool.setShaderIndex(material2, 0);
                      let transform2 = getGameObjectTransformComponent(gameObject2, state);
                      let state =
                        state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                      let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                      clonedGameObjectArr
                      |> CloneTool.getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             getGameObjectMaterialComponent(clonedGameObject, state)
                         )
                      |> Js.Array.length
                      |> expect == 4
                    }
                  )
              );
              describe(
                "test clone transform component",
                () => {
                  let _prepare = () => {
                    let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                    let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
                    let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
                    let (state, gameObject4, transform4) = GameObjectTool.createGameObject(state);
                    let state =
                      state
                      |> setTransformParent(Js.Nullable.return(transform1), transform2)
                      |> setTransformParent(Js.Nullable.return(transform1), transform3)
                      |> setTransformParent(Js.Nullable.return(transform3), transform4);
                    (
                      state,
                      gameObject1,
                      transform1,
                      gameObject2,
                      transform2,
                      gameObject3,
                      transform3,
                      gameObject4,
                      transform4
                    )
                  };
                  test(
                    "set parent",
                    () => {
                      let (
                        state,
                        gameObject1,
                        transform1,
                        gameObject2,
                        transform2,
                        gameObject3,
                        transform3,
                        gameObject4,
                        transform4
                      ) =
                        _prepare();
                      let (_, clonedTransformArr) =
                        _getClonedTransformDataArr(gameObject1, 2, state);
                      (
                        state |> getTransformParent(clonedTransformArr[0]),
                        state |> getTransformParent(clonedTransformArr[1]),
                        state |> getTransformParent(clonedTransformArr[2]),
                        state |> getTransformParent(clonedTransformArr[3]),
                        state |> getTransformParent(clonedTransformArr[4]),
                        state |> getTransformParent(clonedTransformArr[5]),
                        state |> getTransformParent(clonedTransformArr[6]),
                        state |> getTransformParent(clonedTransformArr[7])
                      )
                      |>
                      expect == (
                                  Js.Nullable.undefined,
                                  Js.Nullable.undefined,
                                  Js.Nullable.return(clonedTransformArr[0]),
                                  Js.Nullable.return(clonedTransformArr[1]),
                                  Js.Nullable.return(clonedTransformArr[0]),
                                  Js.Nullable.return(clonedTransformArr[1]),
                                  Js.Nullable.return(clonedTransformArr[4]),
                                  Js.Nullable.return(clonedTransformArr[5])
                                )
                    }
                  );
                  test(
                    "test set cloned transform's localPosition by corresponding source transform's localPosition",
                    () => {
                      open Transform;
                      open Vector3System;
                      open Vector3Type;
                      let (
                        state,
                        gameObject1,
                        transform1,
                        gameObject2,
                        transform2,
                        gameObject3,
                        transform3,
                        gameObject4,
                        transform4
                      ) =
                        _prepare();
                      let pos1 = (1., 2., 3.);
                      let pos2 = (2., 2., 3.);
                      let pos3 = (3., 20., 3.);
                      let pos4 = (4., 2., 3.);
                      let state = state |> setTransformLocalPosition(transform1, pos1);
                      let state = state |> setTransformLocalPosition(transform2, pos2);
                      let state = state |> setTransformLocalPosition(transform3, pos3);
                      let state = state |> setTransformLocalPosition(transform4, pos4);
                      let (clonedGameObjectArr, clonedTransformArr) =
                        _getClonedTransformDataArr(gameObject1, 1, state);
                      clonedTransformArr
                      |> Js.Array.map((transform) => getTransformPosition(transform, state))
                      |>
                      expect == [|
                                  pos1,
                                  add(Float, pos1, pos2),
                                  add(Float, pos1, pos3),
                                  add(Float, add(Float, pos1, pos3), pos4)
                                |]
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  );