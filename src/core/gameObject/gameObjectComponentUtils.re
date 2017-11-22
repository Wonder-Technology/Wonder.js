open GameObjectType;

open ComponentType;

open Contract;

let _getComponent =
    (uid: string, componentMap: WonderCommonlib.HashMapSystem.t(int))
    : option(component) =>
  WonderCommonlib.HashMapSystem.get(uid, componentMap);

let _hasComponent = (uid: string, componentMap: WonderCommonlib.HashMapSystem.t(int)) : bool =>
  Js.Option.isSome(_getComponent(uid, componentMap));

let _addComponent =
    (uid: string, component: component, componentMap: WonderCommonlib.HashMapSystem.t(int)) => {
  requireCheck(
    () =>
      test(
        "this type of component is already exist, shouldn't add again",
        () => _hasComponent(uid, componentMap) |> assertFalse
      )
  );
  WonderCommonlib.HashMapSystem.set(uid, component, componentMap) |> ignore
};

let hasCameraControllerComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap |> _hasComponent(uid);

let getCameraControllerComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap |> _getComponent(uid);

let addCameraControllerComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap
  |> _addComponent(uid, component)
  |> ignore;
  CameraControllerAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeCameraControllerComponent =
    (uid: string, component: component, state: StateDataType.state) =>
  CameraControllerDisposeComponentUtils.handleDisposeComponent(component, uid, state);

let hasTransformComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).transformMap |> _hasComponent(uid);

let getTransformComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).transformMap |> _getComponent(uid);

let addTransformComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).transformMap
  |> _addComponent(uid, component)
  |> ignore;
  TransformAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeTransformComponent = (uid: string, component: component, state: StateDataType.state) =>
  TransformDisposeComponentUtils.handleDisposeComponent(component, uid, state);

let hasGeometryComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).geometryMap |> _hasComponent(uid);

let getGeometryComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).geometryMap |> _getComponent(uid);

let addGeometryComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).geometryMap
  |> _addComponent(uid, component)
  |> ignore;
  GeometryAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeGeometryComponent = (uid: string, component: component, state: StateDataType.state) =>
  GeometryDisposeComponentUtils.handleDisposeComponent(component, uid, state);

let hasMeshRendererComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap |> _hasComponent(uid);

let getMeshRendererComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap |> _getComponent(uid);

let addMeshRendererComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap
  |> _addComponent(uid, component)
  |> ignore;
  MeshRendererAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeMeshRendererComponent = (uid: string, component: component, state: StateDataType.state) =>
  MeshRendererDisposeComponentUtils.handleDisposeComponent(component, uid, state);

let hasMaterialComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).materialMap |> _hasComponent(uid);

let getMaterialComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).materialMap |> _getComponent(uid);

let addMaterialComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).materialMap
  |> _addComponent(uid, component)
  |> ignore;
  MaterialAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeMaterialComponent = (uid: string, component: component, state: StateDataType.state) =>
  MaterialDisposeComponentUtils.handleDisposeComponent(component, uid, state);