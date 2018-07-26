


function getCustomDataFromRenderWorkerToMainWorker(state) {
  return state[/* customRecord */29][/* customDataFromRenderWorkerToMainWorker */0];
}

function setCustomDataFromRenderWorkerToMainWorker(customData, state) {
  var init = state[/* customRecord */29];
  state[/* customRecord */29] = /* record */[
    /* customDataFromRenderWorkerToMainWorker */customData,
    /* customDataFromMainWorkerToRenderWorker */init[/* customDataFromMainWorkerToRenderWorker */1]
  ];
  return state;
}

function getCustomDataFromMainWorkerToRenderWorker(state) {
  return state[/* customRecord */29][/* customDataFromMainWorkerToRenderWorker */1];
}

function setCustomDataFromMainWorkerToRenderWorker(customData, state) {
  var init = state[/* customRecord */29];
  state[/* customRecord */29] = /* record */[
    /* customDataFromRenderWorkerToMainWorker */init[/* customDataFromRenderWorkerToMainWorker */0],
    /* customDataFromMainWorkerToRenderWorker */customData
  ];
  return state;
}

export {
  getCustomDataFromRenderWorkerToMainWorker ,
  setCustomDataFromRenderWorkerToMainWorker ,
  getCustomDataFromMainWorkerToRenderWorker ,
  setCustomDataFromMainWorkerToRenderWorker ,
  
}
/* No side effect */
