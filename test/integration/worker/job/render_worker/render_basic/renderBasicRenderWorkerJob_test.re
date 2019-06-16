open Wonder_jest;

open Js.Promise;

let _ =
  describe("test render basic render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~transformCount=5,
              ~basicMaterialCount=12,
              (),
            ),
          (),
        );
    });
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("use program", () => {
      let _prepare = (sandbox, state) =>
        RenderBasicForNoWorkerAndWorkerJobTool.prepareForUseProgramCase(
          sandbox,
          state,
        );
      let _prepareForUseProgram = (sandbox, state) =>
        RenderJobsRenderWorkerTool.prepareForUseProgramCase(
          sandbox,
          _prepare,
          state,
        );

      testPromise("test use", () => {
        let (state, program, useProgram) =
          _prepareForUseProgram(sandbox, state^);
        RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
          ~state,
          ~sandbox,
          ~completeFunc=
            _ => useProgram |> expect |> toCalledWith([|program|]) |> resolve,
          (),
        );
      });
    });

    describe("send attribute data", () =>
      describe("init vbo buffers when first send", () => {
        let _prepare = (sandbox, state) => {
          let (state, gameObject, geometry, _, _) =
            RenderBasicJobTool.prepareGameObjectWithGeometry(sandbox, state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (state, geometry);
        };
        describe("init vertex buffer", () =>
          testPromise("bufferData", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let array_buffer = 1;
            let static_draw = 2;
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlWorkerTool.setFakeGl(
                   FakeGlWorkerTool.buildFakeGl(
                     ~sandbox,
                     ~array_buffer,
                     ~static_draw,
                     ~bufferData,
                     (),
                   ),
                 );
            RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
              ~state,
              ~sandbox,
              ~completeFunc=
                _ => {
                  let vertices =
                    GeometryAPI.getGeometryVertices(geometry, state);
                  bufferData
                  |> withThreeArgs(array_buffer, vertices, static_draw)
                  |> expect
                  |> toCalledOnce
                  |> resolve;
                },
              (),
            );
          })
        );
        describe("init index buffer", () =>
          testPromise("bufferData", () => {
            let (state, geometry) = _prepare(sandbox, state^);
            let element_array_buffer = 1;
            let static_draw = 2;
            let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlWorkerTool.setFakeGl(
                   FakeGlWorkerTool.buildFakeGl(
                     ~sandbox,
                     ~element_array_buffer,
                     ~static_draw,
                     ~bufferData,
                     (),
                   ),
                 );
            RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
              ~state,
              ~sandbox,
              ~completeFunc=
                _ => {
                  let indices =
                    GeometryAPI.getGeometryIndices16(geometry, state);
                  bufferData
                  |> withThreeArgs(
                       element_array_buffer,
                       indices,
                       static_draw,
                     )
                  |> expect
                  |> toCalledOnce
                  |> resolve;
                },
              (),
            );
          })
        );
        /* test(
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
               let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
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
           ) */
      })
    );
    /* describe(
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
                 "if lastSendGeometryData === geometryIndex, not send",
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
                   let state = state |> RenderJobsTool.init;
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
                   let state = state |> RenderJobsTool.init;
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
                   let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
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
                   let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                   vertexAttribPointer
                   |> expect
                   |> toCalledWith([|pos, 3, float, Obj.magic(false), 0, 0|])
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
                       let state = state |> RenderJobsTool.init;
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
                       let state = state |> RenderJobsTool.init;
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
       ) */
    describe("send uniform data", () =>
      describe("test send u_mMatrix", () => {
        testPromise("test send", () => {
          let (
            state,
            _,
            (gameObjectTransform, _),
            cameraTransform,
            basicCameraView,
          ) =
            GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
              sandbox,
              RenderBasicJobTool.prepareGameObject,
              state^,
            );
          let state =
            state
            |> TransformAPI.setTransformLocalPosition(
                 gameObjectTransform,
                 (1., 2., 3.),
               );
          let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
          let pos = 0;
          let getUniformLocation =
            GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_mMatrix");
          let state =
            state
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(
                   ~sandbox,
                   ~uniformMatrix4fv,
                   ~getUniformLocation,
                   (),
                 ),
               );
          /* let state = MainStateTool.setState(state); */
          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~completeFunc=
              _ =>
                uniformMatrix4fv
                |> withOneArg(pos)
                |> expect
                |> toCalledWith([|
                     pos,
                     Obj.magic(false),
                     Obj.magic(
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
                     ),
                   |])
                |> resolve,
            (),
          );
        });
        describe("test two gameObjects", () =>
          testPromise(
            "if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect",
            () => {
              let (
                state,
                _,
                (gameObjectTransform, _),
                cameraTransform,
                basicCameraView,
              ) =
                GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
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
              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(
                  ~pos,
                  sandbox,
                  "u_mMatrix",
                );
              let state =
                state
                |> FakeGlWorkerTool.setFakeGl(
                     FakeGlWorkerTool.buildFakeGl(
                       ~sandbox,
                       ~uniformMatrix4fv,
                       ~getUniformLocation,
                       (),
                     ),
                   );
              /* let state = MainStateTool.setState(state); */
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=
                  _ =>
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
                       |])
                    |> resolve,
                (),
              );
            },
          )
        );
      })
    );
  });