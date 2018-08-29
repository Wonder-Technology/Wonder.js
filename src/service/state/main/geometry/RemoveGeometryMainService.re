open StateDataMainType;

open GeometryType;

let _handleRemoveComponent = (gameObject, geometry: geometry, geometryRecord) =>
  GroupGeometryService.removeGameObject(gameObject, geometry, geometryRecord);

let handleRemoveComponent = (gameObject, geometry: geometry, state) => {
  let geometryRecord = state |> RecordGeometryMainService.getRecord;

  {
    ...state,
    geometryRecord:
      Some(_handleRemoveComponent(gameObject, geometry, geometryRecord)),
  };
};

let handleBatchRemoveComponent = (geometryDataArray, state) => {
  ...state,
  geometryRecord:
    Some(
      geometryDataArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. geometryRecord, (gameObject, geometry)) =>
             _handleRemoveComponent(gameObject, geometry, geometryRecord),
           state |> RecordGeometryMainService.getRecord,
         ),
    ),
};