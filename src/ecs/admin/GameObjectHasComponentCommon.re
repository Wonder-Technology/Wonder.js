open GameObjectComponentCommon;

let _hasComponent = (uid: int, componentMap) : bool => componentMap |> hasComponent(uid);

let hasSourceInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, state.gameObjectRecord.sourceInstanceMap);

let hasObjectInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, state.gameObjectRecord.objectInstanceMap);

let hasMeshRendererComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, state.gameObjectRecord.meshRendererMap);

let hasAmbientLightComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, state.gameObjectRecord.ambientLightMap);

let hasDirectionLightComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, state.gameObjectRecord.directionLightMap);

let hasPointLightComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, state.gameObjectRecord.pointLightMap);