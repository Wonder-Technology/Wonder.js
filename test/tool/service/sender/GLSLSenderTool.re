open StateDataType;

let getGLSLSenderRecord = (state) => state.glslSenderRecord;

let disableVertexAttribArray = (state: StateDataType.state) =>
  VertexAttribArrayService.disableVertexAttribArray(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    state
  );

let clearLastSendGeometry = (state: StateDataType.state) => {
  state.glslSenderRecord.lastSendGeometry = None;
  state
};

module JudgeSendUniformData = {
  let _prepareSendUinformData = (sandbox, prepareGameObjectFunc, state) => {
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
                      _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
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
                      _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
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
                    basicCameraView
                  ) =
                    _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
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
                    basicCameraView
                  ) =
                    _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
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
                testFunc(_prepareSendUinformData)
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
                    basicCameraView
                  ) =
                    _prepareSendUinformData(sandbox, prepareGameObjectFunc, state^);
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
                testFunc(_prepareSendUinformData)
              }
            )
          )
        )
      )
    );
};