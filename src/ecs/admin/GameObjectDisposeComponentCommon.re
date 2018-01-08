open GameObjectType;

open ComponentType;

open Contract;

open GameObjectGetComponentCommon;

let disposeSourceInstanceComponent =
    (uid: int, component: component, batchDisposeGameObjectFunc, state: StateDataType.state) =>
  SourceInstanceDisposeComponentCommon.handleDisposeComponent(
    component,
    batchDisposeGameObjectFunc,
    state
  );

let disposeObjectInstanceComponent = (uid: int, component: component, state: StateDataType.state) =>
  ObjectInstanceDisposeComponentCommon.handleDisposeComponent(component, state);

let disposeCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) =>
  CameraControllerDisposeComponentCommon.handleDisposeComponent(component, state);

let disposeTransformComponent = (uid: int, component: component, state: StateDataType.state) =>
  TransformDisposeComponentCommon.handleDisposeComponent(component, state);

let disposeGeometryComponent = (uid: int, component: component, state: StateDataType.state) =>
  GeometryDisposeComponentCommon.handleDisposeComponent(component, state);

let disposeMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) =>
  MeshRendererDisposeComponentCommon.handleDisposeComponent(component, uid, state);

let disposeMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  MaterialDisposeComponentCommon.handleDisposeComponent(component, state);

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

let batchDisposeMaterialComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MaterialDisposeComponentCommon.handleBatchDisposeComponent,
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

let disposeComponent = (uid, batchDisposeFunc, state) => {
  let state =
    switch (getTransformComponent(uid, state)) {
    | Some(transform) => disposeTransformComponent(uid, transform, state)
    | None => state
    };
  let state =
    switch (getMeshRendererComponent(uid, state)) {
    | Some(meshRenderer) => disposeMeshRendererComponent(uid, meshRenderer, state)
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) => disposeMaterialComponent(uid, material, state)
    | None => state
    };
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) => disposeGeometryComponent(uid, geometry, state)
    | None => state
    };
  let state =
    switch (getCameraControllerComponent(uid, state)) {
    | Some(cameraController) => disposeCameraControllerComponent(uid, cameraController, state)
    | None => state
    };
  let state =
    switch (getSourceInstanceComponent(uid, state)) {
    | Some(sourceInstance) =>
      disposeSourceInstanceComponent(uid, sourceInstance, batchDisposeFunc, state)
    | None => state
    };
  let state =
    switch (getObjectInstanceComponent(uid, state)) {
    | Some(objectInstance) => disposeObjectInstanceComponent(uid, objectInstance, state)
    | None => state
    };
  state
};

let batchDisposeCommonComponent =
    (uidArray: array(int), disposedUidMap, batchDisposeFunc, state: StateDataType.state) =>
  state
  |> batchGetMeshRendererComponent(uidArray)
  |> batchDisposeMeshRendererComponent(disposedUidMap, state)
  |> batchGetTransformComponent(uidArray)
  |> batchDisposeTransformComponent(disposedUidMap, state)
  |> batchGetMaterialComponent(uidArray)
  |> batchDisposeMaterialComponent(disposedUidMap, state)
  |> batchGetGeometryComponent(uidArray)
  |> batchDisposeGeometryComponent(disposedUidMap, state)
  |> batchGetCameraControllerComponent(uidArray)
  |> batchDisposeCameraControllerComponent(disposedUidMap, state)
  |> batchGetObjectInstanceComponent(uidArray)
  |> batchDisposeObjectInstanceComponent(disposedUidMap, state)
  |> batchGetSourceInstanceComponent(uidArray)
  |> batchDisposeSourceInstanceComponent(disposedUidMap, state, batchDisposeFunc);