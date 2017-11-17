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