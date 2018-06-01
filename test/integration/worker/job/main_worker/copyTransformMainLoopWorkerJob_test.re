open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test copy transform main worker job",
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
                  ~transformCount=5,
                  ~basicMaterialCount=5,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => TestWorkerTool.clear(sandbox));
      describe
        (
          "if change transform data in main worker during render in render worker, the transform data in render worker shouldn't change",
          () =>
            testPromise(
              "test localToWorldMatrix",
              () => {
                let (state, _, (gameObjectTransform, _), _, _) =
                  GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
                    sandbox,
                    RenderBasicJobTool.prepareGameObject,
                    state^
                  );
                let state =
                  state
                  |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
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
                         ()
                       )
                     );
                let state = MainStateTool.setState(state);
                RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                  ~state,
                  ~sandbox,
                  ~completeFunc=
                    (_) =>
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
                               1.
                             |])
                           )
                         |])
                      |> resolve,
                  ~beforeExecRenderRenderWorkerJobsFunc=
                    (_) =>
                      MainStateTool.unsafeGetState()
                      |> TransformAPI.setTransformLocalPosition(
                           gameObjectTransform,
                           (10., 1., 2.)
                         )
                      |> TransformTool.update(gameObjectTransform)
                      |> MainStateTool.setState
                      |> ignore,
                  ()
                )
              }
            )
        )
        /* TODO test by set rotation

           testPromise(
             "test normalMatrix",
             () => {
               let (state, _, (gameObjectTransform, _), _, _) =
                 GLSLSenderTool.JudgeSendUniformData.prepareSendUniformData(
                   sandbox,
                   FrontRenderLightJobTool.prepareGameObject,
                   state^
                 );
               let state =
                 state |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (1., 2., 3.));
               let uniformMatrix3fv = createEmptyStubWithJsObjSandbox(sandbox);
               let pos = 0;
               let getUniformLocation =
                 GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_normalMatrix");
               let state =
                 state
                 |> FakeGlWorkerTool.setFakeGl(
                      FakeGlWorkerTool.buildFakeGl(
                        ~sandbox,
                        ~uniformMatrix3fv,
                        ~getUniformLocation,
                        ()
                      )
                    );
               let state = MainStateTool.setState(state);
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
                          Obj.magic(false),
                          Obj.magic(
                            Js.Typed_array.Float32Array.make([|1., 0., 0., 0., 1., 0., 0., 0., 1.|])
                          )
                        |])
                     |> resolve,
                 ~beforeExecRenderRenderWorkerJobsFunc=
                   (_) =>
                     MainStateTool.unsafeGetState()
                     |> TransformAPI.setTransformLocalPosition(gameObjectTransform, (10., 1., 2.))
                     |> TransformTool.update(gameObjectTransform)
                     |> MainStateTool.setState
                     |> ignore,
                 ()
               )
             }
           ) */
    }
  );