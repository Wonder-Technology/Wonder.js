let getGLSLSenderData = GLSLSenderSystem.getGLSLSenderData;

let disableVertexAttribArray = (state: StateDataType.state) =>
  GLSLSenderSystem.disableVertexAttribArray([@bs] DeviceManagerSystem.unsafeGetGl(state), state);

let cleanLastSendArrayBuffer = (state: StateDataType.state) => {
  GLSLSenderStateUtils.getGLSLSenderData(state).lastSendArrayBuffer = None;
  state
};

module JudgeSendUniformData = {
  let _render = (state: StateDataType.state) => state |> WebGLRenderTool.render;
  let _prepareSendUinformData = (sandbox, prepareGameObjectFunc, state) => {
    let (state, gameObject, _, material, _) = prepareGameObjectFunc(sandbox, state);
    let (state, _, cameraTransform, cameraController) =
      CameraControllerTool.createCameraGameObject(state);
    (
      state,
      gameObject,
      (GameObject.getGameObjectTransformComponent(gameObject, state), material),
      cameraTransform,
      cameraController
    )
  };
  let testSendMatrix4 =
      (
        sandbox,
        name,
        setFunc,
        targetData,
        ~prepareGameObjectFunc,
        ~testFunc=(_prepareSendUinformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(StateTool.createState());
                beforeEach(
                  () => state := RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(sandbox)
                );
                test(
                  "test send",
                  () => {
                    let (state, _, (gameObjectTransform, _), cameraTransform, cameraController) =
                      _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
                    let state =
                      setFunc(gameObjectTransform, cameraTransform, cameraController, state);
                    let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 0;
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
                    |> toCalledWith([|pos, Obj.magic(Js.false_), Obj.magic(targetData)|])
                  }
                );
                testFunc(_prepareSendUinformData)
              }
            )
          )
        )
      )
    );
  let testSendMatrix3 =
      (
        sandbox,
        name,
        setFunc,
        targetData,
        ~prepareGameObjectFunc,
        ~testFunc=(_prepareSendUinformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(StateTool.createState());
                beforeEach(
                  () => state := RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(sandbox)
                );
                test(
                  "test send",
                  () => {
                    let (state, _, (gameObjectTransform, _), cameraTransform, cameraController) =
                      _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
                    let state =
                      setFunc(gameObjectTransform, cameraTransform, cameraController, state);
                    let uniformMatrix3fv = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 0;
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
                    let state =
                      state
                      |> RenderJobsTool.initSystemAndRender
                      |> RenderJobsTool.updateSystem
                      |> _render;
                    /* uniformMatrix4fv
                       |> getArgs
                       |> expect
                       == [] */
                    uniformMatrix3fv
                    |> expect
                    |> toCalledWith([|pos, Obj.magic(Js.false_), Obj.magic(targetData)|])
                  }
                );
                testFunc(_prepareSendUinformData)
              }
            )
          )
        )
      )
    );
  let testSendShaderVector3 =
      (
        sandbox,
        name,
        setFunc,
        targetData,
        ~prepareGameObjectFunc=RenderJobsTool.prepareGameObject,
        ~testFunc=(_prepareSendUinformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(StateTool.createState());
                let _prepare = (sandbox, state) => {
                  let (
                    state,
                    gameObject,
                    (gameObjectTransform, material),
                    cameraTransform,
                    cameraController
                  ) =
                    _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
                  let state =
                    setFunc(
                      gameObject,
                      (gameObjectTransform, material),
                      (cameraTransform, cameraController),
                      state
                    );
                  let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~uniform3f, ~getUniformLocation, ())
                       );
                  let state =
                    state
                    |> RenderJobsTool.initSystemAndRender
                    |> RenderJobsTool.updateSystem
                    |> _render;
                  (state, pos, uniform3f)
                };
                beforeEach(
                  () => state := RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(sandbox)
                );
                test(
                  "test send",
                  () => {
                    let (state, pos, uniform3f) = _prepare(sandbox, state);
                    uniform3f
                    |> expect
                    |> toCalledWith(
                         [|pos|] |> Js.Array.concat(targetData |> Obj.magic |> Array.of_list)
                       )
                  }
                );
                testFunc(_prepareSendUinformData)
              }
            )
          )
        )
      )
    );
  let testSendVector3 =
      (
        sandbox,
        name,
        setFunc,
        targetData,
        ~prepareGameObjectFunc=RenderJobsTool.prepareGameObject,
        ~testFunc=(_prepareSendUinformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(StateTool.createState());
                let _prepare = (sandbox, state) => {
                  let (
                    state,
                    gameObject,
                    (gameObjectTransform, material),
                    cameraTransform,
                    cameraController
                  ) =
                    _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
                  let state =
                    setFunc(
                      gameObject,
                      (gameObjectTransform, material),
                      (cameraTransform, cameraController),
                      state
                    );
                  let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~uniform3f, ~getUniformLocation, ())
                       );
                  let state =
                    state
                    |> RenderJobsTool.initSystemAndRender
                    |> RenderJobsTool.updateSystem
                    |> _render;
                  (state, pos, uniform3f)
                };
                beforeEach(
                  () => state := RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(sandbox)
                );
                test(
                  "if cached, not send",
                  () => {
                    let (state, pos, uniform3f) = _prepare(sandbox, state);
                    let state = state |> _render;
                    uniform3f |> withOneArg(pos) |> getCallCount |> expect == 1
                  }
                );
                test(
                  "test send",
                  () => {
                    let (state, pos, uniform3f) = _prepare(sandbox, state);
                    uniform3f
                    |> expect
                    |> toCalledWith(
                         [|pos|] |> Js.Array.concat(targetData |> Obj.magic |> Array.of_list)
                       )
                    /* |> getCall(0)
                       |> getArgs
                       |> expect == [pos, ...targetData |> Obj.magic] */
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