open Wonder_jest;

let _ =
  describe(
    "test vbo buffer",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.init(
              ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "fix bug",
        () =>
          describe(
            "test getOrCreateBuffer",
            () =>
              describe(
                "test create geometry after dispose one, invoke getOrCreateBuffer should create new buffer",
                () => {
                  let _prepare = (state) => {
                    let state = MemoryConfigTool.setConfig(state, ~maxDisposeCount=1, ());
                    let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state);
                    let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                    let (state, gameObject3, geometry3) = BoxGeometryTool.createGameObject(state);
                    let state = state |> GeometryTool.initGeometrys;
                    (state, gameObject1, geometry1, gameObject2, geometry2, gameObject3, geometry3)
                  };
                  test(
                    "test array buffer and element array buffer",
                    () => {
                      open StateDataType;
                      let (
                        state,
                        gameObject1,
                        geometry1,
                        gameObject2,
                        geometry2,
                        gameObject3,
                        geometry3
                      ) =
                        _prepare(state^);
                      let buffer = Obj.magic(10);
                      let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      createBuffer |> returns(buffer);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ())
                           );
                      let _ = VboBufferTool.getOrCreateArrayBuffer(geometry1, state);
                      let _ = VboBufferTool.getOrCreateArrayBuffer(geometry2, state);
                      let _ = VboBufferTool.getOrCreateArrayBuffer(geometry3, state);
                      let state =
                        state
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                      let (state, gameObject4, geometry4) =
                        BoxGeometryTool.createGameObject(state);
                      let state = state |> GameObject.initGameObject(gameObject4);
                      let _ = VboBufferTool.getOrCreateArrayBuffer(geometry4, state);
                      let _ = VboBufferTool.getOrCreateElementArrayBuffer(geometry4, state);
                      createBuffer |> getCallCount |> expect == 5
                    }
                  )
                }
              )
          )
      )
    }
  );