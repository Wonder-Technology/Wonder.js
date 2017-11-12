open ComponentType;

open PerspectiveCameraType;

type cameraController = int;

type cameraControllerDirtyArray = array(int);

/* type worldToCameraMatrixCacheMap = Js.Dict.t(array(float)); */

type pMatrixMap = Js.Dict.t(Js.Typed_array.Float32Array.t);

type updateCameraFuncMap = Js.Dict.t(((int, cameraControllerData) => unit))
and cameraControllerData = {
  mutable index: int,
  mutable cameraArray: array(cameraController),
  mutable dirtyArray: cameraControllerDirtyArray,
  /* mutable worldToCameraMatrixCacheMap, */
  mutable pMatrixMap,
  mutable gameObjectMap,
  /* mutable dirtyMap: Js.Dict.t(bool), */
  mutable updateCameraFuncMap,
  mutable perspectiveCameraData
};