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
  copiedVertices: Js.Typed_array.Float32Array.t,
  copiedTexCoords: Js.Typed_array.Float32Array.t,
  copiedNormals: Js.Typed_array.Float32Array.t,
  copiedIndices: Js.Typed_array.Uint16Array.t,
  copiedIndices32: Js.Typed_array.Uint32Array.t,
  texCoordsInfos: Js.Typed_array.Uint32Array.t,
  normalsInfos: Js.Typed_array.Uint32Array.t,
  indicesInfos: Js.Typed_array.Uint32Array.t,
  verticesOffset: int,
  texCoordsOffset: int,
  normalsOffset: int,
  indicesOffset: int,
  indices32Offset: int,
  mutable disposeCount: int,
  mutable indicesTypeMap: WonderCommonlib.SparseMapService.t(indicesType),
  mutable isPointDataDirtyForRestore: bool,
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