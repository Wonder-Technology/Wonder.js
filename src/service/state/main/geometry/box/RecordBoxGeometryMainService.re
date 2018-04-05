open MainStateDataType;

open BoxGeometryType;

open BufferBoxGeometryService;

open Js.Typed_array;

let getRecord = ({boxGeometryRecord}) => boxGeometryRecord |> OptionService.unsafeGet;

let _initBufferData = (count) => {
  let buffer =
    ArrayBuffer.make(
      count
      * (
        Float32Array._BYTES_PER_ELEMENT
        * getVertexSize()
        * 2
        + Uint16Array._BYTES_PER_ELEMENT
        * getIndexSize()
      )
    );
  let vertices =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getVerticesOffset(count),
      ~length=getVertexLength(count)
    );
  let normals =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getNormalsOffset(count),
      ~length=getVertexLength(count)
    );
  let indices =
    Uint16Array.fromBufferRange(
      buffer,
      ~offset=getIndicesOffset(count),
      ~length=getIndicesLength(count)
    );
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
      computeDataFuncMap: WonderCommonlib.SparseMapService.createEmpty(),
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
    computeDataFuncMap,
    groupCountMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getRecord;
  let copiedBuffer = CopyTypeArrayService.copyArrayBuffer(buffer);
  let geometryDataBufferCount =
    BufferSettingService.getBoxGeometryPointDataBufferCount(settingRecord);
  {
    ...state,
    boxGeometryRecord:
      Some({
        index,
        buffer: copiedBuffer,
        vertices:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getVerticesOffset(geometryDataBufferCount),
            getVertexLength(geometryDataBufferCount)
          ),
        normals:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getNormalsOffset(geometryDataBufferCount),
            getVertexLength(geometryDataBufferCount)
          ),
        indices:
          CopyTypeArrayService.copyUint16TypeArrayFromBufferRange(
            copiedBuffer,
            getIndicesOffset(geometryDataBufferCount),
            getIndicesLength(geometryDataBufferCount)
          ),
        computeDataFuncMap: computeDataFuncMap |> SparseMapService.copy,
        configDataMap: configDataMap |> SparseMapService.copy,
        isInitMap: isInitMap |> SparseMapService.copy,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};