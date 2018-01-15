open StateSystem;

open StateDataType;

let getIsTest = ({isDebug}: stateData) : bool => isDebug;

let setIsTest = (~isDebug: bool, stateData: stateData) => stateData.isDebug = isDebug;