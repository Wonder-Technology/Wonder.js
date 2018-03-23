open CustomGeometryType;

open CustomGeometryAPI;

let getRecord = (state) => RecordCustomGeometryMainService.getRecord(state);

let createGameObject = (state: MainStateDataType.state) => {
  let (state, geometry) = createCustomGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state = state |> GameObjectAPI.addGameObjectCustomGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry)
};