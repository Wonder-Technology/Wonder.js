open StateDataMainType;

open GenerateSceneGraphType;

let _getChildren = (parent, transformRecord) =>
  HierachyTransformService.unsafeGetChildren(parent, transformRecord);

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

let _addNodeData =
    (
      gameObject,
      (
        transform,
        localPositions,
        localRotations,
        localScales,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale,
      ),
      (
        meshIndex,
        cameraIndex,
        arcballCameraControllerIndex,
        materialIndex,
        lightIndex,
      ),
      nodeDataArr,
    ) =>
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
         extras:
           switch (materialIndex, arcballCameraControllerIndex) {
           | (None, None) => None
           | (materialIndex, arcballCameraControllerIndex) =>
             Some(
               {
                 material: materialIndex,
                 cameraController: arcballCameraControllerIndex,
               }: nodeExtras,
             )
           },
         extensions:
           switch (lightIndex) {
           | None => None
           | Some(lightIndex) =>
             Some({khr_lights: Some({light: lightIndex})})
           },
       }: nodeData,
     );

let rec _getNodeData =
        (
          state,
          (
            nodeIndex,
            meshIndex,
            materialIndex,
            cameraIndex,
            arcballCameraControllerIndex,
            lightIndex,
          ),
          (
            (boxGeometryDataMap, customGeometryDataMap),
            lightMaterialDataMap,
            gameObjectChildrenMap,
            gameObjectNodeIndexMap,
          ),
          (
            meshPointDataMap,
            materialDataMap,
            cameraDataMap,
            arcballCameraControllerDataMap,
            lightDataMap,
          ),
          (transformArr, nodeDataArr),
        ) =>
  transformArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (
           {gameObjectRecord} as state,
           (
             nodeIndex,
             meshIndex,
             materialIndex,
             cameraIndex,
             arcballCameraControllerIndex,
             lightIndex,
           ),
           (
             (boxGeometryDataMap, customGeometryDataMap),
             lightMaterialDataMap,
             gameObjectChildrenMap,
             gameObjectNodeIndexMap,
           ),
           (
             meshPointDataMap,
             materialDataMap,
             cameraDataMap,
             arcballCameraControllerDataMap,
             lightDataMap,
           ),
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

         let (
           state,
           (
             meshIndex,
             materialIndex,
             cameraIndex,
             arcballCameraControllerIndex,
             lightIndex,
           ),
           (
             newMeshIndex,
             newMaterialIndex,
             newCameraIndex,
             newArcbbllCameraControllerIndex,
             newLightIndex,
           ),
           (
             (boxGeometryDataMap, customGeometryDataMap),
             lightMaterialDataMap,
           ),
           (
             meshPointDataMap,
             materialDataMap,
             cameraDataMap,
             arcballCameraControllerDataMap,
             lightDataMap,
           ),
         ) =
           GetNodeComponentDataSystem.getComponentData((
             gameObject,
             state,
             (
               meshIndex,
               materialIndex,
               cameraIndex,
               arcballCameraControllerIndex,
               lightIndex,
             ),
             (
               (boxGeometryDataMap, customGeometryDataMap),
               lightMaterialDataMap,
             ),
             (
               meshPointDataMap,
               materialDataMap,
               cameraDataMap,
               arcballCameraControllerDataMap,
               lightDataMap,
             ),
           ));

         _getNodeData(
           state,
           (
             nodeIndex |> succ,
             newMeshIndex,
             newMaterialIndex,
             newCameraIndex,
             newArcbbllCameraControllerIndex,
             newLightIndex,
           ),
           (
             (boxGeometryDataMap, customGeometryDataMap),
             lightMaterialDataMap,
             gameObjectChildrenMap,
             gameObjectNodeIndexMap,
           ),
           (
             meshPointDataMap,
             materialDataMap,
             cameraDataMap,
             arcballCameraControllerDataMap,
             lightDataMap,
           ),
           (
             childrenTransformArr,
             _addNodeData(
               gameObject,
               (
                 transform,
                 localPositions,
                 localRotations,
                 localScales,
                 defaultLocalPosition,
                 defaultLocalRotation,
                 defaultLocalScale,
               ),
               (
                 meshIndex,
                 cameraIndex,
                 arcballCameraControllerIndex,
                 materialIndex,
                 lightIndex,
               ),
               nodeDataArr,
             ),
           ),
         );
       },
       (
         state,
         (
           nodeIndex,
           meshIndex,
           materialIndex,
           cameraIndex,
           arcballCameraControllerIndex,
           lightIndex,
         ),
         (
           (boxGeometryDataMap, customGeometryDataMap),
           lightMaterialDataMap,
           gameObjectChildrenMap,
           gameObjectNodeIndexMap,
         ),
         (
           meshPointDataMap,
           materialDataMap,
           cameraDataMap,
           arcballCameraControllerDataMap,
           lightDataMap,
         ),
         nodeDataArr,
       ),
     );

let getAllNodeData = (rootGameObject, state) => {
  let (
    state,
    (
      nodeIndex,
      meshIndex,
      materialIndex,
      cameraIndex,
      arcballCameraControllerIndex,
      lightIndex,
    ),
    (
      (boxGeometryDataMap, customGeometryDataMap),
      lightMaterialDataMap,
      gameObjectChildrenMap,
      gameObjectNodeIndexMap,
    ),
    (
      meshPointDataMap,
      materialDataMap,
      cameraDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
    nodeDataArr,
  ) =
    _getNodeData(
      state,
      (0, 0, 0, 0, 0, 0),
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
        WonderCommonlib.SparseMapService.createEmpty(),
        WonderCommonlib.SparseMapService.createEmpty(),
      ),
      (
        [|
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          ),
        |],
        [||],
      ),
    );

  (
    state,
    (
      nodeIndex,
      meshIndex,
      materialIndex,
      cameraIndex,
      arcballCameraControllerIndex,
      lightIndex,
    ),
    (
      (boxGeometryDataMap, customGeometryDataMap),
      lightMaterialDataMap,
      gameObjectChildrenMap,
      gameObjectNodeIndexMap,
    ),
    (
      meshPointDataMap,
      materialDataMap,
      cameraDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
    nodeDataArr,
  );

  let nodeDataArr =
    _setChildren(gameObjectChildrenMap, gameObjectNodeIndexMap, nodeDataArr);

  (
    state,
    (
      meshPointDataMap,
      materialDataMap,
      cameraDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
    nodeDataArr,
  );
};