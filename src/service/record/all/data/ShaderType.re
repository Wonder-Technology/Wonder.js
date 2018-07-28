type shader = int;

type shaderRecord = {
  mutable index: int,
  mutable shaderIndexMap: WonderCommonlib.HashMapService.t(shader),
  mutable usedShaderIndexArray: array(shader),
};