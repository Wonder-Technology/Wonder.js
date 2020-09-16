let getGameObject = transform => {
  DpContainer.unsafeGetTransformRepoDp().getGameObject(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(GameObjectEntity.create);
};
