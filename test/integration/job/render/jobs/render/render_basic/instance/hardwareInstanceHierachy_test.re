open Wonder_jest;

let _ =
  describe(
    "test hardware instance hierachy",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfigAndBufferConfig(
              sandbox,
              Js.Nullable.return(GeometryTool.buildBufferConfig(3000))
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "test hierachy transform",
        () => {
          open Transform;
          let (state, gameObject1, (_, _, _, _, objectInstanceGameObject1)) =
           RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(sandbox, state^);
          let (state, gameObject2, (_, _, _, _, objectInstanceGameObject2)) =
            RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(sandbox, state);
          let sourceTransform1 = GameObject.getGameObjectTransformComponent(gameObject1, state);
          let sourceTransform2 = GameObject.getGameObjectTransformComponent(gameObject2, state);
          let objectInstanceTransform1 =
            GameObject.getGameObjectTransformComponent(objectInstanceGameObject1, state);
          let objectInstanceTransform2 =
            GameObject.getGameObjectTransformComponent(objectInstanceGameObject2, state);
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