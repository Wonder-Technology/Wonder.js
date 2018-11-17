type gpuPrecision =
  | HIGHP
  | MEDIUMP
  | LOWP;

type extensionInstancedArrays = {
  .
  "vertexAttribDivisorANGLE":
    (. WonderWebgl.GlType.attributeLocation, int) => unit,
  "drawElementsInstancedANGLE": (. int, int, int, int, int) => unit,
};

/* type  */

type gpuDetectRecord = {
  extensionInstancedArrays: option(extensionInstancedArrays),
  extensionElementIndexUint: option(bool),
  /* OES_element_index_uint */
  precision: option(gpuPrecision),
  maxTextureUnit: option(int),
};