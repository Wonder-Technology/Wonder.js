let doesGameObjectHasIsRootData =
    (gameObjectIndex, gameObjects: WDType.gameObjects) =>
  gameObjects.isRoots
  |> WonderCommonlib.MutableSparseMapService.get(gameObjectIndex)
  |> Js.Option.isSome;

let unsafeGetGameObjectIsRootData =
    (gameObjectIndex, gameObjects: WDType.gameObjects) =>
  gameObjects.isRoots
  |> WonderCommonlib.MutableSparseMapService.unsafeGet(gameObjectIndex);