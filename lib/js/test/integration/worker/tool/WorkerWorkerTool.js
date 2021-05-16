'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../job/main_worker/tool/WorkerInstanceMainWorkerTool.js");

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

exports.createWorker = createWorker;
exports.stubPostMessage = stubPostMessage;
exports.setFakeWorkersAndSetState = setFakeWorkersAndSetState;
/* createWorker Not a pure module */
