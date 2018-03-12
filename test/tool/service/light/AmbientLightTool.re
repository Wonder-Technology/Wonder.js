open StateDataType;

let createGameObject = (state) => {
  open GameObjectAPI;
  open AmbientLightAPI;
  let (state, light) = createAmbientLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectAmbientLightComponent(gameObject, light);
  (state, gameObject, light)
};

let getLightData = (state) => state.ambientLightRecord;

let isAlive = (light, state) =>
  DisposeAmbientLightService.isAlive(light, state.ambientLightRecord);

let getColor = (light, state) =>
  OperateAmbientLightService.getColor(light, state.ambientLightRecord);

let getDefaultColor = RecordAmbientLightService.getDefaultColor;

let getMappedIndex = (index, state) =>
  state |> IndexAmbientLightService.getMappedIndexMap |> MappedIndexService.getMappedIndex(index);