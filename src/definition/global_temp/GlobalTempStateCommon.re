open GlobalTempType;

open StateDataType;

let getGlobalTempData = (state: StateDataType.state) => state.globalTempData;

let restore = (currentState, targetState) => {
  let {float32Array1} = getGlobalTempData(currentState);
  {...targetState, globalTempData: {float32Array1: float32Array1}}
};