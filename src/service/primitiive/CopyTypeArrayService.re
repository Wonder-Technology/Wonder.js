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
  arr |> Js.Array.map((typeArr) => copyFloat32Array(typeArr));

/* let deepCopyUint16ArrayArray = (arr: array(Uint16Array.t)) =>
   arr
   |> WonderCommonlib.ArrayService.reduceOneParam(
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
  |> Js.Array.map(
       (itemArr) =>
         SparseMapService.isDeleted(itemArr) ?
           Js.Nullable.empty |> Obj.magic : itemArr |> Js.Array.copy
     );

let copyArrayBuffer = (buffer) => buffer |> Js.Typed_array.ArrayBuffer.sliceFrom(0);

let copyFloat32TypeArrayFromBuffer = (buffer) => Js.Typed_array.Float32Array.fromBuffer(buffer);

let copyFloat32TypeArrayFromBufferRange = (buffer, offset, length) =>
  Js.Typed_array.Float32Array.fromBufferRange(buffer, ~offset, ~length);

let copyUint8TypeArrayFromBuffer = (buffer) => Js.Typed_array.Uint8Array.fromBuffer(buffer);