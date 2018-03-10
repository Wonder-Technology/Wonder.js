open TypeArrayPoolType;

let deepCopyForRestore = (record) => {
  float32ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uint16ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty()
};

let create = () => {
  float32ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uint16ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty()
};