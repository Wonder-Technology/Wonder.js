open Wonder_jest;

let _ =
  describe(
    "test render basic hardware instance",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _createSourceInstanceGameObject = RenderBasicHardwareInstanceTool.createSourceInstanceGameObject;
      let _prepare = RenderBasicHardwareInstanceTool.prepare;
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfigAndBufferConfig(
              sandbox,
              LoopRenderJobTool.buildNoWorkerJobConfig(),
              {
                "boxGeometryPointDataBufferCount": 300,
                "customGeometryPointDataBufferCount": 300,
                "transformDataBufferCount": 500,
                "basicMaterialDataBufferCount": 50,
                "lightMaterialDataBufferCount": 50
              }
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => RenderHardwareInstanceTool.testProgram(sandbox, _prepare, state)
      );
      describe(
        "send attribute record",
        () =>
          describe(
            "send sourceInstance gameObject's a_position",
            () =>
              RenderHardwareInstanceTool.testAttachBufferToAttribute(
                sandbox,
                ("a_position", 0, 3),
                _prepare,
                state
              )
          )
      );
      describe(
        "send uniform record",
        () => {
          RenderHardwareInstanceTool.testSendShaderUniformData(
            sandbox,
            (_prepare, _createSourceInstanceGameObject),
            state
          );
          GLSLSenderTool.JudgeSendUniformData.testSendVector3(
            sandbox,
            "u_color",
            (_, (gameObjectTransform, material), (cameraTransform, basicCameraView), state) =>
              state |> BasicMaterialAPI.setBasicMaterialColor(material, [|0., 1., 0.2|]),
            [0., 1., 0.2],
            ()
          )
        }
      );
      describe(
        "send instance record",
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
                  let state =
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  getCallCount(createBuffer) |> expect == 3
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
                  let state =
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  getCallCount(createBuffer) |> expect == 3
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
                        SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
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
                        createBuffer |> onCall(2) |> returns(buffer1) |> ignore;
                        createBuffer |> onCall(3) |> returns(buffer2) |> ignore;
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
                          let state =
                            state
                            |> RenderJobsTool.initSystemAndRender
                            |> DirectorTool.runWithDefaultTime;
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
                          let state =
                            state
                            |> RenderJobsTool.initSystemAndRender
                            |> DirectorTool.runWithDefaultTime;
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
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
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
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      bufferData
                      |> withThreeArgs(array_buffer, 8192, dynamic_draw)
                      |> expect
                      |> toCalledOnce
                    }
                  );
                  describe(
                    "fix bug",
                    () =>
                      describe(
                        "test in the next render(if current capacity >= target capacity)",
                        () => {
                          test(
                            "should use the instance buffer created in the previous render",
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
                              let state = state |> RenderJobsTool.initSystemAndRender;
                              let state = state |> DirectorTool.runWithDefaultTime;
                              InstanceBufferTool.getOrCreateBuffer(
                                sourceInstance,
                                InstanceBufferTool.getDefaultCapacity(),
                                state
                              )
                              |> expect == buffer
                            }
                          );
                          test(
                            "shouldn't create instance buffer",
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
                              let state = state |> RenderJobsTool.initSystemAndRender;
                              let state = state |> DirectorTool.runWithDefaultTime;
                              let callCount = createBuffer |> getCallCount;
                              let state = state |> DirectorTool.runWithDefaultTime;
                              createBuffer |> getCallCount |> expect == callCount
                            }
                          )
                        }
                      )
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
                         let state = state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                         bindBuffer
                         |> withTwoArgs(array_buffer, Js.Nullable.null)
                         |> expect
                         |> toCalledOnce
                       }
                     ) */
                }
              )
            }
          );
          describe(
            "send modelMatrix record",
            () => {
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
                    "buffer sub record",
                    () => {
                      let (state, gameObject, sourceInstance, objectInstanceGameObject) =
                        _prepare(sandbox, state^);
                      let sourceTransform =
                        state |> GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject);
                      let objectTransform =
                        state
                        |> GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             objectInstanceGameObject
                           );
                      let pos1 = (1., 2., 3.);
                      let pos2 = (2., 4., 5.);
                      let state =
                        state
                        |> TransformAPI.setTransformLocalPosition(sourceTransform, pos1)
                        |> TransformAPI.setTransformLocalPosition(objectInstanceGameObject, pos2);
                      let array_buffer = 1;
                      let bufferSubData = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~array_buffer, ~bufferSubData, ())
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      let record = Js.Typed_array.Float32Array.fromLength(64 * 16);
                      let transformArr = [|sourceTransform, objectTransform|];
                      ArrayService.range(0, 1)
                      |> WonderCommonlib.ArrayService.reduceOneParam(
                           [@bs]
                           (
                             (offset, index) => {
                               let transform = transformArr[index];
                               TypeArrayService.fillFloat32ArrayWithOffset(
                                 record,
                                 TransformTool.getLocalToWorldMatrixTypeArray(transform, state),
                                 offset
                               );
                               offset + 16
                             }
                           ),
                           0
                         )
                      |> ignore;
                      ArrayService.range(2, 63)
                      |> WonderCommonlib.ArrayService.reduceOneParam(
                           [@bs]
                           (
                             (offset, index) => {
                               TypeArrayService.fillFloat32ArrayWithOffset(
                                 record,
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
                      |> withThreeArgs(array_buffer, 0, record)
                      |> expect
                      |> toCalledOnce
                    }
                  )
                }
              );
              describe(
                "handle instance record position",
                () => {
                  let _prepareForHandleInstanceData = (sandbox, state) => {
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
                      GLSLLocationTool.getAttribLocation(~pos=pos1, sandbox, "a_mVec4_0");
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
                  describe(
                    "vertexAttribPointer instance record",
                    () => {
                      let _prepareForTestVertexAttribPointer = (sandbox, state) =>
                        RenderBasicHardwareInstanceTool.prepareForTestVertexAttribPointer(
                          sandbox,
                          _prepareForHandleInstanceData,
                          state
                        );
                      test(
                        "test first record",
                        () => {
                          let (state, float, (pos1, pos2, pos3, pos4), vertexAttribPointer) =
                            _prepareForTestVertexAttribPointer(sandbox, state);
                          vertexAttribPointer
                          |> expect
                          |> toCalledWith([|pos1, 4, float, Obj.magic(Js.false_), 64, 0|])
                        }
                      );
                      test(
                        "test second record",
                        () => {
                          let (state, float, (pos1, pos2, pos3, pos4), vertexAttribPointer) =
                            _prepareForTestVertexAttribPointer(sandbox, state);
                          vertexAttribPointer
                          |> expect
                          |> toCalledWith([|pos2, 4, float, Obj.magic(Js.false_), 64, 16|])
                        }
                      );
                      test(
                        "test third record",
                        () => {
                          let (state, float, (pos1, pos2, pos3, pos4), vertexAttribPointer) =
                            _prepareForTestVertexAttribPointer(sandbox, state);
                          vertexAttribPointer
                          |> expect
                          |> toCalledWith([|pos3, 4, float, Obj.magic(Js.false_), 64, 32|])
                        }
                      );
                      test(
                        "test fourth record",
                        () => {
                          let (state, float, (pos1, pos2, pos3, pos4), vertexAttribPointer) =
                            _prepareForTestVertexAttribPointer(sandbox, state);
                          vertexAttribPointer
                          |> expect
                          |> toCalledWith([|pos4, 4, float, Obj.magic(Js.false_), 64, 48|])
                        }
                      )
                    }
                  );
                  test(
                    "vertexAttribDivisorANGLE 1",
                    () => {
                      let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                        _prepareForHandleInstanceData(sandbox, state);
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
                      let state = state |> DirectorTool.runWithDefaultTime;
                      (
                        vertexAttribDivisorANGLE |> withTwoArgs(pos1, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos2, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos3, 1) |> getCallCount,
                        vertexAttribDivisorANGLE |> withTwoArgs(pos4, 1) |> getCallCount
                      )
                      |> expect == (1, 1, 1, 1)
                    }
                  );
                  test(
                    "enableVertexAttribArray instance record",
                    () => {
                      let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                        _prepareForHandleInstanceData(sandbox, state);
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
                      let state = state |> DirectorTool.runWithDefaultTime;
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
                    "optimize",
                    () =>
                      describe(
                        "add isTransformStatic logic",
                        () => {
                          let _prepareForBufferSubData = (sandbox, isStatic, state) => {
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
                              _prepare(sandbox, state^);
                            let state =
                              SourceInstanceAPI.markSourceInstanceModelMatrixIsStatic(
                                sourceInstance,
                                isStatic,
                                state
                              );
                            let bufferSubData = createEmptyStubWithJsObjSandbox(sandbox);
                            let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                            let state =
                              state
                              |> FakeGlTool.setFakeGl(
                                   FakeGlTool.buildFakeGl(
                                     ~sandbox,
                                     ~bufferSubData,
                                     ~bindBuffer,
                                     ()
                                   )
                                 );
                            let state = state |> RenderJobsTool.initSystemAndRender;
                            (state, sourceInstance, (bufferSubData, bindBuffer))
                          };
                          describe(
                            "if isTransformStatic is true",
                            () => {
                              test(
                                "if not send record before, send record",
                                () => {
                                  let (state, _, (bufferSubData, bindBuffer)) =
                                    _prepareForBufferSubData(sandbox, Js.true_, state);
                                  let state = state |> DirectorTool.runWithDefaultTime;
                                  bufferSubData |> expect |> toCalledOnce
                                }
                              );
                              describe(
                                "else",
                                () => {
                                  test(
                                    "not buffer record",
                                    () => {
                                      let (state, _, (bufferSubData, bindBuffer)) =
                                        _prepareForBufferSubData(sandbox, Js.true_, state);
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      bufferSubData |> expect |> toCalledOnce
                                    }
                                  );
                                  test(
                                    "bind instance buffer",
                                    () => {
                                      let (state, _, (bufferSubData, bindBuffer)) =
                                        _prepareForBufferSubData(sandbox, Js.true_, state);
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let callCount = bindBuffer |> getCallCount;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      bindBuffer |> getCallCount |> expect == callCount + 3
                                    }
                                  );
                                  describe(
                                    "vertexAttribPointer instance record",
                                    () => {
                                      let _prepareForTestVertexAttribPointer = (sandbox, state) =>
                                        RenderBasicHardwareInstanceTool.prepareForTestVertexAttribPointer(
                                          sandbox,
                                          _prepareForHandleInstanceData,
                                          state
                                        );
                                      test(
                                        "test first record",
                                        () => {
                                          let (
                                            state,
                                            float,
                                            (pos1, pos2, pos3, pos4),
                                            vertexAttribPointer
                                          ) =
                                            _prepareForTestVertexAttribPointer(sandbox, state);
                                          let callCount = vertexAttribPointer |> getCallCount;
                                          let state = state |> DirectorTool.runWithDefaultTime;
                                          vertexAttribPointer
                                          |> getCall(callCount + 1)
                                          |> expect
                                          |> toCalledWith([|
                                               pos1,
                                               4,
                                               float,
                                               Obj.magic(Js.false_),
                                               64,
                                               0
                                             |])
                                        }
                                      )
                                    }
                                  );
                                  test(
                                    "vertexAttribDivisorANGLE 1",
                                    () => {
                                      let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                                        _prepareForHandleInstanceData(sandbox, state);
                                      let vertexAttribDivisorANGLE =
                                        Obj.magic(
                                          InstanceTool.getExtensionInstancedArrays(state)##vertexAttribDivisorANGLE
                                        );
                                      let state =
                                        state
                                        |> FakeGlTool.setFakeGl(
                                             FakeGlTool.buildFakeGl(
                                               ~sandbox,
                                               ~getAttribLocation,
                                               ()
                                             )
                                           );
                                      let state = state |> RenderJobsTool.initSystemAndRender;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      (
                                        vertexAttribDivisorANGLE
                                        |> withTwoArgs(pos1, 1)
                                        |> getCallCount,
                                        vertexAttribDivisorANGLE
                                        |> withTwoArgs(pos2, 1)
                                        |> getCallCount,
                                        vertexAttribDivisorANGLE
                                        |> withTwoArgs(pos3, 1)
                                        |> getCallCount,
                                        vertexAttribDivisorANGLE
                                        |> withTwoArgs(pos4, 1)
                                        |> getCallCount
                                      )
                                      |> expect == (2, 2, 2, 2)
                                    }
                                  );
                                  test(
                                    "not enableVertexAttribArray instance record(because alreay enable before)",
                                    () => {
                                      let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                                        _prepareForHandleInstanceData(sandbox, state);
                                      let enableVertexAttribArray =
                                        createEmptyStubWithJsObjSandbox(sandbox);
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
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      (
                                        enableVertexAttribArray |> withOneArg(pos1) |> getCallCount,
                                        enableVertexAttribArray |> withOneArg(pos2) |> getCallCount,
                                        enableVertexAttribArray |> withOneArg(pos3) |> getCallCount,
                                        enableVertexAttribArray |> withOneArg(pos4) |> getCallCount
                                      )
                                      |> expect == (1, 1, 1, 1)
                                    }
                                  )
                                }
                              )
                            }
                          );
                          describe(
                            "else",
                            () =>
                              test(
                                "send record",
                                () => {
                                  let (state, sourceInstance, (bufferSubData, _)) =
                                    _prepareForBufferSubData(sandbox, Js.false_, state);
                                  let state = state |> DirectorTool.runWithDefaultTime;
                                  bufferSubData |> expect |> toCalledOnce
                                }
                              )
                          );
                          describe(
                            "support switch static to dynamic",
                            () =>
                              describe(
                                "test after switch",
                                () =>
                                  test(
                                    "send record",
                                    () => {
                                      let (state, sourceInstance, (bufferSubData, _)) =
                                        _prepareForBufferSubData(sandbox, Js.false_, state);
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state =
                                        SourceInstanceAPI.markSourceInstanceModelMatrixIsStatic(
                                          sourceInstance,
                                          Js.false_,
                                          state
                                        );
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
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
                                    "send record in the next render, and not send record in the next next render",
                                    () => {
                                      let (state, sourceInstance, (bufferSubData, _)) =
                                        _prepareForBufferSubData(sandbox, Js.false_, state);
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state =
                                        SourceInstanceAPI.markSourceInstanceModelMatrixIsStatic(
                                          sourceInstance,
                                          Js.true_,
                                          state
                                        );
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
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
                                    "send record in the next render, and not send record in the next next render",
                                    () => {
                                      let (state, sourceInstance, (bufferSubData, _)) =
                                        _prepareForBufferSubData(sandbox, Js.false_, state);
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state =
                                        SourceInstanceAPI.markSourceInstanceModelMatrixIsStatic(
                                          sourceInstance,
                                          Js.false_,
                                          state
                                        );
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state =
                                        SourceInstanceAPI.markSourceInstanceModelMatrixIsStatic(
                                          sourceInstance,
                                          Js.true_,
                                          state
                                        );
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      bufferSubData |> getCallCount |> expect == 3
                                    }
                                  )
                              )
                          )
                        }
                      )
                  )
                }
              )
            }
          )
        }
      );
      describe(
        "draw instance",
        () => {
          describe(
            "test source gameObject has box geometry component",
            () =>
              RenderHardwareInstanceTool.testDrawElementsInstancedANGLE(
                sandbox,
                RenderBasicHardwareInstanceTool.prepare,
                BoxGeometryTool.getIndicesCount,
                state
              )
          );
          describe(
            "test source gameObject has custom geometry component",
            () =>
              RenderHardwareInstanceTool.testDrawElementsInstancedANGLE(
                sandbox,
                RenderBasicHardwareInstanceTool.prepareWithCustomGeometry,
                CustomGeometryTool.getIndicesCount,
                state
              )
          )
        }
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
             let state = state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
             bindBuffer
             |> withTwoArgs(array_buffer, Js.Nullable.null)
             |> expect
             |> toCalledOnce
           }
         ) */
    }
  );