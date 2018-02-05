open Wonder_jest;

let _ =
  describe(
    "test front render light hardware instance",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _createSourceInstanceGameObject = FrontRenderLightHardwareInstanceTool.createSourceInstanceGameObject;
      let _prepare = FrontRenderLightHardwareInstanceTool.prepare;
      let _render = FrontRenderLightHardwareInstanceTool.render;
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfigAndBufferConfig(
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
              useProgram |> expect |> toCalledWith([|program|])
            }
          )
        }
      );
      describe(
        "send attribute data",
        () => {
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
                  let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                  vertexAttribPointer
                  |> getCall(0)
                  |> expect
                  |> toCalledWith([|pos, 3, float, Obj.magic(Js.false_), 0, 0|])
                }
              )
          );
          /* DP: diff */
          describe(
            "send sourceInstance gameObject's a_normal",
            () =>
              test(
                "test attach buffer to attribute",
                () => {
                  let (state, _, _) = _prepare(sandbox, state^);
                  let float = 1;
                  let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getAttribLocation =
                    GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_normal");
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
                  |> getCall(1)
                  |> expect
                  |> toCalledWith([|pos, 3, float, Obj.magic(Js.false_), 0, 0|])
                }
              )
          )
        }
      );
      describe(
        "send uniform data",
        () => {
          test(
            "send shader uniform data only once per shader",
            () => {
              let name = "u_vMatrix";
              let (state, _, _) = _prepare(sandbox, state^);
              let (state, gameObject2, componentTuple) =
                _createSourceInstanceGameObject(sandbox, state);
              let (state, gameObject3, _, _, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 1;
              let getUniformLocation = GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
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
          );
          GLSLSenderTool.JudgeSendUniformData.testSendVector3(
            sandbox,
            "u_diffuse",
            (_, (gameObjectTransform, material), (cameraTransform, cameraController), state) =>
              state |> LightMaterial.setLightMaterialDiffuseColor(material, [|0., 1., 0.2|]),
            [0., 1., 0.2],
            ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
            ()
          )
        }
      );
      describe(
        "send instance data",
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
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
                  let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                  getCallCount(createBuffer) |> expect == 4
                }
              );
              test(
                "test not create buffer when second call",
                () => {
                  let (state, _, _) = _prepare(sandbox, state^);
                  let buffer = Obj.magic(1);
                  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox) |> returns(buffer);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
                  let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                  let state = state |> _render;
                  getCallCount(createBuffer) |> expect == 4
                }
              )
            }
          );
          describe(
            "set instance buffer's capacity",
            () => {
              describe(
                "contract check",
                () =>
                  test(
                    "capacity should be a multiplier of 4",
                    () =>
                      expect(() => InstanceBufferTool.createMatrixFloat32Array(3))
                      |> toThrowMessage("capacity should be a multiplier of 4")
                  )
              );
              /* TODO test matrixFloat32Array */
              describe(
                "if current capacity < target capacity",
                () => {
                  let _prepare = (sandbox, state) => {
                    let (
                      state,
                      gameObject,
                      (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject)
                    ) =
                      _prepare(sandbox, state);
                    for (_ in 0 to 62) {
                      let (state, objectInstanceGameObject) =
                        SourceInstance.createSourceInstanceObjectInstance(sourceInstance, state);
                      ()
                    };
                    (state, gameObject, sourceInstance, objectInstanceGameObject)
                  };
                  describe(
                    "delete old instance buffer",
                    () => {
                      let _prepare = (sandbox, state) => {
                        let (state, gameObject, sourceInstance, objectInstanceGameObject) =
                          _prepare(sandbox, state^);
                        let buffer1 = Obj.magic(1);
                        let buffer2 = Obj.magic(2);
                        let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                        createBuffer |> onCall(3) |> returns(buffer1) |> ignore;
                        createBuffer |> onCall(4) |> returns(buffer2) |> ignore;
                        let deleteBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                        (state, buffer1, buffer2, createBuffer, deleteBuffer)
                      };
                      test(
                        "test delete",
                        () => {
                          let (state, buffer1, buffer2, createBuffer, deleteBuffer) =
                            _prepare(sandbox, state);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ~deleteBuffer, ())
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                          deleteBuffer |> expect |> toCalledWith([|buffer1|])
                        }
                      );
                      test(
                        "not bind deleted buffer",
                        () => {
                          let (state, buffer1, buffer2, createBuffer, deleteBuffer) =
                            _prepare(sandbox, state);
                          let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(
                                   ~sandbox,
                                   ~createBuffer,
                                   ~deleteBuffer,
                                   ~bindBuffer,
                                   ()
                                 )
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                          bindBuffer
                          |> withTwoArgs(Sinon.matchAny, buffer1)
                          |> getCallCount
                          |> expect == 1
                        }
                      )
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
                      createBuffer |> getCallCount |> expect == 5
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
                      |> withThreeArgs(array_buffer, 12800, dynamic_draw)
                      |> expect
                      |> toCalledOnce
                    }
                  )
                }
              )
            }
          );
          describe(
            "send modelMatrix and normalMatrix data",
            () => {
              describe(
                "send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices and normal matrices",
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
                      let data = Js.Typed_array.Float32Array.fromLength(64 * (16 + 9));
                      let transformArr = [|sourceTransform, objectTransform|];
                      ArraySystem.range(0, 1)
                      |> WonderCommonlib.ArraySystem.reduceOneParam(
                           [@bs]
                           (
                             (offset, index) => {
                               let transform = transformArr[index];
                               TypeArrayUtils.fillFloat32ArrayWithOffset(
                                 data,
                                 TransformTool.getLocalToWorldMatrixTypeArray(transform, state),
                                 offset
                               );
                               TypeArrayUtils.fillFloat32ArrayWithOffset(
                                 data,
                                 TransformTool.getNormalMatrixTypeArray(transform, state),
                                 offset + 16
                               );
                               offset + 16 + 9
                             }
                           ),
                           0
                         )
                      |> ignore;
                      ArraySystem.range(2, 63)
                      |> WonderCommonlib.ArraySystem.reduceOneParam(
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
                                   0.
                                 |]),
                                 offset + 16
                               );
                               offset + 16 + 9
                             }
                           ),
                           25 * 2
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
                    let pos5 = 5;
                    let pos6 = 6;
                    let pos7 = 7;
                    let getAttribLocation =
                      GLSLLocationTool.getAttribLocation(~pos=pos1, sandbox, "a_mVec4_0");
                    getAttribLocation
                    |> withTwoArgs(Sinon.matchAny, "a_mVec4_1")
                    |> returns(pos2)
                    |> withTwoArgs(Sinon.matchAny, "a_mVec4_2")
                    |> returns(pos3)
                    |> withTwoArgs(Sinon.matchAny, "a_mVec4_3")
                    |> returns(pos4)
                    |> withTwoArgs(Sinon.matchAny, "a_normalVec3_0")
                    |> returns(pos5)
                    |> withTwoArgs(Sinon.matchAny, "a_normalVec3_1")
                    |> returns(pos6)
                    |> withTwoArgs(Sinon.matchAny, "a_normalVec3_2")
                    |> returns(pos7)
                    |> ignore;
                    (state, (pos1, pos2, pos3, pos4, pos5, pos6, pos7), getAttribLocation)
                  };
                  test(
                    "enableVertexAttribArray instance data",
                    () => {
                      let (state, (pos1, pos2, pos3, pos4, pos5, pos6, pos7), getAttribLocation) =
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
                        enableVertexAttribArray |> withOneArg(pos4) |> getCallCount,
                        enableVertexAttribArray |> withOneArg(pos5) |> getCallCount,
                        enableVertexAttribArray |> withOneArg(pos6) |> getCallCount,
                        enableVertexAttribArray |> withOneArg(pos7) |> getCallCount
                      )
                      |> expect == (1, 1, 1, 1, 1, 1, 1)
                    }
                  );
                  describe(
                    "vertexAttribPointer instance data",
                    () => {
                      let _prepare = (sandbox, state) => {
                        let (state, positionTuple, getAttribLocation) = _prepare(sandbox, state);
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
                        (float, positionTuple, vertexAttribPointer)
                      };
                      describe(
                        "test model matrix data ",
                        () => {
                          test(
                            "test first data",
                            () => {
                              let (
                                float,
                                (pos1, pos2, pos3, pos4, pos5, pos6, pos7),
                                vertexAttribPointer
                              ) =
                                _prepare(sandbox, state);
                              vertexAttribPointer
                              |> expect
                              |> toCalledWith([|pos1, 4, float, Obj.magic(Js.false_), 100, 0|])
                            }
                          );
                          test(
                            "test second data",
                            () => {
                              let (
                                float,
                                (pos1, pos2, pos3, pos4, pos5, pos6, pos7),
                                vertexAttribPointer
                              ) =
                                _prepare(sandbox, state);
                              vertexAttribPointer
                              |> expect
                              |> toCalledWith([|pos2, 4, float, Obj.magic(Js.false_), 100, 16|])
                            }
                          );
                          test(
                            "test third data",
                            () => {
                              let (
                                float,
                                (pos1, pos2, pos3, pos4, pos5, pos6, pos7),
                                vertexAttribPointer
                              ) =
                                _prepare(sandbox, state);
                              vertexAttribPointer
                              |> expect
                              |> toCalledWith([|pos3, 4, float, Obj.magic(Js.false_), 100, 32|])
                            }
                          );
                          test(
                            "test fourth data",
                            () => {
                              let (
                                float,
                                (pos1, pos2, pos3, pos4, pos5, pos6, pos7),
                                vertexAttribPointer
                              ) =
                                _prepare(sandbox, state);
                              vertexAttribPointer
                              |> expect
                              |> toCalledWith([|pos4, 4, float, Obj.magic(Js.false_), 100, 48|])
                            }
                          )
                        }
                      );
                      describe(
                        "test normal matrix data ",
                        () => {
                          test(
                            "test 5th data",
                            () => {
                              let (
                                float,
                                (pos1, pos2, pos3, pos4, pos5, pos6, pos7),
                                vertexAttribPointer
                              ) =
                                _prepare(sandbox, state);
                              vertexAttribPointer
                              |> expect
                              |> toCalledWith([|pos5, 3, float, Obj.magic(Js.false_), 100, 64|])
                            }
                          );
                          test(
                            "test 6th data",
                            () => {
                              let (
                                float,
                                (pos1, pos2, pos3, pos4, pos5, pos6, pos7),
                                vertexAttribPointer
                              ) =
                                _prepare(sandbox, state);
                              vertexAttribPointer
                              |> expect
                              |> toCalledWith([|pos6, 3, float, Obj.magic(Js.false_), 100, 76|])
                            }
                          );
                          test(
                            "test 7th data",
                            () => {
                              let (
                                float,
                                (pos1, pos2, pos3, pos4, pos5, pos6, pos7),
                                vertexAttribPointer
                              ) =
                                _prepare(sandbox, state);
                              vertexAttribPointer
                              |> expect
                              |> toCalledWith([|pos7, 3, float, Obj.magic(Js.false_), 100, 88|])
                            }
                          )
                        }
                      )
                    }
                  );
                  test(
                    "vertexAttribDivisorANGLE 1",
                    () => {
                      let (state, (pos1, pos2, pos3, pos4, pos5, pos6, pos7), getAttribLocation) =
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
                        vertexAttribDivisorANGLE |> withTwoArgs(pos4, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos5, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos6, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos7, 1) |> getCallCount
                      )
                      |> expect == (1, 1, 1, 1, 1, 1, 1)
                    }
                  )
                }
              );
              describe(
                "optimize",
                () =>
                  describe(
                    "add isTransformStatic logic",
                    () => {
                      let _prepare = (sandbox, isStatic, state) => {
                        let (
                          state,
                          _,
                          (
                            geometry,
                            material,
                            meshRenderer,
                            sourceInstance,
                            objectInstanceGameObject
                          )
                        ) =
                          _prepare(sandbox, state^);
                        let state =
                          SourceInstance.markSourceInstanceModelMatrixIsStatic(
                            sourceInstance,
                            isStatic,
                            state
                          );
                        let bufferSubData = createEmptyStubWithJsObjSandbox(sandbox);
                        let state =
                          state
                          |> FakeGlTool.setFakeGl(
                               FakeGlTool.buildFakeGl(~sandbox, ~bufferSubData, ())
                             );
                        let state = state |> RenderJobsTool.initSystemAndRender;
                        (state, sourceInstance, bufferSubData)
                      };
                      describe(
                        "if isTransformStatic is true",
                        () => {
                          test(
                            "if not send data before, send data",
                            () => {
                              let (state, _, bufferSubData) = _prepare(sandbox, Js.true_, state);
                              let state = state |> _render;
                              bufferSubData |> expect |> toCalledOnce
                            }
                          );
                          test(
                            "else, not send data",
                            () => {
                              let (state, _, bufferSubData) = _prepare(sandbox, Js.true_, state);
                              let state = state |> _render;
                              let state = state |> _render;
                              bufferSubData |> expect |> toCalledOnce
                            }
                          )
                        }
                      );
                      describe(
                        "else",
                        () =>
                          test(
                            "send data",
                            () => {
                              let (state, _, bufferSubData) = _prepare(sandbox, Js.false_, state);
                              let state = state |> _render;
                              bufferSubData |> expect |> toCalledOnce
                            }
                          )
                      )
                      /* describe(
                           "support switch static to dynamic",
                           () =>
                             describe(
                               "test after switch",
                               () =>
                                 test(
                                   "send data",
                                   () => {
                                     let (state, sourceInstance, bufferSubData) =
                                       _prepare(sandbox, Js.false_, state);
                                     let state = state |> _render;
                                     let state =
                                       SourceInstance.markSourceInstanceModelMatrixIsStatic(
                                         sourceInstance,
                                         Js.false_,
                                         state
                                       );
                                     let state = state |> _render;
                                     let state = state |> _render;
                                     bufferSubData |> expect |> toCalledThrice
                                   }
                                 )
                             )
                         );
                         describe(
                           "support switch dynamic to static",
                           () =>
                             describe(
                               "test after switch",
                               () =>
                                 test(
                                   "send data in the next render, and not send data in the next next render",
                                   () => {
                                     let (state, sourceInstance, bufferSubData) =
                                       _prepare(sandbox, Js.false_, state);
                                     let state = state |> _render;
                                     let state =
                                       SourceInstance.markSourceInstanceModelMatrixIsStatic(
                                         sourceInstance,
                                         Js.true_,
                                         state
                                       );
                                     let state = state |> _render;
                                     let state = state |> _render;
                                     let state = state |> _render;
                                     bufferSubData |> expect |> toCalledTwice
                                   }
                                 )
                             )
                         );
                         describe(
                           "support switch static to dynamic to static",
                           () =>
                             describe(
                               "test after switch",
                               () =>
                                 test(
                                   "send data in the next render, and not send data in the next next render",
                                   () => {
                                     let (state, sourceInstance, bufferSubData) =
                                       _prepare(sandbox, Js.false_, state);
                                     let state = state |> _render;
                                     let state =
                                       SourceInstance.markSourceInstanceModelMatrixIsStatic(
                                         sourceInstance,
                                         Js.false_,
                                         state
                                       );
                                     let state = state |> _render;
                                     let state =
                                       SourceInstance.markSourceInstanceModelMatrixIsStatic(
                                         sourceInstance,
                                         Js.true_,
                                         state
                                       );
                                     let state = state |> _render;
                                     let state = state |> _render;
                                     let state = state |> _render;
                                     let state = state |> _render;
                                     bufferSubData |> getCallCount |> expect == 3
                                   }
                                 )
                             )
                         ) */
                    }
                  )
              )
            }
          )
        }
      );
      describe(
        "draw instance",
        () =>
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
              |> toCalledWith([|
                   triangles,
                   GeometryTool.getIndicesCount(geometry, state),
                   GeometryTool.getIndexType(state),
                   GeometryTool.getIndexTypeSize(state) * 0,
                   2
                 |])
            }
          )
      )
    }
  );