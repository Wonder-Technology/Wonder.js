let hasTransform = gameObject => {
  DpContainer.unsafeGetGameObjectRepoDp().hasTransform(
    gameObject->GameObjectEntity.value,
  );
};
