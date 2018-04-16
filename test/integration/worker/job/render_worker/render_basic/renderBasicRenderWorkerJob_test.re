open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test render basic render worker job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestToolMainWorker.initWithJobConfig(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(~transformDataBufferCount=5,~basicMaterialDataBufferCount=5, ()),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          let _prepareForUseProgram = (sandbox, state) =>
            RenderJobsRenderWorkerTool.prepareForUseProgram(sandbox, _prepare, state);
          testPromise(
            "test",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              RenderJobsRenderWorkerTool.initAndLoop(
                (state) => useProgram |> expect |> toCalledWith([|program|]) |> resolve,
                state
              )
            }
          )
        }
      );
      describe(
        "send uniform data",
        () =>
          describe(
            "test send u_mMatrix",
            () => {
              testPromise(
                "test send",
                () => {
                  /* TODO refactor: duplicate with renderBasicJob_test */
                  let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                    GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
                      sandbox,
                      RenderBasicJobTool.prepareGameObject,
                      state^
                    );
                  let state =
                    state
                    |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
                  let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
                  let state =
                    state
                    |> FakeGlToolWorker.setFakeGl(
                         FakeGlToolWorker.buildFakeGl(
                           ~sandbox,
                           ~uniformMatrix4fv,
                           ~getUniformLocation,
                           ()
                         )
                       );
                  let state = MainStateTool.setState(state);
                  RenderJobsRenderWorkerTool.initAndLoop(
                    (state) =>
                      uniformMatrix4fv
                      |> withOneArg(pos)
                      |> expect
                      |> toCalledWith([|
                           pos,
                           Obj.magic(Js.false_),
                           Obj.magic(
                             Js.Typed_array.Float32Array.make([|
                               1.,
                               0.,
                               0.,
                               0.,
                               0.,
                               1.,
                               0.,
                               0.,
                               0.,
                               0.,
                               1.,
                               0.,
                               1.,
                               2.,
                               3.,
                               1.
                             |])
                           )
                         |])
                      |> resolve,
                    state
                  )
                }
              );
              describe(
                "test two gameObjects",
                () =>
                  testPromise(
                    "if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect",
                    () => {
                      let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                        GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
                          sandbox,
                          RenderBasicJobTool.prepareGameObject,
                          state^
                        );
                      let (state, gameObject2, _, _, _) =
                        RenderBasicJobTool.prepareGameObject(sandbox, state);
                      let state =
                        state
                        |> TransformAPI.setTransformLocalPosition(
                             gameObjectTransform,
                             (1., 2., 3.)
                           );
                      let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                      let pos = 0;
                      let getUniformLocation =
                        GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
                      let state =
                        state
                        |> FakeGlToolWorker.setFakeGl(
                             FakeGlToolWorker.buildFakeGl(
                               ~sandbox,
                               ~uniformMatrix4fv,
                               ~getUniformLocation,
                               ()
                             )
                           );
                      let state = MainStateTool.setState(state);
                      RenderJobsRenderWorkerTool.initAndLoop(
                        (state) =>
                          uniformMatrix4fv
                          |> withOneArg(pos)
                          |> getCall(1)
                          |> expect
                          |> toCalledWith([|
                               pos,
                               Obj.magic(Js.false_),
                               Obj.magic(
                                 TransformTool.getDefaultLocalToWorldMatrixTypeArray(state)
                               )
                             |])
                          |> resolve,
                        state
                      )
                    }
                  )
              )
            }
          )
      )
    }
  );