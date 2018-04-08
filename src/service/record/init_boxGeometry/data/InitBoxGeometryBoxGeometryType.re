open GeometryType;

type boxGeometryRecord = {
  index: int,
  vertices: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  indices: Js.Typed_array.Uint16Array.t,
  configDataMap: geometryConfigDataMap,
  isInitMap: geometryIsInitMap,
  disposedIndexArray: array(geometry)
};