open FlyCameraControllerAPI;

open StateDataMainType;

open FlyCameraControllerType;

open Wonder_jest;

let _ =
  describe("FlyCameraController", () => {
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

    describe("createFlyCameraController", () => {
      test("create a new camera contoller which is just index(int)", () => {
        let (_, cameraController) = createFlyCameraController(state^);
        expect(cameraController) == 0;
      });
      describe("change state", () =>
        test("state->index + 1", () => {
          let (state, _) = createFlyCameraController(state^);
          state.flyCameraControllerRecord
          |> (record => expect(record.index) == 1);
        })
      );
    });

    describe("unsafeGetFlyCameraControllerGameObject", () =>
      test("get cameraController's gameObject", () => {
        open GameObjectAPI;
        let (state, cameraController) = createFlyCameraController(state^);
        let (state, gameObject) = state |> GameObjectAPI.createGameObject;
        let state =
          state
          |> addGameObjectFlyCameraControllerComponent(
               gameObject,
               cameraController,
             );
        state
        |> unsafeGetFlyCameraControllerGameObject(cameraController)
        |> expect == gameObject;
      })
    );
    describe("bind/unbind FlyCameraController event", () => {
      let _prepareMouseEvent = sandbox => {
        let state = EventCameraControllerTool.prepareMouseEvent(sandbox);
        let (state, gameObject, _, (cameraController, _, _)) =
          FlyCameraControllerTool.createGameObject(state);
        let state = state |> NoWorkerJobTool.execInitJobs;
        let rotateSpeed = 2.5;
        let eulerAngleDiff = {diffX: 1.45, diffY: 0.};
        let translationDiff = (0., 0., 2.);

        let state =
          state
          |> setFlyCameraControllerRotateSpeed(cameraController, rotateSpeed)
          |> FlyCameraControllerTool.setEulerAngleDiff(
               cameraController,
               eulerAngleDiff,
             )
          |> FlyCameraControllerTool.setTranslationDiff(
               cameraController,
               translationDiff,
             );

        (state, cameraController, eulerAngleDiff, translationDiff);
      };

      let _triggerEvent = state => {
        let state = MainStateTool.setState(state);
        EventTool.triggerDomEvent(
          "mousedown",
          EventTool.getPointEventBindedDom(state),
          MouseEventTool.buildMouseEvent(),
        );
        EventTool.triggerFirstMouseDragOverEvent(
          MouseEventTool.buildMouseEvent(~movementX=1, ~movementY=2, ()),
          state,
        );
        let state = EventTool.restore(state);

        state;
      };

      describe("if unbind event, FlyCameraController event shouldn't work", () =>
        test("test point drag event", () => {
          let (state, cameraController, eulerAngleDiff, translationDiff) =
            _prepareMouseEvent(sandbox);
          let state =
            FlyCameraControllerAPI.unbindFlyCameraControllerEvent(
              cameraController,
              state,
            );

          let state = _triggerEvent(state);

          (
            state
            |> FlyCameraControllerTool.unsafeGetEulerAngleDiff(
                 cameraController,
               ),
            state
            |> FlyCameraControllerTool.unsafeGetTranslationDiff(
                 cameraController,
               ),
          )
          |> expect == (eulerAngleDiff, translationDiff);
        })
      );

      describe(
        "if bind event after unbind event, FlyCameraController event should work",
        () =>
        test("test point drag event", () => {
          let (state, cameraController, eulerAngleDiff, translationDiff) =
            _prepareMouseEvent(sandbox);
          let (state, _) =
            MouseEventTool.prepareForPointerLock(sandbox, state);
          let state =
            FlyCameraControllerAPI.unbindFlyCameraControllerEvent(
              cameraController,
              state,
            );
          let state =
            FlyCameraControllerAPI.bindFlyCameraControllerEvent(
              cameraController,
              state,
            );

          let state = _triggerEvent(state);

          (
            state
            |> FlyCameraControllerTool.unsafeGetEulerAngleDiff(
                 cameraController,
               ),
            state
            |> FlyCameraControllerTool.unsafeGetTranslationDiff(
                 cameraController,
               ),
          )
          |> expect != (eulerAngleDiff, translationDiff);
        })
      );
    });

    describe("dispose component", () => {
      let _prepareTwo = state => {
        let (state, gameObject1, _, (cameraController1, _, _)) =
          FlyCameraControllerTool.createGameObject(state^);
        let (state, gameObject2, _, (cameraController2, _, _)) =
          FlyCameraControllerTool.createGameObject(state);
        (
          state,
          gameObject1,
          cameraController1,
          gameObject2,
          cameraController2,
        );
      };

      describe("dispose data", () => {
        test(
          "remove from eulerAngleDiffMap, translationDiffMap, moveSpeedMap, rotateSpeedMap, wheelSpeedMap, gameObjectMap",
          () => {
            let (
              state,
              gameObject1,
              cameraController1,
              gameObject2,
              cameraController2,
            ) =
              _prepareTwo(state);
            let state =
              state
              |> GameObjectTool.disposeGameObjectFlyCameraControllerComponent(
                   gameObject1,
                   cameraController1,
                 );
            let {
              moveSpeedMap,
              wheelSpeedMap,
              rotateSpeedMap,
              eulerAngleDiffMap,
              translationDiffMap,
              gameObjectMap,
              directionArrayMap,
            } =
              state.flyCameraControllerRecord;
            (
              moveSpeedMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              eulerAngleDiffMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              translationDiffMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              wheelSpeedMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              gameObjectMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              directionArrayMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
            )
            |> expect == (false, false, false, false, false, false);
          },
        );

        describe("remove from eventHandleFunc map", () =>
          test("remove from map", () => {
            let (state, gameObject1, _, (cameraController1, _, _)) =
              FlyCameraControllerTool.createGameObject(state^);
            let value = ref(0);
            let pointDragStartHandleFunc =
              (. event, state) => {
                value := value^ + 1;
                (state, event);
              };
            let pointDragDropHandleFunc =
              (. event, state) => {
                value := value^ + 1;
                (state, event);
              };
            let pointDragOverHandleFunc =
              (. event, state) => {
                value := value^ + 1;
                (state, event);
              };
            let pointScaleHandleFunc =
              (. event, state) => {
                value := value^ + 2;
                (state, event);
              };
            let keydownHandleFunc =
              (. event, state) => {
                value := value^ + 3;
                state;
              };
            let state =
              state
              |> FlyCameraControllerTool.addPointDragStartEventHandleFunc(
                   cameraController1,
                   pointDragStartHandleFunc,
                 )
              |> FlyCameraControllerTool.addPointDragDropEventHandleFunc(
                   cameraController1,
                   pointDragDropHandleFunc,
                 )
              |> FlyCameraControllerTool.addPointDragOverEventHandleFunc(
                   cameraController1,
                   pointDragOverHandleFunc,
                 )
              |> FlyCameraControllerTool.addPointScaleEventHandleFunc(
                   cameraController1,
                   pointScaleHandleFunc,
                 )
              |> FlyCameraControllerTool.addKeydownEventHandleFunc(
                   cameraController1,
                   keydownHandleFunc,
                 );

            let state =
              state
              |> GameObjectTool.disposeGameObjectFlyCameraControllerComponent(
                   gameObject1,
                   cameraController1,
                 );

            let {
              pointDragStartEventHandleFuncListMap,
              pointDragDropEventHandleFuncListMap,
              pointDragOverEventHandleFuncListMap,
              pointScaleEventHandleFuncListMap,
              keydownEventHandleFuncListMap,
              keyupEventHandleFuncListMap,
            }: flyCameraControllerRecord =
              state.flyCameraControllerRecord;

            (
              pointDragStartEventHandleFuncListMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              pointDragDropEventHandleFuncListMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              pointDragOverEventHandleFuncListMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              pointScaleEventHandleFuncListMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              keydownEventHandleFuncListMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              keyupEventHandleFuncListMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
            )
            |> expect == (false, false, false, false, false, false);
          })
        );
      });
    });

    describe("unsafeGetWheelSpeed", () =>
      test("test", () => {
        let (state, cameraController) = createFlyCameraController(state^);
        let value = 65.;
        let state =
          state |> setFlyCameraControllerWheelSpeed(cameraController, value);
        state
        |> unsafeGetFlyCameraControllerWheelSpeed(cameraController)
        |> expect == value;
      })
    );

    describe("unsafeGetRotateSpeed", () =>
      test("test", () => {
        let (state, cameraController) = createFlyCameraController(state^);
        let value = 65.;
        let state =
          state |> setFlyCameraControllerRotateSpeed(cameraController, value);
        state
        |> unsafeGetFlyCameraControllerRotateSpeed(cameraController)
        |> expect == value;
      })
    );

    describe("unsafeGetMoveSpeed", () =>
      test("test", () => {
        let (state, cameraController) = createFlyCameraController(state^);
        let value = 65.;
        let state =
          state |> setFlyCameraControllerMoveSpeed(cameraController, value);
        state
        |> unsafeGetFlyCameraControllerMoveSpeed(cameraController)
        |> expect == value;
      })
    );

    describe("unsafeGetEulerAngleDiff", () =>
      test("test", () => {
        let (state, cameraController) = createFlyCameraController(state^);
        let value = {diffX: 2.0, diffY: 1.0};
        let state =
          state
          |> FlyCameraControllerTool.setEulerAngleDiff(
               cameraController,
               value,
             );
        state
        |> FlyCameraControllerTool.unsafeGetEulerAngleDiff(cameraController)
        |> expect == value;
      })
    );

    describe("unsafeGetTranslationDiff", () =>
      test("test", () => {
        let (state, cameraController) = createFlyCameraController(state^);
        let value = (1.0, 2.0, 3.0);
        let state =
          state
          |> FlyCameraControllerTool.setTranslationDiff(
               cameraController,
               value,
             );
        state
        |> FlyCameraControllerTool.unsafeGetTranslationDiff(cameraController)
        |> expect == value;
      })
    );
  });