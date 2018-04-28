open Wonder_jest;

open Js.Promise;

open JobType;

let _ =
  describe(
    "operate custom worker job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(CreateStateMainService.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestMainWorkerTool.initWithJobConfig(~sandbox, ())
            |> WorkerJobTool.create(
                 WorkerJobTool.buildWorkerJobConfig(
                   ~mainInitPipelines=
                     WorkerJobTool.buildMainInitPipelinesConfigWithoutCreateWorkerInstanceAndMessage
                       (),
                   ~mainLoopPipelines={|[
    {
        "name": "default",
        "jobs": [
            {
                "name": "loop",
                "link": "concat",
                "jobs": [
                    {
                        "name": "tick"
                    },
                    {
                        "name": "copy_arraybuffer"
                    }
                ]
            },
            {
                "name": "copy_arraybuffer",
                "link": "concat",
                "jobs": [
                    {
                        "name": "copy_transform"
                    }
                ]
            },
            {
                "name": "frame",
                "link": "merge",
                "jobs": [
                    {
                        "name": "loop"
                    }
                ]
            }
        ]
    }
]|},
                   ()
                 )
               )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test operate custom job",
        () =>
          describe(
            "test operate main loop job",
            () => {
              describe(
                "addWorkerMainLoopJob",
                () =>
                  describe(
                    "add job to main loop pipeline",
                    () => {
                      describe(
                        "test add job after target job",
                        () =>
                          testPromise(
                            "test add job to group job",
                            () => {
                              let customData = [||];
                              let state =
                                state^
                                |> JobAPI.addWorkerMainLoopJob(
                                     ("customJob1", "copy_arraybuffer"),
                                     AFTER,
                                     (stateData) => {
                                       let state = StateDataMainService.unsafeGetState(stateData);
                                       customData |> ArrayService.push(1) |> ignore
                                     }
                                   );
                              MainStateTool.setState(state) |> ignore;
                              RenderJobsRenderWorkerTool.execMainLoopJobs(
                                sandbox,
                                (_) => customData |> expect == [|1|] |> resolve
                              )
                            }
                          )
                      );
                      testPromise(
                        "test add job to head",
                        () => {
                          let customData = [||];
                          let state =
                            state^
                            |> JobAPI.addWorkerMainLoopJob(
                                 ("customJob1", "copy_arraybuffer"),
                                 BEFORE,
                                 (stateData) => {
                                   let state = StateDataMainService.unsafeGetState(stateData);
                                   customData |> ArrayService.push(1) |> ignore
                                 }
                               )
                            |> JobAPI.addWorkerMainLoopJob(
                                 ("customJob2", "customJob1"),
                                 BEFORE,
                                 (stateData) => customData |> ArrayService.push(2) |> ignore
                               );
                          MainStateTool.setState(state) |> ignore;
                          RenderJobsRenderWorkerTool.execMainLoopJobs(
                            sandbox,
                            (_) => customData |> expect == [|2, 1|] |> resolve
                          )
                        }
                      )
                    }
                  )
              );
              describe(
                "removeWorkerMainLoopJob",
                () =>
                  testPromise(
                    "test remove custom added job",
                    () => {
                      let customData = [||];
                      let state =
                        state^
                        |> JobAPI.addWorkerMainLoopJob(
                             ("customJob", "tick"),
                             AFTER,
                             (stateData) => {
                               let state = StateDataMainService.unsafeGetState(stateData);
                               customData |> ArrayService.push(1) |> ignore
                             }
                           )
                        |> JobAPI.removeWorkerMainLoopJob("customJob");
                      MainStateTool.setState(state) |> ignore;
                      RenderJobsRenderWorkerTool.execMainLoopJobs(
                        sandbox,
                        (_) => customData |> expect == [||] |> resolve
                      )
                    }
                  )
              )
              /* describe(
                   "test remove default job",
                   () => {
                   }
                 ) */
            }
          )
      )
    }
  );