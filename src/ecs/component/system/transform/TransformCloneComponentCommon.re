open TransformType;

open TransformStateCommon;

let handleCloneComponent =
    (sourceComponent: transform, countRangeArr: array(int), state: StateDataType.state) => {
  let componentArr = [||];
  let data = getTransformData(state);
  let localPosition =
    TransformOperateCommon.getLocalPositionTuple(sourceComponent, data.localPositionMap);
  let (state, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           ((state, componentArr), _) => {
             let (state, index) = TransformCreateCommon.create(state);
             (
               {
                 ...state,
                 transformData:
                   state
                   |> getTransformData
                   |> TransformOperateCommon.setLocalPositionByTuple(index, localPosition)
                   |> TransformDirtyCommon.mark(index, true)
               },
               componentArr |> ArraySystem.push(index)
             )
           }
         ),
         (state, [||])
       );
  (
    {
      ...state,
      transformData: getTransformData(state) |> TransformDirtyCommon.mark(sourceComponent, true)
    },
    componentArr
  )
};