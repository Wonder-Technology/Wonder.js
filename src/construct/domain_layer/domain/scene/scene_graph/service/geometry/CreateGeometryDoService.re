let create = () => {
  let index = IndexGeometryDoService.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  IndexGeometryDoService.setMaxIndex(newIndex);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getGeometryCount(),
    )
  ->Result.mapSuccess(GeometryEntity.create);
};
