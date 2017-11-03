open UidUtils;

open ComponentType;

open StateDataType;

open GameObjectType;

open Contract;

let _getGameObjectData = (state: StateDataType.state) => state.gameObjectData;

let _getComponent = (uid: string, componentMap: HashMapSystem.t(int)) : option(component) =>
  HashMapSystem.get(uid, componentMap);

let _hasComponent = (uid: string, componentMap: HashMapSystem.t(int)) : bool =>
  Js.Option.isSome(_getComponent(uid, componentMap));

let _addComponent = (uid: string, component: component, componentMap: HashMapSystem.t(int)) => {
  requireCheck(
    () =>
      test(
        "this type of component is already exist, shouldn't add again",
        () => _hasComponent(uid, componentMap) |> assertFalse
      )
  );
  HashMapSystem.set(uid, component, componentMap) |> ignore
};

let hasCameraControllerComponent = (uid: string, state: StateDataType.state) : bool =>
  _getGameObjectData(state).cameraControllerMap |> _hasComponent(uid);

let getCameraControllerComponent = (uid: string, state: StateDataType.state) =>
  _getGameObjectData(state).cameraControllerMap |> _getComponent(uid);

let addCameraControllerComponent = (uid: string, component: component, state: StateDataType.state) => {
  _getGameObjectData(state).cameraControllerMap |> _addComponent(uid, component) |> ignore;
  CameraControllerAddComponentUtils.handleAddComponent(component, uid, state)
};

let hasTransformComponent = (uid: string, state: StateDataType.state) : bool =>
  _getGameObjectData(state).transformMap |> _hasComponent(uid);

let getTransformComponent = (uid: string, state: StateDataType.state) =>
  _getGameObjectData(state).transformMap |> _getComponent(uid);

let addTransformComponent = (uid: string, component: component, state: StateDataType.state) => {
  _getGameObjectData(state).transformMap |> _addComponent(uid, component) |> ignore;
  TransformAddComponentUtils.handleAddComponent(component, uid, state)
};

let hasGeometryComponent = (uid: string, state: StateDataType.state) : bool =>
  _getGameObjectData(state).geometryMap |> _hasComponent(uid);

let getGeometryComponent = (uid: string, state: StateDataType.state) =>
  _getGameObjectData(state).geometryMap |> _getComponent(uid);

let addGeometryComponent = (uid: string, component: component, state: StateDataType.state) => {
  _getGameObjectData(state).geometryMap |> _addComponent(uid, component) |> ignore;
  GeometryAddComponentUtils.handleAddComponent(component, uid, state)
};

let create = (state: StateDataType.state) => {
  let gameObjectData = _getGameObjectData(state);
  let newUIdStr = Js.Int.toString(gameObjectData.uid);
  gameObjectData.uid = increase(gameObjectData.uid);
  let (newState, transform) = TransformSystem.create(state);
  (addTransformComponent(newUIdStr, transform, newState), newUIdStr)
};

let initData = () => {
  uid: 0,
  transformMap: HashMapSystem.createEmpty(),
  cameraControllerMap: HashMapSystem.createEmpty(),
  geometryMap: HashMapSystem.createEmpty()
};