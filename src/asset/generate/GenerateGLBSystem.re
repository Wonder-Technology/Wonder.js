open WonderBsJson.Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let generateGLBData = (rootGameObject, imageBase64Map, state) => {
  let (
    state,
    (
      meshPointDataMap,
      meshRendererDataMap,
      basicMaterialDataMap,
      lightMaterialDataMap,
      cameraDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
    nodeDataArr,
  ) =
    GetNodeDataSystem.getAllNodeData(rootGameObject, state);

  let (
    totalByteLength,
    (bufferViewDataArr, accessorDataArr, meshDataArr),
    (vertexDataArr, indexDataArr),
  ) =
    BuildGeometryDataSystem.build(meshPointDataMap);

  let geometryEndByteOffset = totalByteLength;

  let meshRendererDataArr =
    BuildMeshRendererDataSystem.build(meshRendererDataMap, state);

  let (
    basicMaterialDataArr,
    lightMaterialDataArr,
    textureDataArr,
    samplerDataArr,
    imageUint8DataArr,
    (totalByteLength, bufferViewDataArr),
  ) =
    BuildMaterialDataSystem.build(
      basicMaterialDataMap,
      lightMaterialDataMap,
      imageBase64Map,
      (totalByteLength, geometryEndByteOffset, bufferViewDataArr),
      state,
    );

  let buffer =
    BuildBufferSystem.build(
      totalByteLength,
      (geometryEndByteOffset, (vertexDataArr, indexDataArr)),
      imageUint8DataArr,
    );

  let cameraDataArr = BuildCameraDataSystem.build(cameraDataMap, state);

  let arcballCameraControllerDataArr =
    BuildCameraControllerDataSystem.build(
      arcballCameraControllerDataMap,
      state,
    );

  let lightDataArr = BuildLightDataSystem.build(lightDataMap, state);

  let extensionsUsedArr =
    BuildExtensionDataSystem.buildExtensionsUsed(lightDataArr);

  (
    EncodeGLBJsonSystem.encode(
      totalByteLength,
      (
        nodeDataArr,
        bufferViewDataArr,
        accessorDataArr,
        meshDataArr,
        meshRendererDataArr,
        basicMaterialDataArr,
        lightMaterialDataArr,
        textureDataArr,
        samplerDataArr,
        imageUint8DataArr,
        cameraDataArr,
        BuildCameraDataSystem.getIsActiveCameraIndex(state),
        arcballCameraControllerDataArr,
        lightDataArr,
        BuildIMGUIDataSystem.build(state),
        extensionsUsedArr,
      ),
      state,
    ),
    buffer,
  );
};