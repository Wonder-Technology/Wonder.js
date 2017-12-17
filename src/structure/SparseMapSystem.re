let length = Js.Array.length;

let copy = Js.Array.copy;

let getValidValues = (map) =>
  map |> Js.Array.filter((value) => value |> Obj.magic !== Js.Undefined.empty);

let forEachValid = (func, map) =>
  map
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (value) =>
           if (value |> Obj.magic === Js.Undefined.empty) {
             ()
           } else {
             [@bs] func(value)
           }
       )
     );

let forEachiValid = (func, map) =>
  map
  |> WonderCommonlib.ArraySystem.forEachi(
       [@bs]
       (
         (value, index) =>
           if (value |> Obj.magic === Js.Undefined.empty) {
             ()
           } else {
             [@bs] func(value, index)
           }
       )
     );