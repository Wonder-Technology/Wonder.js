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

let batchRemoveGeometryComponent = (state, geometryDataMap) =>
  RemoveGeometryMainService.handleBatchRemoveComponent(
    geometryDataMap,
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

let batchRemoveBasicMaterialComponent = (state, basicMaterialDataMap) =>
  RemoveBasicMaterialMainService.handleBatchRemoveComponent(
    basicMaterialDataMap,
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

let batchRemoveLightMaterialComponent = (state, lightMaterialDataMap) =>
  RemoveLightMaterialMainService.handleBatchRemoveComponent(
    lightMaterialDataMap,
    state,
  );