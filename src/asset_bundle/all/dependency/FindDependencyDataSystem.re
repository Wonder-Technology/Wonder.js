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
      GenerateABUtils.readHeader(dataView);

    let jsonStr = GenerateABUtils.getJsonStr(jsonByteLength, rab);

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

let rec _findByDepthSearch =
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
           _findByDepthSearch(
             abRelativePath,
             dependencyRelation,
             allDependentAbRelativePathArr
             |> ArrayService.push(abRelativePath),
           ),
         allDependentAbRelativePathArr,
       )
  };

let findAllDependencyRABRelativePathByDepthSearch =
    (abRelativePath, dependencyRelation) =>
  _findByDepthSearch(
    abRelativePath,
    dependencyRelation,
    WonderCommonlib.ArrayService.createEmpty(),
  )
  |> Js.Array.reverseInPlace
  |> ArrayService.removeDuplicateItems((. item) => item);

let _isFindByBreadthSearchEnd =
    (
      thisLayerAddedDependentAbRelativePathArr,
      thisLayerRemainedDependentAbRelativePathArr,
    ) =>
  thisLayerAddedDependentAbRelativePathArr
  |> Js.Array.length === 0
  && thisLayerRemainedDependentAbRelativePathArr
  |> Js.Array.length === 0;

let _addRemainedDependentAbRelativePathToThisLayer =
    (
      dependencyRelation,
      (
        allDependentAbRelativePathArr,
        thisLayerRemainedDependentAbRelativePathArr,
        thisLayerAddedDependentAbRelativePathArr,
      ),
    ) => {
  let dependentAbRelativePath =
    thisLayerRemainedDependentAbRelativePathArr |> ArrayService.unsafeGetFirst;

  let thisLayerRemainedDependentAbRelativePathArr =
    thisLayerRemainedDependentAbRelativePathArr |> Js.Array.sliceFrom(1);

  let thisLayerAddedDependentAbRelativePathArr =
    switch (
      dependencyRelation
      |> WonderCommonlib.ImmutableHashMapService.get(dependentAbRelativePath)
    ) {
    | None => thisLayerAddedDependentAbRelativePathArr
    | Some(abRelativePathArr) =>
      ArrayService.fastConcat(
        thisLayerAddedDependentAbRelativePathArr,
        abRelativePathArr,
      )
    };

  (
    allDependentAbRelativePathArr,
    thisLayerRemainedDependentAbRelativePathArr,
    thisLayerAddedDependentAbRelativePathArr,
  );
};

let _addThisLayerAbRelativePathArrToAll =
    (
      dependencyRelation,
      (
        allDependentAbRelativePathArr,
        thisLayerRemainedDependentAbRelativePathArr,
        thisLayerAddedDependentAbRelativePathArr,
      ),
    ) => {
  let allDependentAbRelativePathArr =
    allDependentAbRelativePathArr
    |> ArrayService.push(thisLayerAddedDependentAbRelativePathArr);

  let thisLayerRemainedDependentAbRelativePathArr =
    thisLayerAddedDependentAbRelativePathArr |> Js.Array.copy;

  let thisLayerAddedDependentAbRelativePathArr =
    WonderCommonlib.ArrayService.createEmpty();

  (
    allDependentAbRelativePathArr,
    thisLayerRemainedDependentAbRelativePathArr,
    thisLayerAddedDependentAbRelativePathArr,
  );
};

let rec _findByBreadthSearch =
        (
          dependencyRelation,
          allDependentAbRelativePathArr,
          thisLayerAddedDependentAbRelativePathArr,
          thisLayerRemainedDependentAbRelativePathArr,
        ) =>
  _isFindByBreadthSearchEnd(
    thisLayerAddedDependentAbRelativePathArr,
    thisLayerRemainedDependentAbRelativePathArr,
  ) ?
    allDependentAbRelativePathArr :
    {
      let (
        allDependentAbRelativePathArr,
        thisLayerRemainedDependentAbRelativePathArr,
        thisLayerAddedDependentAbRelativePathArr,
      ) =
        thisLayerRemainedDependentAbRelativePathArr |> Js.Array.length > 0 ?
          _addRemainedDependentAbRelativePathToThisLayer(
            dependencyRelation,
            (
              allDependentAbRelativePathArr,
              thisLayerRemainedDependentAbRelativePathArr,
              thisLayerAddedDependentAbRelativePathArr,
            ),
          ) :
          _addThisLayerAbRelativePathArrToAll(
            dependencyRelation,
            (
              allDependentAbRelativePathArr,
              thisLayerRemainedDependentAbRelativePathArr,
              thisLayerAddedDependentAbRelativePathArr,
            ),
          );

      _findByBreadthSearch(
        dependencyRelation,
        allDependentAbRelativePathArr,
        thisLayerAddedDependentAbRelativePathArr,
        thisLayerRemainedDependentAbRelativePathArr,
      );
    };

let _isInclude = (dependentAbRelativePath, allRemainedDependentAbRelativePath) =>
  allRemainedDependentAbRelativePath
  |> Js.Array.filter(remainedDependentAbRelativePathArr =>
       remainedDependentAbRelativePathArr
       |> Js.Array.includes(dependentAbRelativePath)
     )
  |> Js.Array.length > 0;

let findAllDependencyRABRelativePathByBreadthSearch =
    (abRelativePath, dependencyRelation) =>
  switch (
    dependencyRelation
    |> WonderCommonlib.ImmutableHashMapService.get(abRelativePath)
  ) {
  | None => WonderCommonlib.ArrayService.createEmpty()
  | Some(dependentAbRelativePathArr) =>
    let allDependencyRABRelativePath =
      _findByBreadthSearch(
        dependencyRelation,
        WonderCommonlib.ArrayService.createEmpty(),
        WonderCommonlib.ArrayService.createEmpty(),
        dependentAbRelativePathArr,
      )
      |> Js.Array.map(dependentAbRelativePathArr =>
           dependentAbRelativePathArr
           |> ArrayService.removeDuplicateItems((. item) => item)
         );

    allDependencyRABRelativePath
    |> Js.Array.mapi((dependentAbRelativePathArr, index) => {
         let allRemainedDependentAbRelativePath =
           allDependencyRABRelativePath |> Js.Array.sliceFrom(index |> succ);

         dependentAbRelativePathArr
         |> Js.Array.filter(dependentAbRelativePath =>
              !
                _isInclude(
                  dependentAbRelativePath,
                  allRemainedDependentAbRelativePath,
                )
            );
       })
    |> Js.Array.reverseInPlace
    |> ArrayService.push(dependentAbRelativePathArr);
  };