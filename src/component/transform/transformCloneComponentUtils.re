open TransformType;

open TransformStateUtils;

let handleCloneComponent =
    (sourceComponent: transform, countRangeArr: array(int), state: StateDataType.state) => {
  let componentArr = [||];
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let (state, index) = TransformCreateUtils.create(state);
             let data = getTransformData(state);
             let localPosition = TransformOperateDataUtils.getLocalPosition(index, data);
             TransformOperateDataUtils.setLocalPosition(index, localPosition, data) |> ignore;
             componentArr |> Js.Array.push(index) |> ignore;
             state
           }
         ),
         state
       );
  getTransformData(state) |> TransformDirtyUtils.batchAddToDirtyArray(componentArr);
  (state, componentArr)
};