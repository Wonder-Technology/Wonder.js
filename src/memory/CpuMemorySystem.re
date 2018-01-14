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
        newCameraControllerMap,
        newMaterialMap,
        newSourceInstanceMap,
        newObjectInstanceMap
      )
    ) => {
  ...state,
  gameObjectData: {
    ...state.gameObjectData,
    disposedUidMap: WonderCommonlib.SparseMapSystem.createEmpty(),
    aliveUidArray: newAliveUidArray,
    transformMap: newTransformMap,
    meshRendererMap: newMeshRendererMap,
    geometryMap: newGeometryMap,
    cameraControllerMap: newCameraControllerMap,
    materialMap: newMaterialMap,
    sourceInstanceMap: newSourceInstanceMap,
    objectInstanceMap: newObjectInstanceMap
  }
};

let _allocateNewMaps = (newAliveUidArray, state) => {
  let {
    transformMap,
    meshRendererMap,
    geometryMap,
    materialMap,
    cameraControllerMap,
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
             newCameraControllerMap,
             newMaterialMap,
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
           switch (meshRendererMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => newMeshRendererMap
           | Some(meshRenderer) =>
             newMeshRendererMap |> WonderCommonlib.SparseMapSystem.set(uid, meshRenderer)
           },
           switch (geometryMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => newGeometryMap
           | Some(geometry) => newGeometryMap |> WonderCommonlib.SparseMapSystem.set(uid, geometry)
           },
           switch (cameraControllerMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => newCameraControllerMap
           | Some(cameraController) =>
             newCameraControllerMap |> WonderCommonlib.SparseMapSystem.set(uid, cameraController)
           },
           switch (materialMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => newMaterialMap
           | Some(material) => newMaterialMap |> WonderCommonlib.SparseMapSystem.set(uid, material)
           },
           switch (sourceInstanceMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => newSourceInstanceMap
           | Some(sourceInstance) =>
             newSourceInstanceMap |> WonderCommonlib.SparseMapSystem.set(uid, sourceInstance)
           },
           switch (objectInstanceMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => newObjectInstanceMap
           | Some(objectInstance) =>
             newObjectInstanceMap |> WonderCommonlib.SparseMapSystem.set(uid, objectInstance)
           }
         )
       ),
       (
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