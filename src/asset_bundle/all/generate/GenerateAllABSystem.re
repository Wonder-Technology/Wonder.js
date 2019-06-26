open WonderBsMost;

let buildDependencyRelation = dependencyRelationArrArr =>
  dependencyRelationArrArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. relationMap, dependencyRelationArr) =>
         relationMap
         |> WonderCommonlib.ImmutableHashMapService.set(
              dependencyRelationArr |> ArrayService.unsafeGetFirst,
              dependencyRelationArr |> Js.Array.sliceFrom(1),
            ),
       WonderCommonlib.ImmutableHashMapService.createEmpty(),
     );

let generate = (dependencyRelation, (sabDataArr, rabDataArr)) =>
  RemoveDependencyDataSystem.removeDuplicateBufferData(
    dependencyRelation,
    FindDependencyDataSystem.buildImageAndGeometryNameMap(rabDataArr),
    (sabDataArr, rabDataArr),
  )
  |> ManifestDataSystem.addManifestData(dependencyRelation)
  |> Most.map(((wholeHashIdMap, newRabDataArr, newSabDataArr)) =>
       (
         GenerateWABSystem.generate(
           Copyright.getVersion(),
           dependencyRelation,
           wholeHashIdMap,
         ),
         newRabDataArr,
         newSabDataArr,
       )
     );