open Wonder_jest;

let _ =
  describe("test start_time job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~initPipelineData={
          name: "init",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "start_time", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("set start time to now", () => {
      let now = 1.5;

      TimeDpCPAPI.set({getNow: () => now});

      DirectorCPTool.init(
        ~handleSuccessFunc=
          () => {TimeCPTool.getTimePO().startTime->expect == now->Some},
        (),
      );
    });
    testPromise("set elapsed to 0", () => {
      DirectorCPTool.init(
        ~handleSuccessFunc=() => {TimeCPTool.getElapsed()->expect == 0.0},
        (),
      )
    });
  });
