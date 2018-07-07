open Wonder_jest;

let _ =
  describe("ManageEventMainService", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test custom gameObject event", () => {
      describe("test bind", () => {
        test("test bind one gameObject", () => {
          let value = ref(0);
          let (state, gameObject) = GameObjectAPI.createGameObject(state^);

          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject,
              0,
              (. event, state) => {
                value := 1;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.triggerCustomGameObjectEvent(
              CustomEventTool.createCustomEvent(
                ~eventName=CustomEventTool.getPointDownEventName(),
                (),
              ),
              gameObject,
              state,
            );

          value^ |> expect == 1;
        });
        test("test bind three gameObjects", () => {
          let value = ref(1);
          let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
          let (state, gameObject2) = GameObjectAPI.createGameObject(state);
          let (state, gameObject3) = GameObjectAPI.createGameObject(state);

          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject1,
              0,
              (. event, state) => {
                value := value^ * 2;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject2,
              0,
              (. event, state) => {
                value := value^ * 3;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject2,
              0,
              (. event, state) => {
                value := value^ * 4;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.triggerCustomGameObjectEvent(
              CustomEventTool.createCustomEvent(
                ~eventName=CustomEventTool.getPointDownEventName(),
                (),
              ),
              gameObject2,
              state,
            );
          let state =
            ManageEventAPI.triggerCustomGameObjectEvent(
              CustomEventTool.createCustomEvent(
                ~eventName=CustomEventTool.getPointDownEventName(),
                (),
              ),
              gameObject3,
              state,
            );

          value^ |> expect == 1 * 3 * 4;
        });
      });

      describe("test unbind by handleFunc", () =>
        test("test", () => {
          let (state, gameObject) = GameObjectAPI.createGameObject(state^);
          let value = ref(0);
          let handleFunc = (. event, state) => {
            value := value^ + 1;
            state;
          };

          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject,
              0,
              handleFunc,
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject,
              0,
              (. event, state) => {
                value := value^ + 10;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.offCustomGameObjectEventByHandleFunc(
              CustomEventTool.getPointDownEventName(),
              gameObject,
              handleFunc,
              state,
            );
          let state =
            ManageEventAPI.triggerCustomGameObjectEvent(
              CustomEventTool.createCustomEvent(
                ~eventName=CustomEventTool.getPointDownEventName(),
                (),
              ),
              gameObject,
              state,
            );

          value^ |> expect == 10;
        })
      );

      describe("test unbind by target", () =>
        test("test", () => {
          let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
          let value = ref(0);
          let handleFunc = (. event, state) => {
            value := value^ + 1;
            state;
          };

          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject1,
              0,
              handleFunc,
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject1,
              0,
              (. event, state) => {
                value := value^ + 10;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.offCustomGameObjectEventByTarget(
              CustomEventTool.getPointDownEventName(),
              gameObject1,
              state,
            );
          let state =
            ManageEventAPI.triggerCustomGameObjectEvent(
              CustomEventTool.createCustomEvent(
                ~eventName=CustomEventTool.getPointDownEventName(),
                (),
              ),
              gameObject1,
              state,
            );

          value^ |> expect == 0;
        })
      );

      describe("test priority", () =>
        test("the higher priority handleFunc is executed first", () => {
          let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
          let value = ref(2);

          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject1,
              1,
              (. event, state) => {
                value := value^ - 3;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject1,
              0,
              (. event, state) => {
                value := value^ * 2;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.triggerCustomGameObjectEvent(
              CustomEventTool.createCustomEvent(
                ~eventName=CustomEventTool.getPointDownEventName(),
                (),
              ),
              gameObject1,
              state,
            );

          value^ |> expect == (-2);
        })
      );

      describe("test broadcast custom gameObject event", () =>
        test("trigger gameObject's and its all children' custom event", () => {
          let value = ref(0);
          let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
          let (state, gameObject2) = GameObjectAPI.createGameObject(state);
          let (state, gameObject3) = GameObjectAPI.createGameObject(state);

          let state =
            state
            |> GameObjectTool.addChild(gameObject1, gameObject2)
            |> GameObjectTool.addChild(gameObject2, gameObject3);

          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject1,
              0,
              (. event, state) => {
                value := value^ + 1;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject2,
              0,
              (. event, state) => {
                value := value^ + 2;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject3,
              0,
              (. event, state) => {
                value := value^ + 3;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.broadcastCustomGameObjectEvent(
              CustomEventTool.createCustomEvent(
                ~eventName=CustomEventTool.getPointDownEventName(),
                (),
              ),
              gameObject1,
              state,
            );

          value^ |> expect == 0 + 1 + 2 + 3;
        })
      );

      describe("test emit custom gameObject event", () =>
        test("trigger gameObject's and its all parents' custom event", () => {
          let value = ref(2);
          let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
          let (state, gameObject2) = GameObjectAPI.createGameObject(state);
          let (state, gameObject3) = GameObjectAPI.createGameObject(state);

          let state =
            state
            |> GameObjectTool.addChild(gameObject1, gameObject2)
            |> GameObjectTool.addChild(gameObject2, gameObject3);

          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject1,
              0,
              (. event, state) => {
                value := value^ + 1;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject2,
              0,
              (. event, state) => {
                value := value^ + 2;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.onCustomGameObjectEvent(
              CustomEventTool.getPointDownEventName(),
              gameObject3,
              0,
              (. event, state) => {
                value := value^ * 3;
                state;
              },
              state,
            );
          let state =
            ManageEventAPI.emitCustomGameObjectEvent(
              CustomEventTool.createCustomEvent(
                ~eventName=CustomEventTool.getPointDownEventName(),
                (),
              ),
              gameObject3,
              state,
            );

          value^ |> expect == 2 * 3 + 2 + 1;
        })
      );
    });
  });