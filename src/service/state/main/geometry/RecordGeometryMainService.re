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
    copiedVertices,
    copiedTexCoords,
    copiedNormals,
    copiedIndices,
    copiedIndices32,
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
    copiedVertices,
    copiedTexCoords,
    copiedNormals,
    copiedIndices,
    copiedIndices32,
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
    copiedVertices,
    copiedTexCoords,
    copiedNormals,
    copiedIndices,
    copiedIndices32,
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
      copiedVertices,
      copiedTexCoords,
      copiedNormals,
      copiedIndices,
      copiedIndices32,
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
      isPointDataDirtyForRestore: false,
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

let _fillToCopiedVertexPoints = (sourcePoints, copiedPoints, pointOffset) => {
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (copiedPoints, 0),
    (sourcePoints, 0),
    pointOffset,
  )
  |> ignore;

  copiedPoints;
};

let _fillToCopiedIndices = (sourcePoints, copiedPoints, pointOffset) => {
  TypeArrayService.fillUint16ArrayWithUint16Array(
    (copiedPoints, 0),
    (sourcePoints, 0),
    pointOffset,
  )
  |> ignore;

  copiedPoints;
};

let _fillToCopiedIndices32 = (sourcePoints, copiedPoints, pointOffset) => {
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (copiedPoints, 0),
    (sourcePoints, 0),
    pointOffset,
  )
  |> ignore;

  copiedPoints;
};

let deepCopyForRestore = state => {
  let {
        index,
        vertices,
        texCoords,
        normals,
        indices,
        indices32,
        copiedVertices,
        copiedTexCoords,
        copiedNormals,
        copiedIndices,
        copiedIndices32,
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
        isPointDataDirtyForRestore: false,
        index,
        copiedVertices:
          _fillToCopiedVertexPoints(vertices, copiedVertices, verticesOffset),
        copiedTexCoords:
          _fillToCopiedVertexPoints(
            texCoords,
            copiedTexCoords,
            texCoordsOffset,
          ),
        copiedNormals:
          _fillToCopiedVertexPoints(normals, copiedNormals, normalsOffset),
        copiedIndices:
          _fillToCopiedIndices(indices, copiedIndices, indicesOffset),
        copiedIndices32:
          _fillToCopiedIndices32(indices32, copiedIndices32, indicesOffset),
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