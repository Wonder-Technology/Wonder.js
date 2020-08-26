let create = () => {
  CreateTransformDoService.create();
};

let getGameObject = transform => {
  GameObjectTransformDoService.getGameObject(transform);
};

let getParent = transform => {
  HierachyTransformDoService.getParent(transform);
};

let hasParent = transform => {
  HierachyTransformDoService.hasParent(transform);
};

let setParent = (parent, child) => {
  HierachyTransformDoService.setParent(parent, child);
};

let getChildren = transform => {
  HierachyTransformDoService.getChildren(transform);
};
