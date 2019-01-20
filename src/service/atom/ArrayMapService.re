let addValue = (key, value, arrayMap) =>
  switch (arrayMap |> WonderCommonlib.MutableSparseMapService.get(key)) {
  | None => arrayMap |> WonderCommonlib.MutableSparseMapService.set(key, [|value|])
  | Some(valueArr) =>
    valueArr |> ArrayService.push(value) |> ignore;
    arrayMap;
  };

let addValueWithoutDuplicate = (key, value, arrayMap) =>
  switch (arrayMap |> WonderCommonlib.MutableSparseMapService.get(key)) {
  | None => arrayMap |> WonderCommonlib.MutableSparseMapService.set(key, [|value|])
  | Some(valueArr) =>
    valueArr |> Js.Array.includes(value) ?
      arrayMap :
      {
        valueArr |> ArrayService.push(value) |> ignore;
        arrayMap;
      }
  };

let removeValue = (key, value, arrayMap) =>
  switch (arrayMap |> WonderCommonlib.MutableSparseMapService.get(key)) {
  | None => arrayMap
  | Some(arr) =>
    arr |> DisposeComponentService.removeFromArray(value) |> ignore;

    arrayMap;
  };

let checkDuplicate = (expectedMessage, key, value, arrayMap) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(~expect=expectedMessage, ~actual={j|not|j}),
          () =>
          switch (arrayMap |> WonderCommonlib.MutableSparseMapService.get(key)) {
          | None => assertPass()
          | Some(arr) =>
            let (map, hasDuplicateItems) =
              arr
              |> WonderCommonlib.ArrayService.reduceOneParam(
                   (. (map, hasDuplicateItems), value) =>
                     switch (
                       map |> WonderCommonlib.MutableSparseMapService.get(value)
                     ) {
                     | None => (
                         map
                         |> WonderCommonlib.MutableSparseMapService.set(value, true),
                         hasDuplicateItems,
                       )
                     | Some(_) => (map, true)
                     },
                   (WonderCommonlib.MutableSparseMapService.createEmpty(), false),
                 );

            hasDuplicateItems |> assertFalse;
          }
        )
      )
    )
  );