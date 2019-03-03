open GameObjectType;

let _setNewDataToState =
    (
      newAliveUidArray,
      record,
      (
        newNameMap,
        newIsRootMap,
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
  isRootMap: newIsRootMap,
  disposedUidMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
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

let _setNewMap = (uid, oldMap, newMap) => {
  let (has, component) = MutableSparseMapService.fastGet(uid, oldMap);

  has ?
    newMap |> WonderCommonlib.MutableSparseMapService.set(uid, component) :
    newMap;
};

let _allocateNewMaps =
    (
      newAliveUidArray,
      {
        nameMap,
        isRootMap,
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
           newIsRootMap,
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
         _setNewMap(uid, isRootMap, newIsRootMap),
         _setNewMap(uid, geometryMap, newCurrentGeometryDataMap),
         newTransformMap
         |> WonderCommonlib.MutableSparseMapService.set(
              uid,
              transformMap
              |> WonderCommonlib.MutableSparseMapService.unsafeGet(uid),
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
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
         WonderCommonlib.MutableSparseMapService.createEmpty(),
       ),
     );

let reAllocate = ({aliveUidArray, disposedUidMap} as record) => {
  let newAliveUidArray =
    aliveUidArray
    |> Js.Array.filter(aliveUid =>
         !ReallocateCPUMemoryService.isDisposed(aliveUid, disposedUidMap)
       );
  record
  |> _allocateNewMaps(newAliveUidArray)
  |> _setNewDataToState(newAliveUidArray, record);
};