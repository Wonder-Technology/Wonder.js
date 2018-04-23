open StateDataMainType;

let createGameObject = (state) => {
  open GameObjectAPI;
  open PointLightAPI;
  let (state, light) = createPointLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectPointLightComponent(gameObject, light);
  (state, gameObject, light)
};

let getRecord = (state) => state.pointLightRecord;

let isAlive = (light, state) => DisposePointLightService.isAlive(light, state.pointLightRecord);

let getColor = (light, state) => OperatePointLightService.getColor(light, state.pointLightRecord);

let getIntensity = (light, state) =>
  OperatePointLightService.getIntensity(light, state.pointLightRecord);

let getConstant = (light, state) =>
  OperatePointLightService.getConstant(light, state.pointLightRecord);

let getLinear = (light, state) =>
  OperatePointLightService.getLinear(light, state.pointLightRecord);

let getQuadratic = (light, state) =>
  OperatePointLightService.getQuadratic(light, state.pointLightRecord);

let getRange = (light, state) => OperatePointLightService.getRange(light, state.pointLightRecord);

let getDefaultColor = RecordPointLightMainService.getDefaultColor;

let getDefaultIntensity = RecordPointLightMainService.getDefaultIntensity;

let getDefaultConstant = RecordPointLightMainService.getDefaultConstant;

let getDefaultLinear = RecordPointLightMainService.getDefaultLinear;

let getDefaultQuadratic = RecordPointLightMainService.getDefaultQuadratic;

let getDefaultRange = RecordPointLightMainService.getDefaultRange;

let getMappedIndex = (index, state) =>
  state |> IndexPointLightService.getMappedIndexMap |> MappedIndexService.getMappedIndex(index);

let getLightCount = (state) =>
  CountInitLightMaterialPointLightService.getLightCount(
    InitLightMaterialStateTool.createStateWithoutMaterialData(state).pointLightRecord
  );