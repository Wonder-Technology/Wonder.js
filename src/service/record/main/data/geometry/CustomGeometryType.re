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
  verticesInfos: Js.Typed_array.Uint8Array.t,
  texCoordsInfos: Js.Typed_array.Uint8Array.t,
  normalsInfos: Js.Typed_array.Uint8Array.t,
  indicesInfos: Js.Typed_array.Uint8Array.t,
  mutable verticesOffset: int,
  mutable texCoordsOffset: int,
  mutable normalsOffset: int,
  mutable indicesOffset: int,
  mutable disposeCount: int,
  /* computeDataFuncMap: WonderCommonlib.SparseMapService.t(((int, boxGeometryRecord) => geometryComputeData)), */
  /* configDataMap: geometryConfigDataMap, */
  gameObjectMap,
  /* isInitMap: geometryIsInitMap, */
  groupCountMap: geometryGroupCountMap,
  mutable disposedIndexArray: array(geometry),
  mutable disposedIndexMap: geometryDisposedIndexMap,
  aliveIndexArray: array(int)
};