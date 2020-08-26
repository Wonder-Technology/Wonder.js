let handleAddComponent =
  (. transform, gameObject) => {
    DpContainer.unsafeGetTransformRepoDp().addGameObject(
      transform,
      gameObject,
    );
  };
