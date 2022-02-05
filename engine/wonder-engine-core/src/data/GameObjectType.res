@genType
type state

@genType
type gameObject

@genType
type usedGameObjectData = {
  mutable state: state,
  createGameObjectFunc: IGameObjectForJs.createGameObjectFunc<state, gameObject>,
  getAllGameObjectsFunc: IGameObjectForJs.getAllGameObjectsFunc<state, gameObject>,
}

type gameObjectData = IGameObjectForJs.gameObjectData<state, gameObject>
