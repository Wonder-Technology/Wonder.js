open Wonder_jest;

let _ =
  describe("test update_accumulation job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~updatePipelineData={
          name: "update",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "update_accumulation", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("increase total sample count", () => {
      let sampleCount = 2;
      DirectorCPTool.prepare(~sampleCount, ());
      let totalSampleCount = 10;
      PassCPTool.setTotalSampleCount(totalSampleCount);

      DirectorCPTool.initAndUpdate(
        ~handleSuccessFunc=
          () => {
            PassCPTool.getTotalSampleCount()->expect == totalSampleCount
            + sampleCount
          },
        (),
      );
    });
  });
