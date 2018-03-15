open Wonder_jest;

let _ =
  describe(
    "NoWorkerJob",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(CreateStateMainService.createState());
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "init",
        () =>
          describe(
            "contract check",
            () =>
              test(
                "job defined in config file should exist job handle map",
                () =>
                  expect(
                    () =>
                      TestTool.initWithJobConfig(
                        ~sandbox,
                        ~isDebug="true",
                        ~noWorkerJobRecord=
                          NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                            ~initPipelines={|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "customJob"
        }
      ]
    }
  ]
        |},
                            ~initJobs={|
[
    {

          "name": "customJob"
    }
]
        |},
                            ()
                          ),
                        ()
                      )
                      |> NoWorkerJobTool.init
                  )
                  |> toThrowMessage("can't find job handle function whose job name is customJob")
              )
          )
      )
    }
  );