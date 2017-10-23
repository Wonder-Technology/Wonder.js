open StateDataType;

open ComponentType;

let addComponentToGameObjectMap
    (component: component)
    (gameObjectUId: string)
    ({gameObjectMap} as data) => {
  HashMapSystem.set (Js.Int.toString component) gameObjectUId gameObjectMap |> ignore;
  data
};

let getComponentGameObject (component: component) {gameObjectMap} =>
  HashMapSystem.get gameObjectMap (Js.Int.toString component);