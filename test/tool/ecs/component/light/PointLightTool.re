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

let getIntensity = PointLightSystem.getIntensity;

let getConstant = PointLightSystem.getConstant;

let getLinear = PointLightSystem.getLinear;

let getQuadratic = PointLightSystem.getQuadratic;

let getRange = PointLightSystem.getRange;

let getDefaultColor = PointLightHelper.getDefaultColor;

let getDefaultIntensity = PointLightHelper.getDefaultIntensity;

let getDefaultConstant = PointLightHelper.getDefaultConstant;

let getDefaultLinear = PointLightHelper.getDefaultLinear;

let getDefaultQuadratic = PointLightHelper.getDefaultQuadratic;

let getDefaultRange = PointLightHelper.getDefaultRange;

let getMappedIndex = (index, state) =>
  state |> PointLightIndexCommon.getMappedIndexMap |> LightIndexCommon.getMappedIndex(index);

let getLightCount = PointLightAdmin.getLightCount;