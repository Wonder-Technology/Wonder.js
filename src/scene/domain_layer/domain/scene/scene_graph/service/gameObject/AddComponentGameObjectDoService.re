let _addComponent = ((gameObject, component), handleAddComponentFunc) => {
  GameObjectRepoAt.addTransform(gameObject, component);

  handleAddComponentFunc(. component, gameObject);
};

let addTransform = (gameObject, transform) => {
  _addComponent(
    (gameObject, transform),
    AddTransformDoService.handleAddComponent,
  );
};
