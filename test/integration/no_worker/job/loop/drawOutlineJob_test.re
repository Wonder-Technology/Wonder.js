open Wonder_jest;

let _ =
  describe("test draw outline job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

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
      "name": "outline_draw_origin_gameObjects",
      "shader_libs": [
        {
          "type": "group",
          "name": "top"
        },
        {
          "name": "modelMatrix_noInstance"
        },
        {
          "name": "outline_origin"
        },
        {
          "type": "group",
          "name": "end"
        }
      ]
    },
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
          "name": "outline_scaled_modelMatrix"
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
          "type": "float3"
        }
      ]
    }
  },
{
    "name": "outline_scaled_modelMatrix",
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
          "from": "expand_model"
        }
      ]
    }
  },
  {
    "name": "outline_origin",
    "glsls": [
      {
        "type": "vs",
        "name": "webgl1_outline_origin_vertex"
      },
      {
        "type": "fs",
        "name": "webgl1_outline_origin_fragment"
      }
    ]
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

    let _buildNoWorkerJobConfig = () =>
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_camera"
        },
        {
          "name": "start_time"
        },
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
          NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
        ~loopPipelines=
          {|
[
    {
        "name": "default",
        "jobs": [
            {
                "name": "tick"
            },
            {
                "name": "dispose"
            },
            {
                "name": "reallocate_cpu_memory"
            },
            {
                "name": "update_transform"
            },
            {
                "name": "update_camera"
            },
            {
                "name": "get_camera_data"
            },
            {
                "name": "create_basic_render_object_buffer"
            },
            {
                "name": "create_light_render_object_buffer"
            },
            {
                "name": "clear_last_send_component"
            },
            {
                "name": "send_uniform_shader_data"
            },
            {
                "name": "draw_outline"
            }
        ]
    }
]
        |},
        ~loopJobs=NoWorkerJobConfigTool.buildNoWorkerLoopJobConfig(),
        (),
      );

    module TestDraw = {
      let prepareBasicGameObject = (sandbox, state) => {
        open GameObjectAPI;
        open BasicMaterialAPI;
        open MeshRendererAPI;
        open Sinon;

        let (state, material) = createBasicMaterial(state);
        let (state, geometry, name, pointsData) =
          SphereGeometryTool.createSphereGeometry(state);
        let (state, meshRenderer) = createMeshRenderer(state);
        let (state, gameObject) = state |> createGameObject;
        let state =
          state
          |> addGameObjectBasicMaterialComponent(gameObject, material)
          |> addGameObjectGeometryComponent(gameObject, geometry)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        (
          state,
          gameObject,
          (geometry, name, pointsData),
          material,
          meshRenderer,
        );
      };

      let prepareOneGameObject = (sandbox, state) => {
        /* let (state, basicGameObject, (basicGeometry, _, pointsData), _, _) =
           prepareBasicGameObject(sandbox, state); */

        let (state, lightGameObject, lightGeometry, _, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
        let (state, _, cameraTransform, (basicCameraView, _)) =
          CameraTool.createCameraGameObject(state);

        let state =
          state
          |> JobDataAPI.setGameObjectsNeedDrawOutline([|
               /* basicGameObject, */
               lightGameObject,
             |]);

        (
          state,
          (cameraTransform, basicCameraView),
          lightGameObject,
          lightGeometry,
        );
      };

      let prepareGameObjects = (sandbox, state) => {
        let (state, basicGameObject, (basicGeometry, _, pointsData), _, _) =
          prepareBasicGameObject(sandbox, state);

        let (state, lightGameObject, lightGeometry, _, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
        let (state, _, cameraTransform, (basicCameraView, _)) =
          CameraTool.createCameraGameObject(state);

        let state =
          state
          |> JobDataAPI.setGameObjectsNeedDrawOutline([|
               basicGameObject,
               lightGameObject,
             |]);

        (
          state,
          (cameraTransform, basicCameraView),
          (basicGameObject, lightGameObject),
          ((basicGeometry, pointsData), lightGeometry),
        );
      };

      let prepareAndExecForSendVMatrix = () => {
        let (
          state,
          (cameraTransform, basicCameraView),
          (basicGameObject, lightGameObject),
          (
            (basicGeometry, (vertices, texCoords, normals, indices)),
            lightGeometry,
          ),
        ) =
          prepareGameObjects(sandbox, state^);
        let state =
          state
          |> TransformAPI.setTransformLocalPosition(
               cameraTransform,
               (10., 2., 3.),
             );
        let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
        let name = "u_vMatrix";
        let pos = 0;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~uniformMatrix4fv,
                 ~getUniformLocation,
                 (),
               ),
             );

        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        let targetData =
          Js.Typed_array.Float32Array.make([|
            1.,
            0.,
            0.,
            0.,
            0.,
            1.,
            0.,
            0.,
            0.,
            0.,
            1.,
            0.,
            (-10.),
            (-2.),
            (-3.),
            1.,
          |]);

        (state, uniformMatrix4fv, pos, targetData);
      };

      let prepareAndExecForSendPMatrix = () => {
        let (
          state,
          (cameraTransform, basicCameraView),
          (basicGameObject, lightGameObject),
          (
            (basicGeometry, (vertices, texCoords, normals, indices)),
            lightGeometry,
          ),
        ) =
          prepareGameObjects(sandbox, state^);
        let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
        let name = "u_pMatrix";
        let pos = 0;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~uniformMatrix4fv,
                 ~getUniformLocation,
                 (),
               ),
             );

        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        let targetData =
          PerspectiveCameraProjectionTool.getPMatrixOfCreateBasicCameraViewPerspectiveCamera();

        (state, uniformMatrix4fv, pos, targetData);
      };

      let prepareAndExecForSendMMatrix = () => {
        let (
          state,
          (cameraTransform, basicCameraView),
          (basicGameObject, lightGameObject),
          (
            (basicGeometry, (vertices, texCoords, normals, indices)),
            lightGeometry,
          ),
        ) =
          prepareGameObjects(sandbox, state^);
        let state =
          state
          |> TransformAPI.setTransformLocalPosition(
               GameObjectAPI.unsafeGetGameObjectTransformComponent(
                 basicGameObject,
                 state,
               ),
               (1., 2., 3.),
             )
          |> TransformAPI.setTransformLocalPosition(
               GameObjectAPI.unsafeGetGameObjectTransformComponent(
                 lightGameObject,
                 state,
               ),
               (2., 3., 4.),
             );
        let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
        let name = "u_mMatrix";
        let pos = 0;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~uniformMatrix4fv,
                 ~getUniformLocation,
                 (),
               ),
             );

        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        (state, uniformMatrix4fv, pos);
      };

      let prepareAndExecForDrawElement = () => {
        let (
          state,
          _,
          _,
          (
            (basicGeometry, (vertices, texCoords, normals, indices)),
            lightGeometry,
          ),
        ) =
          prepareGameObjects(sandbox, state^);
        let triangles = 1;
        let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~triangles,
                 ~drawElements,
                 (),
               ),
             );

        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        (state, drawElements, triangles, (basicGeometry, lightGeometry));
      };
    };

    module TestUseProgram = {
      let prepareAndExec = shaderName =>
        RenderInJobTool.TestUseProgram.prepareAndExec(
          sandbox,
          state,
          shaderName,
        );
    };

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
          ~sandbox,
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          ~renderConfigRecord=_buildRenderConfig(),
          ~context=
            {|
        {
        "alpha": true,
        "depth": true,
        "stencil": true,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |},
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test("gl context->stencil should be true", () =>
      state^
      |> ViewTool.unsafeGetContext
      |> expect
      == {
           alpha: true,
           depth: true,
           stencil: true,
           antialias: true,
           premultipliedAlpha: true,
           preserveDrawingBuffer: false,
         }
    );

    describe(
      "test init outline_draw_origin_gameObjects,outline_draw_expand_gameObjects shaders",
      () => {
        describe("test get attribute location", () => {
          describe("test get a_position location", () =>
            test("test get location twice", () => {
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
              |> toCalledTwice;
            })
          );

          describe("test get a_normal location", () =>
            test("test get location once", () => {
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
          describe("test get no_material_shader uniform location", () =>
            test("test get u_outlineColor location once", () =>
              RenderInJobTool.testGetLocation(
                sandbox,
                "u_outlineColor",
                1,
                DirectorTool.init,
                state,
              )
            )
          );

          describe("test get camera uniform location", () =>
            test("test get u_vMatrix location twice", () =>
              RenderInJobTool.testGetLocation(
                sandbox,
                "u_vMatrix",
                2,
                DirectorTool.init,
                state,
              )
            )
          );

          describe("test get model uniform location", () =>
            test("test get u_mMatrix location twice", () =>
              RenderInJobTool.testGetLocation(
                sandbox,
                "u_mMatrix",
                2,
                DirectorTool.init,
                state,
              )
            )
          );
        });

        describe("test glsl", () => {
          describe("test outline_draw_origin_gameObjects glsl", () => {
            test("test vs", () => {
              let (state, shaderSource) =
                RenderInJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);

              let state = state |> DirectorTool.init;

              GLSLTool.containMultiline(
                GLSLTool.getVsSourceByCount(shaderSource, 0),
                [
                  {|attribute vec3 a_position;|},
                  {|uniform mat4 u_vMatrix;|},
                  {|uniform mat4 u_pMatrix;|},
                  {|uniform mat4 u_mMatrix;|},
                  {|mat4 mMatrix = u_mMatrix;|},
                  {|gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);|},
                ],
              )
              |> expect == true;
            });
            test("test fs", () => {
              let (state, shaderSource) =
                RenderInJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);

              let state = state |> DirectorTool.init;

              GLSLTool.containMultiline(
                GLSLTool.getFsSourceByCount(shaderSource, 0),
                [{|gl_FragColor = vec4(1.0);|}],
              )
              |> expect == true;
            });
          });

          describe("test outline_draw_expand_gameObjects glsl", () => {
            describe("test vs", () => {
              test("send a_position, a_normal and mvp matrices", () => {
                let (state, shaderSource) =
                  RenderInJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);

                let state = state |> DirectorTool.init;

                GLSLTool.containMultiline(
                  GLSLTool.getVsSourceByCount(shaderSource, 2),
                  [
                    {|attribute vec3 a_position;|},
                    {|attribute vec3 a_normal;|},
                    {|uniform mat4 u_vMatrix;|},
                    {|uniform mat4 u_pMatrix;|},
                    {|uniform mat4 u_mMatrix;|},
                    {|mat4 mMatrix = u_mMatrix;|},
                  ],
                )
                |> expect == true;
              });
              test("move a_position out towards a_normal", () => {
                let (state, shaderSource) =
                  RenderInJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);

                let state = state |> DirectorTool.init;

                GLSLTool.containMultiline(
                  GLSLTool.getVsSourceByCount(shaderSource, 2),
                  [
                    {|vec3 position = a_position.xyz + a_normal.xyz * 0.08;|},
                    {|gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(position, 1.0);|},
                  ],
                )
                |> expect == true;
              });
            });

            test("test fs", () => {
              let (state, shaderSource) =
                RenderInJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);

              let state = state |> DirectorTool.init;

              GLSLTool.containMultiline(
                GLSLTool.getFsSourceByCount(shaderSource, 2),
                [
                  {|uniform vec3 u_outlineColor;|},
                  {|gl_FragColor = vec4(u_outlineColor, 1.0);|},
                ],
              )
              |> expect == true;
            });
          });
        });
      },
    );

    describe("prepare gl state", () => {
      test("enable stencil test", () => {
        let enable = createEmptyStubWithJsObjSandbox(sandbox);
        let getStencilTest = 1;
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~enable, ~getStencilTest, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        enable |> expect |> toCalledWith([|getStencilTest|]);
      });
      test("set stencil op and func and mask", () => {
        let stencilOp = createEmptyStubWithJsObjSandbox(sandbox);
        let stencilFunc = createEmptyStubWithJsObjSandbox(sandbox);
        let stencilMask = createEmptyStubWithJsObjSandbox(sandbox);
        let keep = 1;
        let replace = 2;
        let always = 3;
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~stencilOp,
                 ~stencilFunc,
                 ~stencilMask,
                 ~keep,
                 ~replace,
                 ~always,
                 (),
               ),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        (
          stencilOp
          |> getCall(0)
          |> SinonTool.calledWithArg3(_, keep, keep, replace),
          stencilFunc
          |> getCall(0)
          |> SinonTool.calledWithArg3(_, always, 1, 0xFF),
          stencilMask |> getCall(0) |> SinonTool.calledWith(_, 0xFF),
        )
        |> expect == (true, true, true);
      });
      test("disable depth test", () => {
        let disable = createEmptyStubWithJsObjSandbox(sandbox);
        let getDepthTest = 1;
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~disable, ~getDepthTest, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        disable |> getCall(0) |> expect |> toCalledWith([|getDepthTest|]);
      });
      test("not write to depth buffer and color buffer", () => {
        let depthMask = createEmptyStubWithJsObjSandbox(sandbox);
        let colorMask = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~depthMask, ~colorMask, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        (
          depthMask |> getCall(0) |> SinonTool.calledWith(_, false),
          colorMask
          |> getCall(0)
          |> SinonTool.calledWithArg4(_, false, false, false, false),
        )
        |> expect == (true, true);
      });
    });

    describe("use draw origin gameObject program", () =>
      test("test", () => {
        let (state, useProgram, shaderIndex) =
          TestUseProgram.prepareAndExec("outline_draw_origin_gameObjects");

        useProgram
        |> getCall(0)
        |> SinonTool.calledWith(
             _,
             ProgramTool.unsafeGetProgram(shaderIndex, state),
           )
        |> expect == true;
      })
    );

    describe("draw origin gameObjects", () => {
      describe("send attribute data", () => {
        let _testBufferData = state => {
          let (
            state,
            _,
            (basicGameObject, lightGameObject),
            (
              (basicGeometry, (vertices, texCoords, normals, indices)),
              lightGeometry,
            ),
          ) =
            TestDraw.prepareGameObjects(sandbox, state^);
          let array_buffer = 1;
          let static_draw = 2;
          let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~array_buffer,
                   ~static_draw,
                   ~bufferData,
                   (),
                 ),
               );

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          (
            JudgeTool.isGreaterOrEqualThan(
              bufferData
              |> withThreeArgs(array_buffer, vertices, static_draw)
              |> getCallCount,
              1,
            ),
            JudgeTool.isGreaterOrEqualThan(
              bufferData
              |> withThreeArgs(
                   array_buffer,
                   BoxGeometryTool.getBoxGeometryVertices(state),
                   static_draw,
                 )
              |> getCallCount,
              1,
            ),
          )
          |> expect == (true, true);
        };

        describe("init vertex buffer", () =>
          test("bufferData", () =>
            _testBufferData(state)
          )
        );

        describe("init index buffer", () =>
          test("bufferData", () => {
            let (
              state,
              _,
              (basicGameObject, lightGameObject),
              (
                (basicGeometry, (vertices, texCoords, normals, indices)),
                lightGeometry,
              ),
            ) =
              TestDraw.prepareGameObjects(sandbox, state^);
            let element_array_buffer = 1;
            let static_draw = 2;
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~element_array_buffer,
                     ~static_draw,
                     ~bufferData,
                     (),
                   ),
                 );

            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

            (
              JudgeTool.isGreaterOrEqualThan(
                bufferData
                |> withThreeArgs(element_array_buffer, indices, static_draw)
                |> getCallCount,
                1,
              ),
              JudgeTool.isGreaterOrEqualThan(
                bufferData
                |> withThreeArgs(
                     element_array_buffer,
                     BoxGeometryTool.getBoxGeometryIndices(state),
                     static_draw,
                   )
                |> getCallCount,
                1,
              ),
            )
            |> expect == (true, true);
          })
        );
      });

      describe("send uniform data", () => {
        describe("test send data per shader", () => {
          test("send u_vMatrix", () => {
            let (state, uniformMatrix4fv, pos, targetData) =
              TestDraw.prepareAndExecForSendVMatrix();

            uniformMatrix4fv
            |> withThreeArgs(pos, Obj.magic(false), Obj.magic(targetData))
            |> getCallCount
            |> expect
            |> toBeGreaterThanOrEqual(1);
          });
          test("send u_pMatrix", () => {
            let (state, uniformMatrix4fv, pos, targetData) =
              TestDraw.prepareAndExecForSendPMatrix();

            uniformMatrix4fv
            |> withThreeArgs(pos, Obj.magic(false), Obj.magic(targetData))
            |> getCallCount
            |> expect
            |> toBeGreaterThanOrEqual(1);
          });
        });

        describe("test send model data", () =>
          test("send u_mMatrix", () => {
            let (state, uniformMatrix4fv, pos) =
              TestDraw.prepareAndExecForSendMMatrix();

            let targetData1 =
              Js.Typed_array.Float32Array.make([|
                1.,
                0.,
                0.,
                0.,
                0.,
                1.,
                0.,
                0.,
                0.,
                0.,
                1.,
                0.,
                1.,
                2.,
                3.,
                1.,
              |]);
            let targetData2 =
              Js.Typed_array.Float32Array.make([|
                1.,
                0.,
                0.,
                0.,
                0.,
                1.,
                0.,
                0.,
                0.,
                0.,
                1.,
                0.,
                2.,
                3.,
                4.,
                1.,
              |]);

            (
              uniformMatrix4fv
              |> withThreeArgs(
                   pos,
                   Obj.magic(false),
                   Obj.magic(targetData1),
                 )
              |> getCallCount,
              uniformMatrix4fv
              |> withThreeArgs(
                   pos,
                   Obj.magic(false),
                   Obj.magic(targetData2),
                 )
              |> getCallCount,
            )
            |> expect == (1, 1);
          })
        );
      });

      describe("draw", () =>
        test("test drawElements", () => {
          let (
            state,
            drawElements,
            triangles,
            (basicGeometry, lightGeometry),
          ) =
            TestDraw.prepareAndExecForDrawElement();

          (
            JudgeTool.isGreaterOrEqualThan(
              drawElements
              |> withFourArgs(
                   triangles,
                   GeometryTool.getIndicesCount(
                     basicGeometry,
                     CreateRenderStateMainService.createRenderState(state),
                   ),
                   GeometryTool.getIndexType(
                     CreateRenderStateMainService.createRenderState(state),
                   ),
                   GeometryTool.getIndexTypeSize(
                     CreateRenderStateMainService.createRenderState(state),
                   )
                   * 0,
                 )
              |> getCallCount,
              1,
            ),
            JudgeTool.isGreaterOrEqualThan(
              drawElements
              |> withFourArgs(
                   triangles,
                   GeometryTool.getIndicesCount(
                     lightGeometry,
                     CreateRenderStateMainService.createRenderState(state),
                   ),
                   GeometryTool.getIndexType(
                     CreateRenderStateMainService.createRenderState(state),
                   ),
                   GeometryTool.getIndexTypeSize(
                     CreateRenderStateMainService.createRenderState(state),
                   )
                   * 0,
                 )
              |> getCallCount,
              1,
            ),
          )
          |> expect == (true, true);
        })
      );
    });

    describe("clear last send component", () =>
      describe("clear lastSendGeometryData", () =>
        test("send a_position twice", () => {
          let (state, _, lightGameObject, lightGeometry) =
            TestDraw.prepareOneGameObject(sandbox, state^);
          let float = 1;
          let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
          let pos = 0;
          let getAttribLocation =
            GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~float,
                   ~vertexAttribPointer,
                   ~getAttribLocation,
                   (),
                 ),
               );

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          vertexAttribPointer
          |> withTwoArgs(pos, 3)
          |> getCallCount
          |> expect == 2;
        })
      )
    );

    describe("set gl state before draw expand gameObjects", () => {
      test("set stencil func and mask", () => {
        let stencilFunc = createEmptyStubWithJsObjSandbox(sandbox);
        let stencilMask = createEmptyStubWithJsObjSandbox(sandbox);
        let notEqual = 1;
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~stencilFunc,
                 ~stencilMask,
                 ~notEqual,
                 (),
               ),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        (
          stencilFunc
          |> getCall(1)
          |> SinonTool.calledWithArg3(_, notEqual, 1, 0xFF),
          stencilMask |> getCall(1) |> SinonTool.calledWith(_, 0x00),
        )
        |> expect == (true, true);
      });
      test("not set side to back", () => {
        let enable = createEmptyStubWithJsObjSandbox(sandbox);
        let cullFace = createEmptyStubWithJsObjSandbox(sandbox);
        let front = 1;
        let getCullFace = 2;
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~enable,
                 ~cullFace,
                 ~front,
                 ~getCullFace,
                 (),
               ),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        /* enable |> SinonTool.calledWith(_, getCullFace), */
        cullFace
        /* |> getCall(0) */
        |> SinonTool.calledWith(_, front)
        |> expect == false;
      });
      test("disable depth test", () => {
        let disable = createEmptyStubWithJsObjSandbox(sandbox);
        let getDepthTest = 1;
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~disable, ~getDepthTest, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        disable |> getCall(0) |> expect |> toCalledWith([|getDepthTest|]);
      });
      test("not write to depth buffer and color buffer", () => {
        let depthMask = createEmptyStubWithJsObjSandbox(sandbox);
        let colorMask = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~depthMask, ~colorMask, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        (
          depthMask |> withOneArg(false) |> getCallCount,
          colorMask
          |> withFourArgs(false, false, false, false)
          |> getCallCount,
        )
        |> expect == (1, 1);
      });
    });

    describe("draw expand gameObjects", () => {
      describe("send attribute data", () =>
        describe("send buffer", () => {
          let _testSend = (name, callCount) => {
            let (
              state,
              _,
              (basicGameObject, lightGameObject),
              (
                (basicGeometry, (vertices, texCoords, normals, indices)),
                lightGeometry,
              ),
            ) =
              TestDraw.prepareGameObjects(sandbox, state^);
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
            let pos = 0;
            let getAttribLocation =
              GLSLLocationTool.getAttribLocation(~pos, sandbox, name);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~float,
                     ~vertexAttribPointer,
                     ~getAttribLocation,
                     (),
                   ),
                 );

            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

            vertexAttribPointer
            |> withTwoArgs(pos, 3)
            |> getCallCount
            |> expect == callCount;
          };

          describe("send a_position", () =>
            test("attach buffer to attribute", () =>
              _testSend("a_position", 4)
            )
          );

          describe("send a_normal", () =>
            test("attach buffer to attribute", () =>
              _testSend("a_normal", 2)
            )
          );
        })
      );

      describe("send uniform data", () => {
        describe("test send data per shader", () => {
          test("send u_vMatrix", () => {
            let (state, uniformMatrix4fv, pos, targetData) =
              TestDraw.prepareAndExecForSendVMatrix();

            uniformMatrix4fv
            |> withThreeArgs(pos, Obj.magic(false), Obj.magic(targetData))
            |> getCallCount
            |> expect == 2;
          });
          test("send u_pMatrix", () => {
            let (state, uniformMatrix4fv, pos, targetData) =
              TestDraw.prepareAndExecForSendPMatrix();

            uniformMatrix4fv
            |> withThreeArgs(pos, Obj.magic(false), Obj.magic(targetData))
            |> getCallCount
            |> expect == 2;
          });
        });

        test("send u_outlineColor", () => {
          let (
            state,
            (cameraTransform, basicCameraView),
            (basicGameObject, lightGameObject),
            (
              (basicGeometry, (vertices, texCoords, normals, indices)),
              lightGeometry,
            ),
          ) =
            TestDraw.prepareGameObjects(sandbox, state^);
          let color = [|0.1, 0.1, 0.2|];
          let state = state |> JobDataAPI.setOutlineColor(color);
          let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
          let name = "u_outlineColor";
          let pos = 0;
          let getUniformLocation =
            GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~uniform3f,
                   ~getUniformLocation,
                   (),
                 ),
               );

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          uniform3f
          |> withFourArgs(pos, color[0], color[1], color[2])
          |> getCallCount
          |> expect == 1;
        });

        describe("test send model data", () =>
          test("send scaled u_mMatrix", () => {
            let (state, uniformMatrix4fv, pos) =
              TestDraw.prepareAndExecForSendMMatrix();

            let scaleVectorForScaledModelMatrix =
              DrawOutlineJobTool.getScaleVectorForScaledModelMatrix();
            let targetData1 =
              Js.Typed_array.Float32Array.make([|
                1.,
                0.,
                0.,
                0.,
                0.,
                1.,
                0.,
                0.,
                0.,
                0.,
                1.,
                0.,
                1.,
                2.,
                3.,
                1.,
              |])
              |> Matrix4Service.scale(
                   scaleVectorForScaledModelMatrix,
                   _,
                   Matrix4Service.createIdentityMatrix4(),
                 );

            let targetData2 =
              Js.Typed_array.Float32Array.make([|
                1.,
                0.,
                0.,
                0.,
                0.,
                1.,
                0.,
                0.,
                0.,
                0.,
                1.,
                0.,
                2.,
                3.,
                4.,
                1.,
              |])
              |> Matrix4Service.scale(
                   scaleVectorForScaledModelMatrix,
                   _,
                   Matrix4Service.createIdentityMatrix4(),
                 );

            (
              uniformMatrix4fv
              |> withThreeArgs(
                   pos,
                   Obj.magic(false),
                   Obj.magic(targetData1),
                 )
              |> getCallCount,
              uniformMatrix4fv
              |> withThreeArgs(
                   pos,
                   Obj.magic(false),
                   Obj.magic(targetData2),
                 )
              |> getCallCount,
            )
            |> expect == (1, 1);
          })
        );
      });

      describe("draw", () =>
        test("test drawElements", () => {
          let (
            state,
            drawElements,
            triangles,
            (basicGeometry, lightGeometry),
          ) =
            TestDraw.prepareAndExecForDrawElement();

          (
            drawElements
            |> withFourArgs(
                 triangles,
                 GeometryTool.getIndicesCount(
                   basicGeometry,
                   CreateRenderStateMainService.createRenderState(state),
                 ),
                 GeometryTool.getIndexType(
                   CreateRenderStateMainService.createRenderState(state),
                 ),
                 GeometryTool.getIndexTypeSize(
                   CreateRenderStateMainService.createRenderState(state),
                 )
                 * 0,
               )
            |> getCallCount,
            drawElements
            |> withFourArgs(
                 triangles,
                 GeometryTool.getIndicesCount(
                   lightGeometry,
                   CreateRenderStateMainService.createRenderState(state),
                 ),
                 GeometryTool.getIndexType(
                   CreateRenderStateMainService.createRenderState(state),
                 ),
                 GeometryTool.getIndexTypeSize(
                   CreateRenderStateMainService.createRenderState(state),
                 )
                 * 0,
               )
            |> getCallCount,
          )
          |> expect == (2, 2);
        })
      );
    });

    describe("use draw expand gameObject program", () =>
      test("test", () => {
        let (state, useProgram, shaderIndex) =
          TestUseProgram.prepareAndExec("outline_draw_expand_gameObjects");

        useProgram
        |> getCall(1)
        |> SinonTool.calledWith(
             _,
             ProgramTool.unsafeGetProgram(shaderIndex, state),
           )
        |> expect == true;
      })
    );

    describe("restore gl state", () => {
      test("disable stencil test", () => {
        let disable = createEmptyStubWithJsObjSandbox(sandbox);
        let getStencilTest = 1;
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~disable,
                 ~getStencilTest,
                 (),
               ),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        disable |> getCall(1) |> expect |> toCalledWith([|getStencilTest|]);
      });
      test("set stencil mask", () => {
        let stencilMask = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~stencilMask, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        stencilMask
        |> getCall(2)
        |> SinonTool.calledWith(_, 0xFF)
        |> expect == true;
      });
      /* test("set side to front", () => {
           let enable = createEmptyStubWithJsObjSandbox(sandbox);
           let cullFace = createEmptyStubWithJsObjSandbox(sandbox);
           let back = 1;
           let getCullFace = 2;
           let state =
             state^
             |> FakeGlTool.setFakeGl(
                  FakeGlTool.buildFakeGl(
                    ~sandbox,
                    ~enable,
                    ~cullFace,
                    ~back,
                    ~getCullFace,
                    (),
                  ),
                );

           let state =
             state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

           (
             enable |> SinonTool.calledWith(_, getCullFace),
             cullFace |> getCall(1) |> SinonTool.calledWith(_, back),
           )
           |> expect == (true, true);
         }); */
      test("enable depth test", () => {
        let enable = createEmptyStubWithJsObjSandbox(sandbox);
        let getDepthTest = 1;
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~enable, ~getDepthTest, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        enable |> getCall(1) |> expect |> toCalledWith([|getDepthTest|]);
      });
      test("write to depth buffer and color buffer", () => {
        let depthMask = createEmptyStubWithJsObjSandbox(sandbox);
        let colorMask = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~depthMask, ~colorMask, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        (
          depthMask |> getCall(1) |> SinonTool.calledWith(_, true),
          colorMask
          |> getCall(1)
          |> SinonTool.calledWithArg4(_, true, true, true, true),
        )
        |> expect == (true, true);
      });
    });
  });