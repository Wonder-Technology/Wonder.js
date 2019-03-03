open StateDataMainType;

let createWorker = [%bs.raw
  {|
   function(param) {
       var div = document.createElement("div");

div.postMessage = function(){};

return div;
   }
    |}
];

let stubPostMessage = (sandbox, worker) =>
  Sinon.createMethodStubWithJsObjSandbox(sandbox, worker, "postMessage");

let setFakeWorkersAndSetState = state =>
  {
    ...state,
    workerInstanceRecord:
      WorkerInstanceMainWorkerTool.setRenderWorker(
        state.workerInstanceRecord,
        createWorker(),
      ),
  }
  |> MainStateTool.setState;