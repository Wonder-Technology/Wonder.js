let length = Js.Array.length;

let copy = Js.Array.copy;

let getValidValues = (map) =>
  map |> Js.Array.filter((value) => value |> Obj.magic !== Js.Undefined.empty);

let getValidKeys = (map) =>
  map
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (arr, value, key) =>
           if (value |> Obj.magic === Js.Undefined.empty) {
             arr
           } else {
             arr |> Js.Array.push(key) |> ignore;
             arr
           }
       ),
       [||]
     );

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

let reduceiValid = (func, initValue, map) =>
  map
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (previousValue, value, index) =>
           if (value |> Obj.magic === Js.Undefined.empty) {
             previousValue
           } else {
             [@bs] func(previousValue, value, index)
           }
       ),
       initValue
     );