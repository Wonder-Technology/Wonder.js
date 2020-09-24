let getFovy = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getFovy(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->OptionSt.map(FovyVO.create);

let setFovy = (cameraProjection, fovy) => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setFovy(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
    fovy->FovyVO.value,
  );

  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().markDirty(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  );
};

let getAspect = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getAspect(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->OptionSt.map(AspectVO.create);

let setAspect = (cameraProjection, aspect) => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setAspect(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
    aspect->AspectVO.value,
  );

  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().markDirty(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  );
};

let getNear = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getNear(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->OptionSt.map(NearVO.create);

let setNear = (cameraProjection, near) => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setNear(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
    near->NearVO.value,
  );

  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().markDirty(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  );
};

let getFar = cameraProjection =>
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getFar(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  )
  ->OptionSt.map(FarVO.create);

let setFar = (cameraProjection, far) => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setFar(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
    far->FarVO.value,
  );

  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().markDirty(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  );
};

let computeAspect = ((width, height)) => {
  Number.dividInt(width, height)->AspectVO.create;
};
