/* let getGroupCount = (component: int, groupCountMap) =>
     switch (groupCountMap |> WonderCommonlib.MutableSparseMapService.get(component)) {
     | None => 0
     | Some(count) => count
     };

   let isGroupComponent = (component: int, groupCountMap) =>
     getGroupCount(component, groupCountMap) > 0;

   let increaseGroupCount = (component: int, groupCountMap) =>
     groupCountMap
     |> WonderCommonlib.MutableSparseMapService.set(
          component,
          getGroupCount(component, groupCountMap) |> succ
        );

   let decreaseGroupCount = (component: int, groupCountMap) =>
     groupCountMap
     |> WonderCommonlib.MutableSparseMapService.set(
          component,
          getGroupCount(component, groupCountMap) |> pred
        ); */

let isGroup = (geometry, gameObjectsMap) =>
  switch (GameObjectsMapService.getGameObjects(geometry, gameObjectsMap)) {
  | Some(arr) when arr |> Js.Array.length > 1 => true
  | _ => false
  };

let removeGameObject = (gameObject, geometry, gameObjectsMap) =>
  GameObjectsMapService.removeGameObject(
    gameObject,
    geometry,
    gameObjectsMap,
  );