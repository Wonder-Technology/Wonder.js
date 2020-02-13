


function getIsDebug(stateData) {
  return stateData[/* isDebug */1];
}

function setIsDebug(stateData, isDebug) {
  stateData[/* isDebug */1] = isDebug;
  return stateData;
}

export {
  getIsDebug ,
  setIsDebug ,
  
}
/* No side effect */
