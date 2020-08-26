let hasParent = transform => {
  TransformRepoAt.hasParent(transform);
};

let getParent = transform => {
  TransformRepoAt.getParent(transform);
};

let getChildren = transform => {
  TransformRepoAt.getChildren(transform);
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
      TransformRepoAt.setParent(parent, child);
      TransformRepoAt.addChild(parent, child);
    });
};

let _removeParent = child => {
  TransformRepoAt.removeParent(child);
};

let _removeChild = (parent, child) => {
  TransformRepoAt.removeChild(parent, child);
};

let _removeFromParent = (currentParent, child) => {
  _removeParent(child);

  _removeChild(currentParent, child);
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
  TransformRepoAt.setIsDirty(transform, true);

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
