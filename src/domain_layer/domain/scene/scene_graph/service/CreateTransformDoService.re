let _initDataWhenCreate = index => {
  TransformRepo.setChildrenByIndex(index, []);
};

let create = () => {
  let index = TransformRepo.getMaxIndex();
  let newIndex = index->IndexComponentDoService.generateIndex;

  _initDataWhenCreate(index);

  TransformRepo.setIsDirtyByIndex(index, true);

  BufferSettingDoService.getTransformCount()
  ->Result.bind(transformCount => {
      BufferComponentDoService.checkNotExceedMaxCountByIndex(
        transformCount,
        index,
      )
    });
};
