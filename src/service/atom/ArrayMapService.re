let addValue = (key, value, arrayMap) => {
  let (has, valueArr) = MutableSparseMapService.fastGet(key, arrayMap);

  has ?
    {
      valueArr |> ArrayService.push(value) |> ignore;
      arrayMap;
    } :
    arrayMap |> WonderCommonlib.MutableSparseMapService.set(key, [|value|]);
};

let addValueWithoutDuplicate = (key, value, arrayMap) => {
  let (has, valueArr) = MutableSparseMapService.fastGet(key, arrayMap);

  has ?
    valueArr |> Js.Array.includes(value) ?
      arrayMap :
      {
        valueArr |> ArrayService.push(value) |> ignore;
        arrayMap;
      } :
    arrayMap |> WonderCommonlib.MutableSparseMapService.set(key, [|value|]);
};

let removeValue = (key, value, arrayMap) => {
  let (has, arr) = MutableSparseMapService.fastGet(key, arrayMap);

  has ?
    {
      arr |> DisposeComponentService.removeFromArray(value) |> ignore;

      arrayMap;
    } :
    arrayMap;
};

let batchRemoveValueArr = (key, valueArr, arrayMap) => {
  let (has, arr) = MutableSparseMapService.fastGet(key, arrayMap);

  has ?
    arrayMap
    |> WonderCommonlib.MutableSparseMapService.set(
         key,
         ArrayService.batchRemove(valueArr, arr),
       ) :
    arrayMap;
};

let checkDuplicate = (expectedMessage, key, value, arrayMap) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(~expect=expectedMessage, ~actual={j|not|j}),
          () =>
          switch (
            arrayMap |> WonderCommonlib.MutableSparseMapService.get(key)
          ) {
          | None => assertPass()
          | Some(arr) =>
            let (map, hasDuplicateItems) =
              arr
              |> WonderCommonlib.ArrayService.reduceOneParam(
                   (. (map, hasDuplicateItems), value) =>
                     switch (
                       map
                       |> WonderCommonlib.MutableSparseMapService.get(value)
                     ) {
                     | None => (
                         map
                         |> WonderCommonlib.MutableSparseMapService.set(
                              value,
                              true,
                            ),
                         hasDuplicateItems,
                       )
                     | Some(_) => (map, true)
                     },
                   (
                     WonderCommonlib.MutableSparseMapService.createEmpty(),
                     false,
                   ),
                 );

            hasDuplicateItems |> assertFalse;
          }
        )
      )
    )
  );