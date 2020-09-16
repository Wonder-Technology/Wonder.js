let handleAddComponent =
  (. material, gameObject) => {
    DpContainer.unsafeGetPBRMaterialRepoDp().addGameObject(
      material,
      gameObject,
    );
  };
