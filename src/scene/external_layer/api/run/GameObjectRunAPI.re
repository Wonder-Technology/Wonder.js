let create = () => {
  GameObjectApService.create();
};

let addTransform = (gameObject, transform) => {
  GameObjectApService.addTransform(gameObject, transform);
};

let getTransform = gameObject => {
  GameObjectApService.getTransform(gameObject);
};

let hasTransform = gameObject => {
  GameObjectApService.hasTransform(gameObject);
};
