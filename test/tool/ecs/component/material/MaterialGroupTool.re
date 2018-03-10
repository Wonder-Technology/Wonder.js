let createGameObjectWithSharedMaterial = (material, state) => {
  let (state, gameObject) = state |> GameObjectAPI.createGameObject;
  let state = state |> GameObject.addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material)
};