type customGeometryRecord = {
  vertices: Js.Typed_array.Float32Array.t,
  texCoords: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  indices: Js.Typed_array.Uint16Array.t,
  verticesInfos: Js.Typed_array.Uint8Array.t,
  normalsInfos: Js.Typed_array.Uint8Array.t,
  indicesInfos: Js.Typed_array.Uint8Array.t
};