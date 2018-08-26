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