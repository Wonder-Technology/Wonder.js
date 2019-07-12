let _buildLightMaterialData =
    (
      (lightMaterialDataMap, basicSourceTextureImageUint8ArrayDataMap),
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
      state,
    ) => {
  let (
    (lightMaterialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
    (
      textureIndexMap,
      samplerIndexMap,
      imageMap,
      imageUint8ArrayMap,
      imageResultUint8ArrayMap,
    ),
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    lightMaterialDataMap
    |> WonderCommonlib.MutableSparseMapService.reduceValid(
         (.
           (
             (
               lightMaterialDataArr,
               textureDataArr,
               samplerDataArr,
               imageUint8DataArr,
             ),
             (
               textureIndexMap,
               samplerIndexMap,
               imageMap,
               imageUint8ArrayMap,
               imageResultUint8ArrayMap,
             ),
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
             let (
               (
                 lightMaterialDataArr,
                 textureDataArr,
                 samplerDataArr,
                 imageUint8DataArr,
               ),
               (textureIndexMap, samplerIndexMap, imageMap),
               (totalByteLength, byteOffset, bufferViewDataArr),
             ) =
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
               );

             (
               (
                 lightMaterialDataArr,
                 textureDataArr,
                 samplerDataArr,
                 imageUint8DataArr,
               ),
               (
                 textureIndexMap,
                 samplerIndexMap,
                 imageMap,
                 imageUint8ArrayMap,
                 imageResultUint8ArrayMap,
               ),
               (totalByteLength, byteOffset, bufferViewDataArr),
             );
           | Some(diffuseMap) =>
             BuildLightMaterialDiffuseMapSystem.build(
               (lightMaterial, diffuseMap, name),
               (
                 (
                   lightMaterialDataArr,
                   textureDataArr,
                   samplerDataArr,
                   imageUint8DataArr,
                 ),
                 (
                   textureIndexMap,
                   samplerIndexMap,
                   imageMap,
                   imageUint8ArrayMap,
                   basicSourceTextureImageUint8ArrayDataMap,
                   imageResultUint8ArrayMap,
                 ),
               ),
               (totalByteLength, byteOffset, bufferViewDataArr),
               getResultUint8ArrayDataFunc,
               state,
             )
           };
         },
         (
           ([||], [||], [||], [||]),
           (
             WonderCommonlib.MutableSparseMapService.createEmpty(),
             WonderCommonlib.MutableHashMapService.createEmpty(),
             WonderCommonlib.MutableSparseMapService.createEmpty(),
             WonderCommonlib.MutableSparseMapService.createEmpty(),
             WonderCommonlib.MutableSparseMapService.createEmpty(),
           ),
           (totalByteLength, byteOffset, bufferViewDataArr),
         ),
       );

  (
    (lightMaterialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
    (textureIndexMap, samplerIndexMap, imageMap, imageResultUint8ArrayMap),
    (totalByteLength, byteOffset, bufferViewDataArr),
  );
};

let build =
    (
      (
        basicMaterialDataMap,
        lightMaterialDataMap,
        basicSourceTextureImageUint8ArrayDataMap,
      ),
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
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
    (textureIndexMap, samplerIndexMap, imageMap, imageResultUint8ArrayMap),
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    _buildLightMaterialData(
      (lightMaterialDataMap, basicSourceTextureImageUint8ArrayDataMap),
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
      state,
    );

  let basicMaterialDataArr =
    basicMaterialDataMap
    |> WonderCommonlib.MutableSparseMapService.reduceValid(
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
    imageResultUint8ArrayMap,
    (totalByteLength, byteOffset, bufferViewDataArr),
  );
};