open Jest;

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
        let (state, _, _, _) = CameraControllerTool.createCameraGameObject(sandbox, state);
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
        () =>
          describe(
            "send a_position",
            () => {
              test(
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
              );
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
                          let state =
                            state
                            |> GlslSenderTool.disableVertexAttribArray
                            |> GlslSenderTool.cleanLastSendArrayBuffer;
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
            }
          )
      );
      describe(
        "send uniform data",
        () => {
          GlslSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_mMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> Transform.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.)),
            [|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 1., 2., 3., 1.|],
            ~testFunc=
              (_prepareSendUinformData) =>
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
                ),
            ()
          );
          GlslSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_vMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> Transform.setTransformLocalPosition(cameraTransform, (10., 2., 3.)),
            [|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., (-10.), (-2.), (-3.), 1.|],
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
                let (state, _, _, _) = CameraControllerTool.createCameraGameObject(sandbox, state);
                (state, geometry)
              };
              describe(
                "bind index buffer",
                () => {
                  let _prepare = (state) => {
                    let state = _prepare(sandbox, state);
                    let element_array_buffer = 1;
                    let buffer = Obj.magic(10);
                    let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                    createBuffer |> onCall(1) |> returns(buffer) |> ignore;
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
                  test(
                    "if lastSendElementArrayBuffer === buffer, not bind",
                    () => {
                      let (state, bindBuffer, element_array_buffer, buffer) = _prepare(state^);
                      let state = state |> _render;
                      let bindIndexBufferCallCountBeforeSecondRender =
                        bindBuffer |> withTwoArgs(element_array_buffer, buffer) |> getCallCount;
                      let state = state |> _render;
                      let bindIndexBufferCallCountAfterSecondRender =
                        bindBuffer |> withTwoArgs(element_array_buffer, buffer) |> getCallCount;
                      bindIndexBufferCallCountAfterSecondRender
                      |> expect == bindIndexBufferCallCountBeforeSecondRender
                    }
                  );
                  test(
                    "else, bind",
                    () => {
                      let (state, bindBuffer, element_array_buffer, buffer) = _prepare(state^);
                      let bindIndexBufferCallCountAfterInit =
                        bindBuffer |> withTwoArgs(element_array_buffer, buffer) |> getCallCount;
                      let state = state |> _render;
                      let bindIndexBufferCallCountAfterRender =
                        bindBuffer |> withTwoArgs(element_array_buffer, buffer) |> getCallCount;
                      bindIndexBufferCallCountAfterRender
                      |> expect == bindIndexBufferCallCountAfterInit
                      + 1
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