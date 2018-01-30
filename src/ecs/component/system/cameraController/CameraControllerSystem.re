open ComponentSystem;

open CameraControllerType;

open CameraControllerDirtyCommon;

open CameraControllerStateCommon;

let create = (state: StateDataType.state) => CameraControllerCreateCommon.create(state);

let getCameraControllerData = CameraControllerStateCommon.getCameraControllerData;

let getCurrentCameraController = (state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            Contract.test(
              Log.buildAssertMessage(~expect={j|has at least one camera|j}, ~actual={j|has 0|j}),
              () => {
                let {cameraArray} = getCameraControllerData(state);
                Js.Array.length(cameraArray) > 0
              }
            )
          )
        )
      ),
    StateData.stateData.isDebug
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
  }
};

let setPerspectiveCamera = (cameraController: int, state: StateDataType.state) => {
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
  TransformSystem.getLocalToWorldMatrixTypeArray(transform, state);

let _getCameraToWorldMatrix = (transform, state: StateDataType.state) =>
  _getCameraToWorldMatrixByTransform(transform, state);

let getWorldToCameraMatrix = (transform, state: StateDataType.state) =>
  Matrix4System.invert(
    _getCameraToWorldMatrixByTransform(transform, state),
    Matrix4System.createIdentityMatrix4()
  );

let getNormalMatrix = (transform, state: StateDataType.state) =>
  Matrix4System.invertTo3x3(
    _getCameraToWorldMatrixByTransform(transform, state),
    Matrix4System.createIdentityMatrix4()
  )
  |> Matrix4System.transposeSelf;

let getPosition = (transform, state: StateDataType.state) =>
  TransformSystem.getPositionTuple(transform, state);

let unsafeGetPMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(
    cameraController,
    getCameraControllerData(state).pMatrixMap
  )
  |> WonderLog.Contract.ensureCheck(
       (pMatrix) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|pMatrix exist|j}, ~actual={j|not|j}),
                 () => pMatrix |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );

let isAlive = (cameraController: cameraController, state: StateDataType.state) =>
  CameraControllerDisposeComponentCommon.isAlive(cameraController, state);

let deepCopyStateForRestore = CameraControllerStateCommon.deepCopyStateForRestore;