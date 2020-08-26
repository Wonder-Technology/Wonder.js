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

let getChildren = transform => {
  DpContainer.unsafeGetTransformRepoDp().getChildren(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable
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
      let transformRepoDp = DpContainer.unsafeGetTransformRepoDp();

      transformRepoDp.setParent(
        parent->TransformEntity.value,
        child->TransformEntity.value,
      );
      transformRepoDp.addChild(
        parent->TransformEntity.value,
        child->TransformEntity.value,
      );

      ();
    });
};

let _removeFromParentMap = child => {
  DpContainer.unsafeGetTransformRepoDp().removeParent(
    child->TransformEntity.value,
  );
};

let _removeFromChildMap = (parent, child) => {
  DpContainer.unsafeGetTransformRepoDp().removeChild(
    parent->TransformEntity.value,
    child->TransformEntity.value,
  );
};

let _removeFromParent = (currentParent, child) => {
  _removeFromParentMap(child);

  _removeFromChildMap(currentParent, child);
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

let rec _markHierachyDirty = transform => {
  let transformRepoDp = DpContainer.unsafeGetTransformRepoDp();

  transformRepoDp.setIsDirty(transform->TransformEntity.value, true);

  switch (getChildren(transform)) {
  | None => ()
  | Some(children) =>
    children->ListSt.forEach(child => {_markHierachyDirty(child)})
  };
};

let setParent = (parent, child) => {
  _setNewParent(parent, child)
  ->Result.mapSuccess(() => {_markHierachyDirty(child)});
};
