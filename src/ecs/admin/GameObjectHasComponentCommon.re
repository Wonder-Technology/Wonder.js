open GameObjectComponentCommon;

let _hasComponent = (uid: int, componentMap) : bool => componentMap |> hasComponent(uid);

let hasSourceInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, state.gameObjectRecord.sourceInstanceMap);

let hasObjectInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, state.gameObjectRecord.objectInstanceMap);