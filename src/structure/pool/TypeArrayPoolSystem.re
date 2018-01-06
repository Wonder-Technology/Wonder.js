open Js.Typed_array;

open StateDataType;

open TypeArrayPoolType;

let getTypeArrayPoolData = (state: StateDataType.state) => state.typeArrayPoolData;

let getFloat32ArrayPoolMap = (state: StateDataType.state) =>
  getTypeArrayPoolData(state).float32ArrayPoolMap;

let getUint16ArrayPoolMap = (state: StateDataType.state) =>
  getTypeArrayPoolData(state).uint16ArrayPoolMap;

let _addTypeArrayToPool = (count, typeArray, maxSize, map) =>
  switch (map |> WonderCommonlib.SparseMapSystem.get(count)) {
  | Some(arr) =>
    switch (arr |> Js.Array.length) {
    | len when len >= maxSize => map
    | _ =>
      arr |> Js.Array.push(typeArray) |> ignore;
      map
    }
  | None => map |> WonderCommonlib.SparseMapSystem.set(count, [|typeArray|])
  };

let addFloat32TypeArrayToPool = (typeArray: Float32Array.t, maxSize, map) =>
  _addTypeArrayToPool(typeArray |> Float32Array.length, typeArray, maxSize, map);

let addUint16TypeArrayToPool = (typeArray: Uint16Array.t, maxSize, map) =>
  _addTypeArrayToPool(typeArray |> Uint16Array.length, typeArray, maxSize, map);

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

let addAllFloat32TypeArrayToPool = (typeArrayMap: array(Float32Array.t), maxSize, map) => {
  typeArrayMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((typeArray) => addFloat32TypeArrayToPool(typeArray, maxSize, map) |> ignore)
     );
  map
};

let addAllUint16TypeArrayToPool = (typeArrayMap: array(Uint16Array.t), maxSize, map) => {
  typeArrayMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((typeArray) => addUint16TypeArrayToPool(typeArray, maxSize, map) |> ignore)
     );
  map
};

let deepCopyStateForRestore = (state: StateDataType.state) => {
  ...state,
  typeArrayPoolData: {
    float32ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty(),
    uint16ArrayPoolMap: WonderCommonlib.SparseMapSystem.createEmpty()
  }
};

let restore =
    (
      currentState,
      {float32ArrayPoolMap, uint16ArrayPoolMap}: sharedDataForRestoreState,
      targetState
    ) => {
  ...targetState,
  typeArrayPoolData: {float32ArrayPoolMap, uint16ArrayPoolMap}
};