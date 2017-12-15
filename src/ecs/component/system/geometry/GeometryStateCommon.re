open StateDataType;

let getGeometryData = (state: StateDataType.state) => Js.Option.getExn(state.geometryData);

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
        float32ArrayPoolMap: [||],
        uint16ArrayPoolMap: [||],
        computeDataFuncMap: computeDataFuncMap |> Js.Array.copy,
        configDataMap: configDataMap |> Js.Array.copy,
        isInitMap: isInitMap |> Js.Array.copy,
        groupCountMap: groupCountMap |> Js.Array.copy,
        gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};

let restoreFromState = (currentState, targetState) => {
  let {float32ArrayPoolMap, uint16ArrayPoolMap} = getGeometryData(currentState);
  {
    ...targetState,
    geometryData: Some({...getGeometryData(targetState), float32ArrayPoolMap, uint16ArrayPoolMap})
  }
};