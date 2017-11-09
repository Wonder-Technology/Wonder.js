open ComponentType;

open PerspectiveCameraType;

type cameraController = int;

type cameraControllerDirtyList = array(int);

type worldToCameraMatrixCacheMap = Js.Dict.t(array(float));

type pMatrixMap = Js.Dict.t(array(float));

type updateCameraFuncMap = Js.Dict.t(((int, cameraControllerData) => unit))
and cameraControllerData = {
  mutable index: int,
  mutable cameraArray: array(cameraController),
  mutable dirtyList: cameraControllerDirtyList,
  /* mutable worldToCameraMatrixCacheMap, */
  mutable pMatrixMap,
  mutable gameObjectMap,
  /* mutable dirtyMap: Js.Dict.t(bool), */
  mutable updateCameraFuncMap,
  mutable perspectiveCameraData
};