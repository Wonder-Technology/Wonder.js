let createGameObjectWithSharedGeometry = (geometry, state) => {
  let (state, gameObject) = GameObject.createGameObject(state);
  let state = state |> GameObject.addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry)
};