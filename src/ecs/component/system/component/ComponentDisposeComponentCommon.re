open ComponentType;

let isAlive = (component, disposedIndexArray: array(int)) =>
  ! Js.Array.includes(component, disposedIndexArray);

/* TODO refactor: remove */
let checkComponentShouldAlive = (component, isAlive, state: StateDataType.state) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|dispose the alive component|j}, ~actual={j|not|j}),
        () => isAlive(component, state) |> assertTrue
      )
    )
  );

/* TODO refactor: remove */
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

let batchRemoveFromArray = (map, arr) =>
  arr
  |> Js.Array.filter((value) => map |> WonderCommonlib.SparseMapSystem.has(value) == false);