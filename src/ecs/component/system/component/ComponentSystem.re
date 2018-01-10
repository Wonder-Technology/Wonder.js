open ComponentType;

open Contract;

let addComponentToGameObjectMap = (component: component, gameObjectUid: int, gameObjectMap) =>
  WonderCommonlib.SparseMapSystem.set(component, gameObjectUid, gameObjectMap) |> ignore;

let getComponentGameObject = (component: component, gameObjectMap) =>
  WonderCommonlib.SparseMapSystem.get(component, gameObjectMap);

let unsafeGetComponentGameObject = (component: component, gameObjectMap) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(component, gameObjectMap)
  |> ensureCheck(
       (gameObject) =>
         Contract.Operators.(
           test("component's gameObject should exist", () => gameObject |> assertNullableExist)
         )
     );

let checkComponentShouldAlive = (component: component, isAliveFunc, state: StateDataType.state) =>
  Contract.(
    Contract.Operators.(
      test("component should alive", () => isAliveFunc(component, state) |> assertTrue)
    )
  );

let _getDisposedIndex = (disposedIndexArray) => disposedIndexArray |> Js.Array.pop;

let generateIndex = (index, disposedIndexArray) =>
  switch (_getDisposedIndex(disposedIndexArray)) {
  | None => (index, succ(index))
  | Some(disposedIndex) => (disposedIndex, index)
  };