open Wonder_jest;

open GameObjectAPI;

/* TODO add test */

let _ =
  describe("GameObject", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("createGameObject", () => {
      test("create a new gameObject which is just uidStr(string)", () => {
        let (_, gameObject) = createGameObject(state^);
        expect(gameObject) == 1;
      });
      test("add new transform component", () => {
        let (state, gameObject) = createGameObject(state^);
        hasGameObjectTransformComponent(gameObject, state) |> expect == true;
      });
      describe("change state", () =>
        test("state->uid + 1", () => {
          let (state, _) = createGameObject(state^);
          GameObjectTool.getGameObjectRecord(state)
          |> (record => expect(record.uid) == 2);
        })
      );
    });

    describe("test operate component", () => {
      describe("test transform component", () => {
        describe("addGameObjectTransformComponent", () => {
          test("if this type of component is already exist, error", () => {
            let (state, gameObject) = createGameObject(state^);
            expect(() => {
              let (state, transform) = TransformAPI.createTransform(state);
              addGameObjectTransformComponent(gameObject, transform, state);
            })
            |> toThrowMessage(
                 "expect this type of the component shouldn't be added before, but actual not",
               );
          });
          /* TODO: test after add disposeGameObjectTransformComponet */
          /* test "add transform component" (fun () => {
             }); */
          test("can get component's gameObject", () => {
            let (state, gameObject) = createGameObject(state^);
            TransformAPI.unsafeGetTransformGameObject(
              unsafeGetGameObjectTransformComponent(gameObject, state),
              state,
            )
            |> expect == gameObject;
          });
        });
        describe("unsafeGetGameObjectTransformComponent", () =>
          test("get transform component", () => {
            let (state, gameObject) = createGameObject(state^);
            unsafeGetGameObjectTransformComponent(gameObject, state)
            |> TransformTool.isTransform;
          })
        );
        describe("hasGameObjectTransformComponent", () =>
          test("has transform component", () => {
            let (state, gameObject) = createGameObject(state^);
            hasGameObjectTransformComponent(gameObject, state)
            |> expect == true;
          })
        );
      });
      describe("test material component", () => {
        describe("unsafeGetGameObjectBasicMaterialComponent", () =>
          test("get material component", () => {
            let (state, gameObject) = createGameObject(state^);
            let (state, material) =
              BasicMaterialAPI.createBasicMaterial(state);
            let state =
              state
              |> addGameObjectBasicMaterialComponent(gameObject, material);
            hasGameObjectBasicMaterialComponent(gameObject, state)
            |> expect == true;
          })
        );
        describe("hasGameObjectBasicMaterialComponent", () =>
          test("has material component", () => {
            let (state, gameObject) = createGameObject(state^);
            let (state, material) =
              BasicMaterialAPI.createBasicMaterial(state);
            let state =
              state
              |> addGameObjectBasicMaterialComponent(gameObject, material);
            hasGameObjectBasicMaterialComponent(gameObject, state)
            |> expect == true;
          })
        );
        describe("unsafeGetGameObjectLightMaterialComponent", () =>
          test("get material component", () => {
            let (state, gameObject) = createGameObject(state^);
            let (state, material) =
              LightMaterialAPI.createLightMaterial(state);
            let state =
              state
              |> addGameObjectLightMaterialComponent(gameObject, material);
            hasGameObjectLightMaterialComponent(gameObject, state)
            |> expect == true;
          })
        );
        describe("hasGameObjectLightMaterialComponent", () =>
          test("has material component", () => {
            let (state, gameObject) = createGameObject(state^);
            let (state, material) =
              LightMaterialAPI.createLightMaterial(state);
            let state =
              state
              |> addGameObjectLightMaterialComponent(gameObject, material);
            hasGameObjectLightMaterialComponent(gameObject, state)
            |> expect == true;
          })
        );
      });
      describe("test geometry component", () => {
        describe("unsafeGetGeometryComponent", () =>
          test("get geometry component", () => {
            let (state, gameObject) = createGameObject(state^);
            let (state, geometry1) = GeometryAPI.createGeometry(state);
            let (state, geometry2) = GeometryAPI.createGeometry(state);
            let state =
              state |> addGameObjectGeometryComponent(gameObject, geometry2);

            unsafeGetGameObjectGeometryComponent(gameObject, state)
            |> expect == geometry2;
          })
        );

        describe("hasGameObjectGeometryComponent", () =>
          test("has geometry component", () => {
            let (state, gameObject) = createGameObject(state^);
            let (state, geometry) = GeometryAPI.createGeometry(state);
            let state =
              state |> addGameObjectGeometryComponent(gameObject, geometry);

            hasGameObjectGeometryComponent(gameObject, state)
            |> expect == true;
          })
        );
      });
      describe("test meshRenderer component", () => {
        describe("unsafeGetGameObjectMeshRendererComponent", () =>
          test("get meshRenderer component", () => {
            let (state, gameObject, meshRenderer) =
              MeshRendererTool.createBasicMaterialGameObject(state^);
            unsafeGetGameObjectMeshRendererComponent(gameObject, state)
            |> MeshRendererTool.isMeshRenderer;
          })
        );
        describe("hasGameObjectMeshRendererComponent", () =>
          test("has meshRenderer component", () => {
            let (state, gameObject, meshRenderer) =
              MeshRendererTool.createBasicMaterialGameObject(state^);
            hasGameObjectMeshRendererComponent(gameObject, state)
            |> expect == true;
          })
        );
      });
      describe("test light component", () => {
        describe("unsafeGetGameObjectDirectionLightComponent", () =>
          test("get light component", () => {
            let (state, gameObject) = createGameObject(state^);
            let (state, light) =
              DirectionLightAPI.createDirectionLight(state);
            let state =
              state |> addGameObjectDirectionLightComponent(gameObject, light);
            unsafeGetGameObjectDirectionLightComponent(gameObject, state)
            |> expect == light;
          })
        );
        describe("hasGameObjectDirectionLightComponent", () =>
          test("has light component", () => {
            let (state, gameObject) = createGameObject(state^);
            let (state, light) =
              DirectionLightAPI.createDirectionLight(state);
            let state =
              state |> addGameObjectDirectionLightComponent(gameObject, light);
            hasGameObjectDirectionLightComponent(gameObject, state)
            |> expect == true;
          })
        );
      });

      describe("test script component", () => {
        let _prepare = () => {
          open ScriptAPI;
          let (state, gameObject) = createGameObject(state^);
          let (state, script) = createScript(state);
          let state =
            state |> addGameObjectScriptComponent(gameObject, script);
          (state, gameObject, script);
        };

        describe("addGameObjectScriptComponent", () => {
          test("if this type of component is already exist, error", () => {
            open ScriptAPI;
            let (state, gameObject, _) = _prepare();

            expect(() => {
              let (state, script) = createScript(state);
              addGameObjectScriptComponent(gameObject, script, state);
            })
            |> toThrowMessage(
                 "expect this type of the component shouldn't be added before, but actual not",
               );
          });
          test("can get component's gameObject", () => {
            open ScriptAPI;
            let (state, gameObject, _) = _prepare();

            state
            |> unsafeGetScriptGameObject(
                 unsafeGetGameObjectScriptComponent(gameObject, state),
               )
            |> expect == gameObject;
          });
        });

        describe("unsafeGetGameObjectScriptComponent", () =>
          test("get script component", () => {
            let (state, gameObject, script) = _prepare();

            state
            |> unsafeGetGameObjectScriptComponent(gameObject)
            |> expect == script;
          })
        );

        describe("hasGameObjectScriptComponent", () =>
          test("has script component", () => {
            let (state, gameObject, _) = _prepare();

            state
            |> hasGameObjectScriptComponent(gameObject)
            |> expect == true;
          })
        );
      });

      describe("test basicCameraView component", () => {
        let _prepare = () => {
          open BasicCameraViewAPI;
          let (state, gameObject) = createGameObject(state^);
          let (state, basicCameraView) = createBasicCameraView(state);
          let state =
            state
            |> addGameObjectBasicCameraViewComponent(
                 gameObject,
                 basicCameraView,
               );
          (state, gameObject, basicCameraView);
        };
        describe("addGameObjectBasicCameraViewComponent", () => {
          test("if this type of component is already exist, error", () => {
            open BasicCameraViewAPI;
            let (state, gameObject, _) = _prepare();
            expect(() => {
              let (state, basicCameraView) = createBasicCameraView(state);
              addGameObjectBasicCameraViewComponent(
                gameObject,
                basicCameraView,
                state,
              );
            })
            |> toThrowMessage(
                 "expect this type of the component shouldn't be added before, but actual not",
               );
          });
          test("can get component's gameObject", () => {
            open BasicCameraViewAPI;
            let (state, gameObject, _) = _prepare();
            state
            |> unsafeGetBasicCameraViewGameObject(
                 unsafeGetGameObjectBasicCameraViewComponent(
                   gameObject,
                   state,
                 ),
               )
            |> expect == gameObject;
          });
        });
        describe("unsafeGetGameObjectBasicCameraViewComponent", () =>
          test("get basicCameraView component", () => {
            let (state, gameObject, _) = _prepare();
            state
            |> unsafeGetGameObjectBasicCameraViewComponent(gameObject)
            |> BasicCameraViewTool.isBasicCameraView;
          })
        );
        describe("hasGameObjectBasicCameraViewComponent", () =>
          test("has basicCameraView component", () => {
            let (state, gameObject, _) = _prepare();
            state
            |> hasGameObjectBasicCameraViewComponent(gameObject)
            |> expect == true;
          })
        );
      });
      describe("test perspectiveCameraProjection component", () => {
        let _prepare = () => {
          open PerspectiveCameraProjectionAPI;
          let (state, gameObject) = createGameObject(state^);
          let (state, perspectiveCameraProjection) =
            createPerspectiveCameraProjection(state);
          let state =
            state
            |> addGameObjectPerspectiveCameraProjectionComponent(
                 gameObject,
                 perspectiveCameraProjection,
               );
          (state, gameObject, perspectiveCameraProjection);
        };
        describe("addGameObjectPerspectiveCameraProjectionComponent", () => {
          test("if this type of component is already exist, error", () => {
            open PerspectiveCameraProjectionAPI;
            let (state, gameObject, _) = _prepare();
            expect(() => {
              let (state, perspectiveCameraProjection) =
                createPerspectiveCameraProjection(state);
              addGameObjectPerspectiveCameraProjectionComponent(
                gameObject,
                perspectiveCameraProjection,
                state,
              );
            })
            |> toThrowMessage(
                 "expect this type of the component shouldn't be added before, but actual not",
               );
          });
          test("can get component's gameObject", () => {
            open PerspectiveCameraProjectionAPI;
            let (state, gameObject, _) = _prepare();
            state
            |> unsafeGetPerspectiveCameraProjectionGameObject(
                 unsafeGetGameObjectPerspectiveCameraProjectionComponent(
                   gameObject,
                   state,
                 ),
               )
            |> expect == gameObject;
          });
        });
        describe("unsafeGetGameObjectPerspectiveCameraProjectionComponent", () =>
          test("get perspectiveCameraProjection component", () => {
            let (state, gameObject, _) = _prepare();
            state
            |> unsafeGetGameObjectPerspectiveCameraProjectionComponent(
                 gameObject,
               )
            |> PerspectiveCameraProjectionTool.isPerspectiveCameraProjection;
          })
        );
        describe("hasGameObjectPerspectiveCameraProjectionComponent", () =>
          test("has perspectiveCameraProjection component", () => {
            let (state, gameObject, _) = _prepare();
            state
            |> hasGameObjectPerspectiveCameraProjectionComponent(gameObject)
            |> expect == true;
          })
        );
      });

      describe("test flyCameraController component", () => {
        let _prepare = () => {
          open FlyCameraControllerAPI;
          let (state, gameObject) = createGameObject(state^);
          let (state, flyCameraController) =
            createFlyCameraController(state);
          let state =
            state
            |> addGameObjectFlyCameraControllerComponent(
                 gameObject,
                 flyCameraController,
               );
          (state, gameObject, flyCameraController);
        };
        describe("addGameObjectFlyCameraControllerComponent", () => {
          test("if this type of component is already exist, error", () => {
            open FlyCameraControllerAPI;
            let (state, gameObject, _) = _prepare();
            expect(() => {
              let (state, flyCameraController) =
                createFlyCameraController(state);
              addGameObjectFlyCameraControllerComponent(
                gameObject,
                flyCameraController,
                state,
              );
            })
            |> toThrowMessage(
                 "expect this type of the component shouldn't be added before, but actual not",
               );
          });
          test("can get component's gameObject", () => {
            open FlyCameraControllerAPI;
            let (state, gameObject, _) = _prepare();
            state
            |> unsafeGetFlyCameraControllerGameObject(
                 unsafeGetGameObjectFlyCameraControllerComponent(
                   gameObject,
                   state,
                 ),
               )
            |> expect == gameObject;
          });
        });
        describe("unsafeGetGameObjectFlyCameraControllerComponent", () =>
          test("get flyCameraController component", () => {
            let (state, gameObject, flyCameraController) = _prepare();
            state
            |> unsafeGetGameObjectFlyCameraControllerComponent(gameObject)
            |> expect == (flyCameraController |> Obj.magic);
          })
        );
        describe("hasGameObjectFlyCameraControllerComponent", () =>
          test("has flyCameraController component", () => {
            let (state, gameObject, _) = _prepare();
            state
            |> hasGameObjectFlyCameraControllerComponent(gameObject)
            |> expect == true;
          })
        );
      });

      describe("test arcballCameraController component", () => {
        let _prepare = () => {
          open ArcballCameraControllerAPI;
          let (state, gameObject) = createGameObject(state^);
          let (state, arcballCameraController) =
            createArcballCameraController(state);
          let state =
            state
            |> addGameObjectArcballCameraControllerComponent(
                 gameObject,
                 arcballCameraController,
               );
          (state, gameObject, arcballCameraController);
        };
        describe("addGameObjectArcballCameraControllerComponent", () => {
          test("if this type of component is already exist, error", () => {
            open ArcballCameraControllerAPI;
            let (state, gameObject, _) = _prepare();
            expect(() => {
              let (state, arcballCameraController) =
                createArcballCameraController(state);
              addGameObjectArcballCameraControllerComponent(
                gameObject,
                arcballCameraController,
                state,
              );
            })
            |> toThrowMessage(
                 "expect this type of the component shouldn't be added before, but actual not",
               );
          });
          test("can get component's gameObject", () => {
            open ArcballCameraControllerAPI;
            let (state, gameObject, _) = _prepare();
            state
            |> unsafeGetArcballCameraControllerGameObject(
                 unsafeGetGameObjectArcballCameraControllerComponent(
                   gameObject,
                   state,
                 ),
               )
            |> expect == gameObject;
          });
        });
        describe("unsafeGetGameObjectArcballCameraControllerComponent", () =>
          test("get arcballCameraController component", () => {
            let (state, gameObject, _) = _prepare();
            state
            |> unsafeGetGameObjectArcballCameraControllerComponent(
                 gameObject,
               )
            |> ArcballCameraControllerTool.isArcballCameraController;
          })
        );
        describe("hasGameObjectArcballCameraControllerComponent", () =>
          test("has arcballCameraController component", () => {
            let (state, gameObject, _) = _prepare();
            state
            |> hasGameObjectArcballCameraControllerComponent(gameObject)
            |> expect == true;
          })
        );
      });
    });

    describe("getAllChildrenTransform", () =>
      test("get all children' transform", () => {
        let (state, gameObject1, tra1) =
          GameObjectTool.createGameObject(state^);
        let (state, _) = TransformAPI.createTransform(state);
        let (state, gameObject2, tra2) =
          GameObjectTool.createGameObject(state);
        let (state, gameObject3, tra3) =
          GameObjectTool.createGameObject(state);

        let state =
          GameObjectTool.addChild(gameObject1, gameObject2, state)
          |> GameObjectTool.addChild(gameObject2, gameObject3);

        GameObjectAPI.getAllChildrenTransform(gameObject1, state)
        |> expect == [|tra2, tra3|];
      })
    );

    describe("getAllGameObjects", () => {
      test("get itself and all children", () => {
        let (state, gameObject1, tra1) =
          GameObjectTool.createGameObject(state^);
        let (state, _) = TransformAPI.createTransform(state);
        let (state, gameObject2, tra2) =
          GameObjectTool.createGameObject(state);
        let (state, gameObject3, tra3) =
          GameObjectTool.createGameObject(state);

        let state =
          GameObjectTool.addChild(gameObject1, gameObject2, state)
          |> GameObjectTool.addChild(gameObject2, gameObject3);

        GameObjectAPI.getAllGameObjects(gameObject1, state)
        |> expect == [|gameObject1, gameObject2, gameObject3|];
      });

      describe("fix bug", () =>
        test("not sort transform children", () => {
          let (state, gameObject0, tra0) =
            GameObjectTool.createGameObject(state^);
          let (state, gameObject1, tra1) =
            GameObjectTool.createGameObject(state);
          let (state, _) = TransformAPI.createTransform(state);
          let (state, gameObject2, tra2) =
            GameObjectTool.createGameObject(state);

          let state =
            state
            |> GameObjectTool.addChild(gameObject1, gameObject2)
            |> GameObjectTool.addChild(gameObject1, gameObject0);

          let _ = GameObjectAPI.getAllGameObjects(gameObject1, state);
          GameObjectTool.getChildren(gameObject1, state)
          |> Js.Array.map(gameObject =>
               GameObjectAPI.unsafeGetGameObjectTransformComponent(
                 gameObject,
                 state,
               )
             )
          |> expect == [|tra2, tra0|];
        })
      );
    });

    describe("test get all components", () => {
      let _createMaterialGameObjects = state => {
        let (state, gameObject1, material1) =
          LightMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) =
          BasicMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) =
          LightMaterialTool.createGameObject(state);
        let (state, gameObject4, geometry1) =
          GeometryTool.createGameObject(state);

        (
          state,
          (gameObject1, gameObject2, gameObject3, gameObject4),
          (material1, material2, material3),
          geometry1,
        );
      };

      let _createCameraGameObjects = state => {
        let (
          state,
          gameObject1,
          _,
          (basicCameraView1, perspectiveCameraProjection1),
        ) =
          CameraTool.createCameraGameObject(state^);
        let (
          state,
          gameObject2,
          _,
          (basicCameraView2, perspectiveCameraProjection2),
        ) =
          CameraTool.createCameraGameObject(state);
        let (state, gameObject3, material1) =
          LightMaterialTool.createGameObject(state);
        let (state, gameObject4, geometry1) =
          GeometryTool.createGameObject(state);

        (
          state,
          (gameObject1, gameObject2, gameObject3, gameObject4),
          (basicCameraView1, basicCameraView2),
          (perspectiveCameraProjection1, perspectiveCameraProjection2),
          material1,
          geometry1,
        );
      };

      let _createLightGameObjects = state => {
        let (state, gameObject1, light1) =
          DirectionLightTool.createGameObject(state^);
        let (state, gameObject2, light2) =
          DirectionLightTool.createGameObject(state);
        let (state, gameObject3, light3) =
          PointLightTool.createGameObject(state);
        let (state, gameObject4, geometry1) =
          GeometryTool.createGameObject(state);

        (
          state,
          (gameObject1, gameObject2, gameObject3, gameObject4),
          (light1, light2, light3),
          geometry1,
        );
      };

      let _createGeometryGameObjects = state => {
        let (state, gameObject1, geometry1) =
          GeometryTool.createGameObject(state^);
        let (state, gameObject2, geometry2) =
          GeometryTool.createGameObject(state);
        let (state, gameObject3, geometry3) =
          BoxGeometryTool.createGameObject(state);

        (
          state,
          (gameObject1, gameObject2, gameObject3),
          (geometry1, geometry2, geometry3),
        );
      };

      describe("test get all components of gameObject", () => {
        describe("getAllDirectionLightComponentsOfGameObject", () =>
          test("test", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (light1, light2, light3),
              geometry1,
            ) =
              _createLightGameObjects(state);

            let state =
              SceneAPI.addSceneChildren(
                [|gameObject2, gameObject3, gameObject4|],
                state,
              );

            GameObjectAPI.getAllDirectionLightComponentsOfGameObject(
              SceneAPI.getSceneGameObject(state),
              state,
            )
            |> expect == [|light2|];
          })
        );

        describe("getAllPointLightComponentsOfGameObject", () =>
          test("test", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (light1, light2, light3),
              geometry1,
            ) =
              _createLightGameObjects(state);

            let state =
              SceneAPI.addSceneChildren(
                [|gameObject2, gameObject3, gameObject4|],
                state,
              );

            GameObjectAPI.getAllPointLightComponentsOfGameObject(
              SceneAPI.getSceneGameObject(state),
              state,
            )
            |> expect == [|light3|];
          })
        );
      });

      describe("test get all components of state", () => {
        describe("getAllDirectionLightComponents", () => {
          test("get all components", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (light1, light2, light3),
              geometry1,
            ) =
              _createLightGameObjects(state);

            GameObjectAPI.getAllDirectionLightComponents(state)
            |> expect == [|light1, light2|];
          });
          test("test dispose", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (light1, light2, light3),
              geometry1,
            ) =
              _createLightGameObjects(state);

            let state =
              state
              |> GameObjectAPI.disposeGameObject(gameObject2)
              |> GameObjectAPI.disposeGameObject(gameObject3);
            let state = state |> DisposeJob.execJob(None);

            GameObjectAPI.getAllDirectionLightComponents(state)
            |> expect == [|light1|];
          });
        });

        describe("getAllPointLightComponents", () => {
          test("get all components", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (light1, light2, light3),
              geometry1,
            ) =
              _createLightGameObjects(state);

            GameObjectAPI.getAllPointLightComponents(state)
            |> expect == [|light3|];
          });
          test("test dispose", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (light1, light2, light3),
              geometry1,
            ) =
              _createLightGameObjects(state);

            let state =
              state
              |> GameObjectTool.disposeGameObject(gameObject2)
              |> GameObjectTool.disposeGameObject(gameObject3);

            GameObjectAPI.getAllPointLightComponents(state) |> expect == [||];
          });
        });

        describe("getAllGeometryComponents", () => {
          test("get all components", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3),
              (geometry1, geometry2, geometry3),
            ) =
              _createGeometryGameObjects(state);

            GameObjectAPI.getAllGeometryComponents(state)
            |> expect == [|geometry1, geometry2, geometry3|];
          });
          test("include the ones not add to gameObject", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3),
              (geometry1, geometry2, geometry3),
            ) =
              _createGeometryGameObjects(state);

            let (state, geometry4) = GeometryAPI.createGeometry(state);

            GameObjectAPI.getAllGeometryComponents(state)
            |> expect == [|geometry1, geometry2, geometry3|];
          });
          test("test dispose", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3),
              (geometry1, geometry2, geometry3),
            ) =
              _createGeometryGameObjects(state);

            let state =
              state
              |> GameObjectAPI.disposeGameObject(gameObject2)
              |> GameObjectAPI.disposeGameObject(gameObject3);
            let state = state |> DisposeJob.execJob(None);

            GameObjectAPI.getAllGeometryComponents(state)
            |> expect == [|geometry1|];
          });
        });

        describe("getAllBasicCameraViewComponents", () => {
          test("get all components", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (basicCameraView1, basicCameraView2),
              (perspectiveCameraProjection1, perspectiveCameraProjection2),
              material1,
              geometry1,
            ) =
              _createCameraGameObjects(state);

            GameObjectAPI.getAllBasicCameraViewComponents(state)
            |> expect == [|basicCameraView1, basicCameraView2|];
          });
          test("test dispose", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (basicCameraView1, basicCameraView2),
              (perspectiveCameraProjection1, perspectiveCameraProjection2),
              material1,
              geometry1,
            ) =
              _createCameraGameObjects(state);

            let state =
              state
              |> GameObjectTool.disposeGameObject(gameObject2)
              |> GameObjectTool.disposeGameObject(gameObject3);

            GameObjectAPI.getAllBasicCameraViewComponents(state)
            |> expect == [|basicCameraView1|];
          });
        });

        describe("getAllPerspectiveCameraProjectionComponents", () => {
          test("get all components", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (basicCameraView1, basicCameraView2),
              (perspectiveCameraProjection1, perspectiveCameraProjection2),
              material1,
              geometry1,
            ) =
              _createCameraGameObjects(state);

            GameObjectAPI.getAllPerspectiveCameraProjectionComponents(state)
            |> expect
            == [|perspectiveCameraProjection1, perspectiveCameraProjection2|];
          });
          test("test dispose", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (basicCameraView1, basicCameraView2),
              (perspectiveCameraProjection1, perspectiveCameraProjection2),
              material1,
              geometry1,
            ) =
              _createCameraGameObjects(state);

            let state =
              state
              |> GameObjectTool.disposeGameObject(gameObject2)
              |> GameObjectTool.disposeGameObject(gameObject3);

            GameObjectAPI.getAllPerspectiveCameraProjectionComponents(state)
            |> expect == [|perspectiveCameraProjection1|];
          });
        });

        describe("getAllBasicMaterialComponents", () => {
          test("get all components", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (material1, material2, material3),
              geometry1,
            ) =
              _createMaterialGameObjects(state);

            GameObjectAPI.getAllBasicMaterialComponents(state)
            |> expect == [|material2|];
          });
          test("test dispose", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (material1, material2, material3),
              geometry1,
            ) =
              _createMaterialGameObjects(state);

            let state =
              state
              |> GameObjectTool.disposeGameObject(gameObject1)
              |> GameObjectTool.disposeGameObject(gameObject2);

            GameObjectAPI.getAllBasicMaterialComponents(state)
            |> expect == [||];
          });
        });

        describe("getAllLightMaterialComponents", () => {
          test("get all components", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (material1, material2, material3),
              geometry1,
            ) =
              _createMaterialGameObjects(state);

            GameObjectAPI.getAllLightMaterialComponents(state)
            |> expect == [|material1, material3|];
          });
          test("test dispose", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (material1, material2, material3),
              geometry1,
            ) =
              _createMaterialGameObjects(state);

            let state =
              state
              |> GameObjectTool.disposeGameObject(gameObject1)
              |> GameObjectTool.disposeGameObject(gameObject2);

            GameObjectAPI.getAllLightMaterialComponents(state)
            |> expect == [|material3|];
          });
        });
      });
    });

    describe("unsafeGetGameObjectName", () =>
      test("if no name, contract error", () => {
        TestTool.openContractCheck();

        let (state, gameObject) = createGameObject(state^);

        expect(() =>
          GameObjectAPI.unsafeGetGameObjectName(gameObject, state)
        )
        |> toThrowMessage("expect data exist");
      })
    );

    describe("setGameObjectName", () =>
      test("set name", () => {
        let (state, gameObject) = createGameObject(state^);
        let name = "gameObject1";

        let state = GameObjectAPI.setGameObjectName(gameObject, name, state);

        GameObjectAPI.unsafeGetGameObjectName(gameObject, state)
        |> expect == name;
      })
    );

    describe("unsafeGetGameObjectIsRoot", () =>
      test("default is false", () => {
        let (state, gameObject) = createGameObject(state^);

        GameObjectAPI.unsafeGetGameObjectIsRoot(gameObject, state)
        |> expect == false;
      })
    );

    describe("setGameObjectIsRoot", () =>
      test("set isRoot", () => {
        let (state, gameObject) = createGameObject(state^);
        let isRoot = true;

        let state =
          GameObjectAPI.setGameObjectIsRoot(gameObject, isRoot, state);

        GameObjectAPI.unsafeGetGameObjectIsRoot(gameObject, state)
        |> expect == isRoot;
      })
    );

    describe("removeGameObjectGeometryComponent", () => {
      let _prepareAndExec = state => {
        let (state, gameObject1, geometry1) =
          BoxGeometryTool.createGameObject(state);

        let state =
          GameObjectAPI.removeGameObjectGeometryComponent(
            gameObject1,
            geometry1,
            state,
          );

        (state, gameObject1, geometry1);
      };

      test("remove geometry from gameObject", () => {
        let (state, gameObject1, geometry1) = _prepareAndExec(state^);

        GameObjectAPI.hasGameObjectGeometryComponent(gameObject1, state)
        |> expect == false;
      });
      test("remove gameObject from geometry", () => {
        let (state, gameObject1, geometry1) = _prepareAndExec(state^);

        GeometryTool.hasGameObject(geometry1, state) |> expect == false;
      });
    });

    describe("removeGameObjectBasicMaterialComponent", () => {
      let _prepareAndExec = state => {
        let (state, gameObject1, material1) =
          BasicMaterialTool.createGameObject(state);

        let state =
          GameObjectAPI.removeGameObjectBasicMaterialComponent(
            gameObject1,
            material1,
            state,
          );

        (state, gameObject1, material1);
      };

      test("remove material from gameObject", () => {
        let (state, gameObject1, material1) = _prepareAndExec(state^);

        GameObjectAPI.hasGameObjectBasicMaterialComponent(gameObject1, state)
        |> expect == false;
      });
      test("remove gameObject from material", () => {
        let (state, gameObject1, material1) = _prepareAndExec(state^);

        BasicMaterialTool.hasGameObject(material1, state) |> expect == false;
      });
    });

    describe("removeGameObjectLightMaterialComponent", () => {
      let _prepareAndExec = state => {
        let (state, gameObject1, material1) =
          LightMaterialTool.createGameObject(state);

        let state =
          GameObjectAPI.removeGameObjectLightMaterialComponent(
            gameObject1,
            material1,
            state,
          );

        (state, gameObject1, material1);
      };

      test("remove material from gameObject", () => {
        let (state, gameObject1, material1) = _prepareAndExec(state^);

        GameObjectAPI.hasGameObjectLightMaterialComponent(gameObject1, state)
        |> expect == false;
      });
      test("remove gameObject from material", () => {
        let (state, gameObject1, material1) = _prepareAndExec(state^);

        LightMaterialTool.hasGameObject(material1, state) |> expect == false;
      });
    });

    describe("unsafeGetGameObjectIsActive", () =>
      test("default value is true", () => {
        let (state, gameObject) = createGameObject(state^);

        GameObjectAPI.unsafeGetGameObjectIsActive(gameObject, state)
        |> expect == true;
      })
    );

    describe("setGameObjectIsActive", () => {
      test("set gameObject->is active", () => {
        let (state, gameObject) = createGameObject(state^);

        let state =
          state |> GameObjectAPI.setGameObjectIsActive(gameObject, false);

        GameObjectAPI.unsafeGetGameObjectIsActive(gameObject, state)
        |> expect == false;
      });

      describe("set gameObject->components", () => {
        test("set meshRender->is render", () => {
          let (state, gameObject, meshRenderer) =
            MeshRendererTool.createLightMaterialGameObject(state^);

          let state =
            state
            |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer, true);

          let state =
            state |> GameObjectAPI.setGameObjectIsActive(gameObject, false);

          meshRenderer
          |> MeshRendererAPI.getMeshRendererIsRender(_, state)
          |> expect == false;
        });
        test("set script->is active", () => {
          let (state, gameObject, script) =
            ScriptTool.createGameObject(state^);
          let state = state |> ScriptAPI.setScriptIsActive(script, true);

          let state =
            state |> GameObjectAPI.setGameObjectIsActive(gameObject, false);

          GameObjectAPI.unsafeGetGameObjectScriptComponent(gameObject, state)
          |> ScriptAPI.unsafeGetScriptIsActive(_, state)
          |> expect == false;
        });
      });
    });

    describe("dispose", () => {
      describe("test alive", () => {
        test("disposed one shouldn't alive before reallocate", () => {
          let (state, gameObject) = createGameObject(state^);
          /* isGameObjectAlive(gameObject, state) */
          let state = state |> GameObjectTool.disposeGameObject(gameObject);
          state |> isGameObjectAlive(gameObject) |> expect == false;
        });
        test("disposed one shouldn't alive after reallocate", () => {
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
            isGameObjectAlive(gameObject4, state),
          )
          |> expect == (false, false, false, true);
        });
      });

      describe("dispose all components", () => {
        test("dispose transform component", () => {
          let (state, gameObject1) = createGameObject(state^);
          let (state, gameObject2) = createGameObject(state);
          let transform1 =
            unsafeGetGameObjectTransformComponent(gameObject1, state);
          let transform2 =
            unsafeGetGameObjectTransformComponent(gameObject2, state);
          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(transform1),
                 transform2,
               );
          let pos1 = (1., 2., 3.);
          let pos2 = (2., 3., 4.);
          let state =
            state
            |> TransformAPI.setTransformLocalPosition(transform1, pos1)
            |> TransformAPI.setTransformLocalPosition(transform2, pos2);

          let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
          let state = state |> DisposeJob.execJob(None);

          expect(() =>
            state
            |> GameObjectAPI.unsafeGetGameObjectTransformComponent(
                 gameObject1,
               )
          )
          |> toThrowMessage("expect gameObject alive, but actual not");
        });
        test("dispose script component", () => {
          open GameObjectType;
          let (state, gameObject1, script1) =
            ScriptTool.createGameObject(state^);
          let (state, gameObject2, script2) =
            ScriptTool.createGameObject(state);

          let state = state |> GameObjectTool.disposeGameObject(gameObject1);

          (
            ScriptTool.isAlive(script1, state),
            ScriptTool.isAlive(script2, state),
          )
          |> expect == (false, true);
        });
        test("dispose meshRenderer component", () => {
          let (state, gameObject1, meshRenderer1) =
            MeshRendererTool.createBasicMaterialGameObject(state^);
          let (state, gameObject2, meshRenderer2) =
            MeshRendererTool.createBasicMaterialGameObject(state);
          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
          state
          |> MeshRendererTool.getBasicMaterialRenderGameObjectArray
          |> expect == [|gameObject2|];
        });
        describe("dispose material component", () => {
          test("test basic material component", () => {
            open BasicMaterialType;
            let (state, gameObject1, material1) =
              BasicMaterialTool.createGameObject(state^);
            let (state, gameObject2, material2) =
              BasicMaterialTool.createGameObject(state);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject1);
            let {disposedIndexArray} = state |> BasicMaterialTool.getRecord;
            (
              disposedIndexArray |> Js.Array.includes(material1),
              disposedIndexArray |> Js.Array.includes(material2),
            )
            |> expect == (true, false);
          });
          test("test light material component", () => {
            open LightMaterialType;
            let (state, gameObject1, material1) =
              LightMaterialTool.createGameObject(state^);
            let (state, gameObject2, material2) =
              LightMaterialTool.createGameObject(state);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject1);
            let {disposedIndexArray} = state |> LightMaterialTool.getRecord;
            (
              disposedIndexArray |> Js.Array.includes(material1),
              disposedIndexArray |> Js.Array.includes(material2),
            )
            |> expect == (true, false);
          });
        });
        test("dispose geometry component", () => {
          open GameObjectType;
          let (state, gameObject1, geometry1) =
            GeometryTool.createGameObject(state^);
          let (state, gameObject2, geometry2) =
            GeometryTool.createGameObject(state);
          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
          (
            GeometryTool.isGeometryDisposed(geometry1, state),
            GeometryTool.isGeometryDisposed(geometry2, state),
          )
          |> expect == (true, false);
        });

        describe("dispose light component", () => {
          describe("test direction light component", () =>
            test("test dispose one", () => {
              open GameObjectType;
              let (state, gameObject1, light1) =
                DirectionLightTool.createGameObject(state^);
              let (state, gameObject2, light2) =
                DirectionLightTool.createGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              (
                DirectionLightTool.isAlive(light1, state),
                DirectionLightTool.isAlive(light2, state),
              )
              |> expect == (false, true);
            })
          );
          describe("test point light component", () =>
            test("test dispose one", () => {
              open GameObjectType;
              let (state, gameObject1, light1) =
                PointLightTool.createGameObject(state^);
              let (state, gameObject2, light2) =
                PointLightTool.createGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              (
                PointLightTool.isAlive(light1, state),
                PointLightTool.isAlive(light2, state),
              )
              |> expect == (false, true);
            })
          );
        });
        test("dispose basicCameraView component", () => {
          open BasicCameraViewType;
          let (state, gameObject1, _, (basicCameraView1, _)) =
            CameraTool.createCameraGameObject(state^);
          let (state, gameObject2, _, (basicCameraView2, _)) =
            CameraTool.createCameraGameObject(state);
          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
          let {disposedIndexArray} = state.basicCameraViewRecord;
          (
            disposedIndexArray |> Js.Array.includes(basicCameraView1),
            disposedIndexArray |> Js.Array.includes(basicCameraView2),
          )
          |> expect == (true, false);
        });
        test("dispose perspectiveCameraProjection component", () => {
          open PerspectiveCameraProjectionType;
          let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
            CameraTool.createCameraGameObject(state^);
          let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
            CameraTool.createCameraGameObject(state);
          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
          let {disposedIndexArray} = state.perspectiveCameraProjectionRecord;
          (
            disposedIndexArray
            |> Js.Array.includes(perspectiveCameraProjection1),
            disposedIndexArray
            |> Js.Array.includes(perspectiveCameraProjection2),
          )
          |> expect == (true, false);
        });
        test("dispose arcballCameraController component", () => {
          open StateDataMainType;
          let (state, gameObject1, _, (cameraController1, _, _)) =
            ArcballCameraControllerTool.createGameObject(state^);
          let (state, gameObject2, _, (cameraController2, _, _)) =
            ArcballCameraControllerTool.createGameObject(state);
          let state = state |> GameObjectTool.disposeGameObject(gameObject1);
          let {disposedIndexArray}: arcballCameraControllerRecord =
            state.arcballCameraControllerRecord;
          (
            disposedIndexArray |> Js.Array.includes(cameraController1),
            disposedIndexArray |> Js.Array.includes(cameraController2),
          )
          |> expect == (true, false);
        });
        test("dispose sourceInstance component", () => {
          open SourceInstanceType;
          let (state, gameObject, sourceInstance) =
            SourceInstanceTool.createSourceInstanceGameObject(state^);
          let state =
            state
            |> VboBufferTool.addVboBufferToSourceInstanceBufferMap(
                 sourceInstance,
               );
          let state = state |> GameObjectTool.disposeGameObject(gameObject);
          let {disposedIndexArray} = state |> SourceInstanceTool.getRecord;
          disposedIndexArray |> expect == [|sourceInstance|];
        });
        test("dispose objectInstance component", () => {
          open ObjectInstanceType;
          let (
            state,
            gameObject,
            sourceInstance,
            objectInstanceGameObject,
            objectInstance,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObject(objectInstanceGameObject);
          let {disposedIndexArray} =
            state |> ObjectInstanceTool.getObjectInstanceRecord;
          disposedIndexArray |> expect == [|objectInstance|];
        });
      });

      describe("replace components", () => {
        test("replace basic material component", () => {
          let (state, gameObject1, (material1, _)) =
            BasicMaterialTool.createGameObjectWithMap(state^);

          let state =
            GameObjectAPI.disposeGameObjectBasicMaterialComponent(
              gameObject1,
              material1,
              state,
            );
          let (state, material2, _) =
            BasicMaterialTool.createMaterialWithMap(state);
          let state =
            GameObjectAPI.addGameObjectBasicMaterialComponent(
              gameObject1,
              material2,
              state,
            );

          GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent(
            gameObject1,
            state,
          )
          |> expect == material2;
        });

        test("replace light material component", () => {
          let (state, gameObject1, (material1, _)) =
            LightMaterialTool.createGameObjectWithMap(state^);

          let state =
            GameObjectAPI.disposeGameObjectLightMaterialComponent(
              gameObject1,
              material1,
              state,
            );
          let (state, material2, _) =
            LightMaterialTool.createMaterialWithMap(state);
          let state =
            GameObjectAPI.addGameObjectLightMaterialComponent(
              gameObject1,
              material2,
              state,
            );

          GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
            gameObject1,
            state,
          )
          |> expect == material2;
        });

        test("replace geometry component", () => {
          let (state, gameObject1, geometry1) =
            GeometryTool.createGameObject(state^);

          let state =
            GameObjectAPI.disposeGameObjectGeometryComponent(
              gameObject1,
              geometry1,
              state,
            );
          let (state, geometry2) = GeometryAPI.createGeometry(state);
          let state =
            GameObjectAPI.addGameObjectGeometryComponent(
              gameObject1,
              geometry2,
              state,
            );

          GameObjectAPI.unsafeGetGameObjectGeometryComponent(
            gameObject1,
            state,
          )
          |> expect == geometry2;
        });
        /* TODO test more... */
      });

      describe("test reallocate gameObject", () => {
        describe(
          "if have dispose too many gameObjects, reallocate gameObject", () => {
          describe("reallocate name map", () =>
            test("new nameMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1) = createGameObject(state);
              let (state, gameObject2) = createGameObject(state);
              let (state, gameObject3) = createGameObject(state);
              let name = "a1";
              let state =
                state
                |> GameObjectAPI.setGameObjectName(gameObject1, name)
                |> GameObjectAPI.setGameObjectName(gameObject2, name)
                |> GameObjectAPI.setGameObjectName(gameObject3, name);

              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);

              let {nameMap} = GameObjectTool.getGameObjectRecord(state);
              (
                nameMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                nameMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                nameMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            })
          );

          describe("reallocate isActive map", () =>
            test("new isActiveMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1) = createGameObject(state);
              let (state, gameObject2) = createGameObject(state);
              let (state, gameObject3) = createGameObject(state);
              let state =
                state
                |> GameObjectAPI.setGameObjectIsActive(gameObject1, true)
                |> GameObjectAPI.setGameObjectIsActive(gameObject2, true)
                |> GameObjectAPI.setGameObjectIsActive(gameObject3, true);

              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);

              let {isActiveMap} = GameObjectTool.getGameObjectRecord(state);
              (
                isActiveMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                isActiveMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                isActiveMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            })
          );

          describe("reallocate isRoot map", () =>
            test("new isRootMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1) = createGameObject(state);
              let (state, gameObject2) = createGameObject(state);
              let (state, gameObject3) = createGameObject(state);
              let state =
                state
                |> GameObjectAPI.setGameObjectIsRoot(gameObject1, true)
                |> GameObjectAPI.setGameObjectIsRoot(gameObject2, true)
                |> GameObjectAPI.setGameObjectIsRoot(gameObject3, true);

              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);

              let {isRootMap} = GameObjectTool.getGameObjectRecord(state);
              (
                isRootMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                isRootMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                isRootMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            })
          );

          describe("reallocate component maps", () => {
            test("new transformMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1) = createGameObject(state);
              let (state, gameObject2) = createGameObject(state);
              let (state, gameObject3) = createGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);
              let {transformMap} = GameObjectTool.getGameObjectRecord(state);
              (
                transformMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                transformMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                transformMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            });
            test("new scriptMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1, script1) =
                ScriptTool.createGameObject(state);
              let (state, gameObject2, script2) =
                ScriptTool.createGameObject(state);
              let (state, gameObject3, script3) =
                ScriptTool.createGameObject(state);

              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);

              let {scriptMap} = GameObjectTool.getGameObjectRecord(state);
              (
                scriptMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                scriptMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                scriptMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            });
            test("new meshRendererMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1, meshRenderer1) =
                MeshRendererTool.createBasicMaterialGameObject(state);
              let (state, gameObject2, meshRenderer2) =
                MeshRendererTool.createBasicMaterialGameObject(state);
              let (state, gameObject3, meshRenderer3) =
                MeshRendererTool.createBasicMaterialGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);
              let {meshRendererMap} =
                GameObjectTool.getGameObjectRecord(state);
              (
                meshRendererMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                meshRendererMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                meshRendererMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            });
            describe("test current component data map", () =>
              test("new geometryMap should only has alive data", () => {
                open GameObjectType;
                let state = TestTool.initWithoutBuildFakeDom(~sandbox, ());

                let state =
                  SettingTool.setMemory(state, ~maxDisposeCount=2, ());
                let (state, gameObject1, geometry1) =
                  BoxGeometryTool.createGameObject(state);
                let (state, gameObject2, geometry2) =
                  BoxGeometryTool.createGameObject(state);
                let (state, gameObject3, geometry3) =
                  BoxGeometryTool.createGameObject(state);
                /*let state = state |> BoxGeometryTool.initGeometrys;*/
                let {geometryMap as oldCurrentGeometryDataMap} =
                  GameObjectTool.getGameObjectRecord(state);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject1);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject2);
                let {geometryMap} =
                  GameObjectTool.getGameObjectRecord(state);
                (
                  ArrayTool.isArraySame(
                    geometryMap,
                    oldCurrentGeometryDataMap,
                  ),
                  geometryMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                  geometryMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                  geometryMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
                )
                |> expect == (false, false, false, true);
              })
            );
            describe("test geometry map", () =>
              test("new geometryMap should only has alive data", () => {
                open GameObjectType;
                let state = TestTool.initWithoutBuildFakeDom(~sandbox, ());

                let state =
                  SettingTool.setMemory(state, ~maxDisposeCount=2, ());
                let (state, gameObject1, geometry1) =
                  BoxGeometryTool.createGameObject(state);
                let (state, gameObject2, geometry2) =
                  BoxGeometryTool.createGameObject(state);
                let (state, gameObject3, geometry3) =
                  BoxGeometryTool.createGameObject(state);
                /*let state = state |> BoxGeometryTool.initGeometrys;*/
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject1);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject2);
                let {geometryMap} =
                  GameObjectTool.getGameObjectRecord(state);
                (
                  geometryMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                  geometryMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                  geometryMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
                )
                |> expect == (false, false, true);
              })
            );
            describe("test material map", () => {
              test("new basicMaterialMap should only has alive data", () => {
                open GameObjectType;
                let state =
                  SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                let (state, gameObject1, material1) =
                  BasicMaterialTool.createGameObject(state);
                let (state, gameObject2, material2) =
                  BasicMaterialTool.createGameObject(state);
                let (state, gameObject3, material3) =
                  BasicMaterialTool.createGameObject(state);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject1);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject2);
                let {basicMaterialMap} =
                  GameObjectTool.getGameObjectRecord(state);
                (
                  basicMaterialMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                  basicMaterialMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                  basicMaterialMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
                )
                |> expect == (false, false, true);
              });
              test("new lightMaterialMap should only has alive data", () => {
                open GameObjectType;
                let state =
                  SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                let (state, gameObject1, material1) =
                  LightMaterialTool.createGameObject(state);
                let (state, gameObject2, material2) =
                  LightMaterialTool.createGameObject(state);
                let (state, gameObject3, material3) =
                  LightMaterialTool.createGameObject(state);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject1);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject2);
                let {lightMaterialMap} =
                  GameObjectTool.getGameObjectRecord(state);
                (
                  lightMaterialMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                  lightMaterialMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                  lightMaterialMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
                )
                |> expect == (false, false, true);
              });
            });
            describe("test light map", () => {
              let _test = (createGameObjectFunc, getDataMapFunc, state) => {
                open GameObjectType;
                let state =
                  SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
                let (state, gameObject1, light1) =
                  createGameObjectFunc(state);
                let (state, gameObject2, light2) =
                  createGameObjectFunc(state);
                let (state, gameObject3, light3) =
                  createGameObjectFunc(state);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject1);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject2);
                let lightMap =
                  getDataMapFunc(GameObjectTool.getGameObjectRecord(state));
                (
                  lightMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                  lightMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                  lightMap
                  |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
                )
                |> expect == (false, false, true);
              };
              test("new directionLightMap should only has alive data", () =>
                GameObjectType.(
                  _test(
                    DirectionLightTool.createGameObject,
                    ({directionLightMap}) => directionLightMap,
                    state,
                  )
                )
              );
              test("new pointLightMap should only has alive data", () =>
                GameObjectType.(
                  _test(
                    PointLightTool.createGameObject,
                    ({pointLightMap}) => pointLightMap,
                    state,
                  )
                )
              );
            });
            test("new basicCameraViewMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1, _, basicCameraView1) =
                CameraTool.createCameraGameObject(state);
              let (state, gameObject2, _, basicCameraView2) =
                CameraTool.createCameraGameObject(state);
              let (state, gameObject3, _, basicCameraView3) =
                CameraTool.createCameraGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);
              let {basicCameraViewMap} =
                GameObjectTool.getGameObjectRecord(state);
              (
                basicCameraViewMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                basicCameraViewMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                basicCameraViewMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            });

            test(
              "new perspectiveCameraProjectionMap should only has alive data",
              () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1, _, perspectiveCameraProjection1) =
                CameraTool.createCameraGameObject(state);
              let (state, gameObject2, _, perspectiveCameraProjection2) =
                CameraTool.createCameraGameObject(state);
              let (state, gameObject3, _, perspectiveCameraProjection3) =
                CameraTool.createCameraGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);
              let {perspectiveCameraProjectionMap} =
                GameObjectTool.getGameObjectRecord(state);
              (
                perspectiveCameraProjectionMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                perspectiveCameraProjectionMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                perspectiveCameraProjectionMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            });
            test(
              "new arcballCameraControllerMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1, _, _) =
                ArcballCameraControllerTool.createGameObject(state);
              let (state, gameObject2, _, _) =
                ArcballCameraControllerTool.createGameObject(state);
              let (state, gameObject3, _, _) =
                ArcballCameraControllerTool.createGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);
              let {arcballCameraControllerMap} =
                GameObjectTool.getGameObjectRecord(state);
              (
                arcballCameraControllerMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                arcballCameraControllerMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                arcballCameraControllerMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              )
              |> expect == (false, false, true);
            });

            test("new sourceInstanceMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
              let (state, gameObject1, _) =
                SourceInstanceTool.createSourceInstanceGameObject(state);
              let (state, gameObject2, _) =
                SourceInstanceTool.createSourceInstanceGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let {sourceInstanceMap} =
                GameObjectTool.getGameObjectRecord(state);
              (
                sourceInstanceMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                sourceInstanceMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
              )
              |> expect == (false, true);
            });
            test("new objectInstanceMap should only has alive data", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
              let (state, _, _, objectInstanceGameObject1, _) =
                ObjectInstanceTool.createObjectInstanceGameObject(state);
              let (state, _, _, objectInstanceGameObject2, _) =
                ObjectInstanceTool.createObjectInstanceGameObject(state);
              let state =
                state
                |> GameObjectTool.disposeGameObject(objectInstanceGameObject1);
              let {objectInstanceMap} =
                GameObjectTool.getGameObjectRecord(state);
              (
                objectInstanceMap
                |> WonderCommonlib.MutableSparseMapService.has(
                     objectInstanceGameObject1,
                   ),
                objectInstanceMap
                |> WonderCommonlib.MutableSparseMapService.has(
                     objectInstanceGameObject2,
                   ),
              )
              |> expect == (false, true);
            });
          });
          describe("test reallocate twice", () =>
            test("test reallocate component maps", () => {
              open GameObjectType;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              let (state, gameObject1) = createGameObject(state);
              let (state, gameObject2) = createGameObject(state);
              let (state, gameObject3) = createGameObject(state);
              let (state, gameObject4) = createGameObject(state);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject1);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject2);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject3);
              let state =
                state |> GameObjectTool.disposeGameObject(gameObject4);
              let {transformMap} = GameObjectTool.getGameObjectRecord(state);
              (
                transformMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
                transformMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
                transformMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
                transformMap
                |> WonderCommonlib.MutableSparseMapService.has(gameObject4),
              )
              |> expect == (false, false, false, false);
            })
          );
          test("empty disposedUidMap", () => {
            open GameObjectType;
            let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
            let (state, gameObject1) = createGameObject(state);
            let (state, gameObject2) = createGameObject(state);
            let (state, gameObject3) = createGameObject(state);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject1);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject2);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject3);
            let {disposedUidMap} = GameObjectTool.getGameObjectRecord(state);
            (
              disposedUidMap
              |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
              disposedUidMap
              |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
              disposedUidMap
              |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
            )
            |> expect == (false, false, true);
          });
          test("update aliveUidArray", () => {
            open GameObjectType;
            let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
            let (state, gameObject1) = createGameObject(state);
            let (state, gameObject2) = createGameObject(state);
            let (state, gameObject3) = createGameObject(state);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject1);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject2);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject3);
            let {aliveUidArray} = GameObjectTool.getGameObjectRecord(state);
            aliveUidArray
            |> expect == [|SceneAPI.getSceneGameObject(state), gameObject3|];
          });
        });
        describe("optimize: should only reallocate once in one loop", () => {
          test("test can correctly reallocate", () => {
            let (state, gameObject1, gameObject2, gameObject3) =
              ReallocateGameObjectCPUMemoryTool.prepareForOptimize(state);
            ReallocateGameObjectCPUMemoryTool.judgeForOptimize(
              state,
              gameObject1,
              gameObject2,
              gameObject3,
            );
          });
          test("test dispose sourceInstance", () => {
            open GameObjectType;

            TestTool.closeContractCheck();

            let state = SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
            let (
              state,
              gameObject1,
              sourceInstance1,
              objectInstanceGameObject1,
              objectInstance1,
            ) =
              ObjectInstanceTool.createObjectInstanceGameObject(state);
            let (
              state,
              gameObject2,
              sourceInstance2,
              objectInstanceGameObject2,
              objectInstance2,
            ) =
              ObjectInstanceTool.createObjectInstanceGameObject(state);
            let (
              state,
              gameObject3,
              sourceInstance3,
              objectInstanceGameObject3,
              objectInstance3,
            ) =
              ObjectInstanceTool.createObjectInstanceGameObject(state);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject1);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject2);
            let {objectInstanceMap} =
              GameObjectTool.getGameObjectRecord(state);
            (
              objectInstanceMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   objectInstanceGameObject1,
                 ),
              objectInstanceMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   objectInstanceGameObject2,
                 ),
              objectInstanceMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   objectInstanceGameObject3,
                 ),
            )
            |> expect == (false, false, true);
          });
        });
      });
    });

    describe("disposeKeepOrder", () =>
      test("not change its current parent's children order", () =>
        GameObjectTool.testDisposeKeepOrder(
          GameObjectAPI.disposeGameObjectKeepOrder,
          state,
        )
      )
    );

    describe("disposeGameObjectKeepOrderRemoveGeometry", () => {
      test("not change its current parent's children order", () =>
        GameObjectTool.testDisposeKeepOrder(
          GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometry,
          state,
        )
      );
      test("remove geometry component instead of dispose", () => {
        let (
          state,
          gameObject1,
          geometry1,
          (vertices1, texCoords1, normals1, indices1),
        ) =
          GeometryTool.createGameObjectAndSetPointData(state^);

        let state =
          state
          |> GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometry(
               gameObject1,
             );
        let state = DisposeJob.execJob(None, state);

        GeometryAPI.getGeometryVertices(geometry1, state)
        |> expect == vertices1;
      });
    });

    describe("disposeGameObjectKeepOrderRemoveMaterial", () => {
      test("not change its current parent's children order", () =>
        GameObjectTool.testDisposeKeepOrder(
          GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial,
          state,
        )
      );
      test("remove basicMaterial component instead of dispose", () => {
        let (state, gameObject1, basicMaterial1) =
          BasicMaterialTool.createGameObject(state^);

        let state =
          state
          |> GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
               gameObject1,
             );
        let state = DisposeJob.execJob(None, state);

        (
          BasicMaterialTool.hasGameObject(basicMaterial1, state),
          BasicMaterialAPI.getBasicMaterialColor(basicMaterial1, state),
        )
        |> expect == (false, BasicMaterialTool.getDefaultColor(state));
      });
      test("remove lightMaterial component instead of dispose", () => {
        let (state, gameObject1, lightMaterial1) =
          LightMaterialTool.createGameObject(state^);

        let state =
          state
          |> GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
               gameObject1,
             );
        let state = DisposeJob.execJob(None, state);

        (
          LightMaterialTool.hasGameObject(lightMaterial1, state),
          LightMaterialAPI.getLightMaterialDiffuseColor(
            lightMaterial1,
            state,
          ),
        )
        |> expect == (false, LightMaterialTool.getDefaultDiffuseColor(state));
      });
    });

    describe("disposeGameObjectDisposeGeometryRemoveMaterial", () => {
      test("gameObject shouldn't be alive", () => {
        let (state, gameObject1, _) =
          GameObjectTool.createGameObject(state^);

        let state =
          state
          |> GameObjectAPI.disposeGameObjectDisposeGeometryRemoveMaterial(
               gameObject1,
             );
        let state = DisposeJob.execJob(None, state);

        GameObjectTool.isAlive(gameObject1, state) |> expect == false;
      });
      test("remove lightMaterial component instead of dispose", () => {
        let (state, gameObject1, lightMaterial1) =
          LightMaterialTool.createGameObject(state^);

        let state =
          state
          |> GameObjectAPI.disposeGameObjectDisposeGeometryRemoveMaterial(
               gameObject1,
             );
        let state = DisposeJob.execJob(None, state);

        (
          LightMaterialTool.hasGameObject(lightMaterial1, state),
          LightMaterialAPI.getLightMaterialDiffuseColor(
            lightMaterial1,
            state,
          ),
        )
        |> expect == (false, LightMaterialTool.getDefaultDiffuseColor(state));
      });
      test("dispose geometry component instead of remove", () => {
        let (state, gameObject1, geometry1) =
          GeometryTool.createGameObject(state^);

        let state =
          state
          |> GameObjectAPI.disposeGameObjectDisposeGeometryRemoveMaterial(
               gameObject1,
             );
        let state = DisposeJob.execJob(None, state);

        (
          GeometryTool.hasGameObject(geometry1, state),
          GeometryTool.isGeometryDisposed(geometry1, state),
        )
        |> expect == (false, true);
      });
    });

    describe("disposeGameObjectRemoveTexture", () => {
      describe("test basicSourceTexture", () =>
        test("remove texture instead of dispose", () => {
          let (state, material, (diffuseMap, specularMap, source1, source2)) =
            LightMaterialTool.createMaterialWithMap(state^);
          let (state, gameObject, material) =
            LightMaterialTool.createGameObjectWithShareMaterial(
              material,
              state,
            );

          let state =
            state |> GameObjectAPI.disposeGameObjectRemoveTexture(gameObject);
          let state = DisposeJob.execJob(None, state);

          (
            BasicSourceTextureTool.hasMaterial(diffuseMap, material, state),
            BasicSourceTextureTool.hasMaterial(specularMap, material, state),
            BasicSourceTextureTool.getBasicSourceTextureSource(
              diffuseMap,
              state,
            ),
            BasicSourceTextureTool.getBasicSourceTextureSource(
              specularMap,
              state,
            ),
          )
          |> expect == (false, false, Some(source1), Some(source2));
        })
      );

      describe("test arrayBufferViewSourceTexture", () =>
        test("remove texture instead of dispose", () => {
          let (state, material, (diffuseMap, specularMap, source1, source2)) =
            LightMaterialTool.createMaterialWithArrayBufferViewMap(state^);
          let (state, gameObject, material) =
            LightMaterialTool.createGameObjectWithShareMaterial(
              material,
              state,
            );

          let state =
            state |> GameObjectAPI.disposeGameObjectRemoveTexture(gameObject);
          let state = DisposeJob.execJob(None, state);

          (
            ArrayBufferViewSourceTextureTool.hasMaterial(
              diffuseMap,
              material,
              state,
            ),
            ArrayBufferViewSourceTextureTool.hasMaterial(
              specularMap,
              material,
              state,
            ),
            ArrayBufferViewSourceTextureTool.getArrayBufferViewSourceTextureSource(
              diffuseMap,
              state,
            ),
            ArrayBufferViewSourceTextureTool.getArrayBufferViewSourceTextureSource(
              specularMap,
              state,
            ),
          )
          |> expect == (false, false, Some(source1), Some(source2));
        })
      );
    });

    describe("disposeGameObjectLightMaterialComponent", () =>
      test("dispose material->maps", () => {
        let (state, gameObject1, (material1, (texture1_1, texture1_2))) =
          LightMaterialTool.createGameObjectWithMap(state^);

        let state =
          state
          |> GameObjectAPI.disposeGameObjectLightMaterialComponent(
               gameObject1,
               material1,
             );
        let state = state |> DisposeJob.execJob(None);

        (
          BasicSourceTextureTool.isAlive(texture1_1, state),
          BasicSourceTextureTool.isAlive(texture1_2, state),
        )
        |> expect == (false, false);
      })
    );

    describe("disposeGameObjectLightMaterialComponentRemoveTexture", () =>
      test("remove material->maps", () => {
        let (state, gameObject1, (material1, (texture1_1, texture1_2))) =
          LightMaterialTool.createGameObjectWithMap(state^);

        let state =
          state
          |> GameObjectAPI.disposeGameObjectLightMaterialComponentRemoveTexture(
               gameObject1,
               material1,
             );
        let state = state |> DisposeJob.execJob(None);

        (
          BasicSourceTextureTool.isAlive(texture1_1, state),
          BasicSourceTextureTool.isAlive(texture1_2, state),
        )
        |> expect == (true, true);
      })
    );

    describe("test batchDispose gameObject", ()
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

                   open GameObjectType;
                   let (state, gameObject1, light1) = createGameObjectFunc(state^);
                   let (state, gameObject2, light2) = createGameObjectFunc(state);
                   let state =
                     state |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                   (isAliveFunc(light1, state), isAliveFunc(light2, state))
                   |> expect == (false, false)
                 };
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

                     open GameObjectType;
                     let (state, gameObject1, geometry1) =
                       GeometryTool.createGameObject(state^);
                     let (state, gameObject2, geometry2) =
                       GeometryTool.createGameObject(state);
                     let state =
                       state
                       |> GameObjectTool.batchDisposeGameObject([|gameObject1, gameObject2|]);
                     (
                       GeometryTool.isGeometryDisposed(geometry1, state),
                       GeometryTool.isGeometryDisposed(geometry2, state)
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
                           |> WonderCommonlib.MutableSparseMapService.has(objectInstanceArr[0]),
                           sourceInstanceMap
                           |> WonderCommonlib.MutableSparseMapService.has(objectInstanceArr[1]),
                           gameObjectMap
                           |> WonderCommonlib.MutableSparseMapService.has(objectInstanceArr[0]),
                           sourceInstanceMap
                           |> WonderCommonlib.MutableSparseMapService.has(objectInstanceArr[1])
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
                           |> WonderCommonlib.MutableSparseMapService.has(sourceInstanceArr[0]),
                           matrixInstanceBufferMap
                           |> WonderCommonlib.MutableSparseMapService.has(sourceInstanceArr[1])
                         )
                         |> expect == (false, false)
                       }
                     ) */
                   }
                 )
             )
           }
         ); */
      =>
        describe("test reallocate gameObject", () =>
          test(
            "if have dispose too many gameObjects, reallocate gameObject", () => {
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
                   gameObject4,
                 |]);
            let {transformMap, disposeCount} =
              GameObjectTool.getGameObjectRecord(state);
            (
              disposeCount,
              transformMap
              |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
              transformMap
              |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
              transformMap
              |> WonderCommonlib.MutableSparseMapService.has(gameObject3),
              transformMap
              |> WonderCommonlib.MutableSparseMapService.has(gameObject4),
            )
            |> expect == (0, false, false, false, false);
          })
        )
      );

    describe("initGameObject", () =>
      describe("init components", () => {
        beforeEach(() =>
          state :=
            InitBasicMaterialJobTool.initWithJobConfigWithoutBuildFakeDom(
              sandbox,
              NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
            )
        );
        test("init basic material component", () => {
          let (state, gameObject, _, _) =
            InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
          let attachShader = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~attachShader, ()),
               );
          let state = AllMaterialTool.prepareForInit(state);
          let state = state |> initGameObject(gameObject);
          getCallCount(attachShader) |> expect == 2;
        });
        test("init light material component", () => {
          let (state, gameObject, _, _) =
            InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
          let attachShader = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~attachShader, ()),
               );
          let state = AllMaterialTool.prepareForInit(state);
          let state = state |> initGameObject(gameObject);
          getCallCount(attachShader) |> expect == 2;
        });

        describe("init maps", () => {
          describe("init basic material->map", () => {
            test("if has no map, not init map", () => {
              let (state, gameObject, _, _) =
                InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
              let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                   );
              let state = AllMaterialTool.prepareForInit(state);
              let state = state |> initGameObject(gameObject);
              getCallCount(createTexture) |> expect == 0;
            });
            test("else, init map", () => {
              let (state, gameObject, _, _) =
                InitBasicMaterialJobTool.prepareGameObjectWithCreatedMap(
                  sandbox,
                  state^,
                );
              let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                   );
              let state = AllMaterialTool.prepareForInit(state);
              let state = state |> initGameObject(gameObject);
              getCallCount(createTexture) |> expect == 1;
            });
          });
          describe("init light material->map", () => {
            describe("test basic source texture", () => {
              test("if has no map, not init map", () => {
                let (state, gameObject, _, _) =
                  InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
                let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                let state = state |> initGameObject(gameObject);
                getCallCount(createTexture) |> expect == 0;
              });
              test("else, init map", () => {
                let (state, gameObject, _, _) =
                  InitLightMaterialJobTool.prepareGameObjectWithCreatedMap(
                    sandbox,
                    state^,
                  );
                let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                let state = state |> initGameObject(gameObject);
                getCallCount(createTexture) |> expect == 2;
              });
            });
            describe("test arrayBufferView source texture", () =>
              test("test init map", () => {
                let (state, texture1) =
                  ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                    state^,
                  );
                let (state, texture2) =
                  ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                    state,
                  );
                let (state, gameObject, _, _) =
                  InitLightMaterialJobTool.prepareGameObjectWithMap(
                    sandbox,
                    texture1,
                    texture2,
                    state,
                  );
                let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                     );
                let state = AllMaterialTool.prepareForInit(state);
                let state = state |> initGameObject(gameObject);
                getCallCount(createTexture) |> expect == 2;
              })
            );
          });
        });

        test("init perspectiveCameraProjection component", () => {
          let (state, gameObject, _, (_, cameraProjection)) =
            CameraTool.createCameraGameObject(state^);

          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = AllMaterialTool.prepareForInit(state);
          let state = state |> initGameObject(gameObject);

          PerspectiveCameraProjectionTool.unsafeGetPMatrix(
            cameraProjection,
            state,
          )
          |> expect
          == Js.Typed_array.Float32Array.make([|
               1.7320507764816284,
               0.,
               0.,
               0.,
               0.,
               1.7320507764816284,
               0.,
               0.,
               0.,
               0.,
               (-1.0002000331878662),
               (-1.),
               0.,
               0.,
               (-0.20002000033855438),
               0.,
             |]);
        });

        test("exec script component->all init event functions", () => {
          let (state, gameObject, script) =
            ScriptTool.createGameObject(state^);
          let state =
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
              ~script,
              ~state,
              (),
            );
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = AllMaterialTool.prepareForInit(state);

          let state = state |> initGameObject(gameObject);

          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.judgeExecInitEventFunc(
            script,
            state,
          );
        });
      })
    );

    describe("contract check: is alive", () =>
      describe("if gameObject is disposed", () => {
        let _getErrorMsg = () => "expect gameObject alive, but actual not";
        let _testTwoParamFunc = func => {
          let (state, gameObject) = createGameObject(state^);
          let state = state |> GameObjectTool.disposeGameObject(gameObject);
          expect(() =>
            func(gameObject, state)
          )
          |> toThrowMessage(_getErrorMsg());
        };
        let _testThreeParmFunc = func => {
          let (state, gameObject) = createGameObject(state^);
          let state = state |> GameObjectTool.disposeGameObject(gameObject);
          expect(() =>
            func(Obj.magic(gameObject), Obj.magic(1), state)
          )
          |> toThrowMessage(_getErrorMsg());
        };
        let _testFourParmFunc = func => {
          let (state, gameObject) = createGameObject(state^);
          let state = state |> GameObjectTool.disposeGameObject(gameObject);
          expect(() =>
            func(Obj.magic(gameObject), Obj.magic(1), Obj.magic(2), state)
          )
          |> toThrowMessage(_getErrorMsg());
        };
        test("unsafeGetGameObjectTransformComponent should error", () =>
          _testTwoParamFunc(unsafeGetGameObjectTransformComponent)
        );
        test("unsafeGetGameObjectBasicMaterialComponent should error", () =>
          _testTwoParamFunc(unsafeGetGameObjectBasicMaterialComponent)
        );
        test("unsafeGetGameObjectLightMaterialComponent should error", () =>
          _testTwoParamFunc(unsafeGetGameObjectLightMaterialComponent)
        );
        test("unsafeGetGameObjectMeshRendererComponent should error", () =>
          _testTwoParamFunc(unsafeGetGameObjectMeshRendererComponent)
        );
        test("unsafeGetGeometryComponent should error", () =>
          _testTwoParamFunc(unsafeGetGameObjectGeometryComponent)
        );
        test("unsafeGetGameObjectBasicCameraViewComponent should error", () =>
          _testTwoParamFunc(unsafeGetGameObjectBasicCameraViewComponent)
        );
        test("disposeGameObject should error", () =>
          _testTwoParamFunc(disposeGameObject)
        );
        test("batchDisposeGameObject should error", () => {
          let (state, gameObject) = createGameObject(state^);
          let state = state |> GameObjectTool.disposeGameObject(gameObject);
          expect(() =>
            GameObjectAPI.batchDisposeGameObject([|gameObject|], state)
          )
          |> toThrowMessage(_getErrorMsg());
        });
        test("initGameObject should error", () =>
          _testTwoParamFunc(initGameObject)
        );
        test("hasGameObjectGeometryComponent should error", () =>
          _testTwoParamFunc(hasGameObjectGeometryComponent)
        );
        test("addGameObjectTransformComponent should error", () =>
          _testThreeParmFunc(addGameObjectTransformComponent)
        );
        test("disposeGameObjectTransformComponent should error", () =>
          _testFourParmFunc(disposeGameObjectTransformComponent)
        );
        test("addGameObjectBasicCameraViewComponent should error", () =>
          _testThreeParmFunc(addGameObjectBasicCameraViewComponent)
        );
        test("disposeGameObjectBasicCameraViewComponent should error", () =>
          _testThreeParmFunc(disposeGameObjectBasicCameraViewComponent)
        );
        test("addGameObjectBasicMaterialComponent should error", () =>
          _testThreeParmFunc(addGameObjectBasicMaterialComponent)
        );
        test("disposeGameObjectBasicMaterialComponent should error", () =>
          _testThreeParmFunc(disposeGameObjectBasicMaterialComponent)
        );
        test("addGameObjectLightMaterialComponent should error", () =>
          _testThreeParmFunc(addGameObjectLightMaterialComponent)
        );
        test("disposeGameObjectLightMaterialComponent should error", () =>
          _testThreeParmFunc(disposeGameObjectLightMaterialComponent)
        );
        test("addGameObjectMeshRendererComponent should error", () =>
          _testThreeParmFunc(addGameObjectMeshRendererComponent)
        );
        test("disposeGameObjectMeshRendererComponent should error", () =>
          _testThreeParmFunc(disposeGameObjectMeshRendererComponent)
        );
        test("addGameObjectGeometryComponent should error", () =>
          _testThreeParmFunc(addGameObjectGeometryComponent)
        );
        test("addGameObjectGeometryComponent should error", () =>
          _testThreeParmFunc(addGameObjectGeometryComponent)
        );
        test("disposeGameObjectGeometryComponentshould error", () =>
          _testThreeParmFunc(disposeGameObjectGeometryComponent)
        );
      })
    );
  });