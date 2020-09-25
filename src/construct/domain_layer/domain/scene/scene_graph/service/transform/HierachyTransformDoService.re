let hasParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().hasParent(
    transform->TransformEntity.value,
  );
};

let getParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().getParent(
    transform->TransformEntity.value,
  )
  
  ->OptionSt.map(TransformEntity.create);
};

let getChildren = transform => {
  DpContainer.unsafeGetTransformRepoDp().getChildren(
    transform->TransformEntity.value,
  )
  
  ->OptionSt.map(children => children->ListSt.map(TransformEntity.create));
};

let _addToParent = (parent, child) => {
  Contract.requireCheck(
    () => {
      open Contract;
      open Operators;

      test(
        Log.buildAssertMessage(
          ~expect={j|child not has parent|j},
          ~actual={j|has|j},
        ),
        () =>
        getParent(child)->assertNotExist
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|parent not already has the child|j},
          ~actual={j|has|j},
        ),
        () =>
        switch (getChildren(parent)) {
        | Some(children) => children->ListSt.includes(child)->assertFalse
        | None => assertPass()
        }
      );
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.mapSuccess(() => {
      DpContainer.unsafeGetTransformRepoDp().setParent(
        parent->TransformEntity.value,
        child->TransformEntity.value,
      );
      DpContainer.unsafeGetTransformRepoDp().addChild(
        parent->TransformEntity.value,
        child->TransformEntity.value,
      );
    });
};

let _removeParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().removeParent(
    transform->TransformEntity.value,
  );
};

let _removeChild = (parent, child) => {
  DpContainer.unsafeGetTransformRepoDp().removeChild(
    parent->TransformEntity.value,
    child->TransformEntity.value,
  );
};

let _removeFromParent = (currentParent, child) => {
  _removeParent(child);

  _removeChild(currentParent, child);
};

let removeParent = transform => {
  switch (getParent(transform)) {
  | None => ()
  | Some(currentParent) => _removeFromParent(currentParent, transform)
  };
};

let _setNewParent = (parent, child) =>
  switch (getParent(child)) {
  | None => _addToParent(parent, child)
  | Some(currentParent) =>
    !TransformEntity.isSame(currentParent, parent)
      ? {
        _removeFromParent(currentParent, child);
        _addToParent(parent, child);
      }
      : Result.succeed()
  };

let rec markHierachyDirty = transform => {
  DirtyTransformDoService.mark(transform, true);

  switch (getChildren(transform)) {
  | None => ()
  | Some(children) =>
    children->ListSt.forEach(child => {markHierachyDirty(child)})
  };
};

let setParent = (parent, child) => {
  _setNewParent(parent, child)
  ->Result.mapSuccess(() => {markHierachyDirty(child)});
};
