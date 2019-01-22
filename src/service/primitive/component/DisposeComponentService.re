let isAlive = (component, disposedIndexArray: array(int)) =>
  ! Js.Array.includes(component, disposedIndexArray);

let checkComponentShouldAlive = (component, isAliveFunc, record) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(
          ~expect={j|dispose the alive component|j},
          ~actual={j|not|j},
        ),
        () =>
        isAliveFunc(component, record) |> assertTrue
      )
    )
  );

let checkComponentShouldAliveWithBatchDispose =
    (componentArr, isAliveFunc, record) =>
  componentArr
  |> WonderCommonlib.ArrayService.forEach((. component) =>
       checkComponentShouldAlive(component, isAliveFunc, record)
     );

let disposeSparseMapData = (component: int, map) =>
  map |> WonderCommonlib.MutableSparseMapService.deleteVal(component);

let removeFromArray = (target: int, arr) => {
  let index = arr |> Js.Array.indexOf(target);

  index === (-1) ?
    arr :
    {
      let lastIndex = arr |> Js.Array.length |> pred;
      arr |> ArrayService.deleteBySwap(index, lastIndex);
      arr;
    };
};

let batchRemoveFromArray = (map, arr) =>
  map |> WonderCommonlib.MutableSparseMapService.length === 0 ?
    arr :
    arr
    |> Js.Array.filter(value =>
         map |> WonderCommonlib.MutableSparseMapService.has(value) == false
       );