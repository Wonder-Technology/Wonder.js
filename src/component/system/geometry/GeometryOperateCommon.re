open Contract;

open GeometryStateCommon;

open Js.Typed_array;

open TypeArrayUtils;

open GeometryType;

open StateDataType;

let getVertices = (index: int, state: StateDataType.state) => {
  let {verticesMap} = getGeometryData(state);
  verticesMap |> WonderCommonlib.SparseMapSystem.get(index)
};

let unsafeGetVertices = (index: int, state: StateDataType.state) => {
  let {verticesMap} = getGeometryData(state);
  verticesMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "vertices should exist",
             () => verticesMap |> WonderCommonlib.SparseMapSystem.get(index) |> assertExist
           )
         )
     )
};

let setVerticesWithArray = (index: int, data: array(float), state: StateDataType.state) => {
  let {verticesMap} = getGeometryData(state);
  switch (getVertices(index, state)) {
  | None =>
    verticesMap |> WonderCommonlib.SparseMapSystem.set(index, Float32Array.make(data));
    state
  | Some(vertices) =>
    TypeArrayUtils.fillFloat32Array(vertices, data, 0);
    state
  }
};

let setVertices = (index: int, data: Float32Array.t, state: StateDataType.state) => {
  let {verticesMap} = getGeometryData(state);
  verticesMap |> WonderCommonlib.SparseMapSystem.set(index, data)
};

let getIndices = (index: int, state: StateDataType.state) => {
  let {indicesMap} = getGeometryData(state);
  indicesMap |> WonderCommonlib.SparseMapSystem.get(index)
};

let unsafeGetIndices = (index: int, state: StateDataType.state) => {
  let {indicesMap} = getGeometryData(state);
  indicesMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "indices should exist",
             () => indicesMap |> WonderCommonlib.SparseMapSystem.get(index) |> assertExist
           )
         )
     )
};

let setIndicesWithArray = (index: int, data: array(int), state: StateDataType.state) => {
  let {indicesMap} = getGeometryData(state);
  switch (getIndices(index, state)) {
  | None =>
    indicesMap |> WonderCommonlib.SparseMapSystem.set(index, Uint16Array.make(data));
    state
  | Some(indices) =>
    TypeArrayUtils.fillUint16Array(indices, data, 0);
    state
  }
};

let setIndices = (index: int, data: Uint16Array.t, state: StateDataType.state) => {
  let {indicesMap} = getGeometryData(state);
  indicesMap |> WonderCommonlib.SparseMapSystem.set(index, data)
};