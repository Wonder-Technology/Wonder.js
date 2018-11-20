open StateDataMainType;

let create = ({gameObjectRecord} as state) => {
  let (gameObjectRecord, uid) =
    CreateGameObjectGameObjectService.create(gameObjectRecord);

  gameObjectRecord.isAliveUidArrayDirtyForDeepCopy = true;
  state.gameObjectRecord = gameObjectRecord;

  let (state, transform) = CreateTransformMainService.create(. state);
  (
    AddComponentGameObjectMainService.addTransformComponent(
      uid,
      transform,
      state,
    ),
    uid,
  );
};