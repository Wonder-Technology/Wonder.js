let create = () => {
  TransformApService.create();
};

let getGameObject = transform => {
  TransformApService.getGameObject(transform);
};

let getParent = transform => {
  TransformApService.getParent(transform);
};

let hasParent = transform => {
  TransformApService.hasParent(transform);
};

let setParent = (parent, child) => {
  TransformApService.setParent(parent, child);
};

let getChildren = transform => {
  TransformApService.getChildren(transform);
};
