let handleAddComponent =
  (. light, gameObject) => {
    DpContainer.unsafeGetDirectionLightRepoDp().setGameObject(
      light,
      gameObject,
    );
  };
