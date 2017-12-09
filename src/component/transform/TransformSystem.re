open TransformType;

open Contract;

open StateDataType;

open TransformDirtySystem;

open TransformHierachySystem;

open TransformStateSystem;

let isAlive = (transform: transform, state: StateDataType.state) =>
  TransformDisposeComponentSystem.isAlive(transform, state);

let create = (state: StateDataType.state) => {
  let data = getTransformData(state);
  let index = TransformCreateSystem.create(data);
  TransformDirtySystem.mark(index, false, data) |> ignore;
  (state, index)
  /* |> ensureCheck(
       (_) => {
         open Contract.Operators;
         let {index}: transformData = getTransformData(state);
         let maxCount = TransformBufferSystem.getMaxCount(state);
         test(
           {j|have create too many components(the count of transforms shouldn't exceed $maxCount)|j},
           () => index <= maxCount
         )
       }
     ) */
};

let getParent = (child: transform, state: StateDataType.state) =>
  TransformHierachySystem.getParent(child, getTransformData(state));

let setParent = (parent: Js.nullable(transform), child: transform, state: StateDataType.state) => {
  TransformHierachySystem.setParent(Js.toOption(parent), child, getTransformData(state))
  |> markHierachyDirty(child)
  |> ignore;
  state
};

let getChildren = (transform: transform, state: StateDataType.state) =>
  getTransformData(state) |> unsafeGetChildren(transform) |> Js.Array.copy;

let getLocalPositionTypeArray = (transform: transform, state: StateDataType.state) =>
  TransformOperateDataSystem.getLocalPositionTypeArray(
    transform,
    getTransformData(state).localPositionMap
  );

let getLocalPositionTuple = (transform: transform, state: StateDataType.state) =>
  TransformOperateDataSystem.getLocalPositionTuple(
    transform,
    getTransformData(state).localPositionMap
  );

let setLocalPositionByTypeArray = (transform: transform, localPosition, state: StateDataType.state) => {
  state
  |> getTransformData
  |> TransformOperateDataSystem.setLocalPositionByTypeArray(transform, localPosition)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let setLocalPositionByTuple = (transform: transform, localPosition, state: StateDataType.state) => {
  state
  |> getTransformData
  |> TransformOperateDataSystem.setLocalPositionByTuple(transform, localPosition)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let getPositionTypeArray = (transform: transform, state: StateDataType.state) =>
  TransformOperateDataSystem.getPositionTypeArray(transform, state);

let getPositionTuple = (transform: transform, state: StateDataType.state) =>
  TransformOperateDataSystem.getPositionTuple(transform, state);

let setPositionByTypeArray = (transform: transform, position, state: StateDataType.state) => {
  TransformOperateDataSystem.setPositionByTypeArray(
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
  TransformOperateDataSystem.setPositionByTuple(
    transform,
    position,
    getTransformData(state),
    state
  )
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let getLocalToWorldMatrixTypeArray = (transform: transform, state: StateDataType.state) => {
  let {localToWorldMatrixMap} =
    TransformOperateDataSystem.update(transform, state) |> getTransformData;
  TransformOperateDataSystem.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrixMap)
};

let getGameObject = (transform: transform, state: StateDataType.state) =>
  TransformGameObjectSystem.getGameObject(transform, getTransformData(state));

let initData = (state: StateDataType.state) => {
  /* let maxCount = TransformBufferSystem.getMaxCount(state); */
  /* let (buffer, localPositions, localToWorldMatrices) =
     TransformBufferSystem.initBufferData(maxCount); */
  state.transformData =
    Some
      /* buffer,
         localToWorldMatrices,
         localPositions, */
      ({
        index: 0,
        parentMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        childMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        dirtyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        localToWorldMatrixMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        localPositionMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
      });
  state
};