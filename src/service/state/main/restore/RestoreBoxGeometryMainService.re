open MainStateDataType;

open BoxGeometryType;

let restore = (currentState, {float32ArrayPoolMap, uint16ArrayPoolMap} as sharedData, targetState) => {
  let {verticesMap, normalsMap, indicesMap} = currentState.boxGeometryRecord;
  let (float32ArrayPoolMap, uint16ArrayPoolMap) =
    TypeArrayPoolGeometryService.addAllTypeArrayToPool(
      ConfigMemoryService.getMaxTypeArrayPoolSize(targetState.memoryConfig),
      (verticesMap, normalsMap, indicesMap),
      (float32ArrayPoolMap, uint16ArrayPoolMap)
    );
  (targetState, {...sharedData, float32ArrayPoolMap, uint16ArrayPoolMap})
};