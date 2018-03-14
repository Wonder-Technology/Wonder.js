open MainStateDataType;

open TransformType;

let restore = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let {localToWorldMatrixMap, localPositionMap} = currentState.transformRecord;
  let float32ArrayPoolMap =
    TypeArrayPoolTransformService.addAllTypeArrayToPool(
      MemorySettingService.getMaxTypeArrayPoolSize(targetState.settingRecord),
      localToWorldMatrixMap,
      localPositionMap,
      float32ArrayPoolMap
    );
  (targetState, {...sharedData, float32ArrayPoolMap})
};