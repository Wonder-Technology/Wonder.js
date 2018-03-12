open ComponentType;

type lightGLSLDataStructureMember = {
  position: string,
  color: string,
  intensity: string
};

type directionLightRecord = {
  index: int,
  buffer: Js.Typed_array.array_buffer,
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t,
  mappedIndexMap: array(int),
  gameObjectMap
};