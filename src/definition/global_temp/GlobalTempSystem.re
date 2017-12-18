open GlobalTempType;

let getFloat32Array1 = (state: StateDataType.state) =>
  GlobalTempStateCommon.getGlobalTempData(state).float32Array1;

let restoreFromState = GlobalTempStateCommon.restoreFromState;