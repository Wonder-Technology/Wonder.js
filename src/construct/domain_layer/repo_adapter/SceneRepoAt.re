let setSceneGameObject = gameObject => {
  DpContainer.unsafeGetSceneRepoDp().setSceneGameObject(
    gameObject->GameObjectEntity.value,
  );
};
