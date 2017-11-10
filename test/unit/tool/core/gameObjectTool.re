let createGameObject = (state: StateDataType.state) => {
  let (state, gameObject) = GameObject.createGameObject(state);
  (state, gameObject, GameObject.getGameObjectTransformComponent(gameObject, state))
};

let getData = (state: StateDataType.state) => state.gameObjectData;