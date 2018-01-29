open ComponentType;

let isAlive = (component, disposedIndexArray: array(int)) =>
  ! Js.Array.includes(component, disposedIndexArray);

let checkComponentShouldAlive = (component, isAlive, state: StateDataType.state) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|dispose the alive component|j}, ~actual={j|not|j}),
        () => isAlive(component, state) |> assertTrue
      )
    )
  );

let checkComponentShouldAliveWithBatchDispose = (componentArr, isAlive, state: StateDataType.state) =>
  componentArr
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs] ((component) => checkComponentShouldAlive(component, isAlive, state))
     );

let disposeSparseMapData = (component: int, map) =>
  map |> Obj.magic |> WonderCommonlib.SparseMapSystem.deleteVal(component) |> Obj.magic;


let removeFromArray = (target: int, arr) => {
  let index = arr |> Js.Array.indexOf(target);
  let lastIndex = arr |> Js.Array.length |> pred;
  arr |> ArraySystem.deleteBySwap(index, lastIndex);
  arr
};

let batchRemoveFromArray = (disposedMap, arr) =>
  arr
  |> Js.Array.filter((value) => disposedMap |> WonderCommonlib.SparseMapSystem.has(value) == false);