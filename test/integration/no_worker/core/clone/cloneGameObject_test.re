open Wonder_jest;

open GameObject;

open GameObjectAPI;

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
      let _getClonedTransformMatrixDataArr = (gameObject, count, state) => {
        let (state, clonedGameObjectArr) = _cloneGameObject(gameObject, count, state);
        (
          clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
          clonedGameObjectArr
          |> CloneTool.getFlattenClonedGameObjectArr
          |> Js.Array.map(
               (clonedGameObject) => unsafeGetGameObjectTransformComponent(clonedGameObject, state)
             )
        )
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithJobConfig(~sandbox, ())
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
                "test clone specific count",
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
            "test clone light component",
            () => {
              describe(
                "test clone ambient light component",
                () => {
                  let _clone = (gameObject, state) => {
                    let (state, clonedGameObjectArr) = _cloneGameObject(gameObject, 2, state);
                    (
                      state,
                      clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
                      clonedGameObjectArr
                      |> CloneTool.getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             getGameObjectAmbientLightComponent(clonedGameObject, state)
                         )
                    )
                  };
                  test(
                    "test clone specific count",
                    () => {
                      open GameObjectType;
                      let (state, gameObject1, light1) = AmbientLightTool.createGameObject(state^);
                      let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                      clonedComponentArr |> Js.Array.length |> expect == 2
                    }
                  );
                  describe(
                    "set cloned data",
                    () =>
                      test(
                        "set color",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let color1 = [|1., 0., 1.|];
                          let state = state |> AmbientLight.setAmbientLightColor(light1, color1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            AmbientLight.getAmbientLightColor(clonedComponentArr[0], state),
                            AmbientLight.getAmbientLightColor(clonedComponentArr[1], state)
                          )
                          |> expect == (color1, color1)
                        }
                      )
                  )
                }
              );
              describe(
                "test clone direction light component",
                () => {
                  let _clone = (gameObject, state) => {
                    let (state, clonedGameObjectArr) = _cloneGameObject(gameObject, 2, state);
                    (
                      state,
                      clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
                      clonedGameObjectArr
                      |> CloneTool.getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             getGameObjectDirectionLightComponent(clonedGameObject, state)
                         )
                    )
                  };
                  test(
                    "test clone specific count",
                    () => {
                      open GameObjectType;
                      let (state, gameObject1, light1) =
                        DirectionLightTool.createGameObject(state^);
                      let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                      clonedComponentArr |> Js.Array.length |> expect == 2
                    }
                  );
                  describe(
                    "set cloned data",
                    () => {
                      test(
                        "set color",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            DirectionLightTool.createGameObject(state^);
                          let color1 = [|1., 0., 1.|];
                          let state =
                            state |> DirectionLight.setDirectionLightColor(light1, color1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            DirectionLight.getDirectionLightColor(clonedComponentArr[0], state),
                            DirectionLight.getDirectionLightColor(clonedComponentArr[1], state)
                          )
                          |> expect == (color1, color1)
                        }
                      );
                      test(
                        "set intensity",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            DirectionLightTool.createGameObject(state^);
                          let intensity1 = 2.;
                          let state =
                            state |> DirectionLight.setDirectionLightIntensity(light1, intensity1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            DirectionLight.getDirectionLightIntensity(clonedComponentArr[0], state),
                            DirectionLight.getDirectionLightIntensity(clonedComponentArr[1], state)
                          )
                          |> expect == (intensity1, intensity1)
                        }
                      )
                    }
                  )
                }
              );
              describe(
                "test clone point light component",
                () => {
                  let _clone = (gameObject, state) => {
                    let (state, clonedGameObjectArr) = _cloneGameObject(gameObject, 2, state);
                    (
                      state,
                      clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
                      clonedGameObjectArr
                      |> CloneTool.getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             getGameObjectPointLightComponent(clonedGameObject, state)
                         )
                    )
                  };
                  test(
                    "test clone specific count",
                    () => {
                      open GameObjectType;
                      let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                      let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                      clonedComponentArr |> Js.Array.length |> expect == 2
                    }
                  );
                  describe(
                    "set cloned data",
                    () => {
                      test(
                        "set color",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            PointLightTool.createGameObject(state^);
                          let color1 = [|1., 0., 1.|];
                          let state = state |> PointLight.setPointLightColor(light1, color1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            PointLight.getPointLightColor(clonedComponentArr[0], state),
                            PointLight.getPointLightColor(clonedComponentArr[1], state)
                          )
                          |> expect == (color1, color1)
                        }
                      );
                      test(
                        "set intensity",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            PointLightTool.createGameObject(state^);
                          let intensity1 = 2.;
                          let state =
                            state |> PointLight.setPointLightIntensity(light1, intensity1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            PointLight.getPointLightIntensity(clonedComponentArr[0], state),
                            PointLight.getPointLightIntensity(clonedComponentArr[1], state)
                          )
                          |> expect == (intensity1, intensity1)
                        }
                      );
                      test(
                        "set constant",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            PointLightTool.createGameObject(state^);
                          let constant1 = 2.;
                          let state = state |> PointLight.setPointLightConstant(light1, constant1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            PointLight.getPointLightConstant(clonedComponentArr[0], state),
                            PointLight.getPointLightConstant(clonedComponentArr[1], state)
                          )
                          |> expect == (constant1, constant1)
                        }
                      );
                      test(
                        "set linear",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            PointLightTool.createGameObject(state^);
                          let linear1 = 2.;
                          let state = state |> PointLight.setPointLightLinear(light1, linear1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            PointLight.getPointLightLinear(clonedComponentArr[0], state),
                            PointLight.getPointLightLinear(clonedComponentArr[1], state)
                          )
                          |> expect == (linear1, linear1)
                        }
                      );
                      test(
                        "set quadratic",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            PointLightTool.createGameObject(state^);
                          let quadratic1 = 2.;
                          let state =
                            state |> PointLight.setPointLightQuadratic(light1, quadratic1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            PointLight.getPointLightQuadratic(clonedComponentArr[0], state),
                            PointLight.getPointLightQuadratic(clonedComponentArr[1], state)
                          )
                          |> expect == (quadratic1, quadratic1)
                        }
                      );
                      test(
                        "set range",
                        () => {
                          open GameObjectType;
                          let (state, gameObject1, light1) =
                            PointLightTool.createGameObject(state^);
                          let range1 = 2.;
                          let state = state |> PointLight.setPointLightRange(light1, range1);
                          let (state, _, clonedComponentArr) = _clone(gameObject1, state);
                          (
                            PointLight.getPointLightRange(clonedComponentArr[0], state),
                            PointLight.getPointLightRange(clonedComponentArr[1], state)
                          )
                          |> expect == (range1, range1)
                        }
                      )
                    }
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
              describe(
                "test clone basic material component",
                () => {
                  let _prepare = () => {
                    let (state, gameObject1, material1) =
                      BasicMaterialTool.createGameObject(state^);
                    let state = state |> BasicMaterialTool.setShaderIndex(material1, 1);
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
                             unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state)
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
                          let state = AllMaterialTool.prepareForInit(state);
                          let state =
                            state
                            |> GameObject.initGameObject(clonedGameObjectArr[0])
                            |> GameObject.initGameObject(clonedGameObjectArr[1]);
                          (
                            BasicMaterialTool.unsafeGetShaderIndex(clonedMaterialArr[0], state),
                            BasicMaterialTool.unsafeGetShaderIndex(clonedMaterialArr[1], state)
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
                        BasicMaterialAPI.unsafeGetBasicMaterialGameObject(clonedMaterialArr[0], state),
                        BasicMaterialAPI.unsafeGetBasicMaterialGameObject(clonedMaterialArr[1], state)
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
                        /* let state = state |> BasicMaterialTool.setShaderIndex(material1, 0); */
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
                                 unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state)
                             )
                        )
                      };
                      test(
                        "set color",
                        () => {
                          let (state, gameObject, material) = _prepare();
                          let color = [|1., 0.2, 0.3|];
                          let state =
                            state |> BasicMaterialAPI.setBasicMaterialColor(material, color);
                          let (state, _, clonedMaterialArr) = _clone(gameObject, state);
                          let state =
                            state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                          let state = AllMaterialTool.prepareForInit(state);
                          (
                            BasicMaterialAPI.unsafeGetBasicMaterialColor(clonedMaterialArr[0], state),
                            BasicMaterialAPI.unsafeGetBasicMaterialColor(clonedMaterialArr[1], state)
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
                          let (state, clonedGameObjectArr) =
                            _cloneGameObject(gameObject1, 1, state);
                          let clonedMaterialArr =
                            clonedGameObjectArr
                            |> CloneTool.getFlattenClonedGameObjectArr
                            |> Js.Array.map(
                                 (clonedGameObject) =>
                                   unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state)
                               );
                          BasicMaterialTool.hasShaderIndex(clonedMaterialArr[0], state)
                          |> expect == false
                        }
                      )
                  )
                }
              );
              describe(
                "test clone light material component",
                () =>
                  describe(
                    "set cloned material data",
                    () => {
                      let _prepare = () => {
                        let (state, gameObject1, material1) =
                          LightMaterialTool.createGameObject(state^);
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
                                 unsafeGetGameObjectLightMaterialComponent(clonedGameObject, state)
                             )
                        )
                      };
                      test(
                        "set diffuse color",
                        () => {
                          let (state, gameObject, material) = _prepare();
                          let color = [|1., 0.2, 0.3|];
                          let state =
                            state |> LightMaterialAPI.setLightMaterialDiffuseColor(material, color);
                          let (state, _, clonedMaterialArr) = _clone(gameObject, state);
                          let state =
                            state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                          let state = AllMaterialTool.prepareForInit(state);
                          (
                            LightMaterialAPI.unsafeGetLightMaterialDiffuseColor(clonedMaterialArr[0], state),
                            LightMaterialAPI.unsafeGetLightMaterialDiffuseColor(clonedMaterialArr[1], state)
                          )
                          |> expect == (color, color)
                        }
                      );
                      test(
                        "set specular color",
                        () => {
                          let (state, gameObject, material) = _prepare();
                          let color = [|1., 0.2, 0.3|];
                          let state =
                            state |> LightMaterialAPI.setLightMaterialSpecularColor(material, color);
                          let (state, _, clonedMaterialArr) = _clone(gameObject, state);
                          let state =
                            state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                          let state = AllMaterialTool.prepareForInit(state);
                          (
                            LightMaterialAPI.unsafeGetLightMaterialSpecularColor(
                              clonedMaterialArr[0],
                              state
                            ),
                            LightMaterialAPI.unsafeGetLightMaterialSpecularColor(
                              clonedMaterialArr[1],
                              state
                            )
                          )
                          |> expect == (color, color)
                        }
                      )
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
                  _getClonedTransformMatrixDataArr(gameObject1, 2, state);
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
                      open TransformAPI;
                      let (state, gameObject1, transform1) =
                        GameObjectTool.createGameObject(state^);
                      let pos1 = (1., 2., 3.);
                      let state = state |> setTransformLocalPosition(transform1, pos1);
                      let (_, clonedTransformArr) =
                        _getClonedTransformMatrixDataArr(gameObject1, 2, state);
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
                          open TransformAPI;
                          let (state, gameObject1, transform1) =
                            GameObjectTool.createGameObject(state^);
                          let pos1 = (1., 2., 3.);
                          let state = state |> setTransformLocalPosition(transform1, pos1);
                          let (_, clonedTransformArr) =
                            _getClonedTransformMatrixDataArr(gameObject1, 2, state);
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
                    TransformAPI.unsafeGetTransformGameObject(clonedTransformArr[0], state),
                    TransformAPI.unsafeGetTransformGameObject(clonedTransformArr[1], state)
                  )
                  |> expect == (clonedGameObjectArr[0], clonedGameObjectArr[1])
                }
              )
            }
          );
          describe(
            "test clone basicCameraView component",
            () => {
              let _prepare = (state) => {
                open GameObjectType;
                let (state, _) = BasicCameraViewAPI.createBasicCameraView(state);
                let (state, gameObject1, _, (basicCameraView1, _)) =
                  CameraTool.createCameraGameObject(state);
                let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                (
                  state,
                  gameObject1,
                  basicCameraView1,
                  clonedGameObjectArr,
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         unsafeGetGameObjectBasicCameraViewComponent(clonedGameObject, state)
                     )
                )
              };
              test(
                "test clone specific count of basicCameraViews",
                () => {
                  let (_, _, _, _, clonedBasicCameraViewArr) = _prepare(state^);
                  clonedBasicCameraViewArr |> Js.Array.length |> expect == 2
                }
              )
            }
          );
          describe(
            "test clone perspectiveCameraProjection component",
            () => {
              let _prepare = (state) => {
                open GameObjectType;
                let (state, _) =
                  PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection(state);
                let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
                  CameraTool.createCameraGameObject(state);
                let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                (
                  state,
                  gameObject1,
                  perspectiveCameraProjection1,
                  clonedGameObjectArr,
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr
                  |> Js.Array.map(
                       (clonedGameObject) =>
                         unsafeGetGameObjectPerspectiveCameraProjectionComponent(
                           clonedGameObject,
                           state
                         )
                     )
                )
              };
              test(
                "test clone specific count of perspectiveCameraProjections",
                () => {
                  let (_, _, _, _, clonedPerspectiveCameraProjectionArr) = _prepare(state^);
                  clonedPerspectiveCameraProjectionArr |> Js.Array.length |> expect == 2
                }
              );
              test(
                "set cloned perspectiveCameraProjection's near by source one's near",
                () => {
                  let (
                    state,
                    _,
                    perspectiveCameraProjection1,
                    _,
                    clonedPerspectiveCameraProjectionArr
                  ) =
                    _prepare(state^);
                  let sourceNear =
                    PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
                      perspectiveCameraProjection1,
                      state
                    );
                  clonedPerspectiveCameraProjectionArr
                  |> Js.Array.map(
                       (perspectiveCameraProjection) =>
                         PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
                           perspectiveCameraProjection,
                           state
                         )
                     )
                  |> expect == [|sourceNear, sourceNear|]
                }
              );
              test(
                "set cloned perspectiveCameraProjection's far by source one's far",
                () => {
                  let (
                    state,
                    _,
                    perspectiveCameraProjection1,
                    _,
                    clonedPerspectiveCameraProjectionArr
                  ) =
                    _prepare(state^);
                  let sourceFar =
                    PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
                      perspectiveCameraProjection1,
                      state
                    );
                  clonedPerspectiveCameraProjectionArr
                  |> Js.Array.map(
                       (perspectiveCameraProjection) =>
                         PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
                           perspectiveCameraProjection,
                           state
                         )
                     )
                  |> expect == [|sourceFar, sourceFar|]
                }
              );
              test(
                "set cloned perspectiveCameraProjection's fovy by source one's fovy",
                () => {
                  let (
                    state,
                    _,
                    perspectiveCameraProjection1,
                    _,
                    clonedPerspectiveCameraProjectionArr
                  ) =
                    _prepare(state^);
                  let sourceFovy =
                    PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
                      perspectiveCameraProjection1,
                      state
                    );
                  clonedPerspectiveCameraProjectionArr
                  |> Js.Array.map(
                       (perspectiveCameraProjection) =>
                         PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
                           perspectiveCameraProjection,
                           state
                         )
                     )
                  |> expect == [|sourceFovy, sourceFovy|]
                }
              );
              test(
                "set cloned perspectiveCameraProjection's aspect by source one's aspect",
                () => {
                  let (
                    state,
                    _,
                    perspectiveCameraProjection1,
                    _,
                    clonedPerspectiveCameraProjectionArr
                  ) =
                    _prepare(state^);
                  let sourceAspect =
                    PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect(
                      perspectiveCameraProjection1,
                      state
                    );
                  clonedPerspectiveCameraProjectionArr
                  |> Js.Array.map(
                       (perspectiveCameraProjection) =>
                         PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect(
                           perspectiveCameraProjection,
                           state
                         )
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
          open TransformAPI;
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
              test(
                "test clone meshRenderer component",
                () => {
                  let _createMeshRendererGameObject = (state) => {
                    let (state, gameObject1, meshRenderer1) =
                      MeshRendererTool.createGameObject(state);
                    (
                      state,
                      gameObject1,
                      meshRenderer1,
                      unsafeGetGameObjectTransformComponent(gameObject1, state)
                    )
                  };
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
                      let transform1 = unsafeGetGameObjectTransformComponent(gameObject1, state);
                      let (state, gameObject2, geometry2) =
                        BoxGeometryTool.createGameObject(state);
                      let transform2 = unsafeGetGameObjectTransformComponent(gameObject2, state);
                      let state =
                        state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                      let state = state |> GeometryTool.initGeometrys;
                      let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                      clonedGameObjectArr
                      |> CloneTool.getFlattenClonedGameObjectArr
                      |> Js.Array.map(
                           (clonedGameObject) =>
                             unsafeGetGameObjectBoxGeometryComponent(clonedGameObject, state)
                         )
                      |> Js.Array.length
                      |> expect == 4
                    }
                  )
              );
              /* describe(
                   "test clone material component",
                   () =>
                     test(
                       "test clone specific count of materials",
                       () => {
                         open GameObjectType;
                         let (state, gameObject1, material1) =
                           BasicMaterialTool.createGameObject(state^);
                         let state = state |> BasicMaterialTool.setShaderIndex(material1, 0);
                         let transform1 = unsafeGetGameObjectTransformComponent(gameObject1, state);
                         let (state, gameObject2, material2) =
                           BasicMaterialTool.createGameObject(state);
                         let state = state |> BasicMaterialTool.setShaderIndex(material2, 0);
                         let transform2 = unsafeGetGameObjectTransformComponent(gameObject2, state);
                         let state =
                           state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                         let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                         clonedGameObjectArr
                         |> CloneTool.getFlattenClonedGameObjectArr
                         |> Js.Array.map(
                              (clonedGameObject) =>
                                unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state)
                            )
                         |> Js.Array.length
                         |> expect == 4
                       }
                     )
                 ); */
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
                        _getClonedTransformMatrixDataArr(gameObject1, 2, state);
                      (
                        state |> unsafeGetTransformParent(clonedTransformArr[0]),
                        state |> unsafeGetTransformParent(clonedTransformArr[1]),
                        state |> unsafeGetTransformParent(clonedTransformArr[2]),
                        state |> unsafeGetTransformParent(clonedTransformArr[3]),
                        state |> unsafeGetTransformParent(clonedTransformArr[4]),
                        state |> unsafeGetTransformParent(clonedTransformArr[5]),
                        state |> unsafeGetTransformParent(clonedTransformArr[6]),
                        state |> unsafeGetTransformParent(clonedTransformArr[7])
                      )
                      |>
                      expect == (
                                  Js.Undefined.empty,
                                  Js.Undefined.empty,
                                  Js.Undefined.return(clonedTransformArr[0]),
                                  Js.Undefined.return(clonedTransformArr[1]),
                                  Js.Undefined.return(clonedTransformArr[0]),
                                  Js.Undefined.return(clonedTransformArr[1]),
                                  Js.Undefined.return(clonedTransformArr[4]),
                                  Js.Undefined.return(clonedTransformArr[5])
                                )
                    }
                  );
                  test(
                    "test set cloned transform's localPosition by corresponding source transform's localPosition",
                    () => {
                      open TransformAPI;
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
                        _getClonedTransformMatrixDataArr(gameObject1, 1, state);
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