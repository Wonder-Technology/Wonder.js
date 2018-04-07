open StateDataMainType;

let createGameObject = (state) => {
  open GameObjectAPI;
  open PointLightAPI;
  let (state, light) = createPointLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectPointLightComponent(gameObject, light);
  (state, gameObject, light)
};

let getLightRecord = (state) => state.pointLightRecord;

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

let getDefaultColor = RecordPointLightService.getDefaultColor;

let getDefaultIntensity = RecordPointLightService.getDefaultIntensity;

let getDefaultConstant = RecordPointLightService.getDefaultConstant;

let getDefaultLinear = RecordPointLightService.getDefaultLinear;

let getDefaultQuadratic = RecordPointLightService.getDefaultQuadratic;

let getDefaultRange = RecordPointLightService.getDefaultRange;

let getMappedIndex = (index, state) =>
  state |> IndexPointLightService.getMappedIndexMap |> MappedIndexService.getMappedIndex(index);

let getLightCount = (state) =>
  CountInitMaterialPointLightService.getLightCount(
    InitMaterialStateTool.createState(state).pointLightRecord
  );