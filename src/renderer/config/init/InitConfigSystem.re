open StateSystem;

open StateDataType;

let getIsDebug = ({isDebug}: stateData) : bool => isDebug;

let setIsDebug = (isDebug: bool, stateData: stateData) => stateData.isDebug = isDebug;