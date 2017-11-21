open ComponentSystem;

open TransformOperateDataSystem;

open TransformType;

open TypeArrayUtils;

open StateDataType;

open Contract;

open TransformDirtySystem;

open TransformHierachySystem;

open TransformStateUtils;

let isAlive = (transform: transform, state: StateDataType.state) =>
  ComponentDisposeComponentUtils.isAlive(transform, getTransformData(state).disposedIndexArray);

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getTransformData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  (state, index)
  |> ensureCheck(
       ((state, _)) => {
         open Contract.Operators;
         let {index}: transformData = getTransformData(state);
         let maxCount = getMaxCount(state);
         test(
           {j|have create too many components(the count of transforms shouldn't exceed $maxCount)|j},
           () => index <= maxCount
         )
       }
     )
};

let _setDefaultTypeArrData = (count: int, (buffer, localToWorldMatrices, localPositions)) => {
  /* let defaultPositions = [|0., 0., 0.|]; */
  let defaultLocalToWorldMatrices = [|
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.
  |];
  let rec _set = (index: int, data: array(float), setFunc, typeArr: Js.Typed_array.Float32Array.t) =>
    switch index {
    | index when index >= count => typeArr
    | index => [@bs] setFunc(index, data, typeArr) |> _set(index + 1, data, setFunc)
    };
  (
    buffer,
    localPositions,
    _set(0, defaultLocalToWorldMatrices, setLocalToWorldMatricesTypeArr, localToWorldMatrices)
  )
};

let _initBufferData = (count: int) => {
  open Js.Typed_array;
  let size: int = Float32Array._BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize());
  let buffer = ArrayBuffer.make(count * size);
  let typeArrCount = ref(count * getMatrix4DataSize());
  let offset = ref(0);
  let localToWorldMatrices =
    Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=typeArrCount^);
  offset := typeArrCount^ * Float32Array._BYTES_PER_ELEMENT;
  typeArrCount := count * getVector3DataSize();
  let localPositions =
    Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=typeArrCount^);
  offset := offset^ + typeArrCount^ * Float32Array._BYTES_PER_ELEMENT;
  /* todo set localRotations,localScales */
  (buffer, localToWorldMatrices, localPositions) |> _setDefaultTypeArrData(count)
};

let _setDefaultChildren = (maxCount: int, {childMap} as transformData) => {
  for (index in 0 to maxCount - 1) {
    WonderCommonlib.HashMapSystem.set(
      Js.Int.toString(index),
      WonderCommonlib.ArraySystem.createEmpty(),
      childMap
    )
    |> ignore
  };
  transformData
};

let getParent = (child: transform, state: StateDataType.state) =>
  TransformHierachySystem.getParent(Js.Int.toString(child), getTransformData(state));

let setParent = (parent: Js.nullable(transform), child: transform, state: StateDataType.state) => {
  TransformHierachySystem.setParent(Js.toOption(parent), child, getTransformData(state))
  |> addItAndItsChildrenToDirtyArray(child)
  |> ignore;
  state
};

let getChildren = (transform: transform, state: StateDataType.state) =>
  getTransformData(state) |> unsafeGetChildren(Js.Int.toString(transform)) |> Js.Array.copy;

let update = (state: StateDataType.state) => {
  TransformUpdateSystem.update(getTransformData(state));
  state
};

let getLocalPosition = (transform: transform, state: StateDataType.state) =>
  getFloat3(getVector3DataIndex(transform), getTransformData(state).localPositions);

let setLocalPosition = (transform: transform, localPosition: position, state: StateDataType.state) => {
  let transformData = getTransformData(state);
  /* todo check alive? */
  setFloat3(
    getVector3DataIndex(transform),
    TransformCastTypeUtils.tupleToJsArray(localPosition),
    transformData.localPositions
  )
  |> ignore;
  addItAndItsChildrenToDirtyArray(transform, transformData) |> ignore;
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
  TransformOperateDataSystem.setPosition(
    getVector3DataIndex(transform),
    TransformHierachySystem.getParent(Js.Int.toString(transform), transformData),
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
       TransformOperateDataSystem.getLocalToWorldMatrix(
         transform,
         getTransformData(state).localToWorldMatrices
       );
     isTransform(transform, getTransformData(state).isTransformMap) ?
       CacheType.Cache(data) : CacheType.New(data) */
  TransformOperateDataSystem.getLocalToWorldMatrix(
    transform,
    getTransformData(state).localToWorldMatrices
  );

let init = (state: StateDataType.state) => {
  TransformUpdateSystem.update(getTransformData(state));
  state
};

let getGameObject = (transform: transform, state: StateDataType.state) => {
  let transformData = getTransformData(state);
  getComponentGameObject(transform, transformData.gameObjectMap)
};

let initData = (state: StateDataType.state) => {
  let maxCount = getMaxCount(state);
  let (buffer, localPositions, localToWorldMatrices) = _initBufferData(maxCount);
  state.transformData =
    Some(
      {
        buffer,
        localToWorldMatrices,
        localPositions,
        index: 0,
        /* firstDirtyIndex: getMaxCount (), */
        /* oldIndexArrayBeforeAddToDirtyArray: WonderCommonlib.ArraySystem.createEmpty (), */
        parentMap: WonderCommonlib.HashMapSystem.createEmpty(),
        childMap: WonderCommonlib.HashMapSystem.createEmpty(),
        gameObjectMap: WonderCommonlib.HashMapSystem.createEmpty(),
        /* originToMoveIndexMap: WonderCommonlib.HashMapSystem.createEmpty (), */
        /* moveToOriginIndexMap: WonderCommonlib.HashMapSystem.createEmpty () */
        dirtyArray: WonderCommonlib.ArraySystem.createEmpty(),
        disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
      }
      |> _setDefaultChildren(maxCount)
    );
  state
};