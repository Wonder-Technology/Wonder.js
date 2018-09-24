open StateDataMainType;

open BasicMaterialType;

let _handleRemoveComponent = (gameObject, basicMaterial, basicMaterialRecord) =>
  GroupBasicMaterialService.removeGameObject(
    gameObject,
    basicMaterial,
    basicMaterialRecord,
  );

let handleRemoveComponent = (gameObject, basicMaterial, state) => {
  let basicMaterialRecord = state |> RecordBasicMaterialMainService.getRecord;

  {
    ...state,
    basicMaterialRecord:
      Some(
        _handleRemoveComponent(
          gameObject,
          basicMaterial,
          basicMaterialRecord,
        ),
      ),
  };
};

let handleBatchRemoveComponent = (basicMaterialDataArray, state) => {
  ...state,
  basicMaterialRecord:
    Some(
      basicMaterialDataArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. basicMaterialRecord, (gameObject, basicMaterial)) =>
             _handleRemoveComponent(
               gameObject,
               basicMaterial,
               basicMaterialRecord,
             ),
           state |> RecordBasicMaterialMainService.getRecord,
         ),
    ),
};