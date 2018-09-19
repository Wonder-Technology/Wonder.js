open Wonder_jest;

open GameObjectAPI;

let _ =
  describe("clone gameObject", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _cloneGameObject = (gameObject, count, state) =>
      CloneTool.cloneGameObject(gameObject, count, false, state);
    let _getClonedTransformMatrixDataArr = (gameObject, count, state) => {
      let (state, clonedGameObjectArr) =
        _cloneGameObject(gameObject, count, state);
      (
        clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
        clonedGameObjectArr
        |> CloneTool.getFlattenClonedGameObjectArr
        |> Js.Array.map(clonedGameObject =>
             unsafeGetGameObjectTransformComponent(clonedGameObject, state)
           ),
      );
    };
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("clone gameObject", () => {
      test("cloned gameObjects are new gameObjects", () => {
        let (state, gameObject1) = createGameObject(state^);

        let (state, clonedGameObjectArr) =
          _cloneGameObject(gameObject1, 2, state);

        clonedGameObjectArr |> expect == [|[|2, 3|]|];
      });
      test("test name", () => {
        let (state, gameObject1) = createGameObject(state^);
        let name = "name1";
        let state =
          state |> GameObjectAPI.setGameObjectName(gameObject1, name);

        let (state, clonedGameObjectArr) =
          _cloneGameObject(gameObject1, 2, state);

        let clonedGameObjectArr =
          clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr;
        (
          GameObjectAPI.unsafeGetGameObjectName(clonedGameObjectArr[0], state),
          GameObjectAPI.unsafeGetGameObjectName(
            clonedGameObjectArr[1],
            state,
          ),
        )
        |> expect == (name, name);
      });
    });

    describe("clone components", () => {
      describe("contract check", () => {
        test("shouldn't clone sourceInstance gameObject", () => {
          let (state, gameObject, sourceInstance) =
            SourceInstanceTool.createSourceInstanceGameObject(state^);
          expect(() =>
            _cloneGameObject(gameObject, 2, state) |> ignore
          )
          |> toThrowMessage(
               "expect not clone sourceInstance gameObject, but actual do",
             );
        });
        test("shouldn't clone objectInstance gameObject", () => {
          let (
            state,
            gameObject,
            sourceInstance,
            objectInstanceGameObject,
            objectInstance,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObject(state^);
          expect(() =>
            _cloneGameObject(objectInstanceGameObject, 2, state) |> ignore
          )
          |> toThrowMessage(
               "expect not clone objectInstance gameObject, but actual do",
             );
        });
      });

      describe("test clone meshRenderer component", () => {
        test("test clone specific count", () => {
          open StateDataMainType;
          let (state, gameObject1, meshRenderer1) =
            MeshRendererTool.createBasicMaterialGameObject(state^);
          let (state, clonedGameObjectArr) =
            _cloneGameObject(gameObject1, 2, state);
          clonedGameObjectArr
          |> CloneTool.getFlattenClonedGameObjectArr
          |> Js.Array.map(clonedGameObject =>
               unsafeGetGameObjectMeshRendererComponent(
                 clonedGameObject,
                 state,
               )
             )
          |> Js.Array.length
          |> expect == 2;
        });
        test("add cloned gameObject to renderGameObjectArray", () => {
          open StateDataMainType;
          let (state, gameObject1, meshRenderer1) =
            MeshRendererTool.createBasicMaterialGameObject(state^);
          let (state, clonedGameObjectArr) =
            _cloneGameObject(gameObject1, 2, state);
          state
          |> MeshRendererTool.getBasicMaterialRenderArray
          |>
          expect == (
                      [|gameObject1|]
                      |> Js.Array.concat(
                           clonedGameObjectArr
                           |> CloneTool.getFlattenClonedGameObjectArr,
                         )
                    );
        });

        describe("cloned one' data === source one's data", () => {
          let _cloneGameObject = (gameObject, count, state) =>
            CloneTool.cloneGameObject(gameObject, count, false, state);

          let _prepare = () => {
            let (state, gameObject1, meshRenderer1) =
              MeshRendererTool.createLightMaterialGameObject(state^);
            (state, gameObject1, meshRenderer1);
          };
          let _clone = (gameObject, state) => {
            let (state, clonedGameObjectArr) =
              _cloneGameObject(gameObject, 2, state);
            (
              state,
              clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
              clonedGameObjectArr
              |> CloneTool.getFlattenClonedGameObjectArr
              |> Js.Array.map(clonedGameObject =>
                   unsafeGetGameObjectMeshRendererComponent(
                     clonedGameObject,
                     state,
                   )
                 ),
            );
          };

          test("test drawMode", () => {
            let (state, gameObject, meshRenderer) = _prepare();
            let drawMode = MeshRendererTool.getPoints();
            let state =
              state
              |> MeshRendererAPI.setMeshRendererDrawMode(
                   meshRenderer,
                   drawMode,
                 );
            let (state, _, clonedMeshRendererArr) =
              _clone(gameObject, state);
            (
              MeshRendererAPI.getMeshRendererDrawMode(meshRenderer, state),
              MeshRendererAPI.getMeshRendererDrawMode(
                clonedMeshRendererArr[0],
                state,
              ),
              MeshRendererAPI.getMeshRendererDrawMode(
                clonedMeshRendererArr[1],
                state,
              ),
            )
            |> expect == (drawMode, drawMode, drawMode);
          });
          test("test isRender", () => {
            let (state, gameObject, meshRenderer) = _prepare();
            let isRender = ! MeshRendererTool.getDefaultIsRender();
            let state =
              state
              |> MeshRendererAPI.setMeshRendererIsRender(
                   meshRenderer,
                   isRender,
                 );

            let (state, clonedGameObjectArr, clonedMeshRendererArr) =
              _clone(gameObject, state);

            (
              MeshRendererAPI.getMeshRendererIsRender(meshRenderer, state),
              MeshRendererAPI.getMeshRendererIsRender(
                clonedMeshRendererArr[0],
                state,
              ),
              MeshRendererAPI.getMeshRendererIsRender(
                clonedMeshRendererArr[1],
                state,
              ),
            )
            |> expect == (isRender, isRender, isRender);
          });
        });

        describe("fix bug", () =>
          test("test clone hierachy gameObjects", () => {
            let (state, gameObject1, meshRenderer1) =
              MeshRendererTool.createBasicMaterialGameObject(state^);
            let (state, gameObject2, meshRenderer2) =
              MeshRendererTool.createBasicMaterialGameObject(state);
            let (state, gameObject3, meshRenderer3) =
              MeshRendererTool.createBasicMaterialGameObject(state);
            let (state, gameObject4, meshRenderer4) =
              MeshRendererTool.createBasicMaterialGameObject(state);

            let state =
              GameObjectTool.addChild(gameObject1, gameObject2, state)
              |> GameObjectTool.addChild(gameObject2, gameObject3)
              |> GameObjectTool.addChild(gameObject1, gameObject4);

            let (state, clonedGameObjectArr) =
              CloneTool.cloneGameObject(gameObject1, 1, true, state);

            (
              clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
              clonedGameObjectArr
              |> CloneTool.getFlattenClonedGameObjectArr
              |> Js.Array.map(clonedGameObject =>
                   unsafeGetGameObjectMeshRendererComponent(
                     clonedGameObject,
                     state,
                   )
                 ),
            )
            |> expect == ([|5, 6, 7, 8|], [|4, 5, 6, 7|]);
          })
        );
      });

      describe("test clone light component", () => {
        describe("test clone direction light component", () => {
          let _clone = (gameObject, state) => {
            let (state, clonedGameObjectArr) =
              _cloneGameObject(gameObject, 2, state);
            (
              state,
              clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
              clonedGameObjectArr
              |> CloneTool.getFlattenClonedGameObjectArr
              |> Js.Array.map(clonedGameObject =>
                   unsafeGetGameObjectDirectionLightComponent(
                     clonedGameObject,
                     state,
                   )
                 ),
            );
          };
          test("test clone specific count", () => {
            open StateDataMainType;
            let (state, gameObject1, light1) =
              DirectionLightTool.createGameObject(state^);
            let (state, _, clonedComponentArr) = _clone(gameObject1, state);
            clonedComponentArr |> Js.Array.length |> expect == 2;
          });
          describe("set cloned record", () => {
            test("set color", () => {
              open StateDataMainType;
              let (state, gameObject1, light1) =
                DirectionLightTool.createGameObject(state^);
              let color1 = [|1., 0., 1.|];
              let state =
                state
                |> DirectionLightAPI.setDirectionLightColor(light1, color1);
              let (state, _, clonedComponentArr) =
                _clone(gameObject1, state);
              (
                DirectionLightAPI.getDirectionLightColor(
                  clonedComponentArr[0],
                  state,
                ),
                DirectionLightAPI.getDirectionLightColor(
                  clonedComponentArr[1],
                  state,
                ),
              )
              |> expect == (color1, color1);
            });
            test("set intensity", () => {
              open StateDataMainType;
              let (state, gameObject1, light1) =
                DirectionLightTool.createGameObject(state^);
              let intensity1 = 2.;
              let state =
                state
                |> DirectionLightAPI.setDirectionLightIntensity(
                     light1,
                     intensity1,
                   );
              let (state, _, clonedComponentArr) =
                _clone(gameObject1, state);
              (
                DirectionLightAPI.getDirectionLightIntensity(
                  clonedComponentArr[0],
                  state,
                ),
                DirectionLightAPI.getDirectionLightIntensity(
                  clonedComponentArr[1],
                  state,
                ),
              )
              |> expect == (intensity1, intensity1);
            });
          });
        });
        describe("test clone point light component", () => {
          let _clone = (gameObject, state) => {
            let (state, clonedGameObjectArr) =
              _cloneGameObject(gameObject, 2, state);
            (
              state,
              clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
              clonedGameObjectArr
              |> CloneTool.getFlattenClonedGameObjectArr
              |> Js.Array.map(clonedGameObject =>
                   unsafeGetGameObjectPointLightComponent(
                     clonedGameObject,
                     state,
                   )
                 ),
            );
          };
          test("test clone specific count", () => {
            open StateDataMainType;
            let (state, gameObject1, light1) =
              PointLightTool.createGameObject(state^);
            let (state, _, clonedComponentArr) = _clone(gameObject1, state);
            clonedComponentArr |> Js.Array.length |> expect == 2;
          });
          describe("set cloned record", () => {
            test("set color", () => {
              open StateDataMainType;
              let (state, gameObject1, light1) =
                PointLightTool.createGameObject(state^);
              let color1 = [|1., 0., 1.|];
              let state =
                state |> PointLightAPI.setPointLightColor(light1, color1);
              let (state, _, clonedComponentArr) =
                _clone(gameObject1, state);
              (
                PointLightAPI.getPointLightColor(clonedComponentArr[0], state),
                PointLightAPI.getPointLightColor(
                  clonedComponentArr[1],
                  state,
                ),
              )
              |> expect == (color1, color1);
            });
            test("set intensity", () => {
              open StateDataMainType;
              let (state, gameObject1, light1) =
                PointLightTool.createGameObject(state^);
              let intensity1 = 2.;
              let state =
                state
                |> PointLightAPI.setPointLightIntensity(light1, intensity1);
              let (state, _, clonedComponentArr) =
                _clone(gameObject1, state);
              (
                PointLightAPI.getPointLightIntensity(
                  clonedComponentArr[0],
                  state,
                ),
                PointLightAPI.getPointLightIntensity(
                  clonedComponentArr[1],
                  state,
                ),
              )
              |> expect == (intensity1, intensity1);
            });
            test("set constant", () => {
              open StateDataMainType;
              let (state, gameObject1, light1) =
                PointLightTool.createGameObject(state^);
              let constant1 = 2.;
              let state =
                state
                |> PointLightAPI.setPointLightConstant(light1, constant1);
              let (state, _, clonedComponentArr) =
                _clone(gameObject1, state);
              (
                PointLightAPI.getPointLightConstant(
                  clonedComponentArr[0],
                  state,
                ),
                PointLightAPI.getPointLightConstant(
                  clonedComponentArr[1],
                  state,
                ),
              )
              |> expect == (constant1, constant1);
            });
            test("set linear", () => {
              open StateDataMainType;
              let (state, gameObject1, light1) =
                PointLightTool.createGameObject(state^);
              let linear1 = 2.;
              let state =
                state |> PointLightAPI.setPointLightLinear(light1, linear1);
              let (state, _, clonedComponentArr) =
                _clone(gameObject1, state);
              (
                PointLightAPI.getPointLightLinear(
                  clonedComponentArr[0],
                  state,
                ),
                PointLightAPI.getPointLightLinear(
                  clonedComponentArr[1],
                  state,
                ),
              )
              |> expect == (linear1, linear1);
            });
            test("set quadratic", () => {
              open StateDataMainType;
              let (state, gameObject1, light1) =
                PointLightTool.createGameObject(state^);
              let quadratic1 = 2.;
              let state =
                state
                |> PointLightAPI.setPointLightQuadratic(light1, quadratic1);
              let (state, _, clonedComponentArr) =
                _clone(gameObject1, state);
              (
                PointLightAPI.getPointLightQuadratic(
                  clonedComponentArr[0],
                  state,
                ),
                PointLightAPI.getPointLightQuadratic(
                  clonedComponentArr[1],
                  state,
                ),
              )
              |> expect == (quadratic1, quadratic1);
            });
            test("set range", () => {
              open StateDataMainType;
              let (state, gameObject1, light1) =
                PointLightTool.createGameObject(state^);
              let range1 = 2.;
              let state =
                state |> PointLightAPI.setPointLightRange(light1, range1);
              let (state, _, clonedComponentArr) =
                _clone(gameObject1, state);
              (
                PointLightAPI.getPointLightRange(clonedComponentArr[0], state),
                PointLightAPI.getPointLightRange(
                  clonedComponentArr[1],
                  state,
                ),
              )
              |> expect == (range1, range1);
            });
          });
        });
      });
      describe("test clone geometry component", () => {
        let _createAndInitGameObject = state => {
          let (state, gameObject1, geometry1) =
            GeometryTool.createGameObject(state);
          let state = state |> initGameObject(gameObject1);
          (state, gameObject1, geometry1);
        };
        let _prepare = state => {
          open StateDataMainType;
          let (state, gameObject1, geometry1) =
            _createAndInitGameObject(state);
          CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 2);
        };
        test("test clone specific count of geometrys", () => {
          let (_, _, _, _, clonedGeometryArr) = _prepare(state^);
          clonedGeometryArr |> Js.Array.length |> expect == 2;
        });
        test("cloned one == source one", () => {
          let (_, _, geometry, _, clonedGeometryArr) = _prepare(state^);
          clonedGeometryArr |> expect == [|geometry, geometry|];
        });
        test(
          "cloned one's gameObjects should be gameObjects who add the geometry",
          () => {
          let (state, gameObject, _, clonedGameObjectArr, clonedGeometryArr) =
            _prepare(state^);

          let result =
            [|gameObject|] |> Js.Array.concat(clonedGameObjectArr);
          (
            GeometryAPI.unsafeGetGeometryGameObjects(
              clonedGeometryArr[0],
              state,
            ),
            GeometryAPI.unsafeGetGeometryGameObjects(
              clonedGeometryArr[1],
              state,
            ),
          )
          |> expect == (result, result);
        });
        test("test name", () => {
          let (state, gameObject1, geometry1) =
            GeometryTool.createGameObject(state^);

          let name = "name1";
          let state = state |> GeometryAPI.setGeometryName(geometry1, name);
          let (state, gameObject, _, clonedGameObjectArr, clonedGeometryArr) =
            CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 2);

          (
            GeometryAPI.unsafeGetGeometryName(clonedGeometryArr[0], state),
            GeometryAPI.unsafeGetGeometryName(clonedGeometryArr[1], state),
          )
          |> expect == (name, name);
        });
      });

      describe("test clone material component", () => {
        describe("test clone basic material component", () => {
          let _cloneGameObject = (gameObject, isShareMaterial, count, state) =>
            CloneTool.cloneGameObject(
              gameObject,
              count,
              isShareMaterial,
              state,
            );
          let _prepare = isShareMaterial => {
            let (state, gameObject1, material1) =
              BasicMaterialTool.createGameObject(state^);
            let state =
              state |> BasicMaterialTool.setShaderIndex(material1, 1);
            let (state, clonedGameObjectArr) =
              _cloneGameObject(gameObject1, isShareMaterial, 2, state);
            (
              state,
              gameObject1,
              material1,
              clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
              clonedGameObjectArr
              |> CloneTool.getFlattenClonedGameObjectArr
              |> Js.Array.map(clonedGameObject =>
                   unsafeGetGameObjectBasicMaterialComponent(
                     clonedGameObject,
                     state,
                   )
                 ),
            );
          };
          describe("test clone shared material", () => {
            test("cloned one== source one", () => {
              let (state, _, material, _, clonedMaterialArr) =
                _prepare(true);
              clonedMaterialArr |> expect == [|material, material|];
            });
            test(
              "cloned one's gameObject ===  the last gameObject which add the material",
              () => {
              let (
                state,
                gameObject,
                _,
                clonedGameObjectArr,
                clonedMaterialArr,
              ) =
                _prepare(true);
              (
                BasicMaterialAPI.unsafeGetBasicMaterialGameObject(
                  clonedMaterialArr[0],
                  state,
                ),
                BasicMaterialAPI.unsafeGetBasicMaterialGameObject(
                  clonedMaterialArr[1],
                  state,
                ),
              )
              |> expect == (clonedGameObjectArr[1], clonedGameObjectArr[1]);
            });
            test("increase group count", () => {
              let (state, _, material, _, _) = _prepare(true);
              BasicMaterialTool.getGroupCount(material, state) |> expect == 2;
            });
          });
          describe("test clone not shared material", () => {
            test("cloned ones are new created ones", () => {
              let (state, _, material, _, clonedMaterialArr) =
                _prepare(false);
              clonedMaterialArr |> expect == [|1, 2|];
            });
            test("add cloned one's gameObject to map", () => {
              let (state, _, _, clonedGameObjectArr, clonedMaterialArr) =
                _prepare(false);
              (
                BasicMaterialAPI.unsafeGetBasicMaterialGameObject(
                  clonedMaterialArr[0],
                  state,
                ),
                BasicMaterialAPI.unsafeGetBasicMaterialGameObject(
                  clonedMaterialArr[1],
                  state,
                ),
              )
              |> expect == (clonedGameObjectArr[0], clonedGameObjectArr[1]);
            });
            test("not change group count", () => {
              let (state, _, material, _, _) = _prepare(false);
              BasicMaterialTool.getGroupCount(material, state) |> expect == 0;
            });
            describe("cloned one' data === source one's data", () => {
              let _prepare = () => {
                let (state, gameObject1, material1) =
                  BasicMaterialTool.createGameObject(state^);
                (state, gameObject1, material1);
              };
              let _clone = (gameObject, state) => {
                let (state, clonedGameObjectArr) =
                  _cloneGameObject(gameObject, false, 2, state);
                (
                  state,
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr,
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr
                  |> Js.Array.map(clonedGameObject =>
                       unsafeGetGameObjectBasicMaterialComponent(
                         clonedGameObject,
                         state,
                       )
                     ),
                );
              };
              test("test name", () => {
                let (state, gameObject, material) = _prepare();
                let name = "name1";
                let state =
                  state
                  |> BasicMaterialAPI.setBasicMaterialName(material, name);
                let (state, _, clonedMaterialArr) =
                  _clone(gameObject, state);

                (
                  BasicMaterialAPI.unsafeGetBasicMaterialName(
                    clonedMaterialArr[0],
                    state,
                  ),
                  BasicMaterialAPI.unsafeGetBasicMaterialName(
                    clonedMaterialArr[1],
                    state,
                  ),
                )
                |> expect == (name, name);
              });
              test("test color", () => {
                let (state, gameObject, material) = _prepare();
                let color = [|1., 0.2, 0.3|];
                let state =
                  state
                  |> BasicMaterialAPI.setBasicMaterialColor(material, color);
                let (state, _, clonedMaterialArr) =
                  _clone(gameObject, state);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                (
                  BasicMaterialAPI.getBasicMaterialColor(material, state)
                  |> TypeArrayTool.truncateArray,
                  BasicMaterialAPI.getBasicMaterialColor(
                    clonedMaterialArr[0],
                    state,
                  )
                  |> TypeArrayTool.truncateArray,
                  BasicMaterialAPI.getBasicMaterialColor(
                    clonedMaterialArr[1],
                    state,
                  )
                  |> TypeArrayTool.truncateArray,
                )
                |> expect == (color, color, color);
              });
              test("test map", () => {
                let (state, gameObject, (material, map)) =
                  BasicMaterialTool.createGameObjectWithMap(state^);
                let (state, _, clonedMaterialArr) =
                  _clone(gameObject, state);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                (
                  BasicMaterialAPI.unsafeGetBasicMaterialMap(material, state),
                  BasicMaterialAPI.unsafeGetBasicMaterialMap(
                    clonedMaterialArr[0],
                    state,
                  ),
                  BasicMaterialAPI.unsafeGetBasicMaterialMap(
                    clonedMaterialArr[1],
                    state,
                  ),
                )
                |> expect == (map, map, map);
              });
            });
            describe("test init cloned material", () =>
              test("can correctly set cloned one's shader index", () => {
                let (state, _, _, clonedGameObjectArr, clonedMaterialArr) =
                  _prepare(false);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                let state =
                  state
                  |> GameObjectAPI.initGameObject(clonedGameObjectArr[0])
                  |> GameObjectAPI.initGameObject(clonedGameObjectArr[1]);
                (
                  BasicMaterialTool.getShaderIndex(
                    clonedMaterialArr[0],
                    state,
                  ),
                  BasicMaterialTool.getShaderIndex(
                    clonedMaterialArr[1],
                    state,
                  ),
                )
                |> expect == (1, 1);
              })
            );
            describe("fix bug", () =>
              test(
                "basicMaterialRecord.index should be correct after clone", () => {
                open BasicMaterialType;
                let (state, gameObject, _) =
                  BasicMaterialTool.createGameObject(state^);
                let (state, clonedGameObjectArr) =
                  _cloneGameObject(gameObject, false, 2, state);
                let {index} =
                  state |> RecordBasicMaterialMainService.getRecord;
                index |> expect === 3;
              })
            );
          });
        });

        describe("test clone light material component", () => {
          let _cloneGameObject = (gameObject, isShareMaterial, count, state) =>
            CloneTool.cloneGameObject(
              gameObject,
              count,
              isShareMaterial,
              state,
            );
          let _prepare = isShareMaterial => {
            let (state, gameObject1, material1) =
              LightMaterialTool.createGameObject(state^);
            let state =
              state |> LightMaterialTool.setShaderIndex(material1, 1);
            let (state, clonedGameObjectArr) =
              _cloneGameObject(gameObject1, isShareMaterial, 2, state);
            (
              state,
              gameObject1,
              material1,
              clonedGameObjectArr |> CloneTool.getFlattenClonedGameObjectArr,
              clonedGameObjectArr
              |> CloneTool.getFlattenClonedGameObjectArr
              |> Js.Array.map(clonedGameObject =>
                   unsafeGetGameObjectLightMaterialComponent(
                     clonedGameObject,
                     state,
                   )
                 ),
            );
          };
          describe("test clone shared material", () =>
            test("cloned one === source one", () => {
              let (state, _, material, _, clonedMaterialArr) =
                _prepare(true);
              clonedMaterialArr |> expect == [|material, material|];
            })
          );
          describe("test clone not shared material", () => {
            test("cloned ones are new created ones", () => {
              let (state, _, material, _, clonedMaterialArr) =
                _prepare(false);
              clonedMaterialArr |> expect == [|1, 2|];
            });
            describe("cloned one' data === source one's data", () => {
              let _prepare = () => {
                let (state, gameObject1, material1) =
                  LightMaterialTool.createGameObject(state^);
                (state, gameObject1, material1);
              };
              let _clone = (gameObject, state) => {
                let (state, clonedGameObjectArr) =
                  _cloneGameObject(gameObject, false, 2, state);
                (
                  state,
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr,
                  clonedGameObjectArr
                  |> CloneTool.getFlattenClonedGameObjectArr
                  |> Js.Array.map(clonedGameObject =>
                       unsafeGetGameObjectLightMaterialComponent(
                         clonedGameObject,
                         state,
                       )
                     ),
                );
              };

              test("test name", () => {
                let (state, gameObject, material) = _prepare();
                let name = "name1";
                let state =
                  state
                  |> LightMaterialAPI.setLightMaterialName(material, name);
                let (state, _, clonedMaterialArr) =
                  _clone(gameObject, state);

                (
                  LightMaterialAPI.unsafeGetLightMaterialName(
                    clonedMaterialArr[0],
                    state,
                  ),
                  LightMaterialAPI.unsafeGetLightMaterialName(
                    clonedMaterialArr[1],
                    state,
                  ),
                )
                |> expect == (name, name);
              });
              test("test diffuse color", () => {
                let (state, gameObject, material) = _prepare();
                let color = [|1., 0.2, 0.3|];
                let state =
                  state
                  |> LightMaterialAPI.setLightMaterialDiffuseColor(
                       material,
                       color,
                     );
                let (state, _, clonedMaterialArr) =
                  _clone(gameObject, state);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                (
                  LightMaterialAPI.getLightMaterialDiffuseColor(
                    clonedMaterialArr[0],
                    state,
                  )
                  |> TypeArrayTool.truncateArray,
                  LightMaterialAPI.getLightMaterialDiffuseColor(
                    clonedMaterialArr[1],
                    state,
                  )
                  |> TypeArrayTool.truncateArray,
                )
                |> expect == (color, color);
              });
              test("test specular color", () => {
                let (state, gameObject, material) = _prepare();
                let color = [|1., 0.2, 0.3|];
                let state =
                  state
                  |> LightMaterialAPI.setLightMaterialSpecularColor(
                       material,
                       color,
                     );
                let (state, _, clonedMaterialArr) =
                  _clone(gameObject, state);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                (
                  LightMaterialAPI.getLightMaterialSpecularColor(
                    clonedMaterialArr[0],
                    state,
                  )
                  |> TypeArrayTool.truncateArray,
                  LightMaterialAPI.getLightMaterialSpecularColor(
                    clonedMaterialArr[1],
                    state,
                  )
                  |> TypeArrayTool.truncateArray,
                )
                |> expect == (color, color);
              });
              test("test shininess", () => {
                let (state, gameObject, material) = _prepare();
                let shininess = 28.5;
                let state =
                  state
                  |> LightMaterialAPI.setLightMaterialShininess(
                       material,
                       shininess,
                     );
                let (state, _, clonedMaterialArr) =
                  _clone(gameObject, state);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                (
                  LightMaterialAPI.getLightMaterialShininess(
                    clonedMaterialArr[0],
                    state,
                  ),
                  LightMaterialAPI.getLightMaterialShininess(
                    clonedMaterialArr[1],
                    state,
                  ),
                )
                |> expect == (shininess, shininess);
              });
              test("test diffuse map + specular map", () => {
                let (state, gameObject, (material, (map1, map2))) =
                  LightMaterialTool.createGameObjectWithMap(state^);
                let (state, _, clonedMaterialArr) =
                  _clone(gameObject, state);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                (
                  LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                    material,
                    state,
                  ),
                  LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                    clonedMaterialArr[0],
                    state,
                  ),
                  LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                    clonedMaterialArr[1],
                    state,
                  ),
                  LightMaterialAPI.unsafeGetLightMaterialSpecularMap(
                    material,
                    state,
                  ),
                  LightMaterialAPI.unsafeGetLightMaterialSpecularMap(
                    clonedMaterialArr[0],
                    state,
                  ),
                  LightMaterialAPI.unsafeGetLightMaterialSpecularMap(
                    clonedMaterialArr[1],
                    state,
                  ),
                )
                |> expect == (map1, map1, map1, map2, map2, map2);
              });
            });
          });
        });
      });
      describe("test clone transform component", () => {
        let _prepare = () => {
          let (state, gameObject1, transform1) =
            GameObjectTool.createGameObject(state^);
          let (clonedGameObjectArr, clonedTransformArr) =
            _getClonedTransformMatrixDataArr(gameObject1, 2, state);
          (
            state,
            gameObject1,
            transform1,
            clonedGameObjectArr,
            clonedTransformArr,
          );
        };
        test("test clone specific count of transforms", () => {
          let (state, gameObject1, transform1, _, clonedTransformArr) =
            _prepare();
          clonedTransformArr |> Js.Array.length |> expect == 2;
        });
        describe(
          "set cloned transform's localPosition by source transform's localPosition",
          () => {
          test("test", () => {
            open TransformAPI;
            let (state, gameObject1, transform1) =
              GameObjectTool.createGameObject(state^);
            let pos1 = (1., 2., 3.);
            let state = state |> setTransformLocalPosition(transform1, pos1);
            let (_, clonedTransformArr) =
              _getClonedTransformMatrixDataArr(gameObject1, 2, state);
            clonedTransformArr
            |> Js.Array.map(transform =>
                 getTransformLocalPosition(transform, state)
               )
            |> expect == [|pos1, pos1|];
          });
          describe("fix bug", () =>
            test(
              "source transform,cloned transforms shouldn't affect each other",
              () => {
              open TransformAPI;
              let (state, gameObject1, transform1) =
                GameObjectTool.createGameObject(state^);
              let pos1 = (1., 2., 3.);
              let state =
                state |> setTransformLocalPosition(transform1, pos1);
              let (_, clonedTransformArr) =
                _getClonedTransformMatrixDataArr(gameObject1, 2, state);
              let pos2 = (2., 4., 6.);
              let state =
                state
                |> setTransformLocalPosition(clonedTransformArr[1], pos2);
              (
                getTransformLocalPosition(transform1, state),
                clonedTransformArr
                |> Js.Array.map(transform =>
                     getTransformLocalPosition(transform, state)
                   ),
              )
              |> expect == (pos1, [|pos1, pos2|]);
            })
          );
        });

        describe(
          "set cloned transform's localRotation by source transform's localRotation",
          () =>
          test("test", () => {
            open TransformAPI;
            let (state, gameObject1, transform1) =
              GameObjectTool.createGameObject(state^);
            let rotation1 = (1., 2., 3., 1.);
            let state =
              state |> setTransformLocalRotation(transform1, rotation1);
            let (_, clonedTransformArr) =
              _getClonedTransformMatrixDataArr(gameObject1, 2, state);
            clonedTransformArr
            |> Js.Array.map(transform =>
                 getTransformLocalRotation(transform, state)
               )
            |> expect == [|rotation1, rotation1|];
          })
        );

        describe(
          "set cloned transform's localScale by source transform's localScale",
          () =>
          test("test", () => {
            open TransformAPI;
            let (state, gameObject1, transform1) =
              GameObjectTool.createGameObject(state^);
            let scale1 = (1., 2., 3.);
            let state = state |> setTransformLocalScale(transform1, scale1);
            let (_, clonedTransformArr) =
              _getClonedTransformMatrixDataArr(gameObject1, 2, state);
            clonedTransformArr
            |> Js.Array.map(transform =>
                 getTransformLocalScale(transform, state)
               )
            |> expect == [|scale1, scale1|];
          })
        );

        test("add cloned transform's gameObject to map", () => {
          let (state, _, _, clonedGameObjectArr, clonedTransformArr) =
            _prepare();
          (
            TransformAPI.unsafeGetTransformGameObject(
              clonedTransformArr[0],
              state,
            ),
            TransformAPI.unsafeGetTransformGameObject(
              clonedTransformArr[1],
              state,
            ),
          )
          |> expect == (clonedGameObjectArr[0], clonedGameObjectArr[1]);
        });
      });
      describe("test clone basicCameraView component", () => {
        let _prepare = state => {
          open StateDataMainType;
          let (state, _) = BasicCameraViewAPI.createBasicCameraView(state);
          let (state, gameObject1, _, (basicCameraView1, _)) =
            CameraTool.createCameraGameObject(state);
          let (state, clonedGameObjectArr) =
            _cloneGameObject(gameObject1, 2, state);
          (
            state,
            gameObject1,
            basicCameraView1,
            clonedGameObjectArr,
            clonedGameObjectArr
            |> CloneTool.getFlattenClonedGameObjectArr
            |> Js.Array.map(clonedGameObject =>
                 unsafeGetGameObjectBasicCameraViewComponent(
                   clonedGameObject,
                   state,
                 )
               ),
          );
        };
        test("test clone specific count of basicCameraViews", () => {
          let (_, _, _, _, clonedBasicCameraViewArr) = _prepare(state^);
          clonedBasicCameraViewArr |> Js.Array.length |> expect == 2;
        });
        test("cloned one's isActive should be false", () => {
          let (state, _, basicCameraView1, _, clonedBasicCameraViewArr) =
            _prepare(state^);

          clonedBasicCameraViewArr
          |> Js.Array.map(basicCameraView =>
               BasicCameraViewAPI.isActiveBasicCameraView(
                 basicCameraView,
                 state,
               )
             )
          |> expect == [|false, false|];
        });
      });

      describe("test clone perspectiveCameraProjection component", () => {
        let _prepare = state => {
          open StateDataMainType;
          let (state, _) =
            PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection(
              state,
            );
          let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
            CameraTool.createCameraGameObject(state);
          let (state, clonedGameObjectArr) =
            _cloneGameObject(gameObject1, 2, state);
          (
            state,
            gameObject1,
            perspectiveCameraProjection1,
            clonedGameObjectArr,
            clonedGameObjectArr
            |> CloneTool.getFlattenClonedGameObjectArr
            |> Js.Array.map(clonedGameObject =>
                 unsafeGetGameObjectPerspectiveCameraProjectionComponent(
                   clonedGameObject,
                   state,
                 )
               ),
          );
        };
        test("test clone specific count of perspectiveCameraProjections", () => {
          let (_, _, _, _, clonedPerspectiveCameraProjectionArr) =
            _prepare(state^);
          clonedPerspectiveCameraProjectionArr
          |> Js.Array.length
          |> expect == 2;
        });
        test(
          "set cloned perspectiveCameraProjection's near by source one's near",
          () => {
          let (
            state,
            _,
            perspectiveCameraProjection1,
            _,
            clonedPerspectiveCameraProjectionArr,
          ) =
            _prepare(state^);
          let sourceNear =
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
              perspectiveCameraProjection1,
              state,
            );
          clonedPerspectiveCameraProjectionArr
          |> Js.Array.map(perspectiveCameraProjection =>
               PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
                 perspectiveCameraProjection,
                 state,
               )
             )
          |> expect == [|sourceNear, sourceNear|];
        });
        test(
          "set cloned perspectiveCameraProjection's far by source one's far",
          () => {
          let (
            state,
            _,
            perspectiveCameraProjection1,
            _,
            clonedPerspectiveCameraProjectionArr,
          ) =
            _prepare(state^);
          let sourceFar =
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
              perspectiveCameraProjection1,
              state,
            );
          clonedPerspectiveCameraProjectionArr
          |> Js.Array.map(perspectiveCameraProjection =>
               PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
                 perspectiveCameraProjection,
                 state,
               )
             )
          |> expect == [|sourceFar, sourceFar|];
        });
        test(
          "set cloned perspectiveCameraProjection's fovy by source one's fovy",
          () => {
          let (
            state,
            _,
            perspectiveCameraProjection1,
            _,
            clonedPerspectiveCameraProjectionArr,
          ) =
            _prepare(state^);
          let sourceFovy =
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
              perspectiveCameraProjection1,
              state,
            );
          clonedPerspectiveCameraProjectionArr
          |> Js.Array.map(perspectiveCameraProjection =>
               PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
                 perspectiveCameraProjection,
                 state,
               )
             )
          |> expect == [|sourceFovy, sourceFovy|];
        });

        describe(
          "set cloned perspectiveCameraProjection's aspect by source one's aspect",
          () => {
          test("test has aspect", () => {
            let (
              state,
              _,
              perspectiveCameraProjection1,
              _,
              clonedPerspectiveCameraProjectionArr,
            ) =
              _prepare(state^);
            let sourceAspect =
              PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect(
                perspectiveCameraProjection1,
                state,
              );
            clonedPerspectiveCameraProjectionArr
            |> Js.Array.map(perspectiveCameraProjection =>
                 PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect(
                   perspectiveCameraProjection,
                   state,
                 )
               )
            |> expect == [|sourceAspect, sourceAspect|];
          });
          test("if not has aspect, not set it", () => {
            let (state, _) =
              PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection(
                state^,
              );
            let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
              CameraTool.createCameraGameObjectWithFunc(
                CameraTool.createBasicCameraViewPerspectiveCameraWithoutAspect,
                state,
              );

            let (state, clonedGameObjectArr) =
              _cloneGameObject(gameObject1, 2, state);
            let clonedPerspectiveCameraProjectionArr =
              clonedGameObjectArr
              |> CloneTool.getFlattenClonedGameObjectArr
              |> Js.Array.map(clonedGameObject =>
                   unsafeGetGameObjectPerspectiveCameraProjectionComponent(
                     clonedGameObject,
                     state,
                   )
                 );

            clonedPerspectiveCameraProjectionArr
            |> Js.Array.map(perspectiveCameraProjection =>
                 PerspectiveCameraProjectionTool.getAspect(
                   perspectiveCameraProjection,
                   state,
                 )
               )
            |> expect == [|None, None|];
          });
        });
      });

      describe("test clone cameraController component", () => {
        let _prepare = state => {
          open StateDataMainType;
          let (state, _) =
            ArcballCameraControllerAPI.createArcballCameraController(state);
          let (state, gameObject1, _, (cameraController1, _, _)) =
            ArcballCameraControllerTool.createGameObject(state);

          let distance = 2.2;
          ArcballCameraControllerAPI.setArcballCameraControllerDistance(
            cameraController1,
            distance,
            state,
          );

          let (state, clonedGameObjectArr) =
            _cloneGameObject(gameObject1, 2, state);
          (
            state,
            gameObject1,
            cameraController1,
            clonedGameObjectArr,
            clonedGameObjectArr
            |> CloneTool.getFlattenClonedGameObjectArr
            |> Js.Array.map(clonedGameObject =>
                 unsafeGetGameObjectArcballCameraControllerComponent(
                   clonedGameObject,
                   state,
                 )
               ),
            distance,
          );
        };
        test("test clone specific count of cameraControllers", () => {
          let (_, _, _, _, clonedArcballCameraControllerArr, _) =
            _prepare(state^);
          clonedArcballCameraControllerArr |> Js.Array.length |> expect == 2;
        });
        test(
          "set cloned cameraController's distance by source one's distance", () => {
          let (
            state,
            _,
            cameraController1,
            _,
            clonedArcballCameraControllerArr,
            distance,
          ) =
            _prepare(state^);
          clonedArcballCameraControllerArr
          |> Js.Array.map(cameraController =>
               ArcballCameraControllerAPI.unsafeGetArcballCameraControllerDistance(
                 cameraController,
                 state,
               )
             )
          |> expect == [|distance, distance|];
        });
        /* TODO test other data */
      });
    });

    describe("clone children", () => {
      open TransformAPI;
      describe("test clone gameObject", () =>
        test("get all cloned gameObjects(include cloned children)", () => {
          open StateDataMainType;
          let (state, gameObject1, transform1) =
            GameObjectTool.createGameObject(state^);
          let (state, gameObject2, transform2) =
            GameObjectTool.createGameObject(state);
          let state =
            state
            |> setTransformParent(Js.Nullable.return(transform1), transform2);
          let (state, clonedGameObjectArr) =
            _cloneGameObject(gameObject1, 2, state);
          clonedGameObjectArr |> expect == [|[|3, 4|], [|5, 6|]|];
        })
      );
      describe("cloned children's components", () => {
        test("test clone meshRenderer component", () => {
          let _createMeshRendererGameObject = state => {
            let (state, gameObject1, meshRenderer1) =
              MeshRendererTool.createBasicMaterialGameObject(state);
            (
              state,
              gameObject1,
              meshRenderer1,
              unsafeGetGameObjectTransformComponent(gameObject1, state),
            );
          };
          open StateDataMainType;
          let (state, gameObject1, meshRenderer1, transform1) =
            _createMeshRendererGameObject(state^);
          let (state, gameObject2, meshRenderer2, transform2) =
            _createMeshRendererGameObject(state);
          let state =
            state
            |> setTransformParent(Js.Nullable.return(transform1), transform2);
          let (state, clonedGameObjectArr) =
            _cloneGameObject(gameObject1, 2, state);
          clonedGameObjectArr
          |> CloneTool.getFlattenClonedGameObjectArr
          |> Js.Array.map(clonedGameObject =>
               unsafeGetGameObjectMeshRendererComponent(
                 clonedGameObject,
                 state,
               )
             )
          |> Js.Array.length
          |> expect == 4;
        });
        /* describe(
             "test clone geometry component",
             () =>
               test(
                 "test clone specific count of geometrys",
                 () => {
                   open StateDataMainType;
                   let (state, gameObject1, geometry1) =
                     BoxGeometryTool.createGameObject(state^);
                   let transform1 = unsafeGetGameObjectTransformComponent(gameObject1, state);
                   let (state, gameObject2, geometry2) =
                     BoxGeometryTool.createGameObject(state);
                   let transform2 = unsafeGetGameObjectTransformComponent(gameObject2, state);
                   let state =
                     state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                   /*let state = state |> BoxGeometryTool.initGeometrys;*/
                   let (state, clonedGameObjectArr) = _cloneGameObject(gameObject1, 2, state);
                   clonedGameObjectArr
                   |> CloneTool.getFlattenClonedGameObjectArr
                   |> Js.Array.map(
                        (clonedGameObject) =>
                          BoxGeometryTool.unsafeGetBoxGeometryComponent(clonedGameObject, state)
                      )
                   |> Js.Array.length
                   |> expect == 4
                 }
               )
           ); */
        /* describe(
             "test clone material component",
             () =>
               test(
                 "test clone specific count of materials",
                 () => {
                   open StateDataMainType;
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
        describe("test clone transform component", () => {
          let _prepare = () => {
            let (state, gameObject1, transform1) =
              GameObjectTool.createGameObject(state^);
            let (state, gameObject2, transform2) =
              GameObjectTool.createGameObject(state);
            let (state, gameObject3, transform3) =
              GameObjectTool.createGameObject(state);
            let (state, gameObject4, transform4) =
              GameObjectTool.createGameObject(state);
            let state =
              state
              |> setTransformParent(
                   Js.Nullable.return(transform1),
                   transform2,
                 )
              |> setTransformParent(
                   Js.Nullable.return(transform1),
                   transform3,
                 )
              |> setTransformParent(
                   Js.Nullable.return(transform3),
                   transform4,
                 );
            (
              state,
              gameObject1,
              transform1,
              gameObject2,
              transform2,
              gameObject3,
              transform3,
              gameObject4,
              transform4,
            );
          };
          test("set parent", () => {
            let (
              state,
              gameObject1,
              transform1,
              gameObject2,
              transform2,
              gameObject3,
              transform3,
              gameObject4,
              transform4,
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
              state |> unsafeGetTransformParent(clonedTransformArr[7]),
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
                        Js.Undefined.return(clonedTransformArr[5]),
                      );
          });
          test(
            "test set cloned transform's localPosition by corresponding source transform's localPosition",
            () => {
              open TransformAPI;
              open Vector3Service;
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
                transform4,
              ) =
                _prepare();
              let pos1 = (1., 2., 3.);
              let pos2 = (2., 2., 3.);
              let pos3 = (3., 20., 3.);
              let pos4 = (4., 2., 3.);
              let state =
                state |> setTransformLocalPosition(transform1, pos1);
              let state =
                state |> setTransformLocalPosition(transform2, pos2);
              let state =
                state |> setTransformLocalPosition(transform3, pos3);
              let state =
                state |> setTransformLocalPosition(transform4, pos4);
              let (clonedGameObjectArr, clonedTransformArr) =
                _getClonedTransformMatrixDataArr(gameObject1, 1, state);
              clonedTransformArr
              |> Js.Array.map(transform =>
                   getTransformPosition(transform, state)
                 )
              |>
              expect == [|
                          pos1,
                          add(Float, pos1, pos2),
                          add(Float, pos1, pos3),
                          add(Float, add(Float, pos1, pos3), pos4),
                        |];
            },
          );
        });
      });
    });
  });