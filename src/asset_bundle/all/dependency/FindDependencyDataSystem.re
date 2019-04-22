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
        allRabGeometryNameMap,
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
         allRabGeometryNameMap,
       );

  let buildImageAndGeometryNameMap =
      (
        (rabRelativePath, rab),
        (allRabDepdentImageNameMap, allRabGeometryNameMap),
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
        allRabGeometryNameMap,
      ),
    );
  };
};

let buildImageAndGeometryNameMap = rabDataArr =>
  rabDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (allRabImageNameMap, allRabGeometryNameMap), rabData) =>
         RAB.buildImageAndGeometryNameMap(
           rabData,
           (allRabImageNameMap, allRabGeometryNameMap),
         ),
       (
         WonderCommonlib.ImmutableHashMapService.createEmpty(),
         WonderCommonlib.ImmutableHashMapService.createEmpty(),
       ),
     )
  |> WonderLog.Contract.ensureCheck(
       ((allRabImageNameMap, allRabGeometryNameMap)) => {
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
             ~expect={j|one dependent rab->image has no duplicate name|j},
             ~actual={j|has|j},
           ),
           () =>
           _judge(allRabImageNameMap)
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|one dependent rab->geometry has no duplicate name|j},
             ~actual={j|has|j},
           ),
           () =>
           _judge(allRabGeometryNameMap)
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