open Wonder_jest;

open Js.Typed_array;

open EventType;

let _ =
  describe("test redo,undo event data", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test redo/undo binded event data map", () => {
      let value = ref(0);

      let _prepare = (value, onEventFunc, state) => {
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let state =
          onEventFunc(
            (. event, state) => {
              value := value^ + 1;
              state;
            },
            state,
          );

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        let state =
          onEventFunc(
            (. event, state) => {
              value := value^ + 2;
              state;
            },
            state,
          );

        MainStateTool.restore(state, copiedState);
      };

      beforeEach(() => value := 0);

      test("test restore mouseDomEventDataArrMap", () => {
        let state = MouseEventTool.prepare(~sandbox, ());
        let state = state |> NoWorkerJobTool.execInitJobs;
        let restoredState =
          _prepare(
            value,
            (handleFunc, state) =>
              ManageEventAPI.onMouseEvent(MouseDown, 0, handleFunc, state),
            state,
          );

        let restoredState = MainStateTool.setState(restoredState);
        EventTool.triggerDomEvent(
          "mousedown",
          EventTool.getBody(),
          MouseEventTool.buildMouseEvent(),
        );
        let restoredState = EventTool.restore(restoredState);

        value^ |> expect == 1;
      });
      test("test restore keyboardDomEventDataArrMap", () => {
        let state = KeyboardEventTool.prepare(~sandbox, ());
        let state = state |> NoWorkerJobTool.execInitJobs;
        let restoredState =
          _prepare(
            value,
            (handleFunc, state) =>
              ManageEventAPI.onKeyboardEvent(KeyDown, 0, handleFunc, state),
            state,
          );

        let restoredState = MainStateTool.setState(restoredState);
        EventTool.triggerDomEvent(
          "keydown",
          EventTool.getBody(),
          KeyboardEventTool.buildKeyboardEvent(),
        );
        let restoredState = EventTool.restore(restoredState);

        value^ |> expect == 1;
      });
      test("test restore customGlobalEventArrMap", () => {
        let restoredState =
          _prepare(
            value,
            (handleFunc, state) =>
              ManageEventAPI.onCustomGlobalEvent(
                CustomEventTool.getPointDownEventName(),
                0,
                handleFunc,
                state,
              ),
            state^,
          );

        let restoredState =
          ManageEventAPI.triggerCustomGlobalEvent(
            CustomEventTool.createCustomEvent(
              ~eventName=CustomEventTool.getPointDownEventName(),
              (),
            ),
            restoredState,
          );

        value^ |> expect == 1;
      });
      test("test restore customGameObjectEventArrMap", () => {
        let (state, gameObject) = GameObjectAPI.createGameObject(state^);
        let restoredState =
          _prepare(
            value,
            (handleFunc, state) =>
              ManageEventAPI.onCustomGameObjectEvent(
                CustomEventTool.getPointDownEventName(),
                gameObject,
                0,
                handleFunc,
                state,
              ),
            state,
          );

        let restoredState =
          ManageEventAPI.triggerCustomGameObjectEvent(
            CustomEventTool.createCustomEvent(
              ~eventName=CustomEventTool.getPointDownEventName(),
              (),
            ),
            gameObject,
            restoredState,
          );

        value^ |> expect == 1;
      });
    });

    describe("test redo/undo mouseEventData", () =>
      test("test lastX, lastY", () => {
        let (valueX, valueY) = (ref(0), ref(0));
        let state = MouseEventTool.prepare(~sandbox, ());
        MouseEventTool.setNotPointerLocked(.);
        let state = MouseEventTool.setLastXY(Some(1), Some(2), state);
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let state =
          ManageEventAPI.onMouseEvent(
            MouseDown,
            0,
            (. event: mouseEvent, state) => {
              let (x, y) = event.movementDelta;
              valueX := valueX^ + x;
              valueY := valueX^ + y;
              state;
            },
            state,
          );

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        let state =
          ManageEventAPI.onMouseEvent(
            MouseDown,
            0,
            (. event, state) => {
              valueX := 100;
              valueY := 110;
              state;
            },
            state,
          );

        let restoredState = MainStateTool.restore(state, copiedState);

        let restoredState = MainStateTool.setState(restoredState);
        EventTool.triggerDomEvent(
          "mousedown",
          EventTool.getBody(),
          MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
        );
        let restoredState = EventTool.restore(restoredState);

        (valueX^, valueY^) |> expect == (0, 0);
      })
    );
  });