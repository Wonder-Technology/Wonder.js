open Wonder_jest;

let _ =
  describe("test front render light job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      TestTool.openContractCheck();
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          FrontRenderLightJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("use program", () => {
      let _prepare = (sandbox, state) =>
        FrontRenderLightForNoWorkerAndWorkerJobTool.prepareForUseProgramCase(
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
    });
    describe("send attribute data", () => {
      let _prepare = (sandbox, state) => {
        let (state, _, _, _, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        state;
      };
      let _prepareWithMap = (sandbox, state) => {
        let (state, _, geometry, _, _, _) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
            sandbox,
            state,
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        state;
      };
      describe("init vbo buffers when first send", () => {
        let _prepare = (sandbox, state) => {
          let (state, gameObject, geometry, _, _) =
            FrontRenderLightJobTool.prepareGameObject(sandbox, state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, geometry);
        };
        let _prepareWithMap = (sandbox, state) => {
          let (state, _, geometry, _, _, _) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, geometry);
        };
        let _prepareForBufferData =
            (state, (getGeometryPointsFunc, prepareFunc)) => {
          let (state, geometry) = prepareFunc(sandbox, state^);
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
          let points = getGeometryPointsFunc(state);
          bufferData
          |> withThreeArgs(array_buffer, points, static_draw)
          |> expect
          |> toCalledOnce;
        };
        test("create buffers", () => {
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
              (BoxGeometryTool.getBoxGeometryVertices, _prepare),
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
              (BoxGeometryTool.getBoxGeometryTexCoords, _prepareWithMap),
            )
          )
        );
        describe("init normal buffer", () =>
          describe("bufferData", () => {
            test("boxGeometry", () =>
              _prepareForBufferData(
                state,
                (BoxGeometryTool.getBoxGeometryNormals, _prepareWithMap),
              )
            );

            describe("test geometry", () => {
              describe("if not has normals", () => {
                open Js.Typed_array;

                let _prepare = (sandbox, state) => {
                  open GeometryAPI;
                  let (state, geometry) = createGeometry(state);
                  let state =
                    state
                    |> setGeometryVertices(
                         geometry,
                         Float32Array.make([|
                           1.,
                           (-1.),
                           0.,
                           0.,
                           1.,
                           0.,
                           0.,
                           0.,
                           1.,
                           2.,
                           3.,
                           (-2.),
                         |]),
                       )
                    |> setGeometryIndices16(
                         geometry,
                         Uint16Array.make([|0, 2, 1, 2, 3, 1|]),
                       );

                  let (state, gameObject, geometry, _, _) =
                    FrontRenderLightJobTool.prepareGameObjectWithSharedGeometry(
                      sandbox,
                      geometry,
                      GameObjectAPI.addGameObjectGeometryComponent,
                      state,
                    );
                  let (state, _, _, _) =
                    CameraTool.createCameraGameObject(state);
                  (state, geometry);
                };

                let _getComputedNormals = () =>
                  Float32Array.make([|
                    (-0.8164966106414795),
                    (-0.40824830532073975),
                    (-0.40824830532073975),
                    (-0.8164966106414795),
                    0.40824830532073975,
                    0.40824830532073975,
                    (-0.8164966106414795),
                    0.40824830532073975,
                    0.40824830532073975,
                    0.,
                    0.7071067690849304,
                    0.7071067690849304,
                  |]);

                describe("compute vertex normals", () => {
                  let _prepareIndices32 = (sandbox, state) => {
                    open GeometryAPI;

                    let (state, geometry) = createGeometry(state);
                    let state =
                      state
                      |> setGeometryVertices(
                           geometry,
                           Float32Array.make([|
                             1.,
                             (-1.),
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             1.,
                             2.,
                             3.,
                             (-2.),
                           |]),
                         )
                      |> setGeometryIndices32(
                           geometry,
                           Uint32Array.make([|0, 2, 1, 2, 3, 1|]),
                         );

                    let (state, gameObject, geometry, _, _) =
                      FrontRenderLightJobTool.prepareGameObjectWithSharedGeometry(
                        sandbox,
                        geometry,
                        GameObjectAPI.addGameObjectGeometryComponent,
                        state,
                      );
                    let (state, _, _, _) =
                      CameraTool.createCameraGameObject(state);
                    (state, geometry);
                  };

                  test("test indices16", () =>
                    _prepareForBufferData(
                      state,
                      (_ => _getComputedNormals(), _prepare),
                    )
                  );
                  test("test indices32", () =>
                    _prepareForBufferData(
                      state,
                      (_ => _getComputedNormals(), _prepareIndices32),
                    )
                  );
                });

                test("only buffer data once", () => {
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
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  let state = state |> DirectorTool.runWithDefaultTime;

                  let points = _getComputedNormals();
                  bufferData
                  |> withThreeArgs(array_buffer, points, static_draw)
                  |> expect
                  |> toCalledOnce;
                });
              });
              describe("else", () =>
                test("test", () =>
                  _prepareForBufferData(
                    state,
                    (BoxGeometryTool.getBoxGeometryVertices, _prepare),
                  )
                )
              );
            });
          })
        );
        describe("init index buffer", () => {
          test("bufferData", () => {
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
                 FrontRenderLightJobTool.prepareGameObject(sandbox, state);
               let (state, _, _, _) = CameraTool.createCameraGameObject(state);
               (state, geometry);
             };

             test("if lastSendGeometryData === geometryIndex, not send", () => {
               let (state, geometry) = _prepare(sandbox, state^);
               let (state, _, _, _, _) =
                 FrontRenderLightJobTool.prepareGameObjectWithSharedGeometry(
                   sandbox,
                   geometry,
                   GameObjectAPI.addGameObjectGeometryComponent,
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

               vertexAttribPointer |> getCallCount |> expect == 2 * 1;
             });
           }); */

        describe("fix bug", () => {
          let _prepare = (sandbox, state) => {
            let (state, _, geometry, _, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            (state, geometry);
          };

          test(
            {|
        create gameObject gameObject1 with geometry geometry1;
        create gameObject gameObject2 which share geometry geometry1 and set map to its material;
        loopBody;

        should send gameObject1 and gameObject2 attribute data;
        |},
            () => {
              let (state, geometry) = _prepare(sandbox, state^);
              let (state, _, _, material2, _) =
                FrontRenderLightJobTool.prepareGameObjectWithSharedGeometry(
                  sandbox,
                  geometry,
                  GameObjectAPI.addGameObjectGeometryComponent,
                  state,
                );
              let (state, (texture1, texture2)) =
                LightMaterialTool.createAndSetMaps(material2, state);
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

              vertexAttribPointer |> getCallCount |> expect == 5;
            },
          );
        });

        describe("send a_position", () =>
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
          })
        );
        describe("send a_texCoord", () =>
          test("attach buffer to attribute", () => {
            let state = _prepareWithMap(sandbox, state^);
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
        describe("send a_normal", () =>
          test("attach buffer to attribute", () => {
            let state = _prepare(sandbox, state^);
            let float = 1;
            let vertexAttribPointer =
              createEmptyStubWithJsObjSandbox(sandbox);
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
                     (),
                   ),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            vertexAttribPointer
            |> expect
            |> toCalledWith([|pos, 3, float, Obj.magic(false), 0, 0|]);
          })
        );
      });
    });
    describe("send uniform data", () => {
      let _prepare = (sandbox, state) => {
        let (state, gameObject, _, material, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state);
        let (state, _, cameraTransform, _) =
          CameraTool.createCameraGameObject(state);
        (state, gameObject, material, cameraTransform);
      };
      describe("test send data per shader", () => {
        let _testSendShaderUniformDataOnlyOnce =
            (name, prepareSendUinformDataFunc, setFakeGlFunc) =>
          RenderJobsTool.testSendShaderUniformDataOnlyOnce(
            sandbox,
            name,
            (
              prepareSendUinformDataFunc,
              setFakeGlFunc,
              FrontRenderLightJobTool.prepareGameObject,
            ),
            state,
          );
        let testSendShaderUniformMatrix4DataOnlyOnce =
            (name, prepareSendUinformDataFunc) =>
          RenderJobsTool.testSendShaderUniformMatrix4DataOnlyOnce(
            sandbox,
            name,
            (
              prepareSendUinformDataFunc,
              FrontRenderLightJobTool.prepareGameObject,
            ),
            state,
          );
        let testSendShaderUniformMatrix3DataOnlyOnce =
            (name, prepareSendUinformDataFunc) =>
          RenderJobsTool.testSendShaderUniformMatrix3DataOnlyOnce(
            sandbox,
            name,
            (
              prepareSendUinformDataFunc,
              FrontRenderLightJobTool.prepareGameObject,
            ),
            state,
          );
        let testSendShaderUniformVec3DataOnlyOnce =
            (name, prepareSendUinformDataFunc) =>
          RenderJobsTool.testSendShaderUniformVec3DataOnlyOnce(
            sandbox,
            name,
            (
              prepareSendUinformDataFunc,
              FrontRenderLightJobTool.prepareGameObject,
            ),
            state,
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
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
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
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
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
          "u_cameraPos",
          (_, _, (cameraTransform, _), state) =>
            state
            |> TransformAPI.setTransformLocalPosition(
                 cameraTransform,
                 (10., 2., 3.),
               ),
          [10., 2., 3.],
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          ~testFunc=
            prepareSendUniformData =>
              testSendShaderUniformVec3DataOnlyOnce(
                "u_cameraPos",
                prepareSendUniformData,
              ),
          (),
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
                     |> RenderJobsTool.init

                     |> DirectorTool.runWithDefaultTime;
                   uniform3f
                   |> expect
                   |> toCalledWith(
                        [|pos|] |> Js.Array.concat([10., 2., 3.] |> Obj.magic |> Array.of_list)
                      )
                 }
               )
           ); */
        describe("test send light data", () => {
          describe("test send ambient light data", () => {
            let _setFakeGl = (sandbox, state) => {
              let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(
                  ~pos,
                  sandbox,
                  "u_ambient",
                );
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
            test("send u_ambient", () => {
              let (state, gameObject, material, cameraTransform) =
                _prepare(sandbox, state^);
              let state =
                SceneAPI.setAmbientLightColor([|1., 0., 0.5|], state);
              let (state, pos, uniform3f) = _setFakeGl(sandbox, state);

              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

              uniform3f
              |> expect
              |> toCalledWith([|pos |> Obj.magic, 1., 0., 0.5|]);
            });

            test("send shader record only once", () => {
              let (state, gameObject, material, cameraTransform) =
                _prepare(sandbox, state^);
              let (state, gameObject2, _, _, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let state =
                SceneAPI.setAmbientLightColor([|1., 0., 0.5|], state);
              let (state, pos, uniform3f) = _setFakeGl(sandbox, state);

              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

              uniform3f |> withOneArg(pos) |> getCallCount |> expect == 1;
            });
          });

          describe("test send direction light data", () => {
            let _prepareOne = (sandbox, state) =>
              FrontRenderLightForNoWorkerAndWorkerJobTool.prepareOneForDirectionLight(
                sandbox,
                state,
              );
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
                (
                  lightGameObject1,
                  lightGameObject2,
                  lightGameObject3,
                  lightGameObject4,
                ),
                material,
                (light1, light2, light3, light4),
                cameraTransform,
              );
            };
            let _setFakeGl = (sandbox, nameArr, state) =>
              FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                sandbox,
                nameArr,
                state,
              );

            describe("send structure data", () => {
              test("if light's isRender === false, not send its data", () => {
                let (state, lightGameObject1, _, light1, _) =
                  _prepareOne(sandbox, state^);
                let (state, lightGameObject2, light2) =
                  DirectionLightTool.createGameObject(state);
                let state =
                  DirectionLightAPI.setDirectionLightIsRender(
                    light1,
                    false,
                    state,
                  );
                let (state, posArr, (uniform1f, uniform3f)) =
                  _setFakeGl(
                    sandbox,
                    [|
                      "u_directionLights[0].direction",
                      "u_directionLights[1].direction",
                    |],
                    state,
                  );
                let state = state |> RenderJobsTool.init;
                let state = state |> DirectorTool.runWithDefaultTime;

                (
                  uniform3f |> withOneArg(posArr[0]) |> getCallCount,
                  uniform3f |> withOneArg(posArr[1]) |> getCallCount,
                )
                |> expect == (1, 0);
              });

              describe("send direction", () => {
                describe("fix bug", () =>
                  test("test dispose first light gameObject", () => {
                    let (state, lightGameObject1, _, light1, _) =
                      _prepareOne(sandbox, state^);
                    let (state, lightGameObject2, light2) =
                      DirectionLightTool.createGameObject(state);
                    let eulerAngles1 = (45., 1., 0.);
                    let eulerAngles2 = (1., 4., 3.);
                    let state =
                      state
                      |> TransformAPI.setTransformLocalEulerAngles(
                           GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             lightGameObject1,
                             state,
                           ),
                           eulerAngles1,
                         );
                    let state =
                      state
                      |> TransformAPI.setTransformLocalEulerAngles(
                           GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             lightGameObject2,
                             state,
                           ),
                           eulerAngles2,
                         );
                    let (state, posArr, (uniform1f, uniform3f)) =
                      _setFakeGl(
                        sandbox,
                        [|"u_directionLights[0].direction"|],
                        state,
                      );
                    let state = state |> RenderJobsTool.init;
                    let state =
                      GameObjectTool.disposeGameObject(
                        lightGameObject1,
                        state,
                      );
                    let state = state |> DirectorTool.runWithDefaultTime;

                    uniform3f
                    |> expect
                    |> toCalledWith([|
                         posArr[0] |> Obj.magic,
                         0.07056365770709318,
                         (-0.01377827170237498),
                         0.9974121161485315,
                       |]);
                  })
                );

                describe("convert rotation to direction vector3", () => {
                  test("test one light", () =>
                    FrontRenderLightForNoWorkerAndWorkerJobTool.TestSendDirection.testOneLight(
                      sandbox,
                      state,
                      _prepareOne,
                      (sandbox, callArgArr, uniform3f, state) => {
                        let state = state |> RenderJobsTool.init;
                        let state = state |> DirectorTool.runWithDefaultTime;

                        uniform3f |> expect |> toCalledWith(callArgArr);
                      },
                    )
                  );
                  test("test four lights", () => {
                    let (
                      state,
                      (
                        lightGameObject1,
                        lightGameObject2,
                        lightGameObject3,
                        lightGameObject4,
                      ),
                      material,
                      (light1, light2, light3, light4),
                      cameraTransform,
                    ) =
                      _prepareFour(sandbox, state^);
                    let state =
                      state
                      |> TransformAPI.setTransformLocalRotation(
                           GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             lightGameObject1,
                             state,
                           ),
                           (0.1, 10.5, 1.5, 1.),
                         )
                      |> TransformAPI.setTransformLocalRotation(
                           GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             lightGameObject2,
                             state,
                           ),
                           (1.1, 10.5, 1.5, 1.),
                         )
                      |> TransformAPI.setTransformLocalRotation(
                           GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             lightGameObject3,
                             state,
                           ),
                           (2.1, 10.5, 1.5, 1.),
                         )
                      |> TransformAPI.setTransformLocalRotation(
                           GameObjectAPI.unsafeGetGameObjectTransformComponent(
                             lightGameObject4,
                             state,
                           ),
                           (3.1, 10.5, 1.5, 1.),
                         );
                    let (state, posArr, (uniform1f, uniform3f)) =
                      _setFakeGl(
                        sandbox,
                        [|
                          "u_directionLights[0].direction",
                          "u_directionLights[1].direction",
                          "u_directionLights[2].direction",
                          "u_directionLights[3].direction",
                        |],
                        state,
                      );

                    let state =
                      state
                      |> RenderJobsTool.init
                      |> DirectorTool.runWithDefaultTime;

                    (
                      uniform3f
                      |> withOneArg(posArr[0])
                      |> getCall(0)
                      |> getArgs,
                      uniform3f
                      |> withOneArg(posArr[1])
                      |> getCall(0)
                      |> getArgs,
                      uniform3f
                      |> withOneArg(posArr[2])
                      |> getCall(0)
                      |> getArgs,
                      uniform3f
                      |> withOneArg(posArr[3])
                      |> getCall(0)
                      |> getArgs,
                    )
                    |> expect
                    == (
                         [
                           posArr[0] |> Obj.magic,
                           0.0809289658069698,
                           0.7083167921793907,
                           (-0.7012402045020751),
                         ],
                         [
                           posArr[1] |> Obj.magic,
                           0.13442483321879434,
                           0.6415023904668499,
                           (-0.7552513801638607),
                         ],
                         [
                           posArr[2] |> Obj.magic,
                           0.16459718450045202,
                           0.5214977228899428,
                           (-0.8372263086377114),
                         ],
                         [
                           posArr[3] |> Obj.magic,
                           0.17317784447167245,
                           0.41627749786719925,
                           (-0.8925931206062305),
                         ],
                       );
                  });
                });
              });
              describe("send color", () => {
                let _prepare = state => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let color = [|1., 0., 0.|];
                  let state =
                    state
                    |> DirectionLightAPI.setDirectionLightColor(light, color);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_directionLights[0].color"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;

                  (state, light, color, posArr, uniform3f);
                };

                test("test one light", () => {
                  let (state, light, color, posArr, uniform3f) =
                    _prepare(state);

                  uniform3f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|] |> Js.Array.concat(color),
                     );
                });
                test("test glsl cache", () => {
                  let (state, light, color, posArr, uniform3f) =
                    _prepare(state);

                  let state =
                    state
                    |> DirectionLightAPI.setDirectionLightColor(
                         light,
                         [|0.3, 0., 0.|],
                       );
                  let state = state |> DirectorTool.runWithDefaultTime;

                  let state =
                    state
                    |> DirectionLightAPI.setDirectionLightColor(light, color);
                  let state = state |> DirectorTool.runWithDefaultTime;

                  uniform3f
                  |> withFourArgs(posArr[0], color[0], color[1], color[2])
                  |> getCallCount
                  |> expect == 2;
                });
              });
              describe("send intensity", () => {
                let _prepare = state => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let intensity = 2.;
                  let state =
                    state
                    |> DirectionLightAPI.setDirectionLightIntensity(
                         light,
                         intensity,
                       );
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_directionLights[0].intensity"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;

                  (state, light, intensity, posArr, uniform1f);
                };

                test("test one light", () => {
                  let (state, light, intensity, posArr, uniform1f) =
                    _prepare(state);

                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(intensity),
                     );
                });
                test("test glsl cache", () => {
                  let (state, light, intensity, posArr, uniform1f) =
                    _prepare(state);

                  let state =
                    state
                    |> DirectionLightAPI.setDirectionLightIntensity(
                         light,
                         1.3,
                       );
                  let state = state |> DirectorTool.runWithDefaultTime;

                  let state =
                    state
                    |> DirectionLightAPI.setDirectionLightIntensity(
                         light,
                         intensity,
                       );
                  let state = state |> DirectorTool.runWithDefaultTime;

                  uniform1f
                  |> withTwoArgs(posArr[0], intensity)
                  |> getCallCount
                  |> expect == 2;
                });
              });
            });
          });

          describe("test send point light data", () => {
            let _prepareOne = (sandbox, state) => {
              let (state, gameObject, _, material, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let (state, lightGameObject, light) =
                PointLightTool.createGameObject(state);
              let (state, _, cameraTransform, _) =
                CameraTool.createCameraGameObject(state);
              (state, lightGameObject, material, light, cameraTransform);
            };
            let _prepareFour = (sandbox, state) =>
              FrontRenderLightForNoWorkerAndWorkerJobTool.prepareFourForPointLight(
                sandbox,
                state,
              );
            let _setFakeGl = (sandbox, nameArr, state) =>
              FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                sandbox,
                nameArr,
                state,
              );
            describe("send structure data", () => {
              describe("send position", () =>
                test("test four lights", () => {
                  let (
                    state,
                    (
                      lightGameObject1,
                      lightGameObject2,
                      lightGameObject3,
                      lightGameObject4,
                    ),
                    material,
                    (light1, light2, light3, light4),
                    cameraTransform,
                  ) =
                    _prepareFour(sandbox, state^);
                  let state =
                    state
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject1,
                           state,
                         ),
                         (1., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject2,
                           state,
                         ),
                         (2., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject3,
                           state,
                         ),
                         (3., 2., 3.),
                       )
                    |> TransformAPI.setTransformPosition(
                         GameObjectAPI.unsafeGetGameObjectTransformComponent(
                           lightGameObject4,
                           state,
                         ),
                         (4., 2., 3.),
                       );
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|
                        "u_pointLights[0].position",
                        "u_pointLights[1].position",
                        "u_pointLights[2].position",
                        "u_pointLights[3].position",
                      |],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  (
                    uniform3f
                    |> withOneArg(posArr[0])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[1])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[2])
                    |> getCall(0)
                    |> getArgs,
                    uniform3f
                    |> withOneArg(posArr[3])
                    |> getCall(0)
                    |> getArgs,
                  )
                  |> expect
                  == (
                       [posArr[0] |> Obj.magic, 1., 2., 3.],
                       [posArr[1] |> Obj.magic, 2., 2., 3.],
                       [posArr[2] |> Obj.magic, 3., 2., 3.],
                       [posArr[3] |> Obj.magic, 4., 2., 3.],
                     );
                })
              );
              describe("send color", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let color = [|1., 0., 0.|];
                  let state =
                    state |> PointLightAPI.setPointLightColor(light, color);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(sandbox, [|"u_pointLights[0].color"|], state);
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform3f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|] |> Js.Array.concat(color),
                     );
                })
              );
              describe("send intensity", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let intensity = 2.;
                  let state =
                    state
                    |> PointLightAPI.setPointLightIntensity(light, intensity);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_pointLights[0].intensity"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(intensity),
                     );
                })
              );
              describe("send constant", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let constant = 2.;
                  let state =
                    state
                    |> PointLightAPI.setPointLightConstant(light, constant);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_pointLights[0].constant"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(constant),
                     );
                })
              );
              describe("send linear", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let linear = 2.;
                  let state =
                    state |> PointLightAPI.setPointLightLinear(light, linear);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_pointLights[0].linear"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(linear),
                     );
                })
              );
              describe("send quadratic", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let quadratic = 2.5;
                  let state =
                    state
                    |> PointLightAPI.setPointLightQuadratic(light, quadratic);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(
                      sandbox,
                      [|"u_pointLights[0].quadratic"|],
                      state,
                    );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|]
                       |> ArrayService.push(quadratic),
                     );
                })
              );
              describe("send range", () =>
                test("test one light", () => {
                  let (
                    state,
                    lightGameObject,
                    material,
                    light,
                    cameraTransform,
                  ) =
                    _prepareOne(sandbox, state^);
                  let range = 2.;
                  let state =
                    state |> PointLightAPI.setPointLightRange(light, range);
                  let (state, posArr, (uniform1f, uniform3f)) =
                    _setFakeGl(sandbox, [|"u_pointLights[0].range"|], state);
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  uniform1f
                  |> expect
                  |> toCalledWith(
                       [|posArr[0] |> Obj.magic|] |> ArrayService.push(range),
                     );
                })
              );
            });
          });
        });
      });

      describe("test send light material data", () => {
        GLSLSenderTool.JudgeSendUniformData.testSendFloat(
          sandbox,
          "u_shininess",
          (
            _,
            (gameObjectTransform, material),
            (cameraTransform, basicCameraView),
            state,
          ) =>
            state |> LightMaterialAPI.setLightMaterialShininess(material, 30.),
          30.,
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          (),
        );
        GLSLSenderTool.JudgeSendUniformData.testSendVector3(
          sandbox,
          "u_diffuse",
          (
            _,
            (gameObjectTransform, material),
            (cameraTransform, basicCameraView),
            state,
          ) =>
            state
            |> LightMaterialAPI.setLightMaterialDiffuseColor(
                 material,
                 [|1., 0., 0.5|],
               ),
          [1., 0., 0.5],
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          (),
        );
        GLSLSenderTool.JudgeSendUniformData.testSendVector3(
          sandbox,
          "u_specular",
          (
            _,
            (gameObjectTransform, material),
            (cameraTransform, basicCameraView),
            state,
          ) =>
            state
            |> LightMaterialAPI.setLightMaterialSpecularColor(
                 material,
                 [|1., 0., 0.5|],
               ),
          [1., 0., 0.5],
          ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
          (),
        );

        describe("test with map", () =>
          describe("send u_diffuseMapSampler, u_specularMapSampler", () => {
            let _prepare = state => {
              let (state, gameObject, _, _, _, _) =
                FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
                  sandbox,
                  state,
                );
              let (state, _, _, _) =
                CameraTool.createCameraGameObject(state);
              let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
              let pos1 = 0;
              let pos2 = 1;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(
                  ~pos=pos1,
                  sandbox,
                  "u_diffuseMapSampler",
                );
              let getUniformLocation =
                GLSLLocationTool.stubLocation(
                  getUniformLocation,
                  pos2,
                  sandbox,
                  "u_specularMapSampler",
                );
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
              (state, (pos1, pos2), uniform1i);
            };

            test("test send", () => {
              let (state, (pos1, pos2), uniform1i) = _prepare(state^);

              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

              (
                SinonTool.calledWithArg2(uniform1i, pos1, 0),
                SinonTool.calledWithArg2(uniform1i, pos2, 1),
              )
              |> expect == (true, true);
            });
          })
        );
      });

      GLSLSenderTool.JudgeSendUniformData.testSendMatrix4(
        sandbox,
        "u_mMatrix",
        (gameObjectTransform, cameraTransform, _, state) =>
          state
          |> TransformAPI.setTransformLocalPosition(
               gameObjectTransform,
               (1., 2., 3.),
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
          1.,
          2.,
          3.,
          1.,
        |]),
        ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
        (),
      );
      GLSLSenderTool.JudgeSendUniformData.testSendMatrix3(
        sandbox,
        "u_normalMatrix",
        (gameObjectTransform, cameraTransform, _, state) =>
          state
          |> TransformAPI.setTransformLocalPosition(
               gameObjectTransform,
               (10., 2., 3.),
             ),
        Js.Typed_array.Float32Array.make([|
          1.,
          0.,
          0.,
          0.,
          1.,
          0.,
          0.,
          0.,
          1.,
        |]),
        ~prepareGameObjectFunc=FrontRenderLightJobTool.prepareGameObject,
        ~testFunc=
          prepareSendUniformData => {
            test("send per each gameObject", () => {
              let (
                state,
                _,
                (gameObjectTransform, _),
                cameraTransform,
                basicCameraView,
              ) =
                prepareSendUniformData(
                  sandbox,
                  FrontRenderLightJobTool.prepareGameObject,
                  state^,
                );
              let (state, gameObject2, _, _, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let state =
                state
                |> TransformAPI.setTransformLocalPosition(
                     gameObjectTransform,
                     (1., 2., 3.),
                   );
              let uniformMatrix3fv = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(
                  ~pos,
                  sandbox,
                  "u_normalMatrix",
                );
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~uniformMatrix3fv,
                       ~getUniformLocation,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              uniformMatrix3fv |> expect |> toCalledTwice;
            });
            describe("test cache", ()
              /* TODO test more! when rotation/scale is enable  */
              =>
                test("test in different loops", () => {
                  let (
                    state,
                    _,
                    (gameObjectTransform, _),
                    cameraTransform,
                    basicCameraView,
                  ) =
                    prepareSendUniformData(
                      sandbox,
                      FrontRenderLightJobTool.prepareGameObject,
                      state^,
                    );
                  let state =
                    state
                    |> TransformAPI.setTransformLocalPosition(
                         gameObjectTransform,
                         (1., 2., 3.),
                       );
                  let uniformMatrix3fv =
                    createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(
                      ~pos,
                      sandbox,
                      "u_normalMatrix",
                    );
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~uniformMatrix3fv,
                           ~getUniformLocation,
                           (),
                         ),
                       );
                  let state =
                    state
                    |> RenderJobsTool.init
                    |> DirectorTool.runWithDefaultTime;
                  let state = state |> DirectorTool.runWithDefaultTime;
                  uniformMatrix3fv |> expect |> toCalledTwice;
                })
              );
          },
        (),
      );

      describe("fix bug", () => {
        let _prepare = state => {
          let (state, gameObject1, _, _, _) =
            RenderBasicJobTool.prepareGameObject(sandbox, state);
          let (state, gameObject2, _, _, _, _) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
          let pos1 = 0;
          let pos2 = 1;
          let getUniformLocation =
            GLSLLocationTool.getUniformLocation(
              ~pos=pos1,
              sandbox,
              "u_color",
            );
          let getUniformLocation =
            GLSLLocationTool.stubLocation(
              getUniformLocation,
              pos2,
              sandbox,
              "u_diffuse",
            );
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

          (state, (pos1, pos2), uniform3f);
        };

        test(
          "should send uniform data which has different shaders but the same materials",
          () => {
          let (state, (pos1, pos2), uniform3f) = _prepare(state^);

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          (
            SinonTool.calledWith(uniform3f, pos1),
            SinonTool.calledWith(uniform3f, pos2),
          )
          |> expect == (true, true);
        });
      });
    });

    describe("bind map", () => {
      test("if not has map, not bind", () => {
        let (state, gameObject, _, _, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
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
          let (state, gameObject, _, material, _, (texture1, texture2)) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let textureUnit0 = 0;
          let texture2D = Obj.magic(8);
          let glTexture1 = Obj.magic(11);
          let glTexture2 = Obj.magic(12);
          let glTexture3 = Obj.magic(13);
          let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
          createTexture |> onCall(0) |> returns(glTexture1);
          createTexture |> onCall(1) |> returns(glTexture2);
          createTexture |> onCall(2) |> returns(glTexture3);
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
          (
            state,
            (texture2D, glTexture1, glTexture2, glTexture3),
            material,
            (texture1, texture2),
            (activeTexture, bindTexture),
          );
        };
        test(
          /* "if texture of the specific unit is cached, not bind and active it again", */
          "test not cache texture", () => {
          let (state, _, _, _, (activeTexture, _)) = _prepare(state^);

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          let state = state |> DirectorTool.runWithDefaultTime;

          activeTexture |> getCallCount |> expect == 4;
        });

        test("active texture unit", () => {
          let (state, _, _, _, (activeTexture, _)) = _prepare(state^);

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          (
            SinonTool.calledWith(activeTexture, 0),
            SinonTool.calledWith(activeTexture, 1),
          )
          |> expect == (true, true);
        });
        test("bind gl texture to TEXTURE_2D target", () => {
          let (
            state,
            (texture2D, glTexture1, glTexture2, _),
            _,
            _,
            (_, bindTexture),
          ) =
            _prepare(state^);

          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          (
            SinonTool.calledWithArg2(bindTexture, texture2D, glTexture1),
            SinonTool.calledWithArg2(bindTexture, texture2D, glTexture2),
          )
          |> expect == (true, true);
        });

        describe("test remove map", () =>
          test("new map's unit should be removed one", () => {
            let (
              state,
              _,
              material,
              (texture1, texture2),
              (activeTexture, bindTexture),
            ) =
              _prepare(state^);

            let state =
              state
              |> LightMaterialAPI.removeLightMaterialSpecularMap(material);
            let (state, map3) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let state =
              state
              |> LightMaterialAPI.setLightMaterialSpecularMap(material, map3);
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

            (
              SinonTool.calledWith(activeTexture, 0),
              SinonTool.calledWith(activeTexture, 1),
            )
            |> expect == (true, true);
          })
        );
      });
    });

    describe("update map", () => {
      let _prepare = (~state, ~width=2, ~height=4, ()) => {
        let (state, gameObject, _, _, _, diffuseMap) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedDiffuseMap(
            sandbox,
            state,
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let source1 = BasicSourceTextureTool.buildSource(width, height);
        let state =
          state
          |> BasicSourceTextureAPI.setBasicSourceTextureSource(
               diffuseMap,
               source1,
             );

        (state, diffuseMap);
      };

      test("if is updated before, not update", () => {
        let (state, _) = _prepare(~state=state^, ());
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

        let pixelStoreiCallCount =
          pixelStorei |> withOneArg(unpackFlipYWebgl) |> getCallCount;

        let state = state |> DirectorTool.runWithDefaultTime;
        let state = state |> DirectorTool.runWithDefaultTime;

        pixelStorei
        |> withOneArg(unpackFlipYWebgl)
        |> getCallCount
        |> expect == pixelStoreiCallCount;
      });
      test("if source not exist, not update", () => {
        let (state, gameObject, _, _, _, _) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
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
          state |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(map, true);
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
        let (state, _) = _prepare(~state=state^, ());
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
            let (state, _) = _prepare(state^);
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
            let (state, _) = _prepare(state^);
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
            let (state, _) = _prepare(state^);
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
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

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

    describe("test set map at runtime which has no map before", () =>
      test("replace material component", () => {
        let (state, gameObject1, _, material1, _) =
          FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
        let pos1 = 0;
        let pos2 = 1;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(
            ~pos=pos1,
            sandbox,
            "u_diffuseMapSampler",
          );
        let getUniformLocation =
          GLSLLocationTool.stubLocation(
            getUniformLocation,
            pos2,
            sandbox,
            "u_specularMapSampler",
          );
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
          GameObjectAPI.disposeGameObjectLightMaterialComponent(
            gameObject1,
            material1,
            state,
          );
        let (state, material2, _) =
          LightMaterialTool.createMaterialWithMap(state);
        let state =
          GameObjectAPI.addGameObjectLightMaterialComponent(
            gameObject1,
            material2,
            state,
          );
        let state = GameObjectAPI.initGameObject(gameObject1, state);
        let state = state |> DirectorTool.runWithDefaultTime;

        (
          uniform1i |> withOneArg(pos1) |> getCallCount,
          uniform1i |> withOneArg(pos2) |> getCallCount,
        )
        |> expect == (1, 1);
      })
    );

    describe("test remove map at runtime which has map before", () =>
      test("replace material component", () => {
        let (state, gameObject1, _, material1, _, (diffuseMap, specularMap)) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
            sandbox,
            state^,
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
        let pos1 = 0;
        let pos2 = 1;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(
            ~pos=pos1,
            sandbox,
            "u_diffuseMapSampler",
          );
        let getUniformLocation =
          GLSLLocationTool.stubLocation(
            getUniformLocation,
            pos2,
            sandbox,
            "u_specularMapSampler",
          );
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
          GameObjectAPI.disposeGameObjectLightMaterialComponent(
            gameObject1,
            material1,
            state,
          );
        let (state, material2) = LightMaterialAPI.createLightMaterial(state);
        let state =
          GameObjectAPI.addGameObjectLightMaterialComponent(
            gameObject1,
            material2,
            state,
          );
        let state = GameObjectAPI.initGameObject(gameObject1, state);
        let state = state |> DirectorTool.runWithDefaultTime;

        (
          uniform1i |> withOneArg(pos1) |> getCallCount,
          uniform1i |> withOneArg(pos2) |> getCallCount,
        )
        |> expect == (1, 1);
      })
    );

    describe("draw", () =>
      describe(
        "if geometry has index buffer, bind index buffer and drawElements", () => {
        let _prepareForDrawElements = (sandbox, state) => {
          let (state, _, geometry, _, meshRenderer) =
            FrontRenderLightJobTool.prepareGameObject(sandbox, state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, geometry, meshRenderer);
        };

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

          test("test drawElements", () => {
            let (state, geometry, meshRenderer) =
              _prepareForDrawElements(sandbox, state^);
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
            let state = state |> RenderJobsTool.init;
            let state = state |> DirectorTool.runWithDefaultTime;
            drawElements
            |> withFourArgs(
                 triangles,
                 GeometryTool.getIndicesCount(
                   geometry,
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
            |> expect
            |> toCalledOnce;
          });
        });
      })
    );
  });