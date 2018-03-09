open Wonder_jest;


let _ =
  describe(
    "test send finish render job data job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolMainWorker.initWithJobConfig(
            ~sandbox,
            ~workerJobConfig=WorkerJobConfigToolWorker.buildWorkerJobConfig(),
            ()
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      /* testPromise(
        "aaa",
        () =>{
          /* MainInitJobToolMainWorkerTool.prepare()
          |> MainInitJobToolMainWorkerTool.test(
               sandbox,
               (postMessageToRenderWorker) =>
                 postMessageToRenderWorker
                 |> expect
                 |> toCalledWith([|{"operateType": "INIT_RENDER"}|])
             ) */
  open Js.Promise;
  /* let renderWorker = WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state);
  let postMessageToRenderWorker = WorkerToolWorker.stubPostMessage(sandbox, renderWorker);
  StateTool.getState() */

       WorkerJobSystem.getRenderWorkerJobStreamArr(


       {|
[
                [
                    {
                        "name": "send_finish_send_job_data"
                    },
                    {
                        "name": "get_init_render_data"
                    },
                    {
                        "name": "init_gl"
                    },
                    {
                        "name": "send_finish_init_render_data"
                    }
                ]
            ]
        |} 
        |> Obj.magic |> Js.Json.stringify
         |> Js.Json.parseExn |> Obj.magic,
       {|
        [
    {
        "name": "send_finish_send_job_data",
        "flags": [
            "FINISH_SEND_JOB_DATA"
        ]
    },
    {
        "name": "get_init_render_data",
        "flags": [
            "INIT_RENDER"
        ]
    },
    {
        "name": "init_gl"
    },
    {
        "name": "send_finish_init_render_data",
        "flags": [
            "FINISH_INIT_RENDER"
        ]
    }
]
        |}

        |> Obj.magic |> Js.Json.stringify
        |> Js.Json.parseExn |> Obj.magic,
         RenderWorkerStateData.renderWorkerStateData
       )
       |> Most.mergeArray
  |> Most.forEach(
       (data) =>
         /* switch data {
         | Some("SEND_JOB_DATA") =>
           EventToolWorker.triggerWorkerEvent(
             renderWorker,
             "message",
             {"data": {"operateType": "FINISH_SEND_JOB_DATA"}}
           )
           |> ignore
         | Some("INIT_RENDER") =>
           EventToolWorker.triggerWorkerEvent(
             renderWorker,
             "message",
             {"data": {"operateType": "FINISH_INIT_RENDER"}}
           )
           |> ignore
         | _ => ()
         } */
         {
           WonderLog.Log.logJson(data) |> ignore;
         }
     )
  |> then_(() => 
  
 expect(1)  == 1
  |> resolve)

        }


      ); */
/* TODO finish */
test
("", 
(
() => {
1 |> expect == 1
})
);

    }
  );