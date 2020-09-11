let _initDataWhenCreate = index => {
  DpContainer.unsafeGetTransformRepoDp().setChildren(index, []);
};

let create = () => {
  let index = IndexTransformDoService.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  IndexTransformDoService.setMaxIndex(newIndex);

  _initDataWhenCreate(index);

  DpContainer.unsafeGetTransformRepoDp().setIsDirty(index, true);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getTransformCount(),
    )
  ->Result.mapSuccess(TransformEntity.create);
};
