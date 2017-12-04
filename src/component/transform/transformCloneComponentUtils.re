open TransformType;

open TransformStateUtils;

let handleCloneComponent =
    (sourceComponent: transform, countRangeArr: array(int), state: StateDataType.state) => {
  let componentArr = [||];
  let data = getTransformData(state);
  let localPosition = TransformOperateDataUtils.getLocalPosition(sourceComponent, data);
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let index = TransformCreateUtils.create(data);
             data
             |> TransformOperateDataUtils.setLocalPosition(index, localPosition)
             |> TransformDirtyUtils.mark(index, true)
             |> ignore;
             componentArr |> Js.Array.push(index) |> ignore;
             state
           }
         ),
         state
       );
  /* getTransformData(state) |> TransformDirtyUtils.batchAddToDirtyArray(componentArr) |> ignore; */
  /* |> TransformDirtyUtils.addToDirtyArray(sourceComponent); */
  TransformDirtyUtils.mark(sourceComponent, true, data) |> ignore;
  (state, componentArr)
};