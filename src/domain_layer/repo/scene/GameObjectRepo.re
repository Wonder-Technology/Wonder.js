open GameObjectPOType;

let createGameObject = () => {
  let {maxUID} as gameObjectPO = Repo.getGameObject();

  Repo.setGameObject({...gameObjectPO, maxUID: maxUID->succ});

  maxUID;
};
