let _addComponent =
    (
      (gameObject, component),
      (hasComponentFunc, addComponentFunc, handleAddComponentFunc),
    ) => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          test(
            Log.buildAssertMessage(
              ~expect=
                {j|this type of the component shouldn't be added before|j},
              ~actual={j|not|j},
            ),
            () => {
            hasComponentFunc(gameObject)->assertFalse
          })
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.mapSuccess(() => {
      addComponentFunc(gameObject, component);

      handleAddComponentFunc(. component, gameObject);

      gameObject->GameObjectEntity.create;
    });
};

let addTransform = (gameObject, transform) => {
  _addComponent(
    (gameObject->GameObjectEntity.value, transform->TransformEntity.value),
    (
      DpContainer.unsafeGetGameObjectRepoDp().hasTransform,
      DpContainer.unsafeGetGameObjectRepoDp().addTransform,
      AddTransformDoService.handleAddComponent,
    ),
  );
};
