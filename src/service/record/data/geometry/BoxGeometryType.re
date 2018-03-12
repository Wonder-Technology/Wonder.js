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
  verticesMap: geometryVerticesMap,
  normalsMap: geometryNormalsMap,
  indicesMap: geometryIndicesMap,
  computeDataFuncMap: array(((int, boxGeometryRecord) => geometryComputeData)),
  configDataMap: geometryConfigDataMap,
  gameObjectMap,
  disposedIndexArray: geometryDisposedIndexArray,
  isInitMap: geometryIsInitMap,
  groupCountMap: geometryGroupCountMap
};