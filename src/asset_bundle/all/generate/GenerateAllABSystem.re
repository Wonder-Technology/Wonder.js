open WonderBsMost;

/* open DependencyDataType; */

/* TODO need test */
let rec _isCircleDependency =
        (
          dependencyRelation,
          recordedAbPathArr,
          isCircleOpt,
          abRelativePathArr,
        ) =>
  switch (isCircleOpt) {
  | Some(isCircle) => (isCircle, recordedAbPathArr)
  | None =>
    ArrayService.hasDuplicateItems((. item) => item, recordedAbPathArr) ?
      (true, recordedAbPathArr) :
      abRelativePathArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. (isCircle, recordedAbPathArr), abRelativePath) =>
             switch (
               dependencyRelation
               |> WonderCommonlib.ImmutableHashMapService.get(abRelativePath)
             ) {
             | None =>
               _isCircleDependency(
                 dependencyRelation,
                 recordedAbPathArr,
                 Some(false),
                 [||],
               )
             | Some(abRelativePathArr) =>
               _isCircleDependency(
                 dependencyRelation,
                 ArrayService.fastConcat(
                   recordedAbPathArr,
                   abRelativePathArr,
                 ),
                 None,
                 abRelativePathArr,
               )
             },
           (false, recordedAbPathArr),
         )
  };

let _checkCircleDependency = dependencyRelation =>
  dependencyRelation
  |> WonderCommonlib.ImmutableHashMapService.getValidValues
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. isCircle, abRelativePathArr) =>
         isCircle ?
           isCircle :
           {
             let (isCircle, recordedAbPathArr) =
               _isCircleDependency(
                 dependencyRelation,
                 WonderCommonlib.ArrayService.createEmpty(),
                 None,
                 abRelativePathArr,
               );

             isCircle;
           },
       false,
     ) ?
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="GenerateABArrSystem->generate",
        ~description={j|dependencyRelation shouldn't be circle|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    ) :
    ();

/* let _checkSABDependencyRelation = () => {

   }; */

let generate = (dependencyRelation, (sabDataArr, rabDataArr), state) => {
  _checkCircleDependency(dependencyRelation);

  RemoveDependencyDataSystem.removeDuplicateBufferData(
    dependencyRelation,
    FindDependencyDataSystem.buildImageAndGeometryNameMap(
      sabDataArr,
      rabDataArr,
    ),
    (sabDataArr, rabDataArr),
  )
  |> ManifestDataSystem.addManifestData(dependencyRelation)
  |> Most.map(((wholeHashIdMap, newRabDataArr, newSabDataArr)) =>
       (
         GenerateWABSystem.generate(dependencyRelation, wholeHashIdMap),
         newRabDataArr,
         newSabDataArr,
       )
     );
};