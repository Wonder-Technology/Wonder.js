type shaderIndex = int;

type shaderRecord = {
  mutable index: int,
  mutable noMaterialShaderIndexMap: WonderCommonlib.HashMapService.t(shaderIndex),
  mutable shaderLibShaderIndexMap: WonderCommonlib.HashMapService.t(shaderIndex),
  mutable materialsMap: WonderCommonlib.MutableSparseMapService.t(array(int)),
};