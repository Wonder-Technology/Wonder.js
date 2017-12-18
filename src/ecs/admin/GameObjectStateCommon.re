open GameObjectType;

let getGameObjectData = (state: StateDataType.state) => state.gameObjectData;

let deepCopyState = (state: StateDataType.state) => {
  let {
    uid,
    disposeCount,
    disposedUidMap,
    aliveUidArray,
    transformMap,
    cameraControllerMap,
    geometryMap,
    meshRendererMap,
    materialMap,
    sourceInstanceMap,
    objectInstanceMap
  } =
    state |> getGameObjectData;
  {
    ...state,
    gameObjectData: {
      uid,
      disposeCount,
      disposedUidMap: disposedUidMap |> SparseMapSystem.copy,
      aliveUidArray: aliveUidArray |> SparseMapSystem.copy,
      transformMap: transformMap |> SparseMapSystem.copy,
      cameraControllerMap: cameraControllerMap |> SparseMapSystem.copy,
      geometryMap: geometryMap |> SparseMapSystem.copy,
      meshRendererMap: meshRendererMap |> SparseMapSystem.copy,
      materialMap: materialMap |> SparseMapSystem.copy,
      sourceInstanceMap: sourceInstanceMap |> SparseMapSystem.copy,
      objectInstanceMap: objectInstanceMap |> SparseMapSystem.copy
    }
  }
};