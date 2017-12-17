open Js.Typed_array;

open StateDataType;

open TypeArrayPoolType;

let getTypeArrayPoolData = (state: StateDataType.state) => state.typeArrayPoolData;

let getFloat32ArrayPoolMap = (state: StateDataType.state) =>
  getTypeArrayPoolData(state).float32ArrayPoolMap;

let getUint16ArrayPoolMap = (state: StateDataType.state) =>
  getTypeArrayPoolData(state).uint16ArrayPoolMap;

let _addTypeArrayToPool = (count, typeArray, map) =>
  switch (map |> WonderCommonlib.SparseMapSystem.get(count)) {
  | Some(arr) =>
    arr |> Js.Array.push(typeArray) |> ignore;
    map
  | None => map |> WonderCommonlib.SparseMapSystem.set(count, [|typeArray|])
  };

let addFloat32TypeArrayToPool = (typeArray: Float32Array.t, map) =>
  _addTypeArrayToPool(typeArray |> Float32Array.length, typeArray, map);

let addUint16TypeArrayToPool = (typeArray: Uint16Array.t, map) =>
  _addTypeArrayToPool(typeArray |> Uint16Array.length, typeArray, map);

let _getTypeArrayFromPool = (count, map) =>
  switch (map |> WonderCommonlib.SparseMapSystem.get(count)) {
  | None => None
  | Some(arr) =>
    switch (arr |> Js.Array.length) {
    | 0 => None
    | _ => arr |> Js.Array.pop
    }
  };

let getFloat32TypeArrayFromPool = (count, state: StateDataType.state) =>
  _getTypeArrayFromPool(count, state |> getFloat32ArrayPoolMap);

let getUint16TypeArrayFromPool = (count, state: StateDataType.state) =>
  _getTypeArrayFromPool(count, state |> getUint16ArrayPoolMap);

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