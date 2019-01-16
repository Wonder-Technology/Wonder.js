open StateDataMainType;

open MeshRendererType;

let _setRenderGameObject =
    (
      meshRenderer: meshRenderer,
      gameObject: GameObjectPrimitiveType.gameObject,
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

let removeFromRenderGameObjectMap = (meshRenderer, state) => {
  ...state,
  meshRendererRecord:
    Some(
      RenderArrayMeshRendererService.removeFromRenderGameObjectMap(
        meshRenderer,
        RecordMeshRendererMainService.getRecord(state),
      ),
    ),
};