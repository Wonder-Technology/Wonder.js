let getTransform = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getTransform(
    gameObject->GameObjectEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(TransformEntity.create);
