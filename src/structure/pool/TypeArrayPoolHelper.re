open TypeArrayPoolType;

let create = () => {
  float32ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uint16ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty()
};