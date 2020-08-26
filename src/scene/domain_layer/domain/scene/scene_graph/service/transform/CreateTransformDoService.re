let _initDataWhenCreate = index => {
  DpContainer.unsafeGetTransformRepoDp().setChildren(index, []);
};

let create = () => {
  let transformRepoDp = DpContainer.unsafeGetTransformRepoDp();

  let index = transformRepoDp.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  _initDataWhenCreate(index);

  transformRepoDp.setIsDirty(index, true);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getTransformCount(),
    )
  ->Result.mapSuccess(TransformEntity.create);
};
