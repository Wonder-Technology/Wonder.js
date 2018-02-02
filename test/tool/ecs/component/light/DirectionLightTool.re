let createGameObject = (state) => {
  open GameObject;
  open DirectionLight;
  let (state, light) = createDirectionLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectDirectionLightComponent(gameObject, light);
  (state, gameObject, light)
};

let getLightData = DirectionLightSystem.getLightData;

let isAlive = DirectionLightSystem.isAlive;

let getColor = DirectionLightSystem.getColor;

let getDefaultColor = DirectionLightHelper.getDefaultColor;

let getMappedIndex = (index, state) =>
  state |> DirectionLightIndexCommon.getMappedIndexMap |> LightIndexCommon.getMappedIndex(index);