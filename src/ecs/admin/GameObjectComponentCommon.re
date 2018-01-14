open GameObjectType;

open ComponentType;

let getComponent = (uid: int, componentMap: array(int)) : option(component) =>
  WonderCommonlib.SparseMapSystem.get(uid, componentMap);

let hasComponent = (uid: int, componentMap: array(int)) : bool =>
  Js.Option.isSome(getComponent(uid, componentMap));