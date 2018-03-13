let createGameObject = (state: StateDataType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  (state, gameObject, GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state))
};

let getGameObjectData = (state: StateDataType.state) => state.gameObjectRecord;

let initGameObject = (gameObject, state: StateDataType.state) =>
  state |> AllMaterialTool.prepareForInit |> GameObjectAPI.initGameObject(gameObject);