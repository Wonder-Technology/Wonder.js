let create = () => {
  let index = IndexBasicCameraViewDoService.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  IndexBasicCameraViewDoService.setMaxIndex(newIndex);

  index->BasicCameraViewEntity.create;
};
