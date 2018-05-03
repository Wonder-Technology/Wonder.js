open StateDataMainType;

open SourceInstanceType;

let _buildIsNotSendTransformMatrixDataMap = (isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap
  |> SparseMapService.reduceiValid(
       [@bs] ((newMap, _, index) => newMap |> WonderCommonlib.SparseMapService.set(index, false)),
       WonderCommonlib.SparseMapService.createEmpty()
     );

let _restoreTypeArrays =
    (currentSourceInstanceRecord, targetSourceInstanceRecord, objectInstanceCountPerSourceInstance) => {
  let (objectInstanceTransformCollections, isTransformStatics) =
    (
      currentSourceInstanceRecord.objectInstanceTransformCollections,
      currentSourceInstanceRecord.isTransformStatics
    )
    |> RecordSourceInstanceMainService.setDefaultTypeArrData(
         objectInstanceCountPerSourceInstance,
         StaticTransformService.getDefault()
       );
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (currentSourceInstanceRecord.objectInstanceTransformCollections, 0),
    (targetSourceInstanceRecord.objectInstanceTransformCollections, 0),
    Js.Typed_array.Uint32Array.length(
      targetSourceInstanceRecord.objectInstanceTransformCollections
    )
  )
  |> ignore;
  TypeArrayService.fillUint8ArrayWithUint8Array(
    (currentSourceInstanceRecord.isTransformStatics, 0),
    (targetSourceInstanceRecord.isTransformStatics, 0),
    Js.Typed_array.Uint8Array.length(targetSourceInstanceRecord.isTransformStatics)
  )
  |> ignore;
  (currentSourceInstanceRecord, targetSourceInstanceRecord)
};

let restore = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let currentSourceInstanceRecord = RecordSourceInstanceMainService.getRecord(currentState);
  let targetSourceInstanceRecord = RecordSourceInstanceMainService.getRecord(targetState);
  let float32ArrayPoolMap =
    TypeArrayPoolService.addAllFloat32TypeArrayToPool(
      currentSourceInstanceRecord.matrixFloat32ArrayMap,
      MemorySettingService.getMaxBigTypeArrayPoolSize(targetState.settingRecord),
      float32ArrayPoolMap
    );
  let sourceInstanceCount =
    BufferSettingService.getSourceInstanceCount(currentState.settingRecord);
  let (currentSourceInstanceRecord, targetSourceInstanceRecord) =
    _restoreTypeArrays(
      currentSourceInstanceRecord,
      targetSourceInstanceRecord,
      sourceInstanceCount
    );
  (
    {
      ...targetState,
      sourceInstanceRecord:
        Some({
          ...targetSourceInstanceRecord,
          buffer: currentSourceInstanceRecord.buffer,
          objectInstanceTransformCollections:
            currentSourceInstanceRecord.objectInstanceTransformCollections,
          isTransformStatics: currentSourceInstanceRecord.isTransformStatics,
          isSendTransformMatrixDataMap:
            _buildIsNotSendTransformMatrixDataMap(
              targetSourceInstanceRecord.isSendTransformMatrixDataMap
            )
        })
    },
    {...sharedData, float32ArrayPoolMap}
  )
};