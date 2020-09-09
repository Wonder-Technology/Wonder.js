let create = () => {
  let index = IndexPBRMaterialDoService.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  IndexPBRMaterialDoService.setMaxIndex(newIndex);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getPBRMaterialCount(),
    )
  ->Result.mapSuccess(PBRMaterialEntity.create);
};
