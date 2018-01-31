let createAmbientLightGameObject = (state) => {
  open GameObject;
  open AmbientLight;
  let (state, light) = createAmbientLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectAmbientLightComponent(gameObject, light);
  (state, gameObject, light)
};
