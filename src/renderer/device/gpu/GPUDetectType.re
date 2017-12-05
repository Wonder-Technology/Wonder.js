type gpuPrecision =
  | HIGHP
  | MEDIUMP
  | LOWP;

type gpuDetectData = {
  extensionInstancedArrays: option(GlType.extension),
  precision: option(gpuPrecision)
};