open Wonder_jest;

open TimeControllerAPI;

let _ =
  describe(
    "test start time job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "start_time"
        }
      ]
    }
  ]
        |},
          ~initJobs={|
[
        {
          "name": "start_time"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "set start time to now",
        () => {
          let startTime = 1.5;
          TimeControllerTool.setStartTime(startTime);
          let state = state^ |> DirectorTool.init;
          TimeControllerTool.getTimeControllerRecord(state).startTime |> expect == startTime
        }
      );
      test(
        "set elapsed to 0",
        () => {
          let state = state^ |> DirectorTool.init;
          TimeControllerTool.getTimeControllerRecord(state).elapsed |> expect == 0.
        }
      )
    }
  );