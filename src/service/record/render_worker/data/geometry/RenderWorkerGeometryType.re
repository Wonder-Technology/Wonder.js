type geometryRecord = {
  vertices: Js.Typed_array.Float32Array.t,
  texCoords: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  indices16: Js.Typed_array.Uint16Array.t,
  indices32: Js.Typed_array.Uint32Array.t,
  verticesInfos: Js.Typed_array.Uint32Array.t,
  texCoordsInfos: Js.Typed_array.Uint32Array.t,
  normalsInfos: Js.Typed_array.Uint32Array.t,
  indicesInfos: Js.Typed_array.Uint32Array.t,
  indicesTypeMap:
    WonderCommonlib.MutableSparseMapService.t(GeometryType.indicesType),
};