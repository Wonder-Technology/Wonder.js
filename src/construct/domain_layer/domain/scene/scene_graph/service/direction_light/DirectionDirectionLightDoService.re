let getDirection = light =>
  GameObjectDirectionLightDoService.getGameObject(light)
  ->OptionSt.map(gameObject => {
      GetComponentGameObjectDoService.getTransform(gameObject)
      ->OptionSt.map(transform => {
          UpdateTransformDoService.updateAndGetEulerAngles(transform)
          ->EulerAnglesVO.convertToQuaternion
          ->Vector3.transformQuat((0., 0., 1.))
          ->DirectionVO.create
        })
    })
  ->OptionSt.open_;
