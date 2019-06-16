open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test front render light hardware instance in render worker",
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
                  ~lightMaterialCount=48,
                  ~geometryPointCount=300,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => TestWorkerTool.clear(sandbox));
      describe(
        "send instance data",
        () =>
          describe(
            "send modelMatrix and normalMatrix data",
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
                      FrontRenderLightHardwareInstanceRenderWorkerTool.prepare(sandbox, state);
                    (state, gameObject, sourceInstance, objectInstanceGameObject)
                  };
                  testPromise(
                    "buffer sub data",
                    () => {
                      let (state, (sourceTransform, objectTransform), array_buffer, bufferSubData) =
                        FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool.prepareForBufferSubDataCase(
                          sandbox,
                          _prepare,
                          state
                        );
                      let state =
                        state
                        |> FakeGlWorkerTool.setFakeGl(
                             FakeGlWorkerTool.buildFakeGl(
                               ~sandbox,
                               ~array_buffer,
                               ~bufferSubData,
                               ()
                             )
                           );
                      RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                        ~state,
                        ~sandbox,
                        ~completeFunc=
                          (_) =>
                            FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool.testForBufferSubDataCase(
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
                  )
                }
              )
          )
      );
      describe(
        "fix bug",
        () =>
          describe(
            "test create sourceInstance type arrays",
            () =>
              testPromise(
                "test objectInstanceTransformCollections->length",
                () => {
                  TestMainWorkerTool.openContractCheck();
                  let sourceInstanceCount = 2;
                  let objectInstanceCountPerSourceInstance = 3;
                  let state =
                    TestMainWorkerTool.initWithJobConfig(
                      ~sandbox,
                      ~buffer=
                        SettingTool.buildBufferConfigStr(
                          ~sourceInstanceCount,
                          ~objectInstanceCountPerSourceInstance,
                          ()
                        ),
                      ()
                    );
                  let (
                    state,
                    gameObject,
                    (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject)
                  ) =
                    FrontRenderLightHardwareInstanceRenderWorkerTool.prepare(sandbox, state);
                  let state =
                    state |> FakeGlWorkerTool.setFakeGl(FakeGlWorkerTool.buildFakeGl(~sandbox, ()));
                  MainStateTool.setState(state);
                  RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                    ~state,
                    ~sandbox,
                    ~completeFunc=
                      (_) =>
                        SourceInstanceRenderWorkerTool.unsafeGetObjectInstanceTransformCollections(
                          RenderWorkerStateTool.unsafeGetState()
                        )
                        |> Js.Typed_array.Uint32Array.length
                        |> expect == sourceInstanceCount
                        * objectInstanceCountPerSourceInstance
                        |> resolve,
                    ()
                  )
                }
              )
          )
      )
    }
  );