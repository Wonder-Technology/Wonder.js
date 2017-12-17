open StateDataType;

open GeometryGetStateDataCommon;

let deepCopyState = (state: StateDataType.state) => {
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
        verticesMap: verticesMap |> CopyStateUtils.deepCopyFloat32ArrayArray,
        indicesMap: indicesMap |> CopyStateUtils.deepCopyUint16ArrayArray,
        computeDataFuncMap: computeDataFuncMap |> SparseMapSystem.copy,
        configDataMap: configDataMap |> SparseMapSystem.copy,
        isInitMap: isInitMap |> SparseMapSystem.copy,
        groupCountMap: groupCountMap |> SparseMapSystem.copy,
        gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};

let restoreFromState =
    (currentState, {float32ArrayPoolMap, uint16ArrayPoolMap} as sharedData, targetState) => {
  let {verticesMap, indicesMap} = getGeometryData(currentState);
  let (float32ArrayPoolMap, uint16ArrayPoolMap) =
    GeometryTypeArrayPoolCommon.addAllTypeArrayToPool(
      verticesMap,
      indicesMap,
      float32ArrayPoolMap,
      uint16ArrayPoolMap
    );
  (targetState, {...sharedData, float32ArrayPoolMap, uint16ArrayPoolMap})
};