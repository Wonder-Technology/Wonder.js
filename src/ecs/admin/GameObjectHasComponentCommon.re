open GameObjectComponentCommon;

let _hasComponent = (uid: int, componentMap) : bool => componentMap |> hasComponent(uid);

let hasSourceInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap);

let hasObjectInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).objectInstanceMap);

let hasGeometryComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).geometryMap);

let hasMeshRendererComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).meshRendererMap);

let hasBasicMaterialComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).basicMaterialMap);

let hasLightMaterialComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).lightMaterialMap);

let hasAmbientLightComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).ambientLightMap);

let hasDirectionLightComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).directionLightMap);

let hasPointLightComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).pointLightMap);