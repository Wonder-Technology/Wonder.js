type shaderIndex = int;

type shaderRecord = {
  mutable index: int,
  mutable noMaterialShaderIndexMap: WonderCommonlib.MutableHashMapService.t(shaderIndex),
  mutable shaderLibShaderIndexMap: WonderCommonlib.MutableHashMapService.t(shaderIndex),
  mutable materialsMap: WonderCommonlib.MutableSparseMapService.t(array(int)),
};