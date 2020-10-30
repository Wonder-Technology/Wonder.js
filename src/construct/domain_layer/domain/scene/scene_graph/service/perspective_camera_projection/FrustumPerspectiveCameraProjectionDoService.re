let getFovy = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getFovy(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->FovyVO.create;

let getAspect = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getAspect(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->AspectVO.create;

let getNear = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getNear(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->NearVO.create;

let getFar = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getFar(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->FarVO.create;
