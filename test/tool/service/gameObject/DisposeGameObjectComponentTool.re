open StateDataMainType;

open ComponentType;

open DisposeComponentGameObjectTool;

let _dispose = (uid, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(component, state)
  | None => state
  };

let _disposeWithUid = (uid, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, state)
  | None => state
  };

let _disposeWithData =
    (uid, data, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(component, data, state)
  | None => state
  };

let _disposeWithUidAndData =
    (uid, data, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, data, state)
  | None => state
  };

let _disposeSourceInstanceComponent = (uid, batchDisposeFunc, state) =>
  switch (
    [@bs] GetComponentGameObjectService.getSourceInstanceComponent(uid, state.gameObjectRecord)
  ) {
  | Some(component) =>
    [@bs] DisposeSourceInstanceTool.handleDisposeComponent(component, batchDisposeFunc, state)
  | None => state
  };

let _disposeGameObjectGeometryComponent = (uid, {gameObjectRecord} as state) => {
  let boxGeometryType = CurrentComponentDataMapRenderService.getBoxGeometryType();
  let customGeometryType = CurrentComponentDataMapRenderService.getCustomGeometryType();
  switch ([@bs] GetComponentGameObjectService.getGeometryComponentData(uid, gameObjectRecord)) {
  | Some((component, type_)) =>
    switch type_ {
    | type_ when type_ === boxGeometryType => [@bs] disposeBoxGeometryComponent(component, state)
    | type_ when type_ === customGeometryType =>
      [@bs] disposeCustomGeometryComponent(component, state)
    }
  | None => state
  }
};

let _disposeGameObjectComponents =
    (uid, batchDisposeFunc, isKeepOrder, {gameObjectRecord} as state) =>
  state
  |> _disposeWithData(
       uid,
       isKeepOrder,
       (
         GetComponentGameObjectService.getTransformComponent,
         DisposeComponentGameObjectTool.disposeTransformComponent
       )
     )
  |> _disposeGameObjectGeometryComponent(uid)
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBasicCameraViewComponent,
         DisposeComponentGameObjectTool.disposeBasicCameraViewComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getPerspectiveCameraProjectionComponent,
         DisposeComponentGameObjectTool.disposePerspectiveCameraProjectionComponent
       )
     )
  |> _disposeWithUid(
       uid,
       (
         GetComponentGameObjectService.getMeshRendererComponent,
         DisposeComponentGameObjectTool.disposeMeshRendererComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBasicMaterialComponent,
         DisposeComponentGameObjectTool.disposeBasicMaterialComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getLightMaterialComponent,
         DisposeComponentGameObjectTool.disposeLightMaterialComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getAmbientLightComponent,
         DisposeComponentGameObjectTool.disposeAmbientLightComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getDirectionLightComponent,
         DisposeComponentGameObjectTool.disposeDirectionLightComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getPointLightComponent,
         DisposeComponentGameObjectTool.disposePointLightComponent
       )
     )
  |> _disposeSourceInstanceComponent(uid, batchDisposeFunc)
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getObjectInstanceComponent,
         DisposeComponentGameObjectTool.disposeObjectInstanceComponent
       )
     );

let dispose = (uid, batchDisposeFunc, state) =>
  _disposeGameObjectComponents(uid, batchDisposeFunc, false, state);

let disposeKeepOrder = (uid, batchDisposeFunc, state) =>
  _disposeGameObjectComponents(uid, batchDisposeFunc, true, state);