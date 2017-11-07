open BasicMaterial;

open Jest;

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
          state := InitBasicMaterialJobTool.initWithRenderConfig();
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
              test(
                "test modelMatrix_noInstance shader lib's glsl",
                () => {
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state^);
                  GlslTool.containMultiline(
                    GlslTool.getVsSource(shaderSource),
                    [
                      {|uniform mat4 u_mMatrix;
|},
                      {|mat4 getModelMatrix(){
    return u_mMatrix;
}|},
                      {|mat4 mMatrix = getModelMatrix();
|}
                    ]
                  )
                  |> expect == true
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
                  |> toContainString({|
gl_FragColor = vec4(1.0,0.5,1.0, 1.0);
|})
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