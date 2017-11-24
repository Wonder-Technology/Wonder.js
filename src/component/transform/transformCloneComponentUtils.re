open TransformType;

open TransformStateUtils;

let handleCloneComponent =
    (sourceComponent: transform, countRangeArr: array(int), state: StateDataType.state) => {
  let componentArr = [||];
  let data = getTransformData(state);
  let localPosition = TransformOperateDataUtils.getLocalPosition(sourceComponent, data);
  /* DebugUtils.log(localPosition) |> ignore; */
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let (state, index) = TransformCreateUtils.create(state);
             /* DebugUtils.log(getTransformData(state)) |> ignore; */
             let data =
               getTransformData(state)
               |> TransformOperateDataUtils.setLocalPosition(index, localPosition);
             /*
              DebugUtils.log(getTransformData(state).localPositions |> Js.Typed_array.Float32Array.length) |> ignore; */
             /* DebugUtils.log(( localPosition, index, TransformOperateDataUtils.getLocalPosition(index, data) )) |> ignore; */
             componentArr |> Js.Array.push(index) |> ignore;
             state
           }
         ),
         state
       );
  getTransformData(state) |> TransformDirtyUtils.batchAddToDirtyArray(componentArr) |> ignore;
  /* |> TransformDirtyUtils.addToDirtyArray(sourceComponent); */
  (state, componentArr)
};