let handleAddComponent =
  (. cameraView, gameObject) => {
    DpContainer.unsafeGetBasicCameraViewRepoDp().setGameObject(
      cameraView,
      gameObject,
    );
  };
