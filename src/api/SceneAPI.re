open StateDataType;

let getCurrentCameraGameObject = (state) =>
  CameraSceneService.getCurrentCameraGameObject(state.basicCameraViewRecord, state.sceneRecord);

let setCurrentCameraGameObject = (uid, state) => {
  ...state,
  sceneRecord: CameraSceneService.setCurrentCameraGameObject(uid, state.sceneRecord)
};