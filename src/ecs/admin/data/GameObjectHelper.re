open GameObjectType;

let initData = () => {
  uid: 0,
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  aliveUidArray: WonderCommonlib.ArraySystem.createEmpty(),
  transformMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  cameraControllerMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  geometryMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  meshRendererMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  basicMaterialMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  lightMaterialMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  sourceInstanceMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  objectInstanceMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  ambientLightMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  directionLightMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  pointLightMap: WonderCommonlib.SparseMapSystem.createEmpty()
};