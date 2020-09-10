let getGameObjects = material => {
  DpContainer.unsafeGetPBRMaterialRepoDp().getGameObjects(
    material->PBRMaterialEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(gameObjects =>
      gameObjects->ListSt.map(GameObjectEntity.create)
    );
};
