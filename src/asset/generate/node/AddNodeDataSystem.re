open GenerateSceneGraphType;

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
        scriptIndex,
      ),
    ) =>
  switch (
    isRoot,
    basicCameraViewIndex,
    meshRendererIndex,
    basicMaterialIndex,
    lightMaterialIndex,
    arcballCameraControllerIndex,
    scriptIndex,
  ) {
  | (None, None, None, None, None, None, None) => None
  | (
      isRoot,
      basicCameraViewIndex,
      meshRendererIndex,
      basicMaterialIndex,
      lightMaterialIndex,
      arcballCameraControllerIndex,
      scriptIndex,
    ) =>
    Some(
      {
        isRoot,
        basicCameraView: basicCameraViewIndex,
        meshRenderer: meshRendererIndex,
        basicMaterial: basicMaterialIndex,
        lightMaterial: lightMaterialIndex,
        cameraController: arcballCameraControllerIndex,
        script: scriptIndex,
      }: nodeExtras,
    )
  };

let _addNodeExtensionData = lightIndex =>
  switch (lightIndex) {
  | None => None
  | Some(lightIndex) => Some({khr_lights: Some({light: lightIndex})})
  };

let addNodeAndItsComponentData =
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
        scriptIndex,
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
               scriptIndex,
             ),
           ),
         extensions: _addNodeExtensionData(lightIndex),
       }: nodeData,
     );