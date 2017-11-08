open CameraControllerType;

open CameraControllerDirtySystem;

open Contract;

open CameraControllerStateUtils;

let create = (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData(state);
  let index = cameraControllerData.index;
  cameraControllerData.index = succ(cameraControllerData.index);
  cameraControllerData.cameraArray |> Js.Array.push(index) |> ignore;
  addToDirtyList(index, cameraControllerData) |> ignore;
  (state, index)
};

let getCurrentCameraController = (state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "should has at least one camera",
          () => {
            let {cameraArray} = getCameraControllerData(state);
            Js.Array.length(cameraArray) > 0
          }
        )
      )
  );
  let {cameraArray} = getCameraControllerData(state);
  Array.unsafe_get(cameraArray, 0)
};

let _clearCache = (cameraControllerData: cameraControllerData) =>
  cameraControllerData.worldToCameraMatrixCacheMap = HashMapSystem.createEmpty();

let _initCameraController = (dirtyIndex: int, cameraControllerData: cameraControllerData) =>
  PerspectiveCameraSystem.init(dirtyIndex, cameraControllerData);

let init = (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData(state);
  let dirtyList = cameraControllerData.dirtyList;
  switch (Js.Array.length(dirtyList)) {
  | 0 => state
  | _ =>
    dirtyList
    |> ArraySystem.removeDuplicateItems
    |> Js.Array.forEach(
         (dirtyIndex) => _initCameraController(dirtyIndex, cameraControllerData) |> ignore
       );
    cameraControllerData |> clearDirtyList |> ignore;
    state
    |> ensureCheck(
         (state) =>
           Contract.Operators.(
             test(
               "should has no cache",
               () =>
                 HashMapSystem.length(getCameraControllerData(state).worldToCameraMatrixCacheMap)
                 == 0
             )
           )
       )
  }
};

let setPerspectiveCamera = (camera: int, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "updateCameraFunc shouldn't already exist",
          () => {
            let cameraControllerData = getCameraControllerData(state);
            cameraControllerData.updateCameraFuncMap
            |> HashMapSystem.get(Js.Int.toString(camera))
            |> assertNotExist
          }
        )
      )
  );
  let cameraControllerData = getCameraControllerData(state);
  cameraControllerData.updateCameraFuncMap
  |> HashMapSystem.set(Js.Int.toString(camera), PerspectiveCameraSystem.update)
  |> ignore;
  state
};

let _updateCamera = (index: int, cameraControllerData: cameraControllerData) => {
  let updateFunc =
    cameraControllerData.updateCameraFuncMap |> HashMapSystem.unsafeGet(Js.Int.toString(index));
  updateFunc(index, cameraControllerData) |> ignore;
  ()
};

let update = (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData(state);
  let dirtyList = cameraControllerData.dirtyList;
  switch (Js.Array.length(dirtyList)) {
  | 0 => state
  | _ =>
    dirtyList
    |> ArraySystem.removeDuplicateItems
    |> Js.Array.forEach((dirtyIndex) => _updateCamera(dirtyIndex, cameraControllerData));
    cameraControllerData |> clearDirtyList |> _clearCache |> ignore;
    state
  }
};

let getGameObject = (cameraController: cameraController, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    cameraController,
    getCameraControllerData(state).gameObjectMap
  );

let _getCameraToWorldMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  switch (getGameObject(cameraController, state)) {
  | None => ExceptionHandlerSystem.throwMessage("cameraController's gameObject should exist")
  | Some(gameObject) =>
    switch (GameObjectSystem.getTransformComponent(gameObject, state)) {
    | None =>
      ExceptionHandlerSystem.throwMessage("cameraController's gameObject's transform should exist")
    | Some(transform) => TransformSystem.getLocalToWorldMatrix(transform, state)
    }
  };

let getWorldToCameraMatrix =
  CacheUtils.memorizeIntState(
    [@bs]
    (
      (cameraController: cameraController, state: StateDataType.state) =>
        _getCameraToWorldMatrix(cameraController, state) |> Matrix4System.invert
    ),
    [@bs]
    ((state: StateDataType.state) => getCameraControllerData(state).worldToCameraMatrixCacheMap)
  );

let getPMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  HashMapSystem.unsafeGet(
    Js.Int.toString(cameraController),
    getCameraControllerData(state).pMatrixMap
  )
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "pMatrix should exist",
             () =>
               HashMapSystem.get(
                 Js.Int.toString(cameraController),
                 getCameraControllerData(state).pMatrixMap
               )
               |> assertExist
           )
         )
     );

let initData = () => {
  index: 0,
  cameraArray: ArraySystem.createEmpty(),
  dirtyList: ArraySystem.createEmpty(),
  worldToCameraMatrixCacheMap: HashMapSystem.createEmpty(),
  pMatrixMap: HashMapSystem.createEmpty(),
  gameObjectMap: HashMapSystem.createEmpty(),
  updateCameraFuncMap: HashMapSystem.createEmpty(),
  perspectiveCameraData: PerspectiveCameraSystem.initData()
};