open Wonder_jest;

open BasicCameraViewAPI;

open FlyCameraControllerAPI;

open FlyCameraControllerTool;

open FlyCameraControllerType;

let _ =
  describe("test fly cameraController event", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind flyCameraController's event", () => {
      let _prepareMouseEvent = canvasHeight => {
        let state = EventCameraControllerTool.prepareMouseEvent(sandbox);

        let canvas =
          ViewService.unsafeGetCanvas(state.viewRecord)
          |> WonderWebgl.DomExtendType.htmlElementToJsObj;

        canvas##height #= canvasHeight;

        state;
      };

      let _prepareKeyEvent = () => {
        let state = EventCameraControllerTool.prepareKeyboardEvent(sandbox);
        let (
          state,
          gameObject,
          transform,
          (cameraController, basicCameraView, perspectiveCameraProjection),
        ) =
          FlyCameraControllerTool.createGameObject(state);
        let (diffX, diffY, diffZ) as positionDiff = (0., 0., 0.);
        let moveSpeed = 0.8;
        let state =
          state
          |> setFlyCameraControllerMoveSpeed(cameraController, moveSpeed)
          |> setTranslationDiff(cameraController, positionDiff);

        let state = state |> NoWorkerJobTool.execInitJobs;
        let state =
          FlyCameraControllerAPI.bindFlyCameraControllerEvent(
            cameraController,
            state,
          );

        (state, cameraController, moveSpeed, positionDiff);
      };

      describe("test bind one flyCameraController's event", () => {
        let _prepareFlyCameraEvent = canvasHeight => {
          let state = _prepareMouseEvent(canvasHeight);
          let (state, _) =
            MouseEventTool.prepareForPointerLock(sandbox, state);
          let (
            state,
            gameObject,
            transform,
            (cameraController, basicCameraView, perspectiveCameraProjection),
          ) =
            FlyCameraControllerTool.createGameObject(state);

          let state = state |> NoWorkerJobTool.execInitJobs;
          let state =
            FlyCameraControllerAPI.bindFlyCameraControllerEvent(
              cameraController,
              state,
            );

          (cameraController, MainStateTool.setState(state));
        };

        describe("bind event", () => {
          describe("support pointer lock", () => {
            let _prepareTouchEvent = () =>
              EventCameraControllerTool.prepareTouchEvent(sandbox);

            describe("bind point drag start event", () => {
              let _prepareForPointerLock = (sandbox, state) =>
                MouseEventTool.prepareForPointerLock(sandbox, state);

              let _prepareFlyCameraRequestLockAndEvent = () => {
                let state = _prepareMouseEvent(100.);
                let (state, requestPointerLockStub) =
                  _prepareForPointerLock(sandbox, state);
                let (state, _, _, (cameraController, _, _)) =
                  FlyCameraControllerTool.createGameObject(state);

                let state = state |> NoWorkerJobTool.execInitJobs;
                let state =
                  FlyCameraControllerAPI.bindFlyCameraControllerEvent(
                    cameraController,
                    state,
                  );

                (requestPointerLockStub, MainStateTool.setState(state));
              };

              test("if is mouse event, request canvas pointerLock", () => {
                let (requestPointerLockStub, state) =
                  _prepareFlyCameraRequestLockAndEvent();

                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getPointEventBindedDom(state),
                  MouseEventTool.buildMouseEvent(),
                );
                let state = EventTool.restore(state);

                requestPointerLockStub |> expect |> toCalledOnce;
              });
              test(
                "else if is touch event, not request canvas pointerLock", () => {
                let (requestPointerLockStub, state) =
                  _prepareFlyCameraRequestLockAndEvent();

                EventTool.triggerDomEvent(
                  "touchstart",
                  EventTool.getPointEventBindedDom(state),
                  TouchEventTool.buildTouchEvent(),
                );
                let state = EventTool.restore(state);

                requestPointerLockStub |> expect |> not_ |> toCalled;
              });
            });

            describe("bind point drag drop event", () => {
              let _prepareForPointerLock =
                  (sandbox, pointerLockElement, state) => {
                let document = DomExtend.document |> Obj.magic;

                document##pointerLockElement #= pointerLockElement;

                let exitPointerLockStub =
                  createEmptyStubWithJsObjSandbox(sandbox);
                document##exitPointerLock #= exitPointerLockStub;

                MouseEventTool.prepareForPointerLock(sandbox, state);

                (state, exitPointerLockStub);
              };
              let _prepareFlycameraExitLockAndBindEvent = (canvas, state) => {
                let (state, exitPointerLockStub) =
                  _prepareForPointerLock(sandbox, canvas, state);
                let (state, _, _, (cameraController, _, _)) =
                  FlyCameraControllerTool.createGameObject(state);
                let state = state |> NoWorkerJobTool.execInitJobs;
                let state =
                  FlyCameraControllerAPI.bindFlyCameraControllerEvent(
                    cameraController,
                    state,
                  );

                (exitPointerLockStub, MainStateTool.setState(state));
              };

              describe("if is mouse event", () => {
                test(
                  "if document.pointerLockElement === canvas, exitPointerLock",
                  () => {
                  let state = _prepareMouseEvent(100.);
                  let canvas = ViewTool.unsafeGetCanvas(state) |> Obj.magic;
                  let (exitPointerLockStub, state) =
                    _prepareFlycameraExitLockAndBindEvent(canvas, state);

                  EventTool.triggerDomEvent(
                    "mousedown",
                    EventTool.getPointEventBindedDom(state),
                    MouseEventTool.buildMouseEvent(),
                  );
                  EventTool.triggerDomEvent(
                    "mouseup",
                    EventTool.getPointEventBindedDom(state),
                    MouseEventTool.buildMouseEvent(),
                  );
                  let state = EventTool.restore(state);

                  exitPointerLockStub |> expect |> toCalledOnce;
                });
                test("else, not exitPointerLock", () => {
                  let state = _prepareMouseEvent(100.);
                  let (exitPointerLockStub, state) =
                    _prepareFlycameraExitLockAndBindEvent(
                      Obj.magic(1),
                      state,
                    );

                  EventTool.triggerDomEvent(
                    "mousedown",
                    EventTool.getPointEventBindedDom(state),
                    MouseEventTool.buildMouseEvent(),
                  );
                  EventTool.triggerDomEvent(
                    "mouseup",
                    EventTool.getPointEventBindedDom(state),
                    MouseEventTool.buildMouseEvent(),
                  );
                  let state = EventTool.restore(state);

                  exitPointerLockStub |> expect |> not_ |> toCalled;
                });
              });

              describe("else if is touch event", () =>
                test("not exitPointerLock", () => {
                  let state = _prepareMouseEvent(100.);
                  let canvas = ViewTool.unsafeGetCanvas(state) |> Obj.magic;
                  let (exitPointerLockStub, state) =
                    _prepareFlycameraExitLockAndBindEvent(canvas, state);

                  EventTool.triggerDomEvent(
                    "touchstart",
                    EventTool.getPointEventBindedDom(state),
                    TouchEventTool.buildTouchEvent(),
                  );
                  EventTool.triggerDomEvent(
                    "touchend",
                    EventTool.getPointEventBindedDom(state),
                    TouchEventTool.buildTouchEvent(),
                  );
                  let state = EventTool.restore(state);

                  exitPointerLockStub |> expect |> not_ |> toCalled;
                })
              );
            });
          });

          describe("bind point drag over event", () =>
            describe("change orbit", () =>
              test("set euler angle diff value", () => {
                let (cameraController, state) = _prepareFlyCameraEvent(100.);

                let rotateSpeed = 200.;
                let eulerAngleDiff = {diffX: 0., diffY: 0.};

                let state =
                  state
                  |> setFlyCameraControllerRotateSpeed(
                       cameraController,
                       rotateSpeed,
                     )
                  |> FlyCameraControllerTool.setEulerAngleDiff(
                       cameraController,
                       eulerAngleDiff,
                     );

                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getPointEventBindedDom(state),
                  MouseEventTool.buildMouseEvent(),
                );
                EventTool.triggerFirstMouseDragOverEvent(
                  MouseEventTool.buildMouseEvent(
                    ~movementX=1,
                    ~movementY=2,
                    (),
                  ),
                  state,
                );
                let state = EventTool.restore(state);

                state
                |> unsafeGetEulerAngleDiff(cameraController)
                |> expect == {diffX: 4., diffY: 2.};
              })
            )
          );
          describe("bind point scale event", () => {
            test("preventDefault", () => {
              let (cameraController, state) = _prepareFlyCameraEvent(100.);

              let preventDefaultFunc =
                createEmptyStubWithJsObjSandbox(sandbox);
              let stopPropagationFunc =
                createEmptyStubWithJsObjSandbox(sandbox);

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousewheel",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(
                  ~preventDefaultFunc,
                  ~stopPropagationFunc,
                  (),
                ),
              );
              let state = EventTool.restore(state);

              (
                preventDefaultFunc |> getCallCount,
                stopPropagationFunc |> getCallCount,
              )
              |> expect == (1, 1);
            });

            test("set translation diff value", () => {
              let (cameraController, state) = _prepareFlyCameraEvent(100.);
              let wheelSpeed = 2.5;
              let state =
                state
                |> setFlyCameraControllerWheelSpeed(
                     cameraController,
                     wheelSpeed,
                   );

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousewheel",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(
                  ~detail=Js.Nullable.return(-3),
                  (),
                ),
              );
              let state = EventTool.restore(state);

              state
              |> unsafeGetTranslationDiff(cameraController)
              |> expect == (0., 0., (-7.5));
            });
          });
          describe("bind keydown event", () => {
            test("if is combined key, not set translation diff value ", () => {
              let (state, cameraController, moveSpeed, (diffX, diffY, diffZ)) =
                _prepareKeyEvent();

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "keydown",
                EventTool.getKeyboardEventBindedDom(state),
                KeyboardEventTool.buildKeyboardEvent(
                  ~keyCode=65,
                  ~ctrlKey=true,
                  (),
                ),
              );
              let state = EventTool.restore(state);

              state
              |> unsafeGetTranslationDiff(cameraController)
              |> expect == (diffX, diffY, diffZ);
            });

            describe("else, set translation diff value", () => {
              let _judgeTranslationDiffValue = (keyCode, expectFunc) => {
                let (state, cameraController, moveSpeed, diffTuple) =
                  _prepareKeyEvent();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getKeyboardEventBindedDom(state),
                  KeyboardEventTool.buildKeyboardEvent(~keyCode, ()),
                );
                let state = EventTool.restore(state);

                expectFunc(
                  state |> unsafeGetTranslationDiff(cameraController),
                  moveSpeed,
                  expect,
                  diffTuple,
                );
              };

              test("test move left", () =>
                _judgeTranslationDiffValue(
                  65,
                  (translationDiff, moveSpeed, expect, (diffX, diffY, diffZ)) =>
                  translationDiff
                  |> expect == (diffX -. moveSpeed, diffY, diffZ)
                )
              );
              test("test move right", () =>
                _judgeTranslationDiffValue(
                  39,
                  (translationDiff, moveSpeed, expect, (diffX, diffY, diffZ)) =>
                  translationDiff
                  |> expect == (diffX +. moveSpeed, diffY, diffZ)
                )
              );
              test("test move up", () =>
                _judgeTranslationDiffValue(
                  81,
                  (translationDiff, moveSpeed, expect, (diffX, diffY, diffZ)) =>
                  translationDiff
                  |> expect == (diffX, diffY +. moveSpeed, diffZ)
                )
              );
              test("test move down", () =>
                _judgeTranslationDiffValue(
                  69,
                  (translationDiff, moveSpeed, expect, (diffX, diffY, diffZ)) =>
                  translationDiff
                  |> expect == (diffX, diffY -. moveSpeed, diffZ)
                )
              );
              test("test move front", () =>
                _judgeTranslationDiffValue(
                  87,
                  (translationDiff, moveSpeed, expect, (diffX, diffY, diffZ)) =>
                  translationDiff
                  |> expect == (diffX, diffY, diffZ -. moveSpeed)
                )
              );
              test("test move back", () =>
                _judgeTranslationDiffValue(
                  83,
                  (translationDiff, moveSpeed, expect, (diffX, diffY, diffZ)) =>
                  translationDiff
                  |> expect == (diffX, diffY, diffZ +. moveSpeed)
                )
              );
            });
          });
        });
      });

      describe("add event handleFunc to state", () => {
        let _prepareForPointerLock = (sandbox, state) =>
          MouseEventTool.prepareForPointerLock(sandbox, state);

        let _prepareFlyCameraBindEvent = () => {
          let state = _prepareMouseEvent(100.);
          let (
            state,
            gameObject,
            transform,
            (cameraController, basicCameraView, perspectiveCameraProjection),
          ) =
            FlyCameraControllerTool.createGameObject(state);
          let state = state |> NoWorkerJobTool.execInitJobs;
          let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox);

          (
            cameraController,
            preventDefaultFunc,
            state
            |> FlyCameraControllerAPI.bindFlyCameraControllerEvent(
                 cameraController,
               ),
          );
        };

        test("test unbind point drag start event", () => {
          let (cameraController, preventDefaultFunc, state) =
            _prepareFlyCameraBindEvent();

          let (state, requestPointerLockStub) =
            _prepareForPointerLock(sandbox, state);
          let state =
            FlyCameraControllerAPI.unbindFlyCameraControllerEvent(
              cameraController,
              state,
            );
          let state = MainStateTool.setState(state);
          EventTool.triggerDomEvent(
            "mousedown",
            EventTool.getPointEventBindedDom(state),
            MouseEventTool.buildMouseEvent(~preventDefaultFunc, ()),
          );
          let state = EventTool.restore(state);

          requestPointerLockStub |> expect |> not_ |> toCalled;
        });
        test("test unbind point scale event", () => {
          let (cameraController, preventDefaultFunc, state) =
            _prepareFlyCameraBindEvent();

          let state =
            state
            |> FlyCameraControllerAPI.unbindFlyCameraControllerPointScaleEvent(
                 cameraController,
               );
          let state = MainStateTool.setState(state);
          EventTool.triggerDomEvent(
            "mousewheel",
            EventTool.getPointEventBindedDom(state),
            MouseEventTool.buildMouseEvent(~preventDefaultFunc, ()),
          );
          let state = EventTool.restore(state);

          preventDefaultFunc |> expect |> not_ |> toCalled;
        });
        test("test unbind keydown event", () => {
          let (state, cameraController, moveSpeed, (diffX, diffY, diffZ)) =
            _prepareKeyEvent();

          let state =
            FlyCameraControllerAPI.unbindFlyCameraControllerEvent(
              cameraController,
              state,
            );

          let state = MainStateTool.setState(state);

          EventTool.triggerDomEvent(
            "keydown",
            EventTool.getKeyboardEventBindedDom(state),
            KeyboardEventTool.buildKeyboardEvent(~keyCode=65, ()),
          );
          let state = EventTool.restore(state);

          state
          |> unsafeGetTranslationDiff(cameraController)
          |> expect == (diffX, diffY, diffZ);
        });
      });

      describe("test bind two flyCameraControllers' event", () =>
        test("test bind point scale event", () => {
          let state = _prepareMouseEvent(100.);
          let (state, gameObject1, _, (cameraController1, _, _)) =
            FlyCameraControllerTool.createGameObject(state);
          let (state, gameObject2, _, (cameraController2, _, _)) =
            FlyCameraControllerTool.createGameObject(state);
          let state = state |> NoWorkerJobTool.execInitJobs;
          let state =
            FlyCameraControllerAPI.bindFlyCameraControllerEvent(
              cameraController1,
              state,
            );
          let state =
            FlyCameraControllerAPI.bindFlyCameraControllerEvent(
              cameraController2,
              state,
            );

          let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox);

          let state = MainStateTool.setState(state);
          EventTool.triggerDomEvent(
            "mousewheel",
            EventTool.getPointEventBindedDom(state),
            MouseEventTool.buildMouseEvent(~preventDefaultFunc, ()),
          );
          let state = EventTool.restore(state);

          preventDefaultFunc |> expect |> toCalledTwice;
        })
      );
    });
  });