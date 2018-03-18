open Wonder_jest;

let _ =
  describe(
    "OperateMainInitWorkerJobService",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      /* let state = ref (StateSystem.createState ()); */
      beforeEach
        (() => sandbox := createSandbox());
        /* state := TestTool.init (~sandbox, ()) */
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "_findFrameJob",
        () =>
          describe(
            "contract check",
            () => {
              beforeEach(() => TestTool.openContractCheck());
              test(
                "frame job should only has one",
                () =>
                  WorkerJobType.(
                    expect(
                      () =>
                        OperateMainInitWorkerJobService._findFrameJob([|
                          {name: "frame", link: Obj.magic(1), jobs: Obj.magic(1)},
                          {name: "frame", link: Obj.magic(1), jobs: Obj.magic(1)}
                        |])
                    )
                    |> toThrowMessage("expect frame job only has one")
                  )
              )
            }
          )
      )
    }
  );