open Js.Typed_array;

type geometry = int;

type geometryComputeData = {
  vertices: array(float),
  indices: array(int)
};

type geometryVerticesMap = array(Float32Array.t);

/* todo optimize: use Uint32Array based on config or query gpu extension */
type geometryIndicesMap = array(Uint16Array.t);

type geometryConfigDataMap = array(Js.Dict.t(float));

type geometryDisposedIndexArray = array(geometry);

type geometryIsInitMap = array(bool);

type geometryGroupCountMap = array(int);

type geometryFloat32ArrayPoolMap = array(Float32Array.t);

type geometryUint16ArrayPoolMap = array(Uint16Array.t);