open CameraControllerType;

let addToDirtyArray = (cameraController: cameraController, dirtyArray) =>
  ArraySystem.push(cameraController, dirtyArray);

let clearDirtyArray = (cameraControllerData: cameraControllerData) => {
  ...cameraControllerData,
  dirtyArray: WonderCommonlib.ArraySystem.createEmpty()
};
/*
 let isDirty = (cameraController: cameraController, cameraControllerData: cameraControllerData) =>
   switch (cameraControllerData.dirtyMap |> WonderCommonlib.SparseMapSystem.get((cameraController))) {
   | None => false
   | Some(dirty) => dirty == true
   };

 let updateDirtyMap = (cameraControllerData: cameraControllerData, dirtyArray: array(int)) => {
   cameraControllerData.dirtyMap = DirtySystem.convertDirtyArrayToDirtyMap(dirtyArray);
   dirtyArray
 };

 let clearDirtyMap = (cameraControllerData: cameraControllerData) => {
   cameraControllerData.dirtyMap = WonderCommonlib.SparseMapSystem.createEmpty();
   ()
 }; */