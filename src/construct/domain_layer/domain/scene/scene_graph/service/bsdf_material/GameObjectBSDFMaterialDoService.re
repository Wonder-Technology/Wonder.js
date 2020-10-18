let getGameObjects = material => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().getGameObjects(
    material->BSDFMaterialEntity.value,
  )
  
  ->OptionSt.map(gameObjects =>
      gameObjects->ListSt.map(GameObjectEntity.create)
    );
};
