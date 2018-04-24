open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test front render light render worker job",
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
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~transformDataBufferCount=5,
                  ~basicMaterialDataBufferCount=5,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, _) = AmbientLightTool.createGameObject(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          let _prepareForUseProgram = (sandbox, state) =>
            RenderJobsRenderWorkerTool.prepareForUseProgram(sandbox, _prepare, state);
          testPromise(
            "test use",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=(_) => useProgram |> expect |> toCalledWith([|program|]) |> resolve,
                ()
              )
            }
          )
        }
      );
      describe(
        "send uniform data",
        () =>
          describe(
            "test send u_normalMatrix",
            () => {
              testPromise(
                "test send",
                () => {
                  let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                    GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
                      sandbox,
                      FrontRenderLightJobTool.prepareGameObject,
                      state^
                    );
                  let state =
                    state
                    |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
                  let uniformMatrix3fv = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_normalMatrix");
                  let state =
                    state
                    |> FakeGlToolWorker.setFakeGl(
                         FakeGlToolWorker.buildFakeGl(
                           ~sandbox,
                           ~uniformMatrix3fv,
                           ~getUniformLocation,
                           ()
                         )
                       );
                  let state = MainStateTool.setState(state);
                  RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                    ~state,
                    ~sandbox,
                    ~completeFunc=
                      (_) =>
                        uniformMatrix3fv
                        |> withOneArg(pos)
                        |> expect
                        |> toCalledWith([|
                             pos,
                             Obj.magic(Js.false_),
                             Obj.magic(
                               Js.Typed_array.Float32Array.make([|1., 0., 0., 0., 1., 0., 0., 0., 1.|])
                             )
                           |])
                        |> resolve,
                    ()
                  )
                }
              );
            }
          )
      )
    }
  );