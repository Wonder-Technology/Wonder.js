open Wonder_jest;

let _ =
  describe(
    "NoWorkerJobConfig",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getInitPipelines",
        () =>
          describe(
            "contract check",
            () =>
              test(
                "should exist job config",
                () =>
                  expect(() => NoWorkerJobConfigTool.getInitPipelines(state^))
                  |> toThrowMessage("expect noWorker job config exist, but actual not")
              )
          )
      )
    }
  );