open StateDataMainType;

let createGameObject = state => {
  open GameObjectAPI;
  open DirectionLightAPI;
  let (state, light) = createDirectionLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state |> addGameObjectDirectionLightComponent(gameObject, light);
  (state, gameObject, light);
};

let getRecord = state => RecordDirectionLightMainService.getRecord(state);

let isAlive = (light, state) =>
  DisposeDirectionLightService.isAlive(
    light,
    RecordDirectionLightMainService.getRecord(state),
  );

let getColor = (light, state) =>
  OperateDirectionLightService.getColor(
    light,
    RecordDirectionLightMainService.getRecord(state),
  );

let getIntensity = (light, state) =>
  OperateDirectionLightService.getIntensity(
    light,
    RecordDirectionLightMainService.getRecord(state),
  );

let getDefaultColor = RecordDirectionLightMainService.getDefaultColor;

let getDefaultIntensity = RecordDirectionLightMainService.getDefaultIntensity;

let getLightCount = state =>
  CountInitLightMaterialDirectionLightService.getLightCount(
    InitLightMaterialStateTool.createStateWithoutMaterialData(state).
      directionLightRecord,
  );

  let getDirection = (light, state) => {
DirectionDirectionLightMainService.getDirection(light, state) |> Vector3Tool.truncate(3)
  };