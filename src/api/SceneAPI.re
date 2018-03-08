open StateDataType;

let getCurrentCameraGameObject = (basicCameraViewRecord, state) =>
  SceneCameraService.getCurrentCameraGameObject(basicCameraViewRecord, state.sceneRecord);

let setCurrentCameraGameObject = (uid, state) => {
  ...state,
  sceneRecord: SceneCameraService.setCurrentCameraGameObject(uid, state.sceneRecord)
};