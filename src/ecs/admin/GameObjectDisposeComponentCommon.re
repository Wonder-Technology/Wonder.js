open GameObjectType;

open ComponentType;

open Contract;

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