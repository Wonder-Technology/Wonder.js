open ComponentType;

type material = int;

type materialData = {
  mutable index: int,
  /* mutable buffer: Js.Typed_array.array_buffer, */
  mutable shaderIndexMap: Js.Dict.t(int),
  /* mutable colors: Js.Typed_array.Float32Array.t, */
  mutable gameObjectMap,
  mutable disposedIndexArray: array(material)
};