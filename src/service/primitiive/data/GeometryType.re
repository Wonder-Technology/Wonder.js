open Js.Typed_array;

type geometry = int;

type geometryComputeData = {
  vertices: array(float),
  normals: array(float),
  indices: array(int)
};

type geometryVerticesMap = array(Float32Array.t);

type geometryNormalsMap = array(Float32Array.t);

/* TODO optimize: use Uint32Array based on config or query gpu extension */
type geometryIndicesMap = array(Uint16Array.t);

type geometryConfigDataMap = array(Js.Dict.t(float));

type geometryDisposedIndexMap = array(bool);

type geometryIsInitMap = array(bool);

type geometryGroupCountMap = array(int);

type geometryInfo = {
  startIndex: int,
  endIndex: int
};

type geometryInfoArray = array(geometryInfo);