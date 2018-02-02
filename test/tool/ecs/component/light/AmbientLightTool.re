let createGameObject = (state) => {
  open GameObject;
  open AmbientLight;
  let (state, light) = createAmbientLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectAmbientLightComponent(gameObject, light);
  (state, gameObject, light)
};

let getLightData = AmbientLightSystem.getLightData;

let isAlive = AmbientLightSystem.isAlive;

let getColor = AmbientLightSystem.getColor;

let getDefaultColor = AmbientLightHelper.getDefaultColor;

let getMappedIndex = (index, state) =>
  state |> AmbientLightIndexCommon.getMappedIndexMap |> AmbientLightIndexCommon.getMappedIndex(index)