let getTransform = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getTransform(
    gameObject->GameObjectEntity.value,
  )
  ->OptionSt.map(TransformEntity.create);
