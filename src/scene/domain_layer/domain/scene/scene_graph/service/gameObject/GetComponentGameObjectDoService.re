let getTransform = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getTransform(
    gameObject->GameObjectEntity.value,
  )
  ->Result.fromNullable;
