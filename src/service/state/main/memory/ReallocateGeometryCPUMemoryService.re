open GeometryType;

open AllVboBufferType;

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
  |> WonderCommonlib.MutableSparseMapService.set(
       newIndex,
       oldMap |> WonderCommonlib.MutableSparseMapService.unsafeGet(oldIndex),
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
        newIndices16,
        newIndices32,
      ),
      index,
      {
        vertices,
        texCoords,
        normals,
        indices16,
        indices32,
        verticesInfos,
        texCoordsInfos,
        normalsInfos,
        indicesInfos,
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
      (newIndices16, newIndicesOffset),
      (indices16, indicesStartIndex),
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
    newIndices16,
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
        newIndices16,
        newIndices32,
        newVerticesInfos,
        newTexCoordsInfos,
        newNormalsInfos,
        newIndicesInfos,
      ),
      geometryRecord,
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
           newIndices16,
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
             newIndices16,
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
         newIndices16,
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
          newIndices16,
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
  indices16Offset: newIndicesOffset,
  indices32Offset: newIndices32Offset,
  vertices: newVertices,
  texCoords: newTexCoords,
  normals: newNormals,
  indices16: newIndices16,
  indices32: newIndices32,
};

let getAllAliveGeometrys = (index, {disposedIndexArray}) =>
  AliveComponentService.getAllAliveComponents(index, disposedIndexArray);

let reAllocateToBuffer = (newBufferData, {index} as geometryRecord) => {
  let newAliveIndexArray = getAllAliveGeometrys(index, geometryRecord);

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
        indices16,
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
      indices16,
      indices32,
      verticesInfos,
      texCoordsInfos,
      normalsInfos,
      indicesInfos,
    ),
    geometryRecord,
  );