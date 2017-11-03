open ComponentType;

type material = int;

type materialData = {
  mutable index: int,
  mutable buffer: Js.Typed_array.array_buffer,
  mutable shaderIndices: Js.Typed_array.Uint32Array.t,
  /* mutable colors: Js.Typed_array.Float32Array.t, */
  mutable gameObjectMap
};