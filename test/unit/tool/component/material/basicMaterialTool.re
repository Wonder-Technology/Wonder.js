open BasicMaterial;

let createGameObject = (state) => {
  open GameObject;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let initMaterials = BasicMaterialSystem.init;