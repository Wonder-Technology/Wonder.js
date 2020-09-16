let getTransform = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getTransform(
    gameObject->GameObjectEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(TransformEntity.create);

let getPBRMaterial = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getPBRMaterial(
    gameObject->GameObjectEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(PBRMaterialEntity.create);

let getGeometry = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getGeometry(
    gameObject->GameObjectEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(GeometryEntity.create);

let getDirectionLight = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getDirectionLight(
    gameObject->GameObjectEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(DirectionLightEntity.create);

let getBasicCameraView = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getBasicCameraView(
    gameObject->GameObjectEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(BasicCameraViewEntity.create);

let getPerspectiveCameraProjection = gameObject =>
  DpContainer.unsafeGetGameObjectRepoDp().getPerspectiveCameraProjection(
    gameObject->GameObjectEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(PerspectiveCameraProjectionEntity.create);
