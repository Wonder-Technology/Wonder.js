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
      let state = ref(StateTool.createState());
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
                    GLSLLocationTool.getAttribLocation(sandbox, "a_position");
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
                        GLSLLocationTool.getAttribLocation(sandbox, "a_position");
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
        () => {
          let _testGetLocation = (name) => {
            let (state, gameObject, geometry, material) =
              InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
            let getUniformLocation = GLSLLocationTool.getUniformLocation(sandbox, name);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ()));
            let state = state |> InitBasicMaterialJobTool.exec;
            getUniformLocation |> withTwoArgs(matchAny, name) |> expect |> toCalledOnce
          };
          describe(
            "test get u_mMatrix location",
            () => {
              test("test get location", () => _testGetLocation("u_mMatrix"));
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
                        GLSLLocationTool.getUniformLocation(sandbox, "u_mMatrix");
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
          );
          test("test get u_color location", () => _testGetLocation("u_color"))
        }
      );
      describe(
        "test glsl",
        () => {
          test(
            "glsl only set glPosition,glFragColor once",
            () => {
              let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
              (
                GLSLTool.containSpecifyCount(
                  GLSLTool.getVsSource(shaderSource),
                  "gl_Position =",
                  ~count=1,
                  ()
                ),
                GLSLTool.containSpecifyCount(
                  GLSLTool.getFsSource(shaderSource),
                  "gl_FragColor =",
                  ~count=1,
                  ()
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
                  GLSLTool.containMultiline(
                    GLSLTool.getVsSource(shaderSource),
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
                      GLSLTool.containMultiline(
                        GLSLTool.getVsSource(shaderSource),
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
                          GLSLTool.containMultiline(
                            GLSLTool.getVsSource(shaderSource),
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
                      describe(
                        "else, use modelMatrix_batch_instance shader lib",
                        () => {
                          open StateDataType;
                          let _setGpuConfigDataAllowBatchInstance = (state) => {
                            ...state,
                            gpuConfig: Some({...state.gpuConfig, useHardwareInstance: false})
                          };
                          let _setGpuDetectDataAllowBatchInstance = (state) => {
                            ...state,
                            gpuDetectData: {...state.gpuDetectData, extensionInstancedArrays: None}
                          };
                          test(
                            "if state->gpuConfig->useHardwareInstance == false, use batch",
                            () => {
                              let (state, shaderSource, gameObject) =
                                InitBasicMaterialJobTool.prepareForJudgeGLSLNotExec(
                                  sandbox,
                                  state^
                                );
                              let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
                              let state = state |> _setGpuConfigDataAllowBatchInstance;
                              let state = state |> InitBasicMaterialJobTool.exec;
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
                                InitBasicMaterialJobTool.prepareForJudgeGLSLNotExec(
                                  sandbox,
                                  state^
                                );
                              let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
                              let state = state |> _setGpuDetectDataAllowBatchInstance;
                              let state = state |> InstanceTool.setGpuDetectDataAllowBatchInstance;
                              let state = state |> InitBasicMaterialJobTool.exec;
                              GLSLTool.containMultiline(
                                GLSLTool.getVsSource(shaderSource),
                                [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
                              )
                              |> expect == true
                            }
                          )
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
                  GLSLTool.getVsSource(shaderSource)
                  |> expect
                  |> toContainString({|attribute vec3 a_position;
|})
                }
              );
              describe(
                "test basic shader lib's glsl",
                () => {
                  test(
                    "test vs glsl",
                    () => {
                      let shaderSource =
                        InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.getVsSource(shaderSource)
                      |> expect
                      |> toContainString(
                           {|
gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
|}
                         )
                    }
                  );
                  test(
                    "test fs glsl",
                    () => {
                      let shaderSource =
                        InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getFsSource(shaderSource),
                        [{|uniform vec3 u_color;|}, {|vec4 totalColor = vec4(u_color, 1.0);
|}]
                      )
                      |> expect == true
                    }
                  )
                }
              );
              test(
                "test basic_end shader lib's glsl",
                () => {
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.getFsSource(shaderSource)
                  |> expect
                  |> toContainString({|gl_FragColor = vec4(totalColor.rgb, totalColor.a);|})
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