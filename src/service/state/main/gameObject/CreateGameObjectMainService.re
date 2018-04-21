open StateDataMainType;

let create = ({gameObjectRecord} as state) => {
  let (gameObjectRecord, uid) = CreateGameObjectGameObjectService.create(gameObjectRecord);
  state.gameObjectRecord = gameObjectRecord;
  let (state, transform) = CreateTransformMainService.create(state);
  (AddGameObjectComponentMainService.addTransformComponent(uid, transform, state), uid)
};