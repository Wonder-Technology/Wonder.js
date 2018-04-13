open Wonder_jest;

let _ =
  describe(
    "test render basic job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfig(sandbox, LoopRenderJobTool.buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          let _prepareForUseProgram = (sandbox, state) =>
            RenderJobsTool.prepareForUseProgram(sandbox, _prepare, state);
          test(
            "test",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              let state =
                state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
              useProgram |> expect |> toCalledWith([|program|])
            }
          );
          test(
            "if the program is already used, not use again",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.initSystemAndRender;
              let state = state |> DirectorTool.runWithDefaultTime;
              let state = state |> DirectorTool.runWithDefaultTime;
              useProgram |> getCallCount |> expect == 1
            }
          )
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
                     let state = state |> RenderJobsTool.initSystemAndRender;
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
                     let state = state |> RenderJobsTool.initSystemAndRender;
                     let state = state |> DirectorTool.runWithDefaultTime;
                     let state = state |> DirectorTool.runWithDefaultTime;
                     disableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 0
                   }
                 )
               }
             ) */
        }
      );
      describe(
        "send attribute data",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          describe(
            "init vbo buffers when first send",
            () => {
              let _prepare = (sandbox, state) => {
                let (state, gameObject, geometry, _, _) =
                  RenderBasicJobTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                (state, geometry)
              };
              test(
                "create buffer",
                () => {
                  let (state, _) = _prepare(sandbox, state^);
                  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
                  let state =
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  getCallCount(createBuffer) |> expect == 2
                }
              );
              describe(
                "init vertex buffer",
                () => {
                  test(
                    "bufferData",
                    () => {
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
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      let vertices = BoxGeometryAPI.getBoxGeometryVertices( state);
                      bufferData
                      |> withThreeArgs(array_buffer, vertices, static_draw)
                      |> expect
                      |> toCalledOnce
                    }
                  );
                  test(
                    "bind buffer and unbind buffer",
                    () => {
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
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      (
                        calledBefore(bindBuffer |> withTwoArgs(array_buffer, buffer), bufferData),
                        calledAfter(
                          bindBuffer |> withTwoArgs(array_buffer, Js.Nullable.null),
                          bufferData
                        )
                      )
                      |> expect == (true, true)
                    }
                  )
                }
              );
              describe(
                "init index buffer",
                () => {
                  test(
                    "bufferData",
                    () => {
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
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      let indices = BoxGeometryAPI.getBoxGeometryIndices( state);
                      bufferData
                      |> withThreeArgs(element_array_buffer, indices, static_draw)
                      |> expect
                      |> toCalledOnce
                    }
                  );
                  test(
                    "bind buffer and unbind buffer",
                    () => {
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
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      (
                        calledBefore(
                          bindBuffer |> withTwoArgs(element_array_buffer, buffer),
                          bufferData
                        ),
                        calledAfter(
                          bindBuffer |> withTwoArgs(element_array_buffer, Js.Nullable.null),
                          bufferData |> withOneArg(element_array_buffer)
                        )
                      )
                      |> expect == (true, true)
                    }
                  )
                }
              )
            }
          );
          describe(
            "send buffer",
            () => {
              describe(
                "optimize",
                () => {
                  let _prepare = (sandbox, state) => {
                    let (state, _, geometry, _, _) =
                      RenderBasicJobTool.prepareGameObject(sandbox, state);
                    let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                    (state, geometry)
                  };
                  test(
                    "if lastSendGeometry === geometryIndex, not send",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let (state, _, _, _, _) =
                        RenderBasicJobTool.prepareGameObjectWithSharedGeometry(
                          sandbox,
                          geometry,
                          state
                        );
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender;
                      let state = state |> DirectorTool.runWithDefaultTime;
                      vertexAttribPointer |> getCallCount |> expect == 1 * 1
                    }
                  );
                  test(
                    "else, send",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let (state, _, _, _, _) =
                        RenderBasicJobTool.prepareGameObject(sandbox, state);
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender;
                      let state = state |> DirectorTool.runWithDefaultTime;
                      vertexAttribPointer |> getCallCount |> expect == 2
                    }
                  )
                }
              );
              describe(
                "send a_position",
                () => {
                  test(
                    "bind array buffer",
                    () => {
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
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      bindBuffer |> expect |> toCalledWith([|array_buffer, buffer|])
                    }
                  );
                  test(
                    "attach buffer to attribute",
                    () => {
                      let state = _prepare(sandbox, state^);
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
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      vertexAttribPointer
                      |> expect
                      |> toCalledWith([|pos, 3, float, Obj.magic(Js.false_), 0, 0|])
                    }
                  );
                  describe(
                    "enable attribute",
                    () => {
                      test(
                        "if already enabled since use this program, not enable",
                        () => {
                          let state = _prepare(sandbox, state^);
                          let float = 1;
                          let enableVertexAttribArray = createEmptyStubWithJsObjSandbox(sandbox);
                          let pos = 0;
                          let getAttribLocation =
                            GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(
                                   ~sandbox,
                                   ~float,
                                   ~enableVertexAttribArray,
                                   ~getAttribLocation,
                                   ()
                                 )
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          enableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 1
                        }
                      );
                      test(
                        "else, enable",
                        () => {
                          let state = _prepare(sandbox, state^);
                          let float = 1;
                          let enableVertexAttribArray = createEmptyStubWithJsObjSandbox(sandbox);
                          let pos = 0;
                          let getAttribLocation =
                            GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(
                                   ~sandbox,
                                   ~float,
                                   ~enableVertexAttribArray,
                                   ~getAttribLocation,
                                   ()
                                 )
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          let state =
                            state
                            |> GLSLSenderTool.disableVertexAttribArray
                            |> GLSLSenderTool.clearLastSendGeometry;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          enableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 2
                        }
                      )
                      /* test
                         ("differenc shader's vertexAttribHistory of the same attribute record pos are independent",
                         (
                         () => {
                           TODO test switch program
                         })
                         );
                         */
                    }
                  )
                }
              )
            }
          )
        }
      );
      describe(
        "send uniform data",
        () => {
          let testSendShaderUniformMatrix4DataOnlyOnce = (name, prepareSendUinformDataFunc) =>
            RenderJobsTool.testSendShaderUniformMatrix4DataOnlyOnce(
              sandbox,
              name,
              (prepareSendUinformDataFunc, RenderBasicJobTool.prepareGameObject),
              state
            );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_mMatrix",
            (gameObjectTransform, cameraTransform, _, state) => {
              let state =
                state |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
              state
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
              1.
            |]),
            ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
            ~testFunc=
              (_prepareSendUinformData) => {
                test(
                  "if not do any transform operation, should still send identity matrix value on the first send",
                  () => {
                    let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                      _prepareSendUinformData(
                        sandbox,
                        RenderBasicJobTool.prepareGameObject,
                        state^
                      );
                    let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 0;
                    let getUniformLocation =
                      GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
                    let state =
                      state
                      |> FakeGlTool.setFakeGl(
                           FakeGlTool.buildFakeGl(
                             ~sandbox,
                             ~uniformMatrix4fv,
                             ~getUniformLocation,
                             ()
                           )
                         );
                    let state =
                      state
                      |> RenderJobsTool.initSystemAndRender
                      |> DirectorTool.runWithDefaultTime;
                    uniformMatrix4fv
                    |> expect
                    |> toCalledWith([|
                         pos,
                         Obj.magic(Js.false_),
                         Obj.magic(TransformTool.getDefaultLocalToWorldMatrixTypeArray(state))
                       |])
                  }
                );
                describe(
                  "test two gameObjects",
                  () =>
                    test(
                      "if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect",
                      () => {
                        let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                          _prepareSendUinformData(
                            sandbox,
                            RenderBasicJobTool.prepareGameObject,
                            state^
                          );
                        let (state, gameObject2, _, _, _) =
                          RenderBasicJobTool.prepareGameObject(sandbox, state);
                        let state =
                          state
                          |> TransformAPI.setTransformLocalPosition(
                               gameObjectTransform,
                               (1., 2., 3.)
                             );
                        let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                        let pos = 0;
                        let getUniformLocation =
                          GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
                        let state =
                          state
                          |> FakeGlTool.setFakeGl(
                               FakeGlTool.buildFakeGl(
                                 ~sandbox,
                                 ~uniformMatrix4fv,
                                 ~getUniformLocation,
                                 ()
                               )
                             );
                        let state =
                          state
                          |> RenderJobsTool.initSystemAndRender
                          |> DirectorTool.runWithDefaultTime;
                        uniformMatrix4fv
                        |> withOneArg(pos)
                        |> getCall(1)
                        |> expect
                        |> toCalledWith([|
                             pos,
                             Obj.magic(Js.false_),
                             Obj.magic(TransformTool.getDefaultLocalToWorldMatrixTypeArray(state))
                           |])
                      }
                    )
                )
              },
            ()
          );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_vMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> TransformAPI.setTransformLocalPosition(cameraTransform, (10., 2., 3.)),
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
              1.
            |]),
            ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
            ~testFunc=
              (_prepareSendUinformData) =>
                testSendShaderUniformMatrix4DataOnlyOnce("u_vMatrix", _prepareSendUinformData),
            ()
          );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_pMatrix",
            (gameObjectTransform, cameraTransform, basicCameraView, state) => state,
            PerspectiveCameraProjectionTool.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(),
            ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
            ~testFunc=
              (_prepareSendUinformData) =>
                testSendShaderUniformMatrix4DataOnlyOnce("u_pMatrix", _prepareSendUinformData),
            ()
          );
          GLSLSenderTool.JudgeSendUniformData.testSendVector3(
            sandbox,
            "u_color",
            (_, (gameObjectTransform, material), (cameraTransform, basicCameraView), state) =>
              state |> BasicMaterialAPI.setBasicMaterialColor(material, [|0., 1., 0.2|]),
            [0., 1., 0.20000000298023224],
            ~prepareGameObjectFunc=RenderBasicJobTool.prepareGameObject,
            ~testFunc=
              (_prepareSendUinformData) =>
                describe(
                  "test two gameObjects",
                  () =>
                    test(
                      "if only set first one's color, second one's sended u_color record shouldn't be affect",
                      () => {
                        let name = "u_color";
                        let (state, _, (_, material1), _, _) =
                          _prepareSendUinformData(
                            sandbox,
                            RenderBasicJobTool.prepareGameObject,
                            state^
                          );
                        let (state, gameObject2, _, material2, _) =
                          RenderBasicJobTool.prepareGameObject(sandbox, state);
                        let state =
                          state
                          |> BasicMaterialAPI.setBasicMaterialColor(material1, [|0., 1., 0.2|]);
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
                                 ()
                               )
                             );
                        let state =
                          state
                          |> RenderJobsTool.initSystemAndRender
                          |> DirectorTool.runWithDefaultTime;
                        let defaultData = [1., 1., 1.];
                        uniform3f
                        |> withOneArg(pos)
                        |> getCall(1)
                        |> getArgs
                        |> expect == [pos, ...defaultData |> Obj.magic]
                      }
                    )
                ),
            ()
          )
        }
      );
      describe(
        "draw",
        () =>
          describe(
            "if geometry has index buffer, bind index buffer and drawElements",
            () => {
              let _prepareForDrawElements = (sandbox, state) => {
                let (state, _, geometry, _, _) =
                  RenderBasicJobTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                (state, geometry)
              };
              describe(
                "bind index buffer",
                () => {
                  let _prepareForElementArrayBuffer = (state) => {
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
                             ()
                           )
                         );
                    let state = state |> RenderJobsTool.initSystemAndRender;
                    (state, bindBuffer, element_array_buffer)
                  };
                  describe(
                    "optimize",
                    () => {
                      test(
                        "if lastSendGeometry === geometryIndex, not bind",
                        () => {
                          let (state, _, geometry, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state^);
                          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                          let (state, _, _, _, _) =
                            RenderBasicJobTool.prepareGameObjectWithSharedGeometry(
                              sandbox,
                              geometry,
                              state
                            );
                          let (state, bindBuffer, element_array_buffer) =
                            _prepareForElementArrayBuffer(state);
                          let state = state |> DirectorTool.runWithDefaultTime;
                          bindBuffer
                          |> withOneArg(element_array_buffer)
                          |> getCallCount
                          |> expect == 3
                        }
                      );
                      test(
                        "else, bind",
                        () => {
                          let (state, _, geometry, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state^);
                          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                          let (state, _, _, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state);
                          let (state, bindBuffer, element_array_buffer) =
                            _prepareForElementArrayBuffer(state);
                          let state = state |> DirectorTool.runWithDefaultTime;
                          bindBuffer
                          |> withOneArg(element_array_buffer)
                          |> getCallCount
                          |> expect == 3
                          * 2
                        }
                      )
                    }
                  )
                }
              );
              test(
                "drawElements",
                () => {
                  let (state, geometry) = _prepareForDrawElements(sandbox, state^);
                  let triangles = 1;
                  let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~triangles, ~drawElements, ())
                       );
                  let state = state |> RenderJobsTool.initSystemAndRender;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  drawElements
                  |> withFourArgs(
                       triangles,
                       BoxGeometryTool.getIndicesCount(
                         geometry,
                         CreateRenderStateMainService.createRenderState(state)
                       ),
                       GeometryTool.getIndexType(
                         CreateRenderStateMainService.createRenderState(state)
                       ),
                       GeometryTool.getIndexTypeSize(
                         CreateRenderStateMainService.createRenderState(state)
                       )
                       * 0
                     )
                  |> expect
                  |> toCalledOnce
                }
              )
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
                         let state = state |> RenderJobsTool.initSystemAndRender;
                         let state = state |> DirectorTool.runWithDefaultTime;
                         (
                           drawElements
                         |> withFourArgs(
                              triangles,
                              BoxGeometryTool.getIndicesCount(geometry1, state),
                                                 GeometryTool.getIndexType( CreateRenderStateMainService.createRenderState(state)),
                              GeometryTool.getIndexTypeSize(CreateRenderStateMainService.createRenderState(state)) * 0
                            )
                            |> getCallCount,
                           drawElements
                         |> withFourArgs(
                              triangles,
                              BoxGeometryTool.getIndicesCount(geometry2, state),
                                                 GeometryTool.getIndexType( CreateRenderStateMainService.createRenderState(state)),
                              GeometryTool.getIndexTypeSize(CreateRenderStateMainService.createRenderState(state)) * 0
                            )
                            |> getCallCount
                         ) |> expect == (1, 1)
                       }
                     )
                   }
                 ) */
            }
          )
      )
      /* TODO test
         test
         ("if gameObject not has indices, contract error",
         (
         () => {

         })
         ); */
    }
  );