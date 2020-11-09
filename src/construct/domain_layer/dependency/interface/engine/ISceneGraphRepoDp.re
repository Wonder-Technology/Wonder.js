open SceneGraphRepoType;

type sceneRepo = {getSceneGameObject: unit => sceneGameObject};

type gameObjectRepo = {
  getTransform: gameObject => option(transform),
  getBSDFMaterial: gameObject => option(bsdfMaterial),
  getGeometry: gameObject => option(geometry),
  getDirectionLight: gameObject => option(directionLight),
  getBasicCameraView: gameObject => option(basicCameraView),
  getPerspectiveCameraProjection:
    gameObject => option(perspectiveCameraProjection),
  getAllGeometryGameObjects: sceneGameObject => list(gameObject),
  getAllGameObjectGeometries: sceneGameObject => list(geometry),
  getAllGameObjectBSDFMaterials: sceneGameObject => list(bsdfMaterial),
};

type transformRepo = {
  getLocalToWorldMatrix: transform => localToWorldMatrix,
  getNormalMatrix: transform => normalMatrix,
  getLocalPosition: transform => position,
  getLocalRotation: transform => rotation,
  getLocalEulerAngles: transform => eulerAngles,
  getLocalScale: transform => scale,
  getPosition: transform => position,
  getRotation: transform => rotation,
  getScale: transform => scale,
};

type directionLightRepo = {
  getColor: directionLight => color3,
  getIntensity: directionLight => intensity,
  getDirection: directionLight => direction,
  getAllLights: sceneGameObject => list(directionLight),
};

type basicCameraViewRepo = {
  getGameObject: basicCameraView => gameObject,
  getViewWorldToCameraMatrix: basicCameraView => viewWorldToCameraMatrix,
  getActiveBasicCameraView: sceneGameObject => option(basicCameraView),
};

type perspectiveCameraProjectionRepo = {
  getPMatrix: perspectiveCameraProjection => Js.Typed_array.Float32Array.t,
  getFovy: perspectiveCameraProjection => float,
  getAspect: perspectiveCameraProjection => float,
  getNear: perspectiveCameraProjection => float,
  getFar: perspectiveCameraProjection => float,
};

type bsdfMaterialRepo = {
  getDiffuseColor: bsdfMaterial => diffuse,
  getSpecular: bsdfMaterial => float,
  getSpecularColor: bsdfMaterial => specularColor,
  getRoughness: bsdfMaterial => float,
  getMetalness: bsdfMaterial => float,
  getTransmission: bsdfMaterial => float,
  getIOR: bsdfMaterial => float,
  getDiffuseMapImageId: bsdfMaterial => option(ImageRepoType.id),
  getChannelRoughnessMetallicMapImageId:
    bsdfMaterial => option(ImageRepoType.id),
  getEmissionMapImageId: bsdfMaterial => option(ImageRepoType.id),
  getNormalMapImageId: bsdfMaterial => option(ImageRepoType.id),
  getTransmissionMapImageId: bsdfMaterial => option(ImageRepoType.id),
  getSpecularMapImageId: bsdfMaterial => option(ImageRepoType.id),
  isSame: (bsdfMaterial, bsdfMaterial) => bool,
  getId: bsdfMaterial => int,
};

type geometryRepo = {
  getVertices: geometry => Js.Typed_array.Float32Array.t,
  getNormals: geometry => option(Js.Typed_array.Float32Array.t),
  getTexCoords: geometry => option(Js.Typed_array.Float32Array.t),
  getTangents: geometry => option(Js.Typed_array.Float32Array.t),
  getIndices: geometry => option(Js.Typed_array.Uint32Array.t),
  isSame: (geometry, geometry) => bool,
  getId: geometry => int,
};

type sceneGraphRepo = {
  sceneRepo,
  transformRepo,
  directionLightRepo,
  basicCameraViewRepo,
  perspectiveCameraProjectionRepo,
  bsdfMaterialRepo,
  geometryRepo,
  gameObjectRepo,
};
