open GeometryType;

let isGroupGeometry = (geometry, record) =>
  switch (record |> GameObjectGeometryService.getGameObjects(geometry)) {
  | Some(arr) when arr |> Js.Array.length > 1 => true
  | _ => false
  };

let removeGameObject = (gameObject, geometry, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GameObjectsMapService.removeGameObject(
      gameObject,
      geometry,
      gameObjectsMap,
    ),
};