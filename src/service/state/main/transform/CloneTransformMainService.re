open MainStateDataType;

open TransformType;

let handleCloneComponent =
    (sourceComponent: transform, countRangeArr: array(int), {typeArrayPoolRecord} as state) => {
  let componentArr = [||];
  let transformRecord = state |> RecordTransformMainService.getRecord;
  let localPosition =
    ModelMatrixTransformService.getLocalPositionTuple(
      sourceComponent,
      transformRecord.localPositions
    );
  let (state, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           ((state, componentArr), _) => {
             let (state, index) = CreateTransformMainService.createWithoutMarkNotDirty(state);
             (
               {
                 ...state,
                 transformRecord:
                   Some(
                     state
                     |> RecordTransformMainService.getRecord
                     |> ModelMatrixTransformService.setLocalPositionByTuple(index, localPosition)
                     |> DirtyTransformService.mark(index, true)
                   )
               },
               componentArr |> ArrayService.push(index)
             )
           }
         ),
         (state, [||])
       );
  (
    {
      ...state,
      transformRecord:
        Some(
          state
          |> RecordTransformMainService.getRecord
          |> DirtyTransformService.mark(sourceComponent, true)
        )
    },
    componentArr
  )
};