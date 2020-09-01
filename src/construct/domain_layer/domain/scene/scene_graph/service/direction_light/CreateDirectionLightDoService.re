let create = () => {
  let index = IndexDirectionLightDoService.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  IndexDirectionLightDoService.setMaxIndex(newIndex);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getDirectionLightCount(),
    )
  ->Result.mapSuccess(DirectionLightEntity.create);
};
