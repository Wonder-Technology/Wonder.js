open Js.Typed_array;

type geometry = int;

type geometryComputeData = {
  vertices: array(float),
  normals: array(float),
  indices: array(int)
};

/* TODO optimize: use Uint32Array based on config or query gpu extension */
type geometryDisposedIndexMap = array(bool);

type geometryIsInitMap = array(bool);

type geometryGroupCountMap = array(int);