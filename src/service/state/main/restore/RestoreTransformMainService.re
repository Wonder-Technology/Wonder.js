open StateDataMainType;

open TransformType;

let _restoreTypeArrays = (currentTransformRecord, targetTransformRecord) => {
  let (localToWorldMatrices, localPositions, localRotations, localScales) =
    (
      currentTransformRecord.localToWorldMatrices,
      currentTransformRecord.localPositions,
      currentTransformRecord.localRotations,
      currentTransformRecord.localScales,
    )
    |> RecordTransformMainService.setAllTypeArrDataToDefault(
         currentTransformRecord.index,
         (
           currentTransformRecord.defaultLocalToWorldMatrix,
           currentTransformRecord.defaultLocalPosition,
           currentTransformRecord.defaultLocalRotation,
           currentTransformRecord.defaultLocalScale,
         ),
       );

  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentTransformRecord.localPositions, 0),
    (targetTransformRecord.copiedLocalPositionsForRestore, 0),
    RecordTransformMainService.getLocalPositionsEndIndex(
      targetTransformRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentTransformRecord.localRotations, 0),
    (targetTransformRecord.copiedLocalRotationsForRestore, 0),
    RecordTransformMainService.getLocalRotationsEndIndex(
      targetTransformRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentTransformRecord.localScales, 0),
    (targetTransformRecord.copiedLocalScalesForRestore, 0),
    RecordTransformMainService.getLocalScalesEndIndex(
      targetTransformRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentTransformRecord.localToWorldMatrices, 0),
    (targetTransformRecord.copiedLocalToWorldMatricesForRestore, 0),
    RecordTransformMainService.getLocalToWorldMatricesEndIndex(
      targetTransformRecord.index,
    ),
  )
  |> ignore;
  (currentTransformRecord, targetTransformRecord);
};

let restore = (currentState, targetState) => {
  let currentTransformRecord =
    RecordTransformMainService.getRecord(currentState);
  let targetTransformRecord =
    RecordTransformMainService.getRecord(targetState);
  let (currentTransformRecord, targetTransformRecord) =
    _restoreTypeArrays(currentTransformRecord, targetTransformRecord);
  {
    ...targetState,
    transformRecord:
      Some({
        ...targetTransformRecord,
        buffer: currentTransformRecord.buffer,
        localPositions: currentTransformRecord.localPositions,
        localRotations: currentTransformRecord.localRotations,
        localScales: currentTransformRecord.localScales,
        localToWorldMatrices: currentTransformRecord.localToWorldMatrices,
      }),
  };
};