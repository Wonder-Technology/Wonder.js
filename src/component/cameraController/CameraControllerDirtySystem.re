open CameraControllerType;

let addToDirtyList = (cameraController: cameraController, {dirtyList}) =>
  Js.Array.push(cameraController, dirtyList);

let cleanDirtyList = (cameraControllerData: cameraControllerData) => {
  cameraControllerData.dirtyList = ArraySystem.createEmpty();
  cameraControllerData
};

/* 
let isDirty = (cameraController: cameraController, cameraControllerData: cameraControllerData) =>
  switch (cameraControllerData.dirtyMap |> HashMapSystem.get(Js.Int.toString(cameraController))) {
  | None => false
  | Some(dirty) => dirty == true
  };

let updateDirtyMap = (cameraControllerData: cameraControllerData, dirtyList: array(int)) => {
  cameraControllerData.dirtyMap = DirtyUtils.convertDirtyListToDirtyMap(dirtyList);
  dirtyList
};

let cleanDirtyMap = (cameraControllerData: cameraControllerData) => {
  cameraControllerData.dirtyMap = HashMapSystem.createEmpty();
  ()
}; */
