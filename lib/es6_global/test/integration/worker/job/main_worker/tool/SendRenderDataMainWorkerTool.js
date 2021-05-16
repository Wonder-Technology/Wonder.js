

import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as WorkerWorkerTool$Wonderjs from "../../../tool/WorkerWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "./TestMainWorkerTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "./WorkerInstanceMainWorkerTool.js";

function prepareForTestSendRenderData(sandbox) {
  var state = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var state$1 = WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(state);
  var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state$1);
  var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
  MainStateTool$Wonderjs.setState(state$1);
  return /* tuple */[
          state$1,
          postMessageToRenderWorker
        ];
}

export {
  prepareForTestSendRenderData ,
  
}
/* MainStateTool-Wonderjs Not a pure module */
