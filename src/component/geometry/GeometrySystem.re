open Js.Typed_array;

open Contract;

open TypeArrayUtils;

open GeometryStateUtils;

open GeometryType;

open StateDataType;

open Gl;

let create = (state: StateDataType.state) => {
  let data = getGeometryData(state);
  let index = data.index;
  data.index = succ(data.index);
  (state, index)
};

let _ensureCheckNotExceedGeometryPointDataBufferCount = (offset: int, state: StateDataType.state) =>
  state
  |> ensureCheck(
       (state) =>
         Contract.Operators.(
           test(
             "should not exceed geometryPointDataBufferCount",
             () => offset <= BufferConfigSystem.getBufferConfig(state).geometryPointDataBufferCount
           )
         )
     );

let _buildInfo = (startIndex: int, endIndex: int) => {startIndex, endIndex};

let _getFloat32PointData = (index: int, points: Float32Array.t, infoList) =>
  switch infoList[index] {
  | None => ExceptionHandlerSystem.throwMessage({j|infoList[$index] should exist|j})
  | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
  };

let _setFloat32PointData =
    (
      index: int,
      data: Js.Array.t(float),
      points: Float32Array.t,
      infoList: geometryInfoList,
      offset: int
    ) => {
  let count = Js.Array.length(data);
  let startIndex = offset;
  let newOffset = offset + count;
  Array.unsafe_set(infoList, index, Some(_buildInfo(startIndex, newOffset)));
  fillFloat32Arr(points, data, startIndex);
  newOffset
};

/* todo refactor: reduce duplicate: merge with _getFloat32PointData/_setFloat32PointData */
let _getUint32PointData = (index: int, points: Uint32Array.t, infoList) => {
  requireCheck(
    () =>
      Contract.Operators.(test("info should exist", () => index <= Js.Array.length(infoList) - 1))
  );
  switch infoList[index] {
  | None => ExceptionHandlerSystem.throwMessage({j|infoList[$index] should exist|j})
  | Some({startIndex, endIndex}) => getUint32ArrSubarray(points, startIndex, endIndex)
  }
};

let _setUint32PointData =
    (index: int, data: Js.Array.t(int), points: Uint32Array.t, infoList, offset: int) => {
  let count = Js.Array.length(data);
  let startIndex = offset;
  let newOffset = offset + count;
  Array.unsafe_set(infoList, index, Some(_buildInfo(startIndex, newOffset)));
  fillUint32Arr(points, data, startIndex);
  newOffset
};

let getVertices = (index: int, state: StateDataType.state) => {
  let {vertices, verticesInfoList} = getGeometryData(state);
  _getFloat32PointData(index, vertices, verticesInfoList)
};

let setVertices = (index: int, data: Js.Array.t(float), state: StateDataType.state) => {
  let {verticesInfoList, vertices, verticesOffset} as geometryData = getGeometryData(state);
  geometryData.verticesOffset =
    _setFloat32PointData(index, data, vertices, verticesInfoList, verticesOffset);
  state |> _ensureCheckNotExceedGeometryPointDataBufferCount(getGeometryData(state).verticesOffset)
};

let getIndices = (index: int, state: StateDataType.state) => {
  let {indices, indicesInfoList} = getGeometryData(state);
  _getUint32PointData(index, indices, indicesInfoList)
};

let setIndices = (index: int, data: Js.Array.t(int), state: StateDataType.state) => {
  let {indicesInfoList, indices, indicesOffset} as geometryData = getGeometryData(state);
  geometryData.indicesOffset =
    _setUint32PointData(index, data, indices, indicesInfoList, indicesOffset);
  state |> _ensureCheckNotExceedGeometryPointDataBufferCount(getGeometryData(state).indicesOffset)
};

let getVerticesCount = (index: int, state: StateDataType.state) =>
  Float32Array.length(getVertices(index, state));

let getIndicesCount = (index: int, state: StateDataType.state) =>
  Uint32Array.length(getIndices(index, state));

let hasIndices = (index: int, state: StateDataType.state) => getIndicesCount(index, state) > 0;

let getVerticesCount = (index: int, state: StateDataType.state) =>
  Float32Array.length(getVertices(index, state));

let getDrawMode = (gl) => getTriangles(gl);

/* todo handle UInt16Array */
let getIndexType = (gl) => getUnsignedInt(gl);

let getIndexTypeSize = (gl) => Uint32Array._BYTES_PER_ELEMENT;

let _initGeometry = (index: int, state: StateDataType.state) => {
  let geometryData = getGeometryData(state);
  switch (geometryData.computeDataFuncMap |> HashMapSystem.get(Js.Int.toString(index))) {
  | None => ()
  | Some(computeDataFunc) =>
    let {vertices, indices}: geometryComputeData = computeDataFunc(index, state);
    /* todo compute normals */
    state |> setVertices(index, vertices) |> setIndices(index, indices) |> ignore
  }
};

let init = (state: StateDataType.state) => {
  let {index} = getGeometryData(state);
  /* todo check shouldn't dispose geometry before init */
  ArraySystem.range(0, index - 1)
  |> Js.Array.forEach((geometryIndex: int) => _initGeometry(geometryIndex, state));
  state
};

let getConfigData = (geometry: geometry, state: StateDataType.state) =>
  JsObjUtils.(
    getGeometryData(state).configDataMap |> HashMapSystem.get(Js.Int.toString(geometry))
  );

let getGameObject = (geometry: geometry, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(geometry, getGeometryData(state).gameObjectMap);

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