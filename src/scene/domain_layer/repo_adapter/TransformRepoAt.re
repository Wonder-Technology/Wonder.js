let getMaxIndex = () => {
  DpContainer.unsafeGetTransformRepoDp().getMaxIndex();
};

let setMaxIndex = index => {
  DpContainer.unsafeGetTransformRepoDp().setMaxIndex(index);
};

let setIsDirtyByIndex = index => {
  DpContainer.unsafeGetTransformRepoDp().setIsDirty(index);
};

let setIsDirty = transform => {
  DpContainer.unsafeGetTransformRepoDp().setIsDirty(
    transform->TransformEntity.value,
  );
};

let addGameObject = (transform, gameObject) => {
  DpContainer.unsafeGetTransformRepoDp().addGameObject(
    transform->TransformEntity.value,
    gameObject->GameObjectEntity.value,
  );
};

let getGameObject = transform => {
  DpContainer.unsafeGetTransformRepoDp().getGameObject(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(GameObjectEntity.create);
};

let hasParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().hasParent(
    transform->TransformEntity.value,
  );
};

let getParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().getParent(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(TransformEntity.create);
};

let setParent = (parent, child) => {
  DpContainer.unsafeGetTransformRepoDp().setParent(
    parent->TransformEntity.value,
    child->TransformEntity.value,
  );
};

let removeParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().removeParent(
    transform->TransformEntity.value,
  );
};

let getChildren = transform => {
  DpContainer.unsafeGetTransformRepoDp().getChildren(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(children => children->ListSt.map(TransformEntity.create));
};

let setChildrenByIndex = (parentIndex, childrenIndex) => {
  DpContainer.unsafeGetTransformRepoDp().setChildren(
    parentIndex,
    childrenIndex,
  );
};

let addChild = (parent, child) => {
  DpContainer.unsafeGetTransformRepoDp().addChild(
    parent->TransformEntity.value,
    child->TransformEntity.value,
  );
};

let removeChild = (parent, child) => {
  DpContainer.unsafeGetTransformRepoDp().removeChild(
    parent->TransformEntity.value,
    child->TransformEntity.value,
  );
};
