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
    BuildGeometryDataSystem.buildGeometryData(meshPointDataMap);

  let buffer =
    BuildBufferSystem.buildBuffer(totalByteLength, meshPointDataMap);

  /* TODO get materialData */

  /* TODO get cameraData */

  EncodeGLTFJsonSystem.encode(
    (buffer, totalByteLength),
    (nodeDataArr, bufferViewDataArr, accessorDataArr, meshDataArr),
    state,
  );
};