let createGameObject = (state) => {
  open GameObject;
  open PointLight;
  let (state, light) = createPointLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectPointLightComponent(gameObject, light);
  (state, gameObject, light)
};

let getLightData = PointLightSystem.getLightData;

let isAlive = PointLightSystem.isAlive;

let getColor = PointLightSystem.getColor;

let getDefaultColor = PointLightHelper.getDefaultColor;

let getMappedIndex = (index, state) =>
  state |> PointLightIndexCommon.getMappedIndexMap |> LightIndexCommon.getMappedIndex(index);