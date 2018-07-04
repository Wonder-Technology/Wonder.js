let build =
    (
      materialDataMap,
      imageBase64Map,
      (totalByteLength, byteOffset, bufferViewDataArr),
      state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(materialDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let (
    (materialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
    (textureIndexMap, samplerIndexMap, imageMap),
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    materialDataMap
    |> SparseMapService.reduceValid(
         (.
           (
             (
               materialDataArr,
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
             BuildNoDiffuseMapSystem.build(
               (lightMaterial, name),
               (
                 (
                   materialDataArr,
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
             BuildDiffuseMapSystem.build(
               (diffuseMap, name),
               (
                 (
                   materialDataArr,
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
  (
    materialDataArr,
    textureDataArr,
    samplerDataArr,
    imageUint8DataArr,
    (totalByteLength, bufferViewDataArr),
  );
};