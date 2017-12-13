let createGameObjectWithSharedMaterial = (material, state) => {
  let (state, gameObject) = state |> GameObject.createGameObject;
  let state = state |> GameObject.addGameObjectMaterialComponent(gameObject, material);
  (state, gameObject, material)
};