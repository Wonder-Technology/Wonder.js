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
      test("add to dirty array", () => {
        let (state, cameraController) = createFlyCameraController(state^);
        state
        |> FlyCameraControllerTool.getDirtyArray
        |> expect == [|cameraController|];
      });
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
        let eulerAngleDiff = {diffX: 1., diffY: 0.};
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
        EventTool.triggerDomEvent(
          "mousemove",
          EventTool.getPointEventBindedDom(state),
          MouseEventTool.buildMouseEvent(~movementX=1, ~movementY=2, ()),
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
        test("dirtyArray: remove from array(include duplicated ones)", () => {
          let (state, gameObject1, _, (cameraController1, _, _)) =
            FlyCameraControllerTool.createGameObject(state^);
          let state =
            FlyCameraControllerAPI.setFlyCameraControllerRotateSpeed(
              cameraController1,
              11.,
              state,
            );

          let state =
            state
            |> GameObjectTool.disposeGameObjectFlyCameraControllerComponent(
                 gameObject1,
                 cameraController1,
               );

          state.flyCameraControllerRecord.dirtyArray |> expect == [||];
        });
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
            )
            |> expect == (false, false, false, false, false);
          },
        );

        describe("remove from eventHandleFunc map", () => {
          test("unbind event", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let (state, gameObject1, _, (cameraController1, _, _)) =
              FlyCameraControllerTool.createGameObject(state);
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);
            let pointDownHandleFunc =
              (. event, state) => {
                value := value^ + 25;
                (state, event);
              };
            let pointUpHandleFunc =
              (. event, state) => {
                value := value^ + 28;
                (state, event);
              };
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
                   NameEventService.getPointDownEventName(),
                   0,
                   pointDownHandleFunc,
                 )
              |> ManageEventAPI.onCustomGlobalEvent(
                   NameEventService.getPointUpEventName(),
                   0,
                   pointUpHandleFunc,
                 )
              |> ManageEventAPI.onCustomGlobalEvent(
                   NameEventService.getPointDragOverEventName(),
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
              |> FlyCameraControllerTool.addPointDragStartEventHandleFunc(
                   cameraController1,
                   pointDownHandleFunc,
                 )
              |> FlyCameraControllerTool.addPointDragDropEventHandleFunc(
                   cameraController1,
                   pointUpHandleFunc,
                 )
              |> FlyCameraControllerTool.addPointDragOverEventHandleFunc(
                   cameraController1,
                   pointDragHandleFunc,
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

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousewheel",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "keydown",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);
            value^ |> expect == 0;
          });
          test("remove from map", () => {
            let (state, gameObject1, _, (cameraController1, _, _)) =
              FlyCameraControllerTool.createGameObject(state^);
            let value = ref(0);
            let pointDownHandleFunc =
              (. event, state) => {
                value := value^ + 1;
                (state, event);
              };
            let pointUpHandleFunc =
              (. event, state) => {
                value := value^ + 1;
                (state, event);
              };
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
              |> FlyCameraControllerTool.addPointDragStartEventHandleFunc(
                   cameraController1,
                   pointDownHandleFunc,
                 )
              |> FlyCameraControllerTool.addPointDragDropEventHandleFunc(
                   cameraController1,
                   pointUpHandleFunc,
                 )
              |> FlyCameraControllerTool.addPointDragOverEventHandleFunc(
                   cameraController1,
                   pointDragHandleFunc,
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
            )
            |> expect == (false, false, false, false, false);
          });
        });
      });
    });
    /* describe("unsafeGetDistance", () =>
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 65.;
           let state =
             state |> setFlyCameraControllerDistance(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerDistance(cameraController)
           |> expect == value;
         })
       );
       describe("unsafeGetDistance", () => {
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 65.;
           let state =
             state |> setFlyCameraControllerDistance(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerDistance(cameraController)
           |> expect == value;
         });
         test("constrain distance", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);

           let minDistance = 2.;
           let state =
             state
             |> setFlyCameraControllerMinDistance(
                  cameraController,
                  minDistance,
                );
           let distance = 1.;
           let state =
             state
             |> setFlyCameraControllerDistance(cameraController, distance);
           state
           |> unsafeGetFlyCameraControllerDistance(cameraController)
           |> expect == minDistance;
         });
       });
       describe("unsafeGetMinDistance", () =>
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 65.;
           let state =
             state
             |> setFlyCameraControllerMinDistance(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerMinDistance(cameraController)
           |> expect == value;
         })
       );
       describe("unsafeGetWheelSpeed", () =>
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 65.;
           let state =
             state
             |> setFlyCameraControllerWheelSpeed(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerWheelSpeed(cameraController)
           |> expect == value;
         })
       );
       describe("unsafeGetRotateSpeed", () =>
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 65.;
           let state =
             state
             |> setFlyCameraControllerRotateSpeed(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerRotateSpeed(cameraController)
           |> expect == value;
         })
       );
       describe("unsafeGeteulerAngleDiff", () =>
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 65.;
           let state =
             state |> setFlyCameraControllereulerAngleDiff(cameraController, value);
           state
           |> unsafeGetFlyCameraControllereulerAngleDiff(cameraController)
           |> expect == value;
         })
       );
       describe("unsafeGetTheta", () => {
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 0.5;
           let state =
             state |> setFlyCameraControllerTheta(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerTheta(cameraController)
           |> expect == value;
         });
         test("constrain translationDiff", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let translationDiff = 3.2;
           let translationDiffMargin = 1.;
           let state =
             state
             |> setFlyCameraControllerThetaMargin(
                  cameraController,
                  translationDiffMargin,
                )
             |> setFlyCameraControllerTheta(cameraController, translationDiff);
           state
           |> unsafeGetFlyCameraControllerTheta(cameraController)
           |> expect == Js.Math._PI
           -. translationDiffMargin;
         });
       });
       describe("unsafeGetThetaMargin", () => {
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 1.;
           let state =
             state
             |> setFlyCameraControllerThetaMargin(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerThetaMargin(cameraController)
           |> expect == value;
         });
         test("constrain translationDiff", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let translationDiff = 3.2;
           let translationDiffMargin = 1.;
           let state =
             state
             |> setFlyCameraControllerTheta(cameraController, translationDiff)
             |> setFlyCameraControllerThetaMargin(
                  cameraController,
                  translationDiffMargin,
                );
           state
           |> unsafeGetFlyCameraControllerTheta(cameraController)
           |> expect == Js.Math._PI
           -. translationDiffMargin;
         });
       });
       describe("unsafeGetTarget", () =>
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let target = (1., 2., 5.);
           let state =
             state |> setFlyCameraControllerTarget(cameraController, target);
           state
           |> unsafeGetFlyCameraControllerTarget(cameraController)
           |> expect == target;
         })
       );
       describe("unsafeGetMoveSpeedX", () =>
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 65.;
           let state =
             state
             |> setFlyCameraControllerMoveSpeedX(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerMoveSpeedX(cameraController)
           |> expect == value;
         })
       );
       describe("unsafeGetMoveSpeedY", () =>
         test("test", () => {
           let (state, cameraController) =
             createFlyCameraController(state^);
           let value = 65.;
           let state =
             state
             |> setFlyCameraControllerMoveSpeedY(cameraController, value);
           state
           |> unsafeGetFlyCameraControllerMoveSpeedY(cameraController)
           |> expect == value;
         })
       ); */
  });