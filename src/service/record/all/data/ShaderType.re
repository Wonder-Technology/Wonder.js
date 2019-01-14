type shaderIndex = int;

type shaderRecord = {
  mutable index: int,
  mutable noMaterialShaderIndexMap: WonderCommonlib.HashMapService.t(shaderIndex),
  mutable shaderLibShaderIndexMap: WonderCommonlib.HashMapService.t(shaderIndex),
  mutable materialsMap: WonderCommonlib.SparseMapService.t(array(int)),
};