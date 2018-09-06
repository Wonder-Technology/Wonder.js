open PerspectiveCameraProjectionAPI;

open StateDataMainType;

open PerspectiveCameraProjectionType;

open Wonder_jest;

let _ =
  describe("PerspectiveCameraProjection", () => {
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

    describe("createPerspectiveCameraProjection", () => {
      test("create a new camera which is just index(int)", () => {
        let (_, cameraProjection) =
          createPerspectiveCameraProjection(state^);
        expect(cameraProjection) == 0;
      });
      describe("change state", () =>
        test("state->index + 1", () => {
          let (state, _) = createPerspectiveCameraProjection(state^);
          state.perspectiveCameraProjectionRecord
          |> (record => expect(record.index) == 1);
        })
      );
      test("add to dirty array", () => {
        let (state, cameraProjection) =
          createPerspectiveCameraProjection(state^);
        state
        |> PerspectiveCameraProjectionTool.getDirtyArray
        |> expect == [|cameraProjection|];
      });
    });

    describe("getAllPerspectiveCameraProjections", () => {
      let _createPerspectiveCameraProjectionGameObjects = state => {
        let (state, gameObject1, _, (_, cameraProjection1)) =
          CameraTool.createCameraGameObject(state^);
        let (state, gameObject2, _, (_, cameraProjection2)) =
          CameraTool.createCameraGameObject(state);
        let (state, gameObject3, _, (_, cameraProjection3)) =
          CameraTool.createCameraGameObject(state);

        (
          state,
          (gameObject1, gameObject2, gameObject3),
          (cameraProjection1, cameraProjection2, cameraProjection3),
        );
      };

      test(
        "get all cameraProjections include the ones add or not add to gameObject",
        () => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (cameraProjection1, cameraProjection2, cameraProjection3),
        ) =
          _createPerspectiveCameraProjectionGameObjects(state);

        let (state, cameraProjection4) =
          PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection(
            state,
          );

        PerspectiveCameraProjectionAPI.getAllPerspectiveCameraProjections(
          state,
        )
        |>
        expect == [|
                    cameraProjection1,
                    cameraProjection2,
                    cameraProjection3,
                    cameraProjection4,
                  |];
      });
      test("test dispose", () => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (cameraProjection1, cameraProjection2, cameraProjection3),
        ) =
          _createPerspectiveCameraProjectionGameObjects(state);

        let state =
          state
          |> GameObjectAPI.disposeGameObject(gameObject2)
          |> GameObjectAPI.disposeGameObject(gameObject3);
        let state = state |> DisposeJob.execJob(None);

        GameObjectAPI.getAllPerspectiveCameraProjectionComponents(state)
        |> expect == [|cameraProjection1|];
      });
    });

    describe("markPerspectiveCameraProjectionDirty", () =>
      test("mark dirty", () => {
        let (state, gameObject1, _, (_, cameraProjection1)) =
          CameraTool.createCameraGameObject(state^);

        let state = state |> UpdateCameraJob.execJob(None);
        let state =
          PerspectiveCameraProjectionAPI.markPerspectiveCameraProjectionDirty(
            cameraProjection1,
            state,
          );

        PerspectiveCameraProjectionTool.getDirtyArray(state)
        |> expect == [|cameraProjection1|];
      })
    );

    describe("unsafeGetPerspectiveCameraProjectionGameObject", () =>
      test("get cameraProjection's gameObject", () => {
        open GameObjectAPI;
        let (state, cameraProjection) =
          createPerspectiveCameraProjection(state^);
        let (state, gameObject) = state |> GameObjectAPI.createGameObject;
        let state =
          state
          |> addGameObjectPerspectiveCameraProjectionComponent(
               gameObject,
               cameraProjection,
             );
        state
        |> unsafeGetPerspectiveCameraProjectionGameObject(cameraProjection)
        |> expect == gameObject;
      })
    );
    describe("dispose component", () => {
      let _prepareTwo = state => {
        let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
          CameraTool.createCameraGameObject(state);
        let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
          CameraTool.createCameraGameObject(state);
        (
          state,
          gameObject1,
          perspectiveCameraProjection1,
          gameObject2,
          perspectiveCameraProjection2,
        );
      };
      describe("dispose data", () => {
        test("dirtyArray: remove from array(include duplicated ones)", () => {
          open PerspectiveCameraProjectionType;
          let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
            CameraTool.createCameraGameObject(state^);
          let state =
            state
            |> setPerspectiveCameraProjectionNear(
                 perspectiveCameraProjection1,
                 0.1,
               )
            |> setPerspectiveCameraProjectionFar(
                 perspectiveCameraProjection1,
                 1000.,
               );

          let state =
            state
            |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                 gameObject1,
                 perspectiveCameraProjection1,
               );
          let {dirtyArray} = state.perspectiveCameraProjectionRecord;
          dirtyArray |> expect == [||];
        });
        test("remove from pMatrixMap, gameObjectMap", () => {
          open PerspectiveCameraProjectionType;
          let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
            CameraTool.createCameraGameObject(state^);
          let state =
            PerspectiveCameraProjectionTool.updateCameraProjection(
              perspectiveCameraProjection1,
              state,
            );
          let state =
            state
            |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                 gameObject1,
                 perspectiveCameraProjection1,
               );
          let {pMatrixMap, gameObjectMap} =
            state.perspectiveCameraProjectionRecord;
          (
            pMatrixMap
            |> WonderCommonlib.SparseMapService.has(
                 perspectiveCameraProjection1,
               ),
            gameObjectMap
            |> WonderCommonlib.SparseMapService.has(
                 perspectiveCameraProjection1,
               ),
          )
          |> expect == (false, false);
        });
        test("remove from nearMap, farMap, fovyMap, aspectMap", () => {
          let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
            CameraTool.createCameraGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                 gameObject1,
                 perspectiveCameraProjection1,
               );
          let {nearMap, farMap, fovyMap, aspectMap} as record =
            state.perspectiveCameraProjectionRecord;
          (
            nearMap
            |> WonderCommonlib.SparseMapService.has(
                 perspectiveCameraProjection1,
               ),
            farMap
            |> WonderCommonlib.SparseMapService.has(
                 perspectiveCameraProjection1,
               ),
            fovyMap
            |> WonderCommonlib.SparseMapService.has(
                 perspectiveCameraProjection1,
               ),
            aspectMap
            |> WonderCommonlib.SparseMapService.has(
                 perspectiveCameraProjection1,
               ),
          )
          |> expect == (false, false, false, false);
        });
      });
      describe("test add new one after dispose old one", () => {
        test("use disposed index as new index firstly", () => {
          let (
            state,
            gameObject1,
            perspectiveCameraProjection1,
            gameObject2,
            perspectiveCameraProjection2,
          ) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                 gameObject1,
                 perspectiveCameraProjection1,
               );
          let (state, gameObject3, _, (_, perspectiveCameraProjection3)) =
            CameraTool.createCameraGameObject(state);
          perspectiveCameraProjection3
          |> expect == perspectiveCameraProjection1;
        });
        test("if has no disposed index, get index from record.index", () => {
          let (
            state,
            gameObject1,
            perspectiveCameraProjection1,
            gameObject2,
            perspectiveCameraProjection2,
          ) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                 gameObject1,
                 perspectiveCameraProjection1,
               );
          let (state, gameObject3, _, (_, perspectiveCameraProjection3)) =
            CameraTool.createCameraGameObject(state);
          let (state, gameObject4, _, (_, perspectiveCameraProjection4)) =
            CameraTool.createCameraGameObject(state);
          (perspectiveCameraProjection3, perspectiveCameraProjection4)
          |>
          expect == (
                      perspectiveCameraProjection1,
                      perspectiveCameraProjection2 + 1,
                    );
        });
      });
      describe("contract check", () =>
        test("expect dispose the alive component, but actual not", () => {
          let (
            state,
            gameObject1,
            perspectiveCameraProjection1,
            gameObject2,
            perspectiveCameraProjection2,
          ) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                 gameObject1,
                 perspectiveCameraProjection1,
               );
          expect(() => {
            let state =
              state
              |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                   gameObject1,
                   perspectiveCameraProjection1,
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
      describe("if cameraProjection is disposed", () => {
        let _getErrorMsg = () => "expect component alive, but actual not";
        let _testGetFunc = getFunc => {
          open GameObjectAPI;
          let (state, gameObject, _, (_, cameraProjection)) =
            CameraTool.createCameraGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                 gameObject,
                 cameraProjection,
               );
          expect(() =>
            getFunc(cameraProjection, state)
          )
          |> toThrowMessage(_getErrorMsg());
        };
        let _testSetFunc = setFunc => {
          open GameObjectAPI;
          let (state, gameObject, _, (_, cameraProjection)) =
            CameraTool.createCameraGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
                 gameObject,
                 cameraProjection,
               );
          expect(() =>
            setFunc(cameraProjection, Obj.magic(0), state)
          )
          |> toThrowMessage(_getErrorMsg());
        };
        test("unsafeGetPerspectiveCameraProjectionGameObject should error", () =>
          _testGetFunc(unsafeGetPerspectiveCameraProjectionGameObject)
        );
        test("unsafeGetPerspectiveCameraProjectionPMatrix should error", () =>
          _testGetFunc(unsafeGetPerspectiveCameraProjectionPMatrix)
        );
      })
    );
    describe("getFovy", () =>
      test("test", () => {
        let (state, cameraProjection) =
          createPerspectiveCameraProjection(state^);
        let fovy = 65.;
        let state =
          state |> setPerspectiveCameraProjectionFovy(cameraProjection, fovy);
        state
        |> unsafeGetPerspectiveCameraFovy(cameraProjection)
        |> expect == fovy;
      })
    );
    describe("getAspect", () =>
      test("test", () => {
        let (state, cameraProjection) =
          createPerspectiveCameraProjection(state^);
        let aspect = 1.;
        let state =
          state
          |> setPerspectiveCameraProjectionAspect(cameraProjection, aspect);
        state
        |> unsafeGetPerspectiveCameraAspect(cameraProjection)
        |> expect == aspect;
      })
    );
    describe("getNear", () =>
      test("test", () => {
        let (state, cameraProjection) =
          createPerspectiveCameraProjection(state^);
        let near = 0.1;
        let state =
          state |> setPerspectiveCameraProjectionNear(cameraProjection, near);
        state
        |> unsafeGetPerspectiveCameraNear(cameraProjection)
        |> expect == near;
      })
    );
    describe("getFar", () =>
      test("test", () => {
        let (state, cameraProjection) =
          createPerspectiveCameraProjection(state^);
        let far = 1000.;
        let state =
          state |> setPerspectiveCameraProjectionFar(cameraProjection, far);
        state
        |> unsafeGetPerspectiveCameraFar(cameraProjection)
        |> expect == far;
      })
    );
  });