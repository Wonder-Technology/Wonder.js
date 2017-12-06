type gpuPrecision =
  | HIGHP
  | MEDIUMP
  | LOWP;

type extensionInstancedArrays = {
  .
  "vertexAttribDivisorANGLE": (GlType.attributeLocation, int) => unit,
  "drawElementsInstancedANGLE": (int, int, int, int, int) => unit
};

type gpuDetectData = {
  extensionInstancedArrays: option(extensionInstancedArrays),
  precision: option(gpuPrecision)
};