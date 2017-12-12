open Js.Typed_array;

let addFloat32TypeArrayToPool = (typeArray: Float32Array.t, pool) => {
  pool |> Js.Array.push(typeArray) |> ignore;
  pool
};

let getFloat32TypeArrayFromPool = (pool) => pool |> Js.Array.pop;