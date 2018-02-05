open TransformType;

open ComponentSystem;

let _setDefaultChildren = (index: int, childMap) =>
  WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty(), childMap);

let _setDefaultLocalToWorldMatrix = (index: int, localToWorldMatrixMap, state: StateDataType.state) => {
  let defaultMatrixArr = [|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|];
  let defaultMatrixTypeArr =
    switch ([@bs] TypeArrayPoolSystem.getFloat32TypeArrayFromPool(16, state)) {
    | None => Js.Typed_array.Float32Array.make(defaultMatrixArr)
    | Some(typeArr) => TypeArrayUtils.setFloat16(0, defaultMatrixArr, typeArr)
    };
  WonderCommonlib.SparseMapSystem.set(index, defaultMatrixTypeArr, localToWorldMatrixMap)
};

let _setDefaultLocalPosition = (index: int, localPositionMap, state: StateDataType.state) => {
  let defaultLocalPositionArr = [|0., 0., 0.|];
  let defaultLocalPositionTypeArr =
    switch ([@bs] TypeArrayPoolSystem.getFloat32TypeArrayFromPool(3, state)) {
    | None => Js.Typed_array.Float32Array.make(defaultLocalPositionArr)
    | Some(typeArr) => TypeArrayUtils.setFloat3(0, defaultLocalPositionArr, typeArr)
    };
  WonderCommonlib.SparseMapSystem.set(index, defaultLocalPositionTypeArr, localPositionMap)
};

let _isNotNeedInitData = (index: int, childMap) =>
  childMap |> WonderCommonlib.SparseMapSystem.has(index);

let _initDataWhenCreate = (index: int, state: StateDataType.state) => {
  let {childMap, localToWorldMatrixMap, localPositionMap} as data =
    TransformStateCommon.getTransformData(state);
  _isNotNeedInitData(index, childMap) ?
    state :
    {
      ...state,
      transformData: {
        ...data,
        childMap: childMap |> _setDefaultChildren(index),
        localToWorldMatrixMap: _setDefaultLocalToWorldMatrix(index, localToWorldMatrixMap, state),
        localPositionMap: _setDefaultLocalPosition(index, localPositionMap, state)
      }
    }
};

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = TransformStateCommon.getTransformData(state);
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  /* TODO remove this
     now not remove this, because if do it, SourceInstance_test->"dispose objectInstance component" case will fail!!!??? why??? */
  data.index = newIndex;
  let state = state |> _initDataWhenCreate(index);
  ({...state, transformData: {...data, disposedIndexArray}}, index)
};