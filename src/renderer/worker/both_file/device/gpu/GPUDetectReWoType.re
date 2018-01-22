type gpuPrecision =
  | HIGHP
  | MEDIUMP
  | LOWP;

type extensionInstancedArrays = {
  .
  "vertexAttribDivisorANGLE": [@bs] ((GlType.attributeLocation, int) => unit),
  "drawElementsInstancedANGLE": [@bs] (int, int, int, int, int) => unit
};

type gpuDetectData = {
  extensionInstancedArrays: option(extensionInstancedArrays),
  precision: option(gpuPrecision)
};