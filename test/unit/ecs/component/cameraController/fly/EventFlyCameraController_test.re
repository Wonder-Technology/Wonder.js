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
            test(
              "if is combined key, not add direction into directionArray ", () => {
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

              state |> getDirectionArray |> Js.Array.length |> expect == 0;
            });

            describe("else, add direction into directionArray", () => {
              describe("test keydown one direction", () => {
                let _judgeChangeDirectionArray = (keyCode, direction) => {
                  let (state, cameraController, moveSpeed, diffTuple) =
                    _prepareKeyEvent();

                  let state = MainStateTool.setState(state);
                  EventTool.triggerDomEvent(
                    "keydown",
                    EventTool.getKeyboardEventBindedDom(state),
                    KeyboardEventTool.buildKeyboardEvent(~keyCode, ()),
                  );
                  let state = EventTool.restore(state);

                  state
                  |> getDirectionArray
                  |> Js.Array.includes(direction)
                  |> expect == true;
                };

                test("test move left", () =>
                  _judgeChangeDirectionArray(65, Left)
                );
                test("test move right", () =>
                  _judgeChangeDirectionArray(39, Right)
                );
                test("test move up", () =>
                  _judgeChangeDirectionArray(81, Up)
                );
                test("test move down", () =>
                  _judgeChangeDirectionArray(69, Down)
                );
                test("test move front", () =>
                  _judgeChangeDirectionArray(87, Front)
                );
                test("test move back", () =>
                  _judgeChangeDirectionArray(83, Back)
                );
              });
              describe("test keydown multiple direction", () => {
                let _judgeMultipleChangeDirectionArray =
                    ((keyCode1, keyCode2), (direction1, direction2)) => {
                  let (state, cameraController, moveSpeed, diffTuple) =
                    _prepareKeyEvent();

                  let state = MainStateTool.setState(state);
                  EventTool.triggerDomEvent(
                    "keydown",
                    EventTool.getKeyboardEventBindedDom(state),
                    KeyboardEventTool.buildKeyboardEvent(
                      ~keyCode=keyCode1,
                      (),
                    ),
                  );
                  EventTool.triggerDomEvent(
                    "keydown",
                    EventTool.getKeyboardEventBindedDom(state),
                    KeyboardEventTool.buildKeyboardEvent(
                      ~keyCode=keyCode2,
                      (),
                    ),
                  );
                  let state =
                    MainStateTool.unsafeGetState() |> EventTool.restore;

                  let directionArray = state |> getDirectionArray;

                  (
                    directionArray |> Js.Array.includes(direction1),
                    directionArray |> Js.Array.includes(direction2),
                  )
                  |> expect == (true, true);
                };

                test("test move left and up", () =>
                  _judgeMultipleChangeDirectionArray((65, 81), (Left, Up))
                );
                test("test move right and down", () =>
                  _judgeMultipleChangeDirectionArray(
                    (39, 69),
                    (Right, Down),
                  )
                );
                test("test move up and front", () =>
                  _judgeMultipleChangeDirectionArray((81, 87), (Up, Front))
                );
                test("test move down and back", () =>
                  _judgeMultipleChangeDirectionArray((69, 83), (Down, Back))
                );
                test("test move front and left", () =>
                  _judgeMultipleChangeDirectionArray(
                    (87, 65),
                    (Front, Left),
                  )
                );
                test("test move back", () =>
                  _judgeMultipleChangeDirectionArray(
                    (83, 39),
                    (Back, Right),
                  )
                );
              });
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