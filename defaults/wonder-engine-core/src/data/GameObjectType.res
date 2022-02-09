@genType
type state

@genType
type gameObject

@genType
type usedGameObjectData = {
  mutable state: state,
  createGameObjectFunc: WonderEngineCoreType.IGameObjectForJs.createGameObjectFunc<
    state,
    gameObject,
  >,
  getAllGameObjectsFunc: WonderEngineCoreType.IGameObjectForJs.getAllGameObjectsFunc<
    state,
    gameObject,
  >,
}

type gameObjectData = WonderEngineCoreType.IGameObjectForJs.gameObjectData<state, gameObject>
