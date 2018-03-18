open Wonder_jest;

open TimeControllerAPI;

let _ =
  describe(
    "test tick job",
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
          ~loopPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "tick"
        }
      ]
    }
  ]
        |},
          ~loopJobs={|

[
        {
          "name": "tick"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfig(~sandbox, ~noWorkerJobRecord=_buildNoWorkerJobConfig(), ());
          TimeControllerTool.setStartTime(100.);
          TestTool.closeContractCheck()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "compute gameTime",
        () => {
          test(
            "gameTime's unit is second",
            () => {
              let state = state^ |> DirectorTool.init;
              let state = DirectorTool.run(state, ~time=1100., ());
              state |> getGameTime |> expect == 1.
            }
          );
          test(
            "record total game time",
            () => {
              let state = state^ |> DirectorTool.init;
              let state = DirectorTool.run(state, ~time=1000., ());
              let state = DirectorTool.run(state, ~time=2100., ());
              state |> getGameTime |> expect == 2.
            }
          )
        }
      );
      describe(
        "compute fps",
        () => {
          test(
            "fps is 60 on the first loop",
            () => {
              let state = state^ |> DirectorTool.init;
              let state = DirectorTool.run(state, ~time=500., ());
              state |> getFps |> expect == 60.
            }
          );
          test(
            "test compute",
            () => {
              let state = state^ |> DirectorTool.init;
              let state = DirectorTool.run(state, ~time=1000., ());
              let state = DirectorTool.run(state, ~time=1050., ());
              state |> getFps |> expect == 20.
            }
          )
        }
      )
    }
  );