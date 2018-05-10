open ComponentType;

open GeometryType;

open Js.Typed_array;

type customGeometryRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  vertices: Js.Typed_array.Float32Array.t,
  texCoords: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  indices: Js.Typed_array.Uint16Array.t,
  verticesInfos: Js.Typed_array.Uint32Array.t,
  texCoordsInfos: Js.Typed_array.Uint32Array.t,
  normalsInfos: Js.Typed_array.Uint32Array.t,
  indicesInfos: Js.Typed_array.Uint32Array.t,
  mutable verticesOffset: int,
  mutable texCoordsOffset: int,
  mutable normalsOffset: int,
  mutable indicesOffset: int,
  mutable disposeCount: int,
  gameObjectMap,
  groupCountMap: geometryGroupCountMap,
  mutable disposedIndexArray: array(geometry),
  mutable disposedIndexMap: geometryDisposedIndexMap,
  aliveIndexArray: array(int)
};