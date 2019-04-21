open StateDataMainType;

open TransformType;

let handleCloneComponent =
    (
      sourceComponent: transform,
      countRangeArr: array(int),
      {settingRecord, typeArrayPoolRecord} as state,
    ) => {
  let componentArr = [||];
  let transformRecord = state |> RecordTransformMainService.getRecord;
  let localPosition =
    ModelMatrixTransformService.getLocalPositionTuple(
      sourceComponent,
      transformRecord.localPositions,
    );
  let localRotation =
    ModelMatrixTransformService.getLocalRotationTuple(
      sourceComponent,
      transformRecord.localRotations,
    );
  let localScale =
    ModelMatrixTransformService.getLocalScaleTuple(
      sourceComponent,
      transformRecord.localScales,
    );
  let (transformRecord, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (transformRecord, componentArr), _) => {
           let (transformRecord, index) =
             CreateTransformMainService.createWithoutMarkNotDirtyWithRecord(
               settingRecord,
               transformRecord,
             );
           (
             transformRecord
             |> ModelMatrixTransformService.setLocalPositionByTuple(
                  index,
                  localPosition,
                )
             |> ModelMatrixTransformService.setLocalRotationByTuple(
                  index,
                  localRotation,
                )
             |> ModelMatrixTransformService.setLocalScaleByTuple(
                  index,
                  localScale,
                ),
             componentArr |> ArrayService.push(index),
           );
         },
         (transformRecord, [||]),
       );
  state.transformRecord =
    Some(
      transformRecord |> DirtyTransformService.mark(sourceComponent, true),
    );
  (state, componentArr);
};