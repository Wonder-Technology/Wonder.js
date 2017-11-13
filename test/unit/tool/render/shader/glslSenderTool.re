let disableVertexAttribArray = (state: StateDataType.state) =>
  GLSLSenderSystem.disableVertexAttribArray([@bs] DeviceManagerSystem.getGl(state), state);

/* let cleanLastSendArrayBuffer = (state: StateDataType.state) => {
     GlslSenderStateUtils.getGLSLSenderData(state).lastSendArrayBuffer = None;
     state
   }; */
module JudgeSendUniformData = {
  let _render = (state: StateDataType.state) => state |> WebGLRenderTool.render;
  let _prepareSendUinformData = (sandbox, state) => {
    let (state, gameObject, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
    let (state, _, cameraTransform, cameraController) =
      CameraControllerTool.createCameraGameObject(state);
    (
      state,
      gameObject,
      GameObject.getGameObjectTransformComponent(gameObject, state),
      cameraTransform,
      cameraController
    )
  };
  let testSendMatrix4 =
      (sandbox, name, setFunc, targetData, ~testFunc=(_prepareSendUinformData) => (), ()) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(StateSystem.createState());
                beforeEach(() => state := RenderJobsTool.initWithRenderConfig());
                /* test(
                     "if cached, not send",
                     () => {
                       let (state, _, gameObjectTransform, cameraTransform, cameraController) =
                         _prepareSendUinformData(sandbox, state^);
                       let state =
                         setFunc(gameObjectTransform, cameraTransform, cameraController, state);
                       let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                       let pos = 0;
                       let getUniformLocation =
                         GlslLocationTool.getUniformLocation(~pos, sandbox, name);
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
                         state
                         |> RenderJobsTool.initSystemAndRender
                         |> RenderJobsTool.updateSystem
                         |> _render;
                       let state = state |> RenderJobsTool.updateSystem |> _render;
                       uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 1
                     }
                   ); */
                test(
                  "test send",
                  () => {
                    let (state, _, gameObjectTransform, cameraTransform, cameraController) =
                      _prepareSendUinformData(sandbox, state^);
                    let state =
                      setFunc(gameObjectTransform, cameraTransform, cameraController, state);
                    let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 0;
                    let getUniformLocation =
                      GlslLocationTool.getUniformLocation(~pos, sandbox, name);
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
                      state
                      |> RenderJobsTool.initSystemAndRender
                      |> RenderJobsTool.updateSystem
                      |> _render;
                    /* uniformMatrix4fv
                       |> getArgs
                       |> expect
                       == [] */
                    uniformMatrix4fv
                    |> expect
                    |> toCalledWith([pos, Obj.magic(Js.false_), Obj.magic(targetData)])
                  }
                );
                testFunc(_prepareSendUinformData)
              }
            )
          )
        )
      )
    );
};