let handleAddComponent =
  (. material, gameObject) => {
    DpContainer.unsafeGetBRDFMaterialRepoDp().addGameObject(
      material,
      gameObject,
    );
  };
