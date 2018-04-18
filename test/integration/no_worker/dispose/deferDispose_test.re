open Wonder_jest;

let _ =
  describe(
    "test defer dispose",
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
        "defer dispose to the time which before update_transform job",
        () =>
          describe(
            "test defer batch dispose gameObject",
            () => {
              test(
                "dispose before update_transform",
                () => {
                  let (state, gameObject1, _, _, _) =
                    RenderBasicJobTool.prepareGameObject(sandbox, state^);
                  let transform1 =
                    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject1, state);
                  let (state, gameObject2, _, _, _) =
                    RenderBasicJobTool.prepareGameObject(sandbox, state);
                  let transform2 =
                    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject2, state);
                  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                  let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                  let state =
                    state
                    |> TransformAPI.setTransformParent(Js.Nullable.return(transform1), transform2)
                    |> TransformAPI.setTransformLocalPosition(transform1, (1., 2., 3.))
                    |> TransformAPI.setTransformLocalPosition(transform2, (4., 5., 6.));
                  let state = state |> GameObjectAPI.batchDisposeGameObject([|gameObject1|]);
                  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                  TransformTool.getLocalToWorldMatrixTypeArray(transform2, state)
                  |>
                  expect == Js.Typed_array.Float32Array.make([|
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
                              4.,
                              5.,
                              6.,
                              1.
                            |])
                }
              );
              describe(
                "dispose before render",
                () =>
                  test(
                    "not send disposed one's uniform data",
                    () => {
                      let (state, gameObject1, _, _, _) =
                        RenderBasicJobTool.prepareGameObject(sandbox, state^);
                      let transform1 =
                        GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject1, state);
                      let (state, gameObject2, _, _, _) =
                        RenderBasicJobTool.prepareGameObject(sandbox, state);
                      let transform2 =
                        GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject2, state);
                      let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                      let name = "u_mMatrix";
                      let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                      let pos = 0;
                      let getUniformLocation =
                        GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~uniformMatrix4fv,
                               ~getUniformLocation,
                               ()
                             )
                           );
                      let state =
                        state
                        |> TransformAPI.setTransformParent(
                             Js.Nullable.return(transform1),
                             transform2
                           )
                        |> TransformAPI.setTransformLocalPosition(transform1, (1., 2., 3.))
                        |> TransformAPI.setTransformLocalPosition(transform2, (4., 5., 6.));
                      let state = state |> GameObjectAPI.batchDisposeGameObject([|gameObject1|]);
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      uniformMatrix4fv
                      |> expect
                      |> not_
                      |> toCalledWith([|
                           pos,
                           Obj.magic(Js.false_),
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
                    }
                  )
              )
            }
          )
      )
    }
  );