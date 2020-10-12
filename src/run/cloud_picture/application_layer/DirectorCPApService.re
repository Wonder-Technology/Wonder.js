let _createAndSetAllComponentPOs = () => {
  CreatePOTransformCPRepo.createPO()
  ->Result.mapSuccess(po => {po->CPRepo.setTransform})
  ->Result.bind(() => {
      CreatePOBSDFMaterialCPRepo.createPO()
      ->Result.mapSuccess(po => {po->CPRepo.setBSDFMaterial})
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
      ~bsdfMaterialCount,
      ~directionLightCount,
    ) => {
  POConfigDpRunAPI.set({
    getTransformCount: () => transformCount,
    getBSDFMaterialCount: () => bsdfMaterialCount,
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
      ~bsdfMaterialCount,
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
      addBSDFMaterial: GameObjectCPRepoDp.addBSDFMaterial,
      getBSDFMaterial: GameObjectCPRepoDp.getBSDFMaterial,
      hasBSDFMaterial: GameObjectCPRepoDp.hasBSDFMaterial,
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
      getAllGameObjectBSDFMaterials: GameObjectCPRepoDp.getAllGameObjectBSDFMaterials,
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
    bsdfMaterialRepo: {
      getMaxIndex: BSDFMaterialCPRepoDp.getMaxIndex,
      setMaxIndex: BSDFMaterialCPRepoDp.setMaxIndex,
      getGameObjects: BSDFMaterialCPRepoDp.getGameObjects,
      addGameObject: BSDFMaterialCPRepoDp.addGameObject,
      getDiffuseColor: BSDFMaterialCPRepoDp.getDiffuseColor,
      setDiffuseColor: BSDFMaterialCPRepoDp.setDiffuseColor,
      getSpecular: BSDFMaterialCPRepoDp.getSpecular,
      setSpecular: BSDFMaterialCPRepoDp.setSpecular,
      getRoughness: BSDFMaterialCPRepoDp.getRoughness,
      setRoughness: BSDFMaterialCPRepoDp.setRoughness,
      getMetalness: BSDFMaterialCPRepoDp.getMetalness,
      setMetalness: BSDFMaterialCPRepoDp.setMetalness,
      getDiffuseMapImageId: BSDFMaterialCPRepoDp.getDiffuseMapImageId,
      setDiffuseMapImageId: BSDFMaterialCPRepoDp.setDiffuseMapImageId,
      getChannelRoughnessMetallicMapImageId: BSDFMaterialCPRepoDp.getChannelRoughnessMetallicMapImageId,
      setChannelRoughnessMetallicMapImageId: BSDFMaterialCPRepoDp.setChannelRoughnessMetallicMapImageId,
      getEmissionMapImageId: BSDFMaterialCPRepoDp.getEmissionMapImageId,
      setEmissionMapImageId: BSDFMaterialCPRepoDp.setEmissionMapImageId,
      getNormalMapImageId: BSDFMaterialCPRepoDp.getNormalMapImageId,
      setNormalMapImageId: BSDFMaterialCPRepoDp.setNormalMapImageId,
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
    ~bsdfMaterialCount,
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
      ~bsdfMaterialCount,
      ~directionLightCount,
    ) => {
  _injectDependencies(
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~bsdfMaterialCount,
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
