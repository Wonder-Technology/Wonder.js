let setStartTime = (startTime) => {
  Root.root##performance#={"now": () => startTime};
};

let getTimeControllerRecord = TimeControllerSystem._getTimeControllerData;