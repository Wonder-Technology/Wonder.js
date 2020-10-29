open SceneGraphType;

type sceneRepo = {getSceneGameObject: unit => gameObject};

type gameObjectRepo = {
  //   getMaxUID: unit => uid,
  //   setMaxUID: uid => unit,
  //   addTransform: (gameObject, transform) => unit,
  getTransform: gameObject => option(transform),
  //   hasTransform: gameObject => bool,
  //   addBSDFMaterial: (gameObject, bsdfMaterial) => unit,
  //   getBSDFMaterial: gameObject => option(bsdfMaterial),
  // //   hasBSDFMaterial: gameObject => bool,
  // //   addGeometry: (gameObject, geometry) => unit,
  //   getGeometry: gameObject => option(geometry),
  // //   hasGeometry: gameObject => bool,
  // //   addDirectionLight: (gameObject, directionLight) => unit,
  //   getDirectionLight: gameObject => option(directionLight),
  // //   hasDirectionLight: gameObject => bool,
  // //   addBasicCameraView: (gameObject, basicCameraView) => unit,
  //   getBasicCameraView: gameObject => option(basicCameraView),
  // //   hasBasicCameraView: gameObject => bool,
  // //   addPerspectiveCameraProjection:
  // //     (gameObject, perspectiveCameraProjection) => unit,
  //   getPerspectiveCameraProjection:
  //     gameObject => option(perspectiveCameraProjection),
  //   hasPerspectiveCameraProjection: gameObject => bool,
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

type sceneGraphRepo = {
  sceneRepo,
  transformRepo,
  gameObjectRepo,
};
