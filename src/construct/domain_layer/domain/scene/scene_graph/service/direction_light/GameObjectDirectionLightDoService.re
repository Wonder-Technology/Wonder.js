let getGameObject = light => {
  DpContainer.unsafeGetDirectionLightRepoDp().getGameObject(
    light->DirectionLightEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(GameObjectEntity.create);
};
