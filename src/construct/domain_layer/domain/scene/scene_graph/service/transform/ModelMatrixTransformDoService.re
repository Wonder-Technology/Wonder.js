let getLocalToWorldMatrix = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalToWorldMatrix(
    transform->TransformEntity.value,
  )
  ->LocalToWorldMatrixVO.create;
};

let getLocalPosition = transform =>
  DpContainer.unsafeGetTransformRepoDp().getLocalPosition(
    transform->TransformEntity.value,
  )
  ->PositionVO.create;

let setLocalPosition = (transform, localPosition) => {
  DpContainer.unsafeGetTransformRepoDp().setLocalPosition(
    transform->TransformEntity.value,
    localPosition->PositionVO.value,
  )
  ->Result.mapSuccess(() => {
      HierachyTransformDoService.markHierachyDirty(transform)
    });
};

let setPosition = (transform, parent, position) => {
  DpContainer.unsafeGetGlobalTempRepoDp().getFloat32Array1()
  ->LocalToWorldMatrixVO.invert(getLocalToWorldMatrix(parent))
  ->Result.bind(mat4 => {
      setLocalPosition(
        transform,
        position
        ->PositionVO.value
        ->Vector3.transformMat4Tuple(mat4)
        ->PositionVO.create,
      )
    });
};

let getLocalRotation = transform =>
  DpContainer.unsafeGetTransformRepoDp().getLocalRotation(
    transform->TransformEntity.value,
  )
  ->RotationVO.create;

let setLocalRotation = (transform, localRotation) => {
  DpContainer.unsafeGetTransformRepoDp().setLocalRotation(
    transform->TransformEntity.value,
    localRotation->RotationVO.value,
  )
  ->Result.mapSuccess(() => {
      HierachyTransformDoService.markHierachyDirty(transform)
    });
};

let getLocalEulerAngles = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalRotation(
    transform->TransformEntity.value,
  )
  ->Quaternion.getEulerAngles
  ->Tuple3.map(AngleVO.create)
  ->EulerAnglesVO.create;
};

let setLocalEulerAngles = (transform, localEulerAngles) => {
  setLocalRotation(
    transform,
    localEulerAngles->EulerAnglesVO.convertToQuaternion->RotationVO.create,
  );
};

let getLocalScale = transform =>
  DpContainer.unsafeGetTransformRepoDp().getLocalScale(
    transform->TransformEntity.value,
  )
  ->ScaleVO.create;

let setLocalScale = (transform, localScale) => {
  DpContainer.unsafeGetTransformRepoDp().setLocalScale(
    transform->TransformEntity.value,
    localScale->ScaleVO.value,
  )
  ->Result.mapSuccess(() => {
      HierachyTransformDoService.markHierachyDirty(transform)
    });
};

let setScale = (transform, parent, scale) => {
  DpContainer.unsafeGetGlobalTempRepoDp().getFloat32Array1()
  ->LocalToWorldMatrixVO.invert(getLocalToWorldMatrix(parent))
  ->Result.bind(mat4 => {
      setLocalScale(
        transform,
        scale
        ->ScaleVO.value
        ->Vector3.transformMat4Tuple(mat4)
        ->ScaleVO.create,
      )
    });
};
