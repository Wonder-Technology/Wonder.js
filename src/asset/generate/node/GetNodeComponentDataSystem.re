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

let _getBoxGeometryData =
    (
      (gameObject, meshIndex),
      geometry,
      (boxGeometryDataMap, customGeometryDataMap),
      state,
    ) =>
  switch (
    boxGeometryDataMap |> WonderCommonlib.SparseMapService.get(geometry)
  ) {
  | Some((existedMeshIndex, pointData)) => (
      Some(existedMeshIndex),
      pointData,
      meshIndex,
      (boxGeometryDataMap, customGeometryDataMap),
    )

  | None =>
    let pointData =
      Some((
        GetBoxGeometryVerticesMainService.getVertices(. state),
        GetBoxGeometryNormalsMainService.getNormals(. state),
        _hasMap(gameObject, state) ?
          Some(GetBoxGeometryTexCoordsMainService.getTexCoords(. state)) :
          None,
        GetBoxGeometryIndicesMainService.getIndices(. state),
      ));

    (
      Some(meshIndex),
      pointData,
      meshIndex |> succ,
      (
        boxGeometryDataMap
        |> WonderCommonlib.SparseMapService.set(
             geometry,
             (meshIndex, pointData),
           ),
        customGeometryDataMap,
      ),
    );
  };

let _getCustomGeometryData =
    (
      (gameObject, meshIndex),
      geometry,
      (boxGeometryDataMap, customGeometryDataMap),
      state,
    ) =>
  switch (
    customGeometryDataMap |> WonderCommonlib.SparseMapService.get(geometry)
  ) {
  | Some((existedMeshIndex, pointData)) => (
      Some(existedMeshIndex),
      pointData,
      meshIndex,
      (boxGeometryDataMap, customGeometryDataMap),
    )

  | None =>
    let pointData =
      Some((
        VerticesCustomGeometryMainService.getVertices(. geometry, state),
        NormalsCustomGeometryMainService.getNormals(. geometry, state),
        _hasMap(gameObject, state) ?
          Some(
            TexCoordsCustomGeometryMainService.getTexCoords(.
              geometry,
              state,
            ),
          ) :
          None,
        IndicesCustomGeometryMainService.getIndices(. geometry, state),
      ));

    (
      Some(meshIndex),
      pointData,
      meshIndex |> succ,
      (
        boxGeometryDataMap,
        customGeometryDataMap
        |> WonderCommonlib.SparseMapService.set(
             geometry,
             (meshIndex, pointData),
           ),
      ),
    );
  };

let _getMeshData =
    (
      (gameObject, meshIndex),
      (boxGeometryDataMap, customGeometryDataMap),
      {gameObjectRecord} as state,
    ) =>
  switch (
    GetComponentGameObjectService.getGeometryComponentData(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (
      None,
      None,
      meshIndex,
      (boxGeometryDataMap, customGeometryDataMap),
    )

  | Some((geometry, type_)) =>
    switch (type_) {
    | type_ when type_ === CurrentComponentDataMapService.getBoxGeometryType() =>
      _getBoxGeometryData(
        (gameObject, meshIndex),
        geometry,
        (boxGeometryDataMap, customGeometryDataMap),
        state,
      )
    | type_
        when type_ === CurrentComponentDataMapService.getCustomGeometryType() =>
      _getCustomGeometryData(
        (gameObject, meshIndex),
        geometry,
        (boxGeometryDataMap, customGeometryDataMap),
        state,
      )
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="unknown type_",
          ~description={j||j},
          ~reason="",
          ~solution={j||j},
          ~params={j|type_: $type_|j},
        ),
      )
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

let _getCameraData =
    ((gameObject, cameraIndex), {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getPerspectiveCameraProjectionComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, cameraIndex)

  | Some(perspectiveCamera) =>
    let cameraData = Some(perspectiveCamera);

    (Some(cameraIndex), cameraData, cameraIndex |> succ);
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
        (meshIndex, materialIndex, cameraIndex, lightIndex),
        ((boxGeometryDataMap, customGeometryDataMap), lightMaterialDataMap),
        (meshPointDataMap, materialDataMap, cameraDataMap, lightDataMap),
      ),
    ) => {
  let (
    meshIndex,
    pointData,
    newMeshIndex,
    (boxGeometryDataMap, customGeometryDataMap),
  ) =
    _getMeshData(
      (gameObject, meshIndex),
      (boxGeometryDataMap, customGeometryDataMap),
      state,
    );

  let meshPointDataMap =
    switch (meshIndex) {
    | None => meshPointDataMap
    | Some(meshIndex) =>
      meshPointDataMap
      |> WonderCommonlib.SparseMapService.set(
           meshIndex,
           pointData |> OptionService.unsafeGet,
         )
    };

  let (materialIndex, materialData, newMaterialIndex, lightMaterialDataMap) =
    _getLightMaterialData(
      (gameObject, materialIndex),
      lightMaterialDataMap,
      state,
    );

  let materialDataMap =
    switch (materialIndex) {
    | None => materialDataMap
    | Some(materialIndex) =>
      materialDataMap
      |> WonderCommonlib.SparseMapService.set(
           materialIndex,
           materialData |> OptionService.unsafeGet,
         )
    };

  /* TODO support ortho camera */
  let (cameraIndex, cameraData, newCameraIndex) =
    _getCameraData((gameObject, cameraIndex), state);

  let cameraDataMap =
    switch (cameraIndex) {
    | None => cameraDataMap
    | Some(cameraIndex) =>
      cameraDataMap
      |> WonderCommonlib.SparseMapService.set(
           cameraIndex,
           cameraData |> OptionService.unsafeGet,
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
    (meshIndex, materialIndex, cameraIndex, lightIndex),
    (newMeshIndex, newMaterialIndex, newCameraIndex, newLightIndex),
    ((boxGeometryDataMap, customGeometryDataMap), lightMaterialDataMap),
    (meshPointDataMap, materialDataMap, cameraDataMap, lightDataMap),
  );
};