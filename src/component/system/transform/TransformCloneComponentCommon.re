open TransformType;

open TransformStateCommon;

let handleCloneComponent =
    (sourceComponent: transform, countRangeArr: array(int), state: StateDataType.state) => {
  let componentArr = [||];
  let data = getTransformData(state);
  let localPosition =
    TransformTransformCommon.getLocalPositionTuple(sourceComponent, data.localPositionMap);
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let index = TransformCreateCommon.create(data);
             data
             |> TransformTransformCommon.setLocalPositionByTuple(index, localPosition)
             |> TransformDirtyCommon.mark(index, true)
             |> ignore;
             componentArr |> Js.Array.push(index) |> ignore;
             state
           }
         ),
         state
       );
  TransformDirtyCommon.mark(sourceComponent, true, data) |> ignore;
  (state, componentArr)
};