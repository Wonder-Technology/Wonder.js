open GameObjectType;

open ComponentType;

let _addComponent = ((uid, component, componentMap), handleAddComponentFunc, componentRecord) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  [@bs] handleAddComponentFunc(component, uid, componentRecord)
};

let addBasicCameraViewComponent =
    (uid: int, component: component, (componentRecord, gameObjectRecord)) => (
  _addComponent(
    (uid, component, gameObjectRecord.basicCameraViewMap),
    AddBasicCameraViewService.handleAddComponent,
    componentRecord
  ),
  gameObjectRecord
);

let addPerspectiveCameraProjectionComponent =
    (uid: int, component: component, (componentRecord, gameObjectRecord)) => (
  _addComponent(
    (uid, component, gameObjectRecord.perspectiveCameraProjectionMap),
    AddPerspectiveCameraProjectionService.handleAddComponent,
    componentRecord
  ),
  gameObjectRecord
);

let _checkBatchAdd = (uidArr, componentArr) =>
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let gameObjectCount = uidArr |> Js.Array.length;
      let componentCount = componentArr |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|one gameObject should add one component|j},
          ~actual={j|$gameObjectCount gameObject add $componentCount components|j}
        ),
        () => gameObjectCount == componentCount
      )
    },
    StateData.stateData.isDebug
  );

let _batchAddComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      handleAddComponentFunc,
      (componentRecord, gameObjectRecord)
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  (
    uidArr
    |> WonderCommonlib.ArraySystem.reduceOneParami(
         [@bs]
         (
           (componentRecord, uid, index) => {
             let component = Array.unsafe_get(componentArr, index);
             ComponentMapService.addComponent(uid, component, componentMap);
             [@bs] handleAddComponentFunc(component, uid, componentRecord)
           }
         ),
         componentRecord
       ),
    gameObjectRecord
  )
};

let batchAddBasicCameraViewComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      (componentRecord, gameObjectRecord) as recordTuple
    ) =>
  _batchAddComponent(
    (uidArr, componentArr, gameObjectRecord.basicCameraViewMap),
    AddBasicCameraViewService.handleAddComponent,
    recordTuple
  );

let batchAddPerspectiveCameraProjectionComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      (componentRecord, gameObjectRecord) as recordTuple
    ) =>
  _batchAddComponent(
    (uidArr, componentArr, gameObjectRecord.perspectiveCameraProjectionMap),
    AddPerspectiveCameraProjectionService.handleAddComponent,
    recordTuple
  );