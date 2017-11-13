open CameraControllerType;

let addToDirtyArray = (cameraController: cameraController, {dirtyArray}) =>
  Js.Array.push(cameraController, dirtyArray);

let cleanDirtyArray = (cameraControllerData: cameraControllerData) => {
  cameraControllerData.dirtyArray = WonderCommonlib.ArraySystem.createEmpty();
  cameraControllerData
};

/* 
let isDirty = (cameraController: cameraController, cameraControllerData: cameraControllerData) =>
  switch (cameraControllerData.dirtyMap |> WonderCommonlib.HashMapSystem.get(Js.Int.toString(cameraController))) {
  | None => false
  | Some(dirty) => dirty == true
  };

let updateDirtyMap = (cameraControllerData: cameraControllerData, dirtyArray: array(int)) => {
  cameraControllerData.dirtyMap = DirtyUtils.convertDirtyArrayToDirtyMap(dirtyArray);
  dirtyArray
};

let cleanDirtyMap = (cameraControllerData: cameraControllerData) => {
  cameraControllerData.dirtyMap = WonderCommonlib.HashMapSystem.createEmpty();
  ()
}; */
