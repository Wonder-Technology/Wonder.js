open ComponentType;

open Js.Typed_array;

type geometry = int;

type geometryComputeData = {
  vertices: array(float),
  normals: array(float),
  indices: array(int),
};

type geometryDisposedIndexMap = WonderCommonlib.SparseMapService.t(bool);

type geometryIsInitMap = WonderCommonlib.SparseMapService.t(bool);

type indicesType =
  | Short
  | Int;

/* type geometryGroupCountMap = WonderCommonlib.SparseMapService.t(int); */

type geometryRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  vertices: Js.Typed_array.Float32Array.t,
  texCoords: Js.Typed_array.Float32Array.t,
  normals: Js.Typed_array.Float32Array.t,
  indices: Js.Typed_array.Uint16Array.t,
  indices32: Js.Typed_array.Uint32Array.t,
  verticesInfos: Js.Typed_array.Uint32Array.t,
  texCoordsInfos: Js.Typed_array.Uint32Array.t,
  normalsInfos: Js.Typed_array.Uint32Array.t,
  indicesInfos: Js.Typed_array.Uint32Array.t,
  mutable verticesOffset: int,
  mutable texCoordsOffset: int,
  mutable normalsOffset: int,
  mutable indicesOffset: int,
  mutable indices32Offset: int,
  mutable disposeCount: int,
  mutable indicesTypeMap: WonderCommonlib.SparseMapService.t(indicesType),
  gameObjectsMap,
  /* groupCountMap: geometryGroupCountMap, */
  mutable disposedIndexArray: array(geometry),
  mutable disposedIndexMap: geometryDisposedIndexMap,
  aliveIndexArray: array(int),
  nameMap: WonderCommonlib.SparseMapService.t(string),
};

external uint32ToUint16 :
  Js.Typed_array.Uint32Array.t => Js.Typed_array.Uint16Array.t =
  "%identity";