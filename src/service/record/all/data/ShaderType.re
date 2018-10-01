type shader = int;

type shaderRecord = {
  mutable index: int,
  mutable shaderIndexMap: WonderCommonlib.HashMapService.t(shader),
  mutable materialsMap: WonderCommonlib.SparseMapService.t(array(int)),
  mutable usedShaderIndexArray: array(shader),
};