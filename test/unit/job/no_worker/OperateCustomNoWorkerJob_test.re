open Wonder_jest;

open JobType;

let _ =
  describe("operate custom no worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test register job", () => {
      describe("registerNoWorkerInitJob", () => {
        beforeEach(() => {
          state :=
            TestTool.createWithJobConfig(
              ~sandbox,
              ~noWorkerJobRecord=
                NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                  ~initPipelines=
                    {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "registerd"
        },
        {
          "name": "start_time"
        }
      ]
    }
  ]
        |},
                  ~initJobs=
                    {j|
[

    {
        "name": "registerd"
    },
    {
        "name": "start_time"
    }
]
        |j},
                  (),
                ),
              (),
            );

          state := DirectorTool.prepare(state^);
        });

        describe("add job which defined in init pipeline", () =>
          test("should register before init", () => {
            let customData = [||];
            let state =
              state^
              |> JobAPI.registerNoWorkerInitJob("registerd", (_, state) => {
                   customData |> ArrayService.push(1) |> ignore;
                   state;
                 });

            let state = state |> DirectorTool.init;

            customData |> expect == [|1|];
          })
        );
      });

      describe("registerNoWorkerLoopJob", () => {
        beforeEach(() => {
          state :=
            TestTool.createWithJobConfig(
              ~sandbox,
              ~noWorkerJobRecord=
                NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                  ~initPipelines=
                    {|
        [
    {
      "name": "default",
      "jobs": [
      ]
    }
  ]
        |},
                  ~initJobs={j|
[
]
        |j},
                  ~loopPipelines=
                    {|
                             [
                         {
                           "name": "default",
                           "jobs": [
                             {
                               "name": "tick"
                             },
        {
          "name": "registerd"
        }
                           ]
                         }
                       ]
                             |},
                  ~loopJobs=
                    {j|
                     [

                         {
                             "name": "tick"
                         },
        {
          "name": "registerd"
        }
                     ]
                             |j},
                  (),
                ),
              (),
            );

          state := DirectorTool.prepare(state^);
        });

        describe("add job which defined in loop pipeline", () =>
          test("should register before init", () => {
            let customData = [||];
            let state =
              state^
              |> JobAPI.registerNoWorkerLoopJob("registerd", (_, state) => {
                   customData |> ArrayService.push(2) |> ignore;
                   state;
                 });

            let state = state |> DirectorTool.init;
            let state = state |> DirectorTool.runWithDefaultTime;

            customData |> expect == [|2|];
          })
        );
      });
    });

    describe("test operate job", () => {
      let _prepare = state => {
        let (state, _, _, _) =
          InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
        state
        |> NoWorkerJobTool.init((
             NoWorkerJobHandleSystem.createInitJobHandleMap,
             NoWorkerJobHandleSystem.createLoopJobHandleMap,
           ));
      };

      beforeEach(() =>
        state :=
          TestTool.initWithJobConfig(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                ~initPipelines=
                  {|
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
                ~initJobs=
                  {j|
[

    {
        "name": "start_time"
    }
]
        |j},
                ~loopPipelines=
                  {|
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
                ~loopJobs=
                  {j|
[

    {
        "name": "tick"
    }
]
        |j},
                (),
              ),
            (),
          )
      );

      describe("test operate noWorker init job", () => {
        describe("addNoWorkerInitJob", () =>
          describe("add job to noWorker init pipeline", () => {
            beforeEach(() => state := DirectorTool.prepare(state^));
            describe("test add job after target job", () =>
              test("test add two job", () => {
                let state = _prepare(state);
                let customData = [||];
                let state =
                  state
                  |> JobAPI.addNoWorkerInitJob(
                       ("customJob1", "start_time"),
                       AFTER,
                       state => {
                         customData |> ArrayService.push(1) |> ignore;
                         state;
                       },
                     )
                  |> JobAPI.addNoWorkerInitJob(
                       ("customJob2", "customJob1"),
                       AFTER,
                       state => {
                         customData |> ArrayService.push(2) |> ignore;
                         state;
                       },
                     );
                let state = state |> NoWorkerJobTool.execInitJobs;
                customData |> expect == [|1, 2|];
              })
            );
            test("test add job before target job", () => {
              let state = _prepare(state);
              let customData = [||];
              let state =
                state
                |> JobAPI.addNoWorkerInitJob(
                     ("customJob1", "create_canvas"),
                     BEFORE,
                     state => {
                       customData |> ArrayService.push(1) |> ignore;
                       state;
                     },
                   )
                |> JobAPI.addNoWorkerInitJob(
                     ("customJob2", "start_time"),
                     AFTER,
                     state => {
                       customData |> ArrayService.push(2) |> ignore;
                       state;
                     },
                   );
              let state = state |> NoWorkerJobTool.execInitJobs;
              customData |> expect == [|1, 2|];
            });
          })
        );
        describe("removeNoWorkerInitJob", () => {
          test("test remove custom added job", () => {
            let state = _prepare(state);
            let customData = [||];
            let state =
              state
              |> JobAPI.addNoWorkerInitJob(
                   ("customJob", "start_time"),
                   AFTER,
                   state => {
                     customData |> ArrayService.push(1) |> ignore;
                     state;
                   },
                 )
              |> JobAPI.removeNoWorkerInitJob("customJob");
            let state = state |> NoWorkerJobTool.execInitJobs;
            customData |> expect == [||];
          });
          test("test remove default job", () => {
            let state = _prepare(state);
            let state = state |> JobAPI.removeNoWorkerInitJob("start_time");
            state
            |> NoWorkerJobTool.getNoWorkerInitJobList
            |> NoWorkerJobTool.isJobExistInJobList("start_time")
            |> expect == false;
          });
        });
      });
      describe("test operate noWorker loop job", () => {
        let _prepare = state => {
          let (state, _, _, _) =
            InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
          state
          |> NoWorkerJobTool.init((
               NoWorkerJobHandleSystem.createInitJobHandleMap,
               NoWorkerJobHandleSystem.createLoopJobHandleMap,
             ));
        };
        describe("addNoWorkerLoopJob", () =>
          describe("add job to noWorker loop pipeline", () =>
            describe("test add job after target job", () =>
              test("test add one job", () => {
                let state = _prepare(state);
                let customData = [||];
                let state =
                  state
                  |> JobAPI.addNoWorkerLoopJob(
                       ("customJob", "tick"),
                       AFTER,
                       state => {
                         customData
                         |> ArrayService.push(
                              TimeControllerService.getElapsed(
                                state.timeControllerRecord,
                              ),
                            )
                         |> ignore;
                         state;
                       },
                     );
                let elapsed = 100.1;
                let state =
                  state
                  |> TimeControllerTool.setElapsed(elapsed)
                  |> NoWorkerJobTool.execLoopJobs;
                customData |> expect == [|elapsed|];
              })
            )
          )
        );
        describe("removeNoWorkerLoopJob", () =>
          test("test remove custom added job", () => {
            let state = _prepare(state);
            let customData = [||];
            let state =
              state
              |> JobAPI.addNoWorkerLoopJob(
                   ("customJob", "tick"),
                   AFTER,
                   state => {
                     customData
                     |> ArrayService.push(
                          TimeControllerService.getElapsed(
                            state.timeControllerRecord,
                          ),
                        )
                     |> ignore;
                     state;
                   },
                 )
              |> JobAPI.removeNoWorkerLoopJob("customJob");
            let elapsed = 100.1;
            let state =
              state
              |> TimeControllerTool.setElapsed(elapsed)
              |> NoWorkerJobTool.execLoopJobs;
            customData |> expect == [||];
          })
        );
      });
    });
  });