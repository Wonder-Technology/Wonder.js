open StateDataMainType;

let createGameObject = (state) => {
  open GameObjectAPI;
  open DirectionLightAPI;
  let (state, light) = createDirectionLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectDirectionLightComponent(gameObject, light);
  (state, gameObject, light)
};

let getLightRecord = (state) => state.directionLightRecord;

let isAlive = (light, state) =>
  DisposeDirectionLightService.isAlive(light, state.directionLightRecord);

let getColor = (light, state) =>
  OperateDirectionLightService.getColor(light, state.directionLightRecord);

let getIntensity = (light, state) =>
  OperateDirectionLightService.getIntensity(light, state.directionLightRecord);

let getDefaultColor = RecordDirectionLightMainService.getDefaultColor;

let getDefaultIntensity = RecordDirectionLightMainService.getDefaultIntensity;

let getMappedIndex = (index, state) =>
  state |> IndexDirectionLightService.getMappedIndexMap |> MappedIndexService.getMappedIndex(index);

let getLightCount = (state) =>
  CountInitMaterialDirectionLightService.getLightCount(
    InitMaterialStateTool.createStateWithoutMaterialData(state).directionLightRecord
  );