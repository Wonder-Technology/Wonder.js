open StateDataType;

open TransformType;

open ComponentSystem;

let _setDefaultChildren = (index: int, childMap) =>
  WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty(), childMap);

let _setDefaultLocalToWorldMatrix = (index: int, localToWorldMatrixMap, typeArrayPoolRecord) => {
  let defaultMatrixArr = [|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|];
  let defaultMatrixTypeArr =
    switch ([@bs] TypeArrayPoolService.getFloat32TypeArrayFromPool(16, typeArrayPoolRecord)) {
    | None => Js.Typed_array.Float32Array.make(defaultMatrixArr)
    | Some(typeArr) => TypeArrayService.setFloat16(0, defaultMatrixArr, typeArr)
    };
  (
    typeArrayPoolRecord,
    WonderCommonlib.SparseMapSystem.set(index, defaultMatrixTypeArr, localToWorldMatrixMap)
  )
};

let _setDefaultLocalPosition = (index: int, localPositionMap, typeArrayPoolRecord) => {
  let defaultLocalPositionArr = [|0., 0., 0.|];
  let defaultLocalPositionTypeArr =
    switch ([@bs] TypeArrayPoolService.getFloat32TypeArrayFromPool(3, typeArrayPoolRecord)) {
    | None => Js.Typed_array.Float32Array.make(defaultLocalPositionArr)
    | Some(typeArr) => TypeArrayService.setFloat3(0, defaultLocalPositionArr, typeArr)
    };
  (
    typeArrayPoolRecord,
    WonderCommonlib.SparseMapSystem.set(index, defaultLocalPositionTypeArr, localPositionMap)
  )
};

let _isNotNeedInitData = (index: int, childMap) =>
  childMap |> WonderCommonlib.SparseMapSystem.has(index);

let _initDataWhenCreate =
    (
      index: int,
      typeArrayPoolRecord,
      {childMap, localToWorldMatrixMap, localPositionMap} as transformRecord
    ) =>
  _isNotNeedInitData(index, childMap) ?
    (typeArrayPoolRecord, transformRecord) :
    {
      let (typeArrayPoolRecord, localToWorldMatrixMap) =
        _setDefaultLocalToWorldMatrix(index, localToWorldMatrixMap, typeArrayPoolRecord);
      let (typeArrayPoolRecord, localPositionMap) =
        _setDefaultLocalPosition(index, localPositionMap, typeArrayPoolRecord);
      (
        typeArrayPoolRecord,
        {
          ...transformRecord,
          childMap: childMap |> _setDefaultChildren(index),
          localToWorldMatrixMap,
          localPositionMap
        }
      )
    };

/* let createNotMarkDirty = (typeArrayPoolRecord, {index, disposedIndexArray} as transformRecord) => { */
let createNotMarkDirty = ({typeArrayPoolRecord, transformRecord} as state) => {
  let {index, disposedIndexArray} = transformRecord;
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  transformRecord.index = newIndex;
  let (typeArrayPoolRecord, transformRecord) =
    _initDataWhenCreate(index, typeArrayPoolRecord, transformRecord);
  /* (typeArrayPoolRecord, {...transformRecord, disposedIndexArray}, index) */
  (
    {...state, typeArrayPoolRecord, transformRecord: {...transformRecord, disposedIndexArray}},
    index
  )
};

/* let create = (typeArrayPoolRecord, {index, disposedIndexArray} as transformRecord) => {
     let (typeArrayPoolRecord, transformRecord, index) =
       createNotMarkDirty(typeArrayPoolRecord, transformRecord);
     (typeArrayPoolRecord, transformRecord |> DirtyTransformService.mark(index, false), index)
   }; */
let create = ({typeArrayPoolRecord, transformRecord} as state) => {
  /* let (typeArrayPoolRecord, transformRecord, index) =
     createNotMarkDirty(typeArrayPoolRecord, transformRecord); */
  let (state, index) = createNotMarkDirty(state);
  (
    {
      ...state,
      typeArrayPoolRecord,
      transformRecord: transformRecord |> DirtyTransformService.mark(index, false)
    },
    index
  )
};