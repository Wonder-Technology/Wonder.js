type geometry = WonderComponentTypeGeometry.Index.geometry

type config = {isDebug: bool}

type state = {
  config: config,
  vertices: Js.Typed_array.Float32Array.t,
  texCoords: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  tangents: Js.Typed_array.Float32Array.t,
  indices: Js.Typed_array.Uint32Array.t,
  verticesInfos: Js.Typed_array.Uint32Array.t,
  texCoordsInfos: Js.Typed_array.Uint32Array.t,
  normalsInfos: Js.Typed_array.Uint32Array.t,
  tangentsInfos: Js.Typed_array.Uint32Array.t,
  indicesInfos: Js.Typed_array.Uint32Array.t,
}
