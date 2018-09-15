open Wonder_jest;

open BasicCameraViewAPI;

open ArcballCameraControllerAPI;

let _ =
  describe("test arcball cameraController event", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind arcballCameraController's event", () => {
      let _prepareMouseEvent = () =>
        EventArcballCameraControllerTool.prepareMouseEvent(sandbox);

      describe("test bind one arcballCameraController's event", () => {
        describe("bind event", () => {
          describe("support pointer lock", () => {
            let _prepareTouchEvent = () =>
              EventArcballCameraControllerTool.prepareTouchEvent(sandbox);

            describe("bind point down event", () => {
              let _prepareForPointerLock = (sandbox, state) =>
                MouseEventTool.prepareForPointerLock(sandbox, state);

              test("if is mouse event, request canvas pointerLock", () => {
                let state = _prepareMouseEvent();
                let (state, requestPointerLockStub) =
                  _prepareForPointerLock(sandbox, state);
                let (state, _, _, (cameraController, _, _)) =
                  ArcballCameraControllerTool.createGameObject(state);

                let state = state |> NoWorkerJobTool.execInitJobs;
                let state =
                  ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
                    cameraController,
                    state,
                  );

                let state = MainStateTool.setState(state);
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
                let state = _prepareTouchEvent();
                let (state, requestPointerLockStub) =
                  _prepareForPointerLock(sandbox, state);
                let (state, _, _, (cameraController, _, _)) =
                  ArcballCameraControllerTool.createGameObject(state);
                let state = state |> NoWorkerJobTool.execInitJobs;
                let state =
                  ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
                    cameraController,
                    state,
                  );

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "touchstart",
                  EventTool.getPointEventBindedDom(state),
                  TouchEventTool.buildTouchEvent(),
                );
                let state = EventTool.restore(state);

                requestPointerLockStub |> expect |> not_ |> toCalled;
              });
            });

            describe("bind point up event", () => {
              let _prepareForPointerLock =
                  (sandbox, pointerLockElement, state) => {
                let document = DomExtend.document |> Obj.magic;

                document##pointerLockElement#=pointerLockElement;

                let exitPointerLockStub =
                  createEmptyStubWithJsObjSandbox(sandbox);
                document##exitPointerLock#=exitPointerLockStub;

                (state, exitPointerLockStub);
              };

              describe("if is mouse event", () => {
                test(
                  "if document.pointerLockElement === canvas, exitPointerLock",
                  () => {
                  let state = _prepareMouseEvent();
                  let canvas = ViewTool.unsafeGetCanvas(state) |> Obj.magic;
                  let (state, exitPointerLockStub) =
                    _prepareForPointerLock(sandbox, canvas, state);
                  let (state, _, _, (cameraController, _, _)) =
                    ArcballCameraControllerTool.createGameObject(state);
                  let state = state |> NoWorkerJobTool.execInitJobs;
                  let state =
                    ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
                      cameraController,
                      state,
                    );

                  let state = MainStateTool.setState(state);
                  EventTool.triggerDomEvent(
                    "mouseup",
                    EventTool.getPointEventBindedDom(state),
                    MouseEventTool.buildMouseEvent(),
                  );
                  let state = EventTool.restore(state);

                  exitPointerLockStub |> expect |> toCalledOnce;
                });
                test("else, not exitPointerLock", () => {
                  let state = _prepareMouseEvent();
                  let (state, exitPointerLockStub) =
                    _prepareForPointerLock(sandbox, Obj.magic(1), state);
                  let (state, _, _, (cameraController, _, _)) =
                    ArcballCameraControllerTool.createGameObject(state);
                  let state = state |> NoWorkerJobTool.execInitJobs;
                  let state =
                    ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
                      cameraController,
                      state,
                    );

                  let state = MainStateTool.setState(state);
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
                  let state = _prepareTouchEvent();
                  let canvas = ViewTool.unsafeGetCanvas(state) |> Obj.magic;
                  let (state, exitPointerLockStub) =
                    _prepareForPointerLock(sandbox, canvas, state);
                  let (state, _, _, (cameraController, _, _)) =
                    ArcballCameraControllerTool.createGameObject(state);
                  let state = state |> NoWorkerJobTool.execInitJobs;

                  let state = MainStateTool.setState(state);
                  EventTool.triggerDomEvent(
                    "touchstart",
                    EventTool.getPointEventBindedDom(state),
                    TouchEventTool.buildTouchEvent(),
                  );
                  let state = EventTool.restore(state);

                  exitPointerLockStub |> expect |> not_ |> toCalled;
                })
              );
            });
          });

          describe("bind point drag event", () =>
            describe("change orbit", () =>
              test("set phi and theta", () => {
                let state = _prepareMouseEvent();
                let (state, _) =
                  MouseEventTool.prepareForPointerLock(sandbox, state);
                let (
                  state,
                  gameObject,
                  transform,
                  (
                    cameraController,
                    basicCameraView,
                    perspectiveCameraProjection,
                  ),
                ) =
                  ArcballCameraControllerTool.createGameObject(state);

                let rotateSpeed = 2.5;
                let phi = 1.;
                let theta = 0.5;

                let state =
                  state
                  |> setArcballCameraControllerRotateSpeed(
                       cameraController,
                       rotateSpeed,
                     )
                  |> setArcballCameraControllerPhi(cameraController, phi)
                  |> setArcballCameraControllerTheta(cameraController, theta);

                let state = state |> NoWorkerJobTool.execInitJobs;
                let state =
                  ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
                    cameraController,
                    state,
                  );

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getPointEventBindedDom(state),
                  MouseEventTool.buildMouseEvent(),
                );
                EventTool.triggerDomEvent(
                  "mousemove",
                  EventTool.getPointEventBindedDom(state),
                  MouseEventTool.buildMouseEvent(
                    ~movementX=1,
                    ~movementY=2,
                    (),
                  ),
                );
                let state = EventTool.restore(state);

                (
                  state
                  |> unsafeGetArcballCameraControllerPhi(cameraController),
                  state
                  |> unsafeGetArcballCameraControllerTheta(cameraController),
                )
                |> expect == (1.025, 0.45);
              })
            )
          );

          describe("bind point scale event", () => {
            test("preventDefault", () => {
              let state = _prepareMouseEvent();
              let (
                state,
                gameObject,
                transform,
                (
                  cameraController,
                  basicCameraView,
                  perspectiveCameraProjection,
                ),
              ) =
                ArcballCameraControllerTool.createGameObject(state);
              let state = state |> NoWorkerJobTool.execInitJobs;
              let state =
                ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
                  cameraController,
                  state,
                );

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

            test("set distance", () => {
              let state = _prepareMouseEvent();
              let (
                state,
                gameObject,
                transform,
                (
                  cameraController,
                  basicCameraView,
                  perspectiveCameraProjection,
                ),
              ) =
                ArcballCameraControllerTool.createGameObject(state);
              let wheelSpeed = 2.5;
              let state =
                state
                |> setArcballCameraControllerWheelSpeed(
                     cameraController,
                     wheelSpeed,
                   );
              let state = state |> NoWorkerJobTool.execInitJobs;
              let state =
                ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
                  cameraController,
                  state,
                );
              let originDistance =
                unsafeGetArcballCameraControllerDistance(
                  cameraController,
                  state,
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
              |> unsafeGetArcballCameraControllerDistance(cameraController)
              |> expect == originDistance
              -. wheelSpeed
              *. 3.;
            });
          });

          describe("bind keydown event", () =>
            describe("set target", () => {
              let _prepareMouseEvent = () => {
                let state = _prepareMouseEvent();
                let (
                  state,
                  gameObject,
                  transform,
                  (
                    cameraController,
                    basicCameraView,
                    perspectiveCameraProjection,
                  ),
                ) =
                  ArcballCameraControllerTool.createGameObject(state);
                let (posX, posY, posZ) as pos = (1., 2., 3.);
                let state =
                  state
                  |> TransformAPI.setTransformLocalPosition(transform, pos);
                let _ = TransformAPI.getTransformPosition(transform, state);
                let target = pos;
                let moveSpeedX = 0.1;
                let moveSpeedY = 0.2;
                let state =
                  state
                  |> setArcballCameraControllerTarget(
                       cameraController,
                       target,
                     )
                  |> setArcballCameraControllerMoveSpeedX(
                       cameraController,
                       moveSpeedX,
                     )
                  |> setArcballCameraControllerMoveSpeedY(
                       cameraController,
                       moveSpeedY,
                     );
                let state = state |> NoWorkerJobTool.execInitJobs;
                let state =
                  ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
                    cameraController,
                    state,
                  );

                (state, cameraController, (moveSpeedX, moveSpeedY), pos);
              };

              test("test move left", () => {
                let (
                  state,
                  cameraController,
                  (moveSpeedX, moveSpeedY),
                  (posX, posY, posZ),
                ) =
                  _prepareMouseEvent();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getKeyboardEventBindedDom(state),
                  KeyboardEventTool.buildKeyboardEvent(~keyCode=65, ()),
                );
                let state = EventTool.restore(state);

                state
                |> unsafeGetArcballCameraControllerTarget(cameraController)
                |> expect == (posX -. moveSpeedX, posY, posZ);
              });
              test("test move right", () => {
                let (
                  state,
                  cameraController,
                  (moveSpeedX, moveSpeedY),
                  (posX, posY, posZ),
                ) =
                  _prepareMouseEvent();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getKeyboardEventBindedDom(state),
                  KeyboardEventTool.buildKeyboardEvent(~keyCode=39, ()),
                );
                let state = EventTool.restore(state);

                state
                |> unsafeGetArcballCameraControllerTarget(cameraController)
                |> expect == (posX +. moveSpeedX, posY, posZ);
              });
              test("test move up", () => {
                let (
                  state,
                  cameraController,
                  (moveSpeedX, moveSpeedY),
                  (posX, posY, posZ),
                ) =
                  _prepareMouseEvent();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getKeyboardEventBindedDom(state),
                  KeyboardEventTool.buildKeyboardEvent(~keyCode=87, ()),
                );
                let state = EventTool.restore(state);

                state
                |> unsafeGetArcballCameraControllerTarget(cameraController)
                |> expect == (posX, posY +. moveSpeedY, posZ);
              });
              test("test move down", () => {
                let (
                  state,
                  cameraController,
                  (moveSpeedX, moveSpeedY),
                  (posX, posY, posZ),
                ) =
                  _prepareMouseEvent();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getKeyboardEventBindedDom(state),
                  KeyboardEventTool.buildKeyboardEvent(~keyCode=83, ()),
                );
                let state = EventTool.restore(state);

                state
                |> unsafeGetArcballCameraControllerTarget(cameraController)
                |> expect == (posX, posY -. moveSpeedY, posZ);
              });
            })
          );
        });

        describe("add event handleFunc to state", () =>
          test("test unbind keydown event", () => {
            let state = _prepareMouseEvent();
            let (
              state,
              gameObject,
              transform,
              (
                cameraController,
                basicCameraView,
                perspectiveCameraProjection,
              ),
            ) =
              ArcballCameraControllerTool.createGameObject(state);
            let state = state |> NoWorkerJobTool.execInitJobs;
            let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox);

            let state =
              state
              |> GameObjectTool.disposeGameObjectArcballCameraControllerComponent(
                   gameObject,
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
          })
        );
        /* TODO test more unbind events */
      });

      describe("test bind two arcballCameraControllers' event", () => {
        /* let warn = ref(Obj.magic(1));

        beforeEach(() =>
          warn :=
            createMethodStubWithJsObjSandbox(sandbox, Console.console, "warn")
        ); */

        /* test("should warn: expect only has one arcballCameraController", () => {
          let state = _prepareMouseEvent();
          let (state, gameObject1, _, (cameraController1, _, _)) =
            ArcballCameraControllerTool.createGameObject(state);
          let (state, gameObject2, _, (cameraController2, _, _)) =
            ArcballCameraControllerTool.createGameObject(state);
          let state = state |> NoWorkerJobTool.execInitJobs;
          let state =
            ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
              cameraController1,
              state,
            );
          let state =
            ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
              cameraController2,
              state,
            );

          let state = EventTool.restore(state);

          warn^
          |> withOneArg(
               "Warn: expect only has one arcballCameraController, but actual > 1. please dispose others.",
             )
          |> getCallCount
          |> expect == 5;
        }); */
        test("test bind keydown event", () => {
          let state = _prepareMouseEvent();
          let (state, gameObject1, _, (cameraController1, _, _)) =
            ArcballCameraControllerTool.createGameObject(state);
          let (state, gameObject2, _, (cameraController2, _, _)) =
            ArcballCameraControllerTool.createGameObject(state);
          let state = state |> NoWorkerJobTool.execInitJobs;
          let state =
            ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
              cameraController1,
              state,
            );
          let state =
            ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
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
        });
      });
    });
  });