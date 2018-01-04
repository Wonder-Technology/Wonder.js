open TypeArrayPoolType;

let initData = () => {
  float32ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uint16ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty()
};