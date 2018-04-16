open Wonder_jest;

let _ =
  describe(
    "test clear last send component",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _prepare = (state) => {
        let (state, gameObject, _, material, _) =
          RenderBasicJobTool.prepareGameObject(sandbox, state);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        (state, gameObject, material)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfig(sandbox, LoopRenderJobTool.buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "clear lastSendMaterial",
        () =>
          describe(
            "test create gameObject after dispose one",
            () =>
              test(
                "should send new one's material uniform record",
                () => {
                  let (state, gameObject1, material1) = _prepare(state^);
                  let colorArr1 = [|1.0, 0.1, 0.2|];
                  let state = state |> BasicMaterialAPI.setBasicMaterialColor(material1, colorArr1);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_color");
                  let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~uniform3f, ~getUniformLocation, ())
                       );
                  let state = state |> RenderJobsTool.init;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                  let (state, gameObject2, _, material2, _) =
                    RenderBasicJobTool.prepareGameObject(sandbox, state);
                  let state = state |> GameObjectAPI.initGameObject(gameObject2);
                  let colorArr2 = [|0.0, 0.5, 0.0|];
                  let state = state |> BasicMaterialAPI.setBasicMaterialColor(material2, colorArr2);
                  let state = state |> DirectorTool.runWithDefaultTime;
                  uniform3f
                  |> expect
                  |> toCalledWith([|pos|] |> Js.Array.concat(colorArr2 |> Obj.magic))
                }
              )
          )
      );
      describe(
        "clear lastSendGeometry",
        () =>
          describe(
            "test create gameObject after dispose one",
            () => {
              let _prepareForElementArrayBuffer = (state) => {
                let element_array_buffer = 1;
                let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~element_array_buffer,
                         ~bindBuffer,
                         ~drawElements,
                         ()
                       )
                     );
                let state = state |> RenderJobsTool.init;
                (state, bindBuffer, element_array_buffer)
              };
              test(
                "should bind new one's index buffer",
                () => {
                  let (state, gameObject1, material1) = _prepare(state^);
                  let (state, bindBuffer, element_array_buffer) =
                    _prepareForElementArrayBuffer(state);
                  let state = state |> DirectorTool.runWithDefaultTime;
                  let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                  let (state, gameObject2, geometry2, _, _) =
                    RenderBasicJobTool.prepareGameObject(sandbox, state);
                  let state = state |> GameObjectAPI.initGameObject(gameObject2);
                  let bindElementArrayBufferCallCountAfterFirstRender =
                    bindBuffer |> withOneArg(element_array_buffer) |> getCallCount;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  let bindElementArrayBufferCallCountAfterSecondRender =
                    bindBuffer |> withOneArg(element_array_buffer) |> getCallCount;
                  bindElementArrayBufferCallCountAfterSecondRender
                  |> expect == bindElementArrayBufferCallCountAfterFirstRender
                  * 2
                }
              )
            }
          )
      )
    }
  );