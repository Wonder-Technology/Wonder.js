open ComponentType;

open PerspectiveCameraType;

type cameraController = int;

type cameraControllerDirtyArray = array(int);

/* type worldToCameraMatrixCacheMap = array(array(float)); */
type pMatrixMap = array(Js.Typed_array.Float32Array.t);

type updateCameraFuncMap = array(((int, cameraControllerData) => unit))
and cameraControllerData = {
  mutable index: int,
  mutable cameraArray: array(cameraController),
  mutable dirtyArray: cameraControllerDirtyArray,
  /* mutable worldToCameraMatrixCacheMap, */
  mutable pMatrixMap,
  mutable gameObjectMap,
  /* mutable dirtyMap: array(bool), */
  mutable updateCameraFuncMap,
  mutable perspectiveCameraData,
  mutable disposedIndexArray: array(cameraController)
};