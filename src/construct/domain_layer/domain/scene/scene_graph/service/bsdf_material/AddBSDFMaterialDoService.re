let handleAddComponent =
  (. material, gameObject) => {
    DpContainer.unsafeGetBSDFMaterialRepoDp().addGameObject(
      material,
      gameObject,
    );
  };
