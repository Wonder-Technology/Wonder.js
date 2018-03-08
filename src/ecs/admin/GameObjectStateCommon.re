/* TODO remove */
open GameObjectType;

let getGameObjectData = (state: StateDataType.state) => state.gameObjectRecord;
/* 
let deepCopyStateForRestore = (state: StateDataType.state) => {
  let {
    uid,
    disposeCount,
    disposedUidMap,
    aliveUidArray,
    transformMap,
    basicCameraViewMap,
    perspectivePameraProjectionMap,
    geometryMap,
    meshRendererMap,
    basicMaterialMap,
    lightMaterialMap,
    sourceInstanceMap,
    objectInstanceMap,
    ambientLightMap,
    directionLightMap,
    pointLightMap
  } =
    state |> getGameObjectData;
  {
    ...state,
    gameObjectRecord: {
      uid,
      disposeCount,
      disposedUidMap: disposedUidMap |> SparseMapSystem.copy,
      aliveUidArray: aliveUidArray |> SparseMapSystem.copy,
      transformMap: transformMap |> SparseMapSystem.copy,
      basicCameraViewMap: basicCameraViewMap |> SparseMapSystem.copy,
      perspectivePameraProjectionMap: perspectivePameraProjectionMap |> SparseMapSystem.copy,
      geometryMap: geometryMap |> SparseMapSystem.copy,
      meshRendererMap: meshRendererMap |> SparseMapSystem.copy,
      basicMaterialMap: basicMaterialMap |> SparseMapSystem.copy,
      lightMaterialMap: lightMaterialMap |> SparseMapSystem.copy,
      sourceInstanceMap: sourceInstanceMap |> SparseMapSystem.copy,
      objectInstanceMap: objectInstanceMap |> SparseMapSystem.copy,
      ambientLightMap: ambientLightMap |> SparseMapSystem.copy,
      directionLightMap: directionLightMap |> SparseMapSystem.copy,
      pointLightMap: pointLightMap |> SparseMapSystem.copy
    }
  }
}; */