open StateRenderType;

open GPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerBasicMaterialType;

open RenderWorkerLightMaterialType;

open RenderWorkerAmbientLightType;

open RenderWorkerDirectionLightType;

open RenderWorkerPointLightType;

open RenderWorkerTransformType;

open RenderWorkerBoxGeometryType;

open RenderWorkerRenderType;

open RenderWorkerWorkerDetectType;

open DeviceManagerType;

open ShaderType;

let createRenderState =
    (
      {
        settingRecord,
        gpuDetectRecord,
        glslSenderRecord,
        programRecord,
        renderRecord,
        vboBufferRecord,
        typeArrayPoolRecord,
        globalTempRecord,
        deviceManagerRecord,
        shaderRecord
      } as state: StateDataRenderWorkerType.renderWorkerState
    ) => {
  let {localToWorldMatrices, localPositions, localToWorldMatrixCacheMap, normalMatrixCacheMap} as transformRecord =
    RecordTransformRenderWorkerService.getRecord(state);
  let boxGeometryRecord = RecordBoxGeometryRenderWorkerService.getRecord(state);
  let customGeometryRecord = RecordCustomGeometryRenderWorkerService.getRecord(state);
  let basicMaterialRecord = RecordBasicMaterialRenderWorkerService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialRenderWorkerService.getRecord(state);
  let ambientLightRecord = RecordAmbientLightRenderWorkerService.getRecord(state);
  let directionLightRecord = RecordDirectionLightRenderWorkerService.getRecord(state);
  let pointLightRecord = RecordPointLightRenderWorkerService.getRecord(state);
  let workerDetectRecord = RecordWorkerDetectRenderWorkerService.getRecord(state);
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
    customGeometryRecord: {
      vertices: customGeometryRecord.vertices,
      normals: customGeometryRecord.normals,
      indices: customGeometryRecord.indices,
      verticesInfos: customGeometryRecord.verticesInfos,
      normalsInfos: customGeometryRecord.normalsInfos,
      indicesInfos: customGeometryRecord.indicesInfos
    },
    cameraRecord: OperateRenderRenderWorkerService.getCameraRecord(state),
    basicMaterialRecord: {
      shaderIndices: basicMaterialRecord.shaderIndices,
      colors: basicMaterialRecord.colors
    },
    lightMaterialRecord: {
      shaderIndices: lightMaterialRecord.shaderIndices,
      diffuseColors: lightMaterialRecord.diffuseColors,
      specularColors: lightMaterialRecord.specularColors,
      shininess: lightMaterialRecord.shininess
    },
    ambientLightRecord: {index: ambientLightRecord.index, colors: ambientLightRecord.colors},
    directionLightRecord: {
      index: directionLightRecord.index,
      colors: directionLightRecord.colors,
      intensities: directionLightRecord.intensities,
      positionMap: RecordRenderWorkerDirectionLightService.getPositionMap(directionLightRecord)
    },
    pointLightRecord: {
      index: pointLightRecord.index,
      colors: pointLightRecord.colors,
      intensities: pointLightRecord.intensities,
      constants: pointLightRecord.constants,
      linears: pointLightRecord.linears,
      quadratics: pointLightRecord.quadratics,
      ranges: pointLightRecord.ranges,
      positionMap: RecordRenderWorkerPointLightService.getPositionMap(pointLightRecord)
    },
    vboBufferRecord,
    typeArrayPoolRecord,
    transformRecord: {
      localToWorldMatrices,
      localPositions,
      localToWorldMatrixCacheMap,
      normalMatrixCacheMap
    },
    /* TODO fix Obj.magic */
    sourceInstanceRecord: Obj.magic(1),
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    shaderRecord: {index: shaderRecord.index},
    workerDetectRecord: {isUseWorker: workerDetectRecord.isUseWorker}
  }
};