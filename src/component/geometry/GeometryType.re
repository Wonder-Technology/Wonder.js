type geometry = int;

type geometryInfo = {
  startIndex: int,
  endIndex: int
};

type geometryInfoList = array(option(geometryInfo));

type geometryComputeData = {
  vertices: array(float),
  indices: array(int)
};

type geometryConfigDataMap = Js.Dict.t(Js.Dict.t(float));
