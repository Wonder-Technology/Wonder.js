open GeometryType;

open VboBufferType;

let _updateInfos = (infos, infoIndex, (startIndex, endIndex), offset: int) => {
  let increment = endIndex - startIndex;
  ReallocatedPointsGeometryService.setInfo(
    infoIndex,
    offset,
    offset + increment,
    infos,
  );
};

let _setNewMap = (oldIndex, newIndex, oldMap, newMap) =>
  newMap
  |> WonderCommonlib.SparseMapService.set(
       newIndex,
       oldMap |> WonderCommonlib.SparseMapService.unsafeGet(oldIndex),
     );

let _allocateNewEachData =
    (
      (
        newIndex,
        newVerticesInfos,
        newTexCoordsInfos,
        newNormalsInfos,
        newIndicesInfos,
        newVerticesOffset,
        newTexCoordsOffset,
        newNormalsOffset,
        newIndicesOffset,
        newIndices32Offset,
        newVertices,
        newTexCoords,
        newNormals,
        newIndices,
        newIndices32,
      ),
      index,
      {
        vertices,
        texCoords,
        normals,
        indices,
        indices32,
        verticesInfos,
        texCoordsInfos,
        normalsInfos,
        indicesInfos,
        disposedIndexMap,
        aliveIndexArray,
      },
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|newIndicesOffset == newIndices32Offset|j},
                ~actual={j|not|j},
              ),
              () =>
              newIndicesOffset == newIndices32Offset
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let infoIndex = BufferGeometryService.getInfoIndex(index);
  let (verticesStartIndex, verticesEndIndex) as verticesInfo =
    ReallocatedPointsGeometryService.getInfo(infoIndex, verticesInfos);
  let (texCoordsStartIndex, texCoordsEndIndex) as texCoordsInfo =
    ReallocatedPointsGeometryService.getInfo(infoIndex, texCoordsInfos);
  let (normalsStartIndex, normalsEndIndex) as normalsInfo =
    ReallocatedPointsGeometryService.getInfo(infoIndex, normalsInfos);
  let (indicesStartIndex, indicesEndIndex) as indicesInfo =
    ReallocatedPointsGeometryService.getInfo(infoIndex, indicesInfos);

  (
    succ(newIndex),
    _updateInfos(verticesInfos, infoIndex, verticesInfo, newVerticesOffset),
    _updateInfos(
      texCoordsInfos,
      infoIndex,
      texCoordsInfo,
      newTexCoordsOffset,
    ),
    _updateInfos(normalsInfos, infoIndex, normalsInfo, newNormalsOffset),
    _updateInfos(indicesInfos, infoIndex, indicesInfo, newIndicesOffset),
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (vertices, newVerticesOffset),
      (vertices, verticesStartIndex),
      verticesEndIndex,
    ),
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (texCoords, newTexCoordsOffset),
      (texCoords, texCoordsStartIndex),
      texCoordsEndIndex,
    ),
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (normals, newNormalsOffset),
      (normals, normalsStartIndex),
      normalsEndIndex,
    ),
    TypeArrayService.fillUint16ArrayWithUint16Array(
      (indices, newIndicesOffset),
      (indices, indicesStartIndex),
      indicesEndIndex,
    ),
    TypeArrayService.fillUint32ArrayWithUint32Array(
      (indices32, newIndices32Offset),
      (indices32, indicesStartIndex),
      indicesEndIndex,
    ),
    vertices,
    texCoords,
    normals,
    indices,
    indices32,
  );
};

let _allocateNewData =
    (
      newAliveIndexArray,
      {
        vertices,
        texCoords,
        normals,
        indices,
        indices32,
        verticesInfos,
        texCoordsInfos,
        normalsInfos,
        indicesInfos,
        disposedIndexMap,
        aliveIndexArray,
      } as geometryRecord,
    ) =>
  newAliveIndexArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (
           newIndex,
           newVerticesInfos,
           newTexCoordsInfos,
           newNormalsInfos,
           newIndicesInfos,
           newVerticesOffset,
           newTexCoordsOffset,
           newNormalsOffset,
           newIndicesOffset,
           newIndices32Offset,
           newVertices,
           newTexCoords,
           newNormals,
           newIndices,
           newIndices32,
         ),
         index,
       ) =>
         _allocateNewEachData(
           (
             newIndex,
             newVerticesInfos,
             newTexCoordsInfos,
             newNormalsInfos,
             newIndicesInfos,
             newVerticesOffset,
             newTexCoordsOffset,
             newNormalsOffset,
             newIndicesOffset,
             newIndices32Offset,
             newVertices,
             newTexCoords,
             newNormals,
             newIndices,
             newIndices32,
           ),
           index,
           geometryRecord,
         ),
       (
         0,
         verticesInfos,
         texCoordsInfos,
         normalsInfos,
         indicesInfos,
         0,
         0,
         0,
         0,
         0,
         vertices,
         texCoords,
         normals,
         indices,
         indices32,
       ),
     );

let _setNewDataToState =
    (
      newAliveIndexArray,
      geometryRecord,
      (
        newIndex,
        newVerticesInfos,
        newTexCoordsInfos,
        newNormalsInfos,
        newIndicesInfos,
        newVerticesOffset,
        newTexCoordsOffset,
        newNormalsOffset,
        newIndicesOffset,
        newIndices32Offset,
        newVertices,
        newTexCoords,
        newNormals,
        newIndices,
        newIndices32,
      ),
    ) => {
  ...geometryRecord,
  verticesInfos: newVerticesInfos,
  texCoordsInfos: newTexCoordsInfos,
  normalsInfos: newNormalsInfos,
  indicesInfos: newIndicesInfos,
  verticesOffset: newVerticesOffset,
  texCoordsOffset: newTexCoordsOffset,
  normalsOffset: newNormalsOffset,
  indicesOffset: newIndicesOffset,
  indices32Offset: newIndices32Offset,
  vertices: newVertices,
  texCoords: newTexCoords,
  normals: newNormals,
  indices: newIndices,
  indices32: newIndices32,
  aliveIndexArray: newAliveIndexArray,
  disposedIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let reAllocate = ({disposedIndexMap, aliveIndexArray} as geometryRecord) => {
  let newAliveIndexArray =
    aliveIndexArray
    |> Js.Array.filter(aliveIndex =>
         ! ReallocateCPUMemoryService.isDisposed(aliveIndex, disposedIndexMap)
       );
  _allocateNewData(newAliveIndexArray, geometryRecord)
  |> _setNewDataToState(newAliveIndexArray, geometryRecord);
};