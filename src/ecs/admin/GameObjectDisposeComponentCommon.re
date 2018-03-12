open StateDataType;

open GameObjectType;

open ComponentType;

open GameObjectGetComponentCommon;

let disposeSourceInstanceComponent =
  [@bs]
  (
    (uid: int, component: component, batchDisposeGameObjectFunc, state: StateDataType.state) =>
      SourceInstanceDisposeComponentCommon.handleDisposeComponent(
        component,
        batchDisposeGameObjectFunc,
        state
      )
  );

let disposeObjectInstanceComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      ObjectInstanceDisposeComponentCommon.handleDisposeComponent(component, state)
  );

let disposeMeshRendererComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      MeshRendererDisposeComponentCommon.handleDisposeComponent(component, uid, state)
  );

let disposeAmbientLightComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      AmbientLightDisposeComponentCommon.handleDisposeComponent(component, state)
  );

let disposeDirectionLightComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      DirectionLightDisposeComponentCommon.handleDisposeComponent(component, state)
  );

let disposePointLightComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      PointLightDisposeComponentCommon.handleDisposeComponent(component, state)
  );

/* TODO refactor */
let _batchDisposeComponent =
    (uidMap, state: StateDataType.state, handleFunc, componentArray: array(component)) =>
  [@bs] handleFunc(componentArray, uidMap, state);

let batchDisposeMeshRendererComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MeshRendererDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposeSourceInstanceComponent =
    (uidMap, state: StateDataType.state, disposeGameObjectFunc, componentArray: array(component)) =>
  [@bs]
  SourceInstanceDisposeComponentCommon.handleBatchDisposeComponent(
    componentArray,
    uidMap,
    disposeGameObjectFunc,
    state
  );

let batchDisposeObjectInstanceComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  switch (componentArray |> Js.Array.length) {
  | 0 => state
  | _ =>
    _batchDisposeComponent(
      uidMap,
      state,
      ObjectInstanceDisposeComponentCommon.handleBatchDisposeComponent,
      componentArray
    )
  };

let batchDisposeAmbientLightComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    AmbientLightDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposeDirectionLightComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    DirectionLightDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposePointLightComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    PointLightDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

/* TODO refactor */
let _disposeCommonComponent = (uid, (getComponentFunc, disposeComponentFunc), state) =>
  switch ([@bs] getComponentFunc(uid, state)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, state)
  | None => state
  };

let _disposeSourceInstanceComponent = (uid, batchDisposeFunc, state) =>
  switch ([@bs] getSourceInstanceComponent(uid, state)) {
  | Some(component) =>
    [@bs] disposeSourceInstanceComponent(uid, component, batchDisposeFunc, state)
  | None => state
  };

/* TODO refactor: inject all component data instead of state */
let disposeComponent =
    (
      uid,
      batchDisposeFunc,
      /* {basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord} as state */
      state
    ) => {
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
  let state = state |> DisposeGameObjectComponentService.dispose(uid);
  state
  /* |> _disposeCommonComponent(uid, (getTransformComponent, disposeTransformComponent)) */
  |> _disposeCommonComponent(uid, (getMeshRendererComponent, disposeMeshRendererComponent))
  |> _disposeCommonComponent(uid, (getAmbientLightComponent, disposeAmbientLightComponent))
  |> _disposeCommonComponent(uid, (getDirectionLightComponent, disposeDirectionLightComponent))
  |> _disposeCommonComponent(uid, (getPointLightComponent, disposePointLightComponent))
  /* |> _disposeCommonComponent(uid, (getBasicMaterialComponent, disposeBasicMaterialComponent))
     |> _disposeCommonComponent(uid, (getLightMaterialComponent, disposeLightMaterialComponent)) */
  /* |> _disposeCommonComponent(uid, (getBoxGeometryComponent, disposeBoxGeometryComponent)) */
  /* |> _disposeCommonComponent(
       uid,
       (getBasicCameraViewComponent, disposeBasicCameraViewComponent)
     ) */
  |> _disposeSourceInstanceComponent(uid, batchDisposeFunc)
  |> _disposeCommonComponent(uid, (getObjectInstanceComponent, disposeObjectInstanceComponent))
};

let batchDisposeCommonComponent =
    (
      uidArray: array(int),
      disposedUidMap,
      batchDisposeFunc,
      /* {basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord} as state */
      state
    ) => {
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
  let state = state |> DisposeGameObjectComponentService.batchDispose(uidArray, disposedUidMap);
  /* TODO not split? */
  let state =
    state
    |> batchGetMeshRendererComponent(uidArray)
    |> batchDisposeMeshRendererComponent(disposedUidMap, state);
  let state =
    state
    |> batchGetAmbientLightComponent(uidArray)
    |> batchDisposeAmbientLightComponent(disposedUidMap, state)
    |> batchGetDirectionLightComponent(uidArray)
    |> batchDisposeDirectionLightComponent(disposedUidMap, state)
    |> batchGetPointLightComponent(uidArray)
    |> batchDisposePointLightComponent(disposedUidMap, state);
  /* |> batchGetTransformComponent(uidArray)
     |> batchDisposeTransformComponent(disposedUidMap, state); */
  state
  |> batchGetObjectInstanceComponent(uidArray)
  |> batchDisposeObjectInstanceComponent(disposedUidMap, state)
  |> batchGetSourceInstanceComponent(uidArray)
  |> batchDisposeSourceInstanceComponent(disposedUidMap, state, batchDisposeFunc)
};