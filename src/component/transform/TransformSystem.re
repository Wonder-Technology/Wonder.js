open TransformOperateDataUtils;

open TransformType;

open TypeArrayUtils;

open StateDataType;

open Contract;

open TransformDirtySystem;

open TransformHierachySystem;

open TransformStateUtils;

let isAlive = (transform: transform, state: StateDataType.state) =>
  TransformDisposeComponentUtils.isAlive(transform, state);

let create = TransformCreateUtils.create;

let _setDefaultChildren = (maxCount: int, {childMap} as transformData) => {
  for (index in 0 to maxCount - 1) {
    SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty(), childMap) |> ignore
  };
  transformData
};

let getParent = (child: transform, state: StateDataType.state) =>
  TransformHierachySystem.getParent(child, getTransformData(state));

let setParent = (parent: Js.nullable(transform), child: transform, state: StateDataType.state) => {
  TransformHierachySystem.setParent(Js.toOption(parent), child, getTransformData(state))
  |> addItAndItsChildrenToDirtyArray(child)
  |> ignore;
  state
};

let getChildren = (transform: transform, state: StateDataType.state) =>
  getTransformData(state) |> unsafeGetChildren(transform) |> Js.Array.copy;

let update = (state: StateDataType.state) => {
  TransformUpdateSystem.update(getTransformData(state));
  state
};

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
  |> addItAndItsChildrenToDirtyArray(transform)
  |> ignore;
  /* markIsTransform(transform, transformData.isTransformMap); */
  state
};

/* todo add cache? */
let getPosition = (transform: transform, state: StateDataType.state) => {
  open Js.Typed_array;
  let localToWorldMatrices = getTransformData(state).localToWorldMatrices;
  let index = getMatrix4DataIndex(transform);
  (
    Float32Array.unsafe_get(localToWorldMatrices, index + 12),
    Float32Array.unsafe_get(localToWorldMatrices, index + 13),
    Float32Array.unsafe_get(localToWorldMatrices, index + 14)
  )
};

let setPosition = (transform: transform, position: position, state: StateDataType.state) => {
  let transformData = getTransformData(state);
  TransformOperateDataUtils.setPosition(
    getVector3DataIndex(transform),
    TransformHierachySystem.getParent(transform, transformData),
    position,
    transformData
  )
  |> ignore;
  addItAndItsChildrenToDirtyArray(transform, transformData) |> ignore;
  /* markIsTransform(transform, transformData.isTransformMap); */
  state
};

let getLocalToWorldMatrix = (transform: transform, state: StateDataType.state) =>
  /* let data =
       TransformOperateDataUtils.getLocalToWorldMatrix(
         transform,
         getTransformData(state).localToWorldMatrices
       );
     isTransform(transform, getTransformData(state).isTransformMap) ?
       CacheType.Cache(data) : CacheType.New(data) */
  TransformOperateDataUtils.getLocalToWorldMatrix(
    transform,
    getTransformData(state).localToWorldMatrices
  );

let init = (state: StateDataType.state) => {
  TransformUpdateSystem.update(getTransformData(state));
  state
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
        parentMap: SparseMapSystem.createEmpty(),
        childMap: SparseMapSystem.createEmpty(),
        gameObjectMap: SparseMapSystem.createEmpty(),
        /* originToMoveIndexMap: SparseMapSystem.createEmpty (), */
        /* moveToOriginIndexMap: SparseMapSystem.createEmpty () */
        dirtyArray: WonderCommonlib.ArraySystem.createEmpty(),
        disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
      }
      |> _setDefaultChildren(maxCount)
    );
  state
};