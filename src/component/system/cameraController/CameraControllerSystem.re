open ComponentSystem;

open CameraControllerType;

open CameraControllerDirtyCommon;

open Contract;

open CameraControllerStateCommon;

let create = (state: StateDataType.state) => CameraControllerCreateCommon.create(state);

let getCameraControllerData = CameraControllerStateCommon.getCameraControllerData;

let handleAddComponent = CameraControllerAddComponentCommon.handleAddComponent;

let handleDisposeComponent = CameraControllerDisposeComponentCommon.handleDisposeComponent;

let handleBatchDisposeComponent = CameraControllerDisposeComponentCommon.handleBatchDisposeComponent;

let handleCloneComponent = CameraControllerCloneComponentCommon.handleCloneComponent;

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
   cameraControllerData.worldToCameraMatrixCacheMap = WonderCommonlib.SparseMapSystem.createEmpty(); */
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
               WonderCommonlib.SparseMapSystem.length(getCameraControllerData(state).worldToCameraMatrixCacheMap)
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
               |> WonderCommonlib.SparseMapSystem.get((cameraController))
               |> assertNotExist
             }
           )
         )
     ); */
  let cameraControllerData = getCameraControllerData(state);
  cameraControllerData.updateCameraFuncMap
  |> WonderCommonlib.SparseMapSystem.set(cameraController, PerspectiveCameraSystem.update)
  |> ignore;
  state
};

let _updateCamera = (index: int, cameraControllerData: cameraControllerData) => {
  let updateFunc =
    cameraControllerData.updateCameraFuncMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index);
  updateFunc(index, cameraControllerData) |> ignore;
  ()
};

let update = (state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData(state);
  let dirtyArray = cameraControllerData.dirtyArray;
  /* switch (Js.Array.length(dirtyArray)) {
     | 0 =>
     CameraControllerDirtyCommon.cleanDirtyMap(cameraControllerData) |> ignore;
     state;
     | _ => */
  dirtyArray
  |> WonderCommonlib.ArraySystem.removeDuplicateItems
  /* |> CameraControllerDirtyCommon.updateDirtyMap(cameraControllerData) */
  |> Js.Array.forEach((dirtyIndex) => _updateCamera(dirtyIndex, cameraControllerData));
  /* cameraControllerData |> cleanDirtyArray |> _clearCache |> ignore; */
  cameraControllerData |> cleanDirtyArray |> ignore;
  state
  /* } */
};

/* let isDirty = (cameraController: cameraController, state: StateDataType.state) =>
   CameraControllerDirtyCommon.isDirty(cameraController, getCameraControllerData(state)); */
let getGameObject = (cameraController: cameraController, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    cameraController,
    getCameraControllerData(state).gameObjectMap
  );

let _getCameraToWorldMatrixByTransform = (transform, state: StateDataType.state) =>
  TransformUtils.getLocalToWorldMatrixTypeArray(transform, state);

let _getCameraToWorldMatrix = (transform, state: StateDataType.state) =>
  _getCameraToWorldMatrixByTransform(transform, state);

let getWorldToCameraMatrix = (transform, state: StateDataType.state) =>
  /* CacheUtils.mapDataInCacheType( */
  Matrix4System.invert(
    _getCameraToWorldMatrixByTransform(transform, state),
    Matrix4System.createIdentityMatrix4()
  );

/* [@bs] ((data) => data |> Matrix4System.invert) */
/* ); */
/* switch (_getCameraToWorldMatrix(cameraController, state)) {
   | CacheType.Cache(data) => CacheType.Cache(data |> Matrix4System.invert)
   | CacheType.New(data) => CacheType.New(data |> Matrix4System.invert)
   }; */
let getPMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(
    cameraController,
    getCameraControllerData(state).pMatrixMap
  )
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "pMatrix should exist",
             () =>
               WonderCommonlib.SparseMapSystem.get(
                 cameraController,
                 getCameraControllerData(state).pMatrixMap
               )
               |> assertExist
           )
         )
     );

let isAlive = (cameraController: cameraController, state: StateDataType.state) =>
  CameraControllerDisposeComponentCommon.isAlive(cameraController, state);

let initData = () => {
  index: 0,
  cameraArray: WonderCommonlib.ArraySystem.createEmpty(),
  dirtyArray: WonderCommonlib.ArraySystem.createEmpty(),
  /* worldToCameraMatrixCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(), */
  pMatrixMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  /* dirtyMap: WonderCommonlib.SparseMapSystem.createEmpty(), */
  updateCameraFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  perspectiveCameraData: PerspectiveCameraSystem.initData(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};