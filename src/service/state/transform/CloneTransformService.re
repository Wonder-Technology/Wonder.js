open StateDataType;

open TransformType;

let handleCloneComponent =
    (
      sourceComponent: transform,
      countRangeArr: array(int),
      {typeArrayPoolRecord, transformRecord} as state
    ) => {
  let componentArr = [||];
  let localPosition =
    ModelMatrixTransformService.getLocalPositionTuple(
      sourceComponent,
      transformRecord.localPositionMap
    );
  let (state, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           ((state, componentArr), _) => {
             let (state, index) = CreateTransformService.createWithoutMarkNotDirty(state);
             (
               {
                 ...state,
                 transformRecord:
                   state.transformRecord
                   |> ModelMatrixTransformService.setLocalPositionByTuple(index, localPosition)
                   |> DirtyTransformService.mark(index, true)
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
      transformRecord: state.transformRecord |> DirtyTransformService.mark(sourceComponent, true)
    },
    componentArr
  )
};