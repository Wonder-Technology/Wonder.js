let _createAndSetAllComponentPOs = () => {
  CreatePOTransformCPRepo.createPO()
  ->Result.mapSuccess(po => {po->CPRepo.setTransform})
  ->Result.bind(() => {
      CreatePOPBRMaterialCPRepo.createPO()
      ->Result.mapSuccess(po => {po->CPRepo.setPBRMaterial})
    })
  ->Result.bind(() => {
      CreatePOGeometryCPRepo.createPO()
      ->Result.mapSuccess(po => {po->CPRepo.setGeometry})
    })
  ->Result.bind(() => {
      CreatePODirectionLightCPRepo.createPO()
      ->Result.mapSuccess(po => {po->CPRepo.setDirectionLight})
    });
};

let _injectDependencies = () => {
  RepoDpRunAPI.set({
    sceneRepo: {
      getSceneGameObject: SceneCPRepoDp.getSceneGameObject,
      setSceneGameObject: SceneCPRepoDp.setSceneGameObject,
    },
    gameObjectRepo: {
      getMaxUID: GameObjectCPRepoDp.getMaxUID,
      setMaxUID: GameObjectCPRepoDp.setMaxUID,
      addTransform: GameObjectCPRepoDp.addTransform,
      getTransform: GameObjectCPRepoDp.getTransform,
      hasTransform: GameObjectCPRepoDp.hasTransform,
      addPBRMaterial: GameObjectCPRepoDp.addPBRMaterial,
      getPBRMaterial: GameObjectCPRepoDp.getPBRMaterial,
      hasPBRMaterial: GameObjectCPRepoDp.hasPBRMaterial,
      addGeometry: GameObjectCPRepoDp.addGeometry,
      getGeometry: GameObjectCPRepoDp.getGeometry,
      hasGeometry: GameObjectCPRepoDp.hasGeometry,
      addDirectionLight: GameObjectCPRepoDp.addDirectionLight,
      getDirectionLight: GameObjectCPRepoDp.getDirectionLight,
      hasDirectionLight: GameObjectCPRepoDp.hasDirectionLight,
      addBasicCameraView: GameObjectCPRepoDp.addBasicCameraView,
      getBasicCameraView: GameObjectCPRepoDp.getBasicCameraView,
      hasBasicCameraView: GameObjectCPRepoDp.hasBasicCameraView,
      addPerspectiveCameraProjection: GameObjectCPRepoDp.addPerspectiveCameraProjection,
      getPerspectiveCameraProjection: GameObjectCPRepoDp.getPerspectiveCameraProjection,
      hasPerspectiveCameraProjection: GameObjectCPRepoDp.hasPerspectiveCameraProjection,
      getAllGeometryGameObjects: GameObjectCPRepoDp.getAllGeometryGameObjects,
      getAllGameObjectGeometries: GameObjectCPRepoDp.getAllGameObjectGeometries,
      getAllGameObjectPBRMaterials: GameObjectCPRepoDp.getAllGameObjectPBRMaterials,
    },
    transformRepo: {
      getMaxIndex: TransformCPRepoDp.getMaxIndex,
      setMaxIndex: TransformCPRepoDp.setMaxIndex,
      getIsDirty: TransformCPRepoDp.getIsDirty,
      setIsDirty: TransformCPRepoDp.setIsDirty,
      setGameObject: TransformCPRepoDp.setGameObject,
      getGameObject: TransformCPRepoDp.getGameObject,
      hasParent: TransformCPRepoDp.hasParent,
      getParent: TransformCPRepoDp.getParent,
      setParent: TransformCPRepoDp.setParent,
      removeParent: TransformCPRepoDp.removeParent,
      getChildren: TransformCPRepoDp.getChildren,
      setChildren: TransformCPRepoDp.setChildren,
      addChild: TransformCPRepoDp.addChild,
      removeChild: TransformCPRepoDp.removeChild,
      getLocalToWorldMatrix: TransformCPRepoDp.getLocalToWorldMatrix,
      getLocalPosition: TransformCPRepoDp.getLocalPosition,
      setLocalPosition: TransformCPRepoDp.setLocalPosition,
      getLocalRotation: TransformCPRepoDp.getLocalRotation,
      setLocalRotation: TransformCPRepoDp.setLocalRotation,
      getLocalScale: TransformCPRepoDp.getLocalScale,
      setLocalScale: TransformCPRepoDp.setLocalScale,
    },
    pbrMaterialRepo: {
      getMaxIndex: PBRMaterialCPRepoDp.getMaxIndex,
      setMaxIndex: PBRMaterialCPRepoDp.setMaxIndex,
      getGameObjects: PBRMaterialCPRepoDp.getGameObjects,
      addGameObject: PBRMaterialCPRepoDp.addGameObject,
      getDiffuseColor: PBRMaterialCPRepoDp.getDiffuseColor,
      setDiffuseColor: PBRMaterialCPRepoDp.setDiffuseColor,
      getSpecular: PBRMaterialCPRepoDp.getSpecular,
      setSpecular: PBRMaterialCPRepoDp.setSpecular,
      getRoughness: PBRMaterialCPRepoDp.getRoughness,
      setRoughness: PBRMaterialCPRepoDp.setRoughness,
      getMetalness: PBRMaterialCPRepoDp.getMetalness,
      setMetalness: PBRMaterialCPRepoDp.setMetalness,
      getDiffuseMapSourceId: PBRMaterialCPRepoDp.getDiffuseMapSourceId,
      setDiffuseMapSourceId: PBRMaterialCPRepoDp.setDiffuseMapSourceId,
      getMetalRoughnessMapSourceId: PBRMaterialCPRepoDp.getMetalRoughnessMapSourceId,
      setMetalRoughnessMapSourceId: PBRMaterialCPRepoDp.setMetalRoughnessMapSourceId,
      getEmissionMapSourceId: PBRMaterialCPRepoDp.getEmissionMapSourceId,
      setEmissionMapSourceId: PBRMaterialCPRepoDp.setEmissionMapSourceId,
      getNormalMapSourceId: PBRMaterialCPRepoDp.getNormalMapSourceId,
      setNormalMapSourceId: PBRMaterialCPRepoDp.setNormalMapSourceId,
    },
    geometryRepo: {
      getMaxIndex: GeometryCPRepoDp.getMaxIndex,
      setMaxIndex: GeometryCPRepoDp.setMaxIndex,
      getGameObjects: GeometryCPRepoDp.getGameObjects,
      addGameObject: GeometryCPRepoDp.addGameObject,
      getVertices: GeometryCPRepoDp.getVertices,
      setVertices: GeometryCPRepoDp.setVertices,
      getNormals: GeometryCPRepoDp.getNormals,
      setNormals: GeometryCPRepoDp.setNormals,
      getIndices: GeometryCPRepoDp.getIndices,
      setIndices: GeometryCPRepoDp.setIndices,
      hasVertices: GeometryCPRepoDp.hasVertices,
      hasNormals: GeometryCPRepoDp.hasNormals,
      hasIndices: GeometryCPRepoDp.hasIndices,
      getIndicesCount: GeometryCPRepoDp.getIndicesCount,
    },
    directionLightRepo: {
      getMaxIndex: DirectionLightCPRepoDp.getMaxIndex,
      setMaxIndex: DirectionLightCPRepoDp.setMaxIndex,
      getGameObject: DirectionLightCPRepoDp.getGameObject,
      setGameObject: DirectionLightCPRepoDp.setGameObject,
      getColor: DirectionLightCPRepoDp.getColor,
      setColor: DirectionLightCPRepoDp.setColor,
      getIntensity: DirectionLightCPRepoDp.getIntensity,
      setIntensity: DirectionLightCPRepoDp.setIntensity,
    },
    basicCameraViewRepo: {
      getMaxIndex: BasicCameraViewCPRepoDp.getMaxIndex,
      setMaxIndex: BasicCameraViewCPRepoDp.setMaxIndex,
      getGameObject: BasicCameraViewCPRepoDp.getGameObject,
      setGameObject: BasicCameraViewCPRepoDp.setGameObject,
      isActive: BasicCameraViewCPRepoDp.isActive,
      setAllNotActive: BasicCameraViewCPRepoDp.setAllNotActive,
      setActive: BasicCameraViewCPRepoDp.setActive,
      getActiveBasicCameraViews: BasicCameraViewCPRepoDp.getActiveBasicCameraViews,
    },
    perspectiveCameraProjectionRepo: {
      getMaxIndex: PerspectiveCameraProjectionCPRepoDp.getMaxIndex,
      setMaxIndex: PerspectiveCameraProjectionCPRepoDp.setMaxIndex,
      getGameObject: PerspectiveCameraProjectionCPRepoDp.getGameObject,
      setGameObject: PerspectiveCameraProjectionCPRepoDp.setGameObject,
      getPMatrix: PerspectiveCameraProjectionCPRepoDp.getPMatrix,
      setPMatrix: PerspectiveCameraProjectionCPRepoDp.setPMatrix,
      addToDirtyList: PerspectiveCameraProjectionCPRepoDp.addToDirtyList,
      getDirtyList: PerspectiveCameraProjectionCPRepoDp.getDirtyList,
      clearDirtyList: PerspectiveCameraProjectionCPRepoDp.clearDirtyList,
      getFovy: PerspectiveCameraProjectionCPRepoDp.getFovy,
      setFovy: PerspectiveCameraProjectionCPRepoDp.setFovy,
      getAspect: PerspectiveCameraProjectionCPRepoDp.getAspect,
      setAspect: PerspectiveCameraProjectionCPRepoDp.setAspect,
      getNear: PerspectiveCameraProjectionCPRepoDp.getNear,
      setNear: PerspectiveCameraProjectionCPRepoDp.setNear,
      getFar: PerspectiveCameraProjectionCPRepoDp.getFar,
      setFar: PerspectiveCameraProjectionCPRepoDp.setFar,
      markDirty: PerspectiveCameraProjectionCPRepoDp.markDirty,
      markNotDirty: PerspectiveCameraProjectionCPRepoDp.markNotDirty,
    },
    globalTempRepo: {
      getFloat32Array1: GlobalTempCPRepoDp.getFloat32Array1,
      getFloat9Array: GlobalTempCPRepoDp.getFloat9Array,
    },
    pipelineRepo: {
      getJobExecFunc: PipelineCPRepoDp.getJobExecFunc,
      setJobExecFunc: PipelineCPRepoDp.setJobExecFunc,
      getPipelineStream: PipelineCPRepoDp.getPipelineStream,
      setPipelineStream: PipelineCPRepoDp.setPipelineStream,
    },
    timeRepo: {
      start: TimeCPRepoDp.start,
      getElapsed: TimeCPRepoDp.getElapsed,
    },
    imageRepo: {
      getData: ImageCPRepoDp.getData,
      setData: ImageCPRepoDp.setData,
    },
  });

  POConfigDpRunAPI.set({
    getTransformCount: POConfigCPRepoDp.getTransformCount,
    getPBRMaterialCount: POConfigCPRepoDp.getPBRMaterialCount,
    getGeometryCount: POConfigCPRepoDp.getGeometryCount,
    getGeometryPointCount: POConfigCPRepoDp.getGeometryPointCount,
    getDirectionLightCount: POConfigCPRepoDp.getDirectionLightCount,
  });
};

let prepare = (pictureSize, sampleCount) => {
  _injectDependencies();

  _createAndSetAllComponentPOs()
  ->Result.mapSuccess(() => {
      PictureCPDoService.setSize(pictureSize);
      PassCPDoService.setSampleCount(sampleCount);
    });
};

let _parseAndSetPipelineStream = pipelineData => {
  pipelineData->PipelineRunAPI.parsePipelineData;
};

let init = () => {
  JobCPDoService.registerAllJobs();

  PipelineCPDoService.getInitPipelineData()->_parseAndSetPipelineStream;
};

let update = () => {
  PipelineCPDoService.getUpdatePipelineData()->_parseAndSetPipelineStream;
};

let render = () => {
  PipelineCPDoService.getRenderPipelineData()->_parseAndSetPipelineStream;
};
