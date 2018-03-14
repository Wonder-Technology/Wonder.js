let createGameObject = (state: MainStateDataType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  (state, gameObject, GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state))
};

let getGameObjectRecord = (state: MainStateDataType.state) => state.gameObjectRecord;

let initGameObject = (gameObject, state: MainStateDataType.state) =>
  state |> AllMaterialTool.prepareForInit |> GameObjectAPI.initGameObject(gameObject);