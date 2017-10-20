open StateSystem;

open StateDataType;

let getIsTest (state: state):bool => getOptionValueFromState state.initConfigData.isTest;
let setIsTest isTest::(isTest: bool) (state: state) => {
  ...state,
  initConfigData: {isTest: Some isTest}
};