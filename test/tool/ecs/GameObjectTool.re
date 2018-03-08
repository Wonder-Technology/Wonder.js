let createGameObject = (state: StateDataType.state) => {
  let (state, gameObject) = GameObject.createGameObject(state);
  (state, gameObject, GameObject.getGameObjectTransformComponent(gameObject, state))
};

let getGameObjectData = (state: StateDataType.state) => state.gameObjectRecord;

let initGameObject = (gameObject, state: StateDataType.state) =>
  state |> AllMaterialTool.prepareForInit |> GameObject.initGameObject(gameObject);