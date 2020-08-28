let create = () => {
  let uid = DpContainer.unsafeGetGameObjectRepoDp().getMaxUID();

  DpContainer.unsafeGetGameObjectRepoDp().setMaxUID(uid->succ);

  let gameObject = uid->GameObjectEntity.create;

  CreateTransformDoService.create()
  ->Result.mapSuccess(transform => {
      AddComponentGameObjectDoService.addTransform(gameObject, transform);

      gameObject;
    });
};
