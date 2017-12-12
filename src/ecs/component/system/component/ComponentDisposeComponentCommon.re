open ComponentType;

open Contract;

let isAlive = (component, disposedIndexArray: array(int)) =>
  ! Js.Array.includes(component, disposedIndexArray);

let checkComponentShouldAlive = (component, isAlive, state: StateDataType.state) =>
  test(
    "shouldn't dispose the component which isn't alive",
    () => isAlive(component, state) |> assertTrue
  );

let disposeSparseMapData = (component: int, map) => {
  map |> Obj.magic |> WonderCommonlib.SparseMapSystem.deleteVal(component);
  map
};

let removeFromArray = (target: int, arr) => {
  let index = arr |> Js.Array.indexOf(target);
  let lastIndex = arr |> Js.Array.length |> pred;
  arr |> ArraySystem.deleteBySwap(index, lastIndex);
  arr
};

let batchRemoveFromArray = (disposedMap, arr) =>
  arr
  |> Js.Array.filter((value) => disposedMap |> WonderCommonlib.SparseMapSystem.has(value) == false);