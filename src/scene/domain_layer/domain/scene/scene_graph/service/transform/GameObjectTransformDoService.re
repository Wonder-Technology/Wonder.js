let getGameObject = transform => {
  DpContainer.unsafeGetTransformRepoDp().getGameObject(
    transform->TransformEntity.value,
  )
  ->Result.fromNullable;
};
