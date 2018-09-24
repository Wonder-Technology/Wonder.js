open StateDataMainType;

open LightMaterialType;

let _handleRemoveComponent = (gameObject, lightMaterial, lightMaterialRecord) =>
  GroupLightMaterialService.removeGameObject(
    gameObject,
    lightMaterial,
    lightMaterialRecord,
  );

let handleRemoveComponent = (gameObject, lightMaterial, state) => {
  let lightMaterialRecord = state |> RecordLightMaterialMainService.getRecord;

  {
    ...state,
    lightMaterialRecord:
      Some(
        _handleRemoveComponent(
          gameObject,
          lightMaterial,
          lightMaterialRecord,
        ),
      ),
  };
};

let handleBatchRemoveComponent = (lightMaterialDataArray, state) => {
  ...state,
  lightMaterialRecord:
    Some(
      lightMaterialDataArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. lightMaterialRecord, (gameObject, lightMaterial)) =>
             _handleRemoveComponent(
               gameObject,
               lightMaterial,
               lightMaterialRecord,
             ),
           state |> RecordLightMaterialMainService.getRecord,
         ),
    ),
};