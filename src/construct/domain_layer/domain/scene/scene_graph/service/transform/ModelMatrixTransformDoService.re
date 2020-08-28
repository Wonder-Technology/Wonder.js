let getLocalToWorldMatrix = transform => {
  TransformRepoAt.getLocalToWorldMatrix(transform);
};

let getLocalPosition = transform =>
  TransformRepoAt.getLocalPosition(transform);

let setLocalPosition = (transform, localPosition) => {
  TransformRepoAt.setLocalPosition(transform, localPosition)
  ->Result.mapSuccess(() => {
      HierachyTransformDoService.markHierachyDirty(transform)
    });
};

let setPosition = (transform, parent, position) => {
  GlobalTempRepoAt.getFloat32Array1()
  ->Matrix4.invert(getLocalToWorldMatrix(parent)->LocalToWorldMatrixVO.value)
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
  TransformRepoAt.getLocalRotation(transform);

let setLocalRotation = (transform, localRotation) => {
  TransformRepoAt.setLocalRotation(transform, localRotation)
  ->Result.mapSuccess(() => {
      HierachyTransformDoService.markHierachyDirty(transform)
    });
};

let getLocalEulerAngles = transform => {
  TransformRepoAt.getLocalRotation(transform)
  ->RotationVO.value
  ->Quaternion.getEulerAngles
  ->EulerAnglesVO.create;
};

let setLocalEulerAngles = (transform, localEulerAngles) => {
  setLocalRotation(
    transform,
    localEulerAngles
    ->EulerAnglesVO.value
    ->Quaternion.setFromEulerAngles
    ->RotationVO.create,
  );
};

let getLocalScale = transform => TransformRepoAt.getLocalScale(transform);

let setLocalScale = (transform, localScale) => {
  TransformRepoAt.setLocalScale(transform, localScale)
  ->Result.mapSuccess(() => {
      HierachyTransformDoService.markHierachyDirty(transform)
    });
};

let setScale = (transform, parent, scale) => {
  GlobalTempRepoAt.getFloat32Array1()
  ->Matrix4.invert(getLocalToWorldMatrix(parent)->LocalToWorldMatrixVO.value)
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
