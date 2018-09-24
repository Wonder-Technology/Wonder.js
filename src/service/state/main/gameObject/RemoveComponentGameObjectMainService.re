open StateDataMainType;

open ComponentType;

let _removeComponent = (uid: int, componentMap) =>
  componentMap |> ComponentMapService.removeComponent(uid) |> Obj.magic;

let removeGeometryComponent =
    (uid, component: component, {gameObjectRecord} as state) =>
  {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      geometryMap: _removeComponent(uid, gameObjectRecord.geometryMap),
    },
  }
  |> RemoveGeometryMainService.handleRemoveComponent(uid, component);

let batchRemoveGeometryComponent = (state, geometryDataArray) =>
  RemoveGeometryMainService.handleBatchRemoveComponent(
    geometryDataArray,
    state,
  );

let removeBasicMaterialComponent =
    (uid, component: component, {gameObjectRecord} as state) =>
  {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      basicMaterialMap:
        _removeComponent(uid, gameObjectRecord.basicMaterialMap),
    },
  }
  |> RemoveBasicMaterialMainService.handleRemoveComponent(uid, component);

let batchRemoveBasicMaterialComponent = (state, basicMaterialDataArray) =>
  RemoveBasicMaterialMainService.handleBatchRemoveComponent(
    basicMaterialDataArray,
    state,
  );

let removeLightMaterialComponent =
    (uid, component: component, {gameObjectRecord} as state) =>
  {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      lightMaterialMap:
        _removeComponent(uid, gameObjectRecord.lightMaterialMap),
    },
  }
  |> RemoveLightMaterialMainService.handleRemoveComponent(uid, component);

let batchRemoveLightMaterialComponent = (state, lightMaterialDataArray) =>
  RemoveLightMaterialMainService.handleBatchRemoveComponent(
    lightMaterialDataArray,
    state,
  );