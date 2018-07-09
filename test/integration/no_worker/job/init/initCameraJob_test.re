open Wonder_jest;

open BasicCameraViewAPI;

open ArcballCameraControllerAPI;

let _ =
  describe("test init camera job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe
    ("init perspectiveCameraProjection",
    (
    () => {
    let _buildNoWorkerJobConfig = () =>
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_camera"
        }
      ]
    }
  ]
        |},
        ~initJobs=
          {|
[
        {
          "name": "init_camera"
        }
]
        |},
        (),
      );
    
    CameraTool.testBuildPMatrix(
      () =>
        TestTool.initWithJobConfigWithoutBuildFakeDom(
          ~sandbox,
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          (),
        ),
      state => state |> DirectorTool.init,
    );
    })
    );


    describe("init arcballCameraController", () => {
      let _prepare = () => {
        let state =
          MouseEventTool.prepareWithState(
            ~sandbox,
            ~state=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~noWorkerJobRecord=
                  NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                    ~initPipelines=
                      {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_event"
        },
        {
          "name": "init_camera"
        }
      ]
    }
  ]
        |},
                    ~initJobs=
                      {j|
[

    {
          "name": "init_event"
    },
        {
          "name": "init_camera"
        }
]
        |j},
                    (),
                  ),
                (),
              ),
            (),
          );
        MouseEventTool.setPointerLocked(.);
        state;
      };

      describe("test init one arcballCameraController", () => {
        describe("bind event", () => {
          describe("bind point drag event", () =>
            describe("change orbit", () =>
              test("set phi and theta", () => {
                let state = _prepare();
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

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(),
                );
                EventTool.triggerDomEvent(
                  "mousemove",
                  EventTool.getBody(),
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
              let state = _prepare();
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
              let preventDefaultFunc =
                createEmptyStubWithJsObjSandbox(sandbox);

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousewheel",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(~preventDefaultFunc, ()),
              );
              let state = EventTool.restore(state);

              preventDefaultFunc |> expect |> toCalledOnce;
            });

            test("set distance", () => {
              let state = _prepare();
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

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousewheel",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(
                  ~detail=Js.Nullable.return(-3),
                  (),
                ),
              );
              let state = EventTool.restore(state);

              state
              |> unsafeGetArcballCameraControllerDistance(cameraController)
              |> expect == wheelSpeed
              *. 3.;
            });
          });

          describe("bind keydown event", () =>
            describe("set target", () => {
              let _prepare = () => {
                let state = _prepare();
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

                (state, cameraController, (moveSpeedX, moveSpeedY), pos);
              };

              test("test move left", () => {
                let (
                  state,
                  cameraController,
                  (moveSpeedX, moveSpeedY),
                  (posX, posY, posZ),
                ) =
                  _prepare();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getBody(),
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
                  _prepare();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getBody(),
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
                  _prepare();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getBody(),
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
                  _prepare();

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keydown",
                  EventTool.getBody(),
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
            let state = _prepare();
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
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(~preventDefaultFunc, ()),
            );
            let state = EventTool.restore(state);

            preventDefaultFunc |> expect |> not_ |> toCalled;
          })
        );
        /* TODO test more unbind events */
      });

      describe("test init two arcballCameraControllers", () =>
        test("test bind keydown event", () => {
          let state = _prepare();
          let (state, gameObject1, _, (cameraController1, _, _)) =
            ArcballCameraControllerTool.createGameObject(state);
          let (state, gameObject2, _, (cameraController2, _, _)) =
            ArcballCameraControllerTool.createGameObject(state);
          let state = state |> NoWorkerJobTool.execInitJobs;
          let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox);

          let state = MainStateTool.setState(state);
          EventTool.triggerDomEvent(
            "mousewheel",
            EventTool.getBody(),
            MouseEventTool.buildMouseEvent(~preventDefaultFunc, ()),
          );
          let state = EventTool.restore(state);

          preventDefaultFunc |> expect |> toCalledTwice;
        })
      );
    });
  });