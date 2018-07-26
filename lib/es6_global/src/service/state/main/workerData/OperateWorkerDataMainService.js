

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function getRenderWorkerCustomData(state) {
  return state[/* workerDataRecord */38][/* renderWorkerData */1][/* customDataFromRenderWorkerToMainWorker */0];
}

function setRenderWorkerCustomData(customData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* workerDataRecord */38];
  newrecord[/* workerDataRecord */38] = /* record */[
    /* mainWorkerData */init[/* mainWorkerData */0],
    /* renderWorkerData : record */[/* customDataFromRenderWorkerToMainWorker */customData]
  ];
  return newrecord;
}

function getMainWorkerCustomData(state) {
  return state[/* workerDataRecord */38][/* mainWorkerData */0][/* customDataFromMainWorkerToRenderWorker */0];
}

function setMainWorkerCustomData(customData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* workerDataRecord */38];
  newrecord[/* workerDataRecord */38] = /* record */[
    /* mainWorkerData : record */[/* customDataFromMainWorkerToRenderWorker */customData],
    /* renderWorkerData */init[/* renderWorkerData */1]
  ];
  return newrecord;
}

export {
  getRenderWorkerCustomData ,
  setRenderWorkerCustomData ,
  getMainWorkerCustomData ,
  setMainWorkerCustomData ,
  
}
/* No side effect */
