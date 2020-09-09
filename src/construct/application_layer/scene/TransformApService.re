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

let removeParent = parent => {
  HierachyTransformDoService.removeParent(parent);
};

let getChildren = transform => {
  HierachyTransformDoService.getChildren(transform);
};

let getLocalPosition = transform => {
  ModelMatrixTransformDoService.getLocalPosition(transform);
};

let setLocalPosition = (transform, localPosition) => {
  ModelMatrixTransformDoService.setLocalPosition(transform, localPosition);
};

let getPosition = transform => {
  UpdateTransformDoService.updateAndGetPosition(transform);
};

let setPosition = (transform, position) => {
  UpdateTransformDoService.updateAndSetPosition(transform, position);
};

let getLocalRotation = transform => {
  ModelMatrixTransformDoService.getLocalRotation(transform);
};

let setLocalRotation = (transform, localRotation) => {
  ModelMatrixTransformDoService.setLocalRotation(transform, localRotation);
};

let getRotation = transform => {
  UpdateTransformDoService.updateAndGetRotation(transform);
};

let setRotation = (transform, rotation) => {
  UpdateTransformDoService.updateAndSetRotation(transform, rotation);
};

let getLocalScale = transform => {
  ModelMatrixTransformDoService.getLocalScale(transform);
};

let setLocalScale = (transform, localScale) => {
  ModelMatrixTransformDoService.setLocalScale(transform, localScale);
};

let getScale = transform => {
  UpdateTransformDoService.updateAndGetScale(transform);
};

let setScale = (transform, scale) => {
  UpdateTransformDoService.updateAndSetScale(transform, scale);
};

let getLocalEulerAngles = transform => {
  ModelMatrixTransformDoService.getLocalEulerAngles(transform);
};

let setLocalEulerAngles = (transform, localEulerAngles) => {
  ModelMatrixTransformDoService.setLocalEulerAngles(
    transform,
    localEulerAngles,
  );
};

let getEulerAngles = transform => {
  UpdateTransformDoService.updateAndGetEulerAngles(transform);
};

let setEulerAngles = (transform, eulerAngles) => {
  UpdateTransformDoService.updateAndSetEulerAngles(transform, eulerAngles);
};

let rotateLocalOnAxis = (transform, (angle, localAxis)) => {
  RotateTransformDoService.rotateLocalOnAxis(transform, (angle, localAxis));
};

let rotateWorldOnAxis = (transform, (angle, worldAxis)) => {
  RotateTransformDoService.rotateWorldOnAxis(transform, (angle, worldAxis));
};

let getLocalToWorldMatrix = transform => {
  ModelMatrixTransformDoService.getLocalToWorldMatrix(transform);
};

let getNormalMatrix = transform => {
  ModelMatrixTransformDoService.getNormalMatrix(transform);
};
