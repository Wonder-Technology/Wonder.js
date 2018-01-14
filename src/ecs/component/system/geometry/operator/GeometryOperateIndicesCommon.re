open GeometryGetStateDataCommon;

open Js.Typed_array;

open TypeArrayUtils;

open GeometryType;

open StateDataType;

open GeometryOperateCommon;

let getIndices = (index: int, state: StateDataType.state) =>
  getPoints(index, getGeometryData(state).indicesMap);

let unsafeGetIndices = (index: int, state: StateDataType.state) =>
  unsafeGetPoints(index, getGeometryData(state).indicesMap);

let getIndicesCount = (index: int, state: StateDataType.state) =>
  unsafeGetIndices(index, state) |> Uint16Array.length;

let setIndicesWithArray = (index: int, data: array(int), state: StateDataType.state) =>
  setPointsWithArray(
    (index, getIndices(index, state), data, getGeometryData(state).indicesMap),
    (
      TypeArrayPoolSystem.getUint16TypeArrayFromPool,
      TypeArrayUtils.fillUint16Array,
      TypeArrayUtils.makeUint16Array
    ),
    state
  );

let setIndices = (index: int, data: Uint16Array.t, state: StateDataType.state) => {
  setPoints(index, getGeometryData(state).indicesMap, data) |> ignore;
  state
};