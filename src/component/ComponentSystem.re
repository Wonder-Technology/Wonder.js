open ComponentType;

let addComponentToGameObjectMap = (component: component, gameObjectUid: string, gameObjectMap) =>
  WonderCommonlib.HashMapSystem.set(Js.Int.toString(component), gameObjectUid, gameObjectMap)
  |> ignore;

let getComponentGameObject = (component: component, gameObjectMap) =>
  WonderCommonlib.HashMapSystem.get(Js.Int.toString(component), gameObjectMap);

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