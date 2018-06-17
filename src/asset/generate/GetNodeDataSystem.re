open StateDataMainType;

open GenerateSceneGraphType;

let _getChildren = (parent, transformRecord) =>
  HierachyTransformService.unsafeGetChildren(parent, transformRecord);

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

let _setChildren =
    (gameObjectChildrenMap, gameObjectNodeIndexMap, nodeDataArr) =>
  nodeDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. newNodeDataArr, ({gameObject}: nodeData) as nodeData) =>
         newNodeDataArr
         |> ArrayService.push({
              ...nodeData,
              children:
                switch (
                  gameObjectChildrenMap
                  |> WonderCommonlib.SparseMapService.get(gameObject)
                ) {
                | None => None
                | Some(children) =>
                  children
                  |> Js.Array.map(childGameObject =>
                       gameObjectNodeIndexMap
                       |> WonderCommonlib.SparseMapService.unsafeGet(
                            childGameObject,
                          )
                     )
                  |. Some
                },
            }),
       [||],
     );

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
              Some(
                GetBoxGeometryTexCoordsMainService.getTexCoords(. state),
              ) :
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
      }

    | type_
        when type_ === CurrentComponentDataMapService.getCustomGeometryType() =>
      switch (
        customGeometryDataMap
        |> WonderCommonlib.SparseMapService.get(geometry)
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
      }
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

let rec _getNodeData =
        (
          state,
          (nodeIndex, meshIndex, materialIndex, cameraIndex),
          (
            (boxGeometryDataMap, customGeometryDataMap),
            lightMaterialDataMap,
            gameObjectChildrenMap,
            gameObjectNodeIndexMap,
          ),
          (meshPointDataMap, materialDataMap, cameraDataMap),
          (transformArr, nodeDataArr),
        ) =>
  transformArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (
           {gameObjectRecord} as state,
           (nodeIndex, meshIndex, materialIndex, cameraIndex),
           (
             (boxGeometryDataMap, customGeometryDataMap),
             lightMaterialDataMap,
             gameObjectChildrenMap,
             gameObjectNodeIndexMap,
           ),
           (meshPointDataMap, materialDataMap, cameraDataMap),
           nodeDataArr,
         ),
         transform,
       ) => {
         let (
           {
             defaultLocalPosition,
             defaultLocalRotation,
             defaultLocalScale,
             localPositions,
             localRotations,
             localScales,
           } as transformRecord
         ): TransformType.transformRecord =
           RecordTransformMainService.getRecord(state);

         let gameObject =
           GameObjectTransformService.unsafeGetGameObject(
             transform,
             transformRecord,
           );

         let childrenTransformArr = _getChildren(transform, transformRecord);

         let childrenGameObjectArr =
           childrenTransformArr
           |> Js.Array.map(transform =>
                GameObjectTransformService.unsafeGetGameObject(
                  transform,
                  transformRecord,
                )
              );

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

         let (
           materialIndex,
           materialData,
           newMaterialIndex,
           lightMaterialDataMap,
         ) =
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
                  materialData,
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
             |> WonderCommonlib.SparseMapService.set(cameraIndex, cameraData)
           };

         let gameObjectChildrenMap =
           switch (childrenGameObjectArr |> Js.Array.length) {
           | 0 => gameObjectChildrenMap
           | _ =>
             gameObjectChildrenMap
             |> WonderCommonlib.SparseMapService.set(
                  gameObject,
                  childrenGameObjectArr,
                )
           };

         let gameObjectNodeIndexMap =
           gameObjectNodeIndexMap
           |> WonderCommonlib.SparseMapService.set(gameObject, nodeIndex);

         let newNodeIndex = nodeIndex |> succ;

         nodeDataArr
         |> ArrayService.push(
              {
                gameObject,
                children: None,
                translation:
                  switch (
                    ModelMatrixTransformService.getLocalPositionTuple(
                      transform,
                      localPositions,
                    )
                  ) {
                  | (x, y, z)
                      when
                        x === defaultLocalPosition[0]
                        && y === defaultLocalPosition[1]
                        && z === defaultLocalPosition[2] =>
                    None
                  | localPosition => Some(localPosition)
                  },
                rotation:
                  switch (
                    ModelMatrixTransformService.getLocalRotationTuple(
                      transform,
                      localRotations,
                    )
                  ) {
                  | (x, y, z, w)
                      when
                        x === defaultLocalRotation[0]
                        && y === defaultLocalRotation[1]
                        && z === defaultLocalRotation[2]
                        && w === defaultLocalRotation[3] =>
                    None
                  | localRotation => Some(localRotation)
                  },
                scale:
                  switch (
                    ModelMatrixTransformService.getLocalScaleTuple(
                      transform,
                      localScales,
                    )
                  ) {
                  | (x, y, z)
                      when
                        x === defaultLocalScale[0]
                        && y === defaultLocalScale[1]
                        && z === defaultLocalScale[2] =>
                    None
                  | localScale => Some(localScale)
                  },
                mesh: meshIndex,
                camera: cameraIndex,
                extension:
                  switch (materialIndex) {
                  | None => None
                  | Some(materialIndex) =>
                    Some({material: Some(materialIndex)})
                  },
              }: nodeData,
            );

         _getNodeData(
           state,
           (newNodeIndex, newMeshIndex, newMaterialIndex, newCameraIndex),
           (
             (boxGeometryDataMap, customGeometryDataMap),
             lightMaterialDataMap,
             gameObjectChildrenMap,
             gameObjectNodeIndexMap,
           ),
           (meshPointDataMap, materialDataMap, cameraDataMap),
           (childrenTransformArr, nodeDataArr),
         );
       },
       (
         state,
         (nodeIndex, meshIndex, materialIndex, cameraIndex),
         (
           (boxGeometryDataMap, customGeometryDataMap),
           lightMaterialDataMap,
           gameObjectChildrenMap,
           gameObjectNodeIndexMap,
         ),
         (meshPointDataMap, materialDataMap, cameraDataMap),
         nodeDataArr,
       ),
     );

let getAllNodeData = (sceneGameObject, state) => {
  let (
    state,
    (nodeIndex, meshIndex, materialIndex, cameraIndex),
    (
      (boxGeometryDataMap, customGeometryDataMap),
      lightMaterialDataMap,
      gameObjectChildrenMap,
      gameObjectNodeIndexMap,
    ),
    (meshPointDataMap, materialDataMap, cameraDataMap),
    nodeDataArr,
  ) =
    _getNodeData(
      state,
      (0, 0, 0, 0),
      (
        (
          WonderCommonlib.SparseMapService.createEmpty(),
          WonderCommonlib.SparseMapService.createEmpty(),
        ),
        WonderCommonlib.SparseMapService.createEmpty(),
        WonderCommonlib.SparseMapService.createEmpty(),
        WonderCommonlib.SparseMapService.createEmpty(),
      ),
      (
        WonderCommonlib.SparseMapService.createEmpty(),
        WonderCommonlib.SparseMapService.createEmpty(),
        WonderCommonlib.SparseMapService.createEmpty(),
      ),
      (
        [|
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            sceneGameObject,
            state,
          ),
        |],
        [||],
      ),
    );

  (
    state,
    (nodeIndex, meshIndex, materialIndex, cameraIndex),
    (
      (boxGeometryDataMap, customGeometryDataMap),
      lightMaterialDataMap,
      gameObjectChildrenMap,
      gameObjectNodeIndexMap,
    ),
    (meshPointDataMap, materialDataMap, cameraDataMap),
    nodeDataArr,
  );

  let nodeDataArr =
    _setChildren(gameObjectChildrenMap, gameObjectNodeIndexMap, nodeDataArr);

  (state, (meshPointDataMap, materialDataMap, cameraDataMap), nodeDataArr);
};