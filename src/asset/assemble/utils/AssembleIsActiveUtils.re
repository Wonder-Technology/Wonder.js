let doesGameObjectHasIsActiveData =
    (gameObjectIndex, gameObjects: WDType.gameObjects) =>
  gameObjects.isActives
  |> WonderCommonlib.MutableSparseMapService.get(gameObjectIndex)
  |> Js.Option.isSome;

let unsafeGetGameObjectIsActiveData =
    (gameObjectIndex, gameObjects: WDType.gameObjects) =>
  gameObjects.isActives
  |> WonderCommonlib.MutableSparseMapService.unsafeGet(gameObjectIndex);