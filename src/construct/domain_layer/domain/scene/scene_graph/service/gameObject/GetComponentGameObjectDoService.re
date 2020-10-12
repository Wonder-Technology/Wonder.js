let getTransform = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getTransform(
    gameObject->GameObjectEntity.value,
  )
  
  ->OptionSt.map(TransformEntity.create);

let getBSDFMaterial = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getBSDFMaterial(
    gameObject->GameObjectEntity.value,
  )
  
  ->OptionSt.map(BSDFMaterialEntity.create);

let getGeometry = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getGeometry(
    gameObject->GameObjectEntity.value,
  )
  
  ->OptionSt.map(GeometryEntity.create);

let getDirectionLight = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getDirectionLight(
    gameObject->GameObjectEntity.value,
  )
  
  ->OptionSt.map(DirectionLightEntity.create);

let getBasicCameraView = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getBasicCameraView(
    gameObject->GameObjectEntity.value,
  )
  
  ->OptionSt.map(BasicCameraViewEntity.create);

let getPerspectiveCameraProjection = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getPerspectiveCameraProjection(
    gameObject->GameObjectEntity.value,
  )
  
  ->OptionSt.map(PerspectiveCameraProjectionEntity.create);
