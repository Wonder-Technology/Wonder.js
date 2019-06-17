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
                  |> WonderCommonlib.MutableSparseMapService.get(gameObject)
                ) {
                | None => None
                | Some(children) =>
                  (
                    children
                    |> Js.Array.map(childGameObject =>
                         gameObjectNodeIndexMap
                         |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                              childGameObject,
                            )
                       )
                  )
                  ->Some
                },
            }),
       [||],
     );

let _getNodeData =
    (
      transform,
      nodeIndex,
      (gameObjectChildrenMap, gameObjectNodeIndexMap),
      state,
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
      |> WonderCommonlib.MutableSparseMapService.set(
           gameObject,
           childrenGameObjectArr,
         )
    };

  let gameObjectNodeIndexMap =
    gameObjectNodeIndexMap
    |> WonderCommonlib.MutableSparseMapService.set(gameObject, nodeIndex);

  let isActive =
    GetIsActiveGameObjectMainService.getIsActive(gameObject, state);

  let isRoot = IsRootGameObjectMainService.getIsRoot(gameObject, state);

  (
    transformRecord,
    gameObject,
    childrenTransformArr,
    childrenGameObjectArr,
    gameObjectChildrenMap,
    gameObjectNodeIndexMap,
    isActive,
    isRoot,
  );
};

let rec _getNodeAndItsComponentsData =
        (
          state,
          (
            (
              nodeIndex,
              meshIndex,
              meshRendererIndex,
              basicMaterialIndex,
              lightMaterialIndex,
              basicCameraViewIndex,
              cameraProjectionIndex,
              flyCameraControllerIndex,
              arcballCameraControllerIndex,
              lightIndex,
              scriptIndex,
            ),
            (
              geometryDataMap,
              basicMaterialDataMap,
              lightMaterialDataMap,
              gameObjectChildrenMap,
              gameObjectNodeIndexMap,
            ),
            (
              meshPointAndNameDataMap,
              meshRendererDataMap,
              resultBasicMaterialDataMap,
              resultLightMaterialDataMap,
              basicCameraViewDataMap,
              cameraProjectionDataMap,
              flyCameraControllerDataMap,
              arcballCameraControllerDataMap,
              lightDataMap,
              scriptDataMap,
            ),
            (transformArr, nodeDataArr),
          ),
          getPointsDataFuncTuple,
        ) =>
  transformArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (
           {gameObjectRecord} as state,
           (
             nodeIndex,
             meshIndex,
             meshRendererIndex,
             basicMaterialIndex,
             lightMaterialIndex,
             basicCameraViewIndex,
             cameraProjectionIndex,
             flyCameraControllerIndex,
             arcballCameraControllerIndex,
             lightIndex,
             scriptIndex,
           ),
           (
             geometryDataMap,
             basicMaterialDataMap,
             lightMaterialDataMap,
             gameObjectChildrenMap,
             gameObjectNodeIndexMap,
           ),
           (
             meshPointAndNameDataMap,
             meshRendererDataMap,
             resultBasicMaterialDataMap,
             resultLightMaterialDataMap,
             basicCameraViewDataMap,
             cameraProjectionDataMap,
             flyCameraControllerDataMap,
             arcballCameraControllerDataMap,
             lightDataMap,
             scriptDataMap,
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
           }: TransformType.transformRecord,
           gameObject,
           childrenTransformArr,
           childrenGameObjectArr,
           gameObjectChildrenMap,
           gameObjectNodeIndexMap,
           isActive,
           isRoot,
         ) =
           _getNodeData(
             transform,
             nodeIndex,
             (gameObjectChildrenMap, gameObjectNodeIndexMap),
             state,
           );

         let (
           state,
           (
             meshIndex,
             meshRendererIndex,
             basicMaterialIndex,
             lightMaterialIndex,
             basicCameraViewIndex,
             cameraProjectionIndex,
             flyCameraControllerIndex,
             arcballCameraControllerIndex,
             lightIndex,
             scriptIndex,
           ),
           (
             newMeshIndex,
             newMeshRendererIndex,
             newBasicMaterialIndex,
             newLightMaterialIndex,
             newBasicCameraViewIndex,
             newCameraProjectionIndex,
             newFlyCameraControllerIndex,
             newArcbbllCameraControllerIndex,
             newLightIndex,
             newScriptIndex,
           ),
           (geometryDataMap, basicMaterialDataMap, lightMaterialDataMap),
           (
             meshPointAndNameDataMap,
             meshRendererDataMap,
             resultBasicMaterialDataMap,
             resultLightMaterialDataMap,
             basicCameraViewDataMap,
             cameraProjectionDataMap,
             flyCameraControllerDataMap,
             arcballCameraControllerDataMap,
             lightDataMap,
             scriptDataMap,
           ),
         ) =
           GetNodeComponentDataSystem.getAllComponentData(
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
                 flyCameraControllerIndex,
                 arcballCameraControllerIndex,
                 lightIndex,
                 scriptIndex,
               ),
               (geometryDataMap, basicMaterialDataMap, lightMaterialDataMap),
               (
                 meshPointAndNameDataMap,
                 meshRendererDataMap,
                 resultBasicMaterialDataMap,
                 resultLightMaterialDataMap,
                 basicCameraViewDataMap,
                 cameraProjectionDataMap,
                 flyCameraControllerDataMap,
                 arcballCameraControllerDataMap,
                 lightDataMap,
                 scriptDataMap,
               ),
             ),
             getPointsDataFuncTuple,
           );

         _getNodeAndItsComponentsData(
           state,
           (
             (
               nodeIndex |> succ,
               newMeshIndex,
               newMeshRendererIndex,
               newBasicMaterialIndex,
               newLightMaterialIndex,
               newBasicCameraViewIndex,
               newCameraProjectionIndex,
               newFlyCameraControllerIndex,
               newArcbbllCameraControllerIndex,
               newLightIndex,
               newScriptIndex,
             ),
             (
               geometryDataMap,
               basicMaterialDataMap,
               lightMaterialDataMap,
               gameObjectChildrenMap,
               gameObjectNodeIndexMap,
             ),
             (
               meshPointAndNameDataMap,
               meshRendererDataMap,
               resultBasicMaterialDataMap,
               resultLightMaterialDataMap,
               basicCameraViewDataMap,
               cameraProjectionDataMap,
               flyCameraControllerDataMap,
               arcballCameraControllerDataMap,
               lightDataMap,
               scriptDataMap,
             ),
             (
               childrenTransformArr,
               AddNodeDataSystem.addNodeAndItsComponentData(
                 gameObject,
                 (isActive, isRoot),
                 (
                   (
                     transform,
                     localPositions,
                     localRotations,
                     localScales,
                     defaultLocalPosition,
                     defaultLocalRotation,
                     defaultLocalScale,
                   ),
                   meshIndex,
                   meshRendererIndex,
                   basicCameraViewIndex,
                   cameraProjectionIndex,
                   flyCameraControllerIndex,
                   arcballCameraControllerIndex,
                   basicMaterialIndex,
                   lightMaterialIndex,
                   lightIndex,
                   scriptIndex,
                 ),
                 nodeDataArr,
               ),
             ),
           ),
           getPointsDataFuncTuple,
         );
       },
       (
         state,
         (
           nodeIndex,
           meshIndex,
           meshRendererIndex,
           basicMaterialIndex,
           lightMaterialIndex,
           basicCameraViewIndex,
           cameraProjectionIndex,
           flyCameraControllerIndex,
           arcballCameraControllerIndex,
           lightIndex,
           scriptIndex,
         ),
         (
           geometryDataMap,
           basicMaterialDataMap,
           lightMaterialDataMap,
           gameObjectChildrenMap,
           gameObjectNodeIndexMap,
         ),
         (
           meshPointAndNameDataMap,
           meshRendererDataMap,
           resultBasicMaterialDataMap,
           resultLightMaterialDataMap,
           basicCameraViewDataMap,
           cameraProjectionDataMap,
           flyCameraControllerDataMap,
           arcballCameraControllerDataMap,
           lightDataMap,
           scriptDataMap,
         ),
         nodeDataArr,
       ),
     );

let getAllNodeData = (rootGameObject, getPointsDataFuncTuple, state) => {
  let (
    state,
    /* (
         nodeIndex,
         meshIndex,
         meshRendererIndex,
         basictMaterialIndex,
         lightMaterialIndex,
         basicCameraViewIndex,
         cameraProjectionIndex,
         flyCameraControllerIndex,
         arcballCameraControllerIndex,
         lightIndex,
       ), */
    _,
    (
      geometryDataMap,
      basicMaterialDataMap,
      lightMaterialDataMap,
      gameObjectChildrenMap,
      gameObjectNodeIndexMap,
    ),
    (
      meshPointAndNameDataMap,
      meshRendererDataMap,
      resultBasicMaterialDataMap,
      resultLightMaterialDataMap,
      basicCameraViewDataMap,
      cameraProjectionDataMap,
      flyCameraControllerDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
      scriptDataMap,
    ),
    nodeDataArr,
  ) =
    _getNodeAndItsComponentsData(
      state,
      (
        (0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        (
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
        ),
        (
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
          WonderCommonlib.MutableSparseMapService.createEmpty(),
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
      ),
      getPointsDataFuncTuple,
    );

  let nodeDataArr =
    _setChildren(gameObjectChildrenMap, gameObjectNodeIndexMap, nodeDataArr);

  (
    state,
    (
      meshPointAndNameDataMap,
      meshRendererDataMap,
      resultBasicMaterialDataMap,
      resultLightMaterialDataMap,
      basicCameraViewDataMap,
      cameraProjectionDataMap,
      flyCameraControllerDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
      scriptDataMap,
    ),
    nodeDataArr,
  );
};