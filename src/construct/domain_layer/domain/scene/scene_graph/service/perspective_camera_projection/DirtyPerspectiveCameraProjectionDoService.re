let markDirty = cameraProjection => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().markDirty(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  );
};

let markNotDirty = cameraProjection => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().markNotDirty(
    cameraProjection->PerspectiveCameraProjectionEntity.value,
  );
};
