open StateDataMainType;

open CustomGeometryType;

open Js.Typed_array;

open BufferCustomGeometryService;

let getRecord = ({customGeometryRecord}) => customGeometryRecord |> OptionService.unsafeGet;

let _initBufferData = (count) => {
  let buffer = createBuffer(count);
  let vertices =
    Float32Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
      ~offset=getVerticesOffset(count),
      ~length=getVertexLength(count)
    );
  let normals =
    Float32Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
      ~offset=getNormalsOffset(count),
      ~length=getVertexLength(count)
    );
  let indices =
    Uint16Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
      ~offset=getIndicesOffset(count),
      ~length=getIndicesLength(count)
    );
  (buffer, vertices, normals, indices)
};

let create = ({settingRecord} as state) => {
  let geometryDataBufferCount =
    BufferSettingService.getCustomGeometryPointDataBufferCount(settingRecord);
  let (buffer, vertices, normals, indices) = _initBufferData(geometryDataBufferCount);
  state.customGeometryRecord =
    Some({
      index: 0,
      buffer,
      vertices,
      normals,
      indices,
      verticesInfoArray: WonderCommonlib.SparseMapService.createEmpty(),
      normalsInfoArray: WonderCommonlib.SparseMapService.createEmpty(),
      indicesInfoArray: WonderCommonlib.SparseMapService.createEmpty(),
      verticesOffset: 0,
      normalsOffset: 0,
      indicesOffset: 0,
      disposeCount: 0,
      /* configDataMap: WonderCommonlib.SparseMapService.createEmpty(),
         computeDataFuncMap: WonderCommonlib.SparseMapService.createEmpty(), */
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      aliveIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      /* isInitMap: WonderCommonlib.SparseMapService.createEmpty(), */
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
    verticesInfoArray,
    normalsInfoArray,
    indicesInfoArray,
    verticesOffset,
    normalsOffset,
    indicesOffset,
    disposeCount,
    groupCountMap,
    gameObjectMap,
    disposedIndexArray,
    disposedIndexMap,
    aliveIndexArray
  } =
    state |> getRecord;
  let (state, copiedBuffer) =
    CopyArrayBufferPoolMainService.copyArrayBuffer(
      buffer,
      ArrayBufferPoolType.CustomGeometryArrayBuffer,
      state
    );
  let geometryDataBufferCount =
    BufferSettingService.getCustomGeometryPointDataBufferCount(settingRecord);
  {
    ...state,
    customGeometryRecord:
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
        verticesInfoArray: verticesInfoArray |> SparseMapService.copy,
        normalsInfoArray: normalsInfoArray |> SparseMapService.copy,
        indicesInfoArray: indicesInfoArray |> SparseMapService.copy,
        verticesOffset,
        normalsOffset,
        indicesOffset,
        disposeCount,
        /* computeDataFuncMap: computeDataFuncMap |> SparseMapService.copy,
           configDataMap: configDataMap |> SparseMapService.copy, */
        /* isInitMap: isInitMap |> SparseMapService.copy, */
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        disposedIndexMap: disposedIndexMap |> SparseMapService.copy,
        aliveIndexArray: aliveIndexArray |> Js.Array.copy
      })
  }
};