open GeometryType;

open CustomGeometryType;

open VboBufferType;

let _updateInfoArray = (infoArray, index: int, {startIndex, endIndex}, offset: int) => {
  let increment = endIndex - startIndex;
  let newInfo = PointsGeometryMainService.buildInfo(offset, offset + increment);
  Array.unsafe_set(infoArray, index, newInfo);
  newInfo
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
        verticesInfoArray,
        normalsInfoArray,
        indicesInfoArray,
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
             /* newMappedIndexMap, */
             newVerticesInfoArray,
             newNormalsInfoArray,
             newIndicesInfoArray,
             newVerticesOffset,
             newNormalsOffset,
             newIndicesOffset,
             newVertices,
             newNormals,
             newIndices
           ),
           index
         ) => {
           let verticesInfo = PointsGeometryMainService.getInfo(verticesInfoArray, newIndex);
           let normalsInfo = PointsGeometryMainService.getInfo(normalsInfoArray, newIndex);
           let indicesInfo = PointsGeometryMainService.getInfo(indicesInfoArray, newIndex);
           let newVerticesInfo =
             _updateInfoArray(verticesInfoArray, index, verticesInfo, newVerticesOffset);
           let newNormalsInfo =
             _updateInfoArray(normalsInfoArray, index, normalsInfo, newNormalsOffset);
           let newIndicesInfo =
             _updateInfoArray(indicesInfoArray, index, indicesInfo, newIndicesOffset);
           (
             succ(newIndex),
             /* MappedIndexService.setMappedIndex(index, newIndex, newMappedIndexMap), */
             verticesInfoArray,
             normalsInfoArray,
             indicesInfoArray,
             /* _setNewMap(index, newIndex, computeDataFuncMap, newComputeDataFuncMap),
                _setNewMap(index, newIndex, configDataMap, newConfigDataMap),
                _setNewMap(index, newIndex, gameObjectMap, newGameObjectMap),
                _setNewMap(index, newIndex, isInitMap, newIsInitMap),
                _setNewMap(index, newIndex, groupCountMap, newGroupCountMap),
                _updateInfoArray(newVerticesInfoArray, newIndex, verticesInfo, newVerticesOffset),
                _updateInfoArray(newNormalsInfoArray, newIndex, normalsInfo, newNormalsOffset),
                _updateInfoArray(newIndicesInfoArray, newIndex, indicesInfo, newIndicesOffset), */
             TypeArrayService.fillFloat32ArrayWithFloat32Array(
               (vertices, newVerticesOffset),
               (vertices, newVerticesInfo.startIndex),
               newVerticesInfo.endIndex
             ),
             TypeArrayService.fillFloat32ArrayWithFloat32Array(
               (normals, newNormalsOffset),
               (normals, newNormalsInfo.startIndex),
               newNormalsInfo.endIndex
             ),
             TypeArrayService.fillUint16ArrayWithUint16Array(
               (indices, newIndicesOffset),
               (indices, newIndicesInfo.startIndex),
               newIndicesInfo.endIndex
             ),
             vertices,
             normals,
             indices
           )
         }
       ),
       (
         0,
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         0,
         0,
         0,
         vertices,
         normals,
         indices
       )
     );

let _setNewDataToState =
    (
      newAliveIndexArray,
      customGeometryRecord,
      (
        newIndex,
        /* newMappedIndexMap, */
        newVerticesInfoArray,
        newNormalsInfoArray,
        newIndicesInfoArray,
        newVerticesOffset,
        newNormalsOffset,
        newIndicesOffset,
        newVertices,
        newNormals,
        newIndices
      )
    ) => {
  ...customGeometryRecord,
  verticesInfoArray: newVerticesInfoArray,
  normalsInfoArray: newNormalsInfoArray,
  indicesInfoArray: newIndicesInfoArray,
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
  /* WonderLog.Log.print((newAliveIndexArray, aliveIndexArray)) |> ignore; */
  _allocateNewData(newAliveIndexArray, customGeometryRecord)
  |> _setNewDataToState(newAliveIndexArray, customGeometryRecord)
};