let getGameObject = light => {
  DpContainer.unsafeGetDirectionLightRepoDp().getGameObject(
    light->DirectionLightEntity.value,
  )
  
  ->OptionSt.map(GameObjectEntity.create);
};
