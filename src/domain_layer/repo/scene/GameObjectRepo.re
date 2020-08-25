open GameObjectPOType;

let getMaxUID = () => {
  Repo.getGameObject().maxUID;
};

let setMaxUID = maxUID => {
  Repo.setGameObject({...Repo.getGameObject(), maxUID});
};
