let create = () => {
  let uid = GameObjectRepoAt.getMaxUID();

  GameObjectRepoAt.setMaxUID(uid |> succ);

  let gameObject = uid->GameObjectEntity.create;

  CreateTransformDoService.create()
  ->Result.mapSuccess(transform => {
      AddComponentGameObjectDoService.addTransform(gameObject, transform);

      gameObject;
    });
};
