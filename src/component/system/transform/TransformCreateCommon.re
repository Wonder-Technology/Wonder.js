open TransformType;

open ComponentSystem;

let _setDefaultChildren = (index: int, childMap) => {
  WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty(), childMap)
  |> ignore;
  childMap
};

let _setDefaultLocalToWorldMatrix =
    (index: int, localToWorldMatrixMap, localToWorldMatrixTypeArrayPool) => {
  let defaultMatrixArr = [|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|];
  let defaultMatrixTypeArr =
    switch (
      TransformTypeArrayPoolCommon.getFloat32TypeArrayFromPool(localToWorldMatrixTypeArrayPool)
    ) {
    | None => Js.Typed_array.Float32Array.make(defaultMatrixArr)
    | Some(typeArr) => TypeArrayUtils.setFloat16(0, defaultMatrixArr, typeArr)
    };
  WonderCommonlib.SparseMapSystem.set(index, defaultMatrixTypeArr, localToWorldMatrixMap) |> ignore;
  localToWorldMatrixMap
};

let _setDefaultLocalPosition = (index: int, localPositionMap, localPositionTypeArrayPool) => {
  let defaultLocalPositionArr = [|0., 0., 0.|];
  let defaultLocalPositionTypeArr =
    switch (TransformTypeArrayPoolCommon.getFloat32TypeArrayFromPool(localPositionTypeArrayPool)) {
    | None => Js.Typed_array.Float32Array.make(defaultLocalPositionArr)
    | Some(typeArr) => TypeArrayUtils.setFloat3(0, defaultLocalPositionArr, typeArr)
    };
  WonderCommonlib.SparseMapSystem.set(index, defaultLocalPositionTypeArr, localPositionMap)
  |> ignore;
  localPositionMap
};

let _isNotNeedInitData = (index: int, childMap) =>
  childMap |> WonderCommonlib.SparseMapSystem.has(index);

let _initDataWhenCreate =
    (
      index: int,
      childMap,
      localToWorldMatrixMap,
      localPositionMap,
      localToWorldMatrixTypeArrayPool,
      localPositionTypeArrayPool
    ) =>
  _isNotNeedInitData(index, childMap) ?
    () :
    {
      _setDefaultChildren(index, childMap) |> ignore;
      _setDefaultLocalToWorldMatrix(index, localToWorldMatrixMap, localToWorldMatrixTypeArrayPool)
      |> ignore;
      _setDefaultLocalPosition(index, localPositionMap, localPositionTypeArrayPool) |> ignore
    };

let create =
    (
      {
        index,
        disposedIndexArray,
        childMap,
        localToWorldMatrixMap,
        localPositionMap,
        localToWorldMatrixTypeArrayPool,
        localPositionTypeArrayPool
      } as data
    ) => {
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  _initDataWhenCreate(
    index,
    childMap,
    localToWorldMatrixMap,
    localPositionMap,
    localToWorldMatrixTypeArrayPool,
    localPositionTypeArrayPool
  );
  index
};