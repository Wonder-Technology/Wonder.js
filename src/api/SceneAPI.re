open StateDataType;

let getCurrentCameraGameObject = (state) =>
  SceneCameraService.getCurrentCameraGameObject(state.basicCameraViewRecord, state.sceneRecord);

let setCurrentCameraGameObject = (uid, state) => {
  ...state,
  sceneRecord: SceneCameraService.setCurrentCameraGameObject(uid, state.sceneRecord)
};