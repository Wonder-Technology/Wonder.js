open Wonder_jest;

let _ =
  describe(
    "RenderJobConfig",
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
                  expect(() => RenderJobConfigTool.getInitPipelines(state^))
                  |> toThrowMessage("expect render job config exist, but actual not")
              )
          )
      )
    }
  );