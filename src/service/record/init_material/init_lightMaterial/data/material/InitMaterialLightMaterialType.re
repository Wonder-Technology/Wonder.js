open MaterialType;

type materialRecord = {
  index: int,
  disposedIndexArray,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  diffuseTextureIndices: Js.Typed_array.Uint32Array.t,
  specularTextureIndices: Js.Typed_array.Uint32Array.t,
};