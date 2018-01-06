open StateDataType;

open GeometryGetStateDataCommon;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  let {
    index,
    verticesMap,
    indicesMap,
    configDataMap,
    isInitMap,
    computeDataFuncMap,
    groupCountMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getGeometryData;
  {
    ...state,
    geometryData:
      Some({
        index,
        /*!
        because vertices, indices are read-only data, so need to deep copy
        */
        verticesMap: verticesMap |> SparseMapSystem.copy,
        indicesMap: indicesMap |> SparseMapSystem.copy,
        computeDataFuncMap: computeDataFuncMap |> SparseMapSystem.copy,
        configDataMap: configDataMap |> SparseMapSystem.copy,
        isInitMap: isInitMap |> SparseMapSystem.copy,
        groupCountMap: groupCountMap |> SparseMapSystem.copy,
        gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};

let restore =
    (currentState, {float32ArrayPoolMap, uint16ArrayPoolMap} as sharedData, targetState) => {
  let {verticesMap, indicesMap} = getGeometryData(currentState);
  let (float32ArrayPoolMap, uint16ArrayPoolMap) =
    GeometryTypeArrayPoolCommon.addAllTypeArrayToPool(
MemoryConfigSystem.getMaxTypeArrayPoolSize(targetState),
      verticesMap,
      indicesMap,
      float32ArrayPoolMap,
      uint16ArrayPoolMap
    );
  (targetState, {...sharedData, float32ArrayPoolMap, uint16ArrayPoolMap})
};