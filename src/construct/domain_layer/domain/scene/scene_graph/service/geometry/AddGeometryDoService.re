let handleAddComponent =
  (. geometry, gameObject) => {
    DpContainer.unsafeGetGeometryRepoDp().addGameObject(geometry, gameObject);
  };
