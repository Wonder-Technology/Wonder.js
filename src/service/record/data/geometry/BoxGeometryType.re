open ComponentType;

open GeometryType;

open Js.Typed_array;

type boxGeometryConfigDataJsObj = {
  .
  "width": Js.nullable(float),
  "height": Js.nullable(float),
  "depth": Js.nullable(float),
  "widthSegment": Js.nullable(float),
  "heightSegment": Js.nullable(float),
  "depthSegment": Js.nullable(float)
};

type boxGeometryRecord = {
  index: int,
  buffer: Js.Typed_array.array_buffer,
  vertices: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  indices: Js.Typed_array.Uint16Array.t,
  computeDataFuncMap: array(((int, boxGeometryRecord) => geometryComputeData)),
  configDataMap: geometryConfigDataMap,
  gameObjectMap,
  isInitMap: geometryIsInitMap,
  groupCountMap: geometryGroupCountMap,
  mutable disposedIndexArray: array(geometry)
};