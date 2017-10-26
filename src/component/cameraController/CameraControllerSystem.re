open CameraControllerType;

open CameraControllerDirtySystem;

open Contract;

open CameraControllerStateUtils;

let create (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData state;
  let index = cameraControllerData.index;
  cameraControllerData.index = succ cameraControllerData.index;
  addToDirtyList index cameraControllerData |> ignore;
  (state, index)
};

let _clearCache (cameraControllerData: cameraControllerData) =>
  cameraControllerData.worldToCameraMatrixCacheMap = HashMapSystem.createEmpty ();

let _initCameraController (dirtyIndex: int) (cameraControllerData: cameraControllerData) =>
  PerspectiveCameraSystem.init dirtyIndex cameraControllerData;

let init (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData state;
  let dirtyList = cameraControllerData.dirtyList;
  switch (ArraySystem.length dirtyList) {
  | 0 => state
  | _ =>
    dirtyList
    |> ArraySystem.removeDuplicateItems
    |> ArraySystem.forEach (
         fun dirtyIndex => _initCameraController dirtyIndex cameraControllerData |> ignore
       );
    cameraControllerData |> clearDirtyList |> _clearCache;
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
              let cameraControllerData = getCameraControllerData state;
              cameraControllerData.updateCameraFuncMap
              |> HashMapSystem.get (Js.Int.toString camera)
              |> assertNotExist
            }
          )
      )
  );
  let cameraControllerData = getCameraControllerData state;
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
  let cameraControllerData = getCameraControllerData state;
  let dirtyList = cameraControllerData.dirtyList;
  switch (ArraySystem.length dirtyList) {
  | 0 => state
  | _ =>
    dirtyList
    |> ArraySystem.removeDuplicateItems
    |> ArraySystem.forEach (fun dirtyIndex => _updateCamera dirtyIndex cameraControllerData);
    cameraControllerData |> clearDirtyList |> _clearCache;
    state
  }
};

let getGameObject (cameraController: cameraController) (state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject
    cameraController (getCameraControllerData state).gameObjectMap;

let _getCameraToWorldMatrix (cameraController: cameraController) (state: StateDataType.state) =>
  switch (getGameObject cameraController state) {
  | None => ExceptionHandlerSystem.throwMessage "cameraController's gameObject should exist"
  | Some gameObject =>
    switch (GameObjectSystem.getTransformComponent gameObject state) {
    | None =>
      ExceptionHandlerSystem.throwMessage "cameraController's gameObject's transform should exist"
    | Some transform => TransformSystem.getLocalToWorldMatrix transform state
    }
  };

let getWorldToCameraMatrix =
  CacheUtils.memorizeIntState
    (
      (
        fun (cameraController: cameraController) (state: StateDataType.state) =>
          _getCameraToWorldMatrix cameraController state |> Matrix4System.invert
      )
      [@bs]
    )
    (
      (
        fun (state: StateDataType.state) =>
          (getCameraControllerData state).worldToCameraMatrixCacheMap
      )
      [@bs]
    );

let initData () => {
  index: 0,
  dirtyList: ArraySystem.createEmpty (),
  worldToCameraMatrixCacheMap: HashMapSystem.createEmpty (),
  gameObjectMap: HashMapSystem.createEmpty (),
  updateCameraFuncMap: HashMapSystem.createEmpty (),
  perspectiveCameraData: PerspectiveCameraSystem.initData ()
};