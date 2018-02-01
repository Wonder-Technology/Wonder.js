open Wonder_jest;

let _ =
  describe(
    "test front_render_light job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _render = (state: StateDataType.state) => state |> WebGLRenderTool.render;
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithJobConfig(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, _) = AmbientLightTool.createAmbientLightGameObject(state);
            let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
            state
          };
          let _prepareForUseProgram = (sandbox, state) =>
            RenderJobsTool.prepareForUseProgram(sandbox, _prepare, state);
          test(
            "test",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.initSystemAndRender |> _render;
              useProgram |> expect |> toCalledWith([|program|])
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
          )
        }
      );
      describe(
        "send attribute data",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, _) = AmbientLightTool.createAmbientLightGameObject(state);
            let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
            state
          };
          describe(
            "init vbo buffers when first send",
            () => {
              let _prepare = (sandbox, state) => {
                let (state, gameObject, geometry, _, _) =
                  FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
                (state, geometry)
              };
              test(
                "create buffers",
                () => {
                  let (state, _) = _prepare(sandbox, state^);
                  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
                  let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                  getCallCount(createBuffer) |> expect == 3
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
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      let vertices = Geometry.getGeometryVertices(geometry, state);
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
                "init normal buffer",
                () =>
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
                      let normals = Geometry.getGeometryNormals(geometry, state);
                      bufferData
                      |> withThreeArgs(array_buffer, normals, static_draw)
                      |> expect
                      |> toCalledOnce
                    }
                  )
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
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      let indices = Geometry.getGeometryIndices(geometry, state);
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
            "send buffer",
            () => {
              describe(
                "optimize",
                () => {
                  let _prepare = (sandbox, state) => {
                    let (state, _, geometry, _, _) =
                      FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                    let (state, _, _) = AmbientLightTool.createAmbientLightGameObject(state);
                    let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
                    (state, geometry)
                  };
                  test(
                    "if lastSendGeometry === geometryIndex, not send",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let (state, _, _, _, _) =
                        FrontRenderLightJobTool.prepareGameObjectWithSharedGeometry(
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
                      let state = state |> _render;
                      vertexAttribPointer |> getCallCount |> expect == 2 * 1
                    }
                  );
                  test(
                    "else, send",
                    () => {
                      let (state, geometry) = _prepare(sandbox, state^);
                      let (state, _, _, _, _) =
                        FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender;
                      let state = state |> _render;
                      let state = state |> _render;
                      vertexAttribPointer |> getCallCount |> expect == 4 * 2
                    }
                  )
                }
              );
              describe(
                "send a_position",
                () =>
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
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      vertexAttribPointer
                      |> expect
                      |> toCalledWith([|pos, 3, float, Obj.magic(Js.false_), 0, 0|])
                    }
                  )
              );
              describe(
                "send a_normal",
                () =>
                  test(
                    "attach buffer to attribute",
                    () => {
                      let state = _prepare(sandbox, state^);
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                      let createBuffer =
                        createEmptyStubWithJsObjSandbox(sandbox)
                        |> SinonTool.returnDifferentOnEachCall;
                      let pos = 0;
                      let getAttribLocation =
                        GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_normal");
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~float,
                               ~createBuffer,
                               ~vertexAttribPointer,
                               ~getAttribLocation,
                               ()
                             )
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                      vertexAttribPointer
                      |> expect
                      |> toCalledWith([|pos, 3, float, Obj.magic(Js.false_), 0, 0|])
                    }
                  )
              )
            }
          )
        }
      );
      describe(
        "send uniform data",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, gameObject, _, material, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, light) = AmbientLightTool.createAmbientLightGameObject(state);
            let (state, _, cameraTransform, _) =
              CameraControllerTool.createCameraGameObject(state);
            (state, gameObject, material, light, cameraTransform)
          };
          describe(
            "test sended data per shader",
            () => {
              let _testSendShaderUniformDataOnlyOnce =
                  (name, prepareSendUinformDataFunc, setFakeGlFunc) =>
                RenderJobsTool.testSendShaderUniformDataOnlyOnce(
                  sandbox,
                  name,
                  (
                    prepareSendUinformDataFunc,
                    setFakeGlFunc,
                    FrontRenderLightJobTool.prepareGameObject
                  ),
                  state
                );
              let testSendShaderUniformMatrix4DataOnlyOnce = (name, prepareSendUinformDataFunc) =>
                RenderJobsTool.testSendShaderUniformMatrix4DataOnlyOnce(
                  sandbox,
                  name,
                  (prepareSendUinformDataFunc, FrontRenderLightJobTool.prepareGameObject),
                  state
                );
              let testSendShaderUniformMatrix3DataOnlyOnce = (name, prepareSendUinformDataFunc) =>
                RenderJobsTool.testSendShaderUniformMatrix3DataOnlyOnce(
                  sandbox,
                  name,
                  (prepareSendUinformDataFunc, FrontRenderLightJobTool.prepareGameObject),
                  state
                );
              let testSendShaderUniformVec3DataOnlyOnce = (name, prepareSendUinformDataFunc) =>
                RenderJobsTool.testSendShaderUniformVec3DataOnlyOnce(
                  sandbox,
                  name,
                  (prepareSendUinformDataFunc, FrontRenderLightJobTool.prepareGameObject),
                  state
                );
              GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
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
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                ~testFunc=
                  (_prepareSendUinformData) =>
                    testSendShaderUniformMatrix4DataOnlyOnce("u_vMatrix", _prepareSendUinformData),
                ()
              );
              GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
                sandbox,
                "u_pMatrix",
                (gameObjectTransform, cameraTransform, cameraController, state) => state,
                CameraControllerTool.getPMatrixOfCreateCameraControllerPerspectiveCamera(),
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                ~testFunc=
                  (_prepareSendUinformData) =>
                    testSendShaderUniformMatrix4DataOnlyOnce("u_pMatrix", _prepareSendUinformData),
                ()
              );
              GLSLSenderTool.JudgeSendUniformData.testSendMatrix3(
                sandbox,
                "u_normalMatrix",
                (gameObjectTransform, cameraTransform, _, state) =>
                  state |> Transform.setTransformLocalPosition(cameraTransform, (10., 2., 3.)),
                Js.Typed_array.Float32Array.make([|1., 0., 0., (-1.), 1., 0., 0., 0., 1.|]),
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                ~testFunc=
                  (_prepareSendUinformData) =>
                    testSendShaderUniformMatrix3DataOnlyOnce(
                      "u_normalMatrix",
                      _prepareSendUinformData
                    ),
                ()
              );
              GLSLSenderTool.JudgeSendUniformData.testSendVector3(
                sandbox,
                "u_cameraPos",
                (_, _, (cameraTransform, _), state) =>
                  state |> Transform.setTransformLocalPosition(cameraTransform, (10., 2., 3.)),
                [10., 2., 3.],
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                ~testFunc=
                  (_prepareSendUinformData) =>
                    testSendShaderUniformVec3DataOnlyOnce("u_cameraPos", _prepareSendUinformData),
                ()
              );
              /* describe(
                   "send u_cameraPos",
                   () =>
                     test(
                       "test send",
                       () => {
                         let _prepare = (sandbox, state) => {
                           let (state, gameObject, _, material, _) =
                             FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                           let (state, _, light) =
                             AmbientLightTool.createAmbientLightGameObject(state);
                           let (state, _, cameraTransform, _) =
                             CameraControllerTool.createCameraGameObject(state);
                           (state, gameObject, material, light, cameraTransform)
                         };
                         let (state, gameObject, material, light, cameraTransform) =
                           _prepare(sandbox, state^);
                         let state =
                           state
                           |> Transform.setTransformLocalPosition(cameraTransform, (10., 2., 3.));
                         let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                         let pos = 0;
                         let getUniformLocation =
                           GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_cameraPos");
                         let state =
                           state
                           |> FakeGlTool.setFakeGl(
                                FakeGlTool.buildFakeGl(~sandbox, ~uniform3f, ~getUniformLocation, ())
                              );
                         let state =
                           state
                           |> RenderJobsTool.initSystemAndRender
                           |> RenderJobsTool.updateSystem
                           |> _render;
                         uniform3f
                         |> expect
                         |> toCalledWith(
                              [|pos|] |> Js.Array.concat([10., 2., 3.] |> Obj.magic |> Array.of_list)
                            )
                       }
                     )
                 ); */
              describe(
                "test send light data",
                () =>
                  describe(
                    "test send ambient light data",
                    () => {
                      test(
                        "send u_ambient",
                        () => {
                          let (state, gameObject, material, light, cameraTransform) =
                            _prepare(sandbox, state^);
                          let state =
                            state |> AmbientLight.setAmbientLightColor(light, [|1., 0., 0.5|]);
                          let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                          let pos = 0;
                          let getUniformLocation =
                            GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_ambient");
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
                            |> RenderJobsTool.updateSystem
                            |> _render;
                          uniform3f
                          |> expect
                          |> toCalledWith
                               /* [|pos|]
                                  |> Js.Array.concat([10., 2., 3.] |> Obj.magic |> Array.of_list) */
                               ([|pos |> Obj.magic, 1., 0., 0.5|])
                        }
                      );
                      test(
                        "send shader data only once",
                        () => {
                          let (state, gameObject, material, light, cameraTransform) =
                            _prepare(sandbox, state^);
                          let (state, gameObject2, _, _, _) =
                            FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                          let state =
                            state |> AmbientLight.setAmbientLightColor(light, [|1., 0., 0.5|]);
                          let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                          let pos = 0;
                          let getUniformLocation =
                            GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_ambient");
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
                            |> RenderJobsTool.updateSystem
                            |> _render;
                          uniform3f |> withOneArg(pos) |> getCallCount |> expect == 1
                        }
                      )
                    }
                  )
              )
              /* GLSLSenderTool.JudgeSendUniformData.testSendShaderVector3(
                   sandbox,
                   "u_ambient",
                   (lightGameObject, _, _, state) => {
                     let light =
                       GameObject.getGameObjectAmbientLightComponent(
                         lightGameObject,
                         state
                       );
                     AmbientLight.setAmbientLightColor(light, [|1., 0., 0.5|], state)
                   },
                   [1., 0., 0.5],
                   ~prepareGameObjectFunc=
                     (sandbox, state) => {
                       let (state, gameObject, geometry, material, meshRenderer) =
                         FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                       /* (state, gameObject, geometry, material, meshRenderer) */
                       let (state, lightGameObject, light) =
                         AmbientLightTool.createAmbientLightGameObject(state);
                       (state, lightGameObject, light, material, geometry)
                     },
                   ~testFunc=
                     (_prepareSendUinformData) =>
                       testSendShaderUniformVec3DataOnlyOnce(
                         "u_ambient",
                         _prepareSendUinformData
                       ),
                   ()
                 ) */
            }
          );
          describe(
            "test send map data",
            () => {
              GLSLSenderTool.JudgeSendUniformData.testSendVector3(
                sandbox,
                "u_diffuse",
                (_, (gameObjectTransform, material), (cameraTransform, cameraController), state) =>
                  state |> LightMaterial.setLightMaterialDiffuseColor(material, [|1., 0., 0.5|]),
                [1., 0., 0.5],
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                ()
              );
              GLSLSenderTool.JudgeSendUniformData.testSendVector3(
                sandbox,
                "u_specular",
                (_, (gameObjectTransform, material), (cameraTransform, cameraController), state) =>
                  state |> LightMaterial.setLightMaterialSpecularColor(material, [|1., 0., 0.5|]),
                [1., 0., 0.5],
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                ()
              )
            }
          );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
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
            ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
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
                  FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
                (state, geometry)
              };
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
    }
  );