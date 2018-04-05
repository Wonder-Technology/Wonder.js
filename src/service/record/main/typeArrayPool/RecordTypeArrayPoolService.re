open TypeArrayPoolType;

let deepCopyForRestore = (record) => {
  float32ArrayPoolMap: WonderCommonlib.SparseMapService.createEmpty(),
  uint16ArrayPoolMap: WonderCommonlib.SparseMapService.createEmpty()
};

let create = () => {
  float32ArrayPoolMap: WonderCommonlib.SparseMapService.createEmpty(),
  uint16ArrayPoolMap: WonderCommonlib.SparseMapService.createEmpty()
};