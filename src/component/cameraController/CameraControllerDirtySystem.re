open CameraControllerType;

let addToDirtyList (cameraController: cameraController) {dirtyList} =>
  ArraySystem.push cameraController dirtyList;

let clearDirtyList (cameraControllerData: cameraControllerData) => {
  cameraControllerData.dirtyList = ArraySystem.createEmpty ();
  cameraControllerData
};