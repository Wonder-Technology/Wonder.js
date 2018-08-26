open GeometryType;

open VboBufferType;

let _updateInfos = (infos, infoIndex, (startIndex, endIndex), offset: int) => {
  let increment = endIndex - startIndex;
  ReallocatedPointsGeometryService.setInfo(infoIndex, offset, offset + increment, infos)
};

let _setNewMap = (oldIndex, newIndex, oldMap, newMap) =>
  newMap
  |> WonderCommonlib.SparseMapService.set(
       newIndex,
       oldMap |> WonderCommonlib.SparseMapService.unsafeGet(oldIndex)
     );

let _allocateNewData =
    (
      newAliveIndexArray,
      {
        vertices,
        texCoords,
        normals,
        indices,
        verticesInfos,
        texCoordsInfos,
        normalsInfos,
        indicesInfos,
        disposedIndexMap,
        aliveIndexArray
      }
    ) =>
  newAliveIndexArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
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
             newVertices,
             newTexCoords,
             newNormals,
             newIndices
           ),
           index
         ) => {
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
             _updateInfos(texCoordsInfos, infoIndex, texCoordsInfo, newTexCoordsOffset),
             _updateInfos(normalsInfos, infoIndex, normalsInfo, newNormalsOffset),
             _updateInfos(indicesInfos, infoIndex, indicesInfo, newIndicesOffset),
             TypeArrayService.fillFloat32ArrayWithFloat32Array(
               (vertices, newVerticesOffset),
               (vertices, verticesStartIndex),
               verticesEndIndex
             ),
             TypeArrayService.fillFloat32ArrayWithFloat32Array(
               (texCoords, newTexCoordsOffset),
               (texCoords, texCoordsStartIndex),
               texCoordsEndIndex
             ),
             TypeArrayService.fillFloat32ArrayWithFloat32Array(
               (normals, newNormalsOffset),
               (normals, normalsStartIndex),
               normalsEndIndex
             ),
             TypeArrayService.fillUint16ArrayWithUint16Array(
               (indices, newIndicesOffset),
               (indices, indicesStartIndex),
               indicesEndIndex
             ),
             vertices,
             texCoords,
             normals,
             indices
           )
         }
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
         vertices,
         texCoords,
         normals,
         indices
       )
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
        newVertices,
        newTexCoords,
        newNormals,
        newIndices
      )
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
  vertices: newVertices,
  texCoords: newTexCoords,
  normals: newNormals,
  indices: newIndices,
  aliveIndexArray: newAliveIndexArray,
  disposedIndexMap: WonderCommonlib.SparseMapService.createEmpty()
};

let reAllocate = ({disposedIndexMap, aliveIndexArray} as geometryRecord) => {
  let newAliveIndexArray =
    aliveIndexArray
    |> Js.Array.filter(
         (aliveIndex) => ! ReallocateCPUMemoryService.isDisposed(aliveIndex, disposedIndexMap)
       );
  _allocateNewData(newAliveIndexArray, geometryRecord)
  |> _setNewDataToState(newAliveIndexArray, geometryRecord)
};