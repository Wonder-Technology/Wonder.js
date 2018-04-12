open StateDataMainType;

open TransformType;

open Js.Typed_array;

open BufferTransformService;

let getRecord = ({transformRecord}) => transformRecord |> OptionService.unsafeGet;

let getLocalToWorldMatrixTypeArray = (index, typeArr) =>
  TypeArrayService.getFloat16TypeArray(getLocalToWorldMatrixIndex(index), typeArr);

let getLocalToWorldMatrix = (index, typeArr) =>
  TypeArrayService.getFloat16(getLocalToWorldMatrixIndex(index), typeArr);

let setLocalToWorldMatrix = (index, data, typeArr) =>
  TypeArrayService.setFloat16(getLocalToWorldMatrixIndex(index), data, typeArr);

let getLocalPositionTuple = (index, typeArr) =>
  TypeArrayService.getFloat3Tuple(getLocalPositionIndex(index), typeArr);

let getLocalPositionTypeArray = (index, typeArr) =>
  TypeArrayService.getFloat3TypeArray(getLocalPositionIndex(index), typeArr);

let setLocalPosition = (index, data, typeArr) =>
  TypeArrayService.setFloat3(getLocalPositionIndex(index), data, typeArr);

let setLocalPositionByTuple = (index, dataTuple, typeArr) =>
  TypeArrayService.setFloat3ByTuple(getLocalPositionIndex(index), dataTuple, typeArr);

let _setDefaultTypeArrData =
    (
      count: int,
      defaultLocalToWorldMatrix,
      defaultLocalPosition,
      (buffer, localToWorldMatrices, localPositions)
    ) => (
  buffer,
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((localToWorldMatrices, localPositions), index) => (
           setLocalToWorldMatrix(index, defaultLocalToWorldMatrix, localToWorldMatrices),
           setLocalPosition(index, defaultLocalPosition, localPositions)
         )
       ),
       (localToWorldMatrices, localPositions)
     )
);

let _initBufferData = (count, defaultLocalToWorldMatrix, defaultLocalPosition) => {
  let buffer = createBuffer(count);
  let (localToWorldMatrices, localPositions) =
    CreateTypeArrayTransformService.createTypeArrays(buffer, count);
  (buffer, localToWorldMatrices, localPositions)
  |> _setDefaultTypeArrData(count, defaultLocalToWorldMatrix, defaultLocalPosition)
};

let create = ({settingRecord} as state) => {
  let transformDataBufferCount = BufferSettingService.getTransformDataBufferCount(settingRecord);
  let defaultLocalToWorldMatrix = [|
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
  let defaultLocalPosition = [|0., 0., 0.|];
  let (buffer, (localToWorldMatrices, localPositions)) =
    _initBufferData(transformDataBufferCount, defaultLocalToWorldMatrix, defaultLocalPosition);
  state.transformRecord =
    Some({
      index: 0,
      buffer,
      localToWorldMatrices,
      localPositions,
      defaultLocalToWorldMatrix,
      defaultLocalPosition,
      parentMap: WonderCommonlib.SparseMapService.createEmpty(),
      childMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      dirtyMap: WonderCommonlib.SparseMapService.createEmpty(),
      localToWorldMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
    });
  state
};

let deepCopyForRestore = (state) => {
  let {
        index,
        buffer,
        localToWorldMatrices,
        localPositions,
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        localToWorldMatrixCacheMap,
        normalMatrixCacheMap,
        parentMap,
        childMap,
        dirtyMap,
        gameObjectMap,
        disposedIndexArray
      } as record =
    state |> getRecord;
  {
    ...state,
    transformRecord:
      Some({
        ...record,
        buffer:
          CopyArrayBufferService.copyArrayBuffer(
            buffer,
            BufferTransformService.getTotalByteLength(index)
          ),
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        localToWorldMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
        normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
        parentMap: parentMap |> SparseMapService.copy,
        childMap: childMap |> CopyTypeArrayService.deepCopyArrayArray,
        dirtyMap: dirtyMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};