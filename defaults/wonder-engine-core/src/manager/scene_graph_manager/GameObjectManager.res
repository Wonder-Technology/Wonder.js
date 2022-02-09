let unsafeGetGameObjectData = (po: POType.po): GameObjectType.gameObjectData => {
  po.gameObjectData->WonderCommonlib.OptionSt.unsafeGet
}

let setGameObjectData = (po: POType.po, gameObjectData: GameObjectType.gameObjectData) => {
  ...po,
  gameObjectData: Some(gameObjectData),
}

let createAndSetState = ({gameObjectData} as po: POType.po): POType.po => {
  let {createStateFunc, createGameObjectFunc, getAllGameObjectsFunc} = unsafeGetGameObjectData(po)

  {
    ...po,
    usedGameObjectData: {
      state: createStateFunc(),
      createGameObjectFunc: createGameObjectFunc,
      getAllGameObjectsFunc: getAllGameObjectsFunc,
    }->Some,
  }
}

let _unsafeGetGameObjectRelatedData = (
  {usedGameObjectData}: POType.po,
): GameObjectType.usedGameObjectData => {
  usedGameObjectData->WonderCommonlib.OptionSt.unsafeGet
}

let _setGameObjectStateToPOState = (
  poState: POType.po,
  data: GameObjectType.usedGameObjectData,
  gameObjectState: GameObjectType.state,
): POType.po => {
  data.state = gameObjectState

  poState.usedGameObjectData = data->Some

  poState
}

let createGameObject = (po: POType.po): (POType.po, GameObjectType.gameObject) => {
  let data = po->_unsafeGetGameObjectRelatedData

  let (gameObjectState, gameObject) = data.createGameObjectFunc(. data.state)

  (_setGameObjectStateToPOState(po, data, gameObjectState), gameObject)
}

let getAllGameObjects = (po: POType.po): array<GameObjectType.gameObject> => {
  let data = po->_unsafeGetGameObjectRelatedData

  data.getAllGameObjectsFunc(. data.state)
}
