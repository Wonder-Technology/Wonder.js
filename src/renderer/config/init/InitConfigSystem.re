open StateUtils;

open StateDataType;

let getIsTest = (state: state) : bool => getOptionValueFromState(state.initConfig.isTest);

let setIsTest = (~isTest: bool, state:state, stateData:stateData) => {
  stateData.isTest = Some(isTest);
  {...state, initConfig: {isTest: Some(isTest)}}
};