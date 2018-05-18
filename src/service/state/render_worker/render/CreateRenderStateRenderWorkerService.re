open StateRenderType;

open GPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerBasicMaterialType;

open RenderWorkerLightMaterialType;

open RenderWorkerAmbientLightType;

open RenderWorkerDirectionLightType;

open RenderWorkerPointLightType;

open RenderWorkerBasicSourceTextureType;

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
        shaderRecord,
        browserDetectRecord
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
  let basicSourceTextureRecord = RecordBasicSourceTextureRenderWorkerService.getRecord(state);
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
  let workerDetectRecord = RecordWorkerDetectRenderWorkerService.getRecord(state);
  let browserDetectRecord = RecordBrowserDetectRenderWorkerService.getRecord(state);
  let {
    objectInstanceTransformCollections,
    matrixInstanceBufferCapacityMap,
    matrixFloat32ArrayMap,
    isTransformStatics,
    isSendTransformMatrixDataMap
  } = sourceInstanceRecord;
  {
    settingRecord: {
      gpu: settingRecord.gpu,
      instanceBuffer:
        Some({
          objectInstanceCountPerSourceInstance:
            BufferRenderWorkerSettingService.getObjectInstanceCountPerSourceInstance(settingRecord)
        }),
      textureCountPerMaterial:
        BufferRenderWorkerSettingService.getTextureCountPerMaterial(settingRecord)
    },
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
    cameraRecord: OperateRenderRenderWorkerService.getCameraRecord(state),
    basicMaterialRecord: {
      shaderIndices: RecordBasicMaterialRenderWorkerService.unsafeGetShaderIndices(state),
      colors: basicMaterialRecord.colors |> OptionService.unsafeGet,
      textureIndices: basicMaterialRecord.textureIndices |> OptionService.unsafeGet,
      mapUnits: RecordBasicMaterialRenderWorkerService.unsafeGetMapUnits(state)
    },
    lightMaterialRecord: {
      shaderIndices: RecordLightMaterialRenderWorkerService.unsafeGetShaderIndices(state),
      diffuseColors: lightMaterialRecord.diffuseColors |> OptionService.unsafeGet,
      specularColors: lightMaterialRecord.specularColors |> OptionService.unsafeGet,
      shininess: lightMaterialRecord.shininess |> OptionService.unsafeGet,
      textureIndices: lightMaterialRecord.textureIndices |> OptionService.unsafeGet,
      diffuseMapUnits: RecordLightMaterialRenderWorkerService.unsafeGetDiffuseMapUnits(state),
      specularMapUnits: RecordLightMaterialRenderWorkerService.unsafeGetSpecularMapUnits(state)
    },
    basicSourceTextureRecord: {
      wrapSs: basicSourceTextureRecord.wrapSs |> OptionService.unsafeGet,
      wrapTs: basicSourceTextureRecord.wrapTs |> OptionService.unsafeGet,
      magFilters: basicSourceTextureRecord.magFilters |> OptionService.unsafeGet,
      minFilters: basicSourceTextureRecord.minFilters |> OptionService.unsafeGet,
      formats: basicSourceTextureRecord.formats |> OptionService.unsafeGet,
      types: basicSourceTextureRecord.types |> OptionService.unsafeGet,
      isNeedUpdates: basicSourceTextureRecord.isNeedUpdates |> OptionService.unsafeGet,
      sourceMap: basicSourceTextureRecord.sourceMap |> Obj.magic,
      glTextureMap: basicSourceTextureRecord.glTextureMap,
      bindTextureUnitCacheMap: basicSourceTextureRecord.bindTextureUnitCacheMap,
      setFlipYFunc: OperateSourceTextureRenderWorkerService.setFlipY
    },
    arrayBufferViewSourceTextureRecord: {
      wrapSs: arrayBufferViewSourceTextureRecord.wrapSs |> OptionService.unsafeGet,
      wrapTs: arrayBufferViewSourceTextureRecord.wrapTs |> OptionService.unsafeGet,
      magFilters: arrayBufferViewSourceTextureRecord.magFilters |> OptionService.unsafeGet,
      minFilters: arrayBufferViewSourceTextureRecord.minFilters |> OptionService.unsafeGet,
      formats: arrayBufferViewSourceTextureRecord.formats |> OptionService.unsafeGet,
      types: arrayBufferViewSourceTextureRecord.types |> OptionService.unsafeGet,
      isNeedUpdates: arrayBufferViewSourceTextureRecord.isNeedUpdates |> OptionService.unsafeGet,
      widths: arrayBufferViewSourceTextureRecord.widths |> OptionService.unsafeGet,
      heights: arrayBufferViewSourceTextureRecord.heights |> OptionService.unsafeGet,
      sourceMap: arrayBufferViewSourceTextureRecord.sourceMap |> Obj.magic,
      glTextureMap: arrayBufferViewSourceTextureRecord.glTextureMap,
      bindTextureUnitCacheMap: arrayBufferViewSourceTextureRecord.bindTextureUnitCacheMap,
      setFlipYFunc: OperateSourceTextureRenderWorkerService.setFlipY
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
      objectInstanceTransformCollections:
        RecordRenderWorkerSourceInstanceService.unsafeGetObjectInstanceTransformCollections(
          sourceInstanceRecord
        ),
      objectInstanceTransformIndexMap:
        RecordRenderWorkerSourceInstanceService.unsafeGetObjectInstanceTransformIndexMap(
          sourceInstanceRecord
        ),
      isTransformStatics:
        RecordRenderWorkerSourceInstanceService.unsafeGetIsTransformStaticMap(sourceInstanceRecord),
      matrixInstanceBufferCapacityMap: sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      matrixFloat32ArrayMap: sourceInstanceRecord.matrixFloat32ArrayMap,
      isSendTransformMatrixDataMap: sourceInstanceRecord.isSendTransformMatrixDataMap
    },
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    shaderRecord: {index: shaderRecord.index},
    workerDetectRecord: {isUseWorker: workerDetectRecord.isUseWorker},
    browserDetectRecord: {browser: browserDetectRecord.browser}
  }
};