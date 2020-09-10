let mark = (transform, isDirty) => {
  DpContainer.unsafeGetTransformRepoDp().setIsDirty(
    transform->TransformEntity.value,
    isDirty,
  );
};

let isDirty = transform =>
  switch (
    DpContainer.unsafeGetTransformRepoDp().getIsDirty(
      transform->TransformEntity.value,
    )
    ->OptionSt.fromNullable
  ) {
  | None => false
  | Some(isDirty) => isDirty === true
  };
