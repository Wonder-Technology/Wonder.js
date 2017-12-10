open TransformType;

open ComponentSystem;

let _setDefaultChildren = (index: int, childMap) => {
  WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty(), childMap)
  |> ignore;
  childMap
};

let _setDefaultLocalToWorldMatrix = (index: int, localToWorldMatrixMap) => {
  WonderCommonlib.SparseMapSystem.set(
    index,
    Js.Typed_array.Float32Array.make([|
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
    |]),
    localToWorldMatrixMap
  )
  |> ignore;
  localToWorldMatrixMap
};

let _setDefaultLocalPosition = (index: int, localPositionMap) => {
  WonderCommonlib.SparseMapSystem.set(
    index,
    Js.Typed_array.Float32Array.make([|0., 0., 0.|]),
    localPositionMap
  )
  |> ignore;
  localPositionMap
};

let _isNotNeedInitData = (index: int, childMap) =>
  childMap |> WonderCommonlib.SparseMapSystem.has(index);

let _initDataWhenCreate = (index: int, childMap, localToWorldMatrixMap, localPositionMap) =>
  _isNotNeedInitData(index, childMap) ?
    () :
    {
      _setDefaultChildren(index, childMap) |> ignore;
      _setDefaultLocalToWorldMatrix(index, localToWorldMatrixMap) |> ignore;
      _setDefaultLocalPosition(index, localPositionMap) |> ignore
    };

let create =
    ({index, disposedIndexArray, childMap, localToWorldMatrixMap, localPositionMap} as data) => {
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  _initDataWhenCreate(index, childMap, localToWorldMatrixMap, localPositionMap);
  index
};