open StateDataMainType;

let getGLSLSenderRecord = (state) => state.glslSenderRecord;

let disableVertexAttribArray = (state: StateDataMainType.state) => {
  VertexAttribArrayRenderService.disableVertexAttribArray(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    CreateRenderStateMainService.createRenderState(state)
  )
  |> ignore;
  state
};

let clearLastSendGeometry = (state: StateDataMainType.state) => {
  state.glslSenderRecord.lastSendGeometry = None;
  state
};

module JudgeSendUniformData = {
  let _prepareSendUniformData = (sandbox, prepareGameObjectFunc, state) => {
    let (state, gameObject, _, material, _) = prepareGameObjectFunc(sandbox, state);
    let (state, _, cameraTransform, basicCameraView) = CameraTool.createCameraGameObject(state);
    (
      state,
      gameObject,
      (GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state), material),
      cameraTransform,
      basicCameraView
    )
  };
  let testSendMatrix4 =
      (
        sandbox,
        name,
        setFunc,
        targetData,
        ~prepareGameObjectFunc,
        ~testFunc=(_prepareSendUniformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(MainStateTool.createState());
                beforeEach(
                  () =>
                    state :=
                      RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
                        sandbox,
                        LoopRenderJobTool.buildNoWorkerJobConfig()
                      )
                );
                test(
                  "test send",
                  () => {
                    let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                      _prepareSendUniformData(sandbox, prepareGameObjectFunc, state^);
                    let state =
                      setFunc(gameObjectTransform, cameraTransform, basicCameraView, state);
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
                      |> DirectorTool.runWithDefaultTime;
                    /* uniformMatrix4fv
                       |> getArgs
                       |> expect
                       == [] */
                    uniformMatrix4fv
                    |> expect
                    |> toCalledWith([|pos, Obj.magic(Js.false_), Obj.magic(targetData)|])
                  }
                );
                testFunc(_prepareSendUniformData)
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
        ~testFunc=(_prepareSendUniformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(MainStateTool.createState());
                beforeEach(
                  () =>
                    state :=
                      RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
                        sandbox,
                        LoopRenderJobTool.buildNoWorkerJobConfig()
                      )
                );
                test(
                  "test send",
                  () => {
                    let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                      _prepareSendUniformData(sandbox, prepareGameObjectFunc, state^);
                    let state =
                      setFunc(gameObjectTransform, cameraTransform, basicCameraView, state);
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
                      |> DirectorTool.runWithDefaultTime;
                    /* uniformMatrix4fv
                       |> getArgs
                       |> expect
                       == [] */
                    uniformMatrix3fv
                    |> expect
                    |> toCalledWith([|pos, Obj.magic(Js.false_), Obj.magic(targetData)|])
                  }
                );
                testFunc(_prepareSendUniformData)
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
        ~testFunc=(_prepareSendUniformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(MainStateTool.createState());
                let _prepare = (sandbox, state) => {
                  let (
                    state,
                    gameObject,
                    (gameObjectTransform, material),
                    cameraTransform,
                    basicCameraView
                  ) =
                    _prepareSendUniformData(sandbox, prepareGameObjectFunc, state^);
                  let state =
                    setFunc(
                      gameObject,
                      (gameObjectTransform, material),
                      (cameraTransform, basicCameraView),
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
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  (state, pos, uniform3f)
                };
                beforeEach(
                  () =>
                    state :=
                      RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
                        sandbox,
                        LoopRenderJobTool.buildNoWorkerJobConfig()
                      )
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
                testFunc(_prepareSendUniformData)
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
        ~testFunc=(_prepareSendUniformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(MainStateTool.createState());
                let _prepare = (sandbox, state) => {
                  let (
                    state,
                    gameObject,
                    (gameObjectTransform, material),
                    cameraTransform,
                    basicCameraView
                  ) =
                    _prepareSendUniformData(sandbox, prepareGameObjectFunc, state^);
                  let state =
                    setFunc(
                      gameObject,
                      (gameObjectTransform, material),
                      (cameraTransform, basicCameraView),
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
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  (state, pos, uniform3f)
                };
                beforeEach(
                  () =>
                    state :=
                      RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
                        sandbox,
                        LoopRenderJobTool.buildNoWorkerJobConfig()
                      )
                );
                test(
                  "if cached, not send",
                  () => {
                    let (state, pos, uniform3f) = _prepare(sandbox, state);
                    let state = state |> DirectorTool.runWithDefaultTime;
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
                testFunc(_prepareSendUniformData)
              }
            )
          )
        )
      )
    );
  let testSendFloat =
      (
        sandbox,
        name,
        setFunc,
        targetData,
        ~prepareGameObjectFunc=RenderJobsTool.prepareGameObject,
        ~testFunc=(_prepareSendUniformData) => (),
        ()
      ) =>
    Wonder_jest.(
      Expect.(
        Expect.Operators.(
          Sinon.(
            describe(
              {j|send $name|j},
              () => {
                let state = ref(MainStateTool.createState());
                let _prepare = (sandbox, state) => {
                  let (
                    state,
                    gameObject,
                    (gameObjectTransform, material),
                    cameraTransform,
                    basicCameraView
                  ) =
                    _prepareSendUniformData(sandbox, prepareGameObjectFunc, state^);
                  let state =
                    setFunc(
                      gameObject,
                      (gameObjectTransform, material),
                      (cameraTransform, basicCameraView),
                      state
                    );
                  let uniform1f = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~uniform1f, ~getUniformLocation, ())
                       );
                  let state =
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  (state, pos, uniform1f)
                };
                beforeEach(
                  () =>
                    state :=
                      RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
                        sandbox,
                        LoopRenderJobTool.buildNoWorkerJobConfig()
                      )
                );
                test(
                  "if cached, not send",
                  () => {
                    let (state, pos, uniform1f) = _prepare(sandbox, state);
                    let state = state |> DirectorTool.runWithDefaultTime;
                    uniform1f |> withOneArg(pos) |> getCallCount |> expect == 1
                  }
                );
                test(
                  "test send",
                  () => {
                    let (state, pos, uniform1f) = _prepare(sandbox, state);
                    uniform1f
                    |> expect
                    |> toCalledWith
                         /* [|pos|] |> Js.Array.concat(targetData |> Obj.magic |> Array.of_list) */
                         ([|pos |> Obj.magic, targetData|])
                  }
                );
                testFunc(_prepareSendUniformData)
              }
            )
          )
        )
      )
    );
};