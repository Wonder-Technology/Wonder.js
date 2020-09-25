let getSceneGameObject = gameObject => {
  CPRepo.getScene().sceneGameObject;
};

let setSceneGameObject = gameObject => {
  CPRepo.setScene({...CPRepo.getScene(), sceneGameObject: gameObject->Some});
};
