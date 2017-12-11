open GameObjectType;

open Contract;

open StateDataType;

let reAllocateGameObject = (state: StateDataType.state) => {
  let {
        aliveUidArray,
        disposedUidMap,
        transformMap,
        meshRendererMap,
        geometryMap,
        materialMap,
        cameraControllerMap
      } as data =
    GameObjectAdminAci.getData(state);
  let newTransformMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newMeshRendererMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newGeometryMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newCameraControllerMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newMaterialMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newAliveUidArray =
    aliveUidArray
    |> Js.Array.filter((aliveUid) => ! MemoryUtils.isDisposed(aliveUid, disposedUidMap));
  newAliveUidArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (uid) => {
           newTransformMap
           |> WonderCommonlib.SparseMapSystem.set(
                uid,
                transformMap |> WonderCommonlib.SparseMapSystem.unsafeGet(uid)
              )
           |> ignore;
           switch (meshRendererMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => ()
           | Some(meshRenderer) =>
             newMeshRendererMap |> WonderCommonlib.SparseMapSystem.set(uid, meshRenderer) |> ignore
           };
           switch (geometryMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => ()
           | Some(geometry) =>
             newGeometryMap |> WonderCommonlib.SparseMapSystem.set(uid, geometry) |> ignore
           };
           switch (materialMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => ()
           | Some(material) =>
             newMaterialMap |> WonderCommonlib.SparseMapSystem.set(uid, material) |> ignore
           };
           switch (cameraControllerMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => ()
           | Some(cameraController) =>
             newCameraControllerMap
             |> WonderCommonlib.SparseMapSystem.set(uid, cameraController)
             |> ignore
           }
         }
       )
     );
  data.disposedUidMap = WonderCommonlib.SparseMapSystem.createEmpty();
  data.aliveUidArray = newAliveUidArray;
  data.transformMap = newTransformMap;
  data.meshRendererMap = newMeshRendererMap;
  data.geometryMap = newGeometryMap;
  data.materialMap = newMaterialMap;
  data.cameraControllerMap = newCameraControllerMap;
  state
};