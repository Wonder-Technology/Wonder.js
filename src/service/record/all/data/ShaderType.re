type shaderIndex = int;

type shaderRecord = {
  mutable index: int,
  mutable shaderIndexMap: WonderCommonlib.HashMapService.t(shaderIndex),
  mutable materialsMap: WonderCommonlib.SparseMapService.t(array(int)),
};