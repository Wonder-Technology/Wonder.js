open SceneGraphType;

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
  getAllGeometryGameObjects: unit => list(gameObject),
  // getAllGameObjectGeometries: unit => list(geometry),
  // getAllGameObjectBSDFMaterials: unit => list(bsdfMaterial),
};

type sceneGraphRepo = {gameObjectRepo};
