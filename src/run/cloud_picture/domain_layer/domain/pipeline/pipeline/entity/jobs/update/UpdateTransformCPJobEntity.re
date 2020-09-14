let create = () => JobEntity.create("update_transform");

let exec = () => {
  for (i in 0 to TransformRunAPI.getMaxIndex() - 1) {
    TransformRunAPI.mutableUpdate(i->TransformEntity.create);
  };

  Result.succeed()->WonderBsMost.Most.just;
};
