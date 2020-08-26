let getMaxUID = () => {
  DpContainer.unsafeGetGameObjectRepoDp().getMaxUID();
};

let setMaxUID = uid => {
  DpContainer.unsafeGetGameObjectRepoDp().setMaxUID(uid);
};

let addTransform = (gameObject, transform) => {
  DpContainer.unsafeGetGameObjectRepoDp().addTransform(
    gameObject->GameObjectEntity.value,
    transform->TransformEntity.value,
  );
};

let getTransform = gameObject => {
  DpContainer.unsafeGetGameObjectRepoDp().getTransform(
    gameObject->GameObjectEntity.value,
  );
};

let hasTransform = gameObject => {
  DpContainer.unsafeGetGameObjectRepoDp().hasTransform(
    gameObject->GameObjectEntity.value,
  );
};
