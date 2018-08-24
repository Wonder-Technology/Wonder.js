let isDeleted = item => item |> Obj.magic |> Js.Nullable.test;

let length = Js.Array.length;

let copy = Js.Array.copy;

/* let getFirst = map =>
   map |> length === 0 ? None : Some(Array.unsafe_get(map, 0)); */

let filter = Js.Array.filter;

let getValidValues = map =>
  map |> Js.Array.filter(value => value |> Obj.magic !== Js.Undefined.empty);

let getValidKeys = map =>
  map
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. arr, value, key) =>
         if (value |> Obj.magic === Js.Undefined.empty) {
           arr;
         } else {
           arr |> Js.Array.push(key) |> ignore;
           arr;
         },
       [||],
     );

let map = (func, map) => map |> Js.Array.map(value => func(. value));

let mapValid = (func, map) =>
  map
  |> Js.Array.map(value =>
       if (value |> Obj.magic === Js.Undefined.empty) {
         value;
       } else {
         func(. value);
       }
     );

let forEachValid = (func, map) =>
  map
  |> WonderCommonlib.ArrayService.forEach((. value) =>
       if (value |> Obj.magic === Js.Undefined.empty) {
         ();
       } else {
         func(. value);
       }
     );

let forEachiValid = (func, map) =>
  map
  |> WonderCommonlib.ArrayService.forEachi((. value, index) =>
       if (value |> Obj.magic === Js.Undefined.empty) {
         ();
       } else {
         func(. value, index);
       }
     );

let reducei = WonderCommonlib.ArrayService.reduceOneParami;

let reduceValid = (func, initValue, map) =>
  map
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. previousValue, value) =>
         if (value |> Obj.magic === Js.Undefined.empty) {
           previousValue;
         } else {
           func(. previousValue, value);
         },
       initValue,
     );

let reduceiValid = (func, initValue, map) =>
  map
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. previousValue, value, index) =>
         if (value |> Obj.magic === Js.Undefined.empty) {
           previousValue;
         } else {
           func(. previousValue, value, index);
         },
       initValue,
     );

let indexOf = (targetValue, map) => map |> Js.Array.indexOf(targetValue);

let mergeSparseMaps = mapArr =>
  mapArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. resultMap, map) =>
         map
         |> reduceiValid(
              (. resultMap, value, key) =>
                resultMap |> WonderCommonlib.SparseMapService.set(key, value),
              resultMap,
            ),
       WonderCommonlib.SparseMapService.createEmpty(),
     );