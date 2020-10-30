let getActiveCameraView = sceneGameObject =>
  DpContainer.unsafeGetBasicCameraViewRepoDp().getActiveBasicCameraView(
    sceneGameObject->GameObjectEntity.value,
  )
  ->OptionSt.map(BasicCameraViewEntity.create);
