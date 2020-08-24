let setSceneGameObject = gameObject => {
  Repo.setScene({
    ...Repo.getScene(),
    sceneGameObject: GameObjectEntity.value(gameObject)->Some,
  });
};
