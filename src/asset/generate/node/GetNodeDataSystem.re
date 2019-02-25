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
                  children
                  |> Js.Array.map(childGameObject =>
                       gameObjectNodeIndexMap
                       |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                            childGameObject,
                          )
                     )
                  |. Some
                },
            }),
       [||],
     );

let _addTransformVector3Data =
    (transform, localData, defaultData, getDataFunc) =>
  switch (getDataFunc(transform, localData)) {
  | (x, y, z)
      when x === defaultData[0] && y === defaultData[1] && z === defaultData[2] =>
    None
  | localData => Some(localData)
  };

let _addTransformRotationData =
    (transform, localRotations, defaultLocalRotation) =>
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
  };

let _addNodeExtraData =
    (
      isRoot,
      (
        basicCameraViewIndex,
        meshRendererIndex,
        basicMaterialIndex,
        lightMaterialIndex,
        arcballCameraControllerIndex,
      ),
    ) =>
  switch (
    isRoot,
    basicCameraViewIndex,
    meshRendererIndex,
    basicMaterialIndex,
    lightMaterialIndex,
    arcballCameraControllerIndex,
  ) {
  | (None, None, None, None, None, None) => None
  | (
      isRoot,
      basicCameraViewIndex,
      meshRendererIndex,
      basicMaterialIndex,
      lightMaterialIndex,
      arcballCameraControllerIndex,
    ) =>
    Some(
      {
        isRoot,
        basicCameraView: basicCameraViewIndex,
        meshRenderer: meshRendererIndex,
        basicMaterial: basicMaterialIndex,
        lightMaterial: lightMaterialIndex,
        cameraController: arcballCameraControllerIndex,
      }: nodeExtras,
    )
  };

let _addNodeExtensionData = lightIndex =>
  switch (lightIndex) {
  | None => None
  | Some(lightIndex) => Some({khr_lights: Some({light: lightIndex})})
  };

let _addNodeAndItsComponentData =
    (
      gameObject,
      isRoot,
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
        arcballCameraControllerIndex,
        basicMaterialIndex,
        lightMaterialIndex,
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
           _addTransformVector3Data(
             transform,
             localPositions,
             defaultLocalPosition,
             ModelMatrixTransformService.getLocalPositionTuple,
           ),
         rotation:
           _addTransformRotationData(
             transform,
             localRotations,
             defaultLocalRotation,
           ),
         scale:
           _addTransformVector3Data(
             transform,
             localScales,
             defaultLocalScale,
             ModelMatrixTransformService.getLocalScaleTuple,
           ),
         mesh: meshIndex,
         camera: cameraProjectionIndex,
         extras:
           _addNodeExtraData(
             isRoot,
             (
               basicCameraViewIndex,
               meshRendererIndex,
               basicMaterialIndex,
               lightMaterialIndex,
               arcballCameraControllerIndex,
             ),
           ),
         extensions: _addNodeExtensionData(lightIndex),
       }: nodeData,
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

  let isRoot = IsRootGameObjectMainService.getIsRoot(gameObject, state);

  (
    transformRecord,
    gameObject,
    childrenTransformArr,
    childrenGameObjectArr,
    gameObjectChildrenMap,
    gameObjectNodeIndexMap,
    isRoot,
  );
};

let rec _getNodeAndItsComponentsData =
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
            arcballCameraControllerIndex,
            lightIndex,
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
            arcballCameraControllerDataMap,
            lightDataMap,
          ),
          (transformArr, nodeDataArr),
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
             arcballCameraControllerIndex,
             lightIndex,
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
           }: TransformType.transformRecord,
           gameObject,
           childrenTransformArr,
           childrenGameObjectArr,
           gameObjectChildrenMap,
           gameObjectNodeIndexMap,
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
             newArcbbllCameraControllerIndex,
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
             getPointsDataFuncTuple,
           );

         _getNodeAndItsComponentsData(
           state,
           (
             nodeIndex |> succ,
             newMeshIndex,
             newMeshRendererIndex,
             newBasicMaterialIndex,
             newLightMaterialIndex,
             newBasicCameraViewIndex,
             newCameraProjectionIndex,
             newArcbbllCameraControllerIndex,
             newLightIndex,
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
             arcballCameraControllerDataMap,
             lightDataMap,
           ),
           (
             childrenTransformArr,
             _addNodeAndItsComponentData(
               gameObject,
               isRoot,
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
                 arcballCameraControllerIndex,
                 basicMaterialIndex,
                 lightMaterialIndex,
                 lightIndex,
               ),
               nodeDataArr,
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
           arcballCameraControllerIndex,
           lightIndex,
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
           arcballCameraControllerDataMap,
           lightDataMap,
         ),
         nodeDataArr,
       ),
     );

let getAllNodeData = (rootGameObject, getPointsDataFuncTuple, state) => {
  let (
    state,
    (
      nodeIndex,
      meshIndex,
      meshRendererIndex,
      basictMaterialIndex,
      lightMaterialIndex,
      basicCameraViewIndex,
      cameraProjectionIndex,
      arcballCameraControllerIndex,
      lightIndex,
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
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
    nodeDataArr,
  ) =
    _getNodeAndItsComponentsData(
      state,
      (0, 0, 0, 0, 0, 0, 0, 0, 0),
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
      getPointsDataFuncTuple,
    );

  (
    state,
    (
      nodeIndex,
      meshIndex,
      meshRendererIndex,
      basictMaterialIndex,
      lightMaterialIndex,
      basicCameraViewIndex,
      cameraProjectionIndex,
      arcballCameraControllerIndex,
      lightIndex,
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
      meshPointAndNameDataMap,
      meshRendererDataMap,
      resultBasicMaterialDataMap,
      resultLightMaterialDataMap,
      basicCameraViewDataMap,
      cameraProjectionDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
    nodeDataArr,
  );
};