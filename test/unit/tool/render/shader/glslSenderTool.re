let disableVertexAttribArray = (state: StateDataType.state) =>
  GLSLSenderSystem.disableVertexAttribArray([@bs] DeviceManagerSystem.getGL(state), state);

module JudgeSendUniformData = {
  let _render = (state: StateDataType.state) => state |> WebGLRenderTool.render;
  let _prepareSendUinformData = (sandbox, state) => {
    let (state, gameObject, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
    let (state, _, cameraTransform, cameraController) =
      CameraControllerTool.createCameraGameObject(sandbox, state);
    (
      state,
      gameObject,
      GameObject.getGameObjectTransformComponent(gameObject, state),
      cameraTransform,
cameraController
    )
  };
  let testSendMatrix4 = (sandbox, name, setFunc, targetData) => {
    open Jest;
    open Expect;
    open Expect.Operators;
    open Sinon;
    let state = RenderJobsTool.initWithRenderConfig();
    describe(
      {j|send $name|j},
      () =>
        test(
          "test send",
          () => {
            let (state, _, gameObjectTransform, cameraTransform, cameraController) =
              _prepareSendUinformData(sandbox, state);
            /* let state = state |> Transform.setTransformLocalPosition(cameraTransform, (10.,2.,3.)); */
            let state = setFunc(gameObjectTransform, cameraTransform, cameraController, state);
            let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
            let pos = 0;
            let getUniformLocation = GlslLocationTool.getUniformLocation(~pos, sandbox, name);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~uniformMatrix4fv, ~getUniformLocation, ())
                 );
            let state =
              state |> RenderJobsTool.initSystemAndRender |> RenderJobsTool.updateSystem |> _render;
            /* uniformMatrix4fv
            |> getArgs
            |> expect
            == [] */
            uniformMatrix4fv
            |> expect
            |> toCalledWith([pos, Obj.magic(Js.false_), Obj.magic(targetData)])
          }
        )
    )
  };
};