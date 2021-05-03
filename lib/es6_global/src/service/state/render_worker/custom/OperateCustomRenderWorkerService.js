


function getCustomDataInRenderWorker(state) {
  return state[/* customRecord */31][/* customDataInRenderWorker */0];
}

function setCustomDataInRenderWorker(customData, state) {
  var init = state[/* customRecord */31];
  state[/* customRecord */31] = /* record */[
    /* customDataInRenderWorker */customData,
    /* customDataFromRenderWorkerToMainWorker */init[/* customDataFromRenderWorkerToMainWorker */1],
    /* customDataFromMainWorkerToRenderWorker */init[/* customDataFromMainWorkerToRenderWorker */2]
  ];
  return state;
}

function getCustomDataFromRenderWorkerToMainWorker(state) {
  return state[/* customRecord */31][/* customDataFromRenderWorkerToMainWorker */1];
}

function setCustomDataFromRenderWorkerToMainWorker(customData, state) {
  var init = state[/* customRecord */31];
  state[/* customRecord */31] = /* record */[
    /* customDataInRenderWorker */init[/* customDataInRenderWorker */0],
    /* customDataFromRenderWorkerToMainWorker */customData,
    /* customDataFromMainWorkerToRenderWorker */init[/* customDataFromMainWorkerToRenderWorker */2]
  ];
  return state;
}

function getCustomDataFromMainWorkerToRenderWorker(state) {
  return state[/* customRecord */31][/* customDataFromMainWorkerToRenderWorker */2];
}

function setCustomDataFromMainWorkerToRenderWorker(customData, state) {
  var init = state[/* customRecord */31];
  state[/* customRecord */31] = /* record */[
    /* customDataInRenderWorker */init[/* customDataInRenderWorker */0],
    /* customDataFromRenderWorkerToMainWorker */init[/* customDataFromRenderWorkerToMainWorker */1],
    /* customDataFromMainWorkerToRenderWorker */customData
  ];
  return state;
}

export {
  getCustomDataInRenderWorker ,
  setCustomDataInRenderWorker ,
  getCustomDataFromRenderWorkerToMainWorker ,
  setCustomDataFromRenderWorkerToMainWorker ,
  getCustomDataFromMainWorkerToRenderWorker ,
  setCustomDataFromMainWorkerToRenderWorker ,
  
}
/* No side effect */
