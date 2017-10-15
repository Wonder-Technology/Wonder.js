open StateData;

let getIsTest () =>
  switch stateData.state {
  | None => false
  | Some state => state.initConfigData.isTest
  };

let setIsTest (isTest: bool) state::(state: state) => {
  ...state,
  initConfigData: {isTest:isTest}
};