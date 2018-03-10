open GeometryGetStateDataCommon;

open Js.Typed_array;

open TypeArrayService;

open GeometryType;

open StateDataType;

open GeometryOperateCommon;

let getNormals = (index: int, state: StateDataType.state) =>
  getPoints(index, getGeometryData(state).normalsMap);

let unsafeGetNormals = (index: int, state: StateDataType.state) =>
  unsafeGetPoints(index, getGeometryData(state).normalsMap);

let setNormalsWithArray = (index: int, data: array(float), state: StateDataType.state) => {
  let {normalsMap} as geometryData = getGeometryData(state);
  {
    ...state,
    geometryData: {
      ...geometryData,
      normalsMap:
        setPointsWithArray(
          (index, getNormals(index, state), data, normalsMap),
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

let setNormals = (index: int, data: Float32Array.t, state: StateDataType.state) => {
  let {normalsMap} as geometryData = getGeometryData(state);
  {...state, geometryData: {...geometryData, normalsMap: normalsMap |> setPoints(index, data)}}
};