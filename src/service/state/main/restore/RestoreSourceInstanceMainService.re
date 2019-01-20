open StateDataMainType;

open SourceInstanceType;

let _buildIsNotSendTransformMatrixDataMap = (isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap
  |> WonderCommonlib.MutableSparseMapService.reduceiValid(
       [@bs] ((newMap, _, index) => newMap |> WonderCommonlib.MutableSparseMapService.set(index, false)),
       WonderCommonlib.MutableSparseMapService.createEmpty()
     );

let _restoreTypeArrays = (currentSourceInstanceRecord, targetSourceInstanceRecord) =>
  currentSourceInstanceRecord.objectInstanceTransformCollections
  === targetSourceInstanceRecord.objectInstanceTransformCollections
  &&
  currentSourceInstanceRecord.isTransformStatics === targetSourceInstanceRecord.isTransformStatics ?
    (currentSourceInstanceRecord, targetSourceInstanceRecord) :
    {
      let (objectInstanceTransformCollections, isTransformStatics) =
        (
          currentSourceInstanceRecord.objectInstanceTransformCollections,
          currentSourceInstanceRecord.isTransformStatics
        )
        |> RecordSourceInstanceMainService.setAllTypeArrDataToDefault(
             currentSourceInstanceRecord.index,
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
  let (currentSourceInstanceRecord, targetSourceInstanceRecord) =
    _restoreTypeArrays(currentSourceInstanceRecord, targetSourceInstanceRecord);
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