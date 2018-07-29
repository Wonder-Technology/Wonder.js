open Wonder_jest;

open Js.Promise;

let _ =
  describe("test front render light render worker job", () => {
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
              ~transformCount=10,
              ~basicMaterialCount=10,
              (),
            ),
          (),
        );
    });
    afterEach(() => TestWorkerTool.clear(sandbox));
    describe("use program", () => {
      let _prepare = (sandbox, state) =>
        FrontRenderLightForNoWorkerAndWorkerJobTool.prepareForUseProgramCase(
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
    describe("send uniform data", () => {
      describe("test send u_normalMatrix", () =>
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
              FrontRenderLightJobTool.prepareGameObject,
              state^,
            );
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
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(
                   ~sandbox,
                   ~uniformMatrix3fv,
                   ~getUniformLocation,
                   (),
                 ),
               );
          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~completeFunc=
              _ =>
                uniformMatrix3fv
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
                         1.,
                         0.,
                         0.,
                         0.,
                         1.,
                       |]),
                     ),
                   |])
                |> resolve,
            (),
          );
        })
      );
      describe("test send light record", () => {
        describe("test send ambient light data", () =>
          testPromise("send u_ambient", () => {
            let (state, gameObject, _, material, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
            let (state, _, cameraTransform, _) =
              CameraTool.createCameraGameObject(state);
            let state =
              SceneAPI.setAmbientLightColor([|1., 0., 0.5|], state);
            let (state, posArr, (uniform1f, uniform3f)) =
              FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                sandbox,
                [|"u_ambient"|],
                state,
              );

            RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
              ~state,
              ~sandbox,
              ~completeFunc=
                _ =>
                  uniform3f
                  |> expect
                  |> toCalledWith([|posArr[0] |> Obj.magic, 1., 0., 0.5|])
                  |> resolve,
              (),
            );
          })
        );

        describe("test send direction light record", () =>
          describe("send structure record", () =>
            describe("send direction", () =>
              testPromise("test one light", () => {
                let (state, lightGameObject, material, light, cameraTransform) =
                  FrontRenderLightForNoWorkerAndWorkerJobTool.prepareOneForDirectionLight(
                    sandbox,
                    state^,
                  );
                let state =
                  state
                  |> TransformAPI.setTransformLocalRotation(
                       GameObjectAPI.unsafeGetGameObjectTransformComponent(
                         lightGameObject,
                         state,
                       ),
                       (0.1, 10.5, 1.5, 1.),
                     );

                let (state, posArr, (uniform1f, uniform3f)) =
                  FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                    sandbox,
                    [|"u_directionLights[0].direction"|],
                    state,
                  );
                RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                  ~state,
                  ~sandbox,
                  ~completeFunc=
                    _ =>
                      uniform3f
                      |> expect
                      |> toCalledWith([|
                           posArr[0] |> Obj.magic,
                           21.29999999197162,
                           31.300000005352253,
                           (-219.5200021448914),
                         |])
                      |> resolve,
                  (),
                );
              })
            )
          )
        );
        describe("test send point light record", () =>
          describe("send structure record", () =>
            describe("send position", () =>
              testPromise("test four lights", () => {
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
                  FrontRenderLightForNoWorkerAndWorkerJobTool.prepareFourForPointLight(
                    sandbox,
                    state^,
                  );
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
                  FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                    sandbox,
                    [|
                      "u_pointLights[0].position",
                      "u_pointLights[1].position",
                      "u_pointLights[2].position",
                      "u_pointLights[3].position",
                    |],
                    state,
                  );
                RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                  ~state,
                  ~sandbox,
                  ~completeFunc=
                    _ =>
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
                      |>
                      expect == (
                                  [posArr[0] |> Obj.magic, 1., 2., 3.],
                                  [posArr[1] |> Obj.magic, 2., 2., 3.],
                                  [posArr[2] |> Obj.magic, 3., 2., 3.],
                                  [posArr[3] |> Obj.magic, 4., 2., 3.],
                                )
                      |> resolve,
                  (),
                );
              })
            )
          )
        );
      });
    });
  });