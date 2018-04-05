open StateDataMainType;

open TypeArrayPoolType;

let restore =
    (
      currentState,
      {float32ArrayPoolMap, uint16ArrayPoolMap}: sharedDataForRestoreState,
      targetState
    ) => {
  ...targetState,
  typeArrayPoolRecord: {float32ArrayPoolMap, uint16ArrayPoolMap}
};