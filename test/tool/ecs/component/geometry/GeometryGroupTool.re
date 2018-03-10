let createGameObjectWithSharedGeometry = (geometry, state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state = state |> GameObject.addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry)
};