open SceneGraphRepoDpCPType;

open Sinon;

let _createEmptyList = () => [];

let buildSceneRepo =
    (
      ~sandbox,
      ~getSceneGameObject=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : sceneRepo => {
  getSceneGameObject: getSceneGameObject,
};

let buildGameObjectRepo =
    (
      ~sandbox,
      ~getTransform=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getDirectionLight=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getBasicCameraView=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getPerspectiveCameraProjection=createEmptyStub(
                                        refJsObjToSandbox(sandbox^),
                                      ),
      ~getBSDFMaterial=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getGeometry=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getAllGeometryGameObjects=createEmptyStub(refJsObjToSandbox(sandbox^))
                                 ->SinonTool.returns(_createEmptyList()),
      ~getAllGameObjectGeometries=createEmptyStub(
                                    refJsObjToSandbox(sandbox^),
                                  )
                                  ->SinonTool.returns(_createEmptyList()),
      ~getAllGameObjectBSDFMaterials=createEmptyStub(
                                       refJsObjToSandbox(sandbox^),
                                     )
                                     ->SinonTool.returns(_createEmptyList()),
      (),
    )
    : gameObjectRepo => {
  getTransform,
  getDirectionLight,
  getBasicCameraView,
  getPerspectiveCameraProjection,
  getBSDFMaterial,
  getGeometry,
  getAllGeometryGameObjects,
  getAllGameObjectGeometries,
  getAllGameObjectBSDFMaterials,
};

let buildTransformRepo =
    (
      ~sandbox,
      ~getLocalToWorldMatrix=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getNormalMatrix=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalPosition=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalRotation=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalEulerAngles=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalScale=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getPosition=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getRotation=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getScale=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : transformRepo => {
  getLocalToWorldMatrix,
  getNormalMatrix,
  getLocalPosition,
  getLocalRotation,
  getLocalEulerAngles,
  getLocalScale,
  getPosition,
  getRotation,
  getScale,
};

let buildDirectionLightRepo =
    (
      ~sandbox,
      ~getColor=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getIntensity=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getDirection=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getAllLights=createEmptyStub(refJsObjToSandbox(sandbox^))
                    ->SinonTool.returns(_createEmptyList()),
      (),
    )
    : directionLightRepo => {
  getColor,
  getIntensity,
  getDirection,
  getAllLights,
};

let buildBasicCameraViewRepo =
    (
      ~sandbox,
      ~getGameObject=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getViewWorldToCameraMatrix=createEmptyStub(
                                    refJsObjToSandbox(sandbox^),
                                  ),
      ~getActiveBasicCameraView=createEmptyStub(refJsObjToSandbox(sandbox^))
                                ->SinonTool.returns(Js.Nullable.null),
      (),
    )
    : basicCameraViewRepo => {
  getGameObject,
  getViewWorldToCameraMatrix,
  getActiveBasicCameraView,
};

let buildPerspectiveCameraProjectionRepo =
    (
      ~sandbox,
      ~getPMatrix=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getFovy=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getNear=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getFar=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getAspect=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : perspectiveCameraProjectionRepo => {
  getPMatrix,
  getFovy,
  getAspect,
  getNear,
  getFar,
};

let buildBSDFMaterialRepo =
    (
      ~sandbox,
      ~isSame=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getDiffuseColor=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getSpecular=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getSpecularColor=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getRoughness=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getMetalness=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getTransmission=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getIOR=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getAlphaCutoff=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getDiffuseMapImageId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getChannelRoughnessMetallicMapImageId=createEmptyStub(
                                               refJsObjToSandbox(sandbox^),
                                             ),
      ~getEmissionMapImageId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getNormalMapImageId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getTransmissionMapImageId=createEmptyStub(
                                   refJsObjToSandbox(sandbox^),
                                 ),
      ~getSpecularMapImageId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getDiffuseMapImageWrapData=createEmptyStub(
                                    refJsObjToSandbox(sandbox^),
                                  ),
      ~getChannelRoughnessMetallicMapImageWrapData=createEmptyStub(
                                                     refJsObjToSandbox(
                                                       sandbox^,
                                                     ),
                                                   ),
      ~getEmissionMapImageWrapData=createEmptyStub(
                                     refJsObjToSandbox(sandbox^),
                                   ),
      ~getNormalMapImageWrapData=createEmptyStub(
                                   refJsObjToSandbox(sandbox^),
                                 ),
      ~getTransmissionMapImageWrapData=createEmptyStub(
                                         refJsObjToSandbox(sandbox^),
                                       ),
      ~getSpecularMapImageWrapData=createEmptyStub(
                                     refJsObjToSandbox(sandbox^),
                                   ),
      ~isDoubleSide=createEmptyStub(refJsObjToSandbox(sandbox^))
                    ->SinonTool.returns(false),
      (),
    )
    : bsdfMaterialRepo => {
  isSame,
  getId,
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
  getDiffuseMapImageWrapData,
  getChannelRoughnessMetallicMapImageWrapData,
  getEmissionMapImageWrapData,
  getNormalMapImageWrapData,
  getTransmissionMapImageWrapData,
  getSpecularMapImageWrapData,
  isDoubleSide,
};

let buildGeometryRepo =
    (
      ~sandbox,
      ~isSame=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getId=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getVertices=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getNormals=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getTexCoords=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getTangents=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getIndices=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~isFlipTexCoordY=createEmptyStub(refJsObjToSandbox(sandbox^))
                       ->SinonTool.returns(false),
      (),
    )
    : geometryRepo => {
  isSame,
  getId,
  getVertices,
  getNormals,
  getTexCoords,
  getTangents,
  getIndices,
  isFlipTexCoordY,
};

let build =
    (
      ~sandbox,
      ~sceneRepo=buildSceneRepo(~sandbox, ()),
      ~gameObjectRepo=buildGameObjectRepo(~sandbox, ()),
      ~transformRepo=buildTransformRepo(~sandbox, ()),
      ~directionLightRepo=buildDirectionLightRepo(~sandbox, ()),
      ~basicCameraViewRepo=buildBasicCameraViewRepo(~sandbox, ()),
      ~perspectiveCameraProjectionRepo=buildPerspectiveCameraProjectionRepo(
                                         ~sandbox,
                                         (),
                                       ),
      ~bsdfMaterialRepo=buildBSDFMaterialRepo(~sandbox, ()),
      ~geometryRepo=buildGeometryRepo(~sandbox, ()),
      (),
    )
    : sceneGraphRepo => {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
  directionLightRepo,
  basicCameraViewRepo,
  perspectiveCameraProjectionRepo,
  bsdfMaterialRepo,
  geometryRepo,
};

let set = dp => {
  SceneGraphRepoDpCPAPI.set(dp);
};

let getRepo = ((repo, _)) => repo;
