open StateRenderType;

open TransformType;

open BoxGeometryType;

open CustomGeometryType;

open BasicMaterialType;

open AmbientLightType;

open DirectionLightType;

open PointLightType;

open RenderSourceInstanceType;

open DeviceManagerType;

open RenderShaderType;

open RenderSettingType;

open BrowserDetectType;

let createRenderState =
    (
      {
        settingRecord,
        gpuDetectRecord,
        glslSenderRecord,
        programRecord,
        ambientLightRecord,
        directionLightRecord,
        pointLightRecord,
        vboBufferRecord,
        typeArrayPoolRecord,
        globalTempRecord,
        deviceManagerRecord,
        shaderRecord,
        browserDetectRecord
      } as state: StateDataMainType.state
    ) => {
  let {
        localToWorldMatrices,
        localPositions,
        /* copiedLocalToWorldMatrices,
           copiedLocalPositions, */
        localToWorldMatrixCacheMap,
        normalMatrixCacheMap
      } as transformRecord =
    RecordTransformMainService.getRecord(state);
  /* let {vertices, normals, indices} = RecordBoxGeometryMainService.getRecord(state); */
  let boxGeometryRecord = RecordBoxGeometryMainService.getRecord(state);
  /* let {vertices, normals, indices, verticesInfos, normalsInfos, indicesInfos} = */
  let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state);
  /* let {colors} = RecordBasicMaterialMainService.getRecord(state); */
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  let textureRecord = RecordTextureMainService.getRecord(state);
  let sourceInstanceRecord = RecordSourceInstanceMainService.getRecord(state);
  let isUseWorker = WorkerDetectMainService.isUseWorker(state);
  let renderStateTransformRecord: RenderTransformType.transformRecord =
    isUseWorker ?
      {
        localToWorldMatrices:
          transformRecord |> CopyTransformService.unsafeGetCopiedLocalToWorldMatrices,
        localPositions: transformRecord |> CopyTransformService.unsafeGetCopiedLocalPositions,
        localToWorldMatrixCacheMap,
        normalMatrixCacheMap
      } :
      {localToWorldMatrices, localPositions, localToWorldMatrixCacheMap, normalMatrixCacheMap};
  {
    glslSenderRecord,
    programRecord,
    boxGeometryRecord: {
      vertices: boxGeometryRecord.vertices,
      texCoords: boxGeometryRecord.texCoords,
      normals: boxGeometryRecord.normals,
      indices: boxGeometryRecord.indices
    },
    customGeometryRecord: {
      vertices: customGeometryRecord.vertices,
      texCoords: customGeometryRecord.texCoords,
      normals: customGeometryRecord.normals,
      indices: customGeometryRecord.indices,
      verticesInfos: customGeometryRecord.verticesInfos,
      texCoordsInfos: customGeometryRecord.texCoordsInfos,
      normalsInfos: customGeometryRecord.normalsInfos,
      indicesInfos: customGeometryRecord.indicesInfos
    },
    cameraRecord: OperateRenderMainService.getCameraRecord(state),
    basicMaterialRecord: {
      shaderIndices: basicMaterialRecord.shaderIndices,
      colors: basicMaterialRecord.colors,
      textureIndices: basicMaterialRecord.textureIndices,
      mapUnits: basicMaterialRecord.mapUnits
    },
    lightMaterialRecord: {
      shaderIndices: lightMaterialRecord.shaderIndices,
      diffuseColors: lightMaterialRecord.diffuseColors,
      specularColors: lightMaterialRecord.specularColors,
      shininess: lightMaterialRecord.shininess
    },
    textureRecord: {
      wrapSs: textureRecord.wrapSs,
      wrapTs: textureRecord.wrapTs,
      magFilters: textureRecord.magFilters,
      minFilters: textureRecord.minFilters,
      isNeedUpdates: textureRecord.isNeedUpdates,
      sourceMap: textureRecord.sourceMap,
      glTextureMap: textureRecord.glTextureMap,
      bindTextureUnitCacheMap: textureRecord.bindTextureUnitCacheMap,
      setFlipYFunc: OperateTextureMainService.setFlipY
    },
    ambientLightRecord: {index: ambientLightRecord.index, colors: ambientLightRecord.colors},
    directionLightRecord: {
      index: directionLightRecord.index,
      colors: directionLightRecord.colors,
      intensities: directionLightRecord.intensities,
      positionMap:
        PositionLightMainService.buildPositionMap(
          directionLightRecord.index,
          PositionDirectionLightMainService.getPosition,
          state
        )
    },
    pointLightRecord: {
      index: pointLightRecord.index,
      colors: pointLightRecord.colors,
      intensities: pointLightRecord.intensities,
      constants: pointLightRecord.constants,
      linears: pointLightRecord.linears,
      quadratics: pointLightRecord.quadratics,
      ranges: pointLightRecord.ranges,
      positionMap:
        PositionLightMainService.buildPositionMap(
          pointLightRecord.index,
          PositionPointLightMainService.getPosition,
          state
        )
    },
    vboBufferRecord,
    typeArrayPoolRecord,
    transformRecord: renderStateTransformRecord,
    /* sourceInstanceRecord: {
         objectInstanceTransformCollections: sourceInstanceRecord.objectInstanceTransformCollections,
         matrixInstanceBufferCapacityMap: sourceInstanceRecord.matrixInstanceBufferCapacityMap,
         matrixFloat32ArrayMap: sourceInstanceRecord.matrixFloat32ArrayMap,
         isTransformStatics: sourceInstanceRecord.isTransformStatics,
         isSendTransformMatrixDataMap: sourceInstanceRecord.isSendTransformMatrixDataMap
       }, */
    sourceInstanceRecord: {
      objectInstanceTransformCollections: sourceInstanceRecord.objectInstanceTransformCollections,
      objectInstanceTransformIndexMap: sourceInstanceRecord.objectInstanceTransformIndexMap,
      isTransformStatics: sourceInstanceRecord.isTransformStatics,
      matrixInstanceBufferCapacityMap: sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      matrixFloat32ArrayMap: sourceInstanceRecord.matrixFloat32ArrayMap,
      isSendTransformMatrixDataMap: sourceInstanceRecord.isSendTransformMatrixDataMap
    },
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    shaderRecord: {index: shaderRecord.index},
    settingRecord: {
      gpu: Some(OperateSettingService.unsafeGetGPU(settingRecord)),
      instanceBuffer:
        Some({
          objectInstanceCountPerSourceInstance:
            BufferSettingService.getObjectInstanceCountPerSourceInstance(settingRecord)
        }),
      textureCountPerMaterial:
        Some(BufferSettingService.getTextureCountPerBasicMaterial(settingRecord))
    },
    workerDetectRecord: {isUseWorker: isUseWorker},
    browserDetectRecord: {browser: browserDetectRecord.browser}
  }
};