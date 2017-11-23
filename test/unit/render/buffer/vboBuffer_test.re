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
        "test buffer pool",
        () =>
          describe(
            "test create geometry after dispose one",
            () => {
              let _prepare = (state) => {
                let state = MemoryConfigTool.setConfig(state, ~maxDisposeCount=1, ());
                let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state);
                let state = state |> GeometryTool.initGeometrys;
                (state, gameObject1, geometry1)
              };
              test(
                "getOrCreateBuffer should use created buffer previously in pool",
                () => {
                  open StateDataType;
                  let (state, gameObject1, geometry1) = _prepare(state^);
                  let arrayBuffer1 = Obj.magic(10);
                  let arrayBuffer2 = Obj.magic(11);
                  let elementArrayBuffer1 = Obj.magic(12);
                  let elementArrayBuffer2 = Obj.magic(13);
                  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                  createBuffer |> onCall(0) |> returns(arrayBuffer1);
                  createBuffer |> onCall(1) |> returns(elementArrayBuffer1);
                  createBuffer |> onCall(2) |> returns(arrayBuffer2);
                  createBuffer |> onCall(3) |> returns(elementArrayBuffer2);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
                  let resultArrayBuffer1 = VboBufferTool.getOrCreateArrayBuffer(geometry1, state);
                  let resultElementArrayBuffer1 =
                    VboBufferTool.getOrCreateElementArrayBuffer(geometry1, state);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                  let state = state |> GameObject.initGameObject(gameObject2);
                  let resultArrayBuffer2 = VboBufferTool.getOrCreateArrayBuffer(geometry2, state);
                  let resultElementArrayBuffer2 =
                    VboBufferTool.getOrCreateElementArrayBuffer(geometry2, state);
                  (createBuffer |> getCallCount, resultArrayBuffer2, resultElementArrayBuffer2)
                  |> expect == (2, arrayBuffer1, elementArrayBuffer1)
                }
              )
            }
          )
      )
    }
  );