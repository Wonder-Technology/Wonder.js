open ComponentSystem;

open Js.Typed_array;

open Contract;

open TypeArrayUtils;

open GeometryStateCommon;

open GeometryType;

open StateDataType;

open Gl;

/* let create = (state: StateDataType.state) => {
     let {index, mappedIndex, mappedIndexMap, aliveIndexArray} as data = getGeometryData(state);
     data.index = succ(index);
     data.mappedIndex = succ(mappedIndex);
     GeometryIndexCommon.setMappedIndex((index), mappedIndex, mappedIndexMap) |> ignore;
     aliveIndexArray |> Js.Array.push(index) |> ignore;
     (state, index)



   }; */
let getMappedIndex = GeometryIndexCommon.getMappedIndex;

/* let setMappedIndex = GeometryIndexCommon.setMappedIndex; */
let getMappedIndexMap = GeometryIndexCommon.getMappedIndexMap;

/* let buildInfo = GeometryOperateCommon.buildInfo;
   let getInfo = GeometryOperateCommon.getInfo;

    */
let getGeometryData = GeometryStateCommon.getGeometryData;

let increaseGroupCount = GeometryGroupCommon.increaseGroupCount;

let handleInitComponent = GeometryInitComponentCommon.handleInitComponent;

let getVertices =
  [@bs]
  (
    (mappedIndex: int, state: StateDataType.state) =>
      GeometryOperateCommon.getVertices(mappedIndex, state)
  );

let setVertices = (mappedIndex: int, data: Float32Array.t, state: StateDataType.state) =>
  GeometryOperateCommon.setVerticesWithTypeArray(mappedIndex, data, state);

let getIndices =
  [@bs]
  (
    (mappedIndex: int, state: StateDataType.state) =>
      GeometryOperateCommon.getIndices(mappedIndex, state)
  );

let setIndices = (mappedIndex: int, data: Uint16Array.t, state: StateDataType.state) =>
  GeometryOperateCommon.setIndicesWithTypeArray(mappedIndex, data, state);

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
          () => GeometryDisposeComponentCommon.isNotDisposed(getGeometryData(state)) |> assertTrue
        )
      )
  );
  let {index, mappedIndexMap} = getGeometryData(state);
  ArraySystem.range(0, index - 1)
  |> Js.Array.forEach(
       (geometryIndex: int) =>
         GeometryInitComponentCommon.initGeometry(
           geometryIndex,
           GeometryIndexCommon.getMappedIndex(geometryIndex, mappedIndexMap),
           state
         )
         |> ignore
     );
  state
};

let getConfigData = (geometry: geometry, state: StateDataType.state) =>
  GeometryConfigDataCommon.getConfigData(geometry, state);

let getGameObject = (mappedGeometry: geometry, state: StateDataType.state) =>
  GeometryGameObjectCommon.getGameObject(mappedGeometry, state);

let isAlive = (geometry: geometry, state: StateDataType.state) =>
  GeometryDisposeComponentCommon.isAlive(geometry, state);