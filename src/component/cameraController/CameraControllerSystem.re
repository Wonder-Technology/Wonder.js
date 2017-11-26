open ComponentSystem;

open CameraControllerType;

open CameraControllerDirtyUtils;

open Contract;

open CameraControllerStateUtils;

let create = (state: StateDataType.state) => CameraControllerCreateUtils.create(state);

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
   cameraControllerData.worldToCameraMatrixCacheMap = SparseMapSystem.createEmpty(); */
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
               SparseMapSystem.length(getCameraControllerData(state).worldToCameraMatrixCacheMap)
               == 0
           )
         )
     ) */
  }
};

let setPerspectiveCamera = (cameraController: int, state: StateDataType.state) => {
  /* requireCheck(
       () =>
         Contract.Operators.(
           test(
             "updateCameraFunc shouldn't already exist",
             () => {
               let cameraControllerData = getCameraControllerData(state);
               cameraControllerData.updateCameraFuncMap
               |> SparseMapSystem.get((cameraController))
               |> assertNotExist
             }
           )
         )
     ); */
  let cameraControllerData = getCameraControllerData(state);
  cameraControllerData.updateCameraFuncMap
  |> SparseMapSystem.set(cameraController, PerspectiveCameraSystem.update)
  |> ignore;
  state
};

let _updateCamera = (index: int, cameraControllerData: cameraControllerData) => {
  let updateFunc = cameraControllerData.updateCameraFuncMap |> SparseMapSystem.unsafeGet(index);
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
  SparseMapSystem.unsafeGet(cameraController, getCameraControllerData(state).pMatrixMap)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "pMatrix should exist",
             () =>
               SparseMapSystem.get(cameraController, getCameraControllerData(state).pMatrixMap)
               |> assertExist
           )
         )
     );

let isAlive = (cameraController: cameraController, state: StateDataType.state) =>
  CameraControllerDisposeComponentUtils.isAlive(cameraController, state);

let initData = () => {
  index: 0,
  cameraArray: WonderCommonlib.ArraySystem.createEmpty(),
  dirtyArray: WonderCommonlib.ArraySystem.createEmpty(),
  /* worldToCameraMatrixCacheMap: SparseMapSystem.createEmpty(), */
  pMatrixMap: SparseMapSystem.createEmpty(),
  gameObjectMap: SparseMapSystem.createEmpty(),
  /* dirtyMap: SparseMapSystem.createEmpty(), */
  updateCameraFuncMap: SparseMapSystem.createEmpty(),
  perspectiveCameraData: PerspectiveCameraSystem.initData(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};