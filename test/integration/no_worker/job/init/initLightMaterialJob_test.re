open LightMaterialAPI;

open Wonder_jest;

let _ =
  describe("test init light material job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _buildNoWorkerJobConfig = () =>
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_light_material"
        }
      ]
    }
  ]
        |},
        ~initJobs=
          {|
[
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_light_material"
        }
]
        |},
        (),
      );
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        InitLightMaterialJobTool.initWithJobConfig(
          sandbox,
          _buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test get attribute location", () => {
      describe("test get a_position location", () =>
        test("test get location", () => {
          let (state, gameObject, geometry, material) =
            InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
          let getAttribLocation =
            GLSLLocationTool.getAttribLocation(sandbox, "a_position");
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ()),
               );
          let state = state |> InitLightMaterialJobTool.exec;
          getAttribLocation
          |> withTwoArgs(matchAny, "a_position")
          |> expect
          |> toCalledOnce;
        })
      );
      describe("test get a_texCoord location", () =>
        test("test get location", () => {
          let (state, gameObject, geometry, material) =
            InitLightMaterialJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state^,
            );
          let getAttribLocation =
            GLSLLocationTool.getAttribLocation(sandbox, "a_texCoord");
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ()),
               );
          let state = state |> InitLightMaterialJobTool.exec;
          getAttribLocation
          |> withTwoArgs(matchAny, "a_texCoord")
          |> expect
          |> toCalledOnce;
        })
      );
      describe("test get a_normal location", () => {
        test("test get location", () => {
          let (state, gameObject, geometry, material) =
            InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
          let getAttribLocation =
            GLSLLocationTool.getAttribLocation(sandbox, "a_normal");
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ()),
               );
          let state = state |> InitLightMaterialJobTool.exec;
          getAttribLocation
          |> withTwoArgs(matchAny, "a_normal")
          |> expect
          |> toCalledOnce;
        });
        describe("test cache", () =>
          test("if cached, not query gl location", () => {
            let (state, gameObject, geometry, material) =
              InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
            let (state, _, _, _) =
              InitLightMaterialJobTool.prepareGameObject(sandbox, state);
            let getAttribLocation =
              GLSLLocationTool.getAttribLocation(sandbox, "a_normal");
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ()),
                 );
            let state = state |> InitLightMaterialJobTool.exec;
            getAttribLocation
            |> withTwoArgs(matchAny, "a_normal")
            |> expect
            |> toCalledOnce;
          })
        );
      });
    });
    describe("test get uniform location", () => {
      let _testGetLocationWithPrepareGameObjectFunc =
          (name, prepareGameObjectFunc) =>
        InitMaterialTool.testGetLocation(
          sandbox,
          name,
          (prepareGameObjectFunc, InitLightMaterialJobTool.exec),
          state,
        );
      let _testGetLocation = name =>
        _testGetLocationWithPrepareGameObjectFunc(
          name,
          InitLightMaterialJobTool.prepareGameObject,
        );
      describe("test get u_normalMatrix location", () => {
        test("test get location", () =>
          _testGetLocation("u_normalMatrix")
        );
        describe("test cache", () =>
          test("if cached, not query gl location", () =>
            InitMaterialTool.testLocationCache(
              sandbox,
              "u_normalMatrix",
              (
                InitLightMaterialJobTool.prepareGameObject,
                InitLightMaterialJobTool.exec,
              ),
              state,
            )
          )
        );
      });
      test("test get u_mMatrix location", () =>
        _testGetLocation("u_mMatrix")
      );
      test("test get u_cameraPos location", () =>
        _testGetLocation("u_cameraPos")
      );
      test("test get u_diffuse location", () =>
        _testGetLocation("u_diffuse")
      );
      test("test get u_specular location", () =>
        _testGetLocation("u_specular")
      );
      test("test get u_shininess location", () =>
        _testGetLocation("u_shininess")
      );
      test("test get u_diffuseMapSampler location", () =>
        _testGetLocationWithPrepareGameObjectFunc(
          "u_diffuseMapSampler",
          InitLightMaterialJobTool.prepareGameObjectWithCreatedMap,
        )
      );
      test("test get u_specularMapSampler location", () =>
        _testGetLocationWithPrepareGameObjectFunc(
          "u_specularMapSampler",
          InitLightMaterialJobTool.prepareGameObjectWithCreatedMap,
        )
      );
    });
    describe("test glsl", () => {
      test("glsl only set glPosition,glFragColor once", () =>
        InitMaterialTool.testOnlySeGlPositionGlFragColorOnce(
          sandbox,
          InitLightMaterialJobTool.prepareForJudgeGLSL(
            InitLightMaterialJobTool.prepareGameObject,
          ),
          state,
        )
      );
      describe("test shader lib's glsl", () => {
        test("test common shader lib's glsl", () =>
          InitMaterialTool.testCommonShaderLibGlsl(
            sandbox,
            InitLightMaterialJobTool.prepareForJudgeGLSL(
              InitLightMaterialJobTool.prepareGameObject,
            ),
            state,
          )
        );
        test("test vertex shader lib's glsl", () =>
          InitMaterialTool.testVertexShaderLibGlsl(
            sandbox,
            InitLightMaterialJobTool.prepareForJudgeGLSL(
              InitLightMaterialJobTool.prepareGameObject,
            ),
            state,
          )
        );
        test("test normal shader lib's glsl", () => {
          let shaderSource =
            InitLightMaterialJobTool.prepareForJudgeGLSL(
              InitLightMaterialJobTool.prepareGameObject,
              sandbox,
              state^,
            );
          GLSLTool.getVsSource(shaderSource)
          |> expect
          |> toContainString({|attribute vec3 a_normal;|});
        });
        describe("test modelMatrix instance shader libs", () =>
          InitMaterialJobTool.testModelMatrixInstanceShaderLibs(
            sandbox,
            (
              InitLightMaterialJobTool.prepareForJudgeGLSL(
                InitLightMaterialJobTool.prepareGameObject,
              ),
              InitLightMaterialJobTool.prepareForJudgeGLSLNotExec(
                InitLightMaterialJobTool.prepareGameObject,
              ),
              InitLightMaterialJobTool.exec,
            ),
            state,
          )
        );
        describe("test normalMatrix instance shader libs", () => {
          test(
            "if has no sourceInstance component, use normalMatrix_noInstance shader lib",
            () => {
            let shaderSource =
              InitLightMaterialJobTool.prepareForJudgeGLSL(
                InitLightMaterialJobTool.prepareGameObject,
                sandbox,
                state^,
              );
            GLSLTool.containMultiline(
              GLSLTool.getVsSource(shaderSource),
              [
                {|uniform mat3 u_normalMatrix;|},
                {|mat3 normalMatrix = u_normalMatrix;|},
              ],
            )
            |> expect == true;
          });
          describe("else", () => {
            test(
              "if support hardware instance, use normalMatrix_hardware_instance shader lib",
              () => {
              let (state, shaderSource, gameObject) =
                InitLightMaterialJobTool.prepareForJudgeGLSLNotExec(
                  InitLightMaterialJobTool.prepareGameObject,
                  sandbox,
                  state^,
                );
              let (state, _) =
                state |> InstanceTool.addSourceInstance(gameObject);
              let state =
                state
                |> InstanceTool.setGPUDetectDataAllowHardwareInstance(sandbox);
              let state = state |> InitLightMaterialJobTool.exec;
              GLSLTool.containMultiline(
                GLSLTool.getVsSource(shaderSource),
                [
                  {|attribute vec3 a_normalVec3_0;|},
                  {|attribute vec3 a_normalVec3_1;|},
                  {|attribute vec3 a_normalVec3_2;|},
                  {|mat3 normalMatrix = mat3(a_normalVec3_0, a_normalVec3_1, a_normalVec3_2);|},
                ],
              )
              |> expect == true;
            });
            describe("else, use normalMatrix_batch_instance shader lib", () => {
              open StateDataMainType;
              let _setGPUConfigDataAllowBatchInstance = state =>
                SettingTool.setGPU({useHardwareInstance: false}, state);
              let _setGPUDetectDataAllowBatchInstance = state => {
                ...state,
                gpuDetectRecord: {
                  ...state.gpuDetectRecord,
                  extensionInstancedArrays: None,
                },
              };
              test(
                "if state->gpuConfig->useHardwareInstance == false, use batch",
                () => {
                let (state, shaderSource, gameObject) =
                  InitLightMaterialJobTool.prepareForJudgeGLSLNotExec(
                    InitLightMaterialJobTool.prepareGameObject,
                    sandbox,
                    state^,
                  );
                let (state, _) =
                  state |> InstanceTool.addSourceInstance(gameObject);
                let state = state |> _setGPUConfigDataAllowBatchInstance;
                let state = state |> InitLightMaterialJobTool.exec;
                GLSLTool.containMultiline(
                  GLSLTool.getVsSource(shaderSource),
                  [
                    {|uniform mat3 u_normalMatrix;|},
                    {|mat3 normalMatrix = u_normalMatrix;|},
                  ],
                )
                |> expect == true;
              });
              test("if gpu not support hardware instance, use batch", () => {
                let (state, shaderSource, gameObject) =
                  InitLightMaterialJobTool.prepareForJudgeGLSLNotExec(
                    InitLightMaterialJobTool.prepareGameObject,
                    sandbox,
                    state^,
                  );
                let (state, _) =
                  state |> InstanceTool.addSourceInstance(gameObject);
                let state = state |> _setGPUDetectDataAllowBatchInstance;
                let state =
                  state |> InstanceTool.setGPUDetectDataAllowBatchInstance;
                let state = state |> InitLightMaterialJobTool.exec;
                GLSLTool.containMultiline(
                  GLSLTool.getVsSource(shaderSource),
                  [
                    {|uniform mat3 u_normalMatrix;|},
                    {|mat3 normalMatrix = u_normalMatrix;|},
                  ],
                )
                |> expect == true;
              });
            });
          });
        });
        describe("test light_common shader lib's glsl", () => {
          test("test vs glsl", () => {
            let shaderSource =
              InitLightMaterialJobTool.prepareForJudgeGLSL(
                InitLightMaterialJobTool.prepareGameObject,
                sandbox,
                state^,
              );
            GLSLTool.containMultiline(
              GLSLTool.getVsSource(shaderSource),
              [
                {|
varying vec3 v_worldPosition;

#if POINT_LIGHTS_COUNT > 0
struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 position;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
|},
                {|

vec3 getDirectionLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
                    |},
                {|
vec3 getDirectionLightDirByLightPos(vec3 lightPos){
    return lightPos - vec3(0.0);
}
vec3 getPointLightDirByLightPos(vec3 lightPos){
    return lightPos - v_worldPosition;
}
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){
    return lightPos - worldPosition;
}
                      |},
              ],
            )
            |> expect == true;
          });
          test("test fs glsl", () => {
            let shaderSource =
              InitLightMaterialJobTool.prepareForJudgeGLSL(
                InitLightMaterialJobTool.prepareGameObject,
                sandbox,
                state^,
              );
            GLSLTool.containMultiline(
              GLSLTool.getFsSource(shaderSource),
              [
                {|
varying vec3 v_worldPosition;

#if POINT_LIGHTS_COUNT > 0
struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 position;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
|},
                {|

vec3 getDirectionLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
                    |},
                {|
vec3 getDirectionLightDirByLightPos(vec3 lightPos){
    return lightPos - vec3(0.0);
}
vec3 getPointLightDirByLightPos(vec3 lightPos){
    return lightPos - v_worldPosition;
}
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){
    return lightPos - worldPosition;
}
                      |},
              ],
            )
            |> expect == true;
          });
        });
        test("test light_setWorldPosition shader lib", () => {
          let shaderSource =
            InitLightMaterialJobTool.prepareForJudgeGLSL(
              InitLightMaterialJobTool.prepareGameObject,
              sandbox,
              state^,
            );
          GLSLTool.containMultiline(
            GLSLTool.getVsSource(shaderSource),
            [{|v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));|}],
          )
          |> expect == true;
        });
        describe("test map shader lib", () => {
          describe("test diffuse map shader lib", () => {
            describe("if has map", () => {
              test("test vs glsl", () => {
                let shaderSource =
                  InitLightMaterialJobTool.prepareForJudgeGLSL(
                    InitLightMaterialJobTool.prepareGameObjectWithCreatedMap,
                    sandbox,
                    state^,
                  );
                GLSLTool.containMultiline(
                  GLSLTool.getVsSource(shaderSource),
                  [
                    {|varying vec2 v_diffuseMapTexCoord;|},
                    {|v_diffuseMapTexCoord = a_texCoord;|},
                  ],
                )
                |> expect == true;
              });

              describe("test fs glsl", () => {
                test("test", () => {
                  let shaderSource =
                    InitLightMaterialJobTool.prepareForJudgeGLSL(
                      InitLightMaterialJobTool.prepareGameObjectWithCreatedMap,
                      sandbox,
                      state^,
                    );
                  GLSLTool.containMultiline(
                    GLSLTool.getFsSource(shaderSource),
                    [
                      {|uniform sampler2D u_diffuseMapSampler;|},
                      {|uniform vec3 u_diffuse;|},
                      {|varying vec2 v_diffuseMapTexCoord;|},
                      {|vec3 getMaterialDiffuse() {
        return texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord).rgb * u_diffuse;
    }|},
                    ],
                  )
                  |> expect == true;
                });

                test("should contain u_diffuse only once", () => {
                  let shaderSource =
                    InitLightMaterialJobTool.prepareForJudgeGLSL(
                      InitLightMaterialJobTool.prepareGameObjectWithCreatedMap,
                      sandbox,
                      state^,
                    );
                  GLSLTool.containSpecifyCount(
                    GLSLTool.getFsSource(shaderSource),
                    {|uniform vec3 u_diffuse;|},
                    ~count=1,
                    (),
                  )
                  |> expect == true;
                });
              });
            });
            describe("else", () =>
              test("test fs glsl", () => {
                let shaderSource =
                  InitLightMaterialJobTool.prepareForJudgeGLSL(
                    InitLightMaterialJobTool.prepareGameObject,
                    sandbox,
                    state^,
                  );
                GLSLTool.containMultiline(
                  GLSLTool.getFsSource(shaderSource),
                  [
                    {|uniform vec3 u_diffuse;|},
                    {|
    vec3 getMaterialDiffuse() {
        return u_diffuse;
    }
                          |},
                  ],
                )
                |> expect == true;
              })
            );
          });
          describe("test specular map shader lib", () => {
            describe("if has map", () => {
              test("test vs glsl", () => {
                let shaderSource =
                  InitLightMaterialJobTool.prepareForJudgeGLSL(
                    InitLightMaterialJobTool.prepareGameObjectWithCreatedMap,
                    sandbox,
                    state^,
                  );
                GLSLTool.containMultiline(
                  GLSLTool.getVsSource(shaderSource),
                  [
                    {|varying vec2 v_specularMapTexCoord;|},
                    {|v_specularMapTexCoord = a_texCoord;|},
                  ],
                )
                |> expect == true;
              });
              test("test fs glsl", () => {
                let shaderSource =
                  InitLightMaterialJobTool.prepareForJudgeGLSL(
                    InitLightMaterialJobTool.prepareGameObjectWithCreatedMap,
                    sandbox,
                    state^,
                  );
                GLSLTool.containMultiline(
                  GLSLTool.getFsSource(shaderSource),
                  [
                    {|uniform sampler2D u_specularMapSampler;|},
                    {|varying vec2 v_specularMapTexCoord;|},
                    {|float getSpecularStrength() {
        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;
    }|},
                  ],
                )
                |> expect == true;
              });
            });
            describe("else", () =>
              test("test fs glsl", () => {
                let shaderSource =
                  InitLightMaterialJobTool.prepareForJudgeGLSL(
                    InitLightMaterialJobTool.prepareGameObject,
                    sandbox,
                    state^,
                  );
                GLSLTool.containMultiline(
                  GLSLTool.getFsSource(shaderSource),
                  [
                    {|float getSpecularStrength() {
        return 1.0;
    }|},
                  ],
                )
                |> expect == true;
              })
            );
          });
          test("test no_light_map shader lib", () => {
            let shaderSource =
              InitLightMaterialJobTool.prepareForJudgeGLSL(
                InitLightMaterialJobTool.prepareGameObject,
                sandbox,
                state^,
              );
            GLSLTool.containMultiline(
              GLSLTool.getFsSource(shaderSource),
              [
                {|
    vec3 getMaterialLight() {
        return vec3(0.0);
    }
                          |},
              ],
            )
            |> expect == true;
          });
          test("test no_emission_map shader lib", () => {
            let shaderSource =
              InitLightMaterialJobTool.prepareForJudgeGLSL(
                InitLightMaterialJobTool.prepareGameObject,
                sandbox,
                state^,
              );
            GLSLTool.containMultiline(
              GLSLTool.getFsSource(shaderSource),
              [
                {|
    vec3 getMaterialEmission() {
        return vec3(0.0);
    }
                          |},
              ],
            )
            |> expect == true;
          });
          describe("test no_normal_map shader lib", () => {
            test("test vs glsl", () => {
              let shaderSource =
                InitLightMaterialJobTool.prepareForJudgeGLSL(
                  InitLightMaterialJobTool.prepareGameObject,
                  sandbox,
                  state^,
                );
              GLSLTool.containMultiline(
                GLSLTool.getVsSource(shaderSource),
                [
                  {|varying vec3 v_normal;|},
                  {|v_normal = normalize(normalMatrix * a_normal);|},
                ],
              )
              |> expect == true;
            });
            test("test fs glsl", () => {
              let shaderSource =
                InitLightMaterialJobTool.prepareForJudgeGLSL(
                  InitLightMaterialJobTool.prepareGameObject,
                  sandbox,
                  state^,
                );
              GLSLTool.containMultiline(
                GLSLTool.getFsSource(shaderSource),
                [
                  {|varying vec3 v_normal;|},
                  {|vec3 getNormal();|},
                  {|
vec3 getNormal(){
    return v_normal;
}
|},
                  {|

#if DIRECTION_LIGHTS_COUNT > 0
vec3 getDirectionLightDir(int index){
    //workaround '[] : Index expression must be constant' error
    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {
        if(x == index){
            return getDirectionLightDirByLightPos(u_directionLights[x].position);
        }
    }

    /*!
    solve error in window7 chrome/firefox:
    not all control paths return a value.
    failed to create d3d shaders
    */
    return vec3(0.0);
}
#endif


vec3 getViewDir(){
    return normalize(u_cameraPos - v_worldPosition);
}
|},
                ],
              )
              |> expect == true;
            });
          });
          test("test no_shadow_map shader lib", () => {
            let shaderSource =
              InitLightMaterialJobTool.prepareForJudgeGLSL(
                InitLightMaterialJobTool.prepareGameObject,
                sandbox,
                state^,
              );
            GLSLTool.containMultiline(
              GLSLTool.getFsSource(shaderSource),
              [
                {|
    float getShadowVisibility() {
        return 1.0;
    }
                          |},
              ],
            )
            |> expect == true;
          });
        });
        describe("test light shader lib", () => {
          let _prepareForJudgeGLSL = state =>
            InitLightMaterialJobTool.prepareForJudgeGLSL(
              (sandbox, state) => {
                let (state, gameObject, geometry, material) =
                  InitLightMaterialJobTool.prepareGameObject(sandbox, state);
                let (state, gameObject, light) =
                  DirectionLightTool.createGameObject(state);
                let (state, gameObject, light) =
                  DirectionLightTool.createGameObject(state);
                let (state, gameObject, light) =
                  PointLightTool.createGameObject(state);
                let (state, gameObject, light) =
                  PointLightTool.createGameObject(state);
                (state, gameObject, geometry, material);
              },
              sandbox,
              state^,
            );
          describe("test vs glsl", () => {
            test("define light count", () => {
              let shaderSource = _prepareForJudgeGLSL(state);
              GLSLTool.containMultiline(
                GLSLTool.getVsSource(shaderSource),
                [
                  {|#define DIRECTION_LIGHTS_COUNT 2
|},
                  {|#define POINT_LIGHTS_COUNT 2
|},
                ],
              )
              |> expect == true;
            });
            test("set gl_Position", () => {
              let shaderSource =
                InitLightMaterialJobTool.prepareForJudgeGLSL(
                  InitLightMaterialJobTool.prepareGameObject,
                  sandbox,
                  state^,
                );
              GLSLTool.containMultiline(
                GLSLTool.getVsSource(shaderSource),
                [
                  {|gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);|},
                ],
              )
              |> expect == true;
            });
          });
          describe("test fs glsl", () => {
            test("define light count", () => {
              let shaderSource = _prepareForJudgeGLSL(state);
              GLSLTool.containMultiline(
                GLSLTool.getVsSource(shaderSource),
                [
                  {|#define DIRECTION_LIGHTS_COUNT 2
|},
                  {|#define POINT_LIGHTS_COUNT 2
|},
                ],
              )
              |> expect == true;
            });
            test("calc total color", () => {
              let shaderSource =
                InitLightMaterialJobTool.prepareForJudgeGLSL(
                  InitLightMaterialJobTool.prepareGameObject,
                  sandbox,
                  state^,
                );
              GLSLTool.containMultiline(
                GLSLTool.getFsSource(shaderSource),
                [
                  {|uniform vec3 u_cameraPos;|},
                  {|
float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
        vec3 halfAngle = normalize(lightDir + viewDir);

        float blinnTerm = dot(normal, halfAngle);

        blinnTerm = clamp(blinnTerm, 0.0, 1.0);
        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;
        blinnTerm = pow(blinnTerm, shininess);

        return blinnTerm;
}
                            |},
                  {|
vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)
{
        vec3 materialLight = getMaterialLight();
        vec3 materialDiffuse = getMaterialDiffuse();
        vec3 materialSpecular = u_specular;
        vec3 materialEmission = getMaterialEmission();

        float specularStrength = getSpecularStrength();

        float dotResultBetweenNormAndLight = dot(normal, lightDir);
        float diff = max(dotResultBetweenNormAndLight, 0.0);

        vec3 emissionColor = materialEmission;

        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse.rgb;


        // if(u_lightModel == 3){
        //     return emissionColor + ambientColor;
        // }

//        vec4 diffuseColor = vec4(color * materialDiffuse.rgb * diff * intensity, materialDiffuse.a);
        vec3 diffuseColor = color * materialDiffuse.rgb * diff * intensity;

        float spec = 0.0;

        // if(u_lightModel == 2){
        //         spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);
        // }
        // else if(u_lightModel == 1){
        //         spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);
        // }

        spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);


        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;

//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), diffuseColor.a);
        return emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor);
}
                              |},
                  {|
#if POINT_LIGHTS_COUNT > 0
        vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)
{
        //lightDir is not normalize computing distance
        float distance = length(lightDir);

        float attenuation = 0.0;

        if(distance < light.range)
        {
            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
        }

        lightDir = normalize(lightDir);

        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif
    |},
                  {|
#if DIRECTION_LIGHTS_COUNT > 0
        vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)
{
        float attenuation = 1.0;

        lightDir = normalize(lightDir);

        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif
    |},
                  {|
vec4 calcTotalLight(vec3 norm, vec3 viewDir){
    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);


    #if (DIRECTION_LIGHTS_COUNT == 0 && POINT_LIGHTS_COUNT == 0 )
        return vec4(u_ambient, 1.0);
    #endif


    #if POINT_LIGHTS_COUNT > 0
                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
                totalLight += vec4(calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir), 0.0);
        }
    #endif

    #if DIRECTION_LIGHTS_COUNT > 0
                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
                totalLight += vec4(calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir), 0.0);
        }
    #endif

        return totalLight;
}
      |},
                  {|
vec3 normal = normalize(getNormal());

// #ifdef BOTH_SIdE
// normal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));
// #endif

vec3 viewDir = normalize(getViewDir());

vec4 totalColor = calcTotalLight(normal, viewDir);

// totalColor.a *= u_opacity;

totalColor.rgb = totalColor.rgb * getShadowVisibility();
|},
                ],
              )
              |> expect == true;
            });
          });
        });
        test("test ambient_light shader lib", () => {
          let shaderSource =
            InitLightMaterialJobTool.prepareForJudgeGLSL(
              InitLightMaterialJobTool.prepareGameObject,
              sandbox,
              state^,
            );
          GLSLTool.getFsSource(shaderSource)
          |> expect
          |> toContainString({|uniform vec3 u_ambient;|});
        });
        test("test light_end shader lib", () => {
          let shaderSource =
            InitLightMaterialJobTool.prepareForJudgeGLSL(
              InitLightMaterialJobTool.prepareGameObject,
              sandbox,
              state^,
            );
          GLSLTool.getFsSource(shaderSource)
          |> expect
          |> toContainString({|gl_FragColor = totalColor;|});
        });
        /* test(
             "test end shader lib",
             () => {
             }
           ); */
      });
    });
  });