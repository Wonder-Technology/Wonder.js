open GlobalTempType;

open StateDataType;

/* let restore = (currentGlobalTempRecord, targetGlobalTempRecord) => {
     let {float32Array1} = currentGlobalTempRecord;
     {float32Array1: float32Array1}
   }; */
let restore = (currentState, targetState) => {
  ...targetState,
  globalTempRecord: currentState.globalTempRecord
};