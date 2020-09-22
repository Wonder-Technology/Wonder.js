let rec mutableUpdate = transform =>
  DirtyTransformDoService.isDirty(transform)
    ? {
      DirtyTransformDoService.mark(transform, false);

      switch (HierachyTransformDoService.getParent(transform)) {
      | Some(parent) =>
        mutableUpdate(parent);

        let parentLocalToWorldMatrix =
          ModelMatrixTransformDoService.getLocalToWorldMatrix(parent);
        let childLocalToWorldMatrix =
          ModelMatrixTransformDoService.getLocalToWorldMatrix(transform);

        childLocalToWorldMatrix
        ->LocalToWorldMatrixVO.multiply(
            parentLocalToWorldMatrix,
            DpContainer.unsafeGetGlobalTempRepoDp().getFloat32Array1()
            ->LocalToWorldMatrixVO.create
            ->LocalToWorldMatrixVO.fromTranslationRotationScale(
                ModelMatrixTransformDoService.getLocalPosition(transform),
                ModelMatrixTransformDoService.getLocalRotation(transform),
                ModelMatrixTransformDoService.getLocalScale(transform),
              ),
          )
        ->ignore;
      | None =>
        let localToWorldMatrix =
          ModelMatrixTransformDoService.getLocalToWorldMatrix(transform);

        localToWorldMatrix
        ->LocalToWorldMatrixVO.fromTranslationRotationScale(
            ModelMatrixTransformDoService.getLocalPosition(transform),
            ModelMatrixTransformDoService.getLocalRotation(transform),
            ModelMatrixTransformDoService.getLocalScale(transform),
          )
        ->ignore;
      };
    }
    : {
      ();
    };

let updateAndGetPosition = transform => {
  mutableUpdate(transform);

  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform)
  ->LocalToWorldMatrixVO.getTranslation;
};

let updateAndSetPosition = (transform, position) =>
  switch (HierachyTransformDoService.getParent(transform)) {
  | None =>
    ModelMatrixTransformDoService.setLocalPosition(transform, position)
  | Some(parent) =>
    mutableUpdate(parent);

    ModelMatrixTransformDoService.setPosition(transform, parent, position);
  };

let updateAndGetRotation = transform => {
  mutableUpdate(transform);

  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform)
  ->LocalToWorldMatrixVO.getRotation;
};

let updateAndSetRotation = (transform, rotation) =>
  switch (HierachyTransformDoService.getParent(transform)) {
  | None =>
    ModelMatrixTransformDoService.setLocalRotation(transform, rotation)
  | Some(parent) =>
    ModelMatrixTransformDoService.setLocalRotation(
      transform,
      updateAndGetRotation(parent)
      ->RotationVO.invert
      ->(RotationVO.multiply(rotation)),
    )
  };

let updateAndGetScale = transform => {
  mutableUpdate(transform);

  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform)
  ->LocalToWorldMatrixVO.getScale;
};

let updateAndSetScale = (transform, scale) =>
  switch (HierachyTransformDoService.getParent(transform)) {
  | None => ModelMatrixTransformDoService.setLocalScale(transform, scale)
  | Some(parent) =>
    mutableUpdate(parent);

    ModelMatrixTransformDoService.setScale(transform, parent, scale);
  };

let updateAndGetEulerAngles = transform => {
  mutableUpdate(transform);

  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform)
  ->LocalToWorldMatrixVO.getEulerAngles;
};

let updateAndSetEulerAngles = (transform, eulerAngles) =>
  updateAndSetRotation(
    transform,
    eulerAngles->EulerAnglesVO.convertToQuaternion->RotationVO.create,
  );

let setLookAt = (transform, target) => {
  ModelMatrixTransformDoService.setLocalToWorldMatrix(
    transform,
    Matrix4.setLookAt(
      updateAndGetPosition(
        transform,
      ) -> PositionVO.value,
      target,
      (0., 1., 0.),
    )
  )
}