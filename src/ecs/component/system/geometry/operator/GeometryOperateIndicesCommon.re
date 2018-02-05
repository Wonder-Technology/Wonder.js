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

let setIndicesWithArray = (index: int, data: array(int), state: StateDataType.state) => {
  let {indicesMap} as geometryData = getGeometryData(state);
  {
    ...state,
    geometryData: {
      ...geometryData,
      indicesMap:
        setPointsWithArray(
          (index, getIndices(index, state), data, indicesMap),
          (
            TypeArrayPoolSystem.getUint16TypeArrayFromPool,
            TypeArrayUtils.fillUint16Array,
            TypeArrayUtils.makeUint16Array
          ),
          state
        )
    }
  }
};

let setIndices = (index: int, data: Uint16Array.t, state: StateDataType.state) => {
  let {indicesMap} as geometryData = getGeometryData(state);
  {...state, geometryData: {...geometryData, indicesMap: indicesMap |> setPoints(index, data)}}
};