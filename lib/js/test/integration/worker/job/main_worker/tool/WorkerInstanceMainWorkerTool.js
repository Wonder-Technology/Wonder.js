'use strict';

var WorkerInstanceService$Wonderjs = require("../../../../../../src/service/record/main/workerInstance/WorkerInstanceService.js");

function unsafeGetRenderWorker(state) {
  return WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(state[/* workerInstanceRecord */39]);
}

var setRenderWorker = WorkerInstanceService$Wonderjs._setRenderWorker;

exports.setRenderWorker = setRenderWorker;
exports.unsafeGetRenderWorker = unsafeGetRenderWorker;
/* WorkerInstanceService-Wonderjs Not a pure module */
