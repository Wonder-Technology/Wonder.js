let isAlive = (component, disposedIndexArray: array(int)) =>
  ! Js.Array.includes(component, disposedIndexArray);

let checkComponentShouldAlive = (component, isAliveFunc, record) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|dispose the alive component|j}, ~actual={j|not|j}),
        () => isAliveFunc(component, record) |> assertTrue
      )
    )
  );

let checkComponentShouldAliveWithBatchDispose = (componentArr, isAliveFunc, record) =>
  componentArr
  |> WonderCommonlib.ArrayService.forEach(
       [@bs] ((component) => checkComponentShouldAlive(component, isAliveFunc, record))
     );

let disposeSparseMapData = (component: int, map) =>
  map |> Obj.magic |> WonderCommonlib.SparseMapService.deleteVal(component) |> Obj.magic;

let removeFromArray = (target: int, arr) => {
  let index = arr |> Js.Array.indexOf(target);
  let lastIndex = arr |> Js.Array.length |> pred;
  arr |> ArrayService.deleteBySwap(index, lastIndex);
  arr
};

let batchRemoveFromArray = (map, arr) =>
  map |> SparseMapService.length === 0 ?
    arr :
    arr |> Js.Array.filter((value) => map |> WonderCommonlib.SparseMapService.has(value) == false);