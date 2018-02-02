/* TODO duplicate with InitBasicMaterialJob_test */
open LightMaterial;

open Wonder_jest;

let _ =
  describe(
    "test init_light_material job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := InitLightMaterialJobTool.initWithJobConfig(sandbox)
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
                    InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
                  let getAttribLocation =
                    GLSLLocationTool.getAttribLocation(sandbox, "a_position");
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                       );
                  let state = state |> InitLightMaterialJobTool.exec;
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
                        InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
                      let (state, _, _, _) =
                        InitLightMaterialJobTool.prepareGameObject(sandbox, state);
                      let getAttribLocation =
                        GLSLLocationTool.getAttribLocation(sandbox, "a_position");
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                           );
                      let state = state |> InitLightMaterialJobTool.exec;
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
            "test get a_normal location",
            () => {
              test(
                "test get location",
                () => {
                  let (state, gameObject, geometry, material) =
                    InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
                  let getAttribLocation = GLSLLocationTool.getAttribLocation(sandbox, "a_normal");
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                       );
                  let state = state |> InitLightMaterialJobTool.exec;
                  getAttribLocation |> withTwoArgs(matchAny, "a_normal") |> expect |> toCalledOnce
                }
              );
              describe(
                "test cache",
                () =>
                  test(
                    "if cached, not query gl location",
                    () => {
                      let (state, gameObject, geometry, material) =
                        InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
                      let (state, _, _, _) =
                        InitLightMaterialJobTool.prepareGameObject(sandbox, state);
                      let getAttribLocation =
                        GLSLLocationTool.getAttribLocation(sandbox, "a_normal");
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                           );
                      let state = state |> InitLightMaterialJobTool.exec;
                      getAttribLocation
                      |> withTwoArgs(matchAny, "a_normal")
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
          let _testGetLocation = (name) => {
            let (state, gameObject, geometry, material) =
              InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
            let getUniformLocation = GLSLLocationTool.getUniformLocation(sandbox, name);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ()));
            let state = state |> InitLightMaterialJobTool.exec;
            getUniformLocation |> withTwoArgs(matchAny, name) |> expect |> toCalledOnce
          };
          describe(
            "test get u_normalMatrix location",
            () => {
              test("test get location", () => _testGetLocation("u_normalMatrix"));
              describe(
                "test cache",
                () =>
                  test(
                    "if cached, not query gl location",
                    () => {
                      let (state, gameObject, geometry, material) =
                        InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
                      let (state, _, _, _) =
                        InitLightMaterialJobTool.prepareGameObject(sandbox, state);
                      let getUniformLocation =
                        GLSLLocationTool.getUniformLocation(sandbox, "u_normalMatrix");
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ())
                           );
                      let state = state |> InitLightMaterialJobTool.exec;
                      getUniformLocation
                      |> withTwoArgs(matchAny, "u_normalMatrix")
                      |> expect
                      |> toCalledOnce
                    }
                  )
              )
            }
          );
          test("test get u_mMatrix location", () => _testGetLocation("u_mMatrix"));
          test("test get u_cameraPos location", () => _testGetLocation("u_cameraPos"));
          test("test get u_diffuse location", () => _testGetLocation("u_diffuse"));
          test("test get u_specular location", () => _testGetLocation("u_specular"));
          test("test get u_shininess location", () => _testGetLocation("u_shininess"))
        }
      );
      describe(
        "test glsl",
        () => {
          test(
            "glsl only set glPosition,glFragColor once",
            () => {
              let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
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
                  let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.containMultiline(
                    GLSLTool.getVsSource(shaderSource),
                    [{|uniform mat4 u_vMatrix;
|}, {|uniform mat4 u_pMatrix;
|}]
                  )
                  |> expect == true
                }
              );
              test(
                "test vertex shader lib's glsl",
                () => {
                  let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.getVsSource(shaderSource)
                  |> expect
                  |> toContainString({|attribute vec3 a_position;
|})
                }
              );
              test(
                "test normal shader lib's glsl",
                () => {
                  let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.getVsSource(shaderSource)
                  |> expect
                  |> toContainString({|attribute vec3 a_normal;|})
                }
              );
              test(
                "if has no sourceInstance component, use modelMatrix_noInstance shader lib",
                () => {
                  let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.containMultiline(
                    GLSLTool.getVsSource(shaderSource),
                    [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
                  )
                  |> expect == true
                }
              );
              test(
                "if has no sourceInstance component, use normalMatrix_noInstance shader lib",
                () => {
                  let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.containMultiline(
                    GLSLTool.getVsSource(shaderSource),
                    [{|uniform mat3 u_normalMatrix;|}, {|mat3 normalMatrix = u_normalMatrix;|}]
                  )
                  |> expect == true
                }
              );
              describe(
                "test light_common shader lib's glsl",
                () => {
                  test(
                    "test vs glsl",
                    () => {
                      let shaderSource =
                        InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getVsSource(shaderSource),
                        [
                          {|
varying vec3 v_worldPosition;

// #if POINT_LIGHTS_COUNT > 0
//     struct PointLight {
//     vec3 position;
//     vec3 color;
//     float intensity;

//     float range;
//     float constant;
//     float linear;
//     float quadratic;
// };
// uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

// #endif


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
                      |}
                        ]
                      )
                      |> expect == true
                    }
                  );
                  test(
                    "test fs glsl",
                    () => {
                      let shaderSource =
                        InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getFsSource(shaderSource),
                        [
                          {|
varying vec3 v_worldPosition;

// #if POINT_LIGHTS_COUNT > 0
// struct PointLight {
//     vec3 position;
//     vec3 color;
//     float intensity;

//     float range;
//     float constant;
//     float linear;
//     float quadratic;
// };
// uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

// #endif


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
                      |}
                        ]
                      )
                      |> expect == true
                    }
                  )
                }
              );
              test(
                "test light_setWorldPosition shader lib",
                () => {
                  let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.containMultiline(
                    GLSLTool.getVsSource(shaderSource),
                    [{|v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));|}]
                  )
                  |> expect == true
                }
              );
              describe(
                "test map shader lib",
                () => {
                  test(
                    "test noDiffuseMap shader lib",
                    () => {
                      let shaderSource =
                        InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getFsSource(shaderSource),
                        [
                          {|uniform vec3 u_diffuse;|},
                          {|
    vec3 getMaterialDiffuse() {
        return u_diffuse;
    }
                          |}
                        ]
                      )
                      |> expect == true
                    }
                  );
                  test(
                    "test noSpecularMap shader lib",
                    () => {
                      let shaderSource =
                        InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getFsSource(shaderSource),
                        [
                          {|uniform vec3 u_specular;|},
                          {|
    float getSpecularStrength() {
        return 1.0;
    }
                          |}
                        ]
                      )
                      |> expect == true
                    }
                  );
                  test(
                    "test noLightMap shader lib",
                    () => {
                      let shaderSource =
                        InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getFsSource(shaderSource),
                        [
                          {|
    vec3 getMaterialLight() {
        return vec3(0.0);
    }
                          |}
                        ]
                      )
                      |> expect == true
                    }
                  );
                  test(
                    "test noEmissionMap shader lib",
                    () => {
                      let shaderSource =
                        InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getFsSource(shaderSource),
                        [
                          {|
    vec3 getMaterialEmission() {
        return vec3(0.0);
    }
                          |}
                        ]
                      )
                      |> expect == true
                    }
                  );
                  describe(
                    "test noNormalMap shader lib",
                    () => {
                      test(
                        "test vs glsl",
                        () => {
                          let shaderSource =
                            InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                          GLSLTool.containMultiline(
                            GLSLTool.getVsSource(shaderSource),
                            [
                              {|varying vec3 v_normal;|},
                              {|v_normal = normalize(normalMatrix * a_normal);|}
                            ]
                          )
                          |> expect == true
                        }
                      );
                      test(
                        "test fs glsl",
                        () => {
                          let shaderSource =
                            InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
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
|}
                            ]
                          )
                          |> expect == true
                        }
                      )
                    }
                  );
                  test(
                    "test noShadowMap shader lib",
                    () => {
                      let shaderSource =
                        InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                      GLSLTool.containMultiline(
                        GLSLTool.getFsSource(shaderSource),
                        [
                          {|
    float getShadowVisibility() {
        return 1.0;
    }
                          |}
                        ]
                      )
                      |> expect == true
                    }
                  )
                }
              );
              describe(
                "test light shader lib",
                () => {
                  let _prepareForJudgeGLSL = (state) =>
                    InitLightMaterialJobTool.prepareForJudgeGLSL(
                      sandbox,
                      ~prepareGameObjectFunc=
                        (sandbox, state) => {
                          let (state, gameObject, geometry, material) =
                            InitLightMaterialJobTool.prepareGameObject(sandbox, state);
                          let (state, gameObject, light) =
                            DirectionLightTool.createGameObject(state);
                          let (state, gameObject, light) =
                            DirectionLightTool.createGameObject(state);
                          (state, gameObject, geometry, material)
                        },
                      state^
                    );
                  describe(
                    "test vs glsl",
                    () => {
                      test(
                        "define light count",
                        () => {
                          let shaderSource = _prepareForJudgeGLSL(state);
                          GLSLTool.contain(
                            GLSLTool.getVsSource(shaderSource),
                            "#define DIRECTION_LIGHTS_COUNT 2\n"
                          )
                          |> expect == true
                        }
                      );
                      test(
                        "set gl_Position",
                        () => {
                          let shaderSource =
                            InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                          GLSLTool.containMultiline(
                            GLSLTool.getVsSource(shaderSource),
                            [{|gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);|}]
                          )
                          |> expect == true
                        }
                      )
                    }
                  );
                  describe(
                    "test fs glsl",
                    () => {
                      test(
                        "define light count",
                        () => {
                          let shaderSource = _prepareForJudgeGLSL(state);
                          GLSLTool.contain(
                            GLSLTool.getFsSource(shaderSource),
                            "#define DIRECTION_LIGHTS_COUNT 2\n"
                          )
                          |> expect == true
                        }
                      );
                      test(
                        "calc total color",
                        () => {
                          let shaderSource =
                            InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
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

//     #if POINT_LIGHTS_COUNT > 0
//                 for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
//                 totalLight += vec4(calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir), 0.0);
//         }
//     #endif

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
|}
                            ]
                          )
                          |> expect == true
                        }
                      )
                    }
                  )
                }
              );
              test(
                "test ambient_light shader lib",
                () => {
                  let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.getFsSource(shaderSource)
                  |> expect
                  |> toContainString({|uniform vec3 u_ambient;|})
                }
              );
              test(
                "test light_end shader lib",
                () => {
                  let shaderSource = InitLightMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GLSLTool.getFsSource(shaderSource)
                  |> expect
                  |> toContainString({|gl_FragColor = totalColor;|})
                }
              )
              /* test(
                   "test end shader lib",
                   () => {
                   }
                 ); */
            }
          )
        }
      )
    }
  );