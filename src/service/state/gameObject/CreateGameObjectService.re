open StateDataType;

let create = ({gameObjectRecord} as state) => {
  /* TODO add gameObjectRecord to state */
  let (gameObjectRecord, uid) = CreateGameObjectGameObjectService.create(gameObjectRecord);
  let (state, transform) = CreateTransformService.create(state);
  (AddGameObjectComponentService.addTransformComponent(uid, transform, state), uid)
};