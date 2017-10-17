open StateData;

open StateSystem;

open StateDataType;

let getIsTest (state: state) => getOptionValueFromState state.initConfigData.isTest;

let getIsTestFromStateData () =>
  switch stateData.state {
  | None => false
  | Some state => getIsTest state
  };

let setIsTest (isTest: bool) state::(state: state) => {
  ...state,
  initConfigData: {isTest: Some isTest}
};