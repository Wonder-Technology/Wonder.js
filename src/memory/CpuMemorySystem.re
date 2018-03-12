open GameObjectType;

open StateDataType;

let _setNewDataToState =
    (
      newAliveUidArray,
      state,
      (
        newTransformMap,
        newMeshRendererMap,
        newGeometryMap,
        newBasicCameraViewMap,
        newBasicMaterialMap,
        newLightMaterialMap,
        newAmbientLightMap,
        newDirectionLightMap,
        newPointLightMap,
        newSourceInstanceMap,
        newObjectInstanceMap
      )
    ) => {
  ...state,
  gameObjectRecord: {
    ...state.gameObjectRecord,
    disposedUidMap: WonderCommonlib.SparseMapSystem.createEmpty(),
    aliveUidArray: newAliveUidArray,
    transformMap: newTransformMap,
    meshRendererMap: newMeshRendererMap,
    boxGeometryMap: newGeometryMap,
    basicCameraViewMap: newBasicCameraViewMap,
    basicMaterialMap: newBasicMaterialMap,
    lightMaterialMap: newLightMaterialMap,
    ambientLightMap: newAmbientLightMap,
    directionLightMap: newDirectionLightMap,
    pointLightMap: newPointLightMap,
    sourceInstanceMap: newSourceInstanceMap,
    objectInstanceMap: newObjectInstanceMap
  }
};

let _setNewMap = (uid, oldMap, newMap) =>
  switch (oldMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
  | None => newMap
  | Some(component) => newMap |> WonderCommonlib.SparseMapSystem.set(uid, component)
  };

let _allocateNewMaps = (newAliveUidArray, state) => {
  let {
    transformMap,
    meshRendererMap,
    boxGeometryMap,
    basicMaterialMap,
    lightMaterialMap,
    ambientLightMap,
    directionLightMap,
    pointLightMap,
    basicCameraViewMap,
    sourceInstanceMap,
    objectInstanceMap
  } =
    GameObjectAdminAci.getData(state);
  newAliveUidArray
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (
           (
             newTransformMap,
             newMeshRendererMap,
             newGeometryMap,
             newBasicCameraViewMap,
             newBasicMaterialMap,
             newLightMaterialMap,
             newAmbientLightMap,
             newDirectionLightMap,
             newPointLightMap,
             newSourceInstanceMap,
             newObjectInstanceMap
           ),
           uid
         ) => (
           newTransformMap
           |> WonderCommonlib.SparseMapSystem.set(
                uid,
                transformMap |> WonderCommonlib.SparseMapSystem.unsafeGet(uid)
              ),
           _setNewMap(uid, meshRendererMap, newMeshRendererMap),
           _setNewMap(uid, boxGeometryMap, newGeometryMap),
           _setNewMap(uid, basicCameraViewMap, newBasicCameraViewMap),
           _setNewMap(uid, basicMaterialMap, newBasicMaterialMap),
           _setNewMap(uid, lightMaterialMap, newLightMaterialMap),
           _setNewMap(uid, ambientLightMap, newAmbientLightMap),
           _setNewMap(uid, directionLightMap, newDirectionLightMap),
           _setNewMap(uid, pointLightMap, newPointLightMap),
           _setNewMap(uid, sourceInstanceMap, newSourceInstanceMap),
           _setNewMap(uid, objectInstanceMap, newObjectInstanceMap)
         )
       ),
       (
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty(),
         WonderCommonlib.SparseMapSystem.createEmpty()
       )
     )
};

let reAllocateGameObject = (state: StateDataType.state) => {
  let {aliveUidArray, disposedUidMap} as data = GameObjectAdminAci.getData(state);
  let newAliveUidArray =
    aliveUidArray
    |> Js.Array.filter((aliveUid) => ! MemoryUtils.isDisposed(aliveUid, disposedUidMap));
  state |> _allocateNewMaps(newAliveUidArray) |> _setNewDataToState(newAliveUidArray, state)
};