let getGameObject = cameraProjection => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getGameObject(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  
  ->OptionSt.map(GameObjectEntity.create);
};
