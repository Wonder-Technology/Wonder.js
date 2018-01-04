let setStartTime = (startTime) => {
  Root.root##performance#={"now": () => startTime};
};