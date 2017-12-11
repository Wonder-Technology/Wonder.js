open CameraControllerType;

let initData = () => {
  index: 0,
  cameraArray: WonderCommonlib.ArraySystem.createEmpty(),
  dirtyArray: WonderCommonlib.ArraySystem.createEmpty(),
  pMatrixMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  updateCameraFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  perspectiveCameraData: PerspectiveCameraHelper.initData(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};