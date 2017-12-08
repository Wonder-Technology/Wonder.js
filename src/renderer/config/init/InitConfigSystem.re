open StateSystem;

open StateDataType;

let getIsTest = ({isTest}: stateData) : bool => isTest;

let setIsTest = (~isTest: bool, stateData: stateData) => stateData.isTest = isTest;