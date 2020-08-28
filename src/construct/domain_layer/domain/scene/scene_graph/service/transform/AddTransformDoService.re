let handleAddComponent =
  (. transform, gameObject) => {
    DpContainer.unsafeGetTransformRepoDp().setGameObject(
      transform,
      gameObject,
    );
  };
