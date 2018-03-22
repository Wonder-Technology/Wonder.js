open Wonder_jest;

let _ =
  describe(
    "test front render light job",
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
            let (state, _, _, _, _) = FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, _) = AmbientLightTool.createGameObject(state);
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
        }
      );
      describe(
        "send attribute record",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, _) = AmbientLightTool.createGameObject(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          describe(
            "init vbo buffers when first send",
            () => {
              let _prepare = (sandbox, state) => {
                let (state, gameObject, geometry, _, _) =
                  FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
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
                  let state =
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
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
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      let vertices = BoxGeometryAPI.getBoxGeometryVertices(geometry, state);
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
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      let normals = BoxGeometryAPI.getBoxGeometryNormals(geometry, state);
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
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      let indices = BoxGeometryAPI.getBoxGeometryIndices(geometry, state);
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
                      FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                    let (state, _, _) = AmbientLightTool.createGameObject(state);
                    let (state, _, _, _) = CameraTool.createCameraGameObject(state);
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
                      let state = state |> DirectorTool.runWithDefaultTime;
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
                      let state = state |> DirectorTool.runWithDefaultTime;
                      let state = state |> DirectorTool.runWithDefaultTime;
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
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
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
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
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
        "send uniform record",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, gameObject, _, material, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, light) = AmbientLightTool.createGameObject(state);
            let (state, _, cameraTransform, _) =
              CameraTool.createCameraGameObject(state);
            (state, gameObject, material, light, cameraTransform)
          };
          describe(
            "test sended record per shader",
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
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
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
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                ~testFunc=
                  (_prepareSendUinformData) =>
                    testSendShaderUniformMatrix4DataOnlyOnce("u_pMatrix", _prepareSendUinformData),
                ()
              );
              GLSLSenderTool.JudgeSendUniformData.testSendVector3(
                sandbox,
                "u_cameraPos",
                (_, _, (cameraTransform, _), state) =>
                  state |> TransformAPI.setTransformLocalPosition(cameraTransform, (10., 2., 3.)),
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
                             AmbientLightTool.createGameObject(state);
                           let (state, _, cameraTransform, _) =
                             CameraTool.createCameraGameObject(state);
                           (state, gameObject, material, light, cameraTransform)
                         };
                         let (state, gameObject, material, light, cameraTransform) =
                           _prepare(sandbox, state^);
                         let state =
                           state
                           |> TransformAPI.setTransformLocalPosition(cameraTransform, (10., 2., 3.));
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

                           |> DirectorTool.runWithDefaultTime;
                         uniform3f
                         |> expect
                         |> toCalledWith(
                              [|pos|] |> Js.Array.concat([10., 2., 3.] |> Obj.magic |> Array.of_list)
                            )
                       }
                     )
                 ); */
              describe(
                "test send light record",
                () => {
                  describe(
                    "test send ambient light record",
                    () => {
                      let _setFakeGl = (sandbox, state) => {
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
                        (state, pos, uniform3f)
                      };
                      test(
                        "send u_ambient",
                        () => {
                          let (state, gameObject, material, light, cameraTransform) =
                            _prepare(sandbox, state^);
                          let state =
                            state |> AmbientLightAPI.setAmbientLightColor(light, [|1., 0., 0.5|]);
                          let (state, pos, uniform3f) = _setFakeGl(sandbox, state);
                          let state =
                            state
                            |> RenderJobsTool.initSystemAndRender
                            |> DirectorTool.runWithDefaultTime;
                          uniform3f
                          |> expect
                          |> toCalledWith
                               /* [|pos|]
                                  |> Js.Array.concat([10., 2., 3.] |> Obj.magic |> Array.of_list) */
                               ([|pos |> Obj.magic, 1., 0., 0.5|])
                        }
                      );
                      test(
                        "send shader record only once",
                        () => {
                          let (state, gameObject, material, light, cameraTransform) =
                            _prepare(sandbox, state^);
                          let (state, gameObject2, _, _, _) =
                            FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                          let state =
                            state |> AmbientLightAPI.setAmbientLightColor(light, [|1., 0., 0.5|]);
                          let (state, pos, uniform3f) = _setFakeGl(sandbox, state);
                          let state =
                            state
                            |> RenderJobsTool.initSystemAndRender
                            |> DirectorTool.runWithDefaultTime;
                          uniform3f |> withOneArg(pos) |> getCallCount |> expect == 1
                        }
                      );
                      test(
                        "test send after dispose one",
                        () => {
                          let (state, gameObject, material, light, cameraTransform) =
                            _prepare(sandbox, state^);
                          let lightGameObject1 =
                            AmbientLightAPI.unsafeGetAmbientLightGameObject(light, state);
                          let (state, lightGameObject2, light2) =
                            AmbientLightTool.createGameObject(state);
                          let (state, lightGameObject3, light3) =
                            AmbientLightTool.createGameObject(state);
                          let color1 = [|1., 0., 0.5|];
                          let color2 = [|0., 1., 0.5|];
                          let color3 = [|0., 0., 1.|];
                          let state = state |> AmbientLightAPI.setAmbientLightColor(light, color1);
                          let state = state |> AmbientLightAPI.setAmbientLightColor(light2, color2);
                          let state = state |> AmbientLightAPI.setAmbientLightColor(light3, color3);
                          let state = state |> GameObjectAPI.disposeGameObject(lightGameObject1);
                          let (state, pos, uniform3f) = _setFakeGl(sandbox, state);
                          let state =
                            state
                            |> RenderJobsTool.initSystemAndRender
                            |> DirectorTool.runWithDefaultTime;
                          let stub = uniform3f |> withOneArg(pos);
                          (
                            stub |> Obj.magic |> getSpecificArg(0),
                            stub |> Obj.magic |> getSpecificArg(1)
                          )
                          |>
                          expect == (
                                      [pos |> Obj.magic, ...color3 |> Array.to_list],
                                      [pos |> Obj.magic, ...color2 |> Array.to_list]
                                    )
                        }
                      )
                    }
                  );
                  describe(
                    "test send direction light record",
                    () => {
                      let _prepareOne = (sandbox, state) => {
                        let (state, gameObject, _, material, _) =
                          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                        let (state, lightGameObject, light) =
                          DirectionLightTool.createGameObject(state);
                        let (state, _, cameraTransform, _) =
                          CameraTool.createCameraGameObject(state);
                        (state, lightGameObject, material, light, cameraTransform)
                      };
                      let _prepareFour = (sandbox, state) => {
                        let (state, gameObject, _, material, _) =
                          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                        let (state, lightGameObject1, light1) =
                          DirectionLightTool.createGameObject(state);
                        let (state, lightGameObject2, light2) =
                          DirectionLightTool.createGameObject(state);
                        let (state, lightGameObject3, light3) =
                          DirectionLightTool.createGameObject(state);
                        let (state, lightGameObject4, light4) =
                          DirectionLightTool.createGameObject(state);
                        let (state, _, cameraTransform, _) =
                          CameraTool.createCameraGameObject(state);
                        (
                          state,
                          (lightGameObject1, lightGameObject2, lightGameObject3, lightGameObject4),
                          material,
                          (light1, light2, light3, light4),
                          cameraTransform
                        )
                      };
                      let _setFakeGl = (sandbox, nameArr, state) => {
                        let uniform1f = createEmptyStubWithJsObjSandbox(sandbox);
                        let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                        let posArr = nameArr |> Js.Array.mapi((_, index) => index);
                        let getUniformLocation =
                          GLSLLocationTool.getUniformLocationWithNameArr(
                            sandbox,
                            Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                            nameArr,
                            posArr
                          );
                        let state =
                          state
                          |> FakeGlTool.setFakeGl(
                               FakeGlTool.buildFakeGl(
                                 ~sandbox,
                                 ~uniform1f,
                                 ~uniform3f,
                                 ~getUniformLocation,
                                 ()
                               )
                             );
                        (state, posArr, (uniform1f, uniform3f))
                      };
                      describe(
                        "send structure record",
                        () => {
                          describe(
                            "send position",
                            () => {
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let position = (1., 2., 3.);
                                  let state =
                                    state
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject,
                                           state
                                         ),
                                         position
                                       );
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(
                                      sandbox,
                                      [|"u_directionLights[0].position"|],
                                      state
                                    );
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform3f
                                  |> expect
                                  |> toCalledWith([|posArr[0] |> Obj.magic, 1., 2., 3.|])
                                }
                              );
                              test(
                                "test four lights",
                                () => {
                                  let (
                                    state,
                                    (
                                      lightGameObject1,
                                      lightGameObject2,
                                      lightGameObject3,
                                      lightGameObject4
                                    ),
                                    material,
                                    (light1, light2, light3, light4),
                                    cameraTransform
                                  ) =
                                    _prepareFour(sandbox, state^);
                                  let state =
                                    state
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject1,
                                           state
                                         ),
                                         (1., 2., 3.)
                                       )
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject2,
                                           state
                                         ),
                                         (2., 2., 3.)
                                       )
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject3,
                                           state
                                         ),
                                         (3., 2., 3.)
                                       )
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject4,
                                           state
                                         ),
                                         (4., 2., 3.)
                                       );
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(
                                      sandbox,
                                      [|
                                        "u_directionLights[0].position",
                                        "u_directionLights[1].position",
                                        "u_directionLights[2].position",
                                        "u_directionLights[3].position"
                                      |],
                                      state
                                    );
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  (
                                    uniform3f |> withOneArg(posArr[0]) |> getCall(0) |> getArgs,
                                    uniform3f |> withOneArg(posArr[1]) |> getCall(0) |> getArgs,
                                    uniform3f |> withOneArg(posArr[2]) |> getCall(0) |> getArgs,
                                    uniform3f |> withOneArg(posArr[3]) |> getCall(0) |> getArgs
                                  )
                                  |>
                                  expect == (
                                              [posArr[0] |> Obj.magic, 1., 2., 3.],
                                              [posArr[1] |> Obj.magic, 2., 2., 3.],
                                              [posArr[2] |> Obj.magic, 3., 2., 3.],
                                              [posArr[3] |> Obj.magic, 4., 2., 3.]
                                            )
                                }
                              )
                            }
                          );
                          describe(
                            "send color",
                            () =>
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let color = [|1., 0., 0.|];
                                  let state =
                                    state |> DirectionLightAPI.setDirectionLightColor(light, color);
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(sandbox, [|"u_directionLights[0].color"|], state);
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform3f
                                  |> expect
                                  |> toCalledWith(
                                       [|posArr[0] |> Obj.magic|] |> Js.Array.concat(color)
                                     )
                                }
                              )
                          );
                          describe(
                            "send intensity",
                            () =>
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let intensity = 2.;
                                  let state =
                                    state
                                    |> DirectionLightAPI.setDirectionLightIntensity(light, intensity);
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(
                                      sandbox,
                                      [|"u_directionLights[0].intensity"|],
                                      state
                                    );
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform1f
                                  |> expect
                                  |> toCalledWith(
                                       [|posArr[0] |> Obj.magic|] |> ArrayService.push(intensity)
                                     )
                                }
                              )
                          )
                        }
                      )
                    }
                  );
                  describe(
                    "test send point light record",
                    () => {
                      let _prepareOne = (sandbox, state) => {
                        let (state, gameObject, _, material, _) =
                          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                        let (state, lightGameObject, light) =
                          PointLightTool.createGameObject(state);
                        let (state, _, cameraTransform, _) =
                          CameraTool.createCameraGameObject(state);
                        (state, lightGameObject, material, light, cameraTransform)
                      };
                      let _prepareFour = (sandbox, state) => {
                        let (state, gameObject, _, material, _) =
                          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                        let (state, lightGameObject1, light1) =
                          PointLightTool.createGameObject(state);
                        let (state, lightGameObject2, light2) =
                          PointLightTool.createGameObject(state);
                        let (state, lightGameObject3, light3) =
                          PointLightTool.createGameObject(state);
                        let (state, lightGameObject4, light4) =
                          PointLightTool.createGameObject(state);
                        let (state, _, cameraTransform, _) =
                          CameraTool.createCameraGameObject(state);
                        (
                          state,
                          (lightGameObject1, lightGameObject2, lightGameObject3, lightGameObject4),
                          material,
                          (light1, light2, light3, light4),
                          cameraTransform
                        )
                      };
                      let _setFakeGl = (sandbox, nameArr, state) => {
                        let uniform1f = createEmptyStubWithJsObjSandbox(sandbox);
                        let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                        let posArr = nameArr |> Js.Array.mapi((_, index) => index);
                        let getUniformLocation =
                          GLSLLocationTool.getUniformLocationWithNameArr(
                            sandbox,
                            Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                            nameArr,
                            posArr
                          );
                        let state =
                          state
                          |> FakeGlTool.setFakeGl(
                               FakeGlTool.buildFakeGl(
                                 ~sandbox,
                                 ~uniform1f,
                                 ~uniform3f,
                                 ~getUniformLocation,
                                 ()
                               )
                             );
                        (state, posArr, (uniform1f, uniform3f))
                      };
                      describe(
                        "send structure record",
                        () => {
                          describe(
                            "send position",
                            () =>
                              test(
                                "test four lights",
                                () => {
                                  let (
                                    state,
                                    (
                                      lightGameObject1,
                                      lightGameObject2,
                                      lightGameObject3,
                                      lightGameObject4
                                    ),
                                    material,
                                    (light1, light2, light3, light4),
                                    cameraTransform
                                  ) =
                                    _prepareFour(sandbox, state^);
                                  let state =
                                    state
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject1,
                                           state
                                         ),
                                         (1., 2., 3.)
                                       )
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject2,
                                           state
                                         ),
                                         (2., 2., 3.)
                                       )
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject3,
                                           state
                                         ),
                                         (3., 2., 3.)
                                       )
                                    |> TransformAPI.setTransformPosition(
                                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                                           lightGameObject4,
                                           state
                                         ),
                                         (4., 2., 3.)
                                       );
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(
                                      sandbox,
                                      [|
                                        "u_pointLights[0].position",
                                        "u_pointLights[1].position",
                                        "u_pointLights[2].position",
                                        "u_pointLights[3].position"
                                      |],
                                      state
                                    );
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  (
                                    uniform3f |> withOneArg(posArr[0]) |> getCall(0) |> getArgs,
                                    uniform3f |> withOneArg(posArr[1]) |> getCall(0) |> getArgs,
                                    uniform3f |> withOneArg(posArr[2]) |> getCall(0) |> getArgs,
                                    uniform3f |> withOneArg(posArr[3]) |> getCall(0) |> getArgs
                                  )
                                  |>
                                  expect == (
                                              [posArr[0] |> Obj.magic, 1., 2., 3.],
                                              [posArr[1] |> Obj.magic, 2., 2., 3.],
                                              [posArr[2] |> Obj.magic, 3., 2., 3.],
                                              [posArr[3] |> Obj.magic, 4., 2., 3.]
                                            )
                                }
                              )
                          );
                          describe(
                            "send color",
                            () =>
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let color = [|1., 0., 0.|];
                                  let state = state |> PointLightAPI.setPointLightColor(light, color);
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(sandbox, [|"u_pointLights[0].color"|], state);
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform3f
                                  |> expect
                                  |> toCalledWith(
                                       [|posArr[0] |> Obj.magic|] |> Js.Array.concat(color)
                                     )
                                }
                              )
                          );
                          describe(
                            "send intensity",
                            () =>
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let intensity = 2.;
                                  let state =
                                    state |> PointLightAPI.setPointLightIntensity(light, intensity);
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(sandbox, [|"u_pointLights[0].intensity"|], state);
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform1f
                                  |> expect
                                  |> toCalledWith(
                                       [|posArr[0] |> Obj.magic|] |> ArrayService.push(intensity)
                                     )
                                }
                              )
                          );
                          describe(
                            "send constant",
                            () =>
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let constant = 2.;
                                  let state =
                                    state |> PointLightAPI.setPointLightConstant(light, constant);
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(sandbox, [|"u_pointLights[0].constant"|], state);
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform1f
                                  |> expect
                                  |> toCalledWith(
                                       [|posArr[0] |> Obj.magic|] |> ArrayService.push(constant)
                                     )
                                }
                              )
                          );
                          describe(
                            "send linear",
                            () =>
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let linear = 2.;
                                  let state =
                                    state |> PointLightAPI.setPointLightLinear(light, linear);
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(sandbox, [|"u_pointLights[0].linear"|], state);
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform1f
                                  |> expect
                                  |> toCalledWith(
                                       [|posArr[0] |> Obj.magic|] |> ArrayService.push(linear)
                                     )
                                }
                              )
                          );
                          describe(
                            "send quadratic",
                            () =>
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let quadratic = 2.5;
                                  let state =
                                    state |> PointLightAPI.setPointLightQuadratic(light, quadratic);
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(sandbox, [|"u_pointLights[0].quadratic"|], state);
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform1f
                                  |> expect
                                  |> toCalledWith(
                                       [|posArr[0] |> Obj.magic|] |> ArrayService.push(quadratic)
                                     )
                                }
                              )
                          );
                          describe(
                            "send range",
                            () =>
                              test(
                                "test one light",
                                () => {
                                  let (state, lightGameObject, material, light, cameraTransform) =
                                    _prepareOne(sandbox, state^);
                                  let range = 2.;
                                  let state = state |> PointLightAPI.setPointLightRange(light, range);
                                  let (state, posArr, (uniform1f, uniform3f)) =
                                    _setFakeGl(sandbox, [|"u_pointLights[0].range"|], state);
                                  let state =
                                    state
                                    |> RenderJobsTool.initSystemAndRender
                                    |> DirectorTool.runWithDefaultTime;
                                  uniform1f
                                  |> expect
                                  |> toCalledWith(
                                       [|posArr[0] |> Obj.magic|] |> ArrayService.push(range)
                                     )
                                }
                              )
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          );
          describe(
            "test send light material record",
            () => {
              GLSLSenderTool.JudgeSendUniformData.testSendFloat(
                sandbox,
                "u_shininess",
                (_, (gameObjectTransform, material), (cameraTransform, basicCameraView), state) =>
                  state |> LightMaterialAPI.setLightMaterialShininess(material, 30.),
                30.,
                ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                ()
              );
              describe(
                "test send map record",
                () => {
                  GLSLSenderTool.JudgeSendUniformData.testSendVector3(
                    sandbox,
                    "u_diffuse",
                    (
                      _,
                      (gameObjectTransform, material),
                      (cameraTransform, basicCameraView),
                      state
                    ) =>
                      state
                      |> LightMaterialAPI.setLightMaterialDiffuseColor(material, [|1., 0., 0.5|]),
                    [1., 0., 0.5],
                    ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                    ()
                  );
                  GLSLSenderTool.JudgeSendUniformData.testSendVector3(
                    sandbox,
                    "u_specular",
                    (
                      _,
                      (gameObjectTransform, material),
                      (cameraTransform, basicCameraView),
                      state
                    ) =>
                      state
                      |> LightMaterialAPI.setLightMaterialSpecularColor(material, [|1., 0., 0.5|]),
                    [1., 0., 0.5],
                    ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
                    ()
                  )
                }
              )
            }
          );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
            sandbox,
            "u_mMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.)),
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
          );
          GLSLSenderTool.JudgeSendUniformData.testSendMatrix3(
            sandbox,
            "u_normalMatrix",
            (gameObjectTransform, cameraTransform, _, state) =>
              state |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (10., 2., 3.)),
            Js.Typed_array.Float32Array.make([|1., 0., 0., 0., 1., 0., 0., 0., 1.|]),
            ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
            ~testFunc=
              (_prepareSendUinformData) => {
                test(
                  "send per each gameObject",
                  () => {
                    let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                      _prepareSendUinformData(
                        sandbox,
                        FrontRenderLightJobTool.prepareGameObject,
                        state^
                      );
                    let (state, gameObject2, _, _, _) =
                      FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                    let state =
                      state
                      |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
                    let uniformMatrix3fv = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 0;
                    let getUniformLocation =
                      GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_normalMatrix");
                    let state =
                      state
                      |> FakeGlTool.setFakeGl(
                           FakeGlTool.buildFakeGl(
                             ~sandbox,
                             ~uniformMatrix3fv,
                             ~getUniformLocation,
                             ()
                           )
                         );
                    let state =
                      state
                      |> RenderJobsTool.initSystemAndRender
                      |> DirectorTool.runWithDefaultTime;
                    uniformMatrix3fv |> expect |> toCalledTwice
                  }
                );
                describe(
                  "test cache",
                  () =>
                    /* TODO test more! when rotation/scale is enable  */
                    test(
                      "test in different loops",
                      () => {
                        let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                          _prepareSendUinformData(
                            sandbox,
                            FrontRenderLightJobTool.prepareGameObject,
                            state^
                          );
                        let state =
                          state
                          |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
                        let uniformMatrix3fv = createEmptyStubWithJsObjSandbox(sandbox);
                        let pos = 0;
                        let getUniformLocation =
                          GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_normalMatrix");
                        let state =
                          state
                          |> FakeGlTool.setFakeGl(
                               FakeGlTool.buildFakeGl(
                                 ~sandbox,
                                 ~uniformMatrix3fv,
                                 ~getUniformLocation,
                                 ()
                               )
                             );
                        let state =
                          state
                          |> RenderJobsTool.initSystemAndRender
                          |> DirectorTool.runWithDefaultTime;
                        let state = state |> DirectorTool.runWithDefaultTime;
                        uniformMatrix3fv |> expect |> toCalledTwice
                      }
                    )
                )
              },
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
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
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
                  let state = state |> DirectorTool.runWithDefaultTime;
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