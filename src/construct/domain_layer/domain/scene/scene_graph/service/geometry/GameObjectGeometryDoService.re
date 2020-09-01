let getGameObjects = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getGameObjects(
    geometry->GeometryEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(gameObjects =>
      gameObjects->ListSt.map(GameObjectEntity.create)
    );
};
