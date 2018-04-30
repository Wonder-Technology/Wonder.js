open Wonder_jest;

let _ =
  describe(
    "test front render light batch instance",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _createSourceInstanceGameObject = FrontRenderLightBatchInstanceTool.createSourceInstanceGameObject;
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
          RenderBatchInstanceTool.testProgram(
            sandbox,
            FrontRenderLightBatchInstanceTool.prepare,
            state
          )
      );
      describe(
        "send attribute record",
        () => {
          describe(
            "send sourceInstance gameObject's a_position",
            () =>
              RenderBatchInstanceTool.testAttachBufferToAttribute(
                sandbox,
                ("a_position", 0, 3),
                FrontRenderLightBatchInstanceTool.prepare,
                state
              )
          );
          describe(
            "send sourceInstance gameObject's a_normal",
            () =>
              RenderBatchInstanceTool.testAttachBufferToAttribute(
                sandbox,
                ("a_normal", 1, 3),
                FrontRenderLightBatchInstanceTool.prepare,
                state
              )
          )
        }
      );
      describe(
        "send uniform record",
        () => {
          RenderBatchInstanceTool.testSendShaderUniformData(
            sandbox,
            (FrontRenderLightBatchInstanceTool.prepare, _createSourceInstanceGameObject),
            state
          );
          GLSLSenderTool.JudgeSendUniformData.testSendVector3(
            sandbox,
            "u_diffuse",
            (_, (gameObjectTransform, material), (cameraTransform, basicCameraView), state) =>
              state |> LightMaterialAPI.setLightMaterialDiffuseColor(material, [|0., 1., 0.2|]),
            [0., 1., 0.20000000298023224],
            ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
            ()
          );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix3(
            sandbox,
            "u_normalMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (10., 2., 3.)),
            Js.Typed_array.Float32Array.make([|1., 0., 0., 0., 1., 0., 0., 0., 1.|]),
            ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
            ()
          );
          describe(
            "send object instance gameObject's record",
            () => {
              test(
                "send u_mMatrix record",
                () => {
                  let name = "u_mMatrix";
                  let (state, _, _, _) =
                    FrontRenderLightBatchInstanceTool.prepare(sandbox, 2, state^);
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
                  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                  uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2 + 3
                }
              );
              test(
                "send u_normalMatrix record",
                () => {
                  let name = "u_normalMatrix";
                  let (state, _, _, _) =
                    FrontRenderLightBatchInstanceTool.prepare(sandbox, 2, state^);
                  let (state, gameObject2, _, _) =
                    _createSourceInstanceGameObject(sandbox, 3, state);
                  let uniformMatrix3fv = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 1;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~uniformMatrix3fv,
                           ~getUniformLocation,
                           ()
                         )
                       );
                  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                  uniformMatrix3fv
                  |> withThreeArgs(
                       pos,
                       Js.false_,
                       Js.Typed_array.Float32Array.make([|1., 0., 0., 0., 1., 0., 0., 0., 1.|])
                     )
                  |> getCallCount
                  |> expect == 2
                  + 3
                }
              )
            }
          )
        }
      );
      describe(
        "draw",
        () =>
          RenderBatchInstanceTool.testDrawElements(
            sandbox,
            FrontRenderLightBatchInstanceTool.prepare,
            BoxGeometryTool.getIndicesCount,
            state
          )
      )
    }
  );