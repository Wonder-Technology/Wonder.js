let _createAndSetAllComponentPOs = () => {
  CreatePOTransformCPRepo.createPO()
  ->Result.mapSuccess(po => {po->CPRepo.setTransform})
  ->Result.bind(() => {
      CreatePOBRDFMaterialCPRepo.createPO()
      ->Result.mapSuccess(po => {po->CPRepo.setBRDFMaterial})
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

let _setAllBufferCount =
    (
      ~transformCount,
      ~geometryPointCount,
      ~geometryCount,
      ~brdfMaterialCount,
      ~directionLightCount,
    ) => {
  POConfigDpRunAPI.set({
    getTransformCount: () => transformCount,
    getBRDFMaterialCount: () => brdfMaterialCount,
    getGeometryCount: () => geometryCount,
    getGeometryPointCount: () => geometryPointCount,
    getDirectionLightCount: () => directionLightCount,
  });
};

let _injectDependencies =
    (
      ~transformCount,
      ~geometryPointCount,
      ~geometryCount,
      ~brdfMaterialCount,
      ~directionLightCount,
    ) => {
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
      addBRDFMaterial: GameObjectCPRepoDp.addBRDFMaterial,
      getBRDFMaterial: GameObjectCPRepoDp.getBRDFMaterial,
      hasBRDFMaterial: GameObjectCPRepoDp.hasBRDFMaterial,
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
      getAllGameObjectBRDFMaterials: GameObjectCPRepoDp.getAllGameObjectBRDFMaterials,
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
    brdfMaterialRepo: {
      getMaxIndex: BRDFMaterialCPRepoDp.getMaxIndex,
      setMaxIndex: BRDFMaterialCPRepoDp.setMaxIndex,
      getGameObjects: BRDFMaterialCPRepoDp.getGameObjects,
      addGameObject: BRDFMaterialCPRepoDp.addGameObject,
      getDiffuseColor: BRDFMaterialCPRepoDp.getDiffuseColor,
      setDiffuseColor: BRDFMaterialCPRepoDp.setDiffuseColor,
      getSpecular: BRDFMaterialCPRepoDp.getSpecular,
      setSpecular: BRDFMaterialCPRepoDp.setSpecular,
      getRoughness: BRDFMaterialCPRepoDp.getRoughness,
      setRoughness: BRDFMaterialCPRepoDp.setRoughness,
      getMetalness: BRDFMaterialCPRepoDp.getMetalness,
      setMetalness: BRDFMaterialCPRepoDp.setMetalness,
      getDiffuseMapImageId: BRDFMaterialCPRepoDp.getDiffuseMapImageId,
      setDiffuseMapImageId: BRDFMaterialCPRepoDp.setDiffuseMapImageId,
      getChannelRoughnessMetallicMapImageId: BRDFMaterialCPRepoDp.getChannelRoughnessMetallicMapImageId,
      setChannelRoughnessMetallicMapImageId: BRDFMaterialCPRepoDp.setChannelRoughnessMetallicMapImageId,
      getEmissionMapImageId: BRDFMaterialCPRepoDp.getEmissionMapImageId,
      setEmissionMapImageId: BRDFMaterialCPRepoDp.setEmissionMapImageId,
      getNormalMapImageId: BRDFMaterialCPRepoDp.getNormalMapImageId,
      setNormalMapImageId: BRDFMaterialCPRepoDp.setNormalMapImageId,
    },
    geometryRepo: {
      getMaxIndex: GeometryCPRepoDp.getMaxIndex,
      setMaxIndex: GeometryCPRepoDp.setMaxIndex,
      getGameObjects: GeometryCPRepoDp.getGameObjects,
      addGameObject: GeometryCPRepoDp.addGameObject,
      getVertices: GeometryCPRepoDp.getVertices,
      setVertices: GeometryCPRepoDp.setVertices,
      getTexCoords: GeometryCPRepoDp.getTexCoords,
      setTexCoords: GeometryCPRepoDp.setTexCoords,
      getNormals: GeometryCPRepoDp.getNormals,
      setNormals: GeometryCPRepoDp.setNormals,
      getTangents: GeometryCPRepoDp.getTangents,
      setTangents: GeometryCPRepoDp.setTangents,
      getIndices: GeometryCPRepoDp.getIndices,
      setIndices: GeometryCPRepoDp.setIndices,
      hasVertices: GeometryCPRepoDp.hasVertices,
      hasTexCoords: GeometryCPRepoDp.hasTexCoords,
      hasNormals: GeometryCPRepoDp.hasNormals,
      hasTangents: GeometryCPRepoDp.hasTangents,
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
    imageRepo: {
      getData: ImageCPRepoDp.getData,
      setData: ImageCPRepoDp.setData,
    },
  });

  TimeJobRepoDpRunAPI.set({
    start: TimeCPRepoDp.start,
    getElapsed: TimeCPRepoDp.getElapsed,
  });

  _setAllBufferCount(
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~brdfMaterialCount,
    ~directionLightCount,
  );
};

let prepare =
    (
      ~pictureSize,
      ~sampleCount,
      ~transformCount,
      ~geometryPointCount,
      ~geometryCount,
      ~brdfMaterialCount,
      ~directionLightCount,
    ) => {
  _injectDependencies(
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~brdfMaterialCount,
    ~directionLightCount,
  );

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
