open Wonder_jest;

open TransformAPI;

let _ =
  describe(
    "test update transform job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~loopPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "update_transform"
        }
      ]
    }
  ]
        |},
          ~loopJobs={|
[
        {
          "name": "update_transform"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithJobConfig(sandbox, _buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test special cases",
        () =>
          test(
            "shouldn't update disposed transform's data",
            () => {
              let (state, transform1) = createTransform(state^);
              let (state, transform2) = createTransform(state);
              let pos1 = (1., 2., 3.);
              let pos2 = (3., 1., 2.);
              let state =
                state
                |> setTransformLocalPosition(transform1, pos1)
                |> setTransformLocalPosition(transform2, pos2);
              let state = TransformTool.dispose(transform1, state);
              let state = state |> DirectorTool.runWithDefaultTime;
              state
              |> TransformTool.getLocalToWorldMatrix(transform1)
              |> expect == TransformTool.getDefaultLocalToWorldMatrix(state)
            }
          )
      )
    }
  );