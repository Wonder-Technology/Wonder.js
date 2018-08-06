open CameraGroupAPI;

open StateDataMainType;

open CameraGroupType;

open Wonder_jest;

let _ =
  describe("CameraGroup", () => {
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

    describe("createCameraGroup", () => {
      test("create cameraView and cameraProjection", () => {
        let (state, {cameraView, cameraProjection}) =
          CameraGroupTool.createCameraGroup(state^);

        (cameraView, cameraProjection) |> expect == (0, 0);
      });

      describe("change state", () =>
        test("state->index + 1", () => {
          let (state, {cameraView, cameraProjection}) =
            CameraGroupTool.createCameraGroup(state^);

          (
            state.basicCameraViewRecord.index,
            state.perspectiveCameraProjectionRecord.index,
          )
          |> expect == (1, 1);
        })
      );
    });

    describe("addCameraGroupComponents", () =>
      test("add cameraView and cameraProjection component", () => {
        let (state, cameraGroup) = CameraGroupTool.createCameraGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);

        let state =
          CameraGroupTool.addGameObjectCameraGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        (
          GameObjectAPI.hasGameObjectBasicCameraViewComponent(
            gameObject,
            state,
          ),
          GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent(
            gameObject,
            state,
          ),
        )
        |> expect == (true, true);
      })
    );

    describe("disposeGameObjectCameraGroupComponents", () =>
      test("dispose cameraView and cameraProjection component", () => {
        let (state, cameraGroup) = CameraGroupTool.createCameraGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          CameraGroupTool.addGameObjectCameraGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        let state =
          CameraGroupTool.disposeGameObjectCameraGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        (
          GameObjectAPI.hasGameObjectBasicCameraViewComponent(
            gameObject,
            state,
          ),
          GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent(
            gameObject,
            state,
          ),
        )
        |> expect == (false, false);
      })
    );

    describe("unsafeGetGameObjectCameraGroupComponents", () =>
      test("unsafe get cameraView and cameraProjection components", () => {
        let (state, cameraGroup) = CameraGroupTool.createCameraGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          CameraGroupTool.addGameObjectCameraGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        CameraGroupTool.unsafeGetGameObjectCameraGroupComponents(
          gameObject,
          state,
        )
        |> expect == cameraGroup;
      })
    );

    describe("hasGameObjectCameraGroupComponents", () =>
      test("has cameraView and cameraProjection components", () => {
        let (state, cameraGroup) = CameraGroupTool.createCameraGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          CameraGroupTool.addGameObjectCameraGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        CameraGroupTool.hasGameObjectCameraGroupComponents(gameObject, state)
        |> expect == true;
      })
    );
  });