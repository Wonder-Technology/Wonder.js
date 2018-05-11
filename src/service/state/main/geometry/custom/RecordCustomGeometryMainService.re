open StateDataMainType;

open CustomGeometryType;

open Js.Typed_array;

open BufferCustomGeometryService;

let getRecord = ({customGeometryRecord}) => customGeometryRecord |> OptionService.unsafeGet;

let setDefaultTypeArrData = (geometryCount: int, (vertices, texCoords, normals, indices)) =>
  WonderCommonlib.ArrayService.range(0, geometryCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((vertices, texCoords, normals, indices), index) => (
           TypeArrayService.setFloat1(getVertexIndex(index), 0., vertices),
           TypeArrayService.setFloat1(getTexCoordsIndex(index), 0., texCoords),
           TypeArrayService.setFloat1(getVertexIndex(index), 0., normals),
           TypeArrayService.setUint16_1(getIndexIndex(index), 0, indices)
         )
       ),
       (vertices, texCoords, normals, indices)
     );

let _initBufferData = (geometryPointDataBufferCount, geometryDataBufferCount) => {
  let buffer = createBuffer(geometryPointDataBufferCount, geometryDataBufferCount);
  let (
    vertices,
    texCoords,
    normals,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos
  ) =
    CreateTypeArrayCustomGeometryService.createTypeArrays(
      buffer,
      geometryPointDataBufferCount,
      geometryDataBufferCount
    );
  (
    buffer,
    vertices,
    texCoords,
    normals,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos
  )
};

let create = ({settingRecord} as state) => {
  let geometryPointDataBufferCount =
    BufferSettingService.getCustomGeometryPointDataBufferCount(settingRecord);
  let geometryDataBufferCount =
    BufferSettingService.getCustomGeometryDataBufferCount(settingRecord);
  let (
    buffer,
    vertices,
    texCoords,
    normals,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos
  ) =
    _initBufferData(geometryPointDataBufferCount, geometryDataBufferCount);
  state.customGeometryRecord =
    Some({
      index: 0,
      buffer,
      vertices,
      texCoords,
      normals,
      indices,
      verticesInfos,
      texCoordsInfos,
      normalsInfos,
      indicesInfos,
      verticesOffset: 0,
      texCoordsOffset: 0,
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

let deepCopyForRestore = (state) => {
  let {
        index,
        vertices,
        texCoords,
        normals,
        indices,
        verticesOffset,
        texCoordsOffset,
        normalsOffset,
        indicesOffset,
        disposeCount,
        groupCountMap,
        gameObjectMap,
        disposedIndexArray,
        disposedIndexMap,
        aliveIndexArray
      } as record =
    state |> getRecord;
  {
    ...state,
    customGeometryRecord:
      Some({
        ...record,
        index,
        vertices:
          vertices |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getVertexSize()),
        /* TODO test */
        texCoords:
          texCoords |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getTexCoordsSize()),
        normals:
          normals |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getVertexSize()),
        indices:
          indices |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(index * getIndexSize()),
        verticesOffset,
        /* TODO test */
        texCoordsOffset,
        normalsOffset,
        indicesOffset,
        disposeCount,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        disposedIndexMap: disposedIndexMap |> SparseMapService.copy,
        aliveIndexArray: aliveIndexArray |> Js.Array.copy
      })
  }
};