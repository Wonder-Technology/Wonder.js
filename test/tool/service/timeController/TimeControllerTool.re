open StateDataMainType;

let setStartTime = (startTime) => Root.root##performance#={"now": () => startTime};

let getTimeControllerRecord = (state) => state.timeControllerRecord;

let setElapsed = (elapsed, state) => {
  ...state,
  timeControllerRecord: {...state.timeControllerRecord, elapsed}
};