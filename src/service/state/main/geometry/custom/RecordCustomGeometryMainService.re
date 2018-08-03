open StateDataMainType;

open CustomGeometryType;

open Js.Typed_array;

open BufferCustomGeometryService;

let getRecord = ({customGeometryRecord}) =>
  customGeometryRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      geometryCount: int,
      geometryPointCount,
      (vertices, texCoords, normals, indices),
    ) => (
  vertices
  |> Js.Typed_array.Float32Array.fillRangeInPlace(
       0.,
       ~start=0,
       ~end_=geometryCount * geometryPointCount * getVertexSize(),
     ),
  texCoords
  |> Js.Typed_array.Float32Array.fillRangeInPlace(
       0.,
       ~start=0,
       ~end_=geometryCount * geometryPointCount * getTexCoordsSize(),
     ),
  normals
  |> Js.Typed_array.Float32Array.fillRangeInPlace(
       0.,
       ~start=0,
       ~end_=geometryCount * geometryPointCount * getVertexSize(),
     ),
  indices
  |> Js.Typed_array.Uint16Array.fillRangeInPlace(
       0,
       ~start=0,
       ~end_=geometryCount * geometryPointCount * getIndexSize(),
     ),
);

let _initBufferData = (geometryPointCount, geometryCount) => {
  let buffer = createBuffer(geometryPointCount, geometryCount);
  let (
    vertices,
    texCoords,
    normals,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos,
  ) =
    CreateTypeArrayCustomGeometryService.createTypeArrays(
      buffer,
      geometryPointCount,
      geometryCount,
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
    indicesInfos,
  );
};

let create = ({settingRecord} as state) => {
  let geometryPointCount =
    BufferSettingService.getCustomGeometryPointCount(settingRecord);
  let geometryCount =
    BufferSettingService.getCustomGeometryCount(settingRecord);
  let (
    buffer,
    vertices,
    texCoords,
    normals,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos,
  ) =
    _initBufferData(geometryPointCount, geometryCount);
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
      groupCountMap: WonderCommonlib.SparseMapService.createEmpty(),
    });
  state;
};

let deepCopyForRestore = state => {
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
        aliveIndexArray,
      } as record =
    state |> getRecord;

  {
    ...state,
    customGeometryRecord:
      Some({
        ...record,
        index,
        vertices:
          vertices
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(verticesOffset),
        texCoords:
          texCoords
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               texCoordsOffset,
             ),
        normals:
          normals
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(normalsOffset),
        indices:
          indices
          |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(indicesOffset),
        verticesOffset,
        texCoordsOffset,
        normalsOffset,
        indicesOffset,
        disposeCount,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        disposedIndexMap: disposedIndexMap |> SparseMapService.copy,
        aliveIndexArray: aliveIndexArray |> Js.Array.copy,
      }),
  };
};