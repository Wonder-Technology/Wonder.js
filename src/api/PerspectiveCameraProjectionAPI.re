open MainStateDataType;

open PerspectiveCameraProjectionType;

open DisposePerspectiveCameraProjectionService;

open GameObjectPerspectiveCameraProjectionService;

open FrustumPerspectiveCameraProjectionService;

let createPerspectiveCameraProjection = (state) => {
  let (perspectiveCameraProjectionRecord, index) =
    CreatePerspectiveCameraProjectionService.create(state.perspectiveCameraProjectionRecord);
  ({...state, perspectiveCameraProjectionRecord}, index)
};

let unsafeGetPerspectiveCameraProjectionPMatrix = (cameraProjection, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraProjection,
              isAlive,
              state.perspectiveCameraProjectionRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  PMatrixService.unsafeGetPMatrix(
    cameraProjection,
    state.perspectiveCameraProjectionRecord.pMatrixMap
  )
};

let unsafeGetPerspectiveCameraProjectionGameObject = (cameraProjection, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraProjection,
              isAlive,
              state.perspectiveCameraProjectionRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  unsafeGetGameObject(cameraProjection, state.perspectiveCameraProjectionRecord)
};

let unsafeGetPerspectiveCameraFovy = (cameraProjection, state) =>
  state.perspectiveCameraProjectionRecord |> unsafeGetFovy(cameraProjection);

let setPerspectiveCameraFovy = (cameraProjection, fovy: float, state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    setFovy(cameraProjection, fovy, state.perspectiveCameraProjectionRecord)
};

let unsafeGetPerspectiveCameraAspect = (cameraProjection, state) =>
  state.perspectiveCameraProjectionRecord |> unsafeGetAspect(cameraProjection);

let setPerspectiveCameraAspect = (cameraProjection, aspect: float, state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    setAspect(cameraProjection, aspect, state.perspectiveCameraProjectionRecord)
};

let unsafeGetPerspectiveCameraNear = (cameraProjection, state) =>
  state.perspectiveCameraProjectionRecord |> unsafeGetNear(cameraProjection);

let setPerspectiveCameraNear = (cameraProjection, near: float, state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    setNear(cameraProjection, near, state.perspectiveCameraProjectionRecord)
};

let unsafeGetPerspectiveCameraFar = (cameraProjection, state) =>
  state.perspectiveCameraProjectionRecord |> unsafeGetFar(cameraProjection);

let setPerspectiveCameraFar = (cameraProjection, far: float, state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    setFar(cameraProjection, far, state.perspectiveCameraProjectionRecord)
};