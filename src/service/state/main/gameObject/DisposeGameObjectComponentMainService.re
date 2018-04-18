open StateDataMainType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open BatchGetComponentGameObjectMainService;

let _dispose = (uid, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(component, state)
  | None => state
  };

let _disposeWithUid = (uid, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, state)
  | None => state
  };

let _disposeWithData =
    (uid, data, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(component, data, state)
  | None => state
  };

let _disposeWithUidAndData =
    (uid, data, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, data, state)
  | None => state
  };

let _disposeSourceInstanceComponent = (uid, batchDisposeFunc, state) =>
  switch (
    [@bs] GetComponentGameObjectService.getSourceInstanceComponent(uid, state.gameObjectRecord)
  ) {
  | Some(component) =>
    [@bs]
    DisposeSourceInstanceMainService.handleDisposeComponent(component, batchDisposeFunc, state)
  | None => state
  };

let _disposeGameObjectGeometryComponent = (uid, {gameObjectRecord} as state) => {
  let boxGeometryType = CurrentComponentDataMapRenderService.getBoxGeometryType();
  let customGeometryType = CurrentComponentDataMapRenderService.getCustomGeometryType();
  switch ([@bs] GetComponentGameObjectService.getGeometryComponentData(uid, gameObjectRecord)) {
  | Some((component, type_)) =>
    switch type_ {
    | type_ when type_ === boxGeometryType => [@bs] disposeBoxGeometryComponent(component, state)
    | type_ when type_ === customGeometryType =>
      [@bs] disposeCustomGeometryComponent(component, state)
    }
  | None => state
  }
};

let _disposeGameObjectComponents =
    (uid, batchDisposeFunc, isKeepOrder, {gameObjectRecord} as state) =>
  state
  |> _disposeWithData(
       uid,
       isKeepOrder,
       (
         GetComponentGameObjectService.getTransformComponent,
         DisposeComponentGameObjectMainService.disposeTransformComponent
       )
     )
  |> _disposeGameObjectGeometryComponent(uid)
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBasicCameraViewComponent,
         DisposeComponentGameObjectMainService.disposeBasicCameraViewComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getPerspectiveCameraProjectionComponent,
         DisposeComponentGameObjectMainService.disposePerspectiveCameraProjectionComponent
       )
     )
  |> _disposeWithUid(
       uid,
       (
         GetComponentGameObjectService.getMeshRendererComponent,
         DisposeComponentGameObjectMainService.disposeMeshRendererComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBasicMaterialComponent,
         DisposeComponentGameObjectMainService.disposeBasicMaterialComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getLightMaterialComponent,
         DisposeComponentGameObjectMainService.disposeLightMaterialComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getAmbientLightComponent,
         DisposeComponentGameObjectMainService.disposeAmbientLightComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getDirectionLightComponent,
         DisposeComponentGameObjectMainService.disposeDirectionLightComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getPointLightComponent,
         DisposeComponentGameObjectMainService.disposePointLightComponent
       )
     )
  |> _disposeSourceInstanceComponent(uid, batchDisposeFunc)
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getObjectInstanceComponent,
         DisposeComponentGameObjectMainService.disposeObjectInstanceComponent
       )
     );

let dispose = (uid, batchDisposeFunc, state) =>
  _disposeGameObjectComponents(uid, batchDisposeFunc, false, state);

let disposeKeepOrder = (uid, batchDisposeFunc, state) =>
  _disposeGameObjectComponents(uid, batchDisposeFunc, true, state);

let _batchDisposeGeometryComponent = (uidArray, disposedUidMap, state) => {
  let (boxGeometryArr, customGeometryArr) =
    state |> BatchGetComponentGameObjectMainService.batchGetGeometryComponentData(uidArray);
  let state =
    boxGeometryArr |> DisposeComponentGameObjectMainService.batchDisposeBoxGeometryComponent(state);
  customGeometryArr
  |> DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(state)
};

let batchDispose =
    (uidArray: array(int), disposedUidMap, batchDisposeFunc, {gameObjectRecord} as state) => {
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetTransformComponent(uidArray)
    |> batchDisposeTransformComponent(state);
  let state = state |> _batchDisposeGeometryComponent(uidArray, disposedUidMap);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetBasicCameraViewComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetPerspectiveCameraProjectionComponent(
         uidArray
       )
    |> DisposeComponentGameObjectMainService.batchDisposePerspectiveCameraProjectionComponent(
         state
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetMeshRendererComponent(uidArray)
    |> batchDisposeMeshRendererComponent(disposedUidMap, state);
  /* let state =
       state
       |> BatchGetComponentGameObjectMainService.batchGetBoxGeometryComponent(uidArray)
       |> DisposeComponentGameObjectMainService.batchDisposeBoxGeometryComponent(
            disposedUidMap,
            state
          );
     let state =
       state
       |> BatchGetComponentGameObjectMainService.batchGetCustomGeometryComponent(uidArray)
       |> DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(
            disposedUidMap,
            state
          ); */
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetBasicMaterialComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetLightMaterialComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetAmbientLightComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeAmbientLightComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetDirectionLightComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeDirectionLightComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetPointLightComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposePointLightComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetSourceInstanceComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
         state,
         batchDisposeFunc
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetObjectInstanceComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(state);
  state
};