let handleAddComponent =
  (. cameraProjection, gameObject) => {
    DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setGameObject(
      cameraProjection,
      gameObject,
    );
  };
