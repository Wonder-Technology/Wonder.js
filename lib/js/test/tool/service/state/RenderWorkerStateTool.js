'use strict';

var StateDataRenderWorker$Wonderjs = require("../../../../src/service/state/render_worker/data/StateDataRenderWorker.js");
var StateRenderWorkerService$Wonderjs = require("../../../../src/service/state/render_worker/state/StateRenderWorkerService.js");
var CreateStateRenderWorkerService$Wonderjs = require("../../../../src/service/state/render_worker/state/CreateStateRenderWorkerService.js");

function getStateData(param) {
  return StateDataRenderWorker$Wonderjs.renderWorkerStateData;
}

function unsafeGetState(param) {
  return StateRenderWorkerService$Wonderjs.unsafeGetState(StateDataRenderWorker$Wonderjs.renderWorkerStateData);
}

function getState(param) {
  var match = StateDataRenderWorker$Wonderjs.renderWorkerStateData[/* state */0];
  if (match !== undefined) {
    return match;
  } else {
    return CreateStateRenderWorkerService$Wonderjs.createState(/* () */0);
  }
}

function setState(state) {
  return StateRenderWorkerService$Wonderjs.setState(StateDataRenderWorker$Wonderjs.renderWorkerStateData, state);
}

function createState(param) {
  return CreateStateRenderWorkerService$Wonderjs.createState(/* () */0);
}

function createStateAndSetToStateData(param) {
  return StateRenderWorkerService$Wonderjs.setState(StateDataRenderWorker$Wonderjs.renderWorkerStateData, CreateStateRenderWorkerService$Wonderjs.createState(/* () */0));
}

exports.getStateData = getStateData;
exports.unsafeGetState = unsafeGetState;
exports.getState = getState;
exports.setState = setState;
exports.createState = createState;
exports.createStateAndSetToStateData = createStateAndSetToStateData;
/* StateRenderWorkerService-Wonderjs Not a pure module */
