open Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let generateEmbededGLTF = (sceneGameObject, imageBase64Map, state) => {
  let (
    state,
    (meshPointDataMap, materialDataMap, cameraDataMap, lightDataMap),
    nodeDataArr,
  ) =
    GetNodeDataSystem.getAllNodeData(sceneGameObject, state);

  let (totalByteLength, (bufferViewDataArr, accessorDataArr, meshDataArr)) =
    BuildGeometryDataSystem.build(meshPointDataMap);

  let buffer = BuildBufferSystem.build(totalByteLength, meshPointDataMap);

  let (materialDataArr, textureDataArr, samplerDataArr, imageBase64Arr) =
    BuildMaterialDataSystem.build(materialDataMap, imageBase64Map, state);

  let cameraDataArr = BuildCameraDataSystem.build(cameraDataMap, state);

  let lightDataArr = BuildLightDataSystem.build(lightDataMap, state);

  let extensionsUsedArr =
    BuildExtensionDataSystem.buildExtensionsUsed(lightDataArr);

  EncodeGLTFJsonSystem.encode(
    (buffer, totalByteLength),
    (
      nodeDataArr,
      bufferViewDataArr,
      accessorDataArr,
      meshDataArr,
      materialDataArr,
      textureDataArr,
      samplerDataArr,
      imageBase64Arr,
      cameraDataArr,
      lightDataArr,
      extensionsUsedArr,
    ),
    state,
  );
};