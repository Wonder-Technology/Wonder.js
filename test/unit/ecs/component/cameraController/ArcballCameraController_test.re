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
      test("add to dirty array", () => {
        let (state, cameraController) =
          createArcballCameraController(state^);
        state
        |> ArcballCameraControllerTool.getDirtyArray
        |> expect == [|cameraController|];
      });
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
        test("dirtyArray: remove from array", () => {
          let (state, gameObject1, _, (cameraController1, _, _)) =
            ArcballCameraControllerTool.createGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectArcballCameraControllerComponent(
                 gameObject1,
                 cameraController1,
               );
          let {dirtyArray} = state.arcballCameraControllerRecord;
          dirtyArray
          |> WonderCommonlib.ArrayService.removeDuplicateItems
          |> expect == [||];
        });
        test(
          "remove from distanceMap, minDistanceMap, phiMap, thetaMap, thetaMarginMap, targetMap, moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, wheelSpeedMap, gameObjectMap",
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
            } =
              state.arcballCameraControllerRecord;
            (
              distanceMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              minDistanceMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              phiMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              thetaMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              thetaMarginMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              targetMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              moveSpeedXMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              moveSpeedYMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              rotateSpeedMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              wheelSpeedMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              gameObjectMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
            )
            |>
            expect == (
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

        describe("remove from eventHandleFunc map", () => {
          test("unbind event", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let (state, gameObject1, _, (cameraController1, _, _)) =
              ArcballCameraControllerTool.createGameObject(state);
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);
            let pointDragHandleFunc =
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
              |> ManageEventAPI.onCustomGlobalEvent(
                   NameEventService.getPointDragEventName(),
                   0,
                   pointDragHandleFunc,
                 )
              |> ManageEventAPI.onCustomGlobalEvent(
                   NameEventService.getPointScaleEventName(),
                   0,
                   pointScaleHandleFunc,
                 )
              |> ManageEventAPI.onKeyboardEvent(
                   EventType.KeyDown,
                   0,
                   keydownHandleFunc,
                 );
            let state =
              state
              |> ArcballCameraControllerTool.setPointDragEventHandleFunc(
                   cameraController1,
                   pointDragHandleFunc,
                 )
              |> ArcballCameraControllerTool.setPointScaleEventHandleFunc(
                   cameraController1,
                   pointScaleHandleFunc,
                 )
              |> ArcballCameraControllerTool.setKeydownEventHandleFunc(
                   cameraController1,
                   keydownHandleFunc,
                 );

            let state =
              state
              |> GameObjectTool.disposeGameObjectArcballCameraControllerComponent(
                   gameObject1,
                   cameraController1,
                 );

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousewheel",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "keydown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);
            value^ |> expect == 0;
          });
          test("remove from map", () => {
            let (state, gameObject1, _, (cameraController1, _, _)) =
              ArcballCameraControllerTool.createGameObject(state^);
            let value = ref(0);
            let pointDragHandleFunc =
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
              |> ArcballCameraControllerTool.setPointDragEventHandleFunc(
                   cameraController1,
                   pointDragHandleFunc,
                 )
              |> ArcballCameraControllerTool.setPointScaleEventHandleFunc(
                   cameraController1,
                   pointScaleHandleFunc,
                 )
              |> ArcballCameraControllerTool.setKeydownEventHandleFunc(
                   cameraController1,
                   keydownHandleFunc,
                 );

            let state =
              state
              |> GameObjectTool.disposeGameObjectArcballCameraControllerComponent(
                   gameObject1,
                   cameraController1,
                 );

            let {
              pointDragEventHandleFuncMap,
              pointScaleEventHandleFuncMap,
              keydownEventHandleFuncMap,
            } =
              state.arcballCameraControllerRecord;
            (
              pointDragEventHandleFuncMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              pointScaleEventHandleFuncMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
              keydownEventHandleFuncMap
              |> WonderCommonlib.SparseMapService.has(cameraController1),
            )
            |> expect == (false, false, false);
          });
        });
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