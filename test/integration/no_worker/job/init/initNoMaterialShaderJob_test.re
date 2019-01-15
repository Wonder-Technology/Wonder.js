open BasicMaterialAPI;

open Wonder_jest;

let _ =
  describe("test init no material shader job", () => {
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
          "name": "init_no_material_shader"
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
          "name": "init_no_material_shader"
        }
]
        |},
        (),
      );

    let _buildRenderConfig =
        (
          ~shaders={|
{
  "static_branchs": [
  ],
  "dynamic_branchs": [
  ],
  "groups": [
    {
      "name": "top",
      "value": [
        "common",
        "vertex"
      ]
    },
    {
      "name": "end",
      "value": [
        "end"
      ]
    }
  ],
  "material_shaders": [
  ],
  "no_material_shaders": [
    {
      "name": "outline_draw_expand_gameObjects",
      "shader_libs": [
        {
          "type": "group",
          "name": "top"
        },
        {
          "name": "normal"
        },
        {
          "name": "modelMatrix_noInstance"
        },
        {
          "name": "outline_expand"
        },
        {
          "type": "group",
          "name": "end"
        }
      ]
    }
  ]
}
        |},
          ~shaderLibs={|
[
  {
    "name": "common",
    "glsls": [
      {
        "type": "vs",
        "name": "common_vertex"
      },
      {
        "type": "fs",
        "name": "common_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_vMatrix",
          "field": "vMatrix",
          "type": "mat4",
          "from": "camera"
        },
        {
          "name": "u_pMatrix",
          "field": "pMatrix",
          "type": "mat4",
          "from": "camera"
        }
      ]
    }
  },
  {
    "name": "modelMatrix_noInstance",
    "glsls": [
      {
        "type": "vs",
        "name": "modelMatrix_noInstance_vertex"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_mMatrix",
          "field": "mMatrix",
          "type": "mat4",
          "from": "model"
        }
      ]
    }
  },
  {
    "name": "vertex",
    "variables": {
      "attributes": [
        {
          "name": "a_position",
          "buffer": 0,
          "type": "vec3"
        }
      ]
    }
  },
  {
    "name": "normal",
    "variables": {
      "attributes": [
        {
          "name": "a_normal",
          "buffer": 1,
          "type": "vec3"
        }
      ]
    }
  },
  {
    "name": "outline_expand",
    "glsls": [
      {
        "type": "vs",
        "name": "webgl1_outline_expand_vertex"
      },
      {
        "type": "fs",
        "name": "webgl1_outline_expand_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_outlineColor",
          "from": "no_material_shader",
          "field": "outlineExpand",
          "type": "float"
        }
      ]
    }
  },
  {
    "name": "end",
    "variables": {
      "attributes": [
        {
          "buffer": 3
        }
      ]
    }
  }
]
        |},
          (),
        ) => (
      shaders,
      shaderLibs,
    );

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfigWithoutBuildFakeDom(
          ~sandbox,
          ~renderConfigRecord=_buildRenderConfig(),
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test get attribute location", () => {
      describe("test get a_position location", () =>
        test("test get location", () => {
          let state = state^;
          let getAttribLocation =
            GLSLLocationTool.getAttribLocation(sandbox, "a_position");
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ()),
               );

          let state = state |> DirectorTool.init;

          getAttribLocation
          |> withTwoArgs(matchAny, "a_position")
          |> expect
          |> toCalledOnce;
        })
      );

      describe("test get a_normal location", () =>
        test("test get location", () => {
          let state = state^;
          let getAttribLocation =
            GLSLLocationTool.getAttribLocation(sandbox, "a_normal");
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ()),
               );

          let state = state |> DirectorTool.init;

          getAttribLocation
          |> withTwoArgs(matchAny, "a_normal")
          |> expect
          |> toCalledOnce;
        })
      );
    });

    describe("test get uniform location", () => {
      let testGetLocation = (sandbox, name, execFunc, state) => {
        open Wonder_jest;
        open Expect;
        open Sinon;
        /* let (state, gameObject, geometry, material) =
           prepareGameObjectFunc(sandbox, state^); */
        let state = state^;

        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(sandbox, name);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ()),
             );

        let state = state |> execFunc;

        getUniformLocation
        |> withTwoArgs(matchAny, name)
        |> expect
        |> toCalledOnce;
      };

      describe("test get no_material_shader uniform location", () =>
        test("test get u_outlineColor location", () =>
          testGetLocation(sandbox, "u_outlineColor", DirectorTool.init, state)
        )
      );

      describe("test get camera uniform location", () =>
        test("test get u_vMatrix location", () =>
          testGetLocation(sandbox, "u_vMatrix", DirectorTool.init, state)
        )
      );

      describe("test get model uniform location", () =>
        test("test get u_mMatrix location", () =>
          testGetLocation(sandbox, "u_mMatrix", DirectorTool.init, state)
        )
      );
    });

    describe("test glsl", () => {
      let _prepareForJudgeGLSLNotExec = (sandbox, state) => {
        let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
        let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~shaderSource,
                 ~createProgram,
                 (),
               ),
             );
        (state, shaderSource);
      };

      test("test vs", () => {
        let (state, shaderSource) =
          _prepareForJudgeGLSLNotExec(sandbox, state^);

        let state = state |> DirectorTool.init;

        GLSLTool.containMultiline(
          GLSLTool.getVsSource(shaderSource),
          [
            {|attribute vec3 a_position;|},
            {|attribute vec3 a_normal;|},
            {|uniform mat4 u_vMatrix;|},
            {|uniform mat4 u_pMatrix;|},
            {|uniform mat4 u_mMatrix;|},
            {|mat4 mMatrix = u_mMatrix;|},
            {|gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(position, 1.0);|},
          ],
        )
        |> expect == true;
      });
      test("test fs", () => {
        let (state, shaderSource) =
          _prepareForJudgeGLSLNotExec(sandbox, state^);

        let state = state |> DirectorTool.init;

        GLSLTool.containMultiline(
          GLSLTool.getFsSource(shaderSource),
          [
            {|uniform float u_outlineColor;|},
            {|gl_FragColor = vec4(u_outlineColor, 1.0);|},
          ],
        )
        |> expect == true;
      });
    });
  });