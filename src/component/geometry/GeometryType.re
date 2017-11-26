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

type geometryConfigDataMap = Js.Dict.t(Js.Dict.t(float));

type geometryMappedIndexMap = Js.Dict.t(int);

type geometryDisposeIndexMap = Js.Dict.t(bool);

type geometryAliveIndexArray = array(geometry);

type geometryIndicesCountCacheMap = Js.Dict.t(int);

type geometryVerticesCountCacheMap = Js.Dict.t(int);

type geometryIsClonedMap = Js.Dict.t(bool);