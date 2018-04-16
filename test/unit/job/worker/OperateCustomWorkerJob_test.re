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
          SettingToolWorker.buildFakeCanvasForNotPassCanvasId(sandbox);
          state := TestToolMainWorker.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test operate custom job",
        () =>
          describe(
            "test operate main init job",
            () => {
              describe(
                "addWorkerMainInitJob",
                () =>
                  describe(
                    "add job to main init pipeline",
                    () => {
                      describe(
                        "test add job after target job",
                        () => {
                          testPromise(
                            "test add job to group job",
                            () => {
                              let customData = [||];
                              let state =
                                state^
                                |> JobAPI.addWorkerMainInitJob(
                                     ("customJob1", "transfer_job_data"),
                                     AFTER,
                                     (stateData) => {
                                       let state = StateDataMainService.unsafeGetState(stateData);
                                       customData |> ArrayService.push(1) |> ignore
                                     }
                                   );
                              MainInitJobToolMainWorker.prepare()
                              |> MainInitJobToolMainWorker.test(
                                   sandbox,
                                   (state) =>
                                     WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                                   (postMessageToRenderWorker) => customData |> expect == [|1|]
                                 )
                            }
                          );
                          testPromise(
                            "test add job to concat job and merge job",
                            () => {
                              let customData = [||];
                              let state =
                                state^
                                |> JobAPI.addWorkerMainInitJob(
                                     ("customJob1", "transfer_job_data"),
                                     AFTER,
                                     (stateData) => {
                                       let state = StateDataMainService.unsafeGetState(stateData);
                                       customData |> ArrayService.push(1) |> ignore
                                     }
                                   )
                                |> JobAPI.addWorkerMainInitJob(
                                     ("customJob2", "send_job_data"),
                                     AFTER,
                                     (stateData) => customData |> ArrayService.push(2) |> ignore
                                   );
                              MainInitJobToolMainWorker.prepare()
                              |> MainInitJobToolMainWorker.test(
                                   sandbox,
                                   (state) =>
                                     WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                                   (postMessageToRenderWorker) => customData |> expect == [|2, 1|]
                                 )
                            }
                          );
                          testPromise(
                            "test add two job",
                            () => {
                              let customData = [||];
                              let state =
                                state^
                                |> JobAPI.addWorkerMainInitJob(
                                     ("customJob1", "send_init_render_data"),
                                     AFTER,
                                     (stateData) => {
                                       let state = StateDataMainService.unsafeGetState(stateData);
                                       customData |> ArrayService.push(1) |> ignore
                                     }
                                   )
                                |> JobAPI.addWorkerMainInitJob(
                                     ("customJob2", "customJob1"),
                                     AFTER,
                                     (stateData) => customData |> ArrayService.push(2) |> ignore
                                   );
                              MainInitJobToolMainWorker.prepare()
                              |> MainInitJobToolMainWorker.test(
                                   sandbox,
                                   (state) =>
                                     WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                                   (postMessageToRenderWorker) => customData |> expect == [|1, 2|]
                                 )
                            }
                          )
                        }
                      );
                      testPromise(
                        "test add job to head",
                        () => {
                          let customData = [||];
                          let state =
                            state^
                            |> JobAPI.addWorkerMainInitJob(
                                 ("customJob1", "transfer_job_data"),
                                 BEFORE,
                                 (stateData) => {
                                   let state = StateDataMainService.unsafeGetState(stateData);
                                   customData |> ArrayService.push(1) |> ignore
                                 }
                               )
                            |> JobAPI.addWorkerMainInitJob(
                                 ("customJob2", "customJob1"),
                                 BEFORE,
                                 (stateData) => customData |> ArrayService.push(2) |> ignore
                               );
                          MainInitJobToolMainWorker.prepare()
                          |> MainInitJobToolMainWorker.test(
                               sandbox,
                               (state) =>
                                 WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                               (postMessageToRenderWorker) => customData |> expect == [|2, 1|]
                             )
                        }
                      )
                    }
                  )
              );
              describe(
                "removeWorkerMainInitJob",
                () => {
                  testPromise(
                    "test remove custom added job",
                    () => {
                      let customData = [||];
                      let state =
                        state^
                        |> JobAPI.addWorkerMainInitJob(
                             ("customJob", "transfer_job_data"),
                             AFTER,
                             (stateData) => {
                               let state = StateDataMainService.unsafeGetState(stateData);
                               customData |> ArrayService.push(1) |> ignore
                             }
                           )
                        |> JobAPI.removeWorkerMainInitJob("customJob");
                      MainInitJobToolMainWorker.prepare()
                      |> MainInitJobToolMainWorker.test(
                           sandbox,
                           (state) => WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                           (postMessageToRenderWorker) => customData |> expect == [||]
                         )
                    }
                  );
                  describe(
                    "test remove default job",
                    () => {
                      testPromise(
                        "test remove group job",
                        () => {
                          let customData = [||];
                          let state =
                            state^ |> JobAPI.removeWorkerMainInitJob("transfer_job_data");
                          MainInitJobToolMainWorker.prepare()
                          |> MainInitJobToolMainWorker.test(
                               sandbox,
                               (state) =>
                                 WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                               (postMessageToRenderWorker) =>
                                 postMessageToRenderWorker
                                 |> expect
                                 |> not_
                                 |> toCalledWith([|
                                      {
                                        "operateType": "SEND_JOB_DATA",
                                        "pipelineJobs": Sinon.matchAny,
                                        "jobs": Sinon.matchAny
                                      }
                                    |])
                             )
                        }
                      );
                      testPromise(
                        "test remove atom job",
                        () => {
                          let customData = [||];
                          let state =
                            state^
                            |> JobAPI.removeWorkerMainInitJob("send_job_data")
                            |> JobAPI.removeWorkerMainInitJob("get_finish_send_job_data");
                          MainInitJobToolMainWorker.prepare()
                          |> MainInitJobToolMainWorker.test(
                               sandbox,
                               (state) =>
                                 WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                               (postMessageToRenderWorker) =>
                                 postMessageToRenderWorker
                                 |> expect
                                 |> not_
                                 |> toCalledWith([|
                                      {
                                        "operateType": "SEND_JOB_DATA",
                                        "pipelineJobs": Sinon.matchAny,
                                        "jobs": Sinon.matchAny
                                      }
                                    |])
                             )
                        }
                      )
                    }
                  )
                }
              )
            }
          )
      )
    }
  );