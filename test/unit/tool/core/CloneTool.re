open GameObject;

let getFlattenClonedGameObjectArr = (clonedGameObjectArr) =>
  clonedGameObjectArr |> WonderCommonlib.ArraySystem.flatten;

let cloneGameObject = (gameObject, count, isShareMaterial, state) =>
  GameObject.cloneGameObject(gameObject, count, Js.Boolean.to_js_boolean(isShareMaterial), state);

let cloneWithGeometry = (state, gameObject1, geometry1, count) => {
  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, count, false, state);
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

let cloneWithMaterial = (state, gameObject1, material1, count, isShareMaterial) => {
  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, count, isShareMaterial, state);
  (
    state,
    gameObject1,
    material1,
    clonedGameObjectArr |> getFlattenClonedGameObjectArr,
    clonedGameObjectArr
    |> getFlattenClonedGameObjectArr
    |> Js.Array.map((clonedGameObject) => getGameObjectMaterialComponent(clonedGameObject, state))
  )
};