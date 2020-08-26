let create = () => {
  CreateGameObjectDoService.create();
};

let addTransform = (gameObject, transform) => {
  AddComponentGameObjectDoService.addTransform(gameObject, transform);
};

let getTransform = gameObject => {
  GetComponentGameObjectDoService.getTransform(gameObject);
};

let hasTransform = gameObject => {
  HasComponentGameObjectDoService.hasTransform(gameObject);
};
