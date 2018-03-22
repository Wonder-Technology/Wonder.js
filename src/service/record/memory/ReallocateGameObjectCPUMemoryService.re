open GameObjectType;

let _setNewDataToState =
    (
      newAliveUidArray,
      record,
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
  ...record,
  disposedUidMap: WonderCommonlib.SparseMapService.createEmpty(),
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
};

let _setNewMap = (uid, oldMap, newMap) =>
  switch (oldMap |> WonderCommonlib.SparseMapService.get(uid)) {
  | None => newMap
  | Some(component) => newMap |> WonderCommonlib.SparseMapService.set(uid, component)
  };

let _allocateNewMaps =
    (
      newAliveUidArray,
      {
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
      } as record
    ) =>
  newAliveUidArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
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
           |> WonderCommonlib.SparseMapService.set(
                uid,
                transformMap |> WonderCommonlib.SparseMapService.unsafeGet(uid)
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
         WonderCommonlib.SparseMapService.createEmpty()
       )
     );

let reAllocate = ({aliveUidArray, disposedUidMap} as record) => {
  let newAliveUidArray =
    aliveUidArray
    |> Js.Array.filter((aliveUid) => ! ReallocateCPUMemoryService.isDisposed(aliveUid, disposedUidMap));
  record |> _allocateNewMaps(newAliveUidArray) |> _setNewDataToState(newAliveUidArray, record)
};