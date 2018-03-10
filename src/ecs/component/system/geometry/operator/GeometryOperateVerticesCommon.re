open GeometryGetStateDataCommon;

open Js.Typed_array;

open TypeArrayService;

open GeometryType;

open StateDataType;

open GeometryOperateCommon;

let getVertices = (index: int, state: StateDataType.state) =>
  getPoints(index, getGeometryData(state).verticesMap);

let unsafeGetVertices = (index: int, state: StateDataType.state) =>
  unsafeGetPoints(index, getGeometryData(state).verticesMap);

let getVerticesCount = (index: int, state: StateDataType.state) =>
  unsafeGetVertices(index, state) |> Float32Array.length;

let setVerticesWithArray = (index: int, data: array(float), state: StateDataType.state) => {
  let {verticesMap} as geometryData = getGeometryData(state);
  {
    ...state,
    geometryData: {
      ...geometryData,
      verticesMap:
        setPointsWithArray(
          (index, getVertices(index, state), data, verticesMap),
          (
            TypeArrayPoolService.getFloat32TypeArrayFromPool,
            TypeArrayService.fillFloat32Array,
            TypeArrayService.makeFloat32Array
          ),
          state
        )
    }
  }
};

let setVertices = (index: int, data: Float32Array.t, state: StateDataType.state) => {
  let {verticesMap} as geometryData = getGeometryData(state);
  {...state, geometryData: {...geometryData, verticesMap: verticesMap |> setPoints(index, data)}}
};