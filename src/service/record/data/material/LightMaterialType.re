open ComponentType;

open MaterialType;

type lightMaterialRecord = {
  index: int,
  buffer: Js.Typed_array.array_buffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  diffuseColors: Js.Typed_array.Float32Array.t,
  specularColors: Js.Typed_array.Float32Array.t,
  shininess: Js.Typed_array.Float32Array.t,
  defaultShaderIndex: int,
  defaultDiffuseColor: array(float),
  defaultSpecularColor: array(float),
  defaultShininess: float,
  gameObjectMap,
  groupCountMap,
  disposedIndexArray
};