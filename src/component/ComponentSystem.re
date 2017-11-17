open ComponentType;

let addComponentToGameObjectMap = (component: component, gameObjectUId: string, gameObjectMap) =>
  WonderCommonlib.HashMapSystem.set(Js.Int.toString(component), gameObjectUId, gameObjectMap)
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

let generateIndex = (maxCount: int, index, disposedIndexArray) =>
  switch index {
  | index when index >= maxCount =>
    switch (_getDisposedIndex(disposedIndexArray)) {
    | None =>
      ExceptionHandleSystem.throwMessage(
        {j|have create too many components(the count of transforms shouldn't exceed $maxCount)|j}
      )
    | Some(index) => index
    }
  | index =>
    /* transformData.index = succ(index); */
    index
  };