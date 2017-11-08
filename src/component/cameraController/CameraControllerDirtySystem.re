open CameraControllerType;

let addToDirtyList = (cameraController: cameraController, {dirtyList}) =>
  Js.Array.push(cameraController, dirtyList);

let cleanDirtyList = (cameraControllerData: cameraControllerData) => {
  cameraControllerData.dirtyList = ArraySystem.createEmpty();
  cameraControllerData
};
