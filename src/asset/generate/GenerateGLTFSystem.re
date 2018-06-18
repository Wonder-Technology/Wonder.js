open Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let generateEmbededGLTF = (sceneGameObject, state) => {
  let (
    state,
    (meshPointDataMap, materialDataMap, cameraDataMap),
    nodeDataArr,
  ) =
    GetNodeDataSystem.getAllNodeData(sceneGameObject, state);

  let (totalByteLength, (bufferViewDataArr, accessorDataArr, meshDataArr)) =
    BuildGeometryDataSystem.build(meshPointDataMap);

  let buffer = BuildBufferSystem.build(totalByteLength, meshPointDataMap);

  let (materialDataArr, textureDataArr, samplerDataArr, sourceBase64Arr) =
    BuildMaterialDataSystem.build(materialDataMap, state);

  /* TODO get cameraData */

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
      sourceBase64Arr,
    ),
    state,
  );
};