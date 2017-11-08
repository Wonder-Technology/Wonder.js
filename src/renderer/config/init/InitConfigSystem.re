open StateUtils;

open StateDataType;

let getIsTest = (state: state) : bool => getOptionValueFromState(state.initConfig.isTest);

let setIsTest = (~isTest: bool, state: state) => {
  ...state,
  initConfig: {isTest: Some(isTest)}
};
