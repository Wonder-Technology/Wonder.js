open SceneGraphRepoType

type sceneRepo = ISceneGraphRepoDp.sceneRepo

type gameObjectRepo = {
  getTransform: gameObject => Js.Nullable.t<transform>,
  getDirectionLight: gameObject => Js.Nullable.t<directionLight>,
  getBasicCameraView: gameObject => Js.Nullable.t<basicCameraView>,
  getPerspectiveCameraProjection: gameObject => Js.Nullable.t<perspectiveCameraProjection>,
  getBSDFMaterial: gameObject => Js.Nullable.t<bsdfMaterial>,
  getGeometry: gameObject => Js.Nullable.t<geometry>,
  getAllGeometryGameObjects: sceneGameObject => array<gameObject>,
  getAllGameObjectGeometries: sceneGameObject => array<geometry>,
  getAllGameObjectBSDFMaterials: sceneGameObject => array<bsdfMaterial>,
}

type transformRepo = ISceneGraphRepoDp.transformRepo

type directionLightRepo = {
  getColor: directionLight => color3,
  getIntensity: directionLight => intensity,
  getDirection: directionLight => direction,
  getAllLights: gameObject => array<directionLight>,
}

type basicCameraViewRepo = {
  getGameObject: basicCameraView => gameObject,
  getViewWorldToCameraMatrix: basicCameraView => viewWorldToCameraMatrix,
  getActiveBasicCameraView: sceneGameObject => Js.Nullable.t<basicCameraView>,
}

type perspectiveCameraProjectionRepo = ISceneGraphRepoDp.perspectiveCameraProjectionRepo

type bsdfMaterialRepo = {
  getDiffuseColor: bsdfMaterial => diffuse,
  getEmissionColor: bsdfMaterial => emissionColor,
  getSpecular: bsdfMaterial => float,
  getSpecularColor: bsdfMaterial => specularColor,
  getRoughness: bsdfMaterial => float,
  getMetalness: bsdfMaterial => float,
  getTransmission: bsdfMaterial => float,
  getIOR: bsdfMaterial => float,
  getDiffuseMapImageId: bsdfMaterial => Js.Nullable.t<ImageRepoType.id>,
  getChannelRoughnessMetallicMapImageId: bsdfMaterial => Js.Nullable.t<ImageRepoType.id>,
  getEmissionMapImageId: bsdfMaterial => Js.Nullable.t<ImageRepoType.id>,
  getNormalMapImageId: bsdfMaterial => Js.Nullable.t<ImageRepoType.id>,
  getTransmissionMapImageId: bsdfMaterial => Js.Nullable.t<ImageRepoType.id>,
  getSpecularMapImageId: bsdfMaterial => Js.Nullable.t<ImageRepoType.id>,
  getAlphaCutoff: bsdfMaterial => float,
  isSame: (bsdfMaterial, bsdfMaterial) => bool,
  getId: bsdfMaterial => int,
  getDiffuseMapImageWrapData: bsdfMaterial => Js.Nullable.t<wrapData>,
  getChannelRoughnessMetallicMapImageWrapData: bsdfMaterial => Js.Nullable.t<wrapData>,
  getEmissionMapImageWrapData: bsdfMaterial => Js.Nullable.t<wrapData>,
  getNormalMapImageWrapData: bsdfMaterial => Js.Nullable.t<wrapData>,
  getTransmissionMapImageWrapData: bsdfMaterial => Js.Nullable.t<wrapData>,
  getSpecularMapImageWrapData: bsdfMaterial => Js.Nullable.t<wrapData>,
  isDoubleSide: bsdfMaterial => bool,
}

type geometryRepo = {
  getVertices: geometry => Js.Typed_array.Float32Array.t,
  getNormals: geometry => Js.Nullable.t<Js.Typed_array.Float32Array.t>,
  getTexCoords: geometry => Js.Nullable.t<Js.Typed_array.Float32Array.t>,
  getTangents: geometry => Js.Nullable.t<Js.Typed_array.Float32Array.t>,
  getIndices: geometry => Js.Nullable.t<Js.Typed_array.Uint32Array.t>,
  isFlipTexCoordY: geometry => bool,
  isSame: (geometry, geometry) => bool,
  getId: geometry => int,
}

type sceneGraphRepo = {
  sceneRepo: sceneRepo,
  gameObjectRepo: gameObjectRepo,
  transformRepo: transformRepo,
  directionLightRepo: directionLightRepo,
  basicCameraViewRepo: basicCameraViewRepo,
  perspectiveCameraProjectionRepo: perspectiveCameraProjectionRepo,
  bsdfMaterialRepo: bsdfMaterialRepo,
  geometryRepo: geometryRepo,
}
