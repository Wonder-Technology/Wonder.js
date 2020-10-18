let create = () => {
  let index = IndexBSDFMaterialDoService.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  IndexBSDFMaterialDoService.setMaxIndex(newIndex);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getBSDFMaterialCount(),
    )
  ->Result.mapSuccess(BSDFMaterialEntity.create);
};
