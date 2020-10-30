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
      ~getAllGeometryGameObjects=createEmptyStub(refJsObjToSandbox(sandbox^))
                                 ->SinonTool.returns(_createEmptyList()),
      (),
    )
    : gameObjectRepo => {
  getTransform,
  getDirectionLight,
  getAllGeometryGameObjects,
};

let buildTransformRepo =
    (
      ~sandbox,
      ~getLocalToWorldMatrix=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getNormalMatrix=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalPosition=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getLocalRotation=createEmptyStub(refJsObjToSandbox(sandbox^)),
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

let build =
    (
      ~sandbox,
      ~sceneRepo=buildSceneRepo(~sandbox, ()),
      ~gameObjectRepo=buildGameObjectRepo(~sandbox, ()),
      ~transformRepo=buildTransformRepo(~sandbox, ()),
      ~directionLightRepo=buildDirectionLightRepo(~sandbox, ()),
      (),
    )
    : sceneGraphRepo => {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
  directionLightRepo,
};

let set = dp => {
  SceneGraphRepoDpCPAPI.set(dp);
};

let getRepo = ((repo, _)) => repo;
