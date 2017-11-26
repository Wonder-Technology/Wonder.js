type geometry = int;

type geometryInfo = {
  startIndex: int,
  endIndex: int
};

/* type geometryInfoArray = array(option(geometryInfo)); */
type geometryInfoArray = array(geometryInfo);

type geometryComputeData = {
  vertices: array(float),
  indices: array(int)
};

type geometryConfigDataMap = array(Js.Dict.t(float));

type geometryMappedIndexMap = array(int);

type geometryDisposeIndexMap = array(bool);

type geometryAliveIndexArray = array(geometry);

type geometryIndicesCountCacheMap = array(int);

type geometryVerticesCountCacheMap = array(int);

type geometryIsClonedMap = array(bool);