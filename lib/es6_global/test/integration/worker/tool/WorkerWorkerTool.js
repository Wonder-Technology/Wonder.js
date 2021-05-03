

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../job/main_worker/tool/WorkerInstanceMainWorkerTool.js";

var createWorker = (
   function(param) {
       var div = document.createElement("div");

div.postMessage = function(){};

return div;
   }
    );

function stubPostMessage(sandbox, worker) {
  return Sinon.createMethodStubWithJsObjSandbox(sandbox, worker, "postMessage");
}

function setFakeWorkersAndSetState(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  return MainStateTool$Wonderjs.setState((newrecord[/* workerInstanceRecord */39] = WorkerInstanceMainWorkerTool$Wonderjs.setRenderWorker(state[/* workerInstanceRecord */39], Curry._1(createWorker, /* () */0)), newrecord));
}

export {
  createWorker ,
  stubPostMessage ,
  setFakeWorkersAndSetState ,
  
}
/* createWorker Not a pure module */
