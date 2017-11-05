open CameraControllerType;

let addToDirtyList = (cameraController: cameraController, {dirtyList}) =>
  Js.Array.push(cameraController, dirtyList);

let clearDirtyList = (cameraControllerData: cameraControllerData) => {
  cameraControllerData.dirtyList = ArraySystem.createEmpty();
  cameraControllerData
};
