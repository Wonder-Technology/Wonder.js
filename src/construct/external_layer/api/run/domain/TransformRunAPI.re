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

let removeParent = transform => {
  TransformApService.removeParent(transform);
};

let getChildren = transform => {
  TransformApService.getChildren(transform);
};

let getLocalPosition = transform => {
  TransformApService.getLocalPosition(transform);
};

let setLocalPosition = (transform, localPosition) => {
  TransformApService.setLocalPosition(transform, localPosition);
};

let getPosition = transform => {
  TransformApService.getPosition(transform);
};

let setPosition = (transform, position) => {
  TransformApService.setPosition(transform, position);
};

let getLocalRotation = transform => {
  TransformApService.getLocalRotation(transform);
};

let setLocalRotation = (transform, localRotation) => {
  TransformApService.setLocalRotation(transform, localRotation);
};

let getRotation = transform => {
  TransformApService.getRotation(transform);
};

let setRotation = (transform, rotation) => {
  TransformApService.setRotation(transform, rotation);
};

let getLocalScale = transform => {
  TransformApService.getLocalScale(transform);
};

let setLocalScale = (transform, localScale) => {
  TransformApService.setLocalScale(transform, localScale);
};

let getScale = transform => {
  TransformApService.getScale(transform);
};

let setScale = (transform, scale) => {
  TransformApService.setScale(transform, scale);
};

let getLocalEulerAngles = transform => {
  TransformApService.getLocalEulerAngles(transform);
};

let setLocalEulerAngles = (transform, localEulerAngles) => {
  TransformApService.setLocalEulerAngles(transform, localEulerAngles);
};

let getEulerAngles = transform => {
  TransformApService.getEulerAngles(transform);
};

let setEulerAngles = (transform, eulerAngles) => {
  TransformApService.setEulerAngles(transform, eulerAngles);
};

let rotateLocalOnAxis = (transform, (angle, localAxis)) => {
  TransformApService.rotateLocalOnAxis(transform, (angle, localAxis));
};

let rotateWorldOnAxis = (transform, (angle, worldAxis)) => {
  TransformApService.rotateWorldOnAxis(transform, (angle, worldAxis));
};

let getLocalToWorldMatrix = transform => {
  TransformApService.getLocalToWorldMatrix(transform);
};

let getNormalMatrix = transform => {
  TransformApService.getNormalMatrix(transform);
};

let getMaxIndex = TransformApService.getMaxIndex;

let mutableUpdate = TransformApService.mutableUpdate;

let lookAt = TransformApService.lookAt;
