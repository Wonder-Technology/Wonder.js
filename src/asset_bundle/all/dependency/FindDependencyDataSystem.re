module RAB = {
  let _buildImageNameMap =
      (
        rabRelativePath,
        {images}: RABType.resourceAssetBundleContent,
        allRabDepdentImageNameMap,
      ) =>
    images
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. nameMap, {name}: RABType.image) =>
           nameMap |> WonderCommonlib.ImmutableHashMapService.set(name, true),
         WonderCommonlib.ImmutableHashMapService.createEmpty(),
       )
    |> WonderCommonlib.ImmutableHashMapService.set(
         rabRelativePath,
         _,
         allRabDepdentImageNameMap,
       );

  let _buildGeometryNameMap =
      (
        rabRelativePath,
        {geometrys}: RABType.resourceAssetBundleContent,
        allRabDependentGeometryNameMap,
      ) =>
    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. nameMap, {name}: RABType.geometry) =>
           nameMap |> WonderCommonlib.ImmutableHashMapService.set(name, true),
         WonderCommonlib.ImmutableHashMapService.createEmpty(),
       )
    |> WonderCommonlib.ImmutableHashMapService.set(
         rabRelativePath,
         _,
         allRabDependentGeometryNameMap,
       );

  let buildImageAndGeometryNameMap =
      (
        (rabRelativePath, rab),
        (allRabDepdentImageNameMap, allRabDependentGeometryNameMap),
      ) => {
    let dataView = DataViewCommon.create(rab);

    let (byteOffset, jsonByteLength, bufferByteLength) =
      DependencyDataUtils.All.readHeader(dataView);

    let jsonStr = DependencyDataUtils.All.getJsonStr(jsonByteLength, rab);

    let resourceAssetBundleContent: RABType.resourceAssetBundleContent =
      jsonStr |> Js.Json.parseExn |> Obj.magic;

    (
      _buildImageNameMap(
        rabRelativePath,
        resourceAssetBundleContent,
        allRabDepdentImageNameMap,
      ),
      _buildGeometryNameMap(
        rabRelativePath,
        resourceAssetBundleContent,
        allRabDependentGeometryNameMap,
      ),
    );
  };
};

module SAB = {
  let _buildImageNameMap =
      (
        sabRelativePath,
        {images}: SABType.sceneAssetBundleContent,
        allSabDependentImageNameMap,
      ) =>
    switch (images) {
    | None => allSabDependentImageNameMap
    | Some(images) =>
      images
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. nameMap, {name}: WDType.image) =>
             nameMap
             |> WonderCommonlib.ImmutableHashMapService.set(name, true),
           WonderCommonlib.ImmutableHashMapService.createEmpty(),
         )
      |> WonderCommonlib.ImmutableHashMapService.set(
           sabRelativePath,
           _,
           allSabDependentImageNameMap,
         )
    };

  let _buildGeometryNameMap =
      (
        sabRelativePath,
        {geometrys}: SABType.sceneAssetBundleContent,
        allSabDependentGeometryNameMap,
      ) =>
    geometrys
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. nameMap, geometryData) =>
           geometryData |> OptionService.isJsonSerializedValueNone ?
             nameMap :
             {
               let {name}: WDType.geometry =
                 geometryData |> OptionService.unsafeGetJsonSerializedValue;

               nameMap
               |> WonderCommonlib.ImmutableHashMapService.set(name, true);
             },
         WonderCommonlib.ImmutableHashMapService.createEmpty(),
       )
    |> WonderCommonlib.ImmutableHashMapService.set(
         sabRelativePath,
         _,
         allSabDependentGeometryNameMap,
       );

  let buildImageAndGeometryNameMap =
      (
        (sabRelativePath, sab),
        (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
      ) => {
    let (wdFileContent, _, _) =
      BufferUtils.decodeWDB(sab, AssembleWholeWDBSystem.checkWDB);

    let sceneAssetBundleContent: SABType.sceneAssetBundleContent =
      wdFileContent |> Js.Json.parseExn |> Obj.magic;

    (
      _buildImageNameMap(
        sabRelativePath,
        sceneAssetBundleContent,
        allSabDependentImageNameMap,
      ),
      _buildGeometryNameMap(
        sabRelativePath,
        sceneAssetBundleContent,
        allSabDependentGeometryNameMap,
      ),
    );
  };
};

let buildImageAndGeometryNameMap = (sabDataArr, rabDataArr) =>
  (
    sabDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
           sabData,
         ) =>
           SAB.buildImageAndGeometryNameMap(
             sabData,
             (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
           ),
         (
           WonderCommonlib.ImmutableHashMapService.createEmpty(),
           WonderCommonlib.ImmutableHashMapService.createEmpty(),
         ),
       ),
    rabDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
           rabData,
         ) =>
           RAB.buildImageAndGeometryNameMap(
             rabData,
             (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
           ),
         (
           WonderCommonlib.ImmutableHashMapService.createEmpty(),
           WonderCommonlib.ImmutableHashMapService.createEmpty(),
         ),
       ),
  )
  |> WonderLog.Contract.ensureCheck(
       (
         (
           (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
           (allRabDependentImageNameMap, allRabDependentGeometryNameMap),
         ),
       ) => {
         open WonderLog;
         open Contract;
         open Operators;

         let _judge = allDependentNameMap =>
           allDependentNameMap
           |> WonderCommonlib.ImmutableHashMapService.getValidValues
           |> WonderCommonlib.ArrayService.forEach((. nameMap) =>
                nameMap
                |> ImmutableHashMapService.getValidKeys
                |> ArrayService.hasDuplicateItems((. item) => item)
                |> assertFalse
              );

         test(
           Log.buildAssertMessage(
             ~expect={j|one dependent sab->image has no duplicate name|j},
             ~actual={j|has|j},
           ),
           () =>
           _judge(allSabDependentImageNameMap)
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|one dependent sab->geometry has no duplicate name|j},
             ~actual={j|has|j},
           ),
           () =>
           _judge(allSabDependentGeometryNameMap)
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|one dependent rab->image has no duplicate name|j},
             ~actual={j|has|j},
           ),
           () =>
           _judge(allRabDependentImageNameMap)
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|one dependent rab->geometry has no duplicate name|j},
             ~actual={j|has|j},
           ),
           () =>
           _judge(allRabDependentGeometryNameMap)
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let rec _find =
        (abRelativePath, dependencyRelation, allDependentAbRelativePathArr) =>
  switch (
    dependencyRelation
    |> WonderCommonlib.ImmutableHashMapService.get(abRelativePath)
  ) {
  | None => allDependentAbRelativePathArr
  | Some(abRelativePathArr) =>
    abRelativePathArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. allDependentAbRelativePathArr, abRelativePath) =>
           _find(
             abRelativePath,
             dependencyRelation,
             allDependentAbRelativePathArr
             |> ArrayService.push(abRelativePath),
           ),
         allDependentAbRelativePathArr,
       )
  };

let findAllDependencyRAbRelativePath = (abRelativePath, dependencyRelation) =>
  _find(
    abRelativePath,
    dependencyRelation,
    WonderCommonlib.ArrayService.createEmpty(),
  );