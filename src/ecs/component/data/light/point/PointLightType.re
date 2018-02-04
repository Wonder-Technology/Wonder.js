open ComponentType;

type lightGLSLDataStructureMember = {
  position: string,
  color: string,
  intensity: string,
  constant: string,
  linear: string,
  quadratic: string,
  range: string
};

type pointLightData = {
  mutable index: int,
  buffer: Js.Typed_array.array_buffer,
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t,
  constants: Js.Typed_array.Float32Array.t,
  linears: Js.Typed_array.Float32Array.t,
  quadratics: Js.Typed_array.Float32Array.t,
  ranges: Js.Typed_array.Float32Array.t,
  mappedIndexMap: array(int),
  gameObjectMap
};