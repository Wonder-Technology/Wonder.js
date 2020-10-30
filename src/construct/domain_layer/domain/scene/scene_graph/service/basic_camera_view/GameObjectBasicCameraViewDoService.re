let getGameObject = cameraView => {
  DpContainer.unsafeGetBasicCameraViewRepoDp().getGameObject(
    cameraView->BasicCameraViewEntity.value,
  )
  ->GameObjectEntity.create;
};
