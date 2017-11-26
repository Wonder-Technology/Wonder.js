open GameObject;

let getFlattenClonedGameObjectArr = (clonedGameObjectArr) =>
  clonedGameObjectArr |> WonderCommonlib.ArraySystem.flatten;

let cloneWithGeometry = (state, gameObject1, geometry1, count) => {
  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, count, state);
  (
    state,
    gameObject1,
    geometry1,
    clonedGameObjectArr |> getFlattenClonedGameObjectArr,
    clonedGameObjectArr
    |> getFlattenClonedGameObjectArr
    |> Js.Array.map((clonedGameObject) => getGameObjectGeometryComponent(clonedGameObject, state))
  )
};