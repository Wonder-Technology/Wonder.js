let getPMatrix = cameraProjection => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getPMatrix(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->OptionSt.map(ProjectionMatrixVO.create);
};

let setPMatrix = (cameraProjection, pMatrix) => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setPMatrix(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
    pMatrix->ProjectionMatrixVO.value,
  );
};
