open PerspectiveCameraType;

let initData = () => {
  nearMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  farMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  fovyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  aspectMap: WonderCommonlib.SparseMapSystem.createEmpty()
};