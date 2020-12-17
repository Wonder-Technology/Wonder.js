open SceneGraphRepoDpCPType

open Sinon

let _createEmptyList = () => list{}

let buildSceneRepo = (
  ~sandbox,
  ~getSceneGameObject=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  (),
): sceneRepo => {
  getSceneGameObject: getSceneGameObject,
}

let buildGameObjectRepo = (
  ~sandbox,
  ~getTransform=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getDirectionLight=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getBasicCameraView=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getPerspectiveCameraProjection=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getBSDFMaterial=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getGeometry=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getAllGeometryGameObjects=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->SinonTool.returns(_createEmptyList()),
  ~getAllGameObjectGeometries=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->SinonTool.returns(_createEmptyList()),
  ~getAllGameObjectBSDFMaterials=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->SinonTool.returns(_createEmptyList()),
  (),
): gameObjectRepo => {
  getTransform: getTransform,
  getDirectionLight: getDirectionLight,
  getBasicCameraView: getBasicCameraView,
  getPerspectiveCameraProjection: getPerspectiveCameraProjection,
  getBSDFMaterial: getBSDFMaterial,
  getGeometry: getGeometry,
  getAllGeometryGameObjects: getAllGeometryGameObjects,
  getAllGameObjectGeometries: getAllGameObjectGeometries,
  getAllGameObjectBSDFMaterials: getAllGameObjectBSDFMaterials,
}

let buildTransformRepo = (
  ~sandbox,
  ~getLocalToWorldMatrix=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getNormalMatrix=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getLocalPosition=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getLocalRotation=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getLocalEulerAngles=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getLocalScale=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getPosition=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getRotation=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getScale=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  (),
): transformRepo => {
  getLocalToWorldMatrix: getLocalToWorldMatrix,
  getNormalMatrix: getNormalMatrix,
  getLocalPosition: getLocalPosition,
  getLocalRotation: getLocalRotation,
  getLocalEulerAngles: getLocalEulerAngles,
  getLocalScale: getLocalScale,
  getPosition: getPosition,
  getRotation: getRotation,
  getScale: getScale,
}

let buildDirectionLightRepo = (
  ~sandbox,
  ~getColor=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getIntensity=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getDirection=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getAllLights=createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(
    _createEmptyList(),
  ),
  (),
): directionLightRepo => {
  getColor: getColor,
  getIntensity: getIntensity,
  getDirection: getDirection,
  getAllLights: getAllLights,
}

let buildBasicCameraViewRepo = (
  ~sandbox,
  ~getGameObject=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getViewWorldToCameraMatrix=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getActiveBasicCameraView=createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(
    Js.Nullable.null,
  ),
  (),
): basicCameraViewRepo => {
  getGameObject: getGameObject,
  getViewWorldToCameraMatrix: getViewWorldToCameraMatrix,
  getActiveBasicCameraView: getActiveBasicCameraView,
}

let buildPerspectiveCameraProjectionRepo = (
  ~sandbox,
  ~getPMatrix=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getFovy=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getNear=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getFar=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getAspect=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  (),
): perspectiveCameraProjectionRepo => {
  getPMatrix: getPMatrix,
  getFovy: getFovy,
  getAspect: getAspect,
  getNear: getNear,
  getFar: getFar,
}

let buildBSDFMaterialRepo = (
  ~sandbox,
  ~isSame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getId=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getDiffuseColor=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getEmissionColor=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getSpecular=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getSpecularColor=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getRoughness=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getMetalness=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getTransmission=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getIOR=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getAlphaCutoff=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getDiffuseMapImageId=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getChannelRoughnessMetallicMapImageId=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getEmissionMapImageId=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getNormalMapImageId=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getTransmissionMapImageId=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getSpecularMapImageId=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getDiffuseMapImageWrapData=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getChannelRoughnessMetallicMapImageWrapData=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getEmissionMapImageWrapData=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getNormalMapImageWrapData=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getTransmissionMapImageWrapData=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getSpecularMapImageWrapData=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~isDoubleSide=createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(false),
  (),
): bsdfMaterialRepo => {
  isSame: isSame,
  getId: getId,
  getDiffuseColor: getDiffuseColor,
  getEmissionColor: getEmissionColor,
  getSpecular: getSpecular,
  getSpecularColor: getSpecularColor,
  getRoughness: getRoughness,
  getMetalness: getMetalness,
  getTransmission: getTransmission,
  getIOR: getIOR,
  getDiffuseMapImageId: getDiffuseMapImageId,
  getChannelRoughnessMetallicMapImageId: getChannelRoughnessMetallicMapImageId,
  getEmissionMapImageId: getEmissionMapImageId,
  getNormalMapImageId: getNormalMapImageId,
  getTransmissionMapImageId: getTransmissionMapImageId,
  getSpecularMapImageId: getSpecularMapImageId,
  getAlphaCutoff: getAlphaCutoff,
  getDiffuseMapImageWrapData: getDiffuseMapImageWrapData,
  getChannelRoughnessMetallicMapImageWrapData: getChannelRoughnessMetallicMapImageWrapData,
  getEmissionMapImageWrapData: getEmissionMapImageWrapData,
  getNormalMapImageWrapData: getNormalMapImageWrapData,
  getTransmissionMapImageWrapData: getTransmissionMapImageWrapData,
  getSpecularMapImageWrapData: getSpecularMapImageWrapData,
  isDoubleSide: isDoubleSide,
}

let buildGeometryRepo = (
  ~sandbox,
  ~isSame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getId=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getVertices=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getNormals=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getTexCoords=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getTangents=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getIndices=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~isFlipTexCoordY=createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.returns(false),
  (),
): geometryRepo => {
  isSame: isSame,
  getId: getId,
  getVertices: getVertices,
  getNormals: getNormals,
  getTexCoords: getTexCoords,
  getTangents: getTangents,
  getIndices: getIndices,
  isFlipTexCoordY: isFlipTexCoordY,
}

let build = (
  ~sandbox,
  ~sceneRepo=buildSceneRepo(~sandbox, ()),
  ~gameObjectRepo=buildGameObjectRepo(~sandbox, ()),
  ~transformRepo=buildTransformRepo(~sandbox, ()),
  ~directionLightRepo=buildDirectionLightRepo(~sandbox, ()),
  ~basicCameraViewRepo=buildBasicCameraViewRepo(~sandbox, ()),
  ~perspectiveCameraProjectionRepo=buildPerspectiveCameraProjectionRepo(~sandbox, ()),
  ~bsdfMaterialRepo=buildBSDFMaterialRepo(~sandbox, ()),
  ~geometryRepo=buildGeometryRepo(~sandbox, ()),
  (),
): sceneGraphRepo => {
  sceneRepo: sceneRepo,
  gameObjectRepo: gameObjectRepo,
  transformRepo: transformRepo,
  directionLightRepo: directionLightRepo,
  basicCameraViewRepo: basicCameraViewRepo,
  perspectiveCameraProjectionRepo: perspectiveCameraProjectionRepo,
  bsdfMaterialRepo: bsdfMaterialRepo,
  geometryRepo: geometryRepo,
}

let set = dp => SceneGraphRepoDpCPAPI.set(dp)

let getRepo = ((repo, _)) => repo
