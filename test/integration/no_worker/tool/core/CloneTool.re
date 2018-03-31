open GameObjectAPI;

open GameObjectAPI;

let getFlattenClonedGameObjectArr = (clonedGameObjectArr) =>
  clonedGameObjectArr |> WonderCommonlib.ArrayService.flatten;

let cloneGameObject = (gameObject, count, isShareMaterial, state) =>
  GameObjectAPI.cloneGameObject(
    gameObject,
    count,
    Js.Boolean.to_js_boolean(isShareMaterial),
    state
  );

let cloneWithBoxGeometry = (state, gameObject1, geometry1, count) => {
  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, count, false, state);
  (
    state,
    gameObject1,
    geometry1,
    clonedGameObjectArr |> getFlattenClonedGameObjectArr,
    clonedGameObjectArr
    |> getFlattenClonedGameObjectArr
    |> Js.Array.map(
         (clonedGameObject) => BoxGeometryTool.unsafeGetBoxGeometryComponent(clonedGameObject, state)
       )
  )
};

let cloneWithCustomGeometry = (state, gameObject1, geometry1, count) => {
  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, count, false, state);
  (
    state,
    gameObject1,
    geometry1,
    clonedGameObjectArr |> getFlattenClonedGameObjectArr,
    clonedGameObjectArr
    |> getFlattenClonedGameObjectArr
    |> Js.Array.map(
         (clonedGameObject) => CustomGeometryTool.unsafeGetCustomGeometryComponent(clonedGameObject, state)
       )
  )
};

let cloneWithBasicMaterial = (state, gameObject1, material1, count, isShareMaterial) => {
  let (state, clonedGameObjectArr) = cloneGameObject(gameObject1, count, isShareMaterial, state);
  (
    state,
    gameObject1,
    material1,
    clonedGameObjectArr |> getFlattenClonedGameObjectArr,
    clonedGameObjectArr
    |> getFlattenClonedGameObjectArr
    |> Js.Array.map(
         (clonedGameObject) => unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state)
       )
  )
};