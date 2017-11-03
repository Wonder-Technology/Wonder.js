open Js.Typed_array;

open TypeArrayUtils;

open GeometryStateUtils;

let create = (state: StateDataType.state) => {
  let data = getGeometryData(state);
  let index = data.index;
  data.index = succ(data.index);
  (state, index)
};

let _buildInfo = (startIndex: int, endIndex: int) => {startIndex, endIndex};

let _getFloat32PointData = (index: int, points: Float32Array.t, infoList) =>
  switch infoList[index] {
  | None => ExceptionHandlerSystem.throwMessage({j|infoList[$index] should exist|j})
  | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
  };

let _setFloat32PointData =
    (index: int, dataArr: ArraySystem.t(float), points: Float32Array.t, infoList, offset: int) => {
  let count = ArraySystem.length(dataArr);
  let startIndex = offset;
  let newOffset = offset + count;
  infoList[index] = _buildInfo(startIndex, newOffset);
  fillFloat32Arr(points, dataArr, startIndex);
  newOffset
};

/* todo refactor: reduce duplicate: merge with _getFloat32PointData/_setFloat32PointData */
let _getUint32PointData = (index: int, points: Uint32Array.t, infoList) =>
  switch infoList[index] {
  | None => ExceptionHandlerSystem.throwMessage({j|infoList[$index] should exist|j})
  | Some({startIndex, endIndex}) => getUint32ArrSubarray(points, startIndex, endIndex)
  };

let _setUint32PointData =
    (index: int, dataArr: ArraySystem.t(float), points: Uint32Array.t, infoList, offset: int) => {
  let count = ArraySystem.length(dataArr);
  let startIndex = offset;
  let newOffset = offset + count;
  infoList[index] = _buildInfo(startIndex, newOffset);
  fillUint32Arr(points, dataArr, startIndex);
  newOffset
};

let getVertices = (index: int, state: StateDataType.state) => {
  let {vertices, verticesInfoList} = getGeometryData(state);
  _getFloat32PointData(index, vertices, verticesInfoList)
};

let setVertices = (index: int, vertices: ArraySystem.t(float), state: StateDataType.state) => {
  let {verticesInfoList, verticesOffset} as geometryData = getGeometryData(state);
  geometryData.verticesOffset =
    _setFloat32PointData(index, vertices, verticesInfoList, verticesOffset)
};

let getIndices = (index: int, state: StateDataType.state) => {
  let {indices, indicesInfoList} = getGeometryData(state);
  _getUint32PointData(index, indices, indicesInfoList)
};

let setIndices = (index: int, indices: ArraySystem.t(float), state: StateDataType.state) => {
  let {indicesInfoList, indicesOffset} as geometryData = getGeometryData(state);
  geometryData.indicesOffset = _setUint32PointData(index, indices, indicesInfoList, indicesOffset)
};

let _initGeometry = (index: int, state: StateDataType.state) => {
  let geometryData = getGeometryData(state);
  switch (geometryData.computeDataFuncMap |> HashMapSystem.get(index)) {
  | None => ()
  | Some(computeDataFunc) =>
    let {vertices, indices} = computeDataFunc(index, geometryData.configDataMap);
    /* todo compute normals */
    state |> setVertices(index, vertices) |> setIndices(index, indices) |> ignore
  }
};

let init = (state: StateDataType.state) => {
  let {index} = getGeometryData(state);
  ArraySystem.range(0, index - 1)
  |> ArraySystem.forEach((geometryIndex: int) => _initGeometry(geometryIndex, state));
  state
};

let getVertexDataSize = () => 3;

let getIndexDataSize = () => 1;

let _createTypeArrays = (buffer, count: int) => {
  let offset = ref(0);
  let vertices =
    Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=count * getVertexDataSize());
  offset := count * Float32Array._BYTES_PER_ELEMENT * getVertexDataSize();
  let indices =
    Uint32Array.fromBufferRange(buffer, ~offset=offset^, ~length=count * getIndexDataSize());
  offset := count * Uint32Array._BYTES_PER_ELEMENT * getIndexDataSize();
  (buffer, vertices, indices)
};

let _getBufferSize = () =>
  Float32Array._BYTES_PER_ELEMENT
  * getVertexDataSize()
  + Uint32Array._BYTES_PER_ELEMENT
  * getIndexDataSize();

let _getBufferCount = (state: StateDataType.state) =>
  BufferConfigSystem.getBufferConfig(state).geometryPointDataBufferCount;

let _getBufferLength = (state: StateDataType.state) => _getBufferCount(state) * _getBufferSize();

let _initBufferData = (state: StateDataType.state) => {
  let buffer = ArrayBuffer.make(_getBufferLength(state));
  let count = _getBufferCount(state);
  _createTypeArrays(buffer, count)
};

let initData = (state: StateDataType.state) => {
  let (buffer, vertices, indices) = _initBufferData(state);
  state.geometryData =
    Some({
      index: 0,
      buffer,
      vertices,
      indices,
      verticesInfoList: ArraySystem.createEmpty(),
      indicesInfoList: ArraySystem.createEmpty(),
      verticesOffset: 0,
      indicesOffset: 0,
      configDataMap: HashMapSystem.createEmpty(),
      computeDataFuncMap: HashMapSystem.createEmpty(),
      gameObjectMap: HashMapSystem.createEmpty()
    });
  state
};