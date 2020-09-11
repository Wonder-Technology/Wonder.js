let create = () => {
  let index = IndexPerspectiveCameraProjectionDoService.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  IndexPerspectiveCameraProjectionDoService.setMaxIndex(newIndex);

  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().addToDirtyList(
    index,
  );
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setPMatrix(
    index,
    Matrix4.createIdentityMatrix4(),
  );

  index->PerspectiveCameraProjectionEntity.create;
};
