open StateDataMainType;

open SourceInstanceType;

let _buildIsNotSendTransformMatrixDataMap = (isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap
  |> SparseMapService.reduceiValid(
       [@bs] ((newMap, _, index) => newMap |> WonderCommonlib.SparseMapService.set(index, false)),
       WonderCommonlib.SparseMapService.createEmpty()
     );

let restore = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let currentSourceInstanceRecord = RecordSourceInstanceMainService.getRecord(currentState);
  let targetSourceInstanceRecord = RecordSourceInstanceMainService.getRecord(targetState);
  let newBuffer =
    CopyArrayBufferService.copyArrayBufferData(
      targetSourceInstanceRecord.buffer,
      currentSourceInstanceRecord.buffer
    );
  let float32ArrayPoolMap =
    TypeArrayPoolService.addAllFloat32TypeArrayToPool(
      currentSourceInstanceRecord.matrixFloat32ArrayMap,
      MemorySettingService.getMaxBigTypeArrayPoolSize(targetState.settingRecord),
      float32ArrayPoolMap
    );
  (
    {
      ...targetState,
      sourceInstanceRecord:
        Some({
          ...targetSourceInstanceRecord,
          buffer: newBuffer,
          isSendTransformMatrixDataMap:
            _buildIsNotSendTransformMatrixDataMap(
              targetSourceInstanceRecord.isSendTransformMatrixDataMap
            )
        })
    },
    {...sharedData, float32ArrayPoolMap}
  )
};