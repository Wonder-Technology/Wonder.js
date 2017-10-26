open StateDataType;

open CameraControllerType;

open CameraControllerDirtySystem;

open Contract;

let _getCameraControllerData (state: StateDataType.state) => state.cameraControllerData;

let create (state: StateDataType.state) => {
  let cameraControllerData = _getCameraControllerData state;
  let index = cameraControllerData.index;
  cameraControllerData.index = succ cameraControllerData.index;
  addToDirtyList index cameraControllerData |> ignore;
  (state, index)
};

let _initCameraController (dirtyIndex: int) (cameraControllerData: cameraControllerData) =>
  PerspectiveCameraSystem.init dirtyIndex cameraControllerData;

let init (state: StateDataType.state) => {
  let cameraControllerData = _getCameraControllerData state;
  let dirtyList = cameraControllerData.dirtyList;
  switch (ArraySystem.length dirtyList) {
  | 0 => state
  | _ =>
    dirtyList
    |> ArraySystem.removeDuplicateItems
    |> ArraySystem.forEach (
         fun dirtyIndex => _initCameraController dirtyIndex cameraControllerData |> ignore
       );
    clearDirtyList cameraControllerData;
    state
  }
};

let setPerspectiveCamera (camera: int) (state: StateDataType.state) => {
  requireCheck (
    fun () =>
      Contract.Operators.(
        test
          "updateCameraFunc shouldn't already exist"
          (
            fun () => {
              let cameraControllerData = _getCameraControllerData state;
              cameraControllerData.updateCameraFuncMap
              |> HashMapSystem.get (Js.Int.toString camera)
              |> assertNotExist
            }
          )
      )
  );
  let cameraControllerData = _getCameraControllerData state;
  cameraControllerData.updateCameraFuncMap
  |> HashMapSystem.set (Js.Int.toString camera) PerspectiveCameraSystem.update
  |> ignore;
  state
};

let _updateCamera (index: int) (cameraControllerData: cameraControllerData) => {
  let updateFunc =
    cameraControllerData.updateCameraFuncMap |> HashMapSystem.unsafeGet (Js.Int.toString index);
  updateFunc index cameraControllerData |> ignore;
  ()
};

let update (state: StateDataType.state) => {
  let cameraControllerData = _getCameraControllerData state;
  let dirtyList = cameraControllerData.dirtyList;
  switch (ArraySystem.length dirtyList) {
  | 0 => state
  | _ =>
    dirtyList
    |> ArraySystem.removeDuplicateItems
    |> ArraySystem.forEach (fun dirtyIndex => _updateCamera dirtyIndex cameraControllerData);
    clearDirtyList cameraControllerData;
    state
  }
};

let initData () => {
  index: 0,
  dirtyList: ArraySystem.createEmpty (),
  worldToCameraMatrixCacheMap: HashMapSystem.createEmpty (),
  gameObjectMap: HashMapSystem.createEmpty (),
  updateCameraFuncMap: HashMapSystem.createEmpty (),
  perspectiveCameraData: PerspectiveCameraSystem.initData ()
};