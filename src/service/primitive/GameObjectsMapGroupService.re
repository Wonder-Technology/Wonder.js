let isGroup = (component, gameObjectsMap) =>
  switch (GameObjectsMapService.getGameObjects(component, gameObjectsMap)) {
  | Some(arr) when arr |> Js.Array.length > 0 => true
  | _ => false
  };

let removeGameObject = (gameObject, component, gameObjectsMap) =>
  GameObjectsMapService.removeGameObject(
    gameObject,
    component,
    gameObjectsMap,
  );

let batchRemoveGameObjects = (gameObjectArr, component, gameObjectsMap) =>
  GameObjectsMapService.batchRemoveGameObjects(
    gameObjectArr,
    component,
    gameObjectsMap,
  );