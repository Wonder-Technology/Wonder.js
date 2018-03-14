open MainStateDataType;

open SourceInstanceType;

let _buildIsNotSendTransformMatrixDataMap = (isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap
  |> SparseMapSystem.reduceiValid(
       [@bs] ((newMap, _, index) => newMap |> WonderCommonlib.SparseMapSystem.set(index, false)),
       WonderCommonlib.SparseMapSystem.createEmpty()
     );

let restore = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let {matrixFloat32ArrayMap} = currentState.sourceInstanceRecord;
  let {isSendTransformMatrixDataMap} as targetRecord = targetState.sourceInstanceRecord;
  let float32ArrayPoolMap =
    TypeArrayPoolService.addAllFloat32TypeArrayToPool(
      matrixFloat32ArrayMap,
      ConfigMemoryService.getMaxBigTypeArrayPoolSize(targetState.memoryConfig),
      float32ArrayPoolMap
    );
  (
    {
      ...targetState,
      sourceInstanceRecord: {
        ...targetRecord,
        isSendTransformMatrixDataMap:
          _buildIsNotSendTransformMatrixDataMap(isSendTransformMatrixDataMap)
      }
    },
    {...sharedData, float32ArrayPoolMap}
  )
};