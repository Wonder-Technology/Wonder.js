let lookAt = (~transform, ~target, ~up=(0., 1., 0.), ()) => {
	UpdateTransformDoService.updateAndSetRotation(
		transform,
    Matrix4.setLookAt(
      UpdateTransformDoService.updateAndGetPosition(
      transform,
      ) -> PositionVO.value,
      target,
      up,
    )
    -> Quaternion.setFromMatrix
    -> RotationVO.create
	)
}