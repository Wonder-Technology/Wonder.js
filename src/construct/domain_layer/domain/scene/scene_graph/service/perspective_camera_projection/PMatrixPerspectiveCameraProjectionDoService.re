let getPMatrix = cameraProjection => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getPMatrix(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->OptionSt.map(PerspectiveMatrixVO.create);
};

let setPMatrix = (cameraProjection, pMatrix) => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setPMatrix(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
    pMatrix->PerspectiveMatrixVO.value,
  );
};
