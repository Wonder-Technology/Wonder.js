let _initDataWhenCreate = index => {
  TransformRepoAt.setChildrenByIndex(index, []);
};

let create = () => {
  let index = TransformRepoAt.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  _initDataWhenCreate(index);

  TransformRepoAt.setIsDirtyByIndex(index, true);

  index
  ->BufferComponentDoService.checkNotExceedMaxCountByIndex(
      DpContainer.unsafeGetPOConfigDp().getTransformCount(),
    )
  ->Result.mapSuccess(TransformEntity.create);
};
