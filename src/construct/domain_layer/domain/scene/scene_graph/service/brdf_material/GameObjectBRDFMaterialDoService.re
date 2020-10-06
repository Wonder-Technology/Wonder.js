let getGameObjects = material => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().getGameObjects(
    material->BRDFMaterialEntity.value,
  )
  
  ->OptionSt.map(gameObjects =>
      gameObjects->ListSt.map(GameObjectEntity.create)
    );
};
