let getMaxUID = () => {
  CPRepo.getGameObject().maxUID;
};

let createGameObject = () => {
  let gameObject = GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

  (gameObject, GameObjectRunAPI.getTransform(gameObject)->OptionSt.getExn);
};
