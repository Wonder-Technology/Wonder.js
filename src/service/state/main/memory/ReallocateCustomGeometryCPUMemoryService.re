open GeometryType;

open CustomGeometryType;

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
        normals,
        indices,
        verticesInfos,
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
             newNormalsInfos,
             newIndicesInfos,
             newVerticesOffset,
             newNormalsOffset,
             newIndicesOffset,
             newVertices,
             newNormals,
             newIndices
           ),
           index
         ) => {
           let infoIndex = BufferCustomGeometryService.getInfoIndex(index);
           let (verticesStartIndex, verticesEndIndex) as verticesInfo =
             ReallocatedPointsGeometryService.getInfo(infoIndex, verticesInfos);
           let (normalsStartIndex, normalsEndIndex) as normalsInfo =
             ReallocatedPointsGeometryService.getInfo(infoIndex, normalsInfos);
           let (indicesStartIndex, indicesEndIndex) as indicesInfo =
             ReallocatedPointsGeometryService.getInfo(infoIndex, indicesInfos);
           (
             succ(newIndex),
             _updateInfos(verticesInfos, infoIndex, verticesInfo, newVerticesOffset),
             _updateInfos(normalsInfos, infoIndex, normalsInfo, newNormalsOffset),
             _updateInfos(indicesInfos, infoIndex, indicesInfo, newIndicesOffset),
             TypeArrayService.fillFloat32ArrayWithFloat32Array(
               (vertices, newVerticesOffset),
               (vertices, verticesStartIndex),
               verticesEndIndex
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
             normals,
             indices
           )
         }
       ),
       (0, verticesInfos, normalsInfos, indicesInfos, 0, 0, 0, vertices, normals, indices)
     );

let _setNewDataToState =
    (
      newAliveIndexArray,
      customGeometryRecord,
      (
        newIndex,
        newVerticesInfos,
        newNormalsInfos,
        newIndicesInfos,
        newVerticesOffset,
        newNormalsOffset,
        newIndicesOffset,
        newVertices,
        newNormals,
        newIndices
      )
    ) => {
  ...customGeometryRecord,
  verticesInfos: newVerticesInfos,
  normalsInfos: newNormalsInfos,
  indicesInfos: newIndicesInfos,
  verticesOffset: newVerticesOffset,
  normalsOffset: newNormalsOffset,
  indicesOffset: newIndicesOffset,
  vertices: newVertices,
  normals: newNormals,
  indices: newIndices,
  aliveIndexArray: newAliveIndexArray,
  disposedIndexMap: WonderCommonlib.SparseMapService.createEmpty()
};

let reAllocate = ({disposedIndexMap, aliveIndexArray} as customGeometryRecord) => {
  let newAliveIndexArray =
    aliveIndexArray
    |> Js.Array.filter(
         (aliveIndex) => ! ReallocateCPUMemoryService.isDisposed(aliveIndex, disposedIndexMap)
       );
  _allocateNewData(newAliveIndexArray, customGeometryRecord)
  |> _setNewDataToState(newAliveIndexArray, customGeometryRecord)
};