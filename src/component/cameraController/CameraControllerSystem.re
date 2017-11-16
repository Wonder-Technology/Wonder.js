open CameraControllerType;

open CameraControllerDirtySystem;

open Contract;

open CameraControllerStateUtils;

let create = (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData(state);
  let index = cameraControllerData.index;
  cameraControllerData.index = succ(cameraControllerData.index);
  cameraControllerData.cameraArray |> Js.Array.push(index) |> ignore;
  addToDirtyArray(index, cameraControllerData) |> ignore;
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
  WonderCommonlib.ArraySystem.get(0, cameraArray)
};

/* let _clearCache = (cameraControllerData: cameraControllerData) =>
   cameraControllerData.worldToCameraMatrixCacheMap = WonderCommonlib.HashMapSystem.createEmpty(); */
let _initCameraController = (dirtyIndex: int, cameraControllerData: cameraControllerData) =>
  PerspectiveCameraSystem.init(dirtyIndex, cameraControllerData);

let init = (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData(state);
  let dirtyArray = cameraControllerData.dirtyArray;
  switch (Js.Array.length(dirtyArray)) {
  | 0 => state
  | _ =>
    dirtyArray
    |> WonderCommonlib.ArraySystem.removeDuplicateItems
    |> Js.Array.forEach(
         (dirtyIndex) => _initCameraController(dirtyIndex, cameraControllerData) |> ignore
       );
    /* cameraControllerData |> cleanDirtyArray |> ignore; */
    state
  /* |> ensureCheck(
       (state) =>
         Contract.Operators.(
           test(
             "should has no cache",
             () =>
               WonderCommonlib.HashMapSystem.length(getCameraControllerData(state).worldToCameraMatrixCacheMap)
               == 0
           )
         )
     ) */
  }
};

let setPerspectiveCamera = (cameraController: int, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "updateCameraFunc shouldn't already exist",
          () => {
            let cameraControllerData = getCameraControllerData(state);
            cameraControllerData.updateCameraFuncMap
            |> WonderCommonlib.HashMapSystem.get(Js.Int.toString(cameraController))
            |> assertNotExist
          }
        )
      )
  );
  let cameraControllerData = getCameraControllerData(state);
  cameraControllerData.updateCameraFuncMap
  |> WonderCommonlib.HashMapSystem.set(Js.Int.toString(cameraController), PerspectiveCameraSystem.update)
  |> ignore;
  state
};

let _updateCamera = (index: int, cameraControllerData: cameraControllerData) => {
  let updateFunc =
    cameraControllerData.updateCameraFuncMap |> WonderCommonlib.HashMapSystem.unsafeGet(Js.Int.toString(index));
  updateFunc(index, cameraControllerData) |> ignore;
  ()
};

let update = (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData(state);
  let dirtyArray = cameraControllerData.dirtyArray;
  /* switch (Js.Array.length(dirtyArray)) {
     | 0 =>
     CameraControllerDirtySystem.cleanDirtyMap(cameraControllerData) |> ignore;
     state;
     | _ => */
  dirtyArray
  |> WonderCommonlib.ArraySystem.removeDuplicateItems
  /* |> CameraControllerDirtySystem.updateDirtyMap(cameraControllerData) */
  |> Js.Array.forEach((dirtyIndex) => _updateCamera(dirtyIndex, cameraControllerData));
  /* cameraControllerData |> cleanDirtyArray |> _clearCache |> ignore; */
  cameraControllerData |> cleanDirtyArray |> ignore;
  state
  /* } */
};

/* let isDirty = (cameraController: cameraController, state: StateDataType.state) =>
   CameraControllerDirtySystem.isDirty(cameraController, getCameraControllerData(state)); */
let getGameObject = (cameraController: cameraController, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    cameraController,
    getCameraControllerData(state).gameObjectMap
  );

let getTransform = (cameraController: cameraController, state: StateDataType.state) =>
  switch (getGameObject(cameraController, state)) {
  | None => ExceptionHandleSystem.throwMessage("cameraController's gameObject should exist")
  | Some(gameObject) =>
    switch (GameObjectSystem.getTransformComponent(gameObject, state)) {
    | None =>
      ExceptionHandleSystem.throwMessage("cameraController's gameObject's transform should exist")
    | Some(transform) => transform
    }
  };

let _getCameraToWorldMatrixByTransform = (transform, state: StateDataType.state) =>
  TransformSystem.getLocalToWorldMatrix(transform, state);

let _getCameraToWorldMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  _getCameraToWorldMatrixByTransform(getTransform(cameraController, state), state);

/* let getWorldToCameraMatrix =
   CacheUtils.memorizeIntState(
     [@bs]
     (
       (cameraController: cameraController, state: StateDataType.state) =>
         _getCameraToWorldMatrix(cameraController, state) |> Matrix4System.invert
     ),
     [@bs]
     ((state: StateDataType.state) => getCameraControllerData(state).worldToCameraMatrixCacheMap)
   ); */
/* todo test remove cache */
let getWorldToCameraMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  /* CacheUtils.mapDataInCacheType( */
  _getCameraToWorldMatrix(cameraController, state) |> Matrix4System.invert;

let getWorldToCameraMatrixByTransform = (transform, state: StateDataType.state) =>
  /* CacheUtils.mapDataInCacheType( */
  _getCameraToWorldMatrixByTransform(transform, state) |> Matrix4System.invert;

/* [@bs] ((data) => data |> Matrix4System.invert) */
/* ); */
/* switch (_getCameraToWorldMatrix(cameraController, state)) {
   | CacheType.Cache(data) => CacheType.Cache(data |> Matrix4System.invert)
   | CacheType.New(data) => CacheType.New(data |> Matrix4System.invert)
   }; */
let getPMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  WonderCommonlib.HashMapSystem.unsafeGet(
    Js.Int.toString(cameraController),
    getCameraControllerData(state).pMatrixMap
  )
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "pMatrix should exist",
             () =>
               WonderCommonlib.HashMapSystem.get(
                 Js.Int.toString(cameraController),
                 getCameraControllerData(state).pMatrixMap
               )
               |> assertExist
           )
         )
     );

let initData = () => {
  index: 0,
  cameraArray: WonderCommonlib.ArraySystem.createEmpty(),
  dirtyArray: WonderCommonlib.ArraySystem.createEmpty(),
  /* worldToCameraMatrixCacheMap: WonderCommonlib.HashMapSystem.createEmpty(), */
  pMatrixMap: WonderCommonlib.HashMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.HashMapSystem.createEmpty(),
  /* dirtyMap: WonderCommonlib.HashMapSystem.createEmpty(), */
  updateCameraFuncMap: WonderCommonlib.HashMapSystem.createEmpty(),
  perspectiveCameraData: PerspectiveCameraSystem.initData()
};