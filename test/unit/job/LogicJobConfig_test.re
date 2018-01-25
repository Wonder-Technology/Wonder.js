open Wonder_jest;

let _ =
  describe(
    "LogicJobConfig",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
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
                  expect(() => LogicJobConfigTool.getInitPipelines(state^))
                  |> toThrowMessage("expect logic job config exist, but actual not")
              )
          )
      )
    }
  );