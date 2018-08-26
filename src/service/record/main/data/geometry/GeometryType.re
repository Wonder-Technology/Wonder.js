open ComponentType;

open Js.Typed_array;

type geometry = int;

type gameObjectsMap = WonderCommonlib.SparseMapService.t(array(int));

type geometryComputeData = {
  vertices: array(float),
  normals: array(float),
  indices: array(int),
};

/* TODO optimize: use Uint32Array based on config or query gpu extension */
type geometryDisposedIndexMap = WonderCommonlib.SparseMapService.t(bool);

type geometryIsInitMap = WonderCommonlib.SparseMapService.t(bool);

/* type geometryGroupCountMap = WonderCommonlib.SparseMapService.t(int); */

type geometryRecord = {
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
  gameObjectsMap,
  /* groupCountMap: geometryGroupCountMap, */
  mutable disposedIndexArray: array(geometry),
  mutable disposedIndexMap: geometryDisposedIndexMap,
  aliveIndexArray: array(int),
  nameMap: WonderCommonlib.SparseMapService.t(string),
};