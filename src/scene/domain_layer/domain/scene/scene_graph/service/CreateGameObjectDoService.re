let create = () => {
  let gameObjectRepoDp = DpContainer.unsafeGetGameObjectRepoDp();

  let uid = gameObjectRepoDp.getMaxUID();

  gameObjectRepoDp.setMaxUID(uid |> succ);

  uid->GameObjectEntity.create;
};
