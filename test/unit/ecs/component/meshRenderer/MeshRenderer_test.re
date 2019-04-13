open MeshRendererAPI;

open Wonder_jest;

let _ =
  describe("MeshRenderer", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _prepareOne = state =>
      MeshRendererTool.createBasicMaterialGameObject(state);
    let _prepareTwo = state => {
      let (state, gameObject1, meshRenderer1) =
        MeshRendererTool.createBasicMaterialGameObject(state);
      let (state, gameObject2, meshRenderer2) =
        MeshRendererTool.createBasicMaterialGameObject(state);
      (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2);
    };
    let _prepareThree = state => {
      let (state, gameObject1, meshRenderer1) =
        MeshRendererTool.createBasicMaterialGameObject(state);
      let (state, gameObject2, meshRenderer2) =
        MeshRendererTool.createBasicMaterialGameObject(state);
      let (state, gameObject3, meshRenderer3) =
        MeshRendererTool.createLightMaterialGameObject(state);
      (
        state,
        gameObject1,
        meshRenderer1,
        gameObject2,
        meshRenderer2,
        gameObject3,
        meshRenderer3,
      );
    };
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("getMeshRendererDrawMode", () =>
      test("default value is TRIANGLES", () => {
        let (state, gameObject1, meshRenderer1) = _prepareOne(state^);

        getMeshRendererDrawMode(meshRenderer1, state)
        |> expect == MeshRendererTool.getTriangles();
      })
    );

    describe("setMeshRendererDrawMode", () =>
      test("set draw mode", () => {
        let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
        let state =
          state
          |> MeshRendererAPI.setMeshRendererDrawMode(
               meshRenderer1,
               MeshRendererTool.getLines(),
             );

        getMeshRendererDrawMode(meshRenderer1, state)
        |> expect == MeshRendererTool.getLines();
      })
    );

    describe("getMeshRendererIsRender", () =>
      test("default value is render", () => {
        let (state, gameObject1, meshRenderer1) = _prepareOne(state^);

        getMeshRendererIsRender(meshRenderer1, state) |> expect == true;
      })
    );

    describe("setMeshRendererIsRender", () => {
      describe("if meshRenderer->gameObject isn't active", () => {
        test("set meshRenderer->isRender to true should warn", () => {
          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              Console.console,
              "warn",
            );
          let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
          let state =
            state |> GameObjectAPI.setGameObjectIsActive(gameObject1, false);

          let state =
            state
            |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, true);

          warn
          |> withOneArg(
               {j|meshRenderer:$meshRenderer1 -> gameObject:$gameObject1 isn't active, can't set meshRenderer->isRender to true|j},
             )
          |> expect
          |> toCalledOnce;
        });
        test("set meshRenderer->isRender to true should not work", () => {
          let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
          let state =
            state |> GameObjectAPI.setGameObjectIsActive(gameObject1, false);

          let state =
            state
            |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, true);

          getMeshRendererIsRender(meshRenderer1, state) |> expect == false;
        });
      });

      describe("else, set meshRenderer->isRender to true should work", () => {
        test("set is render", () => {
          let (state, gameObject1, meshRenderer1) = _prepareOne(state^);

          let state =
            state
            |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, false);

          getMeshRendererIsRender(meshRenderer1, state) |> expect == false;
        });
        test("if isRender === false, remove from renderIndexArray", () => {
          let (state, gameObject1, meshRenderer1) = _prepareOne(state^);

          let state =
            state
            |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, false);

          state
          |> MeshRendererTool.getBasicMaterialRenderGameObjectArray
          |> expect == [||];
        });
        test("if isRender === true, add to renderIndexArray", () => {
          let (state, gameObject1, meshRenderer1) = _prepareOne(state^);

          let state =
            state
            |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, false);
          let state =
            state
            |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, true);

          state
          |> MeshRendererTool.getBasicMaterialRenderGameObjectArray
          |> expect == [|gameObject1|];
        });

        describe("test isRender not change", () => {
          test("test isRender === false", () => {
            let (state, gameObject1, meshRenderer1) = _prepareOne(state^);

            let state =
              state
              |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, false);
            let state =
              state
              |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, false);

            state
            |> MeshRendererTool.getBasicMaterialRenderGameObjectArray
            |> expect == [||];
          });
          test("test isRender === true", () => {
            let (state, gameObject1, meshRenderer1) = _prepareOne(state^);

            let state =
              state
              |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, true);
            let state =
              state
              |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer1, true);

            state
            |> MeshRendererTool.getBasicMaterialRenderGameObjectArray
            |> expect == [|gameObject1|];
          });
        });
      });
    });

    describe("getBasicMaterialRenderGameObjectArray", () =>
      test(
        "get array of gameObject which has meshRenderer component and basicMaterial component",
        () => {
          let (
            state,
            gameObject1,
            meshRenderer1,
            gameObject2,
            meshRenderer2,
            gameObject3,
            meshRenderer3,
          ) =
            _prepareThree(state^);
          state
          |> MeshRendererTool.getBasicMaterialRenderGameObjectArray
          |> expect == [|gameObject1, gameObject2|];
        },
      )
    );

    describe("getLightMaterialRenderGameObjectArray", () =>
      test(
        "get array of gameObject which has meshRenderer component and lightMaterial component",
        () => {
          let (
            state,
            gameObject1,
            meshRenderer1,
            gameObject2,
            meshRenderer2,
            gameObject3,
            meshRenderer3,
          ) =
            _prepareThree(state^);
          state
          |> MeshRendererTool.getLightMaterialRenderGameObjectArray
          |> expect == [|gameObject3|];
        },
      )
    );

    describe("test add component", () =>
      describe(
        "should add meshRenderer component after add material component", () => {
        test("test basic material", () => {
          open MeshRendererAPI;
          open GameObjectAPI;
          let (state, meshRenderer) = createMeshRenderer(state^);
          let (state, gameObject) = state |> createGameObject;
          expect(() => {
            let state =
              state
              |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
            ();
          })
          |> toThrowMessage(
               "should add material component before add meshRenderer component",
             );
        });
        test("test light material", () => {
          open MeshRendererAPI;
          open GameObjectAPI;
          let (state, meshRenderer) = createMeshRenderer(state^);
          let (state, gameObject) = state |> createGameObject;
          expect(() => {
            let state =
              state
              |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
            ();
          })
          |> toThrowMessage(
               "should add material component before add meshRenderer component",
             );
        });
      })
    );

    describe("disposeComponent", () => {
      describe("dispose data", () => {
        test("remove from gameObjectMap", () => {
          open MeshRendererType;
          let (state, gameObject1, meshRenderer1) =
            MeshRendererTool.createBasicMaterialGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                 gameObject1,
                 meshRenderer1,
               );
          let {gameObjectMap} = MeshRendererTool.getRecord(state);
          gameObjectMap
          |> WonderCommonlib.MutableSparseMapService.has(meshRenderer1)
          |> expect == false;
        });
        describe("remove from basicMaterialRenderGameObjectArray", () => {
          test("test getBasicMaterialRenderGameObjectArray", () => {
            let (
              state,
              gameObject1,
              meshRenderer1,
              gameObject2,
              meshRenderer2,
            ) =
              _prepareTwo(state^);
            let state =
              state
              |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                   gameObject1,
                   meshRenderer1,
                 );
            state
            |> MeshRendererTool.getBasicMaterialRenderGameObjectArray
            |> expect == [|gameObject2|];
          });
          test("test add gameObject after dispose", () => {
            let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
            let state =
              state
              |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                   gameObject1,
                   meshRenderer1,
                 );
            let (state, gameObject2, meshRenderer2) = _prepareOne(state);
            state
            |> MeshRendererTool.getBasicMaterialRenderGameObjectArray
            |> expect == [|gameObject2|];
          });
        });
        describe("remove from lightMaterialRenderGameObjectArray", () => {
          let _prepare = state => {
            let (state, gameObject1, meshRenderer1) =
              MeshRendererTool.createBasicMaterialGameObject(state);
            let (state, gameObject2, meshRenderer2) =
              MeshRendererTool.createLightMaterialGameObject(state);
            let (state, gameObject3, meshRenderer3) =
              MeshRendererTool.createLightMaterialGameObject(state);
            (
              state,
              gameObject1,
              meshRenderer1,
              gameObject2,
              meshRenderer2,
              gameObject3,
              meshRenderer3,
            );
          };
          test("test getLightMaterialRenderGameObjectArray", () => {
            let (
              state,
              gameObject1,
              meshRenderer1,
              gameObject2,
              meshRenderer2,
              gameObject3,
              meshRenderer3,
            ) =
              _prepare(state^);
            let state =
              state
              |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                   gameObject2,
                   meshRenderer2,
                 );
            state
            |> MeshRendererTool.getLightMaterialRenderGameObjectArray
            |> expect == [|gameObject3|];
          });
          test("test add gameObject after dispose", () => {
            let (
              state,
              gameObject1,
              meshRenderer1,
              gameObject2,
              meshRenderer2,
              gameObject3,
              meshRenderer3,
            ) =
              _prepare(state^);
            let state =
              state
              |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                   gameObject2,
                   meshRenderer2,
                 );
            let (state, gameObject4, meshRenderer4) =
              MeshRendererTool.createLightMaterialGameObject(state);
            state
            |> MeshRendererTool.getLightMaterialRenderGameObjectArray
            |> expect == [|gameObject4, gameObject3|];
          });
        });
        describe("test remove from type array", () => {
          test("remove from drawModes", () => {
            let (state, gameObject1, meshRenderer1) =
              MeshRendererTool.createLightMaterialGameObject(state^);
            let (state, gameObject2, meshRenderer2) =
              MeshRendererTool.createLightMaterialGameObject(state);
            let drawMode1 = MeshRendererTool.getPoints();
            let drawMode2 = MeshRendererTool.getLines();
            let state =
              state
              |> MeshRendererAPI.setMeshRendererDrawMode(
                   meshRenderer1,
                   drawMode1,
                 );
            let state =
              state
              |> MeshRendererAPI.setMeshRendererDrawMode(
                   meshRenderer2,
                   drawMode2,
                 );
            let state =
              state
              |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                   gameObject1,
                   meshRenderer1,
                 );

            TestTool.closeContractCheck();
            (
              MeshRendererAPI.getMeshRendererDrawMode(meshRenderer1, state),
              MeshRendererAPI.getMeshRendererDrawMode(meshRenderer2, state),
            )
            |> expect == (MeshRendererTool.getDefaultDrawMode(), drawMode2);
          });
          test("remove from isRenders", () => {
            let (state, gameObject1, meshRenderer1) =
              MeshRendererTool.createLightMaterialGameObject(state^);
            let (state, gameObject2, meshRenderer2) =
              MeshRendererTool.createLightMaterialGameObject(state);
            let isRender1 = !MeshRendererTool.getDefaultIsRender();
            let isRender2 = !MeshRendererTool.getDefaultIsRender();
            let state =
              state
              |> MeshRendererAPI.setMeshRendererIsRender(
                   meshRenderer1,
                   isRender1,
                 );
            let state =
              state
              |> MeshRendererAPI.setMeshRendererIsRender(
                   meshRenderer2,
                   isRender2,
                 );
            let state =
              state
              |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                   gameObject1,
                   meshRenderer1,
                 );

            TestTool.closeContractCheck();
            (
              MeshRendererAPI.getMeshRendererIsRender(meshRenderer1, state),
              MeshRendererAPI.getMeshRendererIsRender(meshRenderer2, state),
            )
            |> expect == (MeshRendererTool.getDefaultIsRender(), isRender2);
          });
        });
      });
      test(
        "the disposed meshRenderer shouldn't affect other alive ones' record",
        () => {
        let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
          _prepareTwo(state^);
        let state =
          state
          |> GameObjectTool.disposeGameObjectMeshRendererComponent(
               gameObject1,
               meshRenderer1,
             );
        state
        |> MeshRendererAPI.unsafeGetMeshRendererGameObject(meshRenderer2)
        |> expect == gameObject2;
      });
      describe("test add new one after dispose old one", () => {
        test("use disposed index as new index firstly", () => {
          let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                 gameObject1,
                 meshRenderer1,
               );
          let (state, meshRenderer3) = createMeshRenderer(state);
          meshRenderer3 |> expect == meshRenderer1;
        });
        test(
          "if has no disposed index, get index from meshRendererRecord.index",
          () => {
          let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                 gameObject2,
                 meshRenderer2,
               );
          let (state, meshRenderer3) = createMeshRenderer(state);
          let (state, meshRenderer4) = createMeshRenderer(state);
          (meshRenderer3, meshRenderer4)
          |> expect == (meshRenderer2, meshRenderer2 + 1);
        });
      });
      describe("contract check", () =>
        test("expect dispose the alive component, but actual not", () => {
          let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                 gameObject1,
                 meshRenderer1,
               );
          expect(() => {
            let state =
              state
              |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                   gameObject1,
                   meshRenderer1,
                 );
            ();
          })
          |> toThrowMessage(
               "expect dispose the alive component, but actual not",
             );
        })
      );
    });
    describe("contract check: is alive", () =>
      describe("if meshRenderer is disposed", () =>
        test("unsafeGetMeshRendererGameObject should error", () => {
          let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                 gameObject1,
                 meshRenderer1,
               );
          expect(() =>
            unsafeGetMeshRendererGameObject(meshRenderer1, state)
          )
          |> toThrowMessage("expect component alive, but actual not");
        })
      )
    );
  });