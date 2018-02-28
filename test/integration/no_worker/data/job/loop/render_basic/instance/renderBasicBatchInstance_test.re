open Wonder_jest;

let _ =
  describe(
    "test render basic batch instance",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _createSourceInstanceGameObject = RenderBasicBatchInstanceTool.createSourceInstanceGameObject;
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfig(sandbox, LoopRenderJobTool.buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () =>
          RenderBatchInstanceTool.testProgram(sandbox, RenderBasicBatchInstanceTool.prepare, state)
      );
      describe(
        "send attribute data",
        () =>
          describe(
            "send sourceInstance gameObject's a_position",
            () =>
              RenderBatchInstanceTool.testAttachBufferToAttribute(
                sandbox,
                ("a_position", 0, 3),
                RenderBasicBatchInstanceTool.prepare,
                state
              )
          )
      );
      describe(
        "send uniform data",
        () => {
          RenderBatchInstanceTool.testSendShaderUniformData(
            sandbox,
            (RenderBasicBatchInstanceTool.prepare, _createSourceInstanceGameObject),
            state
          );
          GLSLSenderTool.JudgeSendUniformData.testSendVector3(
            sandbox,
            "u_color",
            (_, (gameObjectTransform, material), (cameraTransform, cameraController), state) =>
              state |> BasicMaterial.setBasicMaterialColor(material, [|0., 1., 0.2|]),
            [0., 1., 0.2],
            ()
          );
          describe(
            "send object instance gameObject's data",
            () =>
              test(
                "send u_mMatrix data",
                () => {
                  let name = "u_mMatrix";
                  let (state, _, _, _) = RenderBasicBatchInstanceTool.prepare(sandbox, 2, state^);
                  let (state, gameObject2, _, _) =
                    _createSourceInstanceGameObject(sandbox, 3, state);
                  let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 1;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~uniformMatrix4fv,
                           ~getUniformLocation,
                           ()
                         )
                       );
                  let state =
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2 + 3
                }
              )
          )
        }
      );
      describe(
        "draw",
        () =>
          RenderBatchInstanceTool.testDrawElements(
            sandbox,
            RenderBasicBatchInstanceTool.prepare,
            state
          )
      )
    }
  );