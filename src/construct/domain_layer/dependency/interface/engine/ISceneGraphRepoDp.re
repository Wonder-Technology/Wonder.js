open SceneGraphType;

type sceneRepo = {getSceneGameObject: unit => gameObject};

type gameObjectRepo = {
  getTransform: gameObject => option(transform),
  // getBSDFMaterial: gameObject => option(bsdfMaterial),
  // getGeometry: gameObject => option(geometry),
  // getDirectionLight: gameObject => option(directionLight),
  // getBasicCameraView: gameObject => option(basicCameraView),
  // getPerspectiveCameraProjection:
  //   gameObject => option(perspectiveCameraProjection),
  // hasPerspectiveCameraProjection: gameObject => bool,
  getAllGeometryGameObjects: gameObject => list(gameObject),
  // getAllGameObjectGeometries: gameObject => list(geometry),
  // getAllGameObjectBSDFMaterials: gameObject => list(bsdfMaterial),
};

type transformRepo = {
  getLocalToWorldMatrix: transform => localToWorldMatrix,
  getNormalMatrix: transform => normalMatrix,
  getLocalPosition: transform => position,
  getLocalRotation: transform => rotation,
  getLocalScale: transform => scale,
  getPosition: transform => position,
  getRotation: transform => rotation,
  getScale: transform => scale,
};

// type bsdfMaterialRepo = {
//   getDiffuseColor: bsdfMaterial => diffuse,
//   getSpecular: bsdfMaterial => float,
//   getSpecularColor: bsdfMaterial => specularColor,
//   getRoughness: bsdfMaterial => float,
//   getMetalness: bsdfMaterial => float,
//   getTransmission: bsdfMaterial => float,
//   getIOR: bsdfMaterial => float,
//   getDiffuseMapImageId: bsdfMaterial => option(ImagePOType.id),
//   getChannelRoughnessMetallicMapImageId:
//     bsdfMaterial => option(ImagePOType.id),
//   getEmissionMapImageId: bsdfMaterial => option(ImagePOType.id),
//   getNormalMapImageId: bsdfMaterial => option(ImagePOType.id),
//   getTransmissionMapImageId: bsdfMaterial => option(ImagePOType.id),
//   getSpecularMapImageId: bsdfMaterial => option(ImagePOType.id),
// };

type sceneGraphRepo = {
  sceneRepo,
  transformRepo,
  gameObjectRepo,
};
