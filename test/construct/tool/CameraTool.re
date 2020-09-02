let createBasicCameraViewPerspectiveCamera = () => {
  open BasicCameraViewRunAPI;
  open PerspectiveCameraProjectionRunAPI;
  let perspectiveCameraProjection = PerspectiveCameraProjectionRunAPI.create();
  let basicCameraView = BasicCameraViewRunAPI.create();

  PerspectiveCameraProjectionRunAPI.setNear(
    perspectiveCameraProjection,
    0.1->NearVO.create,
  );
  setFar(perspectiveCameraProjection, 1000.->FarVO.create);
  setFovy(perspectiveCameraProjection, 60.->FovyVO.create);
  setAspect(perspectiveCameraProjection, 1.->AspectVO.create);

  (basicCameraView, perspectiveCameraProjection);
};

let createCameraGameObjectWithFunc = createBasicCameraViewPerspectiveCameraFunc => {
  let (basicCameraView, perspectiveCameraProjection) =
    createBasicCameraViewPerspectiveCameraFunc();
  let gameObject = GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

  GameObjectRunAPI.addBasicCameraView(gameObject, basicCameraView)
  ->ResultTool.getExnSuccessValueIgnore;
  GameObjectRunAPI.addPerspectiveCameraProjection(
    gameObject,
    perspectiveCameraProjection,
  )
  ->ResultTool.getExnSuccessValueIgnore;

  BasicCameraViewRunAPI.active(basicCameraView);

  (
    gameObject,
    GameObjectRunAPI.getTransform(gameObject)->OptionSt.getExn,
    (basicCameraView, perspectiveCameraProjection),
  );
};

let createCameraGameObject = () =>
  createCameraGameObjectWithFunc(createBasicCameraViewPerspectiveCamera);
