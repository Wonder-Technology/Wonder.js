let rotateLocalOnAxis = (transform, (angle, localAxis)) => {
  let rot =
    Quaternion.setFromAxisAngle(
      angle->AngleVO.value,
      localAxis->AxisVO.value,
    );

  ModelMatrixTransformDoService.setLocalRotation(
    transform,
    Quaternion.multiply(
      ModelMatrixTransformDoService.getLocalRotation(transform)
      ->RotationVO.value,
      rot,
    )
    ->RotationVO.create,
  );
};

let rotateWorldOnAxis = (transform, (angle, worldAxis)) => {
  let rot =
    Quaternion.setFromAxisAngle(
      angle->AngleVO.value,
      worldAxis->AxisVO.value,
    );

  ModelMatrixTransformDoService.setLocalRotation(
    transform,
    Quaternion.multiply(
      rot,
      ModelMatrixTransformDoService.getLocalRotation(transform)
      ->RotationVO.value,
    )
    ->RotationVO.create,
  );
};
