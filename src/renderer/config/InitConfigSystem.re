open StateData;

open StateSystem;

open StateDataType;

let getIsTest () =>
  switch stateData.state {
  | None => false
  | Some state => getOptionValueFromState state.initConfigData.isTest
  };

let setIsTest (isTest: bool) state::(state: state) => {...state, initConfigData: {isTest: Some isTest}};