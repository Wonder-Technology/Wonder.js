open StateDataMainType;

let createGameObject = state => {
  open GameObjectAPI;
  open PointLightAPI;
  let (state, light) = createPointLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectPointLightComponent(gameObject, light);
  (state, gameObject, light);
};

let getRecord = state => RecordPointLightMainService.getRecord(state);

let isAlive = (light, state) =>
  DisposePointLightService.isAlive(
    light,
    RecordPointLightMainService.getRecord(state),
  );

let getColor = (light, state) =>
  OperatePointLightService.getColor(
    light,
    RecordPointLightMainService.getRecord(state),
  );

let getIntensity = (light, state) =>
  OperatePointLightService.getIntensity(
    light,
    RecordPointLightMainService.getRecord(state),
  );

let getConstant = (light, state) =>
  OperatePointLightService.getConstant(
    light,
    RecordPointLightMainService.getRecord(state),
  );

let getLinear = (light, state) =>
  OperatePointLightService.getLinear(
    light,
    RecordPointLightMainService.getRecord(state),
  );

let getQuadratic = (light, state) =>
  OperatePointLightService.getQuadratic(
    light,
    RecordPointLightMainService.getRecord(state),
  );

let getRange = (light, state) =>
  OperatePointLightService.getRange(
    light,
    RecordPointLightMainService.getRecord(state),
  );

let getDefaultColor = RecordPointLightMainService.getDefaultColor;

let getDefaultIntensity = RecordPointLightMainService.getDefaultIntensity;

let getDefaultConstant = RecordPointLightMainService.getDefaultConstant;

let getDefaultLinear = RecordPointLightMainService.getDefaultLinear;

let getDefaultQuadratic = RecordPointLightMainService.getDefaultQuadratic;

let getDefaultRange = RecordPointLightMainService.getDefaultRange;

let getLightCount = state =>
  CountInitLightMaterialPointLightService.getLightCount(
    InitLightMaterialStateTool.createStateWithoutMaterialData(state).
      pointLightRecord,
  );