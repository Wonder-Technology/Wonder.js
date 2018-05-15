open StateDataMainType;

open TransformType;

let _restoreTypeArrays = (currentTransformRecord, targetTransformRecord) =>
  currentTransformRecord.localPositions === targetTransformRecord.localPositions
  && currentTransformRecord.localToWorldMatrices === targetTransformRecord.localToWorldMatrices ?
    (currentTransformRecord, targetTransformRecord) :
    {
      let (localToWorldMatrices, localPositions) =
        (currentTransformRecord.localToWorldMatrices, currentTransformRecord.localPositions)
        |> RecordTransformMainService.setAllTypeArrDataToDefault(
             currentTransformRecord.index,
             currentTransformRecord.defaultLocalToWorldMatrix,
             currentTransformRecord.defaultLocalPosition
           );
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentTransformRecord.localPositions, 0),
        (targetTransformRecord.localPositions, 0),
        Js.Typed_array.Float32Array.length(targetTransformRecord.localPositions)
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentTransformRecord.localToWorldMatrices, 0),
        (targetTransformRecord.localToWorldMatrices, 0),
        Js.Typed_array.Float32Array.length(targetTransformRecord.localToWorldMatrices)
      )
      |> ignore;
      (currentTransformRecord, targetTransformRecord)
    };

let restore = (currentState, targetState) => {
  let currentTransformRecord = RecordTransformMainService.getRecord(currentState);
  let targetTransformRecord = RecordTransformMainService.getRecord(targetState);
  let (currentTransformRecord, targetTransformRecord) =
    _restoreTypeArrays(currentTransformRecord, targetTransformRecord);
  {
    ...targetState,
    transformRecord:
      Some({
        ...targetTransformRecord,
        buffer: currentTransformRecord.buffer,
        localPositions: currentTransformRecord.localPositions,
        localToWorldMatrices: currentTransformRecord.localToWorldMatrices
      })
  }
};