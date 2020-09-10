let getGameObject = cameraProjection => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getGameObject(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(GameObjectEntity.create);
};
