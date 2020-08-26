let getTransform = gameObject =>
  GameObjectRepoAt.getTransform(gameObject)
  ->OptionSt.fromNullable
  ->OptionSt.map(TransformEntity.create);
