open ComponentSystem;

open Js.Typed_array;

open Contract;

open TypeArrayUtils;

open GeometryStateUtils;

open GeometryType;

open StateDataType;

open Gl;

/* let create = (state: StateDataType.state) => {
     let {index, mappedIndex, mappedIndexMap, aliveIndexArray} as data = getGeometryData(state);
     data.index = succ(index);
     data.mappedIndex = succ(mappedIndex);
     GeometryIndexUtils.setMappedIndex((index), mappedIndex, mappedIndexMap) |> ignore;
     aliveIndexArray |> Js.Array.push(index) |> ignore;
     (state, index)
   }; */
let getVertices =
  [@bs]
  (
    (mappedIndex: int, state: StateDataType.state) =>
      GeometryOperateDataUtils.getVertices(mappedIndex, state)
  );

let setVertices = (mappedIndex: int, data: Float32Array.t, state: StateDataType.state) =>
  GeometryOperateDataUtils.setVerticesWithTypeArray(mappedIndex, data, state);

let getIndices =
  [@bs]
  (
    (mappedIndex: int, state: StateDataType.state) =>
      GeometryOperateDataUtils.getIndices(mappedIndex, state)
  );

let setIndices = (mappedIndex: int, data: Uint16Array.t, state: StateDataType.state) =>
  GeometryOperateDataUtils.setIndicesWithTypeArray(mappedIndex, data, state);

let getIndicesCount =
  CacheUtils.memorizeIntState(
    [@bs]
    (
      (mappedIndex: int, state: StateDataType.state) =>
        Uint16Array.length([@bs] getIndices(mappedIndex, state))
    ),
    [@bs] ((state: StateDataType.state) => getGeometryData(state).indicesCountCacheMap)
  );

let hasIndices = (mappedIndex: int, state: StateDataType.state) =>
  getIndicesCount(mappedIndex, state) > 0;

let getVerticesCount =
  CacheUtils.memorizeIntState(
    [@bs]
    (
      (mappedIndex: int, state: StateDataType.state) =>
        Float32Array.length([@bs] getVertices(mappedIndex, state))
    ),
    [@bs] ((state: StateDataType.state) => getGeometryData(state).verticesCountCacheMap)
  );

let getDrawMode = (gl) => getTriangles(gl);

/* todo handle UInt32Array */
let getIndexType = (gl) => getUnsignedShort(gl);

let getIndexTypeSize = (gl) => Uint16Array._BYTES_PER_ELEMENT;

let init = (state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose any geometry before init",
          () => GeometryDisposeComponentUtils.isNotDisposed(getGeometryData(state)) |> assertTrue
        )
      )
  );
  let {index, mappedIndexMap} = getGeometryData(state);
  ArraySystem.range(0, index - 1)
  |> Js.Array.forEach(
       (geometryIndex: int) =>
         GeometryInitComponentUtils.initGeometry(
           GeometryIndexUtils.getMappedIndex(geometryIndex, mappedIndexMap),
           state
         )
         |> ignore
     );
  state
};

let getConfigData = (geometry: geometry, state: StateDataType.state) =>
  GeometryConfigDataUtils.getConfigData(geometry, state);

let getGameObject = (mappedGeometry: geometry, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(mappedGeometry, getGeometryData(state).gameObjectMap);

let getVertexDataSize = () => 3;

let getIndexDataSize = () => 1;

let isAlive = (geometry: geometry, state: StateDataType.state) =>
  GeometryDisposeComponentUtils.isAlive(geometry, state);

let _createTypeArrays = (buffer, count: int) => {
  let offset = ref(0);
  let vertices =
    Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=count * getVertexDataSize());
  offset := count * Float32Array._BYTES_PER_ELEMENT * getVertexDataSize();
  let indices =
    Uint16Array.fromBufferRange(buffer, ~offset=offset^, ~length=count * getIndexDataSize());
  offset := count * Uint16Array._BYTES_PER_ELEMENT * getIndexDataSize();
  (buffer, vertices, indices)
};

let _getBufferSize = () =>
  Float32Array._BYTES_PER_ELEMENT
  * getVertexDataSize()
  + Uint16Array._BYTES_PER_ELEMENT
  * getIndexDataSize();

let _getBufferCount = (state: StateDataType.state) =>
  BufferConfigSystem.getConfig(state).geometryPointDataBufferCount;

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
      mappedIndex: 0,
      buffer,
      vertices,
      indices,
      verticesInfoArray: WonderCommonlib.ArraySystem.createEmpty(),
      indicesInfoArray: WonderCommonlib.ArraySystem.createEmpty(),
      verticesOffset: 0,
      indicesOffset: 0,
      configDataMap: SparseMapSystem.createEmpty(),
      computeDataFuncMap: SparseMapSystem.createEmpty(),
      gameObjectMap: SparseMapSystem.createEmpty(),
      disposeCount: 0,
      disposedIndexMap: SparseMapSystem.createEmpty(),
      mappedIndexMap: SparseMapSystem.createEmpty(),
      aliveIndexArray: WonderCommonlib.ArraySystem.createEmpty(),
      indicesCountCacheMap: SparseMapSystem.createEmpty(),
      verticesCountCacheMap: SparseMapSystem.createEmpty(),
      isClonedMap: SparseMapSystem.createEmpty()
    });
  state
};