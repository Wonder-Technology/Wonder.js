open Wonder_jest;

let _ =
  describe(
    "test get render array job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~loopPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "get_render_array"
        }
      ]
    }
  ]
        |},
          ~loopJobs={|
[
        {
          "name": "get_render_array"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfig(~sandbox, ~noWorkerJobConfig=_buildNoWorkerJobConfig(), ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "get render gameObject array",
        () => {
          let (state, gameObject1, _) = MeshRendererTool.createGameObject(state^);
          let (state, gameObject2, _) = MeshRendererTool.createGameObject(state);
          let state = DirectorTool.run(state, ());
          state
          |> RenderTool.unsafeGetRenderArrayFromState
          |> expect == [|gameObject1, gameObject2|]
        }
      )
    }
  );