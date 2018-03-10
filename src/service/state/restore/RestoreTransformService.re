open StateDataType;

open TransformType;

/* let restore =
       (
         ({float32ArrayPoolMap} as sharedData, memoryConfig, typeArrayPoolRecord),
         {localToWorldMatrixMap, localPositionMap} as currentTransformRecord,
         targetTransformRecord
       ) => {
     let float32ArrayPoolMap =
       TypeArrayPoolTransformService.addAllTypeArrayToPool(
         ConfigMemoryService.getMaxTypeArrayPoolSize(memoryConfig),
         localToWorldMatrixMap,
         localPositionMap,
         float32ArrayPoolMap
       );
     (targetTransformRecord, {...sharedData, float32ArrayPoolMap})
   }; */
let restore = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let {localToWorldMatrixMap, localPositionMap} = currentState.transformRecord;
  let float32ArrayPoolMap =
    TypeArrayPoolTransformService.addAllTypeArrayToPool(
      ConfigMemoryService.getMaxTypeArrayPoolSize(targetState.memoryConfig),
      localToWorldMatrixMap,
      localPositionMap,
      float32ArrayPoolMap
    );
  (targetState, {...sharedData, float32ArrayPoolMap})
};