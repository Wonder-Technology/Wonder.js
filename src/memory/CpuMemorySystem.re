open GameObjectType;

let reAllocateGameObject = (state: StateDataType.state) => {
  let {aliveUidArray, disposedUidMap, transformMap, meshRendererMap} as data =
    GameObjectStateUtils.getGameObjectData(state);
  let newTransformMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newMeshRendererMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newAliveUidArray =
    aliveUidArray
    /* todo handle more component */
    |> Js.Array.reduce(
         (newAliveUidArray, aliveUid) =>
           switch (GameObjectDisposeUtils.isDisposed(aliveUid, disposedUidMap)) {
           | false =>
             newAliveUidArray |> Js.Array.push(aliveUid);
             newAliveUidArray
           | true => newAliveUidArray
           },
         [||]
       );
  newAliveUidArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (uid) => {
           newTransformMap
           |> WonderCommonlib.HashMapSystem.set(
                uid,
                transformMap |> WonderCommonlib.HashMapSystem.unsafeGet(uid)
              )
           |> ignore;
           switch (meshRendererMap |> WonderCommonlib.HashMapSystem.get(uid)) {
           | None => ()
           | Some(meshRenderer) =>
             newMeshRendererMap |> WonderCommonlib.HashMapSystem.set(uid, meshRenderer) |> ignore
           }
         }
       )
     );
  data.disposedUidMap = WonderCommonlib.HashMapSystem.createEmpty();
  data.aliveUidArray = newAliveUidArray;
  data.transformMap = newTransformMap;
  data.meshRendererMap = newMeshRendererMap;
  state
};