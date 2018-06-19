open Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let generateEmbededGLTF = (sceneGameObject, imageBase64Map, state) => {
  let (
    state,
    (meshPointDataMap, materialDataMap, cameraDataMap),
    nodeDataArr,
  ) =
    GetNodeDataSystem.getAllNodeData(sceneGameObject, state);

  let (totalByteLength, (bufferViewDataArr, accessorDataArr, meshDataArr)) =
    BuildGeometryDataSystem.build(meshPointDataMap);

  let buffer = BuildBufferSystem.build(totalByteLength, meshPointDataMap);

  let (materialDataArr, textureDataArr, samplerDataArr, imageBase64Arr) =
    BuildMaterialDataSystem.build(materialDataMap, imageBase64Map, state);

  let cameraDataArr = BuildCameraDataSystem.build(cameraDataMap, state);

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
    ),
    state,
  );
};