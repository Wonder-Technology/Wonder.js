open BasicMaterial;

open Wonder_jest;

let _ =
  describe(
    "test init_basic_material job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := InitBasicMaterialJobTool.initWithRenderConfig(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test get attribute location",
        () =>
          describe(
            "test get a_position location",
            () => {
              test(
                "test get location",
                () => {
                  let (state, gameObject, geometry, material) =
                    InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                  let getAttribLocation =
                    GlslLocationTool.getAttribLocation(sandbox, "a_position");
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                       );
                  let state = state |> InitBasicMaterialJobTool.exec;
                  getAttribLocation
                  |> withTwoArgs(matchAny, "a_position")
                  |> expect
                  |> toCalledOnce
                }
              );
              describe(
                "test cache",
                () =>
                  test(
                    "if cached, not query gl location",
                    () => {
                      let (state, gameObject, geometry, material) =
                        InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                      let (state, _, _, _) =
                        InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
                      let getAttribLocation =
                        GlslLocationTool.getAttribLocation(sandbox, "a_position");
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                           );
                      let state = state |> InitBasicMaterialJobTool.exec;
                      getAttribLocation
                      |> withTwoArgs(matchAny, "a_position")
                      |> expect
                      |> toCalledOnce
                    }
                  )
              )
            }
          )
      );
      describe(
        "test get uniform location",
        () =>
          describe(
            "test get u_mMatrix location",
            () => {
              test(
                "test get location",
                () => {
                  let (state, gameObject, geometry, material) =
                    InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                  let getUniformLocation =
                    GlslLocationTool.getUniformLocation(sandbox, "u_mMatrix");
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ())
                       );
                  let state = state |> InitBasicMaterialJobTool.exec;
                  getUniformLocation
                  |> withTwoArgs(matchAny, "u_mMatrix")
                  |> expect
                  |> toCalledOnce
                }
              );
              describe(
                "test cache",
                () =>
                  test(
                    "if cached, not query gl location",
                    () => {
                      let (state, gameObject, geometry, material) =
                        InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                      let (state, _, _, _) =
                        InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
                      let getUniformLocation =
                        GlslLocationTool.getUniformLocation(sandbox, "u_mMatrix");
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ())
                           );
                      let state = state |> InitBasicMaterialJobTool.exec;
                      getUniformLocation
                      |> withTwoArgs(matchAny, "u_mMatrix")
                      |> expect
                      |> toCalledOnce
                    }
                  )
              )
            }
          )
      );
      describe(
        "test glsl",
        () => {
          test(
            "glsl only set glPosition,glFragColor once",
            () => {
              let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
              (
                GlslTool.containSpecifyCount(
                  GlslTool.getVsSource(shaderSource),
                  "gl_Position =",
                  ~count=1
                ),
                GlslTool.containSpecifyCount(
                  GlslTool.getFsSource(shaderSource),
                  "gl_FragColor =",
                  ~count=1
                )
              )
              |> expect == (true, true)
            }
          );
          describe(
            "test shader lib's glsl",
            () => {
              test(
                "test common shader lib's glsl",
                () => {
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GlslTool.containMultiline(
                    GlslTool.getVsSource(shaderSource),
                    [{|uniform mat4 u_vMatrix;
|}, {|uniform mat4 u_pMatrix;
|}]
                  )
                  |> expect == true
                }
              );
              describe(
                "test modelMatrix instance shader libs",
                () => {
                  test(
                    "if has no sourceInstance component, use modelMatrix_noInstance shader lib",
                    () => {
                      let shaderSource =
                        InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GlslTool.containMultiline(
                        GlslTool.getVsSource(shaderSource),
                        [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
                      )
                      |> expect == true
                    }
                  );
                  describe(
                    "else",
                    () => {
                      test(
                        "if support hardware instance, use modelMatrix_hardware_instance shader lib",
                        () => {
                          let (state, shaderSource, gameObject) =
                            InitBasicMaterialJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);
                          let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
                          let state =
                            state |> InstanceTool.setGpuDetectDataAllowHardwareInstance(sandbox);
                          let state = state |> InitBasicMaterialJobTool.exec;
                          GlslTool.containMultiline(
                            GlslTool.getVsSource(shaderSource),
                            [
                              {|attribute vec4 a_mVec4_0;|},
                              {|attribute vec4 a_mVec4_1;|},
                              {|attribute vec4 a_mVec4_2;|},
                              {|attribute vec4 a_mVec4_3;|},
                              {|mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);|}
                            ]
                          )
                          |> expect == true
                        }
                      );
                      test(
                        "else, use modelMatrix_batch_instance shader lib",
                        () => {
                          let (state, shaderSource, gameObject) =
                            InitBasicMaterialJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);
                          let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
                          let state = state |> InstanceTool.setGpuDetectDataAllowBatchInstance;
                          let state = state |> InitBasicMaterialJobTool.exec;
                          GlslTool.containMultiline(
                            GlslTool.getVsSource(shaderSource),
                            [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
                          )
                          |> expect == true
                        }
                      )
                    }
                  )
                }
              );
              test(
                "test vertex shader lib's glsl",
                () => {
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GlslTool.getVsSource(shaderSource)
                  |> expect
                  |> toContainString({|attribute vec3 a_position;
|})
                }
              );
              test(
                "test basic shader lib's glsl",
                () => {
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GlslTool.getVsSource(shaderSource)
                  |> expect
                  |> toContainString(
                       {|
gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
|}
                     )
                }
              );
              test(
                "test basic_end shader lib's glsl",
                () => {
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GlslTool.getFsSource(shaderSource)
                  |> expect
                  |> toContainString({|gl_FragColor = vec4(1.0,0.5,1.0,1.0);|})
                }
              )
              /* test(
                   "test end shader lib's glsl",
                   () => {
                   }
                 ) */
            }
          )
        }
      )
    }
  );