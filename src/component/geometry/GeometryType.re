open ComponentType;

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

/* type configDataMap = Js.Dict.t(list(float)); */
type geometryConfigDataMap = Js.Dict.t(Js.Dict.t(float));

type geometryData = {
  mutable index: int,
  mutable buffer: Js.Typed_array.array_buffer,
  mutable vertices: Js.Typed_array.Float32Array.t,
  /* todo optimize: use Uint16Array based on config or query gpu extension */
  mutable indices: Js.Typed_array.Uint32Array.t,
  mutable verticesInfoList: geometryInfoList,
  mutable indicesInfoList: geometryInfoList,
  mutable verticesOffset: int,
  mutable indicesOffset: int,
  mutable computeDataFuncMap: Js.Dict.t(((int, geometryConfigDataMap) => geometryComputeData)),
  mutable configDataMap:geometryConfigDataMap,
  mutable gameObjectMap
};