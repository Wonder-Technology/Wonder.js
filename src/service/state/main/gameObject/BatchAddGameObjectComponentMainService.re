open MainStateDataType;

open VboBufferType;

open ComponentType;

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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );

let _batchAddComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      handleAddComponentFunc,
      componentRecord
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
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
    (uidArr: array(int), componentArr: array(component), {gameObjectRecord} as state) => {
  ...state,
  transformRecord:
    Some(
      _batchAddComponent(
        (uidArr, componentArr, gameObjectRecord.transformMap),
        AddTransformService.handleAddComponent,
        state |> RecordTransformMainService.getRecord
      )
    )
};

let batchAddMeshRendererComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {meshRendererRecord, gameObjectRecord} as state
    ) => {
  ...state,
  meshRendererRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.meshRendererMap),
      AddMeshRendererService.handleAddComponent,
      meshRendererRecord
    )
};

let _batchAddSharableComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      increaseGroupCountFunc,
      record
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       [@bs]
       (
         (record, uid, index) => {
           let component = Array.unsafe_get(componentArr, index);
           componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
           [@bs] increaseGroupCountFunc(component, record)
         }
       ),
       record
     )
};

let _batchAddSharableGeometryComponent =
    (
      (uidArr: array(int), componentArr: array(component), dataTupleForBatchAddComponentDataFunc),
      increaseGroupCountFunc,
      batchAddComponentDataFunc,
      record
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       [@bs]
       (
         (record, uid, index) => {
           let component = Array.unsafe_get(componentArr, index);
           [@bs] batchAddComponentDataFunc(dataTupleForBatchAddComponentDataFunc, component, uid)
           |> ignore;
           [@bs] increaseGroupCountFunc(component, record)
         }
       ),
       record
     )
};

let _batchAddBoxGeometryComponentDataForClone =
  [@bs]
  (
    ((currentGeometryDataMap, type_), component, uid) =>
      /* let component = Array.unsafe_get(componentArr, index); */
      CurrentComponentDataMapService.addToMap(
        uid,
        (
          component,
          /* CurrentComponentDataMapService.getBoxGeometryType(), */
          type_
          /* bufferMapTuple,
             (
               VerticesBoxGeometryMainService.getVertices,
               NormalsBoxGeometryMainService.getNormals,
               IndicesBoxGeometryMainService.getIndices,
               IndicesBoxGeometryMainService.getIndicesCount
             ) */
        ),
        currentGeometryDataMap
      )
  );

let batchAddBoxGeometryComponentForClone =
    (uidArr: array(int), componentArr: array(component), {gameObjectRecord} as state) => {
  /* let {boxGeometryVertexBufferMap, boxGeometryNormalBufferMap, boxGeometryElementArrayBufferMap} = vboBufferRecord; */
  ...state,
  boxGeometryRecord:
    Some(
      _batchAddSharableGeometryComponent(
        (
          uidArr,
          componentArr,
          (
            gameObjectRecord.currentGeometryDataMap,
            CurrentComponentDataMapService.getBoxGeometryType()
            /* (
                 boxGeometryVertexBufferMap,
                 boxGeometryNormalBufferMap,
                 boxGeometryElementArrayBufferMap
               ) */
          )
        ),
        GroupBoxGeometryService.increaseGroupCount,
        _batchAddBoxGeometryComponentDataForClone,
        state |> RecordBoxGeometryMainService.getRecord
      )
    )
};

let _batchAddCustomGeometryComponentDataForClone =
  [@bs]
  (
    ((currentGeometryDataMap, type_), component, uid) =>
      /* let component = Array.unsafe_get(componentArr, index); */
      CurrentComponentDataMapService.addToMap(
        uid,
        (
          component,
          /* CurrentComponentDataMapService.getCustomGeometryType(), */
          type_
          /* bufferMapTuple,
             (
               VerticesCustomGeometryMainService.getVertices,
               NormalsCustomGeometryMainService.getNormals,
               IndicesCustomGeometryMainService.getIndices,
               IndicesCustomGeometryMainService.getIndicesCount
             ) */
        ),
        currentGeometryDataMap
      )
  );

let batchAddCustomGeometryComponentForClone =
    (uidArr: array(int), componentArr: array(component), {gameObjectRecord} as state) => {
  /* let {
       customGeometryVertexBufferMap,
       customGeometryNormalBufferMap,
       customGeometryElementArrayBufferMap
     } = vboBufferRecord; */
  ...state,
  customGeometryRecord:
    Some(
      _batchAddSharableGeometryComponent(
        (
          uidArr,
          componentArr,
          (
            gameObjectRecord.currentGeometryDataMap,
            CurrentComponentDataMapService.getCustomGeometryType()
            /* (
                 customGeometryVertexBufferMap,
                 customGeometryNormalBufferMap,
                 customGeometryElementArrayBufferMap
               ) */
          )
        ),
        GroupCustomGeometryService.increaseGroupCount,
        _batchAddCustomGeometryComponentDataForClone,
        state |> RecordCustomGeometryMainService.getRecord
      )
    )
};

let _batchAddMaterialComponentForClone =
    (
      isShareBasicMaterial,
      (uidArr: array(int), componentArr: array(component), componentMap),
      (increaseGroupCountFunc, handleAddComponentFunc),
      record
    ) =>
  isShareBasicMaterial ?
    _batchAddSharableComponent(
      (uidArr, componentArr, componentMap),
      increaseGroupCountFunc,
      record
    ) :
    _batchAddComponent((uidArr, componentArr, componentMap), handleAddComponentFunc, record);

let batchAddBasicMaterialComponentForClone =
    (
      isShareMaterial,
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state
    ) => {
  ...state,
  basicMaterialRecord:
    Some(
      _batchAddMaterialComponentForClone(
        isShareMaterial,
        (uidArr, componentArr, gameObjectRecord.basicMaterialMap),
        (GroupBasicMaterialService.increaseGroupCount, AddBasicMaterialService.handleAddComponent),
        RecordBasicMaterialMainService.getRecord(state)
      )
    )
};

let batchAddLightMaterialComponentForClone =
    (
      isShareMaterial,
      uidArr: array(int),
      componentArr: array(component),
      {gameObjectRecord} as state
    ) => {
  ...state,
  lightMaterialRecord:
    Some(
      _batchAddMaterialComponentForClone(
        isShareMaterial,
        (uidArr, componentArr, gameObjectRecord.lightMaterialMap),
        (GroupLightMaterialService.increaseGroupCount, AddLightMaterialService.handleAddComponent),
        RecordLightMaterialMainService.getRecord(state)
      )
    )
};

let batchAddAmbientLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {ambientLightRecord, gameObjectRecord} as state
    ) => {
  ...state,
  ambientLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.ambientLightMap),
      AddAmbientLightService.handleAddComponent,
      ambientLightRecord
    )
};

let batchAddDirectionLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {directionLightRecord, gameObjectRecord} as state
    ) => {
  ...state,
  directionLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.directionLightMap),
      AddDirectionLightService.handleAddComponent,
      directionLightRecord
    )
};

let batchAddPointLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {pointLightRecord, gameObjectRecord} as state
    ) => {
  ...state,
  pointLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.pointLightMap),
      AddPointLightService.handleAddComponent,
      pointLightRecord
    )
};