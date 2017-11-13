open ComponentType;

let addComponentToGameObjectMap = (component: component, gameObjectUId: string, gameObjectMap) =>
  WonderCommonlib.HashMapSystem.set(Js.Int.toString(component), gameObjectUId, gameObjectMap) |> ignore;

let getComponentGameObject = (component: component, gameObjectMap) =>
  WonderCommonlib.HashMapSystem.get(Js.Int.toString(component), gameObjectMap);
