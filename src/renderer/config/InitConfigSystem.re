open StateData;

let getIsTest () =>
  switch stateData.state {
  | None => false
  | Some state => state.mainConfigData.isTest
  };

let setIsTest (isTest: bool) state::(state: state) => {
  ...state,
  mainConfigData: {...state.mainConfigData, isTest}
};