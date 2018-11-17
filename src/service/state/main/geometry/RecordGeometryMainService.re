open StateDataMainType;

open GeometryType;

open Js.Typed_array;

open BufferGeometryService;

let getRecord = ({geometryRecord}) =>
  geometryRecord |> OptionService.unsafeGet;

/* let setAllTypeArrDataToDefault =
       (
         geometryCount: int,
         geometryPointCount,
         (vertices, texCoords, normals, indices, indices32),
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
     indices32
     |> Js.Typed_array.Uint32Array.fillRangeInPlace(
          0,
          ~start=0,
          ~end_=geometryCount * geometryPointCount * getIndexSize(),
        ),
   ); */

let _initBufferData = (geometryPointCount, geometryCount) => {
  let buffer = createBuffer(geometryPointCount, geometryCount);
  let (
    vertices,
    texCoords,
    normals,
    indices,
    indices32,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos,
  ) =
    CreateTypeArrayGeometryService.createTypeArrays(
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
    indices32,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos,
  );
};

let create = ({settingRecord} as state) => {
  let geometryPointCount =
    BufferSettingService.getGeometryPointCount(settingRecord);
  let geometryCount = BufferSettingService.getGeometryCount(settingRecord);
  let (
    buffer,
    vertices,
    texCoords,
    normals,
    indices,
    indices32,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos,
  ) =
    _initBufferData(geometryPointCount, geometryCount);
  state.geometryRecord =
    Some({
      index: 0,
      buffer,
      vertices,
      texCoords,
      normals,
      indices,
      indices32,
      verticesInfos,
      texCoordsInfos,
      normalsInfos,
      indicesInfos,
      verticesOffset: 0,
      texCoordsOffset: 0,
      normalsOffset: 0,
      indicesOffset: 0,
      indices32Offset: 0,
      disposeCount: 0,
      /* configDataMap: WonderCommonlib.SparseMapService.createEmpty(),
         computeDataFuncMap: WonderCommonlib.SparseMapService.createEmpty(), */
      indicesTypeMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectsMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      aliveIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      /* isInitMap: WonderCommonlib.SparseMapService.createEmpty(), */
      /* groupCountMap: WonderCommonlib.SparseMapService.createEmpty(), */
      nameMap: WonderCommonlib.SparseMapService.createEmpty(),
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
        indices32,
        verticesOffset,
        texCoordsOffset,
        normalsOffset,
        indicesOffset,
        indices32Offset,
        verticesInfos,
        texCoordsInfos,
        normalsInfos,
        indicesInfos,
        disposeCount,
        indicesTypeMap,
        gameObjectsMap,
        disposedIndexArray,
        disposedIndexMap,
        aliveIndexArray,
        nameMap,
      } as record =
    state |> getRecord;

  let infosEndIndex = index * BufferGeometryService.getInfoSize();

  {
    ...state,
    geometryRecord:
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
        indices32:
          indices32
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(indices32Offset),
        verticesOffset,
        texCoordsOffset,
        normalsOffset,
        indicesOffset,
        indices32Offset,
        verticesInfos:
          verticesInfos
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(infosEndIndex),
        texCoordsInfos:
          texCoordsInfos
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(infosEndIndex),
        normalsInfos:
          normalsInfos
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(infosEndIndex),
        indicesInfos:
          indicesInfos
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(infosEndIndex),
        disposeCount,
        indicesTypeMap: indicesTypeMap |> SparseMapService.copy,
        gameObjectsMap:
          gameObjectsMap |> CopyTypeArrayService.deepCopyArrayArray,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        disposedIndexMap: disposedIndexMap |> SparseMapService.copy,
        aliveIndexArray: aliveIndexArray |> Js.Array.copy,
        nameMap: nameMap |> SparseMapService.copy,
      }),
  };
};