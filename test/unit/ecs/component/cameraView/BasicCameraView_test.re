open BasicCameraViewAPI;

open StateDataMainType;

open BasicCameraViewType;

open Wonder_jest;

let _ =
  describe("BasicCameraView", () => {
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
    describe("createBasicCameraView", () => {
      test("create a new camera which is just index(int)", () => {
        let (_, cameraView) = createBasicCameraView(state^);
        expect(cameraView) == 0;
      });

      describe("change state", () =>
        test("state->index + 1", () => {
          let (state, _) = createBasicCameraView(state^);
          state.basicCameraViewRecord |> (record => expect(record.index) == 1);
        })
      );

      /* test("active new one", () => {
        let (state, cameraView) = createBasicCameraView(state^);

        BasicCameraViewAPI.isActiveBasicCameraView(cameraView, state)
        |> expect == true;
      }); */
    });

    describe("unsafeGetBasicCameraViewGameObject", () =>
      test("get cameraView's gameObject", () => {
        open GameObjectAPI;
        let (state, cameraView) = createBasicCameraView(state^);
        let (state, gameObject) = state |> GameObjectAPI.createGameObject;
        let state =
          state
          |> addGameObjectBasicCameraViewComponent(gameObject, cameraView);
        state
        |> unsafeGetBasicCameraViewGameObject(cameraView)
        |> expect == gameObject;
      })
    );

    describe("isActiveBasicCameraView", () =>
      test("test", () => {
        let (state, cameraView) = createBasicCameraView(state^);

        let state =
          BasicCameraViewAPI.setActiveBasicCameraView(
            cameraView,
            false,
            state,
          );

        BasicCameraViewAPI.isActiveBasicCameraView(cameraView, state)
        |> expect == false;
      })
    );

    describe("activeBasicCameraView", () =>
      describe("ensure only has one active basicCameraView", () =>
        test("active this one, unactive other ones", () => {
          let (state, cameraView1) = createBasicCameraView(state^);
          let (state, cameraView2) = createBasicCameraView(state);
          let (state, cameraView3) = createBasicCameraView(state);

          let state =
            state
            |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView1, true)
            |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView2, true)
            |> BasicCameraViewAPI.setActiveBasicCameraView(
                 cameraView3,
                 false,
               )
            |> BasicCameraViewAPI.activeBasicCameraView(cameraView3);

          (
            BasicCameraViewAPI.isActiveBasicCameraView(cameraView1, state),
            BasicCameraViewAPI.isActiveBasicCameraView(cameraView2, state),
            BasicCameraViewAPI.isActiveBasicCameraView(cameraView3, state),
          )
          |> expect == (false, false, true);
        })
      )
    );

    describe("unactiveBasicCameraView", () =>
      test("unactive this one(not affect other ones)", () => {
        let (state, cameraView1) = createBasicCameraView(state^);
        let (state, cameraView2) = createBasicCameraView(state);

        let state =
          state
          |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView1, true)
          |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView2, true)
          |> BasicCameraViewAPI.unactiveBasicCameraView(cameraView2);

        (
          BasicCameraViewAPI.isActiveBasicCameraView(cameraView1, state),
          BasicCameraViewAPI.isActiveBasicCameraView(cameraView2, state),
        )
        |> expect == (true, false);
      })
    );

    describe("getActiveBasicCameraView", () => {
      test("test has none", () => {
        let (state, cameraView1) = createBasicCameraView(state^);
        let (state, cameraView2) = createBasicCameraView(state);

        let state =
          state
          |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView1, false)
          |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView2, false);

        BasicCameraViewAPI.getActiveBasicCameraView(state) |> expect == None;
      });
      test("test has one", () => {
        let (state, cameraView1) = createBasicCameraView(state^);
        let (state, cameraView2) = createBasicCameraView(state);

        let state =
          state
          |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView1, true)
          |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView2, false);

        BasicCameraViewAPI.getActiveBasicCameraView(state)
        |> expect == Some(cameraView1);
      });
      test("if has >= 2, contract error", () => {
        let (state, cameraView1) = createBasicCameraView(state^);
        let (state, cameraView2) = createBasicCameraView(state);

        let state =
          state
          |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView1, true)
          |> BasicCameraViewAPI.setActiveBasicCameraView(cameraView2, true);

        expect(() =>
          BasicCameraViewAPI.getActiveBasicCameraView(state)
        )
        |> toThrowMessage("expect only has one active cameraView at most");
      });
    });

    describe("dispose component", () => {
      let _prepareTwo = state => {
        let (state, gameObject1, _, (basicCameraView1, _)) =
          CameraTool.createCameraGameObject(state);
        let (state, gameObject2, _, (basicCameraView2, _)) =
          CameraTool.createCameraGameObject(state);
        (state, gameObject1, basicCameraView1, gameObject2, basicCameraView2);
      };

      describe("dispose data", () =>
        test("remove from isActiveMap, gameObjectMap", () => {
          open BasicCameraViewType;
          let (state, gameObject1, _, (basicCameraView1, _)) =
            CameraTool.createCameraGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectBasicCameraViewComponent(
                 gameObject1,
                 basicCameraView1,
               );
          let {isActiveMap, gameObjectMap} = state.basicCameraViewRecord;
          (
            isActiveMap
            |> WonderCommonlib.MutableSparseMapService.has(basicCameraView1),
            gameObjectMap
            |> WonderCommonlib.MutableSparseMapService.has(basicCameraView1),
          )
          |> expect == (false, false);
        })
      );

      describe("test add new one after dispose old one", () => {
        test("use disposed index as new index firstly", () => {
          let (
            state,
            gameObject1,
            basicCameraView1,
            gameObject2,
            basicCameraView2,
          ) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectBasicCameraViewComponent(
                 gameObject1,
                 basicCameraView1,
               );
          let (state, gameObject3, _, (basicCameraView3, _)) =
            CameraTool.createCameraGameObject(state);
          basicCameraView3 |> expect == basicCameraView1;
        });
        test(
          "if has no disposed index, get index from meshRendererRecord.index",
          () => {
          let (
            state,
            gameObject1,
            basicCameraView1,
            gameObject2,
            basicCameraView2,
          ) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectBasicCameraViewComponent(
                 gameObject1,
                 basicCameraView1,
               );
          let (state, gameObject3, _, (basicCameraView3, _)) =
            CameraTool.createCameraGameObject(state);
          let (state, gameObject4, _, (basicCameraView4, _)) =
            CameraTool.createCameraGameObject(state);
          (basicCameraView3, basicCameraView4)
          |> expect == (basicCameraView1, basicCameraView2 + 1);
        });
      });

      describe("contract check", () =>
        test("expect dispose the alive component, but actual not", () => {
          let (
            state,
            gameObject1,
            basicCameraView1,
            gameObject2,
            basicCameraView2,
          ) =
            _prepareTwo(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectBasicCameraViewComponent(
                 gameObject1,
                 basicCameraView1,
               );
          expect(() => {
            let state =
              state
              |> GameObjectTool.disposeGameObjectBasicCameraViewComponent(
                   gameObject1,
                   basicCameraView1,
                 );
            ();
          })
          |> toThrowMessage(
               "expect dispose the alive component, but actual not",
             );
        })
      );
    });
  });