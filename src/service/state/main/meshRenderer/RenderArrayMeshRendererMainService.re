open StateDataMainType;

open GameObjectType;

open MeshRendererType;

let _setRenderGameObject =
    (
      meshRenderer: meshRenderer,
      gameObject: gameObject,
      renderGameObjectMap: renderGameObjectMap,
    ) =>
  renderGameObjectMap
  |> WonderCommonlib.SparseMapService.set(meshRenderer, gameObject);

let addToRenderGameObjectMap =
    (
      meshRenderer,
      gameObjectUid,
      {basicMaterialRenderGameObjectMap, lightMaterialRenderGameObjectMap} as meshRendererRecord,
      gameObjectRecord,
    ) => {
  ...meshRendererRecord,
  basicMaterialRenderGameObjectMap:
    HasComponentGameObjectService.hasBasicMaterialComponent(
      gameObjectUid,
      gameObjectRecord,
    ) ?
      basicMaterialRenderGameObjectMap
      |> _setRenderGameObject(meshRenderer, gameObjectUid) :
      basicMaterialRenderGameObjectMap,
  lightMaterialRenderGameObjectMap:
    HasComponentGameObjectService.hasLightMaterialComponent(
      gameObjectUid,
      gameObjectRecord,
    ) ?
      lightMaterialRenderGameObjectMap
      |> _setRenderGameObject(meshRenderer, gameObjectUid) :
      lightMaterialRenderGameObjectMap,
};