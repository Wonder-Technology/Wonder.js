open TransformType;

open Contract;

open StateDataType;

open TransformDirtyCommon;

open TransformHierachyCommon;

open TransformStateCommon;

let getTransformData = getTransformData;

let handleAddComponent = TransformAddComponentCommon.handleAddComponent;

let isAlive = (transform: transform, state: StateDataType.state) =>
  TransformDisposeComponentCommon.isAlive(transform, state);

let getLocalToWorldMatrixTypeArray = (transform: transform, state: StateDataType.state) => {
  let {localToWorldMatrixMap} =
    TransformOperateCommon.update(transform, state) |> getTransformData;
  TransformOperateCommon.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrixMap)
};

let create = (state: StateDataType.state) => {
  let data = getTransformData(state);
  let index = TransformCreateCommon.create(state);
  TransformDirtyCommon.mark(index, false, data) |> ignore;
  (state, index)
};

let getParent = (child: transform, state: StateDataType.state) =>
  TransformHierachyCommon.getParent(child, getTransformData(state));

let setParentNotMarkDirty = (parent: option(transform), child: transform, transformData) =>
  transformData |> TransformHierachyCommon.setParent(parent, child);

let setParent = (parent: Js.nullable(transform), child: transform, state: StateDataType.state) => {
  getTransformData(state)
  |> setParentNotMarkDirty(Js.toOption(parent), child)
  |> markHierachyDirty(child)
  |> ignore;
  state
};

let getChildren = (transform: transform, state: StateDataType.state) =>
  getTransformData(state) |> unsafeGetChildren(transform) |> Js.Array.copy;

let unsafeGetChildren = (transform: transform, transformData) =>
  unsafeGetChildren(transform, transformData);

let getLocalPositionTypeArray = (transform: transform, state: StateDataType.state) =>
  TransformOperateCommon.getLocalPositionTypeArray(
    transform,
    getTransformData(state).localPositionMap
  );

let getLocalPositionTuple = (transform: transform, state: StateDataType.state) =>
  TransformOperateCommon.getLocalPositionTuple(
    transform,
    getTransformData(state).localPositionMap
  );

let setLocalPositionByTypeArray = (transform: transform, localPosition, state: StateDataType.state) => {
  state
  |> getTransformData
  |> TransformOperateCommon.setLocalPositionByTypeArray(transform, localPosition)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let setLocalPositionByTuple = (transform: transform, localPosition, state: StateDataType.state) => {
  state
  |> getTransformData
  |> TransformOperateCommon.setLocalPositionByTuple(transform, localPosition)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let getPositionTypeArray = (transform: transform, state: StateDataType.state) =>
  TransformOperateCommon.getPositionTypeArray(transform, state);

let getPositionTuple = (transform: transform, state: StateDataType.state) =>
  TransformOperateCommon.getPositionTuple(transform, state);

let setPositionByTypeArray = (transform: transform, position, state: StateDataType.state) => {
  TransformOperateCommon.setPositionByTypeArray(
    transform,
    position,
    getTransformData(state),
    state
  )
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let setPositionByTuple = (transform: transform, position: position, state: StateDataType.state) => {
  TransformOperateCommon.setPositionByTuple(transform, position, getTransformData(state), state)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let getGameObject = (transform: transform, state: StateDataType.state) =>
  TransformGameObjectCommon.getGameObject(transform, getTransformData(state));

let deepCopyState = TransformStateCommon.deepCopyState;

let restoreFromState = TransformStateCommon.restoreFromState;