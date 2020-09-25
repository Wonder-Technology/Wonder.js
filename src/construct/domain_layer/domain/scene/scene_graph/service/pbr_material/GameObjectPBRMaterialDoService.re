let getGameObjects = material => {
  DpContainer.unsafeGetPBRMaterialRepoDp().getGameObjects(
    material->PBRMaterialEntity.value,
  )
  
  ->OptionSt.map(gameObjects =>
      gameObjects->ListSt.map(GameObjectEntity.create)
    );
};
