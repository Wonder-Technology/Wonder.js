open Wonder_jest;

let _ =
  describe(
    "test render basic hardware instance",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      let _createSourceInstanceGameObject = (sandbox, state) => {
        let (state, gameObject, geometry, material, meshRenderer) =
          RenderJobsTool.prepareGameObject(sandbox, state);
        let (state, sourceInstance) = SourceInstance.createSourceInstance(state);
        let (state, objectInstanceGameObject) =
          SourceInstance.createInstance(sourceInstance, state);
        let state =
          state |> GameObject.addGameObjectSourceInstanceComponent(gameObject, sourceInstance);
        (
          state,
          gameObject,
          (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject)
        )
      };
      let _prepare = (sandbox, state) => {
        let state = state |> InstanceTool.setGpuDetectDataAllowHardwareInstance(sandbox);
        let (state, gameObject, componentTuple) = _createSourceInstanceGameObject(sandbox, state);
        let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
        (state, gameObject, componentTuple)
      };
      let _render = (state: StateDataType.state) => state |> WebGLRenderTool.render;
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithRenderConfigAndBufferConfig(
              sandbox,
              Js.Nullable.return(GeometryTool.buildBufferConfig(3000))
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepareForUseProgram = (sandbox, state) => {
            let (state, _, _) = _prepare(sandbox, state);
            let program = Obj.magic(1);
            /* let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> returns(program);
               let useProgram = createEmptyStubWithJsObjSandbox(sandbox); */
            let createProgram =
              createEmptyStubWithJsObjSandbox(sandbox) |> onCall(0) |> returns(program);
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
                 );
            (state, program, createProgram, useProgram)
          };
          test(
            "create program and use program only once",
            () => {
              let (state, program, createProgram, useProgram) =
                _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.initSystemAndRender |> _render;
              createProgram |> getCallCount |> expect == 1
            }
          );
          test(
            "only use sourceInstance's gameObject's program",
            () => {
              let (state, program, createProgram, useProgram) =
                _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.initSystemAndRender |> _render;
              useProgram |> expect |> toCalledWith([program])
            }
          )
          /* test(
               "if the program is already used, not use again",
               () => {
                 let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
                 let state = state |> RenderJobsTool.initSystemAndRender;
                 let state = state |> _render;
                 let state = state |> _render;
                 useProgram |> getCallCount |> expect == 1
               }
             ); */
          /* test
             ("different shader use different program",
             (
             () => {

             })
             ); */
          /* todo should test with more attribute */
          /* describe(
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
             ) */
        }
      );
      describe(
        "send attribute data",
        () =>
          /* describe(
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
             ); */
          describe(
            "send sourceInstance gameObject's a_position",
            () =>
              test(
                "test attach buffer to attribute",
                () => {
                  let (state, _, _) = _prepare(sandbox, state^);
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
                  |> getCall(0)
                  |> expect
                  |> toCalledWith([pos, 3, float, Obj.magic(Js.false_), 0, 0])
                }
              )
          )
      );
      describe(
        "send uniform data",
        () =>
          test(
            "send shader uniform data only once per shader",
            () => {
              let name = "u_vMatrix";
              let (state, _, _) = _prepare(sandbox, state^);
              let (state, gameObject2, componentTuple) =
                _createSourceInstanceGameObject(sandbox, state);
              let (state, gameObject3, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 1;
              let getUniformLocation = GlslLocationTool.getUniformLocation(~pos, sandbox, name);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~uniformMatrix4fv, ~getUniformLocation, ())
                   );
              let state =
                state
                |> RenderJobsTool.initSystemAndRender
                |> RenderJobsTool.updateSystem
                |> _render;
              uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2
            }
          )
      );
      describe(
        "send instance data",
        () =>
          describe(
            "send modelMatrix data",
            () => {
              describe(
                "create instance buffer when first send",
                () => {
                  test(
                    "test create buffer",
                    () => {
                      let (state, _, _) = _prepare(sandbox, state^);
                      let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      getCallCount(createBuffer) |> expect == 3
                    }
                  );
                  test(
                    "test not create buffer when second call",
                    () => {
                      let (state, _, _) = _prepare(sandbox, state^);
                      let buffer = Obj.magic(1);
                      let createBuffer =
                        createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      let state = state |> _render;
                      getCallCount(createBuffer) |> expect == 3
                    }
                  )
                }
              );
              describe(
                "set instance buffer's capacity",
                () =>
                  describe(
                    "if default capacity < target capacity ",
                    () => {
                      let _prepare = (sandbox, state) => {
                        let (
                          state,
                          gameObject,
                          (
                            geometry,
                            material,
                            meshRenderer,
                            sourceInstance,
                            objectInstanceGameObject
                          )
                        ) =
                          _prepare(sandbox, state);
                        for (i in 0 to 62) {
                          let (state, objectInstanceGameObject) =
                            SourceInstance.createInstance(sourceInstance, state);
                          ()
                        };
                        (state, gameObject, sourceInstance, objectInstanceGameObject)
                      };
                      test(
                        "delete old instance buffer",
                        () => {
                          let (state, gameObject, sourceInstance, objectInstanceGameObject) =
                            _prepare(sandbox, state^);
                          let buffer = Obj.magic(1);
                          let createBuffer =
                            createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
                          let deleteBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ~deleteBuffer, ())
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                          deleteBuffer |> expect |> toCalledOnce
                        }
                      );
                      test(
                        "create new one",
                        () => {
                          let (state, gameObject, sourceInstance, objectInstanceGameObject) =
                            _prepare(sandbox, state^);
                          let buffer = Obj.magic(1);
                          let createBuffer =
                            createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ())
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                          createBuffer |> getCallCount |> expect == 4
                        }
                      );
                      test(
                        "bufferData with increased capacity and dynamic draw",
                        () => {
                          let (state, gameObject, sourceInstance, objectInstanceGameObject) =
                            _prepare(sandbox, state^);
                          let array_buffer = 1;
                          let dynamic_draw = 2;
                          let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(
                                   ~sandbox,
                                   ~array_buffer,
                                   ~dynamic_draw,
                                   ~bufferData,
                                   ()
                                 )
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                          bufferData
                          |> withThreeArgs(array_buffer, 8192, dynamic_draw)
                          |> expect
                          |> toCalledOnce
                        }
                      )
                      /* test(
                           "not unbind new one",
                           () => {
                             let (state, gameObject, sourceInstance, objectInstanceGameObject) =
                               _prepare(sandbox, state^);
                             let array_buffer = 1;
                             let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                             let state =
                               state
                               |> FakeGlTool.setFakeGl(
                                    FakeGlTool.buildFakeGl(~sandbox, ~array_buffer, ~bindBuffer, ())
                                  );
                             let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                             bindBuffer
                             |> withTwoArgs(array_buffer, Js.Nullable.null)
                             |> expect
                             |> toCalledOnce
                           }
                         ) */
                    }
                  )
              );
              describe(
                "send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices",
                () => {
                  let _prepare = (sandbox, state) => {
                    let (
                      state,
                      gameObject,
                      (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject)
                    ) =
                      _prepare(sandbox, state);
                    (state, gameObject, sourceInstance, objectInstanceGameObject)
                  };
                  test(
                    "buffer sub data",
                    () => {
                      let (state, gameObject, sourceInstance, objectInstanceGameObject) =
                        _prepare(sandbox, state^);
                      let sourceTransform =
                        state |> GameObject.getGameObjectTransformComponent(gameObject);
                      let objectTransform =
                        state
                        |> GameObject.getGameObjectTransformComponent(objectInstanceGameObject);
                      let pos1 = (1., 2., 3.);
                      let pos2 = (2., 4., 5.);
                      let state =
                        state
                        |> Transform.setTransformLocalPosition(sourceTransform, pos1)
                        |> Transform.setTransformLocalPosition(objectInstanceGameObject, pos2);
                      let array_buffer = 1;
                      let bufferSubData = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~array_buffer, ~bufferSubData, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      let data = Js.Typed_array.Float32Array.fromLength(64 * 16);
                      let transformArr = [|objectTransform, sourceTransform|];
                      ArraySystem.range(0, 1)
                      |> ArraySystem.reduceOneParam(
                           [@bs]
                           (
                             (offset, index) => {
                               let transform = transformArr[index];
                               TypeArrayUtils.fillFloat32ArrayWithOffset(
                                 data,
                                 TransformSystem.getLocalToWorldMatrix(transform, state),
                                 offset
                               );
                               offset + 16
                             }
                           ),
                           0
                         )
                      |> ignore;
                      ArraySystem.range(2, 63)
                      |> ArraySystem.reduceOneParam(
                           [@bs]
                           (
                             (offset, index) => {
                               TypeArrayUtils.fillFloat32ArrayWithOffset(
                                 data,
                                 Js.Typed_array.Float32Array.make([|
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.,
                                   0.
                                 |]),
                                 offset
                               );
                               offset + 16
                             }
                           ),
                           32
                         )
                      |> ignore;
                      bufferSubData
                      |> withThreeArgs(array_buffer, 0, data)
                      |> expect
                      |> toCalledOnce
                    }
                  )
                }
              );
              describe(
                "handle instance data position",
                () => {
                  let _prepare = (sandbox, state) => {
                    let (
                      state,
                      gameObject,
                      (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject)
                    ) =
                      _prepare(sandbox, state^);
                    let pos1 = 1;
                    let pos2 = 2;
                    let pos3 = 3;
                    let pos4 = 4;
                    let getAttribLocation =
                      GlslLocationTool.getAttribLocation(~pos=pos1, sandbox, "a_mVec4_0");
                    getAttribLocation
                    |> withTwoArgs(Sinon.matchAny, "a_mVec4_1")
                    |> returns(pos2)
                    |> ignore;
                    getAttribLocation
                    |> withTwoArgs(Sinon.matchAny, "a_mVec4_2")
                    |> returns(pos3)
                    |> ignore;
                    getAttribLocation
                    |> withTwoArgs(Sinon.matchAny, "a_mVec4_3")
                    |> returns(pos4)
                    |> ignore;
                    (state, pos1, pos2, pos3, pos4, getAttribLocation)
                  };
                  test(
                    "enableVertexAttribArray instance data",
                    () => {
                      let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                        _prepare(sandbox, state);
                      let enableVertexAttribArray = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~enableVertexAttribArray,
                               ~getAttribLocation,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender;
                      let state = state |> _render;
                      (
                        enableVertexAttribArray |> withOneArg(pos1) |> getCallCount,
                        enableVertexAttribArray |> withOneArg(pos2) |> getCallCount,
                        enableVertexAttribArray |> withOneArg(pos3) |> getCallCount,
                        enableVertexAttribArray |> withOneArg(pos4) |> getCallCount
                      )
                      |> expect == (1, 1, 1, 1)
                    }
                  );
                  describe(
                    "vertexAttribPointer instance data",
                    () => {
                      let _prepare = (sandbox, state) => {
                        let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                          _prepare(sandbox, state);
                        let float = 1;
                        let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
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
                        (float, pos1, pos2, pos3, pos4, vertexAttribPointer)
                      };
                      test(
                        "test first data",
                        () => {
                          let (float, pos1, pos2, pos3, pos4, vertexAttribPointer) =
                            _prepare(sandbox, state);
                          vertexAttribPointer
                          |> expect
                          |> toCalledWith([pos1, 4, float, Obj.magic(Js.false_), 64, 0])
                        }
                      );
                      test(
                        "test second data",
                        () => {
                          let (float, pos1, pos2, pos3, pos4, vertexAttribPointer) =
                            _prepare(sandbox, state);
                          vertexAttribPointer
                          |> expect
                          |> toCalledWith([pos2, 4, float, Obj.magic(Js.false_), 64, 16])
                        }
                      );
                      test(
                        "test third data",
                        () => {
                          let (float, pos1, pos2, pos3, pos4, vertexAttribPointer) =
                            _prepare(sandbox, state);
                          vertexAttribPointer
                          |> expect
                          |> toCalledWith([pos3, 4, float, Obj.magic(Js.false_), 64, 32])
                        }
                      );
                      test(
                        "test fourth data",
                        () => {
                          let (float, pos1, pos2, pos3, pos4, vertexAttribPointer) =
                            _prepare(sandbox, state);
                          vertexAttribPointer
                          |> expect
                          |> toCalledWith([pos4, 4, float, Obj.magic(Js.false_), 64, 48])
                        }
                      )
                    }
                  );
                  test(
                    "vertexAttribDivisorANGLE 1",
                    () => {
                      let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                        _prepare(sandbox, state);
                      let vertexAttribDivisorANGLE =
                        Obj.magic(
                          InstanceTool.getExtensionInstancedArrays(state)##vertexAttribDivisorANGLE
                        );
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender;
                      let state = state |> _render;
                      (
                        vertexAttribDivisorANGLE |> withTwoArgs(pos1, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos2, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos3, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos4, 1) |> getCallCount
                      )
                      |> expect == (1, 1, 1, 1)
                    }
                  )
                }
              )
            }
          )
      );
      describe(
        "draw instance",
        () =>
          /* todo test
             test
             ("if sourceInstance gameObject not has indices, contract error",
             (
             () => {

             })
             ); */
          test(
            "drawElementsInstancedANGLE",
            () => {
              let (state, _, (geometry, _, _, _, _)) = _prepare(sandbox, state^);
              let drawElementsInstancedANGLE =
                Obj.magic(
                  InstanceTool.getExtensionInstancedArrays(state)##drawElementsInstancedANGLE
                );
              let triangles = 1;
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~triangles, ()));
              let state = state |> RenderJobsTool.initSystemAndRender;
              let state = state |> _render;
              drawElementsInstancedANGLE
              |> expect
              |> toCalledWith([
                   triangles,
                   GeometryTool.getIndicesCount(geometry, state),
                   GeometryTool.getIndexType(state),
                   GeometryTool.getIndexTypeSize(state) * 0,
                   2
                 ])
            }
          )
      )
      /* test(
           "not unbind instance buffer",
           () => {
             let (state, gameObject, sourceInstance, objectInstanceGameObject) =
               _prepare(sandbox, state^);
             let array_buffer = 1;
             let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
             let state =
               state
               |> FakeGlTool.setFakeGl(
                    FakeGlTool.buildFakeGl(~sandbox, ~array_buffer, ~bindBuffer, ())
                  );
             let state = state |> RenderJobsTool.initSystemAndRender |> _render;
             bindBuffer
             |> withTwoArgs(array_buffer, Js.Nullable.null)
             |> expect
             |> toCalledOnce
           }
         ) */
    }
  );