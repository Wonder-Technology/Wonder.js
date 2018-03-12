let createGameObjectWithSharedGeometry = (geometry, state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state = state |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry)
};