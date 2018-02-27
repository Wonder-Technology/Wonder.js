let setStartTime = (startTime) => {
  Root.root##performance#={"now": () => startTime};
};

let getTimeControllerData = TimeControllerSystem._getTimeControllerData;