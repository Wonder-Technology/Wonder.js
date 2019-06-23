open Wonder_jest;

open Js.Promise;

let _ =
  describe("test init light material render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _getJobFuncArr = () => [|
      CreateGlRenderWorkerJob.execJob(None),
      GetRenderConfigDataRenderWorkerJob.execJob(None),
      GetSettingDataRenderWorkerJob.execJob(None),
      GetMaterialDataRenderWorkerJob.execJob(None),
      PregetGLSLDataRenderWorkerJob.execJob(None),
      InitInstanceRenderWorkerJob.execJob(None),
      InitDirectionLightRenderWorkerJob.execJob(None),
      InitPointLightRenderWorkerJob.execJob(None),
      InitLightMaterialRenderWorkerJob.execJob(None),
    |];

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
      describe("test shader lib's glsl", () => {
        describe("test modelMatrix instance shader libs", () => {
          testPromise(
            "if has no sourceInstance component, use modelMatrix_noInstance shader lib",
            () => {
              let (state, shaderSource, gameObject) =
                InitLightMaterialJobRenderWorkerTool.prepareForJudgeGLSLNotExec(
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
                  InitLightMaterialJobRenderWorkerTool.prepareForJudgeGLSLNotExec(
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
                  ~jobFuncArr=_getJobFuncArr(),
                );
              },
            )
          );
        });

        describe("test normalMatrix instance shader libs", () => {
          testPromise(
            "if has no sourceInstance component, use modelMatrix_noInstance shader lib",
            () => {
              let (state, shaderSource, gameObject) =
                InitLightMaterialJobRenderWorkerTool.prepareForJudgeGLSLNotExec(
                  sandbox,
                  state^,
                );

              RenderJobsRenderWorkerTool.initWithJob(
                ~completeFunc=
                  state =>
                    GLSLTool.containMultiline(
                      GLSLTool.getVsSource(shaderSource),
                      [
                        {|uniform mat3 u_normalMatrix;|},
                        {|mat3 normalMatrix = u_normalMatrix;|},
                      ],
                    )
                    |> expect == true
                    |> resolve,
                ~state,
                ~jobFuncArr=_getJobFuncArr(),
              );
            },
          );
          describe("else", () =>
            testPromise(
              "if support hardware instance, use normalMatrix_hardware_instance shader lib",
              () => {
                let (state, shaderSource, gameObject) =
                  InitLightMaterialJobRenderWorkerTool.prepareForJudgeGLSLNotExec(
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
                          {|attribute vec3 a_normalVec3_0;|},
                          {|attribute vec3 a_normalVec3_1;|},
                          {|attribute vec3 a_normalVec3_2;|},
                          {|mat3 normalMatrix = mat3(a_normalVec3_0, a_normalVec3_1, a_normalVec3_2);|},
                        ],
                      )
                      |> expect == true
                      |> resolve,
                  ~state,
                  ~jobFuncArr=_getJobFuncArr(),
                );
              },
            )
          );
        });
      })
    );
  });