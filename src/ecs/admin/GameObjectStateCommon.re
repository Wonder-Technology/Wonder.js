open GameObjectType;

let getGameObjectData = (state: StateDataType.state) => state.gameObjectData;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  let {
    uid,
    disposeCount,
    disposedUidMap,
    aliveUidArray,
    transformMap,
    cameraControllerMap,
    geometryMap,
    meshRendererMap,
    basicMaterialMap,
    lightMaterialMap,
    sourceInstanceMap,
    objectInstanceMap,
    ambientLightMap
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
      basicMaterialMap: basicMaterialMap |> SparseMapSystem.copy,
      lightMaterialMap: lightMaterialMap |> SparseMapSystem.copy,
      sourceInstanceMap: sourceInstanceMap |> SparseMapSystem.copy,
      objectInstanceMap: objectInstanceMap |> SparseMapSystem.copy,
      ambientLightMap: ambientLightMap |> SparseMapSystem.copy
    }
  }
};