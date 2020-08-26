let rec update = transform =>
  DirtyTransformDoService.isDirty(transform)
    ? {
      TransformRepoAt.setIsDirty(transform, false);

      switch (HierachyTransformDoService.getParent(transform)) {
      | Some(parent) =>
        update(parent);

        let parentLocalToWorldMatrix =
          ModelMatrixTransformDoService.getLocalToWorldMatrix(parent);
        let childLocalToWorldMatrix =
          ModelMatrixTransformDoService.getLocalToWorldMatrix(transform);

        childLocalToWorldMatrix
        ->LocalToWorldMatrixVO.multiply(
            parentLocalToWorldMatrix,
            GlobalTempRepoAt.getFloat32Array1()
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
  update(transform);

  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform)
  ->LocalToWorldMatrixVO.getTranslation;
};

let updateAndSetPosition = (transform, position) =>
  switch (HierachyTransformDoService.getParent(transform)) {
  | None =>
    ModelMatrixTransformDoService.setLocalPosition(transform, position)
    ->Result.succeed
  | Some(parent) =>
    update(parent);

    ModelMatrixTransformDoService.setPosition(transform, parent, position);
  };

let updateAndGetRotation = transform => {
  update(transform);

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
  update(transform);

  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform)
  ->LocalToWorldMatrixVO.getScale;
};

let updateAndSetScale = (transform, scale) =>
  switch (HierachyTransformDoService.getParent(transform)) {
  | None =>
    ModelMatrixTransformDoService.setLocalScale(transform, scale)
    ->Result.succeed
  | Some(parent) =>
    update(parent);

    ModelMatrixTransformDoService.setScale(transform, parent, scale);
  };

let updateAndGetEulerAngles = transform => {
  update(transform);

  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform)
  ->LocalToWorldMatrixVO.getEulerAngles;
};

let updateAndSetEulerAngles = (transform, eulerAngles) =>
  updateAndSetRotation(
    transform,
    eulerAngles
    ->EulerAnglesVO.value
    ->Quaternion.setFromEulerAngles
    ->RotationVO.create,
  );
