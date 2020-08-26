let isDirty = transform =>
  switch (TransformRepoAt.getIsDirty(transform)) {
  | None => false
  | Some(isDirty) => isDirty === true
  };
