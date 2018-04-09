open StateDataMainType;

open BoxGeometryType;

open BufferBoxGeometryService;

open Js.Typed_array;

let getRecord = ({boxGeometryRecord}) => boxGeometryRecord |> OptionService.unsafeGet;

let _initBufferData = (count) => {
  let buffer =
    Worker.newSharedArrayBuffer(
      count
      * (
        Float32Array._BYTES_PER_ELEMENT
        * getVertexSize()
        * 2
        + Uint16Array._BYTES_PER_ELEMENT
        * getIndexSize()
      )
    );
  let (vertices, normals, indices) =
    CreateTypeArrayBoxGeometryService.createTypeArrays(buffer, count);
  (buffer, vertices, normals, indices)
};

let create = ({settingRecord} as state) => {
  let geometryDataBufferCount =
    BufferSettingService.getBoxGeometryPointDataBufferCount(settingRecord);
  let (buffer, vertices, normals, indices) = _initBufferData(geometryDataBufferCount);
  state.boxGeometryRecord =
    Some({
      index: 0,
      buffer,
      vertices,
      normals,
      indices,
      configDataMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      isInitMap: WonderCommonlib.SparseMapService.createEmpty(),
      groupCountMap: WonderCommonlib.SparseMapService.createEmpty()
    });
  state
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
    index,
    buffer,
    vertices,
    normals,
    indices,
    configDataMap,
    isInitMap,
    groupCountMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getRecord;
  let copiedBuffer = CopyTypeArrayService.copySharedArrayBuffer(buffer);
  let geometryDataBufferCount =
    BufferSettingService.getBoxGeometryPointDataBufferCount(settingRecord);
  {
    ...state,
    boxGeometryRecord:
      Some({
        index,
        buffer: copiedBuffer,
        vertices:
          CopyTypeArrayService.copyFloat32TypeArrayFromSharedArrayBufferRange(
            copiedBuffer,
            getVerticesOffset(geometryDataBufferCount),
            getVertexLength(geometryDataBufferCount)
          ),
        normals:
          CopyTypeArrayService.copyFloat32TypeArrayFromSharedArrayBufferRange(
            copiedBuffer,
            getNormalsOffset(geometryDataBufferCount),
            getVertexLength(geometryDataBufferCount)
          ),
        indices:
          CopyTypeArrayService.copyUint16TypeArrayFromSharedArrayBufferRange(
            copiedBuffer,
            getIndicesOffset(geometryDataBufferCount),
            getIndicesLength(geometryDataBufferCount)
          ),
        configDataMap: configDataMap |> SparseMapService.copy,
        isInitMap: isInitMap |> SparseMapService.copy,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};