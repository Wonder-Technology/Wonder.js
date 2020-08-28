let create = () => JobEntity.create("update_transform");

let exec = () => {
  for (i in 0 to IndexTransformDoService.getMaxIndex() - 1) {
    UpdateTransformDoService.update(i->TransformEntity.create);
  };

  Result.succeed()->WonderBsMost.Most.just;
};
