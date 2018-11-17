open StateDataMainType;

let _hasMap = (gameObject, {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getLightMaterialComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => false
  | Some(lightMaterial) =>
    OperateLightMaterialMainService.hasDiffuseMap(lightMaterial, state)
    || OperateLightMaterialMainService.hasSpecularMap(lightMaterial, state)
  };

let _getGeometryData =
    ((gameObject, meshIndex), geometry, geometryDataMap, state) =>
  switch (geometryDataMap |> WonderCommonlib.SparseMapService.get(geometry)) {
  | Some((existedMeshIndex, pointAndNameData)) => (
      Some(existedMeshIndex),
      pointAndNameData,
      meshIndex,
      geometryDataMap,
    )

  | None =>
    open GeometryType;

    let (indices16, indices32) =
      switch (
        IndicesGeometryMainService.unsafeGetIndicesType(geometry, state)
      ) {
      | Short => (
          IndicesGeometryMainService.getIndices(. geometry, state) |. Some,
          None,
        )
      | Int => (
          None,
          IndicesGeometryMainService.getIndices32(. geometry, state) |. Some,
        )
      };

    let pointAndNameData =
      Some((
        (
          VerticesGeometryMainService.getVertices(. geometry, state),
          NormalsGeometryMainService.getNormals(. geometry, state),
          TexCoordsGeometryMainService.getTexCoords(. geometry, state),
          indices16,
          indices32,
        ),
        NameGeometryMainService.getName(geometry, state),
      ));

    (
      Some(meshIndex),
      pointAndNameData,
      meshIndex |> succ,
      geometryDataMap
      |> WonderCommonlib.SparseMapService.set(
           geometry,
           (meshIndex, pointAndNameData),
         ),
    );
  };

let _getMeshData =
    ((gameObject, meshIndex), geometryDataMap, {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getGeometryComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, meshIndex, geometryDataMap)
  | Some(geometry) =>
    _getGeometryData(
      (gameObject, meshIndex),
      geometry,
      geometryDataMap,
      state,
    )
  };

let _getBasicMaterialData =
    (
      (gameObject, materialIndex),
      basicMaterialDataMap,
      {gameObjectRecord} as state,
    ) =>
  switch (
    GetComponentGameObjectService.getBasicMaterialComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, materialIndex, basicMaterialDataMap)
  | Some(basicMaterial) =>
    switch (
      basicMaterialDataMap
      |> WonderCommonlib.SparseMapService.get(basicMaterial)
    ) {
    | Some((existedMaterialIndex, materialData)) => (
        Some(existedMaterialIndex),
        materialData,
        materialIndex,
        basicMaterialDataMap,
      )
    | None =>
      let materialData =
        Some((
          basicMaterial,
          NameBasicMaterialMainService.getName(basicMaterial, state),
        ));

      (
        Some(materialIndex),
        materialData,
        materialIndex |> succ,
        basicMaterialDataMap
        |> WonderCommonlib.SparseMapService.set(
             basicMaterial,
             (materialIndex, materialData),
           ),
      );
    }
  };

let _getLightMaterialData =
    (
      (gameObject, materialIndex),
      lightMaterialDataMap,
      {gameObjectRecord} as state,
    ) =>
  switch (
    GetComponentGameObjectService.getLightMaterialComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, materialIndex, lightMaterialDataMap)
  | Some(lightMaterial) =>
    switch (
      lightMaterialDataMap
      |> WonderCommonlib.SparseMapService.get(lightMaterial)
    ) {
    | Some((existedMaterialIndex, materialData)) => (
        Some(existedMaterialIndex),
        materialData,
        materialIndex,
        lightMaterialDataMap,
      )
    | None =>
      let materialData =
        Some((
          lightMaterial,
          NameLightMaterialMainService.getName(lightMaterial, state),
        ));

      (
        Some(materialIndex),
        materialData,
        materialIndex |> succ,
        lightMaterialDataMap
        |> WonderCommonlib.SparseMapService.set(
             lightMaterial,
             (materialIndex, materialData),
           ),
      );
    }
  };

let _getMeshRendererData =
    ((gameObject, meshRendererIndex), {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getMeshRendererComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, meshRendererIndex)

  | Some(meshRenderer) =>
    let meshRendererData = Some(meshRenderer);

    (Some(meshRendererIndex), meshRendererData, meshRendererIndex |> succ);
  };

let _getBasicCameraViewData =
    ((gameObject, basicCameraViewIndex), {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getBasicCameraViewComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, basicCameraViewIndex)

  | Some(cameraView) =>
    let basicCameraViewData = Some(cameraView);

    (
      Some(basicCameraViewIndex),
      basicCameraViewData,
      basicCameraViewIndex |> succ,
    );
  };

let _getCameraProjectionData =
    ((gameObject, cameraProjectionIndex), {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getPerspectiveCameraProjectionComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, cameraProjectionIndex)

  | Some(perspectiveCamera) =>
    let cameraProjectionData = Some(perspectiveCamera);

    (
      Some(cameraProjectionIndex),
      cameraProjectionData,
      cameraProjectionIndex |> succ,
    );
  };

let _getArcballCameraControllerData =
    (
      (gameObject, arcballCameraControllerIndex),
      {gameObjectRecord} as state,
    ) =>
  switch (
    GetComponentGameObjectService.getArcballCameraControllerComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, arcballCameraControllerIndex)

  | Some(arcballCameraController) => (
      Some(arcballCameraControllerIndex),
      Some(arcballCameraController),
      arcballCameraControllerIndex |> succ,
    )
  };

let _getLightData = ((gameObject, lightIndex), {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getDirectionLightComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None =>
    switch (
      GetComponentGameObjectService.getPointLightComponent(.
        gameObject,
        gameObjectRecord,
      )
    ) {
    | None => (None, None, lightIndex)

    | Some(light) =>
      let lightData = Some(("point", light));

      (Some(lightIndex), lightData, lightIndex |> succ);
    }

  | Some(light) =>
    let lightData = Some(("directional", light));

    (Some(lightIndex), lightData, lightIndex |> succ);
  };

let getComponentData =
    (
      (
        gameObject,
        state,
        (
          meshIndex,
          meshRendererIndex,
          basicMaterialIndex,
          lightMaterialIndex,
          basicCameraViewIndex,
          cameraProjectionIndex,
          arcballCameraControllerIndex,
          lightIndex,
        ),
        (geometryDataMap, basicMaterialDataMap, lightMaterialDataMap),
        (
          meshPointAndNameDataMap,
          meshRendererDataMap,
          resultBasicMaterialDataMap,
          resultLightMaterialDataMap,
          basicCameraViewDataMap,
          cameraProjectionDataMap,
          arcballCameraControllerDataMap,
          lightDataMap,
        ),
      ),
    ) => {
  let (meshIndex, pointAndNameData, newMeshIndex, geometryDataMap) =
    _getMeshData((gameObject, meshIndex), geometryDataMap, state);

  let meshPointAndNameDataMap =
    switch (meshIndex) {
    | None => meshPointAndNameDataMap
    | Some(meshIndex) =>
      meshPointAndNameDataMap
      |> WonderCommonlib.SparseMapService.set(
           meshIndex,
           pointAndNameData |> OptionService.unsafeGet,
         )
    };

  let (meshRendererIndex, meshRendererData, newMeshRendererIndex) =
    _getMeshRendererData((gameObject, meshRendererIndex), state);

  let meshRendererDataMap =
    switch (meshRendererIndex) {
    | None => meshRendererDataMap
    | Some(meshRendererIndex) =>
      meshRendererDataMap
      |> WonderCommonlib.SparseMapService.set(
           meshRendererIndex,
           meshRendererData |> OptionService.unsafeGet,
         )
    };

  let (
    basicMaterialIndex,
    basicMaterialData,
    newBasicMaterialIndex,
    basicMaterialDataMap,
  ) =
    _getBasicMaterialData(
      (gameObject, basicMaterialIndex),
      basicMaterialDataMap,
      state,
    );

  let resultBasicMaterialDataMap =
    switch (basicMaterialIndex) {
    | None => resultBasicMaterialDataMap
    | Some(basicMaterialIndex) =>
      resultBasicMaterialDataMap
      |> WonderCommonlib.SparseMapService.set(
           basicMaterialIndex,
           basicMaterialData |> OptionService.unsafeGet,
         )
    };

  let (
    lightMaterialIndex,
    lightMaterialData,
    newLightMaterialIndex,
    lightMaterialDataMap,
  ) =
    _getLightMaterialData(
      (gameObject, lightMaterialIndex),
      lightMaterialDataMap,
      state,
    );

  let resultLightMaterialDataMap =
    switch (lightMaterialIndex) {
    | None => resultLightMaterialDataMap
    | Some(lightMaterialIndex) =>
      resultLightMaterialDataMap
      |> WonderCommonlib.SparseMapService.set(
           lightMaterialIndex,
           lightMaterialData |> OptionService.unsafeGet,
         )
    };

  let (basicCameraViewIndex, basicCameraViewData, newBasicCameraViewIndex) =
    _getBasicCameraViewData((gameObject, basicCameraViewIndex), state);

  let basicCameraViewDataMap =
    switch (basicCameraViewIndex) {
    | None => basicCameraViewDataMap
    | Some(basicCameraViewIndex) =>
      basicCameraViewDataMap
      |> WonderCommonlib.SparseMapService.set(
           basicCameraViewIndex,
           basicCameraViewData |> OptionService.unsafeGet,
         )
    };

  /* TODO support ortho camera */
  let (cameraProjectionIndex, cameraProjectionData, newCameraProjectionIndex) =
    _getCameraProjectionData((gameObject, cameraProjectionIndex), state);

  let cameraProjectionDataMap =
    switch (cameraProjectionIndex) {
    | None => cameraProjectionDataMap
    | Some(cameraProjectionIndex) =>
      cameraProjectionDataMap
      |> WonderCommonlib.SparseMapService.set(
           cameraProjectionIndex,
           cameraProjectionData |> OptionService.unsafeGet,
         )
    };

  let (
    arcballCameraControllerIndex,
    arcballCameraControllerData,
    newCameraControllerIndex,
  ) =
    _getArcballCameraControllerData(
      (gameObject, arcballCameraControllerIndex),
      state,
    );

  let arcballCameraControllerDataMap =
    switch (arcballCameraControllerIndex) {
    | None => arcballCameraControllerDataMap
    | Some(arcballCameraControllerIndex) =>
      arcballCameraControllerDataMap
      |> WonderCommonlib.SparseMapService.set(
           arcballCameraControllerIndex,
           arcballCameraControllerData |> OptionService.unsafeGet,
         )
    };

  let (lightIndex, lightData, newLightIndex) =
    _getLightData((gameObject, lightIndex), state);

  let lightDataMap =
    switch (lightIndex) {
    | None => lightDataMap
    | Some(lightIndex) =>
      lightDataMap
      |> WonderCommonlib.SparseMapService.set(
           lightIndex,
           lightData |> OptionService.unsafeGet,
         )
    };

  (
    state,
    (
      meshIndex,
      meshRendererIndex,
      basicMaterialIndex,
      lightMaterialIndex,
      basicCameraViewIndex,
      cameraProjectionIndex,
      arcballCameraControllerIndex,
      lightIndex,
    ),
    (
      newMeshIndex,
      newMeshRendererIndex,
      newBasicMaterialIndex,
      newLightMaterialIndex,
      newBasicCameraViewIndex,
      newCameraProjectionIndex,
      newCameraControllerIndex,
      newLightIndex,
    ),
    (geometryDataMap, basicMaterialDataMap, lightMaterialDataMap),
    (
      meshPointAndNameDataMap,
      meshRendererDataMap,
      resultBasicMaterialDataMap,
      resultLightMaterialDataMap,
      basicCameraViewDataMap,
      cameraProjectionDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
  );
};