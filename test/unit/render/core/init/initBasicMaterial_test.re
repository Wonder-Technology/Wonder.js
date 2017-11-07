open BasicMaterial;

open Jest;

let _ =
  describe(
    "init basic material",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithRenderConfig(
              ~bufferConfig=
                Js.Nullable.return({
                  "transformDataBufferCount": Js.Nullable.undefined,
                  "geometryPointDataBufferCount": Js.Nullable.return(1000),
                  "basicMaterialDataBufferCount": Js.Nullable.undefined
                }),
              ~renderConfig=
                RenderConfigTool.buildRenderConfig(
                  ~renderSetting={|
    {
    "platform": "pc",
    "browser": [
        {
            "name": "chrome",
            "version": "newest"
        },
        {
            "name": "firefox",
            "version": "newest"
        }
    ],
    "backend": {
        "name": "webgl1"
    },
    "init_pipeline": "simple_basic_render",
    "render_pipeline": "simple_basic_render"
}
|},
                  ()
                ),
              ()
            )
        }
      );
      describe(
        "test glsl",
        () => {
          let _prepare = (state) => {
            open GameObject;
            open BasicMaterial;
            open BoxGeometry;
            let (state, material) = createBasicMaterial(state);
            let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
            let (state, gameObject) = state |> createGameObject;
            let state =
              state
              |> addGameObjectMaterialComponent(gameObject, material)
              |> addGameObjectGeometryComponent(gameObject, geometry);
            let shaderSource = createEmptyStub(refJsObjToSandbox(sandbox^));
            let createProgram = createEmptyStub(refJsObjToSandbox(sandbox^));
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ())
                 );
            let state = state |> GeometryTool.initGeometrys;
            let state = state |> WebGLRenderSystem.init;
            shaderSource
          };
          test(
            "glsl only set glPosition,glFragColor once",
            () => {
              let shaderSource = _prepare(state^);
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
              /* test
                 ("test common shader lib's glsl",
                 (
                 () => {
                 })
                 ); */
              test(
                "test mopdelMatrix_noInstance shader lib's glsl",
                () => {
                  let shaderSource = _prepare(state^);
                  GlslTool.containMultiline(
                    GlslTool.getVsSource(shaderSource),
                    [
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
              /* test
                 ("test vertex shader lib's glsl",
                 (
                 () => {
                 })
                 ); */
              test(
                "test basic shader lib's glsl",
                () => {
                  let shaderSource = _prepare(state^);
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
                  let shaderSource = _prepare(state^);
                  GlslTool.getFsSource(shaderSource)
                  |> expect
                  |> toContainString(
                       {|
gl_FragColor = vec4(1.0,0.5,1.0, 1.0);
|}
                     )
                }
              );
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