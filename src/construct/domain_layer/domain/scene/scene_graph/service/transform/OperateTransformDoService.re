open SceneGraphRepoType;

let getLocalPosition = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalPosition(
    transform->TransformEntity.value,
  )
  ->PositionVO.create;
};

let getLocalRotation = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalRotation(
    transform->TransformEntity.value,
  )
  ->RotationVO.create;
};

let getLocalScale = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalScale(
    transform->TransformEntity.value,
  )
  ->ScaleVO.create;
};

let getPosition = transform => {
  DpContainer.unsafeGetTransformRepoDp().getPosition(
    transform->TransformEntity.value,
  )
  ->PositionVO.create;
};

let getRotation = transform => {
  DpContainer.unsafeGetTransformRepoDp().getRotation(
    transform->TransformEntity.value,
  )
  ->RotationVO.create;
};

let getScale = transform => {
  DpContainer.unsafeGetTransformRepoDp().getScale(
    transform->TransformEntity.value,
  )
  ->ScaleVO.create;
};

let getLocalToWorldMatrix = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalToWorldMatrix(
    transform->TransformEntity.value,
  )
  ->LocalToWorldMatrixVO.create;
};

let getNormalMatrix = transform => {
  DpContainer.unsafeGetTransformRepoDp().getNormalMatrix(
    transform->TransformEntity.value,
  )
  ->NormalMatrixVO.create;
};
