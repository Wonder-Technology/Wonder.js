let set =
    (
      {
        sceneRepo,
        gameObjectRepo,
        transformRepo,
        directionLightRepo,
        basicCameraViewRepo,
        perspectiveCameraProjectionRepo,
        bsdfMaterialRepo,
        geometryRepo,
      }: SceneGraphRepoDpCPType.sceneGraphRepo,
    ) => {
  let {
    getTransform,
    getDirectionLight,
    getBasicCameraView,
    getPerspectiveCameraProjection,
    getBSDFMaterial,
    getGeometry,
    getAllGeometryGameObjects,
    getAllGameObjectGeometries,
    getAllGameObjectBSDFMaterials,
  }: SceneGraphRepoDpCPType.gameObjectRepo = gameObjectRepo;
  let {getColor, getIntensity, getDirection, getAllLights}: SceneGraphRepoDpCPType.directionLightRepo = directionLightRepo;
  let {getGameObject, getViewWorldToCameraMatrix, getActiveBasicCameraView}: SceneGraphRepoDpCPType.basicCameraViewRepo = basicCameraViewRepo;
  let {
    getDiffuseColor,
    getSpecular,
    getSpecularColor,
    getRoughness,
    getMetalness,
    getTransmission,
    getIOR,
    getDiffuseMapImageId,
    getChannelRoughnessMetallicMapImageId,
    getEmissionMapImageId,
    getNormalMapImageId,
    getTransmissionMapImageId,
    getSpecularMapImageId,
    getAlphaCutoff,
    isSame: isSameBSDFMaterial,
    getId: getBSDFMaterialId,
  }: SceneGraphRepoDpCPType.bsdfMaterialRepo = bsdfMaterialRepo;
  let {
    getVertices,
    getNormals,
    getTexCoords,
    getTangents,
    getIndices,
    isFlipTexCoordY,
    isSame: isSameGeometry,
    getId: getGeometryId,
  }: SceneGraphRepoDpCPType.geometryRepo = geometryRepo;

  SceneGraphRepoDpRunAPI.set(
    {
      sceneRepo,
      gameObjectRepo: {
        getTransform: gameObject => {
          getTransform(gameObject)->OptionSt.fromNullable;
        },
        getDirectionLight: gameObject => {
          getDirectionLight(gameObject)->OptionSt.fromNullable;
        },
        getBasicCameraView: gameObject => {
          getBasicCameraView(gameObject)->OptionSt.fromNullable;
        },
        getPerspectiveCameraProjection: gameObject => {
          getPerspectiveCameraProjection(gameObject)->OptionSt.fromNullable;
        },
        getBSDFMaterial: gameObject => {
          getBSDFMaterial(gameObject)->OptionSt.fromNullable;
        },
        getGeometry: gameObject => {
          getGeometry(gameObject)->OptionSt.fromNullable;
        },
        getAllGeometryGameObjects: sceneGameObject => {
          getAllGeometryGameObjects(sceneGameObject)->ListSt.fromArray;
        },
        getAllGameObjectGeometries: sceneGameObject => {
          getAllGameObjectGeometries(sceneGameObject)->ListSt.fromArray;
        },
        getAllGameObjectBSDFMaterials: sceneGameObject => {
          getAllGameObjectBSDFMaterials(sceneGameObject)->ListSt.fromArray;
        },
      },
      transformRepo,
      directionLightRepo: {
        getColor,
        getIntensity,
        getDirection,
        getAllLights: sceneGameObject => {
          getAllLights(sceneGameObject)->ListSt.fromArray;
        },
      },
      basicCameraViewRepo: {
        getGameObject,
        getViewWorldToCameraMatrix,
        getActiveBasicCameraView: gameObject => {
          getActiveBasicCameraView(gameObject)->OptionSt.fromNullable;
        },
      },
      perspectiveCameraProjectionRepo,
      bsdfMaterialRepo: {
        isSame: isSameBSDFMaterial,
        getId: getBSDFMaterialId,
        getDiffuseColor,
        getSpecular,
        getSpecularColor,
        getRoughness,
        getMetalness,
        getTransmission,
        getIOR,
        getDiffuseMapImageId: bsdfMaterial => {
          getDiffuseMapImageId(bsdfMaterial)->OptionSt.fromNullable;
        },
        getChannelRoughnessMetallicMapImageId: bsdfMaterial => {
          getChannelRoughnessMetallicMapImageId(bsdfMaterial)
          ->OptionSt.fromNullable;
        },
        getEmissionMapImageId: bsdfMaterial => {
          getEmissionMapImageId(bsdfMaterial)->OptionSt.fromNullable;
        },
        getNormalMapImageId: bsdfMaterial => {
          getNormalMapImageId(bsdfMaterial)->OptionSt.fromNullable;
        },
        getTransmissionMapImageId: bsdfMaterial => {
          getTransmissionMapImageId(bsdfMaterial)->OptionSt.fromNullable;
        },
        getSpecularMapImageId: bsdfMaterial => {
          getSpecularMapImageId(bsdfMaterial)->OptionSt.fromNullable;
        },
        getAlphaCutoff,
      },
      geometryRepo: {
        isSame: isSameGeometry,
        getId: getGeometryId,
        getVertices,
        getNormals: geometry => {
          getNormals(geometry)->OptionSt.fromNullable;
        },
        getTexCoords: geometry => {
          getTexCoords(geometry)->OptionSt.fromNullable;
        },
        getTangents: geometry => {
          getTangents(geometry)->OptionSt.fromNullable;
        },
        getIndices: geometry => {
          getIndices(geometry)->OptionSt.fromNullable;
        },
        isFlipTexCoordY,
      },
    }: ISceneGraphRepoDp.sceneGraphRepo,
  );
};
