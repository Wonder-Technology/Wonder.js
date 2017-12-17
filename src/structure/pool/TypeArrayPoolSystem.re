open Js.Typed_array;

open StateDataType;

open TypeArrayPoolType;

let getTypeArrayPoolData = (state: StateDataType.state) => state.typeArrayPoolData;

let getFloat32ArrayPoolMap = (state: StateDataType.state) =>
  getTypeArrayPoolData(state).float32ArrayPoolMap;

let getUint16ArrayPoolMap = (state: StateDataType.state) =>
  getTypeArrayPoolData(state).uint16ArrayPoolMap;

let addFloat32TypeArrayToPool = (typeArray: Float32Array.t, map) =>
  map |> WonderCommonlib.SparseMapSystem.set(typeArray |> Float32Array.length, typeArray);

let getFloat32TypeArrayFromPool = (count, state: StateDataType.state) =>
  state |> getFloat32ArrayPoolMap |> WonderCommonlib.SparseMapSystem.get(count);

let addUint16TypeArrayToPool = (typeArray: Uint16Array.t, map) =>
  map |> WonderCommonlib.SparseMapSystem.set(typeArray |> Uint16Array.length, typeArray);

let getUint16TypeArrayFromPool = (count, state: StateDataType.state) =>
  state |> getUint16ArrayPoolMap |> WonderCommonlib.SparseMapSystem.get(count);

let addAllFloat32TypeArrayToPool = (typeArrayMap: array(Float32Array.t), map) => {
  typeArrayMap
  |> SparseMapSystem.forEachiValid(
       [@bs] ((typeArray, index) => addFloat32TypeArrayToPool(typeArray, map) |> ignore)
     );
  map
};

let addAllUint16TypeArrayToPool = (typeArrayMap: array(Uint16Array.t), map) => {
  typeArrayMap
  |> SparseMapSystem.forEachiValid(
       [@bs] ((typeArray, index) => addUint16TypeArrayToPool(typeArray, map) |> ignore)
     );
  map
};

let deepCopyState = (state: StateDataType.state) => {
  ...state,
  typeArrayPoolData: {
    float32ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty(),
    uint16ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty()
  }
};

let restoreFromState =
    (
      currentState,
      {float32ArrayPoolMap, uint16ArrayPoolMap}: sharedDataForRestoreState,
      targetState
    ) => {
  ...targetState,
  typeArrayPoolData: {float32ArrayPoolMap, uint16ArrayPoolMap}
};