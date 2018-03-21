open MainStateDataType;

open TransformType;

open Js.Typed_array;

let getRecord = ({transformRecord}) => transformRecord |> OptionService.unsafeGet;

let getLocalToWorldMatricesSize = () => 16;

let getLocalToWorldMatricesLength = (count) => count * getLocalToWorldMatricesSize();

let getLocalToWorldMatricesOffset = (count) => 0;

let getLocalPositionsSize = () => 3;

let getLocalPositionsLength = (count) => count * getLocalPositionsSize();

let getLocalPositionsOffset = (count) =>
  getLocalToWorldMatricesLength(count) * Float32Array._BYTES_PER_ELEMENT;

/* let getDefaultLocalToWorldMatrix = ({defaultLocalToWorldMatrix}) => defaultLocalToWorldMatrix;

   let getDefaultLocalPosition = ({defaultLocalPosition}) => defaultLocalPosition; */
let getLocalToWorldMatrixIndex = (index) => index * getLocalToWorldMatricesSize();

let getLocalPositionIndex = (index) => index * getLocalPositionsSize();

let getLocalToWorldMatrixTypeArray = (index, typeArr) =>
  TypeArrayService.getFloat16TypeArray(getLocalToWorldMatrixIndex(index), typeArr);

let getLocalToWorldMatrix = (index, typeArr) =>
  TypeArrayService.getFloat16(getLocalToWorldMatrixIndex(index), typeArr);

let setLocalToWorldMatrix = (index, data, typeArr) =>
  TypeArrayService.setFloat16(getLocalToWorldMatrixIndex(index), data, typeArr);

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
  let buffer =
    ArrayBuffer.make(
      count
      * Float32Array._BYTES_PER_ELEMENT
      * (getLocalPositionsSize() + getLocalToWorldMatricesSize())
    );
  let localToWorldMatrices =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getLocalToWorldMatricesOffset(count),
      ~length=getLocalToWorldMatricesLength(count)
    );
  let localPositions =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getLocalPositionsOffset(count),
      ~length=getLocalPositionsLength(count)
    );
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
  {
    ...state,
    transformRecord:
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
        normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
        disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
      })
  }
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
    index,
    buffer,
    localToWorldMatrices,
    localPositions,
    defaultLocalToWorldMatrix,
    defaultLocalPosition,
    normalMatrixCacheMap,
    parentMap,
    childMap,
    dirtyMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getRecord;
  let copiedBuffer = CopyTypeArrayService.copyArrayBuffer(buffer);
  let transformDataBufferCount = BufferSettingService.getTransformDataBufferCount(settingRecord);
  {
    ...state,
    transformRecord:
      Some({
        index,
        buffer: copiedBuffer,
        localToWorldMatrices:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getLocalToWorldMatricesOffset(transformDataBufferCount),
            getLocalToWorldMatricesLength(transformDataBufferCount)
          ),
        localPositions:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getLocalPositionsOffset(transformDataBufferCount),
            getLocalPositionsLength(transformDataBufferCount)
          ),
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
        parentMap: parentMap |> SparseMapService.copy,
        childMap: childMap |> CopyTypeArrayService.deepCopyArrayArray,
        dirtyMap: dirtyMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};