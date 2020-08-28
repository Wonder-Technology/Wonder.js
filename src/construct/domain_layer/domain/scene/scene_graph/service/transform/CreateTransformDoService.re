let _initDataWhenCreate = index => {
  DpContainer.unsafeGetTransformRepoDp().setChildren(index, []);
};

let create = () => {
  let index = DpContainer.unsafeGetTransformRepoDp().getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  _initDataWhenCreate(index);

  DpContainer.unsafeGetTransformRepoDp().setIsDirty(index, true);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getTransformCount(),
    )
  ->Result.mapSuccess(TransformEntity.create);
};
