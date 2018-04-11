open StateDataMainType;

open TransformType;

let handleCloneComponent =
    (
      sourceComponent: transform,
      countRangeArr: array(int),
      {settingRecord, typeArrayPoolRecord} as state
    ) => {
  let componentArr = [||];
  let transformRecord = state |> RecordTransformMainService.getRecord;
  let localPosition =
    ModelMatrixTransformService.getLocalPositionTuple(
      sourceComponent,
      transformRecord.localPositions
    );
  let (transformRecord, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           ((transformRecord, componentArr), _) => {
             let (transformRecord, index) =
               CreateTransformMainService.createWithoutMarkNotDirtyWithRecord(
                 settingRecord,
                 transformRecord
               );
             (
               transformRecord
               |> ModelMatrixTransformService.setLocalPositionByTuple(index, localPosition)
               |> DirtyTransformService.mark(index, true),
               componentArr |> ArrayService.push(index)
             )
           }
         ),
         (transformRecord, [||])
       );
  state.transformRecord =
    Some(transformRecord |> DirtyTransformService.mark(sourceComponent, true));
  (state, componentArr)
};