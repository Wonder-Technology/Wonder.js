open StateDataMainType;

let getCurrentCameraGameObject = (state) =>
  CameraSceneMainService.getCurrentCameraGameObject(state.basicCameraViewRecord, state.sceneRecord);

let setCurrentCameraGameObject = (uid, state) => {
  ...state,
  sceneRecord: CameraSceneMainService.setCurrentCameraGameObject(uid, state.sceneRecord)
};