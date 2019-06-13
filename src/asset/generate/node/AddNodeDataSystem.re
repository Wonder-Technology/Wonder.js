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
      (isActive, isRoot),
      (
        basicCameraViewIndex,
        meshRendererIndex,
        basicMaterialIndex,
        lightMaterialIndex,
        flyCameraControllerIndex,
        arcballCameraControllerIndex,
        scriptIndex,
      ),
    ) =>
  switch (
    isActive,
    isRoot,
    basicCameraViewIndex,
    meshRendererIndex,
    basicMaterialIndex,
    lightMaterialIndex,
    flyCameraControllerIndex,
    arcballCameraControllerIndex,
    scriptIndex,
  ) {
  | (None, None, None, None, None, None, None, None, None) => None
  | (
      isActive,
      isRoot,
      basicCameraViewIndex,
      meshRendererIndex,
      basicMaterialIndex,
      lightMaterialIndex,
      flyCameraControllerIndex,
      arcballCameraControllerIndex,
      scriptIndex,
    ) =>
    Some(
      {
        isActive,
        isRoot,
        basicCameraView: basicCameraViewIndex,
        meshRenderer: meshRendererIndex,
        basicMaterial: basicMaterialIndex,
        lightMaterial: lightMaterialIndex,
        flyCameraController: flyCameraControllerIndex,
        arcballCameraController: arcballCameraControllerIndex,
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
             (isActive, isRoot),
             (
               basicCameraViewIndex,
               meshRendererIndex,
               basicMaterialIndex,
               lightMaterialIndex,
               flyCameraControllerIndex,
               arcballCameraControllerIndex,
               scriptIndex,
             ),
           ),
         extensions: _addNodeExtensionData(lightIndex),
       }: nodeData,
     );