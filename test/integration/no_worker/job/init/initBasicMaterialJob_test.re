open BasicMaterialAPI;

open Wonder_jest;

let _ =
  describe(
    "test init basic material job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_basic_material"
        }
      ]
    }
  ]
        |},
          ~initJobs={|
[
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_basic_material"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := InitBasicMaterialJobTool.initWithJobConfig(sandbox, _buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test get attribute location",
        () => {
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
          );
          describe(
            "test get a_texCoord location",
            () => {
              test(
                "test get location",
                () => {
                  let (state, gameObject, geometry, material) =
                    InitBasicMaterialJobTool.prepareGameObjectWithCreatedMap(sandbox, state^);
                  let getAttribLocation =
                    GLSLLocationTool.getAttribLocation(sandbox, "a_texCoord");
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                       );
                  let state = state |> InitBasicMaterialJobTool.exec;
                  getAttribLocation
                  |> withTwoArgs(matchAny, "a_texCoord")
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
                        InitBasicMaterialJobTool.prepareGameObjectWithCreatedMap(sandbox, state^);
                      let (state, _, _, material2) =
                        InitBasicMaterialJobTool.prepareGameObjectWithCreatedMap(sandbox, state);
                      let getAttribLocation =
                        GLSLLocationTool.getAttribLocation(sandbox, "a_texCoord");
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                           );
                      let state = state |> InitBasicMaterialJobTool.exec;
                      getAttribLocation
                      |> withTwoArgs(matchAny, "a_texCoord")
                      |> expect
                      |> toCalledOnce
                    }
                  )
              )
            }
          )
        }
      );
      describe(
        "test get uniform location",
        () => {
          let _testGetLocation = (name) =>
            InitMaterialTool.testGetLocation(
              sandbox,
              name,
              (InitBasicMaterialJobTool.prepareGameObjectWithCreatedMap, InitBasicMaterialJobTool.exec),
              state
            );
          describe(
            "test get u_mMatrix location",
            () => {
              test("test get location", () => _testGetLocation("u_mMatrix"));
              describe(
                "test cache",
                () =>
                  test(
                    "if cached, not query gl location",
                    () =>
                      InitMaterialTool.testLocationCache(
                        sandbox,
                        "u_mMatrix",
                        (
                          InitBasicMaterialJobTool.prepareGameObject,
                          InitBasicMaterialJobTool.exec
                        ),
                        state
                      )
                  )
              )
            }
          );
          test("test get u_color location", () => _testGetLocation("u_color"));
          test("test get u_mapSampler location", () => _testGetLocation("u_mapSampler"))
        }
      );
      describe(
        "test glsl",
        () => {
          test(
            "glsl only set glPosition,glFragColor once",
            () =>
              InitMaterialTool.testOnlySeGlPositionGlFragColorOnce(
                sandbox,
                InitBasicMaterialJobTool.prepareForJudgeGLSL,
                state
              )
          );
          describe(
            "test shader lib's glsl",
            () => {
              test(
                "test common shader lib's glsl",
                () =>
                  InitMaterialTool.testCommonShaderLibGlsl(
                    sandbox,
                    InitBasicMaterialJobTool.prepareForJudgeGLSL,
                    state
                  )
              );
              test(
                "test vertex shader lib's glsl",
                () =>
                  InitMaterialTool.testVertexShaderLibGlsl(
                    sandbox,
                    InitBasicMaterialJobTool.prepareForJudgeGLSL,
                    state
                  )
              );
              describe(
                "test modelMatrix instance shader libs",
                () =>
                  InitMaterialJobTool.testModelMatrixInstanceShaderLibs(
                    sandbox,
                    (
                      InitBasicMaterialJobTool.prepareForJudgeGLSL,
                      InitBasicMaterialJobTool.prepareForJudgeGLSLNotExec,
                      InitBasicMaterialJobTool.exec
                    ),
                    state
                  )
              );
              describe(
                "test basic shader lib's glsl",
                () =>
                  test(
                    "test vs glsl",
                    () => {
                      let shaderSource =
                        InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.getVsSource(shaderSource)
                      |> expect
                      |> toContainString(
                           {|gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);|}
                         )
                    }
                  )
              );
              describe(
                "test basic_color shader lib's glsl",
                () =>
                  test(
                    "test fs glsl",
                    () => {
                      let shaderSource =
                        InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getFsSource(shaderSource),
                        [
                          {|uniform vec3 u_color;|},
                          {|vec4 totalColor = vec4(u_color, 1.0);
         |}
                        ]
                      )
                      |> expect == true
                    }
                  )
              );
              describe(
                "test map shader lib's glsl",
                () => {
                  describe(
                    "if has map, add basic_map shader lib",
                    () => {
                      test(
                        "test vs glsl",
                        () => {
                          let shaderSource =
                            InitBasicMaterialJobTool.prepareForJudgeGLSLWithMap(sandbox, state^);
                          GLSLTool.containMultiline(
                            GLSLTool.getVsSource(shaderSource),
                            [{|varying vec2 v_mapCoord0;|}, {|v_mapCoord0 = a_texCoord;|}]
                          )
                          |> expect == true
                        }
                      );
                      test(
                        "test fs glsl",
                        () => {
                          let shaderSource =
                            InitBasicMaterialJobTool.prepareForJudgeGLSLWithMap(sandbox, state^);
                          GLSLTool.containMultiline(
                            GLSLTool.getFsSource(shaderSource),
                            [
                              {|uniform sampler2D u_mapSampler;|},
                              {|uniform vec3 u_color;|},
                              {|varying vec2 v_mapCoord0;|},
                              {|totalColor = vec4(totalColor.rgb * texture2D(u_mapSampler, v_mapCoord0).rgb * u_color, totalColor.a);|}
                            ]
                          )
                          |> expect == true
                        }
                      )
                    }
                  );
                  describe(
                    "else, not add",
                    () =>
                      test(
                        "test vs glsl",
                        () => {
                          let shaderSource =
                            InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                          GLSLTool.containMultiline(
                            GLSLTool.getVsSource(shaderSource),
                            [{|varying vec2 v_mapCoord0;|}]
                          )
                          |> expect == false
                        }
                      )
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
            }
          )
        }
      )
    }
  );