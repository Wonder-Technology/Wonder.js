let create = () => {
  let gameObjectRepoDp = DpContainer.unsafeGetGameObjectRepoDp();

  let uid = gameObjectRepoDp.getMaxUID();

  gameObjectRepoDp.setMaxUID(uid |> succ);

  let gameObject = uid->GameObjectEntity.create;

  CreateTransformDoService.create()
  ->Result.mapSuccess(transform => {
      AddComponentGameObjectDoService.addTransform(gameObject, transform);

      gameObject;
    });
};
