let create = () => {
  let uid = GameObjectRepo.getMaxUID();

  GameObjectRepo.setMaxUID(uid);

  uid->GameObjectEntity.create;
};
