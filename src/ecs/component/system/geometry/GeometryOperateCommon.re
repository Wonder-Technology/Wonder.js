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

let getVerticesCount = (index: int, state: StateDataType.state) =>
  unsafeGetVertices(index, state) |> Float32Array.length;

let setVerticesWithArray = (index: int, data: array(float), state: StateDataType.state) => {
  let {verticesMap} as geometryData = getGeometryData(state);
  switch (getVertices(index, state)) {
  | None =>
    let typeArr =
      switch (
        GeometryTypeArrayPoolCommon.getFloat32TypeArrayFromPool(
          data |> Js.Array.length,
          geometryData.float32ArrayPoolMap
        )
      ) {
      | None => Float32Array.make(data)
      | Some(typeArr) => fillFloat32Array(typeArr, data, 0)
      };
    verticesMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr);
    state
  | Some(vertices) =>
    TypeArrayUtils.fillFloat32Array(vertices, data, 0) |> ignore;
    state
  }
};

let setVertices = (index: int, data: Float32Array.t, state: StateDataType.state) => {
  let {verticesMap} = getGeometryData(state);
  verticesMap |> WonderCommonlib.SparseMapSystem.set(index, data);
  state
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

let getIndicesCount = (index: int, state: StateDataType.state) =>
  unsafeGetIndices(index, state) |> Uint16Array.length;

let setIndicesWithArray = (index: int, data: array(int), state: StateDataType.state) => {
  let {indicesMap} as geometryData = getGeometryData(state);
  switch (getIndices(index, state)) {
  | None =>
    let typeArr =
      switch (
        GeometryTypeArrayPoolCommon.getUint16TypeArrayFromPool(
          data |> Js.Array.length,
          geometryData.uint16ArrayPoolMap
        )
      ) {
      | None => Uint16Array.make(data)
      | Some(typeArr) => fillUint16Array(typeArr, data, 0)
      };
    indicesMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr);
    state
  | Some(indices) =>
    TypeArrayUtils.fillUint16Array(indices, data, 0);
    state
  }
};

let setIndices = (index: int, data: Uint16Array.t, state: StateDataType.state) => {
  let {indicesMap} = getGeometryData(state);
  indicesMap |> WonderCommonlib.SparseMapSystem.set(index, data);
  state
};