open Js.Typed_array;

let copyFloat32Array = (typeArr: Float32Array.t) =>
  if (typeArr |> Obj.magic === Js.Undefined.empty) {
    Js.Undefined.empty |> Obj.magic
  } else {
    Float32Array.copy(typeArr) |> Obj.magic
  };

let copyUint16Array = (typeArr: Uint16Array.t) => Uint16Array.copy(typeArr);

let deepCopyFloat32ArrayArray = (arr: array(Float32Array.t)) =>
  arr
  /* |> Js.Array.filter((typeArr) => typeArr |> Obj.magic !== Js.Undefined.empty) */
  |> ArraySystem.reduceOneParam(
       [@bs]
       (
         (newArr, typeArr) => {
           newArr |> Js.Array.push(copyFloat32Array(typeArr)) |> ignore;
           newArr
         }
       ),
       [||]
     );