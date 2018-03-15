open MainStateDataType;

open SourceInstanceType;

let _buildIsNotSendTransformMatrixDataMap = (isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap
  |> SparseMapService.reduceiValid(
       [@bs] ((newMap, _, index) => newMap |> WonderCommonlib.SparseMapService.set(index, false)),
       WonderCommonlib.SparseMapService.createEmpty()
     );

let restore = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let {matrixFloat32ArrayMap} = currentState.sourceInstanceRecord;
  let {isSendTransformMatrixDataMap} as targetRecord = targetState.sourceInstanceRecord;
  let float32ArrayPoolMap =
    TypeArrayPoolService.addAllFloat32TypeArrayToPool(
      matrixFloat32ArrayMap,
      MemorySettingService.getMaxBigTypeArrayPoolSize(targetState.settingRecord),
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