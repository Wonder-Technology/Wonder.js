open Wonder_jest;

open Js.Promise;

let _ =
  describe("test init basic material render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~buffer=SettingTool.buildBufferConfigStr(),
          (),
        );
    });
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test glsl", () =>
      describe("test shader lib's glsl", () =>
        describe("test modelMatrix instance shader libs", () => {
          testPromise(
            "if has no sourceInstance component, use modelMatrix_noInstance shader lib",
            () => {
              let (state, shaderSource, gameObject) =
                InitBasicMaterialJobRenderWorkerTool.prepareForJudgeGLSLNotExec(
                  sandbox,
                  state^,
                );
              RenderJobsRenderWorkerTool.init(
                state =>
                  GLSLTool.containMultiline(
                    GLSLTool.getVsSource(shaderSource),
                    [
                      {|uniform mat4 u_mMatrix;|},
                      {|mat4 mMatrix = u_mMatrix;|},
                    ],
                  )
                  |> expect == true
                  |> resolve,
                state,
              );
            },
          );

          describe("else", () =>
            testPromise(
              "if support hardware instance, use modelMatrix_hardware_instance shader lib",
              () => {
                let (state, shaderSource, gameObject) =
                  InitBasicMaterialJobRenderWorkerTool.prepareForJudgeGLSLNotExec(
                    sandbox,
                    state^,
                  );
                let (state, _) =
                  state |> InstanceTool.addSourceInstance(gameObject);
                InstanceRenderWorkerTool.setGPUDetectDataAllowHardwareInstance(
                  sandbox,
                );

                RenderJobsRenderWorkerTool.initWithJob(
                  ~completeFunc=
                    state =>
                      GLSLTool.containMultiline(
                        GLSLTool.getVsSource(shaderSource),
                        [
                          {|attribute vec4 a_mVec4_0;|},
                          {|attribute vec4 a_mVec4_1;|},
                          {|attribute vec4 a_mVec4_2;|},
                          {|attribute vec4 a_mVec4_3;|},
                          {|mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);|},
                        ],
                      )
                      |> expect == true
                      |> resolve,
                  ~state,
                  ~jobFuncArr=[|
                    CreateGlRenderWorkerJob.execJob(None),
                    GetRenderConfigDataRenderWorkerJob.execJob(None),
                    GetSettingDataRenderWorkerJob.execJob(None),
                    GetMaterialDataRenderWorkerJob.execJob(None),
                    PregetGLSLDataRenderWorkerJob.execJob(None),
                    InitInstanceRenderWorkerJob.execJob(None),
                    InitBasicMaterialRenderWorkerJob.execJob(None),
                  |],
                );
              },
            )
          );
          /* TODO test? */
          /* describe(
               "else, use modelMatrix_batch_instance shader lib",
               () => {
                 open StateDataMainType;
                 let _setGPUConfigDataAllowBatchInstance = (state) =>
                   SettingTool.setGPU({useHardwareInstance: false}, state);
                 test(
                   "if state->gpuConfig->useHardwareInstance == false, use batch",
                   () => {
                     let (state, shaderSource, gameObject) =
                       prepareForJudgeGLSLNotExecFunc(sandbox, state^);
                     let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
                     let state = state |> _setGPUConfigDataAllowBatchInstance;
                     let state = state |> execFunc;
                     GLSLTool.containMultiline(
                       GLSLTool.getVsSource(shaderSource),
                       [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
                     )
                     |> expect == true
                   }
                 );
                 test(
                   "if gpu not support hardware instance, use batch",
                   () => {
                     let (state, shaderSource, gameObject) =
                       prepareForJudgeGLSLNotExecFunc(sandbox, state^);
                     let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
                     let state = state |> InstanceTool.setGPUDetectDataAllowBatchInstance;
                     let state = state |> execFunc;
                     GLSLTool.containMultiline(
                       GLSLTool.getVsSource(shaderSource),
                       [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
                     )
                     |> expect == true
                   }
                 )
               }
             ) */
        })
      )
    );
  });