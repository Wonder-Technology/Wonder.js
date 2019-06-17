open AllTypeArrayPoolType;

let deepCopyForRestore = (record) => {
  float32ArrayPoolMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  uint16ArrayPoolMap: WonderCommonlib.MutableSparseMapService.createEmpty()
};

let create = () => {
  float32ArrayPoolMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  uint16ArrayPoolMap: WonderCommonlib.MutableSparseMapService.createEmpty()
};