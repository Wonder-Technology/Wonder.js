open StateDataType;

open GameObjectType;

open ComponentType;

/* open GameObjectGetComponentCommon; */
/* TODO refactor */
let _batchDisposeComponent =
    (uidMap, state: StateDataType.state, handleFunc, componentArray: array(component)) =>
  [@bs] handleFunc(componentArray, uidMap, state);

/* TODO refactor */
let _disposeCommonComponent = (uid, (getComponentFunc, disposeComponentFunc), state) =>
  switch ([@bs] getComponentFunc(uid, state)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, state)
  | None => state
  };

/* let _disposeSourceInstanceComponent = (uid, batchDisposeFunc, state) =>
   switch ([@bs] getSourceInstanceComponent(uid, state)) {
   | Some(component) =>
     [@bs] disposeSourceInstanceComponent(uid, component, batchDisposeFunc, state)
   | None => state
   }; */
/* TODO refactor: inject all component record instead of state */
let disposeComponent =
    (
      uid,
      batchDisposeFunc,
      /* {basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord} as state */
      state
    ) =>
  /* let (basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord) =
       DisposeGameObjectComponentService.dispose(
         uid,
         (basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord)
       );
     let state = {
       ...state,
       basicCameraViewRecord,
       perspectiveCameraProjectionRecord,
       transformRecord,
       gameObjectRecord
     }; */
  state |> DisposeGameObjectComponentService.dispose(uid, batchDisposeFunc);

let batchDisposeCommonComponent =
    (
      uidArray: array(int),
      disposedUidMap,
      batchDisposeFunc,
      /* {basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord} as state */
      state
    ) =>
  /* let (basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord) =
       DisposeGameObjectComponentService.batchDispose(
         uidArray,
         disposedUidMap,
         (basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord)
       );
     let state = {
       ...state,
       basicCameraViewRecord,
       perspectiveCameraProjectionRecord,
       transformRecord,
       gameObjectRecord
     }; */
  state |> DisposeGameObjectComponentService.batchDispose(uidArray, disposedUidMap, batchDisposeFunc) /* TODO not split? */;
  /* let state =
     state
     |> batchGetMeshRendererComponent(uidArray)
     |> batchDisposeMeshRendererComponent(disposedUidMap, state); */
  /* let state =
     state
     |> batchGetAmbientLightComponent(uidArray)
     |> batchDisposeAmbientLightComponent(disposedUidMap, state)
     |> batchGetDirectionLightComponent(uidArray)
     |> batchDisposeDirectionLightComponent(disposedUidMap, state)
     |> batchGetPointLightComponent(uidArray)
     |> batchDisposePointLightComponent(disposedUidMap, state); */
/* |> batchGetTransformComponent(uidArray)
   |> batchDisposeTransformComponent(disposedUidMap, state); */