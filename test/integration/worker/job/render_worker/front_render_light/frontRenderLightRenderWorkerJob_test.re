open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test front render light render worker job",
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
            TestToolMainWorker.initWithJobConfig(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~transformDataBufferCount=10,
                  ~basicMaterialDataBufferCount=10,
                  ()
                ),
              ()
            )
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
            RenderJobsRenderWorkerTool.prepareForUseProgram(sandbox, _prepare, state);
          testPromise(
            "test use",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
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
        "send uniform data",
        () => {
          describe(
            "test send u_normalMatrix",
            () =>
              testPromise(
                "test send",
                () => {
                  let (state, _, (gameObjectTransform, _), cameraTransform, basicCameraView) =
                    GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
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
                    |> FakeGlToolWorker.setFakeGl(
                         FakeGlToolWorker.buildFakeGl(
                           ~sandbox,
                           ~uniformMatrix3fv,
                           ~getUniformLocation,
                           ()
                         )
                       );
                  RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                    ~state,
                    ~sandbox,
                    ~completeFunc=
                      (_) =>
                        uniformMatrix3fv
                        |> withOneArg(pos)
                        |> expect
                        |> toCalledWith([|
                             pos,
                             Obj.magic(Js.false_),
                             Obj.magic(
                               Js.Typed_array.Float32Array.make([|
                                 1.,
                                 0.,
                                 0.,
                                 0.,
                                 1.,
                                 0.,
                                 0.,
                                 0.,
                                 1.
                               |])
                             )
                           |])
                        |> resolve,
                    ()
                  )
                }
              )
          );
          describe(
            "test send light record",
            () => {
              describe(
                "test send direction light record",
                () =>
                  describe(
                    "send structure record",
                    () =>
                      describe(
                        "send position",
                        () => {
                          /* TODO duplicate with frontRenderLightJob_test  */
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
                              |> FakeGlToolWorker.setFakeGl(
                                   FakeGlToolWorker.buildFakeGl(
                                     ~sandbox,
                                     ~uniform1f,
                                     ~uniform3f,
                                     ~getUniformLocation,
                                     ()
                                   )
                                 );
                            (state, posArr, (uniform1f, uniform3f))
                          };
                          let _prepareOne = (sandbox, state) => {
                            let (state, gameObject, _, material, _) =
                              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                            let (state, lightGameObject, light) =
                              DirectionLightTool.createGameObject(state);
                            let (state, _, cameraTransform, _) =
                              CameraTool.createCameraGameObject(state);
                            (state, lightGameObject, material, light, cameraTransform)
                          };
                          testPromise(
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
                                _setFakeGl(sandbox, [|"u_directionLights[0].position"|], state);
                              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                                ~state,
                                ~sandbox,
                                ~completeFunc=
                                  (_) =>
                                    uniform3f
                                    |> expect
                                    |> toCalledWith([|posArr[0] |> Obj.magic, 1., 2., 3.|])
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
                "test send point light record",
                () => {
                  let _prepareFour = (sandbox, state) => {
                    let (state, gameObject, _, material, _) =
                      FrontRenderLightJobTool.prepareGameObject(sandbox, state);
                    let (state, lightGameObject1, light1) = PointLightTool.createGameObject(state);
                    let (state, lightGameObject2, light2) = PointLightTool.createGameObject(state);
                    let (state, lightGameObject3, light3) = PointLightTool.createGameObject(state);
                    let (state, lightGameObject4, light4) = PointLightTool.createGameObject(state);
                    let (state, _, cameraTransform, _) = CameraTool.createCameraGameObject(state);
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
                      |> FakeGlToolWorker.setFakeGl(
                           FakeGlToolWorker.buildFakeGl(
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
                    () =>
                      describe(
                        "send position",
                        () =>
                          testPromise(
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
                              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                                ~state,
                                ~sandbox,
                                ~completeFunc=
                                  (_) =>
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
                                    |> resolve,
                                ()
                              )
                            }
                          )
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