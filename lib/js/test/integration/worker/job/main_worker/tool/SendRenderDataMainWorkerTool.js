'use strict';

var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var WorkerWorkerTool$Wonderjs = require("../../../tool/WorkerWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("./TestMainWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("./WorkerInstanceMainWorkerTool.js");

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

exports.prepareForTestSendRenderData = prepareForTestSendRenderData;
/* MainStateTool-Wonderjs Not a pure module */
