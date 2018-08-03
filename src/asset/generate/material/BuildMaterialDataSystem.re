let _buildLightMaterialData =
    (
      lightMaterialDataMap,
      imageBase64Map,
      (totalByteLength, byteOffset, bufferViewDataArr),
      state,
    ) =>
  lightMaterialDataMap
  |> SparseMapService.reduceValid(
       (.
         (
           (
             lightMaterialDataArr,
             textureDataArr,
             samplerDataArr,
             imageUint8DataArr,
           ),
           (textureIndexMap, samplerIndexMap, imageMap),
           (totalByteLength, byteOffset, bufferViewDataArr),
         ),
         (lightMaterial, name),
       ) => {
         let diffuseMap =
           OperateLightMaterialMainService.getDiffuseMap(
             lightMaterial,
             state,
           );

         switch (diffuseMap) {
         | None =>
           BuildLightMaterialNoDiffuseMapSystem.build(
             (lightMaterial, name),
             (
               (
                 lightMaterialDataArr,
                 textureDataArr,
                 samplerDataArr,
                 imageUint8DataArr,
               ),
               (textureIndexMap, samplerIndexMap, imageMap),
             ),
             (totalByteLength, byteOffset, bufferViewDataArr),
             state,
           )

         | Some(diffuseMap) =>
           BuildLightMaterialDiffuseMapSystem.build(
             (diffuseMap, name),
             (
               (
                 lightMaterialDataArr,
                 textureDataArr,
                 samplerDataArr,
                 imageUint8DataArr,
               ),
               (textureIndexMap, samplerIndexMap, imageMap, imageBase64Map),
             ),
             (totalByteLength, byteOffset, bufferViewDataArr),
             state,
           )
         };
       },
       (
         ([||], [||], [||], [||]),
         ([||], WonderCommonlib.HashMapService.createEmpty(), [||]),
         (totalByteLength, byteOffset, bufferViewDataArr),
       ),
     );

let build =
    (
      basicMaterialDataMap,
      lightMaterialDataMap,
      imageBase64Map,
      (totalByteLength, byteOffset, bufferViewDataArr),
      state,
    ) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      GenerateCommon.checkShouldHasNoSlot(basicMaterialDataMap);
      GenerateCommon.checkShouldHasNoSlot(lightMaterialDataMap);
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let (
    (lightMaterialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
    (textureIndexMap, samplerIndexMap, imageMap),
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    _buildLightMaterialData(
      lightMaterialDataMap,
      imageBase64Map,
      (totalByteLength, byteOffset, bufferViewDataArr),
      state,
    );

  let basicMaterialDataArr =
    basicMaterialDataMap
    |> SparseMapService.reduceValid(
         (. basicMaterialDataArr, (basicMaterial, name)) =>
           BuildBasicMaterialNoMapSystem.build(
             (basicMaterial, name),
             basicMaterialDataArr,
             state,
           ),
         [||],
       );

  (
    basicMaterialDataArr,
    lightMaterialDataArr,
    textureDataArr,
    samplerDataArr,
    imageUint8DataArr,
    (totalByteLength, bufferViewDataArr),
  );
};