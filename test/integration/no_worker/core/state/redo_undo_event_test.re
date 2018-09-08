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

      let _prepareDomEvent = (value, onEventFunc, state) => {
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

      let _prepareCustomEvent = (value, onEventFunc, state) => {
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let state =
          onEventFunc(
            (. event, state) => {
              value := value^ + 1;
              (state, event);
            },
            state,
          );

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        let state =
          onEventFunc(
            (. event, state) => {
              value := value^ + 2;
              (state, event);
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
          _prepareDomEvent(
            value,
            (handleFunc, state) =>
              ManageEventAPI.onMouseEvent(MouseDown, 0, handleFunc, state),
            state,
          );

        let restoredState = MainStateTool.setState(restoredState);
        EventTool.triggerDomEvent(
          "mousedown",
          EventTool.getPointEventBindedDom(state),
          MouseEventTool.buildMouseEvent(),
        );
        let restoredState = EventTool.restore(restoredState);

        value^ |> expect == 1;
      });
      test("test restore keyboardDomEventDataArrMap", () => {
        let state = KeyboardEventTool.prepare(~sandbox, ());
        let state = state |> NoWorkerJobTool.execInitJobs;
        let restoredState =
          _prepareDomEvent(
            value,
            (handleFunc, state) =>
              ManageEventAPI.onKeyboardEvent(KeyDown, 0, handleFunc, state),
            state,
          );

        let restoredState = MainStateTool.setState(restoredState);
        EventTool.triggerDomEvent(
          "keydown",
          EventTool.getKeyboardEventBindedDom(state),
          KeyboardEventTool.buildKeyboardEvent(),
        );
        let restoredState = EventTool.restore(restoredState);

        value^ |> expect == 1;
      });
      test("test restore touchDomEventDataArrMap", () => {
        let state = TouchEventTool.prepare(~sandbox, ());
        let state = state |> NoWorkerJobTool.execInitJobs;
        let restoredState =
          _prepareDomEvent(
            value,
            (handleFunc, state) =>
              ManageEventAPI.onTouchEvent(TouchStart, 0, handleFunc, state),
            state,
          );

        let restoredState = MainStateTool.setState(restoredState);
        EventTool.triggerDomEvent(
          "touchstart",
          EventTool.getPointEventBindedDom(state),
          TouchEventTool.buildTouchEvent(),
        );
        let restoredState = EventTool.restore(restoredState);

        value^ |> expect == 1;
      });
      test("test restore customGlobalEventArrMap", () => {
        let restoredState =
          _prepareCustomEvent(
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
          _prepareCustomEvent(
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

    describe("test copy mouseEventData", () =>
      test("set isDrag to false", () => {
        let state = MouseEventTool.prepare(~sandbox, ());
        let state = MouseEventTool.setIsDrag(true, state);
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        MouseEventTool.getIsDrag(copiedState) |> expect == false;
      })
    );

    describe("test copy touchEventData", () =>
      test("set isDrag to false", () => {
        let state = TouchEventTool.prepare(~sandbox, ());
        let state = TouchEventTool.setIsDrag(true, state);
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        TouchEventTool.getIsDrag(copiedState) |> expect == false;
      })
    );

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
              valueY := valueY^ + y;

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
          EventTool.getPointEventBindedDom(state),
          MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
        );
        let restoredState = EventTool.restore(restoredState);

        (valueX^, valueY^) |> expect == (0, 0);
      })
    );

    describe("test redo/undo touchEventData", () =>
      test("test lastX, lastY", () => {
        let (valueX, valueY) = (ref(0), ref(0));
        let state = TouchEventTool.prepare(~sandbox, ());
        let state = TouchEventTool.setLastXY(Some(1), Some(2), state);
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let state =
          ManageEventAPI.onTouchEvent(
            TouchStart,
            0,
            (. event: touchEvent, state) => {
              let (x, y) = event.movementDelta;
              valueX := valueX^ + x;
              valueY := valueY^ + y;
              state;
            },
            state,
          );

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        let state =
          ManageEventAPI.onTouchEvent(
            TouchStart,
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
          "touchstart",
          EventTool.getPointEventBindedDom(state),
          TouchEventTool.buildTouchEvent(
            ~changedTouches=[|
              TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ()),
            |],
            (),
          ),
        );
        let restoredState = EventTool.restore(restoredState);

        (valueX^, valueY^) |> expect == (0, 0);
      })
    );
  });