let getSceneGameObject = () => {
  DpContainer.unsafeGetSceneRepoDp().getSceneGameObject()
  ->OptionSt.fromNullable
  ->OptionSt.map(GameObjectEntity.create);
};

let setSceneGameObject = gameObject => {
  DpContainer.unsafeGetSceneRepoDp().setSceneGameObject(
    gameObject->GameObjectEntity.value,
  );
};
