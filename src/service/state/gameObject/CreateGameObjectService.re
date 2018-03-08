/* TODO use transform record instead of state
let create = (gameObjectRecord, state) => {
  let (record, uid) = GameObjectCreateService.create(gameObjectRecord);
  /* TODO use Transform service */
  let (state, transform) = TransformSystem.create(state);
  /* TODO use Transform service */
  (GameObjectAddComponentCommon.addTransformComponent(uid, transform, state), uid)
}; */