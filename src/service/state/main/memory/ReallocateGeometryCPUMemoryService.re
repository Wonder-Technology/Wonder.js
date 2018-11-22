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
    _updateInfos(
      newVerticesInfos,
      infoIndex,
      verticesInfo,
      newVerticesOffset,
    ),
    _updateInfos(
      newTexCoordsInfos,
      infoIndex,
      texCoordsInfo,
      newTexCoordsOffset,
    ),
    _updateInfos(newNormalsInfos, infoIndex, normalsInfo, newNormalsOffset),
    _updateInfos(newIndicesInfos, infoIndex, indicesInfo, newIndicesOffset),
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (newVertices, newVerticesOffset),
      (vertices, verticesStartIndex),
      verticesEndIndex,
    ),
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (newTexCoords, newTexCoordsOffset),
      (texCoords, texCoordsStartIndex),
      texCoordsEndIndex,
    ),
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (newNormals, newNormalsOffset),
      (normals, normalsStartIndex),
      normalsEndIndex,
    ),
    TypeArrayService.fillUint16ArrayWithUint16Array(
      (newIndices, newIndicesOffset),
      (indices, indicesStartIndex),
      indicesEndIndex,
    ),
    TypeArrayService.fillUint32ArrayWithUint32Array(
      (newIndices32, newIndices32Offset),
      (indices32, indicesStartIndex),
      indicesEndIndex,
    ),
    newVertices,
    newTexCoords,
    newNormals,
    newIndices,
    newIndices32,
  );
};

let _allocateNewData =
    (
      newAliveIndexArray,
      (
        newBuffer,
        newVertices,
        newTexCoords,
        newNormals,
        newIndices,
        newIndices32,
        newVerticesInfos,
        newTexCoordsInfos,
        newNormalsInfos,
        newIndicesInfos,
      ),
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
    ) => (
  newBuffer,
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
         newVerticesInfos,
         newTexCoordsInfos,
         newNormalsInfos,
         newIndicesInfos,
         0,
         0,
         0,
         0,
         0,
         newVertices,
         newTexCoords,
         newNormals,
         newIndices,
         newIndices32,
       ),
     ),
);

let _setNewDataToState =
    (
      newAliveIndexArray,
      geometryRecord,
      (
        newBuffer,
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
      ),
    ) => {
  ...geometryRecord,
  buffer: newBuffer,
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

let reAllocateToBuffer =
    (newBufferData, {disposedIndexMap, aliveIndexArray} as geometryRecord) => {
  let newAliveIndexArray =
    aliveIndexArray
    |> Js.Array.filter(aliveIndex =>
         ! ReallocateCPUMemoryService.isDisposed(aliveIndex, disposedIndexMap)
       );
  _allocateNewData(newAliveIndexArray, newBufferData, geometryRecord)
  |> _setNewDataToState(newAliveIndexArray, geometryRecord);
};

let reAllocateToTheSameBuffer =
    (
      {
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
      } as geometryRecord,
    ) =>
  reAllocateToBuffer(
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
    ),
    geometryRecord,
  );