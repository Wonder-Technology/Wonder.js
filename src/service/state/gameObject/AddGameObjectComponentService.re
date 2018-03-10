/* open GameObjectType;

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

   let addTransformComponent = (uid: int, component: component, (componentRecord, gameObjectRecord)) => (
     _addComponent(
       (uid, component, gameObjectRecord.transformMap),
       AddTransformService.handleAddComponent,
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

   let batchAddTransformComponentForClone =
       (
         uidArr: array(int),
         componentArr: array(component),
         (componentRecord, gameObjectRecord) as recordTuple
       ) =>
     _batchAddComponent(
       (uidArr, componentArr, gameObjectRecord.transformMap),
       AddTransformService.handleAddComponent,
       recordTuple
     ); */
open StateDataType;

open GameObjectType;

open ComponentType;

let _addComponent = ((uid, component, componentMap), handleAddComponentFunc, componentRecord) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  [@bs] handleAddComponentFunc(component, uid, componentRecord)
};

let addBasicCameraViewComponent =
    (uid: int, component: component, {basicCameraViewRecord, gameObjectRecord} as state) => {
  ...state,
  basicCameraViewRecord:
    _addComponent(
      (uid, component, gameObjectRecord.basicCameraViewMap),
      AddBasicCameraViewService.handleAddComponent,
      basicCameraViewRecord
    )
};

let addPerspectiveCameraProjectionComponent =
    (
      uid: int,
      component: component,
      {perspectiveCameraProjectionRecord, gameObjectRecord} as state
    ) => {
  ...state,
  perspectiveCameraProjectionRecord:
    _addComponent(
      (uid, component, gameObjectRecord.perspectiveCameraProjectionMap),
      AddPerspectiveCameraProjectionService.handleAddComponent,
      perspectiveCameraProjectionRecord
    )
};

let addTransformComponent =
    (uid: int, component: component, {transformRecord, gameObjectRecord} as state) => {
  ...state,
  transformRecord:
    _addComponent(
      (uid, component, gameObjectRecord.transformMap),
      AddTransformService.handleAddComponent,
      transformRecord
    )
};

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

/* let _batchAddComponent =
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
         {basicCameraViewRecord, gameObjectRecord} as state
       ) =>
     _batchAddComponent(
       (uidArr, componentArr, gameObjectRecord.basicCameraViewMap),
       AddBasicCameraViewService.handleAddComponent,
       (basicCameraViewRecord, gameObjectRecord)
     );

   let batchAddPerspectiveCameraProjectionComponentForClone =
       (
         uidArr: array(int),
         componentArr: array(component),
         {perspectiveCameraProjectionRecord, gameObjectRecord} as state
       ) =>
     _batchAddComponent(
       (uidArr, componentArr, gameObjectRecord.perspectiveCameraProjectionMap),
       AddPerspectiveCameraProjectionService.handleAddComponent,
       (perspectiveCameraProjectionRecord, gameObjectRecord)
     );

   let batchAddTransformComponentForClone =
       (
         uidArr: array(int),
         componentArr: array(component),
         {transformRecord, gameObjectRecord} as state
       ) =>
     _batchAddComponent(
       (uidArr, componentArr, gameObjectRecord.transformMap),
       AddTransformService.handleAddComponent,
       (transformRecord, gameObjectRecord)
     ); */
let _batchAddComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      handleAddComponentFunc,
      componentRecord
    ) => {
  _checkBatchAdd(uidArr, componentArr);
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
     )
};

let batchAddBasicCameraViewComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {basicCameraViewRecord, gameObjectRecord} as state
    ) => {
  ...state,
  basicCameraViewRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.basicCameraViewMap),
      AddBasicCameraViewService.handleAddComponent,
      basicCameraViewRecord
    )
};

let batchAddPerspectiveCameraProjectionComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {perspectiveCameraProjectionRecord, gameObjectRecord} as state
    ) => {
  ...state,
  perspectiveCameraProjectionRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.perspectiveCameraProjectionMap),
      AddPerspectiveCameraProjectionService.handleAddComponent,
      perspectiveCameraProjectionRecord
    )
};

let batchAddTransformComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {transformRecord, gameObjectRecord} as state
    ) => {
  ...state,
  transformRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.transformMap),
      AddTransformService.handleAddComponent,
      transformRecord
    )
};