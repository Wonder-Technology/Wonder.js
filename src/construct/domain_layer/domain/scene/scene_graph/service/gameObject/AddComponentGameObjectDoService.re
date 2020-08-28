let _addComponent = ((gameObject, component), handleAddComponentFunc) => {
  DpContainer.unsafeGetGameObjectRepoDp().addTransform(gameObject, component);

  handleAddComponentFunc(. component, gameObject);
};

let addTransform = (gameObject, transform) => {
  _addComponent(
    (gameObject->GameObjectEntity.value, transform->TransformEntity.value),
    AddTransformDoService.handleAddComponent,
  );
};
