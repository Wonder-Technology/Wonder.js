let create = () => {
  let index = IndexBRDFMaterialDoService.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  IndexBRDFMaterialDoService.setMaxIndex(newIndex);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getBRDFMaterialCount(),
    )
  ->Result.mapSuccess(BRDFMaterialEntity.create);
};
