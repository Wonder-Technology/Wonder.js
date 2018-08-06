open GameObjectType;

let _setNewDataToState =
    (
      newAliveUidArray,
      record,
      (
        newNameMap,
        newCurrentGeometryDataMap,
        newTransformMap,
        newMeshRendererMap,
        newBasicCameraViewMap,
        newPerspectiveCameraProjectionMap,
        newArcballCameraControllerMap,
        newBasicMaterialMap,
        newLightMaterialMap,
        newDirectionLightMap,
        newPointLightMap,
        newSourceInstanceMap,
        newObjectInstanceMap,
      ),
    ) => {
  ...record,
  nameMap: newNameMap,
  disposedUidMap: WonderCommonlib.SparseMapService.createEmpty(),
  aliveUidArray: newAliveUidArray,
  geometryMap: newCurrentGeometryDataMap,
  transformMap: newTransformMap,
  meshRendererMap: newMeshRendererMap,
  basicCameraViewMap: newBasicCameraViewMap,
  perspectiveCameraProjectionMap: newPerspectiveCameraProjectionMap,
  arcballCameraControllerMap: newArcballCameraControllerMap,
  basicMaterialMap: newBasicMaterialMap,
  lightMaterialMap: newLightMaterialMap,
  directionLightMap: newDirectionLightMap,
  pointLightMap: newPointLightMap,
  sourceInstanceMap: newSourceInstanceMap,
  objectInstanceMap: newObjectInstanceMap,
};

let _setNewMap = (uid, oldMap, newMap) =>
  switch (oldMap |> WonderCommonlib.SparseMapService.get(uid)) {
  | None => newMap
  | Some(component) =>
    newMap |> WonderCommonlib.SparseMapService.set(uid, component)
  };

let _allocateNewMaps =
    (
      newAliveUidArray,
      {
        nameMap,
        geometryMap,
        transformMap,
        meshRendererMap,
        basicMaterialMap,
        lightMaterialMap,
        directionLightMap,
        pointLightMap,
        basicCameraViewMap,
        perspectiveCameraProjectionMap,
        arcballCameraControllerMap,
        sourceInstanceMap,
        objectInstanceMap,
      } as record,
    ) =>
  newAliveUidArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (
           newNameMap,
           newCurrentGeometryDataMap,
           newTransformMap,
           newMeshRendererMap,
           newBasicCameraViewMap,
           newPerspectiveCameraProjectionMap,
           newArcballCameraControllerMap,
           newBasicMaterialMap,
           newLightMaterialMap,
           newDirectionLightMap,
           newPointLightMap,
           newSourceInstanceMap,
           newObjectInstanceMap,
         ),
         uid,
       ) => (
         _setNewMap(uid, nameMap, newNameMap),
         _setNewMap(uid, geometryMap, newCurrentGeometryDataMap),
         newTransformMap
         |> WonderCommonlib.SparseMapService.set(
              uid,
              transformMap |> WonderCommonlib.SparseMapService.unsafeGet(uid),
            ),
         _setNewMap(uid, meshRendererMap, newMeshRendererMap),
         _setNewMap(uid, basicCameraViewMap, newBasicCameraViewMap),
         _setNewMap(
           uid,
           perspectiveCameraProjectionMap,
           newPerspectiveCameraProjectionMap,
         ),
         _setNewMap(
           uid,
           arcballCameraControllerMap,
           newArcballCameraControllerMap,
         ),
         _setNewMap(uid, basicMaterialMap, newBasicMaterialMap),
         _setNewMap(uid, lightMaterialMap, newLightMaterialMap),
         _setNewMap(uid, directionLightMap, newDirectionLightMap),
         _setNewMap(uid, pointLightMap, newPointLightMap),
         _setNewMap(uid, sourceInstanceMap, newSourceInstanceMap),
         _setNewMap(uid, objectInstanceMap, newObjectInstanceMap),
       ),
       (
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
       ),
     );

let reAllocate = ({aliveUidArray, disposedUidMap} as record) => {
  let newAliveUidArray =
    aliveUidArray
    |> Js.Array.filter(aliveUid =>
         ! ReallocateCPUMemoryService.isDisposed(aliveUid, disposedUidMap)
       );
  record
  |> _allocateNewMaps(newAliveUidArray)
  |> _setNewDataToState(newAliveUidArray, record);
};