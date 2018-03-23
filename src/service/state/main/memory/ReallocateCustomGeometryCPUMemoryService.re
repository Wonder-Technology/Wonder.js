open GeometryType;

open CustomGeometryType;

open VboBufferType;

let _updateInfoArray = (infoArray, index: int, {startIndex, endIndex}, offset: int) => {
  let increment = endIndex - startIndex;
  let newInfo = PointsGeometryMainService.buildInfo(offset, offset + increment);
  Array.unsafe_set(infoArray, index, newInfo);
  infoArray
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
           let verticesInfo = PointsGeometryMainService.getInfo(verticesInfoArray, index);
           let normalsInfo = PointsGeometryMainService.getInfo(normalsInfoArray, index);
           let indicesInfo = PointsGeometryMainService.getInfo(indicesInfoArray, index);
           (
             succ(newIndex),
             _updateInfoArray(verticesInfoArray, index, verticesInfo, newVerticesOffset),
             _updateInfoArray(normalsInfoArray, index, normalsInfo, newNormalsOffset),
             _updateInfoArray(indicesInfoArray, index, indicesInfo, newIndicesOffset),
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
  _allocateNewData(newAliveIndexArray, customGeometryRecord)
  |> _setNewDataToState(newAliveIndexArray, customGeometryRecord)
};