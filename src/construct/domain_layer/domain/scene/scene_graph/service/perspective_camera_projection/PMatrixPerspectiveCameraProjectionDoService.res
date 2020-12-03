let getPMatrix = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getPMatrix(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )->ProjectionMatrixVO.create
