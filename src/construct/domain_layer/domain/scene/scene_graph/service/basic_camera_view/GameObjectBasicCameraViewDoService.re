let getGameObject = cameraView => {
  DpContainer.unsafeGetBasicCameraViewRepoDp().getGameObject(
    cameraView->BasicCameraViewEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(GameObjectEntity.create);
};
