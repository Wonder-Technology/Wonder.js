open StateDataType;

open TypeArrayPoolType;

/* let restore =
       (
         currentRecord,
         {float32ArrayPoolMap, uint16ArrayPoolMap}: sharedDataForRestoreState,
         targetRecord
       ) => {
     float32ArrayPoolMap,
     uint16ArrayPoolMap
   }; */
let restore =
    (
      currentState,
      {float32ArrayPoolMap, uint16ArrayPoolMap}: sharedDataForRestoreState,
      targetState
    ) => {
  ...targetState,
  typeArrayPoolRecord: {float32ArrayPoolMap, uint16ArrayPoolMap}
};