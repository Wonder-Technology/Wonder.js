let createGameObjectWithSharedMaterial = (material, state) => {
  let (state, gameObject) = state |> GameObjectAPI.createGameObject;
  let state = state |> GameObjectAPI.addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material)
};