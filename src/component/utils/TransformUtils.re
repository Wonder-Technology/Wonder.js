open TransformType;

open TransformStateCommon;

let getLocalToWorldMatrixTypeArray = (transform: transform, state: StateDataType.state) => {
  let {localToWorldMatrixMap} =
    TransformTransformCommon.update(transform, state) |> getTransformData;
  TransformTransformCommon.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrixMap)
};

let create = (state: StateDataType.state) => {
  let data = getTransformData(state);
  let index = TransformCreateCommon.create(data);
  TransformDirtyCommon.mark(index, false, data) |> ignore;
  (state, index)
};