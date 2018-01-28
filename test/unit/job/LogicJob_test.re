open Wonder_jest;

let _ =
  describe(
    "LogicJob",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
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
                        ~isDebug=Js.Nullable.return(Js.true_),
                        ~logicJobConfig=
                          LogicJobConfigTool.buildLogicJobConfig(
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
                      |> LogicJobTool.init
                  )
                  |> toThrowMessage("can't find job handle function whose job name is customJob")
              )
          )
      )
    }
  );