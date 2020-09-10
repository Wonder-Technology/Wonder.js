type geometry = {
  maxIndex: ComponentCPPOType.index,
  buffer: SharedArrayBufferCPPOType.sharedArrayBuffer,
  mutable vertices: Js.Typed_array.Float32Array.t,
  mutable normals: Js.Typed_array.Float32Array.t,
  mutable indices: Js.Typed_array.Uint32Array.t,
  mutable verticesInfos: Js.Typed_array.Uint32Array.t,
  mutable normalsInfos: Js.Typed_array.Uint32Array.t,
  mutable indicesInfos: Js.Typed_array.Uint32Array.t,
  verticesOffset: int,
  normalsOffset: int,
  indicesOffset: int,
  gameObjectsMap: ComponentCPPOType.gameObjectsMap,
};
