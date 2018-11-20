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
      {
        isBasicMaterialRenderGameObjectMapForDeepCopy,
        isLightMaterialRenderGameObjectMapForDeepCopy,
        basicMaterialRenderGameObjectMap,
        lightMaterialRenderGameObjectMap,
      } as meshRendererRecord,
      gameObjectRecord,
    ) => {
  let hasBasicMaterialComponent =
    HasComponentGameObjectService.hasBasicMaterialComponent(
      gameObjectUid,
      gameObjectRecord,
    );

  let hasLightMaterialComponent =
    HasComponentGameObjectService.hasLightMaterialComponent(
      gameObjectUid,
      gameObjectRecord,
    );

  {
    ...meshRendererRecord,
    isBasicMaterialRenderGameObjectMapForDeepCopy:
      hasBasicMaterialComponent ?
        true : isBasicMaterialRenderGameObjectMapForDeepCopy,
    isLightMaterialRenderGameObjectMapForDeepCopy:
      hasLightMaterialComponent ?
        true : isLightMaterialRenderGameObjectMapForDeepCopy,
    basicMaterialRenderGameObjectMap:
      hasBasicMaterialComponent ?
        basicMaterialRenderGameObjectMap
        |> _setRenderGameObject(meshRenderer, gameObjectUid) :
        basicMaterialRenderGameObjectMap,
    lightMaterialRenderGameObjectMap:
      hasLightMaterialComponent ?
        lightMaterialRenderGameObjectMap
        |> _setRenderGameObject(meshRenderer, gameObjectUid) :
        lightMaterialRenderGameObjectMap,
  };
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