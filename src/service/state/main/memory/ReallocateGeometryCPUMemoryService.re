open GeometryType;

open BoxGeometryType;

open VboBufferType;

let _updateInfoArray = (newInfoArray, newIndex: int, {startIndex, endIndex}, offset: int) => {
  let increment = endIndex - startIndex;
  Array.unsafe_set(
    newInfoArray,
    newIndex,
    PointsGeometryMainService.buildInfo(offset, offset + increment)
  );
  newInfoArray
};

let _setNewMap = (index, oldMap, newMap) =>
  newMap
  |> WonderCommonlib.SparseMapService.set(
       index,
       oldMap |> WonderCommonlib.SparseMapService.unsafeGet(index)
     );

let _allocateNewData =
    (
      newAliveIndexArray,
      {vertexBufferMap, normalBufferMap, elementArrayBufferMap},
      {
        vertices,
        normals,
        indices,
        verticesInfoArray,
        normalsInfoArray,
        indicesInfoArray,
        configDataMap,
        computeDataFuncMap,
        gameObjectMap,
        mappedIndexMap,
        /* indicesCountCacheMap,
           verticesCountCacheMap, */
        disposedIndexMap,
        aliveIndexArray,
        isInitMap,
        groupCountMap
      }
    ) =>
  newAliveIndexArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (
           (
             newVertexBufferMap,
             newNormalBufferMap,
             newElementArrayBufferMap,
             newIndex,
             newMappedIndexMap,
             newComputeDataFuncMap,
             newConfigDataMap,
             newGameObjectMap,
             /* newIndicesCountCacheMap ,
                newVerticesCountCacheMap, */
             newIsInitMap,
             newGroupCountMap,
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
           (
             _setNewMap(index, vertexBufferMap, newVertexBufferMap),
             _setNewMap(index, normalBufferMap, newNormalBufferMap),
             _setNewMap(index, elementArrayBufferMap, newElementArrayBufferMap),
             succ(newIndex),
             MappedIndexService.setMappedIndex(index, newIndex, newMappedIndexMap),
             _setNewMap(newIndex, computeDataFuncMap, newComputeDataFuncMap),
             _setNewMap(newIndex, configDataMap, newConfigDataMap),
             _setNewMap(newIndex, gameObjectMap, newGameObjectMap),
             _setNewMap(newIndex, isInitMap, newIsInitMap),
             _setNewMap(newIndex, groupCountMap, newGroupCountMap),
             _updateInfoArray(newVerticesInfoArray, newIndex, verticesInfo, newVerticesOffset),
             _updateInfoArray(newNormalsInfoArray, newIndex, normalsInfo, newNormalsOffset),
             _updateInfoArray(newIndicesInfoArray, newIndex, indicesInfo, newIndicesOffset),
             TypeArrayService.fillFloat32ArrayWithFloat32Array(
               (vertices, newVerticesOffset),
               (vertices, verticesInfo.startIndex),
               verticesInfo.endIndex
             ),
             TypeArrayService.fillFloat32ArrayWithFloat32Array(
               (normals, newNormalsOffset),
               (normals, normalsInfo.startIndex),
               normalsInfo.endIndex
             ),
             TypeArrayService.fillUint16ArrayWithUint16Array(
               (indices, newIndicesOffset),
               (indices, indicesInfo.startIndex),
               indicesInfo.endIndex
             ),
             vertices,
             normals,
             indices
           )
         }
       ),
       (
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         0,
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
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
      vboBufferRecord,
      boxGeometryRecord,
      (
        newVertexBufferMap,
        newNormalBufferMap,
        newElementArrayBufferMap,
        newIndex,
        newMappedIndexMap,
        newComputeDataFuncMap,
        newConfigDataMap,
        newGameObjectMap,
        /* newIndicesCountCacheMap ,
           newVerticesCountCacheMap, */
        newIsInitMap,
        newGroupCountMap,
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
    ) => (
  {
    ...vboBufferRecord,
    vertexBufferMap: newVertexBufferMap,
    normalBufferMap: newNormalBufferMap,
    elementArrayBufferMap: newElementArrayBufferMap
  },
  {
    ...boxGeometryRecord,
    index: newIndex,
    mappedIndexMap: newMappedIndexMap,
    computeDataFuncMap: newComputeDataFuncMap,
    configDataMap: newConfigDataMap,
    gameObjectMap: newGameObjectMap,
    /* newIndicesCountCacheMap ,
       newVerticesCountCacheMap, */
    isInitMap: newIsInitMap,
    groupCountMap: newGroupCountMap,
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
  }
);

let reAllocate = (vboBufferRecord, {disposedIndexMap, aliveIndexArray} as boxGeometryRecord) => {
  let newAliveIndexArray =
    aliveIndexArray
    |> Js.Array.filter(
         (aliveIndex) => ! ReallocateCPUMemoryService.isDisposed(aliveIndex, disposedIndexMap)
       );
  _allocateNewData(newAliveIndexArray, vboBufferRecord, boxGeometryRecord)
  |> _setNewDataToState(newAliveIndexArray, vboBufferRecord, boxGeometryRecord)
};