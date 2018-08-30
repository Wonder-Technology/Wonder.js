open MeshRendererType;

let getBasicMaterialRenderArray = ({basicMaterialRenderGameObjectMap}) =>
  basicMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

let getLightMaterialRenderArray = ({lightMaterialRenderGameObjectMap}) =>
  lightMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

/* let _isGameObjectInRenderArray =
       (meshRenderer, gameObject, materialRenderGameObjectMap) =>
     switch (
       materialRenderGameObjectMap
       |> WonderCommonlib.SparseMapService.get(meshRenderer)
     ) {
     | Some(gameObjectNeedRender) when gameObjectNeedRender === gameObject =>
       true
     | _ => false
     };

   let isGameObjectInRenderArray =
       (
         meshRenderer,
         gameObject,
         {basicMaterialRenderGameObjectMap, lightMaterialRenderGameObjectMap},
       ) =>
     _isGameObjectInRenderArray(
       meshRenderer,
       gameObject,
       basicMaterialRenderGameObjectMap,
     )
     || _isGameObjectInRenderArray(
          meshRenderer,
          gameObject,
          lightMaterialRenderGameObjectMap,
        ); */