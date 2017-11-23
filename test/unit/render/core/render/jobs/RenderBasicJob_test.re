open Wonder_jest;

let _ =
  describe(
    "test render_basic job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      let _prepare = (sandbox, state) => {
        let (state, _, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
        let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
        state
      };
      let _render = (state: StateDataType.state) => state |> WebGLRenderTool.render;
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithRenderConfig()
        }
      );
      describe(
        "use program",
        () => {
          let _prepareForUseProgram = (sandbox, state) => {
            let state = _prepare(sandbox, state);
            let program = Obj.magic(1);
            let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> returns(program);
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
                 );
            (state, program, useProgram)
          };
          test(
            "test",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.initSystemAndRender |> _render;
              useProgram |> expect |> toCalledWith([program])
            }
          );
          test(
            "if the program is already used, not use again",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.initSystemAndRender;
              let state = state |> _render;
              let state = state |> _render;
              useProgram |> getCallCount |> expect == 1
            }
          );
          /* test
             ("different shader use different program",
             (
             () => {

             })
             ); */
          /* todo should test with more attribute */
          describe(
            "disable all attributes",
            () => {
              let _prepareForDisable = (sandbox, state) => {
                let state = _prepare(sandbox, state);
                let pos = 0;
                let getAttribLocation =
                  GlslLocationTool.getAttribLocation(~pos, sandbox, "a_position");
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
                  let state = state |> _render;
                  let state = state |> ProgramTool.clearLastUsedProgram;
                  let state = state |> _render;
                  disableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 1
                }
              );
              test(
                "else, not disable",
                () => {
                  let (state, pos, disableVertexAttribArray) = _prepareForDisable(sandbox, state^);
                  let state = state |> RenderJobsTool.initSystemAndRender;
                  let state = state |> _render;
                  let state = state |> _render;
                  disableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 0
                }
              )
            }
          )
        }
      );
      describe(
        "send attribute data",
        () => {
          describe(
            "init vbo buffers when first send",
            () => {
              let _prepare = (sandbox, state) => {
                let (state, gameObject, geometry, _, _) =
                  RenderJobsTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
                (state, geometry)
              };
              describe(
                "init vertex buffer",
                () => {
                  test(
                    "create buffer",
                    () => {
                      let (state, _) = _prepare(sandbox, state^);
                      let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      getCallCount(createBuffer) |> expect == 2
                    }
                  );
                  test(
                    "bufferData",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let array_buffer = 1;
                      let static_draw = 2;
                      let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~array_buffer,
                               ~static_draw,
                               ~createBuffer,
                               ~bufferData,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      let vertices = Geometry.getGeometryVertices(geometry, state);
                      bufferData
                      |> withThreeArgs(array_buffer, vertices, static_draw)
                      |> expect
                      |> toCalledOnce
                    }
                  );
                  test(
                    "bind buffer and reset buffer",
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
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
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
                    "create buffer",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      getCallCount(createBuffer) |> expect == 2
                    }
                  );
                  test(
                    "bufferData",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let element_array_buffer = 1;
                      let static_draw = 2;
                      let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~element_array_buffer,
                               ~static_draw,
                               ~createBuffer,
                               ~bufferData,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      let indices = Geometry.getGeometryIndices(geometry, state);
                      bufferData
                      |> withThreeArgs(element_array_buffer, indices, static_draw)
                      |> expect
                      |> toCalledOnce
                    }
                  );
                  test(
                    "bind buffer and reset buffer",
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
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
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
            "send a_position",
            () =>
              /* test(
                   "if lastSendArrayBuffer === buffer, not send",
                   () => {
                     let state = _prepare(sandbox, state^);
                     let float = 1;
                     let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                     let pos = 0;
                     let getAttribLocation =
                       GlslLocationTool.getAttribLocation(~pos, sandbox, "a_position");
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
                     let state = state |> RenderJobsTool.initSystemAndRender;
                     let state = state |> _render;
                     let state = state |> _render;
                     vertexAttribPointer |> getCallCount |> expect == 1
                   }
                 ); */
              describe(
                "else",
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
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      bindBuffer |> expect |> toCalledWith([array_buffer, buffer])
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
                        GlslLocationTool.getAttribLocation(~pos, sandbox, "a_position");
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
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      vertexAttribPointer
                      |> expect
                      |> toCalledWith([pos, 3, float, Obj.magic(Js.false_), 0, 0])
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
                            GlslLocationTool.getAttribLocation(~pos, sandbox, "a_position");
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
                          let state = state |> _render;
                          let state = state |> _render;
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
                            GlslLocationTool.getAttribLocation(~pos, sandbox, "a_position");
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
                          let state = state |> _render;
                          let state = state |> GlslSenderTool.disableVertexAttribArray;
                          /* |> GlslSenderTool.cleanLastSendArrayBuffer; */
                          let state = state |> _render;
                          enableVertexAttribArray |> withOneArg(pos) |> getCallCount |> expect == 2
                        }
                      )
                      /* test
                         ("differenc shader's vertexAttribHistory of the same attribute data pos are independent",
                         (
                         () => {
                           todo test switch program
                         })
                         );
                         */
                    }
                  )
                }
              )
          );
          describe(
            "fix bug",
            () => {
              let _prepareTwo = (sandbox, state) => {
                let (state, _, geometry1, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
                let (state, _, geometry2, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
                (state, geometry1, geometry2)
              };
              test(
                "different gameObject(with different geometry) should bufferData different array buffer and element array buffer",
                () => {
                  let (state, geometry1, geomemtry2) = _prepareTwo(sandbox, state^);
                  let element_array_buffer = 1;
                  let static_draw = 2;
                  let array_buffer = 3;
                  let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~element_array_buffer,
                           ~array_buffer,
                           ~static_draw,
                           ~bufferData,
                           ()
                         )
                       );
                  let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                  let indices = Geometry.getGeometryIndices(geometry1, state);
                  let vertices = Geometry.getGeometryVertices(geometry1, state);
                  (
                    bufferData |> withThreeArgs(array_buffer, vertices, static_draw) |> getCallCount,
                    bufferData
                    |> withThreeArgs(element_array_buffer, indices, static_draw)
                    |> getCallCount
                  )
                  |> expect == (2, 2)
                }
              );
              test(
                "different gameObject(with different geometry) should bind different array buffer and element array buffer",
                () => {
                  let (state, _, _) = _prepareTwo(sandbox, state^);
                  let element_array_buffer = 1;
                  let array_buffer = 2;
                  let arrayBuffer1 = Obj.magic(10);
                  let arrayBuffer2 = Obj.magic(11);
                  let elementArrayBuffer1 = Obj.magic(12);
                  let elementArrayBuffer2 = Obj.magic(13);
                  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                  createBuffer |> onCall(0) |> returns(arrayBuffer1);
                  createBuffer |> onCall(1) |> returns(elementArrayBuffer1);
                  createBuffer |> onCall(2) |> returns(arrayBuffer2);
                  createBuffer |> onCall(3) |> returns(elementArrayBuffer2);
                  let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~element_array_buffer,
                           ~array_buffer,
                           ~createBuffer,
                           ~bindBuffer,
                           ()
                         )
                       );
                  let state = state |> RenderJobsTool.initSystemAndRender;
                  let state = state |> _render;
                  (
                    bindBuffer |> withTwoArgs(array_buffer, arrayBuffer1) |> getCallCount,
                    bindBuffer |> withTwoArgs(array_buffer, arrayBuffer2) |> getCallCount,
                    bindBuffer
                    |> withTwoArgs(element_array_buffer, elementArrayBuffer1)
                    |> getCallCount,
                    bindBuffer
                    |> withTwoArgs(element_array_buffer, elementArrayBuffer2)
                    |> getCallCount
                  )
                  |> expect == (2, 2, 2, 2)
                }
              )
            }
          )
        }
      );
      describe(
        "send uniform data",
        () => {
          GlslSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_mMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> Transform.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.)),
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
            ~testFunc=
              (_prepareSendUinformData) => {
                test(
                  "if not do any transform operation, should still send identity matrix value on the first send",
                  () => {
                    let (state, _, gameObjectTransform, cameraTransform, cameraController) =
                      _prepareSendUinformData(sandbox, state^);
                    let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 0;
                    let getUniformLocation =
                      GlslLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
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
                      |> RenderJobsTool.updateSystem
                      |> _render;
                    uniformMatrix4fv
                    |> expect
                    |> toCalledWith([
                         pos,
                         Obj.magic(Js.false_),
                         Obj.magic(TransformTool.getDefaultLocalToWorldMatrix())
                       ])
                  }
                );
                describe(
                  "test two gameObjects",
                  () =>
                    test(
                      "if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect",
                      () => {
                        let (state, _, gameObjectTransform, cameraTransform, cameraController) =
                          _prepareSendUinformData(sandbox, state^);
                        let (state, gameObject2, _, _, _) =
                          RenderJobsTool.prepareGameObject(sandbox, state);
                        let state =
                          state
                          |> Transform.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
                        let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                        let pos = 0;
                        let getUniformLocation =
                          GlslLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
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
                          |> RenderJobsTool.updateSystem
                          |> _render;
                        uniformMatrix4fv
                        |> withOneArg(pos)
                        |> getCall(1)
                        |> expect
                        |> toCalledWith([
                             pos,
                             Obj.magic(Js.false_),
                             Obj.magic(TransformTool.getDefaultLocalToWorldMatrix())
                           ])
                      }
                    )
                )
              },
            ()
          );
          GlslSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_vMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> Transform.setTransformLocalPosition(cameraTransform, (10., 2., 3.)),
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
            ()
          );
          GlslSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_pMatrix",
            (gameObjectTransform, cameraTransform, cameraController, state) => state,
            CameraControllerTool.getPMatrixOfCreateCameraControllerPerspectiveCamera(),
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
                let (state, _, geometry, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
                (state, geometry)
              };
              describe(
                "bind index buffer",
                () => {
                  let _prepareForElementArrayBuffer = (state) => {
                    /* let state = _prepare(sandbox, state); */
                    let element_array_buffer = 1;
                    let buffer = Obj.magic(10);
                    let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                    /* createBuffer |> onCall(1) |> returns(buffer) |> ignore; */
                    createBuffer |> returns(buffer) |> ignore;
                    let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                    let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
                    let state =
                      state
                      |> FakeGlTool.setFakeGl(
                           FakeGlTool.buildFakeGl(
                             ~sandbox,
                             ~element_array_buffer,
                             ~createBuffer,
                             ~bindBuffer,
                             ~drawElements,
                             ()
                           )
                         );
                    let state = state |> RenderJobsTool.initSystemAndRender;
                    (state, bindBuffer, element_array_buffer, buffer)
                  };
                  /* test(
                       "if lastSendElementArrayBuffer === buffer, not bind",
                       () => {
                         let state = _prepare(sandbox, state^);
                         let (state, bindBuffer, element_array_buffer, buffer) =
                           _prepareForElementArrayBuffer(state);
                         let state = state |> _render;
                         let bindElementArrayBufferCallCountBeforeSecondRender =
                           bindBuffer |> withTwoArgs(element_array_buffer, buffer) |> getCallCount;
                         let state = state |> _render;
                         let bindElementArrayBufferCallCountAfterSecondRender =
                           bindBuffer |> withTwoArgs(element_array_buffer, buffer) |> getCallCount;
                         bindElementArrayBufferCallCountAfterSecondRender
                         |> expect == bindElementArrayBufferCallCountBeforeSecondRender
                       }
                     ); */
                  test
                    /* "else, bind", */
                    (
                      "bind",
                      () => {
                        let state = _prepare(sandbox, state^);
                        let (state, bindBuffer, element_array_buffer, buffer) =
                          _prepareForElementArrayBuffer(state);
                        let bindElementArrayBufferCallCountAfterInit =
                          bindBuffer |> withTwoArgs(element_array_buffer, buffer) |> getCallCount;
                        let state = state |> _render;
                        let bindElementArrayBufferCallCountAfterRender =
                          bindBuffer |> withTwoArgs(element_array_buffer, buffer) |> getCallCount;
                        bindElementArrayBufferCallCountAfterRender
                        |> expect == bindElementArrayBufferCallCountAfterInit
                        + 1
                        + 1
                      }
                    );
                  describe(
                    "test create gameObject after dispose one",
                    () =>
                      test(
                        "should bind new one's element array buffer",
                        () => {
                          let (state, gameObject1, _, _, _) =
                            RenderJobsTool.prepareGameObject(sandbox, state^);
                          let (state, _, _, _) =
                            CameraControllerTool.createCameraGameObject(state);
                          let (state, bindBuffer, element_array_buffer, buffer) =
                            _prepareForElementArrayBuffer(state);
                          let state = state |> _render;
                          let state = state |> GameObject.disposeGameObject(gameObject1);
                          let (state, gameObject2, _, _, _) =
                            RenderJobsTool.prepareGameObject(sandbox, state);
                          let state = state |> GameObject.initGameObject(gameObject2);
                          let bindElementArrayBufferCallCountAfterFirstRender =
                            bindBuffer |> withOneArg(element_array_buffer) |> getCallCount;
                          let state = state |> _render;
                          let bindElementArrayBufferCallCountAfterSecondRender =
                            bindBuffer |> withOneArg(element_array_buffer) |> getCallCount;
                          bindElementArrayBufferCallCountAfterSecondRender
                          |> expect == bindElementArrayBufferCallCountAfterFirstRender
                          + 2
                          + 1
                        }
                      )
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
                  let state = state |> _render;
                  drawElements
                  |> withFourArgs(
                       triangles,
                       GeometryTool.getIndicesCount(geometry, state),
                       GeometryTool.getIndexType(state),
                       GeometryTool.getIndexTypeSize(state) * 0
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
                         RenderJobsTool.prepareGameObject(sandbox, state);
                       let (state, _, geometry2, _, _) =
                         RenderJobsTool.prepareGameObject(sandbox, state);
                       let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
                       (state, geometry1, geometry2)
                     };
                     todo use diferent geometry which have different indices count!
                     test(
                       "different gameObject(with the same material, different geometry) should drawElements with different geometry data",
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
                         let state = state |> _render;
                         (
                           drawElements
                         |> withFourArgs(
                              triangles,
                              GeometryTool.getIndicesCount(geometry1, state),
                              GeometryTool.getIndexType(state),
                              GeometryTool.getIndexTypeSize(state) * 0
                            )
                            |> getCallCount,
                           drawElements
                         |> withFourArgs(
                              triangles,
                              GeometryTool.getIndicesCount(geometry2, state),
                              GeometryTool.getIndexType(state),
                              GeometryTool.getIndexTypeSize(state) * 0
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
      /* test
          ("else, drawArrays",
          (
          () => {
         todo test
          })
          ); */
    }
  );