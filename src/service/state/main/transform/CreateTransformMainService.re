open StateDataMainType;

open TransformType;

open IndexComponentService;

let _setDefaultChildren = (index: int, childMap) =>
  WonderCommonlib.SparseMapService.set(
    index,
    WonderCommonlib.ArrayService.createEmpty(),
    childMap,
  );

/*
 let _setDefaultLocalToWorldMatrix = (index: int, localToWorldMatrixMap, typeArrayPoolRecord) => {
   let defaultMatrixArr = [|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|];
   let defaultMatrixTypeArr =
     switch ([@bs] TypeArrayPoolService.getFloat32TypeArrayFromPool(16, typeArrayPoolRecord)) {
     | None => Js.Typed_array.Float32Array.make(defaultMatrixArr)
     | Some(typeArr) => TypeArrayService.setFloat16(0, defaultMatrixArr, typeArr)
     };
   (
     typeArrayPoolRecord,
     WonderCommonlib.SparseMapService.set(index, defaultMatrixTypeArr, localToWorldMatrixMap)
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
     WonderCommonlib.SparseMapService.set(index, defaultLocalPositionTypeArr, localPositionMap)
   )
 }; */
let _isNotNeedInitData = (index: int, childMap) =>
  childMap |> WonderCommonlib.SparseMapService.has(index);

let _initDataWhenCreate =
    (
      index: int,
      {
        childMap,
        localToWorldMatrices,
        localPositions,
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
      } as transformRecord,
    ) =>
  _isNotNeedInitData(index, childMap) ?
    transformRecord :
    {
      ...transformRecord,
      childMap: childMap |> _setDefaultChildren(index),
      /* localToWorldMatrices:
           RecordTransformMainService.setLocalToWorldMatrix(
             index,
             defaultLocalToWorldMatrix,
             localToWorldMatrices
           ),
         localPositions:
           RecordTransformMainService.setLocalPosition(index, defaultLocalPosition, localPositions) */
    };

let createWithoutMarkNotDirtyWithRecord =
    (settingRecord, {index, disposedIndexArray} as transformRecord) => {
  let (index, newIndex, disposedIndexArray) =
    generateIndex(index, disposedIndexArray);
  transformRecord.index = newIndex;
  let transformRecord = _initDataWhenCreate(index, transformRecord);
  transformRecord.disposedIndexArray = disposedIndexArray;
  (transformRecord, index)
  |> BufferService.checkNotExceedMaxCount(
       BufferSettingService.getTransformCount(settingRecord),
     );
};

let createWithoutMarkNotDirty = ({settingRecord} as state) => {
  let (transformRecord, index) =
    createWithoutMarkNotDirtyWithRecord(
      settingRecord,
      state |> RecordTransformMainService.getRecord,
    );
  state.transformRecord = Some(transformRecord);
  (state, index);
};

let create =
  (. state) => {
    let (state, index) = createWithoutMarkNotDirty(state);
    state.transformRecord =
      Some(
        state
        |> RecordTransformMainService.getRecord
        |> DirtyTransformService.mark(index, true),
      );
    (state, index);
  };