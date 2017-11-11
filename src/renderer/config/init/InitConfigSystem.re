open StateUtils;

open StateDataType;

let getIsTest = ({isTest}: stateData) : bool => Js.Option.getExn(isTest);

let setIsTest = (~isTest: bool, stateData: stateData) => stateData.isTest = Some(isTest);