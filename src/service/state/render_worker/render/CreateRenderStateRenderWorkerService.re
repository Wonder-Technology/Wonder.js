open StateRenderType;

open GPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerBasicMaterialType;

open RenderWorkerTransformType;

open RenderWorkerBoxGeometryType;

open RenderWorkerRenderType;

open DeviceManagerType;

open ShaderType;

let createRenderState =
    (
      {
        settingRecord,
        gpuDetectRecord,
        glslSenderRecord,
        programRecord,
        /* ambientLightRecord,
           directionLightRecord,
           pointLightRecord,
           sourceInstanceRecord, */
        renderRecord,
        vboBufferRecord,
        typeArrayPoolRecord,
        globalTempRecord,
        deviceManagerRecord,
        shaderRecord
      } as state: StateDataRenderWorkerType.renderWorkerState
    ) => {
  let {localToWorldMatrices, localPositions, normalMatrixCacheMap} =
    RecordTransformRenderWorkerService.getRecord(state);
  let boxGeometryRecord = RecordBoxGeometryRenderWorkerService.getRecord(state);
  /* let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state); */
  let basicMaterialRecord = RecordBasicMaterialRenderWorkerService.getRecord(state);
  /* let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state); */
  /* let {index, colors} = ambientLightRecord;
     let {index, colors, intensities} = directionLightRecord;
     let {index, colors, intensities, constants, linears, quadratics, ranges} = pointLightRecord; */
  /* let {
       objectInstanceTransformArrayMap,
       matrixInstanceBufferCapacityMap,
       matrixFloat32ArrayMap,
       isTransformStaticMap,
       isSendTransformMatrixDataMap
     } = sourceInstanceRecord; */
  {
    settingRecord: {gpu: settingRecord.gpu},
    glslSenderRecord,
    programRecord,
    boxGeometryRecord: {
      vertices: boxGeometryRecord.vertices,
      normals: boxGeometryRecord.normals,
      indices: boxGeometryRecord.indices
    },
    /* TODO finish Obj.magic */
    customGeometryRecord: Obj.magic(1),
    cameraRecord: OperateRenderRenderWorkerService.unsafeGetCameraRecord(state),
    basicMaterialRecord: {colors: basicMaterialRecord.colors},
    lightMaterialRecord: Obj.magic(1),
    ambientLightRecord: Obj.magic(1),
    directionLightRecord: Obj.magic(1),
    pointLightRecord: Obj.magic(1),
    vboBufferRecord,
    typeArrayPoolRecord,
    transformRecord: {localToWorldMatrices, localPositions, normalMatrixCacheMap},
    sourceInstanceRecord: Obj.magic(1),
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    shaderRecord: {index: shaderRecord.index}
  }
};