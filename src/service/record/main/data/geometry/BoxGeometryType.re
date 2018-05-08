open ComponentType;

open GeometryType;

open Js.Typed_array;

type boxGeometryRecord = {
  index: int,
  vertices: Js.Typed_array.Float32Array.t,
  texCoords: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  indices: Js.Typed_array.Uint16Array.t,
  gameObjectMap,
  groupCountMap: geometryGroupCountMap,
  mutable disposedIndexArray: array(geometry)
};