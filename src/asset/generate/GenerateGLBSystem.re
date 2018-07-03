open Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

/* let generateGLBData = (sceneGameObject, imageBase64Map, state) => {
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

     EncodeGLBJsonSystem.encode(
       (buffer, totalByteLength),
       (
         nodeDataArr,
         bufferViewDataArr,
         accessorDataArr,
         meshDataArr,
         materialDataArr,
         textureDataArr,
         samplerDataArr,
         imageUint8DataArr,
         cameraDataArr,
         lightDataArr,
         extensionsUsedArr,
       ),
       state,
     );
   }; */

let generateGLBData = (sceneGameObject, imageBase64Map, state) => {
  let (
    state,
    (meshPointDataMap, materialDataMap, cameraDataMap, lightDataMap),
    nodeDataArr,
  ) =
    GetNodeDataSystem.getAllNodeData(sceneGameObject, state);

  let (
    totalByteLength,
    (bufferViewDataArr, accessorDataArr, meshDataArr),
    geometryDataArr,
  ) =
    BuildGeometryDataSystem.build(meshPointDataMap);

  let geometryEndByteOffset = totalByteLength;

  let (
    materialDataArr,
    textureDataArr,
    samplerDataArr,
    imageUint8DataArr,
    (totalByteLength, bufferViewDataArr),
  ) =
    BuildMaterialDataSystem.build(
      materialDataMap,
      imageBase64Map,
      (totalByteLength, geometryEndByteOffset, bufferViewDataArr),
      state,
    );

  let buffer =
    BuildBufferSystem.build(
      totalByteLength,
      (geometryEndByteOffset, geometryDataArr),
      imageUint8DataArr,
    );

  let cameraDataArr = BuildCameraDataSystem.build(cameraDataMap, state);

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
        materialDataArr,
        textureDataArr,
        samplerDataArr,
        imageUint8DataArr,
        cameraDataArr,
        lightDataArr,
        extensionsUsedArr,
      ),
      state,
    ),
    buffer,
  );
};