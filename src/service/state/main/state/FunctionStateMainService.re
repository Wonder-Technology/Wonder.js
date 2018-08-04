open StateDataMainType;

let getUnsafeGetStateFunc = state => state.stateRecord.unsafeGetStateFunc;

let setUnsafeGetStateFunc = (unsafeGetStateFunc, state) => {
  ...state,
  stateRecord: {
    ...state.stateRecord,
    unsafeGetStateFunc,
  },
};

let getSetStateFunc = state => state.stateRecord.setStateFunc;

let setSetStateFunc = (setStateFunc, state) => {
  ...state,
  stateRecord: {
    ...state.stateRecord,
    setStateFunc,
  },
};