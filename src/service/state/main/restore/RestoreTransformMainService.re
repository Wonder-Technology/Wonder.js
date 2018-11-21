open StateDataMainType;

open TransformType;

let _restoreTypeArrays = (currentTransformRecord, targetTransformRecord) =>
  currentTransformRecord.localPositions
  === targetTransformRecord.localPositions
  &&
  currentTransformRecord.localRotations === targetTransformRecord.
                                              localRotations
  && currentTransformRecord.localScales === targetTransformRecord.localScales
  &&
  currentTransformRecord.localToWorldMatrices === targetTransformRecord.
                                                    localToWorldMatrices ?
    (currentTransformRecord, targetTransformRecord) :
    {
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
        (targetTransformRecord.localPositions, 0),
        Js.Typed_array.Float32Array.length(
          targetTransformRecord.localPositions,
        ),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentTransformRecord.localRotations, 0),
        (targetTransformRecord.localRotations, 0),
        Js.Typed_array.Float32Array.length(
          targetTransformRecord.localRotations,
        ),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentTransformRecord.localScales, 0),
        (targetTransformRecord.localScales, 0),
        Js.Typed_array.Float32Array.length(targetTransformRecord.localScales),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentTransformRecord.localToWorldMatrices, 0),
        (targetTransformRecord.localToWorldMatrices, 0),
        Js.Typed_array.Float32Array.length(
          targetTransformRecord.localToWorldMatrices,
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