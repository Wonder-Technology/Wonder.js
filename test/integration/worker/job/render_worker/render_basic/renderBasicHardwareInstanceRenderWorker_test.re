open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test render basic hardware instance in render worker",
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
            TestMainWorkerTool.initWithJobConfig(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~transformCount=500,
                  ~basicMaterialCount=48,
                  ~geometryPointCount=300,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => TestWorkerTool.clear(sandbox));
      describe(
        "use program",
        () => {
          open Wonder_jest;
          open Expect;
          open Expect.Operators;
          open Sinon;
          let _prepareForUseProgram = (sandbox, state) => {
            let (state, _, _) =
              RenderBasicHardwareInstanceRenderWorkerTool.prepare(sandbox, state);
            let program = Obj.magic(1);
            let createProgram =
              createEmptyStubWithJsObjSandbox(sandbox) |> onCall(0) |> returns(program);
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlWorkerTool.setFakeGl(
                   FakeGlWorkerTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
                 );
            (state, program, createProgram, useProgram)
          };
          testPromise(
            "create program and use program only once",
            () => {
              let (state, program, createProgram, useProgram) =
                _prepareForUseProgram(sandbox, state^);
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=(_) => createProgram |> getCallCount |> expect == 1 |> resolve,
                ()
              )
            }
          );
          testPromise(
            "only use sourceInstance's gameObject's program",
            () => {
              let (state, program, createProgram, useProgram) =
                _prepareForUseProgram(sandbox, state^);
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=(_) => useProgram |> expect |> toCalledWith([|program|]) |> resolve,
                ()
              )
            }
          )
        }
      );
      describe(
        "send instance data",
        () =>
          describe(
            "send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices",
            () => {
              let _prepare = (sandbox, state) => {
                let (
                  state,
                  gameObject,
                  (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject)
                ) =
                  RenderBasicHardwareInstanceRenderWorkerTool.prepare(sandbox, state);
                (state, gameObject, sourceInstance, objectInstanceGameObject)
              };
              testPromise(
                "buffer sub data",
                () => {
                  let (state, (sourceTransform, objectTransform), array_buffer, bufferSubData) =
                    RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool.prepareForBufferSubDataCase(
                      sandbox,
                      _prepare,
                      state
                    );
                  let state =
                    state
                    |> FakeGlWorkerTool.setFakeGl(
                         FakeGlWorkerTool.buildFakeGl(~sandbox, ~array_buffer, ~bufferSubData, ())
                       );
                  RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                    ~state,
                    ~sandbox,
                    ~completeFunc=
                      (_) =>
                        RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool.testForBufferSubDataCase(
                          sandbox,
                          (sourceTransform, objectTransform),
                          array_buffer,
                          bufferSubData,
                          MainStateTool.unsafeGetState()
                        )
                        |> resolve,
                    ()
                  )
                }
              );
              describe(
                "fix bug",
                () =>
                  describe(
                    "test create new sourceInstance gameObject after first loop",
                    () =>
                      describe(
                        "handle instance data position",
                        () => {
                          testPromise(
                            "vertexAttribDivisorANGLE 1",
                            () => {
                              InstanceRenderWorkerTool.setGPUDetectDataAllowHardwareInstance(
                                sandbox
                              );
                              let renderWorkerState = RenderWorkerStateTool.unsafeGetState();
                              let vertexAttribDivisorANGLE =
                                Obj.magic(
                                  InstanceRenderWorkerTool.getExtensionInstancedArrays(
                                    renderWorkerState
                                  )##vertexAttribDivisorANGLE
                                );
                              let (state, _, _, _) = CameraTool.createCameraGameObject(state^);
                              let (state, pos1, pos2, pos3, pos4, getAttribLocation) =
                                RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool.prepareGetAttribLocationForHandleInstanceData(
                                  sandbox,
                                  state
                                );
                              let state =
                                state
                                |> FakeGlWorkerTool.setFakeGl(
                                     FakeGlWorkerTool.buildFakeGl(~sandbox, ~getAttribLocation, ())
                                   );
                              MainStateTool.setState(state);
                              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                                ~state,
                                ~sandbox,
                                ~completeFunc=
                                  (_) => {
                                    let state = MainStateTool.unsafeGetState();
                                    let (state, gameObject2, componentTuple) =
                                      RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(
                                        sandbox,
                                        state
                                      );
                                    let state = GameObjectAPI.initGameObject(gameObject2, state);
                                    RenderJobsRenderWorkerTool.mainLoopAndRender(
                                      ~completeFunc=
                                        (_) =>
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
                                          |> expect == (1, 1, 1, 1)
                                          |> resolve,
                                      ~state,
                                      ~sandbox,
                                      ()
                                    )
                                  },
                                ()
                              )
                            }
                          )
                        }
                      )
                  )
              )
            }
          )
      )
    }
  );