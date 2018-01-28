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

let disposeCameraControllerComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      CameraControllerDisposeComponentCommon.handleDisposeComponent(component, state)
  );

let disposeTransformComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      TransformDisposeComponentCommon.handleDisposeComponent(component, state)
  );

let disposeGeometryComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      GeometryDisposeComponentCommon.handleDisposeComponent(component, state)
  );

let disposeMeshRendererComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      MeshRendererDisposeComponentCommon.handleDisposeComponent(component, uid, state)
  );

let disposeBasicMaterialComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      BasicMaterialDisposeComponentCommon.handleDisposeComponent(component, state)
  );

let disposeLightMaterialComponent =
  [@bs]
  (
    (uid: int, component: component, state: StateDataType.state) =>
      LightMaterialDisposeComponentCommon.handleDisposeComponent(component, state)
  );

let _batchDisposeComponent =
    (uidMap, state: StateDataType.state, handleFunc, componentArray: array(component)) =>
  [@bs] handleFunc(componentArray, uidMap, state);

let batchDisposeTransformComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    TransformDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposeMeshRendererComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MeshRendererDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposeBasicMaterialComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    BasicMaterialDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposeLightMaterialComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    LightMaterialDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposeGeometryComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    GeometryDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposeCameraControllerComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    CameraControllerDisposeComponentCommon.handleBatchDisposeComponent,
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

let disposeComponent = (uid, batchDisposeFunc, state) =>
  state
  |> _disposeCommonComponent(uid, (getTransformComponent, disposeTransformComponent))
  |> _disposeCommonComponent(uid, (getMeshRendererComponent, disposeMeshRendererComponent))
  |> _disposeCommonComponent(uid, (getBasicMaterialComponent, disposeBasicMaterialComponent))
  |> _disposeCommonComponent(uid, (getLightMaterialComponent, disposeLightMaterialComponent))
  |> _disposeCommonComponent(uid, (getGeometryComponent, disposeGeometryComponent))
  |> _disposeCommonComponent(
       uid,
       (getCameraControllerComponent, disposeCameraControllerComponent)
     )
  |> _disposeSourceInstanceComponent(uid, batchDisposeFunc)
  |> _disposeCommonComponent(uid, (getObjectInstanceComponent, disposeObjectInstanceComponent));

let batchDisposeCommonComponent =
    (uidArray: array(int), disposedUidMap, batchDisposeFunc, state: StateDataType.state) =>
  state
  |> batchGetMeshRendererComponent(uidArray)
  |> batchDisposeMeshRendererComponent(disposedUidMap, state)
  |> batchGetTransformComponent(uidArray)
  |> batchDisposeTransformComponent(disposedUidMap, state)
  |> batchGetBasicMaterialComponent(uidArray)
  |> batchDisposeBasicMaterialComponent(disposedUidMap, state)
  |> batchGetLightMaterialComponent(uidArray)
  |> batchDisposeLightMaterialComponent(disposedUidMap, state)
  |> batchGetGeometryComponent(uidArray)
  |> batchDisposeGeometryComponent(disposedUidMap, state)
  |> batchGetCameraControllerComponent(uidArray)
  |> batchDisposeCameraControllerComponent(disposedUidMap, state)
  |> batchGetObjectInstanceComponent(uidArray)
  |> batchDisposeObjectInstanceComponent(disposedUidMap, state)
  |> batchGetSourceInstanceComponent(uidArray)
  |> batchDisposeSourceInstanceComponent(disposedUidMap, state, batchDisposeFunc);