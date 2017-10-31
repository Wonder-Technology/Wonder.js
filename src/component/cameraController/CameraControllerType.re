open ComponentType;

open PerspectiveCameraType;

type cameraControllerDirtyList = array(int);

type worldToCameraMatrixCacheMap = Js.Dict.t(array(float));

type pMatrixMap = Js.Dict.t(array(float));

type updateCameraFuncMap = Js.Dict.t(((int, cameraControllerData) => unit))
and cameraControllerData = {
  mutable index: int,
  mutable dirtyList: cameraControllerDirtyList,
  mutable worldToCameraMatrixCacheMap,
  mutable pMatrixMap,
  mutable gameObjectMap,
  mutable updateCameraFuncMap,
  mutable perspectiveCameraData
};

type cameraController = int;
