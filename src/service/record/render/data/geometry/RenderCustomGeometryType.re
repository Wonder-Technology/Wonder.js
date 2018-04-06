open GeometryType;

type customGeometryRecord = {
  vertices: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  indices: Js.Typed_array.Uint16Array.t,
  verticesInfoArray: geometryInfoArray,
  normalsInfoArray: geometryInfoArray,
  indicesInfoArray: geometryInfoArray
};