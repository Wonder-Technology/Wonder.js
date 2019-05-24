open Wonder_jest;

let _ =
  describe("test render basic job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          RenderBasicJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test meshRenderer->isRender", () => {
      describe("if is false, not render", () =>
        test("test not draw", () => {
          let (state, geometry, meshRenderer) =
            RenderBasicJobTool.prepareForDrawElements(sandbox, state^);
          let state =
            MeshRendererAPI.setMeshRendererIsRender(
              meshRenderer,
              false,
              state,
            );
          let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~drawElements, ()),
               );

          let state = state |> RenderJobsTool.init;
          let state = state |> DirectorTool.runWithDefaultTime;

          drawElements |> expect |> not_ |> toCalled;
        })
      );

      describe("else, render", () =>
        test("test draw", () => {
          let (state, geometry, meshRenderer) =
            RenderBasicJobTool.prepareForDrawElements(sandbox, state^);
          let state =
            MeshRendererAPI.setMeshRendererIsRender(
              meshRenderer,
              false,
              state,
            );
          let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~drawElements, ()),
               );

          let state = state |> RenderJobsTool.init;
          let state = state |> DirectorTool.runWithDefaultTime;
          let state =
            MeshRendererAPI.setMeshRendererIsRender(
              meshRenderer,
              true,
              state,
            );
          let state = state |> DirectorTool.runWithDefaultTime;

          drawElements |> expect |> toCalledOnce;
        })
      );
    });

    describe("set render object gl state", () => {
      let _prepare = (sandbox, state) => {
        let (state, gameObject, geometry, material, _) =
          RenderBasicJobTool.prepareGameObject(sandbox, state);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        (state, material);
      };

      describe("set isDepthTest", () => {
        test("if is depth test, enable depth test", () => {
          let (state, material) = _prepare(sandbox, state^);
          let state =
            BasicMaterialAPI.setBasicMaterialIsDepthTest(
              material,
              true,
              state,
            );
          let enable = createEmptyStubWithJsObjSandbox(sandbox);
          let getDepthTest = 1;
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~enable, ~getDepthTest, ()),
               );

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          enable |> withOneArg(getDepthTest) |> expect |> toCalledOnce;
        });
        test("else, disable depth test", () => {
          let (state, material) = _prepare(sandbox, state^);
          let state =
            BasicMaterialAPI.setBasicMaterialIsDepthTest(
              material,
              false,
              state,
            );
          let disable = createEmptyStubWithJsObjSandbox(sandbox);
          let getDepthTest = 1;
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~disable,
                   ~getDepthTest,
                   (),
                 ),
               );

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          disable |> withOneArg(getDepthTest) |> expect |> toCalledOnce;
        });
      });
    });

    describe("use program", () => {
      let _prepare = (sandbox, state) =>
        RenderBasicForNoWorkerAndWorkerJobTool.prepareForUseProgramCase(
          sandbox,
          state,
        );
      let _prepareForUseProgram = (sandbox, state) =>
        RenderJobsTool.prepareForUseProgramCase(sandbox, _prepare, state);
      test("test use", () => {
        let (state, program, useProgram) =
          _prepareForUseProgram(sandbox, state^);
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
        useProgram |> expect |> toCalledWith([|program|]);
      });
      test("if the program is already used, not use again", () => {
        let (state, program, useProgram) =
          _prepareForUseProgram(sandbox, state^);
        let state = state |> RenderJobsTool.init;
        let state = state |> DirectorTool.runWithDefaultTime;
        let state = state |> DirectorTool.runWithDefaultTime;
        useProgram |> getCallCount |> expect == 1;
      });
      /* test
         ("different shader use different program",
         (
         () => {

         })
         ); */
      /* TODO should test with more attribute */
      /* describe(
           "disable all attributes",
           () => {
             let _prepareForDisable = (sandbox, state) => {
               let state = _prepare(sandbox, state);
               let pos = 0;
               let getAttribLocation =
                 GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
               let disableVertexAttribArray = createEmptyStubWithJsObjSandbox(sandbox);
               let state =
                 state
                 |> FakeGlTool.setFakeGl(
                      FakeGlTool.buildFakeGl(
                        ~sandbox,
                        ~getAttribLocation,
                        ~disableVertexAttribArray,
                        ()
                      )
                    );
               (state, pos, disableVertexAttribArray)
             };
             test(
               "if switch program, disable all attributes",
               () => {
                 let (state, pos, disableVertexAttribArray) = _prepareForDisable(sandbox, state^);
                 let state = state |> RenderJobsTool.init;
                 let state = state |> DirectorTool.runWithDefaultTime;
                 let state = state |> ProgramTool.clearLastUsedProgram;
                 let state = state |> DirectorTool.runWithDefaultTime;
                 disableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 1
               }
             );
             test(
               "else, not disable",
               () => {
                 let (state, pos, disableVertexAttribArray) = _prepareForDisable(sandbox, state^);
                 let state = state |> RenderJobsTool.init;
                 let state = state |> DirectorTool.runWithDefaultTime;
                 let state = state |> DirectorTool.runWithDefaultTime;
                 disableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 0
               }
             )
           }
         ) */
    });
    describe("send attribute data", () => {
      let _prepare = (sandbox, state) => {
        /* let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state); */
        let (state, gameObject, geometry, _, _, _) =
          RenderBasicJobTool.prepareGameObjectWithCreatedMap(sandbox, state);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        state;
      };

      describe("init vbo buffers when first send", () => {
        let _prepare = (sandbox, state) => {
          let (state, gameObject, geometry, _, _, _) =
            RenderBasicJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, geometry);
        };
        let _prepareForBufferData = (state, getBoxGeometryPointsFunc) => {
          let (state, geometry) = _prepare(sandbox, state^);
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
          let points = getBoxGeometryPointsFunc(state);
          bufferData
          |> withThreeArgs(array_buffer, points, static_draw)
          |> expect
          |> toCalledOnce;
        };
        test("create buffer", () => {
          let (state, _) = _prepare(sandbox, state^);
          let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          getCallCount(createBuffer) |> expect == 3;
        });

        describe("init vertex buffer", () => {
          test("bufferData", () =>
            _prepareForBufferData(
              state,
              BoxGeometryTool.getBoxGeometryVertices,
            )
          );
          test("bind buffer and unbind buffer", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let array_buffer = 1;
            let buffer = Obj.magic(10);
            let createBuffer =
              createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
            let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~array_buffer,
                     ~createBuffer,
                     ~bindBuffer,
                     ~bufferData,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            (
              calledBefore(
                bindBuffer |> withTwoArgs(array_buffer, buffer),
                bufferData,
              ),
              calledAfter(
                bindBuffer |> withTwoArgs(array_buffer, Js.Nullable.null),
                bufferData,
              ),
            )
            |> expect == (true, true);
          });
        });

        describe("init texCoord buffer", () =>
          test("bufferData", () =>
            _prepareForBufferData(
              state,
              BoxGeometryTool.getBoxGeometryTexCoords,
            )
          )
        );

        describe("init index buffer", () => {
          describe("buffer data", () => {
            test("test indices16", () => {
              let (state, geometry) = _prepare(sandbox, state^);
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
              let indices = BoxGeometryTool.getBoxGeometryIndices(state);
              bufferData
              |> withThreeArgs(element_array_buffer, indices, static_draw)
              |> expect
              |> toCalledOnce;
            });
            test("test indices32", () => {
              let (state, geometry) = _prepare(sandbox, state^);
              let indices32 = Js.Typed_array.Uint32Array.make([|1, 2, 3|]);
              let state =
                GeometryAPI.setGeometryIndices32(geometry, indices32, state);
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

              bufferData
              |> withThreeArgs(element_array_buffer, indices32, static_draw)
              |> expect
              |> toCalledOnce;
            });
          });

          test("bind buffer and unbind buffer", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let element_array_buffer = 5;
            let buffer = Obj.magic(10);
            let createBuffer =
              createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
            let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~element_array_buffer,
                     ~createBuffer,
                     ~bindBuffer,
                     ~bufferData,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            (
              calledBefore(
                bindBuffer |> withTwoArgs(element_array_buffer, buffer),
                bufferData,
              ),
              calledAfter(
                bindBuffer
                |> withTwoArgs(element_array_buffer, Js.Nullable.null),
                bufferData |> withOneArg(element_array_buffer),
              ),
            )
            |> expect == (true, true);
          });
        });
      });
      describe("send buffer", () => {
        /* describe("optimize", () => {
             let _prepare = (sandbox, state) => {
               let (state, _, geometry, _, _) =
                 RenderBasicJobTool.prepareGameObject(sandbox, state);
               let (state, _, _, _) = CameraTool.createCameraGameObject(state);
               (state, geometry);
             };

             test("if lastSendGeometryData === geometryIndex, not send", () => {
               let (state, geometry) = _prepare(sandbox, state^);
               let (state, _, _, _, _) =
                 RenderBasicJobTool.prepareGameObjectWithSharedGeometry(
                   sandbox,
                   geometry,
                   state,
                 );
               let float = 1;
               let vertexAttribPointer =
                 createEmptyStubWithJsObjSandbox(sandbox);
               let state =
                 state
                 |> FakeGlTool.setFakeGl(
                      FakeGlTool.buildFakeGl(
                        ~sandbox,
                        ~float,
                        ~vertexAttribPointer,
                        (),
                      ),
                    );

               let state = state |> RenderJobsTool.init;
               let state = state |> DirectorTool.runWithDefaultTime;

               vertexAttribPointer |> getCallCount |> expect == 1;
             });
             test("else, send", () => {
               let (state, geometry) = _prepare(sandbox, state^);
               let (state, _, _, _, _) =
                 RenderBasicJobTool.prepareGameObject(sandbox, state);
               let float = 1;
               let vertexAttribPointer =
                 createEmptyStubWithJsObjSandbox(sandbox);
               let state =
                 state
                 |> FakeGlTool.setFakeGl(
                      FakeGlTool.buildFakeGl(
                        ~sandbox,
                        ~float,
                        ~vertexAttribPointer,
                        (),
                      ),
                    );

               let state = state |> RenderJobsTool.init;
               let state = state |> DirectorTool.runWithDefaultTime;

               vertexAttribPointer |> getCallCount |> expect == 2;
             });
           }); */

        describe("send a_position", () => {
          test("bind array buffer", () => {
            let state = _prepare(sandbox, state^);
            let array_buffer = 1;
            let buffer = Obj.magic(10);
            let createBuffer =
              createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
            let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~array_buffer,
                     ~createBuffer,
                     ~bindBuffer,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            bindBuffer |> expect |> toCalledWith([|array_buffer, buffer|]);
          });
          test("attach buffer to attribute", () => {
            let state = _prepare(sandbox, state^);
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
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
            |> expect
            |> toCalledWith([|pos, 3, float, Obj.magic(false), 0, 0|]);
          });
          describe("enable attribute", () => {
            test("if already enabled since use this program, not enable", () => {
              let state = _prepare(sandbox, state^);
              let float = 1;
              let enableVertexAttribArray =
                createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getAttribLocation =
                GLSLLocationTool.getAttribLocation(
                  ~pos,
                  sandbox,
                  "a_position",
                );
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~float,
                       ~enableVertexAttribArray,
                       ~getAttribLocation,
                       (),
                     ),
                   );

              let state = state |> RenderJobsTool.init;
              let state = state |> DirectorTool.runWithDefaultTime;
              let state = state |> DirectorTool.runWithDefaultTime;

              enableVertexAttribArray
              |> withOneArg(pos)
              |> getCallCount
              |> expect == 1;
            });
            test("else, enable", () => {
              let state = _prepare(sandbox, state^);
              let float = 1;
              let enableVertexAttribArray =
                createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getAttribLocation =
                GLSLLocationTool.getAttribLocation(
                  ~pos,
                  sandbox,
                  "a_position",
                );
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~float,
                       ~enableVertexAttribArray,
                       ~getAttribLocation,
                       (),
                     ),
                   );

              let state = state |> RenderJobsTool.init;
              let state = state |> DirectorTool.runWithDefaultTime;
              let state = state |> GLSLSenderTool.disableVertexAttribArray;

              let state = state |> DirectorTool.runWithDefaultTime;
              enableVertexAttribArray
              |> withOneArg(pos)
              |> getCallCount
              |> expect == 2;
            });
            /* test
               ("differenc shader's vertexAttribHistory of the same attribute record pos are independent",
               (
               () => {
                 TODO test switch program
               })
               );
               */
          });
        });
        describe("send a_texCoord", () =>
          test("attach buffer to attribute", () => {
            let state = _prepare(sandbox, state^);
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
            let pos = 0;
            let getAttribLocation =
              GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_texCoord");
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
            |> expect
            |> toCalledWith([|pos, 2, float, Obj.magic(false), 0, 0|]);
          })
        );
      });
    });
    describe("send uniform data", () => {
      let testSendShaderUniformMatrix4DataOnlyOnce =
          (name, prepareSendUinformDataFunc) =>
        RenderJobsTool.testSendShaderUniformMatrix4DataOnlyOnce(
          sandbox,
          name,
          (prepareSendUinformDataFunc, RenderBasicJobTool.prepareGameObject),
          state,
        );
      GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
        sandbox,
        "u_mMatrix",
        (gameObjectTransform, cameraTransform, _, state) => {
          let state =
            state
            |> TransformAPI.setTransformLocalPosition(
                 gameObjectTransform,
                 (1., 2., 3.),
               );
          state;
        },
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
        |]),
        ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
        ~testFunc=
          prepareSendUniformData => {
            test(
              "if not do any transform operation, should still send identity matrix value on the first send",
              () => {
                let (
                  state,
                  _,
                  (gameObjectTransform, _),
                  cameraTransform,
                  basicCameraView,
                ) =
                  prepareSendUniformData(
                    sandbox,
                    RenderBasicJobTool.prepareGameObject,
                    state^,
                  );
                let uniformMatrix4fv =
                  createEmptyStubWithJsObjSandbox(sandbox);
                let pos = 0;
                let getUniformLocation =
                  GLSLLocationTool.getUniformLocation(
                    ~pos,
                    sandbox,
                    "u_mMatrix",
                  );
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
                  state
                  |> RenderJobsTool.init
                  |> DirectorTool.runWithDefaultTime;
                uniformMatrix4fv
                |> expect
                |> toCalledWith([|
                     pos,
                     Obj.magic(false),
                     Obj.magic(
                       TransformTool.getDefaultLocalToWorldMatrixTypeArray(
                         state,
                       ),
                     ),
                   |]);
              },
            );
            describe("test two gameObjects", () =>
              test(
                "if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect",
                () => {
                  let (
                    state,
                    _,
                    (gameObjectTransform, _),
                    cameraTransform,
                    basicCameraView,
                  ) =
                    prepareSendUniformData(
                      sandbox,
                      RenderBasicJobTool.prepareGameObject,
                      state^,
                    );
                  let (state, gameObject2, _, _, _) =
                    RenderBasicJobTool.prepareGameObject(sandbox, state);
                  let state =
                    state
                    |> TransformAPI.setTransformLocalPosition(
                         gameObjectTransform,
                         (1., 2., 3.),
                       );
                  let uniformMatrix4fv =
                    createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(
                      ~pos,
                      sandbox,
                      "u_mMatrix",
                    );
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
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;

                  uniformMatrix4fv
                  |> withOneArg(pos)
                  |> getCall(1)
                  |> expect
                  |> toCalledWith([|
                       pos,
                       Obj.magic(false),
                       Obj.magic(
                         TransformTool.getDefaultLocalToWorldMatrixTypeArray(
                           state,
                         ),
                       ),
                     |]);
                },
              )
            );
          },
        (),
      );
      GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
        sandbox,
        "u_vMatrix",
        (gameObjectTransform, cameraTransform, _, state) =>
          state
          |> TransformAPI.setTransformLocalPosition(
               cameraTransform,
               (10., 2., 3.),
             ),
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
        |]),
        ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
        ~testFunc=
          prepareSendUniformData =>
            testSendShaderUniformMatrix4DataOnlyOnce(
              "u_vMatrix",
              prepareSendUniformData,
            ),
        (),
      );
      GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
        sandbox,
        "u_pMatrix",
        (gameObjectTransform, cameraTransform, basicCameraView, state) => state,
        PerspectiveCameraProjectionTool.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(),
        ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
        ~testFunc=
          prepareSendUniformData =>
            testSendShaderUniformMatrix4DataOnlyOnce(
              "u_pMatrix",
              prepareSendUniformData,
            ),
        (),
      );
      GLSLSenderTool.JudgeSendUniformData.testSendVector3(
        sandbox,
        "u_color",
        (
          _,
          (gameObjectTransform, material),
          (cameraTransform, basicCameraView),
          state,
        ) =>
          state
          |> BasicMaterialAPI.setBasicMaterialColor(
               material,
               [|0., 1., 0.2|],
             ),
        [0., 1., 0.20000000298023224],
        ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
        ~testFunc=
          prepareSendUniformData =>
            describe("test two gameObjects", () =>
              test(
                "if only set first one's color, second one's sended u_color record shouldn't be affect",
                () => {
                  let name = "u_color";
                  let (state, _, (_, material1), _, _) =
                    prepareSendUniformData(
                      sandbox,
                      RenderBasicJobTool.prepareGameObject,
                      state^,
                    );
                  let (state, gameObject2, _, material2, _) =
                    RenderBasicJobTool.prepareGameObject(sandbox, state);
                  let state =
                    state
                    |> BasicMaterialAPI.setBasicMaterialColor(
                         material1,
                         [|0., 1., 0.2|],
                       );
                  let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
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
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  let defaultData = [1., 1., 1.];

                  uniform3f
                  |> withOneArg(pos)
                  |> getCall(1)
                  |> getArgs
                  |> expect == [pos, ...defaultData |> Obj.magic];
                },
              )
            ),
        (),
      );

      describe("test with map", () =>
        describe("send u_mapSampler and u_color", () => {
          let _prepare = state => {
            let (state, gameObject, _, _, _, _) =
              RenderBasicJobTool.prepareGameObjectWithCreatedMap(
                sandbox,
                state,
              );
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
            let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
            let pos1 = 0;
            let pos2 = 1;
            let getUniformLocation =
              GLSLLocationTool.getUniformLocation(
                ~pos=pos1,
                sandbox,
                "u_mapSampler",
              );
            let getUniformLocation =
              GLSLLocationTool.stubLocation(
                getUniformLocation,
                pos2,
                sandbox,
                "u_color",
              );
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~uniform1i,
                     ~uniform3f,
                     ~getUniformLocation,
                     (),
                   ),
                 );
            (state, (pos1, pos2), (uniform1i, uniform3f));
          };
          test("if cached, not send", () => {
            let (state, (pos1, pos2), (uniform1i, uniform3f)) =
              _prepare(state^);

            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            let state = state |> DirectorTool.runWithDefaultTime;

            (
              uniform1i |> withTwoArgs(pos1, 0) |> getCallCount,
              uniform3f |> withOneArg(pos2) |> getCallCount,
            )
            |> expect == (1, 1);
          });
          test("else, send", () => {
            let (state, (pos1, pos2), (uniform1i, uniform3f)) =
              _prepare(state^);

            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

            (
              uniform1i |> withTwoArgs(pos1, 0) |> getCallCount,
              uniform3f |> withFourArgs(pos2, 1., 1., 1.) |> getCallCount,
            )
            |> expect == (1, 1);
          });
        })
      );
    });

    describe("bind map", () => {
      describe("test basic source texture", () => {
        test("if not has map, not bind", () => {
          let (state, gameObject, _, _, _) =
            RenderBasicJobTool.prepareGameObject(sandbox, state^);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          bindTexture |> expect |> not_ |> toCalled;
        });
        describe("else", () => {
          let _prepare = state => {
            let (state, gameObject, _, _, _, _) =
              RenderBasicJobTool.prepareGameObjectWithCreatedMap(
                sandbox,
                state,
              );
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            let textureUnit0 = 0;
            let texture2D = Obj.magic(8);
            let glTexture = Obj.magic(11);
            let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
            createTexture |> onCall(0) |> returns(glTexture);
            let activeTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~textureUnit0,
                     ~texture2D,
                     ~createTexture,
                     ~activeTexture,
                     ~bindTexture,
                     (),
                   ),
                 );
            (state, (texture2D, glTexture), (activeTexture, bindTexture));
          };
          test(
            "if texture of the specific unit is cached, not bind and active it again",
            () => {
            let (state, _, (activeTexture, _)) = _prepare(state^);
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            let state = state |> DirectorTool.runWithDefaultTime;
            activeTexture |> expect |> toCalledOnce;
          });
          describe("else", () => {
            test("active texture unit 0", () => {
              let (state, _, (activeTexture, _)) = _prepare(state^);
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              activeTexture |> expect |> toCalledWith([|0|]);
            });
            test("bind gl texture to TEXTURE_2D target", () => {
              let (state, (texture2D, glTexture), (_, bindTexture)) =
                _prepare(state^);
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              bindTexture |> expect |> toCalledWith([|texture2D, glTexture|]);
            });
          });
        });
      });
      describe("test arrayBufferView source texture", () => {
        let _prepare = state => {
          let (state, gameObject, _, material, _) =
            RenderBasicJobTool.prepareGameObject(sandbox, state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let texture2D = Obj.magic(8);
          let glTexture1 = Obj.magic(11);
          let glTexture2 = Obj.magic(12);
          let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
          createTexture |> onCall(0) |> returns(glTexture1);
          createTexture |> onCall(1) |> returns(glTexture2);
          let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~texture2D,
                   ~createTexture,
                   ~bindTexture,
                   (),
                 ),
               );
          (
            state,
            (texture2D, glTexture1, glTexture2),
            material,
            bindTexture,
          );
        };
        test("if has map, bind", () => {
          let (
            state,
            (texture2D, glTexture1, glTexture2),
            material,
            bindTexture,
          ) =
            _prepare(state^);
          let (state, map1) =
            ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
              state,
            );
          let state =
            state |> BasicMaterialAPI.setBasicMaterialMap(material, map1);
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          bindTexture |> expect |> toCalledOnce;
        });
        test(
          "if has basic source map and arrayBufferView source map, bind the latest setted map",
          () => {
            let (
              state,
              (texture2D, glTexture1, glTexture2),
              material,
              bindTexture,
            ) =
              _prepare(state^);
            let (state, map1) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let (state, map2) =
              ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                state,
              );
            let state =
              state |> BasicMaterialAPI.setBasicMaterialMap(material, map1);
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            let state =
              state |> BasicMaterialAPI.setBasicMaterialMap(material, map2);
            let state = state |> DirectorTool.runWithDefaultTime;
            (
              bindTexture |> getCallCount,
              SinonTool.calledWithArg2(
                bindTexture |> getCall(1),
                texture2D,
                glTexture2,
              ),
            )
            |> expect == (2, true);
          },
        );
      });
    });
    describe("update map", () => {
      describe("test basic source texture", () => {
        let _prepare = (~state, ~width=2, ~height=4, ()) => {
          let (state, gameObject, _, _, _, map) =
            RenderBasicJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          /* let source = Obj.magic({"width": width, "height": height}); */
          let source = BasicSourceTextureTool.buildSource(width, height);
          let state =
            state
            |> BasicSourceTextureAPI.setBasicSourceTextureSource(map, source);
          (state, map);
        };
        test("if is updated before, not update", () => {
          let (state, map) = _prepare(~state=state^, ());
          let unpackFlipYWebgl = Obj.magic(2);
          let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~unpackFlipYWebgl,
                   ~pixelStorei,
                   (),
                 ),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          let state = state |> DirectorTool.runWithDefaultTime;
          let state = state |> DirectorTool.runWithDefaultTime;
          pixelStorei
          |> withOneArg(unpackFlipYWebgl)
          |> expect
          |> toCalledOnce;
        });
        test("if source not exist, not update", () => {
          let (state, gameObject, _, _, _, map) =
            RenderBasicJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state^,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let unpackFlipYWebgl = Obj.magic(2);
          let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~unpackFlipYWebgl,
                   ~pixelStorei,
                   (),
                 ),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          pixelStorei
          |> withOneArg(unpackFlipYWebgl)
          |> expect
          |> not_
          |> toCalled;
        });
        test("set flipY", () => {
          let (state, map) = _prepare(~state=state^, ());
          let state =
            BasicSourceTextureAPI.setBasicSourceTextureFlipY(
              map,
              true,
              state,
            );
          let unpackFlipYWebgl = Obj.magic(2);
          let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~unpackFlipYWebgl,
                   ~pixelStorei,
                   (),
                 ),
               );

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          pixelStorei
          |> withTwoArgs(unpackFlipYWebgl, true)
          |> expect
          |> toCalledOnce;
        });
        test("set unpack_colorspace_conversion_webgl to be none", () => {
          let (state, map) = _prepare(~state=state^, ());
          let none = Obj.magic(2);
          let unpackColorspaceConversionWebgl = Obj.magic(3);
          let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~none,
                   ~unpackColorspaceConversionWebgl,
                   ~pixelStorei,
                   (),
                 ),
               );

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          pixelStorei
          |> withTwoArgs(unpackColorspaceConversionWebgl, none)
          |> expect
          |> toCalledOnce;
        });
        describe("set texture parameters", () => {
          describe("if source is power of two", () => {
            let _prepare = state => {
              let (state, map) = _prepare(~state, ~width=2, ~height=4, ());
              (state, map);
            };
            test("set wrap", () => {
              let (state, map) = _prepare(state^);
              let texture2D = Obj.magic(1);
              let textureWrapS = Obj.magic(2);
              let textureWrapT = Obj.magic(3);
              let clampToEdge = Obj.magic(4);
              let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~texture2D,
                       ~textureWrapS,
                       ~textureWrapT,
                       ~clampToEdge,
                       ~texParameteri,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              (
                texParameteri
                |> withThreeArgs(texture2D, textureWrapS, clampToEdge)
                |> getCallCount,
                texParameteri
                |> withThreeArgs(texture2D, textureWrapT, clampToEdge)
                |> getCallCount,
              )
              |> expect == (1, 1);
            });
            test("set filter", () => {
              let (state, map) = _prepare(state^);
              let texture2D = Obj.magic(1);
              let nearest = Obj.magic(2);
              let linear = Obj.magic(3);
              let textureMagFilter = Obj.magic(4);
              let textureMinFilter = Obj.magic(5);
              let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~texture2D,
                       ~nearest,
                       ~linear,
                       ~textureMagFilter,
                       ~textureMinFilter,
                       ~texParameteri,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              (
                texParameteri
                |> withThreeArgs(texture2D, textureMagFilter, linear)
                |> getCallCount,
                texParameteri
                |> withThreeArgs(texture2D, textureMinFilter, nearest)
                |> getCallCount,
              )
              |> expect == (1, 1);
            });
          });
          describe("else", () => {
            let _prepare = state => {
              let (state, map) = _prepare(~state, ~width=3, ~height=4, ());
              (state, map);
            };
            test("set wrap to Clamp_to_edge", () => {
              let (state, map) = _prepare(state^);
              let texture2D = Obj.magic(1);
              let textureWrapS = Obj.magic(2);
              let textureWrapT = Obj.magic(3);
              let clampToEdge = Obj.magic(4);
              let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~texture2D,
                       ~textureWrapS,
                       ~textureWrapT,
                       ~clampToEdge,
                       ~texParameteri,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              (
                texParameteri
                |> withThreeArgs(texture2D, textureWrapS, clampToEdge)
                |> getCallCount,
                texParameteri
                |> withThreeArgs(texture2D, textureWrapT, clampToEdge)
                |> getCallCount,
              )
              |> expect == (1, 1);
            });
            describe("set filter with fallback", () => {
              let _setFakeGl = (sandbox, state) => {
                let texture2D = Obj.magic(1);
                let nearest = Obj.magic(2);
                let linear = Obj.magic(3);
                let textureMagFilter = Obj.magic(4);
                let textureMinFilter = Obj.magic(5);
                let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~texture2D,
                         ~nearest,
                         ~linear,
                         ~textureMagFilter,
                         ~textureMinFilter,
                         ~texParameteri,
                         (),
                       ),
                     );
                (
                  state,
                  texture2D,
                  nearest,
                  linear,
                  textureMagFilter,
                  textureMinFilter,
                  texParameteri,
                );
              };
              test(
                "if filter === Nearest or NEAREST_MIPMAP_MEAREST or Nearest_mipmap_linear, set Nearest",
                () => {
                  let (state, map) = _prepare(state^);
                  let state =
                    state
                    |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
                         map,
                         BasicSourceTextureTool.getNearestMipmapLinear(),
                       )
                    |> BasicSourceTextureAPI.setBasicSourceTextureMinFilter(
                         map,
                         BasicSourceTextureTool.getNearest(),
                       );
                  let (
                    state,
                    texture2D,
                    nearest,
                    linear,
                    textureMagFilter,
                    textureMinFilter,
                    texParameteri,
                  ) =
                    _setFakeGl(sandbox, state);
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  (
                    texParameteri
                    |> withThreeArgs(texture2D, textureMagFilter, nearest)
                    |> getCallCount,
                    texParameteri
                    |> withThreeArgs(texture2D, textureMinFilter, nearest)
                    |> getCallCount,
                  )
                  |> expect == (1, 1);
                },
              );
              test("else, set Linear", () => {
                let (state, map) = _prepare(state^);
                let state =
                  state
                  |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
                       map,
                       BasicSourceTextureTool.getLinearMipmapNearest(),
                     )
                  |> BasicSourceTextureAPI.setBasicSourceTextureMinFilter(
                       map,
                       BasicSourceTextureTool.getLinear(),
                     );
                let (
                  state,
                  texture2D,
                  nearest,
                  linear,
                  textureMagFilter,
                  textureMinFilter,
                  texParameteri,
                ) =
                  _setFakeGl(sandbox, state);
                let state =
                  state
                  |> RenderJobsTool.init
                  |> DirectorTool.runWithDefaultTime;
                (
                  texParameteri
                  |> withThreeArgs(texture2D, textureMagFilter, linear)
                  |> getCallCount,
                  texParameteri
                  |> withThreeArgs(texture2D, textureMinFilter, linear)
                  |> getCallCount,
                )
                |> expect == (1, 1);
              });
            });
          });
        });
        describe("allocate source to texture", () =>
          describe("draw no mipmap twoD texture", () => {
            test("test draw", () => {
              let (state, map) = _prepare(~state=state^, ());
              let source =
                BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                  map,
                  state,
                );
              let texture2D = Obj.magic(1);
              let rgba = Obj.magic(2);
              let unsignedByte = Obj.magic(3);
              let texImage2D = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~texture2D,
                       ~rgba,
                       ~unsignedByte,
                       ~texImage2D,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              texImage2D
              |> expect
              |> toCalledWith([|
                   texture2D,
                   0,
                   rgba,
                   rgba,
                   unsignedByte,
                   source |> Obj.magic,
                 |]);
            });
            test("test different format,type", () => {
              let (state, map) = _prepare(~state=state^, ());
              let state =
                state
                |> BasicSourceTextureAPI.setBasicSourceTextureFormat(
                     map,
                     BasicSourceTextureTool.getAlpha(),
                   );
              let state =
                state
                |> BasicSourceTextureAPI.setBasicSourceTextureType(
                     map,
                     BasicSourceTextureTool.getUnsignedShort565(),
                   );
              let source =
                BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                  map,
                  state,
                );
              let texture2D = Obj.magic(1);
              let alpha = Obj.magic(2);
              let unsignedShort565 = Obj.magic(3);
              let texImage2D = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~texture2D,
                       ~alpha,
                       ~unsignedShort565,
                       ~texImage2D,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              texImage2D
              |> expect
              |> toCalledWith([|
                   texture2D,
                   0,
                   alpha,
                   alpha,
                   unsignedShort565,
                   source |> Obj.magic,
                 |]);
            });
          })
        );

        describe("generate mipmap", () => {
          let _exec = state => {
            let texture2D = Obj.magic(1);
            let generateMipmap = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~texture2D,
                     ~generateMipmap,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

            (state, texture2D, generateMipmap);
          };
          test("if filter is mipmap and is source power of two, generate", () => {
            let (state, map) =
              _prepare(~state=state^, ~width=2, ~height=4, ());
            let state =
              state
              |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
                   map,
                   BasicSourceTextureTool.getNearestMipmapNearest(),
                 );

            let (state, texture2D, generateMipmap) = _exec(state);

            generateMipmap |> expect |> toCalledWith([|texture2D|]);
          });

          describe("else, not generate", () => {
            test("test filter isn't mipmap", () => {
              let (state, map) =
                _prepare(~state=state^, ~width=2, ~height=4, ());
              let state =
                state
                |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
                     map,
                     BasicSourceTextureTool.getNearest(),
                   )
                |> BasicSourceTextureAPI.setBasicSourceTextureMinFilter(
                     map,
                     BasicSourceTextureTool.getNearest(),
                   );

              let (state, texture2D, generateMipmap) = _exec(state);

              generateMipmap |> expect |> not_ |> toCalled;
            });
            test("test source isn't power of two", () => {
              let (state, map) =
                _prepare(~state=state^, ~width=1, ~height=4, ());
              let state =
                state
                |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
                     map,
                     BasicSourceTextureTool.getLinearMipmapLinear(),
                   )
                |> BasicSourceTextureAPI.setBasicSourceTextureMinFilter(
                     map,
                     BasicSourceTextureTool.getNearest(),
                   );

              let (state, texture2D, generateMipmap) = _exec(state);

              generateMipmap |> expect |> not_ |> toCalled;
            });
          });
        });
      });
      describe("test arrayBufferView source texture", () => {
        let _prepare = (~state, ~width=2, ~height=4, ()) => {
          let source = ArrayBufferViewSourceTextureTool.buildSource();
          let (state, map) =
            ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
              state,
            );
          let state =
            ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWidth(
              map,
              width,
              state,
            );
          let state =
            ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureHeight(
              map,
              height,
              state,
            );
          let state =
            state
            |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(
                 map,
                 source,
               );
          let (state, gameObject, _, _, _, map) =
            RenderBasicJobTool.prepareGameObjectWithMap(sandbox, map, state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, map);
        };

        describe("set texture parameters", () =>
          describe("if source isn't power of two", () => {
            let _prepare = state => {
              let (state, map) = _prepare(~state, ~width=3, ~height=4, ());
              (state, map);
            };

            test("set wrap to Clamp_to_edge", () => {
              let (state, map) = _prepare(state^);
              let texture2D = Obj.magic(1);
              let textureWrapS = Obj.magic(2);
              let textureWrapT = Obj.magic(3);
              let clampToEdge = Obj.magic(4);
              let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~texture2D,
                       ~textureWrapS,
                       ~textureWrapT,
                       ~clampToEdge,
                       ~texParameteri,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              (
                texParameteri
                |> withThreeArgs(texture2D, textureWrapS, clampToEdge)
                |> getCallCount,
                texParameteri
                |> withThreeArgs(texture2D, textureWrapT, clampToEdge)
                |> getCallCount,
              )
              |> expect == (1, 1);
            });
          })
        );

        describe("allocate source to texture", () =>
          describe("draw no mipmap twoD texture", () => {
            describe("contract check", () => {
              let _test = (width, height, state) => {
                let (state, map) = _prepare(~state, ~width, ~height, ());
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                expect(() => {
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  ();
                })
                |> toThrowMessage("expect width/height shouldn't be 0");
              };
              test("width shouldn't be 0", () =>
                _test(0, 20, state^)
              );
              test("height shouldn't be 0", () =>
                _test(20, 0, state^)
              );
            });
            test("test draw", () => {
              let width = 10;
              let height = 20;
              let (state, map) =
                _prepare(~state=state^, ~width, ~height, ());
              let source =
                ArrayBufferViewSourceTextureAPI.unsafeGetArrayBufferViewSourceTextureSource(
                  map,
                  state,
                );
              let texture2D = Obj.magic(1);
              let rgba = Obj.magic(2);
              let unsignedByte = Obj.magic(3);
              let texImage2D = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~texture2D,
                       ~rgba,
                       ~unsignedByte,
                       ~texImage2D,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              texImage2D
              |> expect
              |> toCalledWith([|
                   texture2D,
                   0,
                   rgba,
                   width,
                   height,
                   0,
                   rgba,
                   unsignedByte,
                   source |> Obj.magic,
                 |]);
            });
          })
        );

        describe("generate mipmap", () => {
          let _exec = state => {
            let texture2D = Obj.magic(1);
            let generateMipmap = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~texture2D,
                     ~generateMipmap,
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

            (state, texture2D, generateMipmap);
          };
          test("if filter is mipmap and is source power of two, generate", () => {
            let (state, map) =
              _prepare(~state=state^, ~width=2, ~height=4, ());
            let state =
              state
              |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureMagFilter(
                   map,
                   SourceTextureTool.getNearestMipmapNearest(),
                 );

            let (state, texture2D, generateMipmap) = _exec(state);

            generateMipmap |> expect |> toCalledWith([|texture2D|]);
          });

          describe("else, not generate", () => {
            test("test filter isn't mipmap", () => {
              let (state, map) =
                _prepare(~state=state^, ~width=2, ~height=4, ());
              let state =
                state
                |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureMagFilter(
                     map,
                     SourceTextureTool.getNearest(),
                   )
                |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureMinFilter(
                     map,
                     SourceTextureTool.getNearest(),
                   );

              let (state, texture2D, generateMipmap) = _exec(state);

              generateMipmap |> expect |> not_ |> toCalled;
            });
            test("test source isn't power of two", () => {
              let (state, map) =
                _prepare(~state=state^, ~width=1, ~height=4, ());
              let state =
                state
                |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureMagFilter(
                     map,
                     SourceTextureTool.getLinearMipmapLinear(),
                   )
                |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureMinFilter(
                     map,
                     SourceTextureTool.getNearest(),
                   );

              let (state, texture2D, generateMipmap) = _exec(state);

              generateMipmap |> expect |> not_ |> toCalled;
            });
          });
        });
      });
    });

    describe("test set map at runtime which has no map before", () =>
      test("replace material component", () => {
        let (state, gameObject1, _, material1, _) =
          RenderBasicJobTool.prepareGameObject(sandbox, state^);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
        let pos = 0;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mapSampler");
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~uniform1i,
                 ~getUniformLocation,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        let state =
          GameObjectAPI.disposeGameObjectBasicMaterialComponent(
            gameObject1,
            material1,
            state,
          );
        let (state, material2, _) =
          BasicMaterialTool.createMaterialWithMap(state);
        let state =
          GameObjectAPI.addGameObjectBasicMaterialComponent(
            gameObject1,
            material2,
            state,
          );
        let state = GameObjectAPI.initGameObject(gameObject1, state);
        let state = state |> DirectorTool.runWithDefaultTime;

        uniform1i |> withTwoArgs(pos, 0) |> expect |> toCalledOnce;
      })
    );

    describe("test remove map at runtime which has map before", () =>
      test("replace material component", () => {
        let (state, gameObject1, _, material1, _, _) =
          RenderBasicJobTool.prepareGameObjectWithCreatedMap(sandbox, state^);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
        let pos = 0;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mapSampler");
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~uniform1i,
                 ~getUniformLocation,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        let state =
          GameObjectAPI.disposeGameObjectBasicMaterialComponent(
            gameObject1,
            material1,
            state,
          );
        let (state, material2) = BasicMaterialAPI.createBasicMaterial(state);
        let state =
          GameObjectAPI.addGameObjectBasicMaterialComponent(
            gameObject1,
            material2,
            state,
          );
        let state = GameObjectAPI.initGameObject(gameObject1, state);
        let state = GLSLSenderTool.clearInitShaderCache(state);
        let state = state |> DirectorTool.runWithDefaultTime;

        uniform1i |> withOneArg(pos) |> expect |> toCalledOnce;
      })
    );

    describe("optimize", () =>
      test(
        "if lastSendMaterialData === shaderIndex, not bind and not update", () => {
        let (state, gameObject1, _, material1, _, map1) =
          RenderBasicJobTool.prepareGameObjectWithCreatedMap(sandbox, state^);
        let (state, gameObject2, _, material2, _) =
          RenderBasicJobTool.prepareGameObjectWithSharedMaterial(
            sandbox,
            material1,
            state,
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let source1 = BasicSourceTextureTool.buildSource(10, 20);
        let state =
          state
          |> BasicSourceTextureAPI.setBasicSourceTextureSource(map1, source1);
        let unpackFlipYWebgl = Obj.magic(2);
        let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
        let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~unpackFlipYWebgl,
                 ~pixelStorei,
                 ~bindTexture,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
        (
          pixelStorei |> withOneArg(unpackFlipYWebgl) |> getCallCount,
          bindTexture |> getCallCount,
        )
        |> expect == (1, 1);
      })
    );

    describe("draw", () =>
      describe(
        "if geometry has index buffer, bind index buffer and drawElements", () => {
        let _prepareForDrawElements = (sandbox, state) =>
          RenderBasicJobTool.prepareForDrawElements(sandbox, state);

        describe("bind index buffer", () => {
          let _prepareForElementArrayBuffer = state => {
            let element_array_buffer = 1;
            let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
            let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~element_array_buffer,
                     ~bindBuffer,
                     ~drawElements,
                     (),
                   ),
                 );
            let state = state |> RenderJobsTool.init;
            (state, bindBuffer, element_array_buffer);
          };
          ();
          /* describe("optimize", () => {
               test("if lastSendGeometryData === geometryIndex, not bind", () => {
                 let (state, _, geometry, _, _) =
                   RenderBasicJobTool.prepareGameObject(sandbox, state^);
                 let (state, _, _, _) =
                   CameraTool.createCameraGameObject(state);
                 let (state, _, _, _, _) =
                   RenderBasicJobTool.prepareGameObjectWithSharedGeometry(
                     sandbox,
                     geometry,
                     state,
                   );
                 let (state, bindBuffer, element_array_buffer) =
                   _prepareForElementArrayBuffer(state);
                 let state = state |> DirectorTool.runWithDefaultTime;
                 bindBuffer
                 |> withOneArg(element_array_buffer)
                 |> getCallCount
                 |> expect == 3;
               });
               test("else, bind", () => {
                 let (state, _, geometry, _, _) =
                   RenderBasicJobTool.prepareGameObject(sandbox, state^);
                 let (state, _, _, _) =
                   CameraTool.createCameraGameObject(state);
                 let (state, _, _, _, _) =
                   RenderBasicJobTool.prepareGameObject(sandbox, state);
                 let (state, bindBuffer, element_array_buffer) =
                   _prepareForElementArrayBuffer(state);
                 let state = state |> DirectorTool.runWithDefaultTime;
                 bindBuffer
                 |> withOneArg(element_array_buffer)
                 |> getCallCount
                 |> expect == 3
                 * 2;
               });
             }); */
        });

        describe("drawElements", () => {
          test("test drawMode", () => {
            let (state, geometry, meshRenderer) =
              _prepareForDrawElements(sandbox, state^);
            let state =
              MeshRendererAPI.setMeshRendererDrawMode(
                meshRenderer,
                MeshRendererTool.getLines(),
                state,
              );
            let lines = 1;
            let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~lines,
                     ~drawElements,
                     (),
                   ),
                 );
            let state = state |> RenderJobsTool.init;
            let state = state |> DirectorTool.runWithDefaultTime;
            drawElements |> withOneArg(lines) |> expect |> toCalledOnce;
          });

          describe("test draw indices", () => {
            test("test indices16", () => {
              let (state, geometry, meshRenderer) =
                _prepareForDrawElements(sandbox, state^);
              let triangles = 1;
              let unsigned_short = 2;
              let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~triangles,
                       ~drawElements,
                       ~unsigned_short,
                       (),
                     ),
                   );

              let state = state |> RenderJobsTool.init;
              let state = state |> DirectorTool.runWithDefaultTime;

              drawElements
              |> withFourArgs(
                   triangles,
                   GeometryTool.getIndicesCount(
                     geometry,
                     CreateRenderStateMainService.createRenderState(state),
                   ),
                   unsigned_short,
                   GeometryTool.getIndexTypeSize(
                     CreateRenderStateMainService.createRenderState(state),
                   )
                   * 0,
                 )
              |> expect
              |> toCalledOnce;
            });
            test("test indices32", () => {
              let (state, geometry, meshRenderer) =
                _prepareForDrawElements(sandbox, state^);
              let state =
                GeometryAPI.setGeometryIndices32(
                  geometry,
                  Js.Typed_array.Uint32Array.make([|1, 2, 3|]),
                  state,
                );
              let triangles = 1;
              let unsigned_int = 2;
              let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~triangles,
                       ~drawElements,
                       ~unsigned_int,
                       (),
                     ),
                   );

              let state = state |> RenderJobsTool.init;
              let state = state |> DirectorTool.runWithDefaultTime;

              drawElements
              |> withFourArgs(
                   triangles,
                   GeometryTool.getIndicesCount(
                     geometry,
                     CreateRenderStateMainService.createRenderState(state),
                   ),
                   unsigned_int,
                   Js.Typed_array.Uint32Array._BYTES_PER_ELEMENT * 0,
                 )
              |> expect
              |> toCalledOnce;
            });
          });
        });
        /* describe(
             "fix bug",
             () => {
               let _prepareTwoForDrawElements = (sandbox, state) => {
                 let (state, _, geometry1, _, _) =
                   RenderBasicJobTool.prepareGameObject(sandbox, state);
                 let (state, _, geometry2, _, _) =
                   RenderBasicJobTool.prepareGameObject(sandbox, state);
                 let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                 (state, geometry1, geometry2)
               };
               TODO use diferent geometry which have different indices count!
               test(
                 "different gameObject(with the same material, different geometry) should drawElements with different geometry record",
                 () => {
                   let (state, geometry1, geometry2) = _prepareTwoForDrawElements(sandbox, state^);
                   let triangles = 1;
                   let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
                   let state =
                     state
                     |> FakeGlTool.setFakeGl(
                          FakeGlTool.buildFakeGl(~sandbox, ~triangles, ~drawElements, ())
                        );
                   let state = state |> RenderJobsTool.init;
                   let state = state |> DirectorTool.runWithDefaultTime;
                   (
                     drawElements
                   |> withFourArgs(
                        triangles,
                        GeometryTool.getIndicesCount(geometry1, state),
                                           GeometryTool.getIndexType( CreateRenderStateMainService.createRenderState(state)),
                        GeometryTool.getIndexTypeSize(CreateRenderStateMainService.createRenderState(state)) * 0
                      )
                      |> getCallCount,
                     drawElements
                   |> withFourArgs(
                        triangles,
                        GeometryTool.getIndicesCount(geometry2, state),
                                           GeometryTool.getIndexType( CreateRenderStateMainService.createRenderState(state)),
                        GeometryTool.getIndexTypeSize(CreateRenderStateMainService.createRenderState(state)) * 0
                      )
                      |> getCallCount
                   ) |> expect == (1, 1)
                 }
               )
             }
           ) */
      })
    );

    describe("if has no camera gameObject, not render", () => {
      let _prepareGl = state => {
        let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~drawElements, ()),
             );

        (state, drawElements);
      };

      test("test", () => {
        let (state, _, _, _, _) =
          RenderBasicJobTool.prepareGameObject(sandbox, state^);

        let (state, drawElements) = _prepareGl(state);
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        drawElements |> expect |> not_ |> toCalled;
      });
    });

    describe("fix bug", () => {
      let _createGameObjectHasNoGeometry = (sandbox, state) => {
        open GameObjectAPI;
        open BasicMaterialAPI;
        open MeshRendererAPI;
        open Sinon;
        let (state, material) = createBasicMaterial(state);
        let (state, meshRenderer) = createMeshRenderer(state);
        let (state, gameObject) = state |> createGameObject;
        let state =
          state
          |> addGameObjectBasicMaterialComponent(gameObject, material)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        (state, gameObject);
      };

      let _prepareGameObjectHasNoGeometry = (sandbox, state) => {
        open GameObjectAPI;
        open BasicMaterialAPI;
        open MeshRendererAPI;
        open Sinon;
        let (state, _) = _createGameObjectHasNoGeometry(sandbox, state);

        let (state, _, _, _) = CameraTool.createCameraGameObject(state);

        state;
      };

      let _prepareGl = state => {
        let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
        let pos = 0;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_color");
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

        (state, pos, uniform3f);
      };

      describe("if gameObject has no geometry component, not render", () => {
        test("test one gameObject", () => {
          let state = _prepareGameObjectHasNoGeometry(sandbox, state^);
          let (state, pos, uniform3f) = _prepareGl(state);
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          uniform3f |> withOneArg(pos) |> expect |> not_ |> toCalled;
        });
        test(
          "should still render other gameObjects has geometry component", () => {
          let state = _prepareGameObjectHasNoGeometry(sandbox, state^);
          let (state, gameObject2, geometry2, material2, meshRenderer2) =
            RenderBasicJobTool.prepareGameObject(sandbox, state);
          let state =
            state
            |> BasicMaterialAPI.setBasicMaterialColor(
                 material2,
                 [|1., 0., 0.|],
               );
          let (state, pos, uniform3f) = _prepareGl(state);

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          (
            uniform3f |> withOneArg(pos) |> getCallCount,
            uniform3f |> withFourArgs(pos, 1., 0., 0.) |> getCallCount,
          )
          |> expect == (1, 1);
        });
      });

      describe(
        {|remove old renderGroup;
          add new renderGroup;

          test send u_color
      |},
        () =>
        test("test if cached, only send once", () => {
          let (state, gameObject1, geometry1, material1, meshRenderer1) =
            RenderBasicJobTool.prepareGameObject(sandbox, state^);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let (state, pos, uniform3f) = _prepareGl(state);
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          let state =
            RenderGroupAPI.disposeGameObjectRenderGroupComponents(
              gameObject1,
              {meshRenderer: meshRenderer1, material: material1},
              (
                GameObjectAPI.disposeGameObjectMeshRendererComponent,
                GameObjectAPI.disposeGameObjectBasicMaterialComponent,
              ),
              state,
            );
          let state = state |> DirectorTool.runWithDefaultTime;
          let (state, renderGroup2) =
            RenderGroupAPI.createRenderGroup(
              (
                MeshRendererAPI.createMeshRenderer,
                BasicMaterialAPI.createBasicMaterial,
              ),
              state,
            );
          let state =
            RenderGroupAPI.addGameObjectRenderGroupComponents(
              gameObject1,
              renderGroup2,
              (
                GameObjectAPI.addGameObjectMeshRendererComponent,
                GameObjectAPI.addGameObjectBasicMaterialComponent,
              ),
              state,
            );
          let state = GameObjectAPI.initGameObject(gameObject1, state);
          let state = state |> DirectorTool.runWithDefaultTime;

          uniform3f |> withOneArg(pos) |> expect |> toCalledOnce;
        })
      );
    });
    /* TODO test
       test
       ("if gameObject not has indices, contract error",
       (
       () => {

       })
       ); */
  });