open StateDataMainType;

let getCurrentCameraGameObject = state =>
  CameraSceneMainService.getCurrentCameraGameObject(
    state.basicCameraViewRecord,
    RecordSceneMainService.getRecord(state),
  );

let setCurrentCameraGameObject = (uid, state) => {
  ...state,
  sceneRecord:
    CameraSceneMainService.setCurrentCameraGameObject(
      uid,
      RecordSceneMainService.getRecord(state),
    )
    |. Some,
};

let getAmbientLightColor = state =>
  AmbientLightSceneMainService.getAmbientLightColor(state);

let setAmbientLightColor = (color, state) =>
  AmbientLightSceneMainService.setAmbientLightColor(color, state);

let getSceneGameObject = GameObjectSceneMainService.getSceneGameObject;

let addSceneChild = GameObjectSceneMainService.addChild;

let addSceneChildren = GameObjectSceneMainService.addChildren;