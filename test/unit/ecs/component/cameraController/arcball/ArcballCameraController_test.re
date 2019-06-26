open ArcballCameraControllerAPI;

open StateDataMainType;

open ArcballCameraControllerType;

open Wonder_jest;

let _ =
  describe("ArcballCameraController", () => {
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

    describe("createArcballCameraController", () => {
      test("create a new camera which is just index(int)", () => {
        let (_, cameraController) = createArcballCameraController(state^);
        expect(cameraController) == 0;
      });
      describe("change state", () =>
        test("state->index + 1", () => {
          let (state, _) = createArcballCameraController(state^);
          state.arcballCameraControllerRecord
          |> (record => expect(record.index) == 1);
        })
      );
    });

    describe("unsafeGetArcballCameraControllerGameObject", () =>
      test("get cameraController's gameObject", () => {
        open GameObjectAPI;
        let (state, cameraController) =
          createArcballCameraController(state^);
        let (state, gameObject) = state |> GameObjectAPI.createGameObject;
        let state =
          state
          |> addGameObjectArcballCameraControllerComponent(
               gameObject,
               cameraController,
             );
        state
        |> unsafeGetArcballCameraControllerGameObject(cameraController)
        |> expect == gameObject;
      })
    );

    describe("bind/unbind arcballCameraController event", () => {
      let _prepareMouseEvent = sandbox => {
        let state = EventCameraControllerTool.prepareMouseEvent(sandbox);
        let (state, gameObject, _, (cameraController, _, _)) =
          ArcballCameraControllerTool.createGameObject(state);
        let state = state |> NoWorkerJobTool.execInitJobs;
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

        (state, cameraController, phi, theta);
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

      describe(
        "if unbind event, arcballCameraController event shouldn't work", () =>
        test("test point drag event", () => {
          let (state, cameraController, phi, theta) =
            _prepareMouseEvent(sandbox);
          let state =
            ArcballCameraControllerAPI.unbindArcballCameraControllerEvent(
              cameraController,
              state,
            );

          let state = _triggerEvent(state);

          (
            state |> unsafeGetArcballCameraControllerPhi(cameraController),
            state |> unsafeGetArcballCameraControllerTheta(cameraController),
          )
          |> expect == (phi, theta);
        })
      );

      describe(
        "if bind event after unbind event, arcballCameraController event should work",
        () =>
        test("test point drag event", () => {
          let (state, cameraController, phi, theta) =
            _prepareMouseEvent(sandbox);
          let (state, _) =
            MouseEventTool.prepareForPointerLock(sandbox, state);
          let state =
            ArcballCameraControllerAPI.unbindArcballCameraControllerEvent(
              cameraController,
              state,
            );
          let state =
            ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
              cameraController,
              state,
            );

          let state = _triggerEvent(state);

          (
            state |> unsafeGetArcballCameraControllerPhi(cameraController),
            state |> unsafeGetArcballCameraControllerTheta(cameraController),
          )
          |> expect != (phi, theta);
        })
      );
    });

    describe("dispose component", () => {
      let _prepareTwo = state => {
        let (state, gameObject1, _, (cameraController1, _, _)) =
          ArcballCameraControllerTool.createGameObject(state^);
        let (state, gameObject2, _, (cameraController2, _, _)) =
          ArcballCameraControllerTool.createGameObject(state);
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
          "remove from distanceMap, minDistanceMap, phiMap, thetaMap, thetaMarginMap, targetMap, moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, wheelSpeedMap, gameObjectMap, directionArrayMap",
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
              |> GameObjectTool.disposeGameObjectArcballCameraControllerComponent(
                   gameObject1,
                   cameraController1,
                 );
            let {
              distanceMap,
              minDistanceMap,
              phiMap,
              thetaMap,
              thetaMarginMap,
              targetMap,
              moveSpeedXMap,
              moveSpeedYMap,
              rotateSpeedMap,
              wheelSpeedMap,
              gameObjectMap,
              directionArrayMap,
            } =
              state.arcballCameraControllerRecord;
            (
              distanceMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              minDistanceMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              phiMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              thetaMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              thetaMarginMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              targetMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              moveSpeedXMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              moveSpeedYMap
              |> WonderCommonlib.MutableSparseMapService.has(
                   cameraController1,
                 ),
              rotateSpeedMap
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
            |> expect
            == (
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
               );
          },
        );

        describe("remove from eventHandleFunc map", () =>
          test("remove from map", () => {
            let (state, gameObject1, _, (cameraController1, _, _)) =
              ArcballCameraControllerTool.createGameObject(state^);
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
            let keyupHandleFunc =
              (. event, state) => {
                value := value^ + 3;
                state;
              };
            let state =
              state
              |> ArcballCameraControllerTool.addPointDragStartEventHandleFunc(
                   cameraController1,
                   pointDragStartHandleFunc,
                 )
              |> ArcballCameraControllerTool.addPointDragDropEventHandleFunc(
                   cameraController1,
                   pointDragDropHandleFunc,
                 )
              |> ArcballCameraControllerTool.addPointDragOverEventHandleFunc(
                   cameraController1,
                   pointDragOverHandleFunc,
                 )
              |> ArcballCameraControllerTool.addPointScaleEventHandleFunc(
                   cameraController1,
                   pointScaleHandleFunc,
                 )
              |> ArcballCameraControllerTool.addKeydownEventHandleFunc(
                   cameraController1,
                   keydownHandleFunc,
                 )
              |> ArcballCameraControllerTool.addKeyupEventHandleFunc(
                   cameraController1,
                   keyupHandleFunc,
                 );

            let state =
              state
              |> GameObjectTool.disposeGameObjectArcballCameraControllerComponent(
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
            } =
              state.arcballCameraControllerRecord;
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

        describe("fix bug", () =>
          test(
            {|dispose component;
  loopBody;
  loopBody;

component should be removed from gameObject
  |},
            () => {
              let (state, gameObject1, _, (cameraController1, _, _)) =
                ArcballCameraControllerTool.createGameObject(state^);
              let state =
                state
                |> GameObjectAPI.disposeGameObjectArcballCameraControllerComponent(
                     gameObject1,
                     cameraController1,
                   );

              let state = state |> DisposeJob.execJob(None);
              let state = state |> DisposeJob.execJob(None);

              GameObjectAPI.hasGameObjectArcballCameraControllerComponent(
                gameObject1,
                state,
              )
              |> expect == false;
            },
          )
        );
      });
    });

    describe("unsafeGetDistance", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 65.;
        let state =
          state |> setArcballCameraControllerDistance(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerDistance(cameraController)
        |> expect == value;
      })
    );
    describe("unsafeGetDistance", () => {
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 65.;
        let state =
          state |> setArcballCameraControllerDistance(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerDistance(cameraController)
        |> expect == value;
      });
      test("constrain distance", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);

        let minDistance = 2.;
        let state =
          state
          |> setArcballCameraControllerMinDistance(
               cameraController,
               minDistance,
             );
        let distance = 1.;
        let state =
          state
          |> setArcballCameraControllerDistance(cameraController, distance);
        state
        |> unsafeGetArcballCameraControllerDistance(cameraController)
        |> expect == minDistance;
      });
    });
    describe("unsafeGetMinDistance", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 65.;
        let state =
          state
          |> setArcballCameraControllerMinDistance(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerMinDistance(cameraController)
        |> expect == value;
      })
    );
    describe("unsafeGetWheelSpeed", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 65.;
        let state =
          state
          |> setArcballCameraControllerWheelSpeed(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerWheelSpeed(cameraController)
        |> expect == value;
      })
    );
    describe("unsafeGetRotateSpeed", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 65.;
        let state =
          state
          |> setArcballCameraControllerRotateSpeed(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerRotateSpeed(cameraController)
        |> expect == value;
      })
    );
    describe("unsafeGetPhi", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 65.;
        let state =
          state |> setArcballCameraControllerPhi(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerPhi(cameraController)
        |> expect == value;
      })
    );
    describe("unsafeGetTheta", () => {
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 0.5;
        let state =
          state |> setArcballCameraControllerTheta(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerTheta(cameraController)
        |> expect == value;
      });
      test("constrain theta", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let theta = 3.2;
        let thetaMargin = 1.;
        let state =
          state
          |> setArcballCameraControllerThetaMargin(
               cameraController,
               thetaMargin,
             )
          |> setArcballCameraControllerTheta(cameraController, theta);
        state
        |> unsafeGetArcballCameraControllerTheta(cameraController)
        |> expect == Js.Math._PI
        -. thetaMargin;
      });
    });
    describe("unsafeGetThetaMargin", () => {
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 1.;
        let state =
          state
          |> setArcballCameraControllerThetaMargin(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerThetaMargin(cameraController)
        |> expect == value;
      });
      test("constrain theta", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let theta = 3.2;
        let thetaMargin = 1.;
        let state =
          state
          |> setArcballCameraControllerTheta(cameraController, theta)
          |> setArcballCameraControllerThetaMargin(
               cameraController,
               thetaMargin,
             );
        state
        |> unsafeGetArcballCameraControllerTheta(cameraController)
        |> expect == Js.Math._PI
        -. thetaMargin;
      });
    });
    describe("unsafeGetTarget", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let target = (1., 2., 5.);
        let state =
          state |> setArcballCameraControllerTarget(cameraController, target);
        state
        |> unsafeGetArcballCameraControllerTarget(cameraController)
        |> expect == target;
      })
    );
    describe("unsafeGetDirectionArray", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let directionArray = [|Left, Up|];
        let state =
          state
          |> setArcballCameraControllerDirectionArray(
               cameraController,
               directionArray,
             );
        state
        |> unsafeGetArcballCameraControllerDirectionArray(cameraController)
        |> expect == directionArray;
      })
    );
    describe("unsafeGetMoveSpeedX", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 65.;
        let state =
          state
          |> setArcballCameraControllerMoveSpeedX(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerMoveSpeedX(cameraController)
        |> expect == value;
      })
    );
    describe("unsafeGetMoveSpeedY", () =>
      test("test", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        let value = 65.;
        let state =
          state
          |> setArcballCameraControllerMoveSpeedY(cameraController, value);
        state
        |> unsafeGetArcballCameraControllerMoveSpeedY(cameraController)
        |> expect == value;
      })
    );
  });