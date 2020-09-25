let getSceneGameObject = () => {
  DpContainer.unsafeGetSceneRepoDp().getSceneGameObject()
  
  ->OptionSt.map(GameObjectEntity.create);
};

let setSceneGameObject = gameObject => {
  DpContainer.unsafeGetSceneRepoDp().setSceneGameObject(
    gameObject->GameObjectEntity.value,
  );
};
