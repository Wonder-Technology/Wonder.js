open StateRenderType;

open GPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerBasicMaterialType;

open RenderWorkerLightMaterialType;

open RenderWorkerAmbientLightType;

open RenderWorkerDirectionLightType;

open RenderWorkerPointLightType;

open RenderWorkerSourceInstanceType;

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
        sourceInstanceRecord,
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
  let {
    objectInstanceTransformArrayMap,
    matrixInstanceBufferCapacityMap,
    matrixFloat32ArrayMap,
    isTransformStaticMap,
    isSendTransformMatrixDataMap
  } = sourceInstanceRecord;
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
      shaderIndices: RecordBasicMaterialRenderWorkerService.unsafeGetShaderIndices(state),
      colors: basicMaterialRecord.colors |> OptionService.unsafeGet
    },
    lightMaterialRecord: {
      shaderIndices: RecordLightMaterialRenderWorkerService.unsafeGetShaderIndices(state),
      diffuseColors: lightMaterialRecord.diffuseColors |> OptionService.unsafeGet,
      specularColors: lightMaterialRecord.specularColors |> OptionService.unsafeGet,
      shininess: lightMaterialRecord.shininess |> OptionService.unsafeGet
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
    sourceInstanceRecord: {
      objectInstanceTransformArrayMap:
        RecordRenderWorkerSourceInstanceService.unsafeGetObjectInstanceTransformArrayMap(
          sourceInstanceRecord
        ),
      matrixInstanceBufferCapacityMap: sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      matrixFloat32ArrayMap: sourceInstanceRecord.matrixFloat32ArrayMap,
      isTransformStaticMap:
        RecordRenderWorkerSourceInstanceService.unsafeGetIsTransformStaticMap(sourceInstanceRecord),
      isSendTransformMatrixDataMap: sourceInstanceRecord.isSendTransformMatrixDataMap
    },
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    shaderRecord: {index: shaderRecord.index},
    workerDetectRecord: {isUseWorker: workerDetectRecord.isUseWorker}
  }
};