open Js.Typed_array;

type geometry = int;

/* type geometryInfo = {
     startIndex: int,
     endIndex: int
   };

   type geometryInfoArray = array(geometryInfo); */
type geometryComputeData = {
  vertices: array(float),
  indices: array(int)
};

type geometryVerticesMap = array(Float32Array.t);

/* todo optimize: use Uint32Array based on config or query gpu extension */
type geometryIndicesMap = array(Uint16Array.t);

type geometryConfigDataMap = array(Js.Dict.t(float));

/* type geometryMappedIndexMap = array(int); */
type geometryDisposeIndexMap = array(bool);

/* type geometryAliveIndexArray = array(geometry); */

/* type geometryIndicesCountCacheMap = array(int);

   type geometryVerticesCountCacheMap = array(int); */
type geometryIsInitMap = array(bool);

type geometryGroupCountMap = array(int);