open StateDataMainType;

let create = ({gameObjectRecord} as state) => {
  let (gameObjectRecord, uid) = CreateGameObjectGameObjectService.create(gameObjectRecord);
  let state = {
    ...state,
    gameObjectRecord
  };
  let (state, transform) = CreateTransformMainService.create(state);
  (AddGameObjectComponentMainService.addTransformComponent(uid, transform, state), uid)
};