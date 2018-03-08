open SceneType;

let getCurrentCameraGameObject = (basicCameraViewRecord, {currentCameraGameObject}) =>
  switch currentCameraGameObject {
  | None => BasicCameraViewGameObjectService.findFirstGameObject(basicCameraViewRecord)
  | Some(currentCameraGameObject) => Some(currentCameraGameObject)
  };

let setCurrentCameraGameObject = (uid, {currentCameraGameObject} as record) => {
  ...record,
  currentCameraGameObject: Some(uid)
};