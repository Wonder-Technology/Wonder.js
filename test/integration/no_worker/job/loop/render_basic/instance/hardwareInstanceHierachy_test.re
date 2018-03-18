open Wonder_jest;

let _ =
  describe(
    "test hardware instance hierachy",
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
      test(
        "test hierachy transform",
        () => {
          open TransformAPI;
          let (state, gameObject1, (_, _, _, _, objectInstanceGameObject1)) =
           RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(sandbox, state^);
          let (state, gameObject2, (_, _, _, _, objectInstanceGameObject2)) =
            RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(sandbox, state);
          let sourceTransform1 = GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject1, state);
          let sourceTransform2 = GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject2, state);
          let objectInstanceTransform1 =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(objectInstanceGameObject1, state);
          let objectInstanceTransform2 =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(objectInstanceGameObject2, state);
          let state =
            state |> setTransformParent(Js.Nullable.return(sourceTransform1), sourceTransform2);
          let state =
            state
            |> setTransformParent(
                 Js.Nullable.return(objectInstanceTransform1),
                 objectInstanceTransform2
               );
          let pos1 = (1., 2., 3.);
          let pos2 = (5., 10., 30.);
          let state =
            state
            |> setTransformLocalPosition(sourceTransform1, pos1)
            |> setTransformLocalPosition(objectInstanceTransform1, pos2);
          (
            state |> getTransformPosition(sourceTransform2),
            state |> getTransformPosition(objectInstanceGameObject2)
          )
          |> expect == (pos1, pos2)
        }
      )
    }
  );