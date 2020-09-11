let _check = (hasComponentFunc, gameObject) => {
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
  );
};

let _addComponent =
    (
      (hasComponentFunc, addComponentFunc, handleAddComponentFunc),
      (gameObject, component),
    ) => {
  _check(hasComponentFunc, gameObject)
  ->Result.mapSuccess(() => {
      addComponentFunc(gameObject, component);

      handleAddComponentFunc(. component, gameObject);

      gameObject->GameObjectEntity.create;
    });
};

let addTransform = (gameObject, transform) => {
  _addComponent(
    (
      DpContainer.unsafeGetGameObjectRepoDp().hasTransform,
      DpContainer.unsafeGetGameObjectRepoDp().addTransform,
      AddTransformDoService.handleAddComponent,
    ),
    (gameObject->GameObjectEntity.value, transform->TransformEntity.value),
  );
};

let addPBRMaterial = (gameObject, material) => {
  _addComponent(
    (
      DpContainer.unsafeGetGameObjectRepoDp().hasPBRMaterial,
      DpContainer.unsafeGetGameObjectRepoDp().addPBRMaterial,
      AddPBRMaterialDoService.handleAddComponent,
    ),
    (gameObject->GameObjectEntity.value, material->PBRMaterialEntity.value),
  );
};

let addGeometry = (gameObject, geometry) => {
  _addComponent(
    (
      DpContainer.unsafeGetGameObjectRepoDp().hasGeometry,
      DpContainer.unsafeGetGameObjectRepoDp().addGeometry,
      AddGeometryDoService.handleAddComponent,
    ),
    (gameObject->GameObjectEntity.value, geometry->GeometryEntity.value),
  );
};

let addDirectionLight = (gameObject, light) => {
  _addComponent(
    (
      DpContainer.unsafeGetGameObjectRepoDp().hasDirectionLight,
      DpContainer.unsafeGetGameObjectRepoDp().addDirectionLight,
      AddDirectionLightDoService.handleAddComponent,
    ),
    (gameObject->GameObjectEntity.value, light->DirectionLightEntity.value),
  );
};

let addBasicCameraView = (gameObject, cameraView) => {
  _addComponent(
    (
      DpContainer.unsafeGetGameObjectRepoDp().hasBasicCameraView,
      DpContainer.unsafeGetGameObjectRepoDp().addBasicCameraView,
      AddBasicCameraViewDoService.handleAddComponent,
    ),
    (
      gameObject->GameObjectEntity.value,
      cameraView->BasicCameraViewEntity.value,
    ),
  );
};

let addPerspectiveCameraProjection = (gameObject, cameraProjection) => {
  _addComponent(
    (
      DpContainer.unsafeGetGameObjectRepoDp().hasPerspectiveCameraProjection,
      DpContainer.unsafeGetGameObjectRepoDp().addPerspectiveCameraProjection,
      AddPerspectiveCameraProjectionDoService.handleAddComponent,
    ),
    (
      gameObject->GameObjectEntity.value,
      cameraProjection->PerspectiveCameraProjectionEntity.value,
    ),
  );
};
