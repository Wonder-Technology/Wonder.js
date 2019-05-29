open Wonder_jest;

open Js.Promise;

open JobType;

let _ =
  describe("operate custom worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      SettingWorkerTool.buildFakeCanvasForNotPassCanvasId(sandbox);
      state := TestMainWorkerTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test operate custom job", () =>
      describe("test operate main init job", () => {
        describe("addWorkerMainInitJob", () =>
          describe("add job to main init pipeline", () => {
            describe("test add job after target job", () => {
              testPromise("test add job to group job", () => {
                let customData = [||];
                let state =
                  state^
                  |> JobAPI.addWorkerMainInitJob(
                       ("customJob1", "transfer_job_data"),
                       AFTER,
                       stateData => {
                         let state =
                           StateDataMainService.unsafeGetState(stateData);
                         customData |> ArrayService.push(1) |> ignore;
                       },
                     );
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker =>
                       customData |> expect == [|1|],
                   );
              });
              testPromise("test add job to concat job and merge job", () => {
                let customData = [||];
                let state =
                  state^
                  |> JobAPI.addWorkerMainInitJob(
                       ("customJob1", "transfer_job_data"),
                       AFTER,
                       stateData => {
                         let state =
                           StateDataMainService.unsafeGetState(stateData);
                         customData |> ArrayService.push(1) |> ignore;
                       },
                     )
                  |> JobAPI.addWorkerMainInitJob(
                       ("customJob2", "send_job_data"), AFTER, stateData =>
                       customData |> ArrayService.push(2) |> ignore
                     );
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker =>
                       customData |> expect == [|2, 1|],
                   );
              });
              testPromise("test add two job", () => {
                let customData = [||];
                let state =
                  state^
                  |> JobAPI.addWorkerMainInitJob(
                       ("customJob1", "send_init_render_data"),
                       AFTER,
                       stateData => {
                         let state =
                           StateDataMainService.unsafeGetState(stateData);
                         customData |> ArrayService.push(1) |> ignore;
                       },
                     )
                  |> JobAPI.addWorkerMainInitJob(
                       ("customJob2", "customJob1"), AFTER, stateData =>
                       customData |> ArrayService.push(2) |> ignore
                     );
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker =>
                       customData |> expect == [|1, 2|],
                   );
              });
            });

            testPromise("test add job to head", () => {
              state :=
                TestMainWorkerTool.initWithJobConfig(
                  ~sandbox,
                  ~workerJobRecord=
                    WorkerJobTool.buildWorkerJobConfig(
                      ~mainInitPipelines=
                        {|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "begin_init",
          "link": "merge",
          "jobs": [
            {
              "name": "init"
            }
          ]
        },
        {
          "name": "init",
          "link": "concat",
          "jobs": [
            {
              "name": "init_script"
            }
            ]
          },
        {
          "name": "frame",
          "link": "concat",
          "jobs": [
            {
              "name": "begin_init"
            }
          ]
        }
      ]
    }
  ]
    |},
                      (),
                    ),
                  (),
                );

              let customData = [||];
              let state =
                state^
                |> JobAPI.addWorkerMainInitJob(
                     ("customJob1", "init_script"),
                     BEFORE,
                     stateData => {
                       let state =
                         StateDataMainService.unsafeGetState(stateData);
                       customData |> ArrayService.push(1) |> ignore;
                     },
                   )
                |> JobAPI.addWorkerMainInitJob(
                     ("customJob2", "customJob1"), BEFORE, stateData =>
                     customData |> ArrayService.push(2) |> ignore
                   );
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.testWithJobHandleMap(
                   sandbox,
                   MainInitJobMainWorkerTool.createMainInitJobHandleMap([
                     (
                       "init_script",
                       (flags, stateData) =>
                         MostUtils.callFunc(() => {
                           customData |> ArrayService.push(10) |> ignore;

                           None;
                         }),
                     ),
                   ]),
                   state =>
                     WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                       state,
                     ),
                   postMessageToRenderWorker =>
                     customData |> expect == [|2, 1, 10|],
                 );
            });
          })
        );
        describe("removeWorkerMainInitJob", () => {
          testPromise("test remove custom added job", () => {
            let customData = [||];
            let state =
              state^
              |> JobAPI.addWorkerMainInitJob(
                   ("customJob", "transfer_job_data"),
                   AFTER,
                   stateData => {
                     let state =
                       StateDataMainService.unsafeGetState(stateData);
                     customData |> ArrayService.push(1) |> ignore;

                     ();
                   },
                 )
              |> JobAPI.removeWorkerMainInitJob("customJob");
            MainInitJobMainWorkerTool.prepare()
            |> MainInitJobMainWorkerTool.test(
                 sandbox,
                 state =>
                   WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
                 postMessageToRenderWorker => customData |> expect == [||],
               );
          });
          describe("test remove default job", () => {
            testPromise("test remove group job", () => {
              let customData = [||];
              let state =
                state^ |> JobAPI.removeWorkerMainInitJob("transfer_job_data");
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.test(
                   sandbox,
                   state =>
                     WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                       state,
                     ),
                   postMessageToRenderWorker =>
                     postMessageToRenderWorker
                     |> expect
                     |> not_
                     |> toCalledWith([|
                          {
                            "operateType": "SEND_JOB_DATA",
                            "pipelineJobs": Sinon.matchAny,
                            "jobs": Sinon.matchAny,
                          },
                        |]),
                 );
            });
            testPromise("test remove atom job", () => {
              let customData = [||];
              let state =
                state^
                |> JobAPI.removeWorkerMainInitJob("send_job_data")
                |> JobAPI.removeWorkerMainInitJob("get_finish_send_job_data");
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.test(
                   sandbox,
                   state =>
                     WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                       state,
                     ),
                   postMessageToRenderWorker =>
                     postMessageToRenderWorker
                     |> expect
                     |> not_
                     |> toCalledWith([|
                          {
                            "operateType": "SEND_JOB_DATA",
                            "pipelineJobs": Sinon.matchAny,
                            "jobs": Sinon.matchAny,
                          },
                        |]),
                 );
            });
          });
        });
      })
    );
  });