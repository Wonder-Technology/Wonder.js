open TransformType;

open Contract;

open StateDataType;

open TransformDirtyUtils;

open TransformHierachySystem;

open TransformStateUtils;

let isAlive = (transform: transform, state: StateDataType.state) =>
  TransformDisposeComponentUtils.isAlive(transform, state);

let create = (state: StateDataType.state) => {
  let data = getTransformData(state);
  let index = TransformCreateUtils.create(data);
  TransformDirtyUtils.mark(index, false, data) |> ignore;
  (state, index)
  |> ensureCheck(
       (_) => {
         open Contract.Operators;
         let {index}: transformData = getTransformData(state);
         let maxCount = TransformBufferUtils.getMaxCount(state);
         test(
           {j|have create too many components(the count of transforms shouldn't exceed $maxCount)|j},
           () => index <= maxCount
         )
       }
     )
};

let _setDefaultChildren = (maxCount: int, {childMap} as transformData) => {
  for (index in 0 to maxCount - 1) {
    WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty(), childMap)
    |> ignore
  };
  transformData
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

let getLocalPosition = (transform: transform, state: StateDataType.state) =>
  /* getFloat3(getVector3DataIndex(transform), getTransformData(state).localPositions); */
  TransformOperateDataUtils.getLocalPosition(transform, getTransformData(state));

let setLocalPosition = (transform: transform, localPosition: position, state: StateDataType.state) => {
  /* let transformData = getTransformData(state);
     setFloat3(
       getVector3DataIndex(transform),
       TransformCastTypeUtils.tupleToJsArray(localPosition),
       transformData.localPositions
     )
     |> ignore; */
  state
  |> getTransformData
  |> TransformOperateDataUtils.setLocalPosition(transform, localPosition)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

/* todo add cache? */
let getPosition = (transform: transform, state: StateDataType.state) => {
  open Js.Typed_array;
  /* let localToWorldMatrices = getTransformData(state).localToWorldMatrices;
     let index = getMatrix4DataIndex(transform);
     (
       Float32Array.unsafe_get(localToWorldMatrices, index + 12),
       Float32Array.unsafe_get(localToWorldMatrices, index + 13),
       Float32Array.unsafe_get(localToWorldMatrices, index + 14)
     ) */
  let {localToWorldMatrices} =
    TransformOperateDataUtils.update(transform, getTransformData(state));
  let index = TransformOperateDataUtils.getMatrix4DataIndex(transform);
  (
    Float32Array.unsafe_get(localToWorldMatrices, index + 12),
    Float32Array.unsafe_get(localToWorldMatrices, index + 13),
    Float32Array.unsafe_get(localToWorldMatrices, index + 14)
  )
};

let setPosition = (transform: transform, position: position, state: StateDataType.state) => {
  let data = getTransformData(state);
  TransformOperateDataUtils.setPosition(
    TransformOperateDataUtils.getVector3DataIndex(transform),
    TransformHierachySystem.getParent(transform, data),
    position,
    data
  )
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let getLocalToWorldMatrix = (transform: transform, state: StateDataType.state) => {
  /* let data =
       TransformOperateDataUtils.getLocalToWorldMatrix(
         transform,
         getTransformData(state).localToWorldMatrices
       );
     isTransform(transform, getTransformData(state).isTransformMap) ?
       CacheType.Cache(data) : CacheType.New(data) */
  /* todo optimize: update return matrix? */
  let data = TransformOperateDataUtils.update(transform, getTransformData(state));
  TransformOperateDataUtils.getLocalToWorldMatrix(transform, data.localToWorldMatrices)
};

let getGameObject = (transform: transform, state: StateDataType.state) =>
  TransformGameObjectUtils.getGameObject(transform, getTransformData(state));

let initData = (state: StateDataType.state) => {
  let maxCount = TransformBufferUtils.getMaxCount(state);
  let (buffer, localPositions, localToWorldMatrices) =
    TransformBufferUtils.initBufferData(maxCount);
  state.transformData =
    Some(
      {
        buffer,
        localToWorldMatrices,
        localPositions,
        index: 0,
        /* firstDirtyIndex: getMaxCount (), */
        /* oldIndexArrayBeforeAddToDirtyArray: WonderCommonlib.ArraySystem.createEmpty (), */
        parentMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        childMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        /* originToMoveIndexMap: WonderCommonlib.SparseMapSystem.createEmpty (), */
        /* moveToOriginIndexMap: WonderCommonlib.SparseMapSystem.createEmpty () */
        /* dirtyLocalMap: WonderCommonlib.SparseMapSystem.createEmpty(), */
        dirtyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
      }
      |> _setDefaultChildren(maxCount)
    );
  state
};