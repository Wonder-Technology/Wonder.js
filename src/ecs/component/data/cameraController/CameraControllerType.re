open ComponentType;

open PerspectiveCameraType;

type cameraController = int;

type cameraControllerDirtyArray = array(int);

/* type worldToCameraMatrixCacheMap = array(array(float)); */
type pMatrixMap = array(Js.Typed_array.Float32Array.t);

type updateCameraFuncMap = array(((int, cameraControllerData) => cameraControllerData))
and cameraControllerData = {
  index: int,
  cameraArray: array(cameraController),
  dirtyArray: cameraControllerDirtyArray,
  /* worldToCameraMatrixCacheMap, */
  pMatrixMap,
  gameObjectMap,
  /* dirtyMap: array(bool), */
  updateCameraFuncMap,
  perspectiveCameraData,
  disposedIndexArray: array(cameraController)
};