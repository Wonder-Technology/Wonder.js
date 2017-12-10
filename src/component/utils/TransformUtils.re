open TransformType;

open TransformStateCommon;

let getLocalToWorldMatrixTypeArray = (transform: transform, state: StateDataType.state) => {
  let {localToWorldMatrixMap} =
    TransformOperateCommon.update(transform, state) |> getTransformData;
  TransformOperateCommon.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrixMap)
};

let create = (state: StateDataType.state) => {
  let data = getTransformData(state);
  let index = TransformCreateCommon.create(data);
  TransformDirtyCommon.mark(index, false, data) |> ignore;
  (state, index)
};