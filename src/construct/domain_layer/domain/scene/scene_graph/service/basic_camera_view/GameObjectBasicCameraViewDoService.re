let getGameObject = cameraView => {
  DpContainer.unsafeGetBasicCameraViewRepoDp().getGameObject(
    cameraView->BasicCameraViewEntity.value,
  )
  
  ->OptionSt.map(GameObjectEntity.create);
};
