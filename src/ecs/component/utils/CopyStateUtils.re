open Js.Typed_array;

let copyFloat32Array = (typeArr: Float32Array.t) =>
  if (typeArr |> Obj.magic === Js.Undefined.empty) {
    Js.Undefined.empty |> Obj.magic
  } else {
    Float32Array.copy(typeArr) |> Obj.magic
  };

/* let copyUint16Array = (typeArr: Uint16Array.t) =>
  if (typeArr |> Obj.magic === Js.Undefined.empty) {
    Js.Undefined.empty |> Obj.magic
  } else {
    Uint16Array.copy(typeArr) |> Obj.magic
  }; */

let deepCopyFloat32ArrayArray = (arr: array(Float32Array.t)) =>
  arr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (newArr, typeArr) => {
           newArr |> Js.Array.push(copyFloat32Array(typeArr)) |> ignore;
           newArr
         }
       ),
       [||]
     );

/* let deepCopyUint16ArrayArray = (arr: array(Uint16Array.t)) =>
  arr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (newArr, typeArr) => {
           newArr |> Js.Array.push(copyUint16Array(typeArr)) |> ignore;
           newArr
         }
       ),
       [||]
     ); */

let deepCopyArrayArray = (arr: array(array('a))) =>
  arr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (newArr, arr) => {
           newArr |> Js.Array.push(arr |> Js.Array.copy) |> ignore;
           newArr
         }
       ),
       [||]
     );