open DependencyDataType;

/* let _findDependencyBetweenSABAndRAB = (dependencyRelation, (sabDataArr, rabDataArr), state) => {



   };

   let _findDependencyBetweenRAB = (dependencyRelation, (sabDataArr, rabDataArr), state) => {



   }; */

/* let _isCircle = (isCircleOpt) => {
   switch(isCircleOpt ){
   | None => false
   }
   }; */

/* TODO need test */
let rec _isCircleDependency =
        (dependencyRelation, recordedAbPathArr, isCircleOpt, abPathArr) =>
  switch (isCircleOpt) {
  | Some(isCircle) => (isCircle, recordedAbPathArr)
  | None =>
    ArrayService.hasDuplicateItems((. item) => item, recordedAbPathArr) ?
      (true, recordedAbPathArr) :
      abPathArr
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
             | Some(abPathArr) =>
               _isCircleDependency(
                 dependencyRelation,
                 ArrayService.fastConcat(recordedAbPathArr, abPathArr),
                 None,
                 abPathArr,
               )
             },
           (false, recordedAbPathArr),
         )
  };

let checkCircleDependency = dependencyRelation =>
  dependencyRelation
  |> WonderCommonlib.ImmutableHashMapService.getValidValues
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. isCircle, abPathArr) =>
         isCircle ?
           isCircle :
           {
             let (isCircle, recordedAbPathArr) =
               _isCircleDependency(
                 dependencyRelation,
                 WonderCommonlib.ArrayService.createEmpty(),
                 None,
                 abPathArr,
               );

             isCircle;
           },
       false,
     );

let _createDependencyRelation = () =>
  WonderCommonlib.ImmutableHashMapService.createEmpty();

let calcWholeDependencyRelation =
    ({imageDependencyRelation, geometryDependencyRelation}) =>
  ArrayService.fastConcat(
    imageDependencyRelation |> ImmutableHashMapService.getValidKeys,
    geometryDependencyRelation |> ImmutableHashMapService.getValidKeys,
  )
  |> ArrayService.removeDuplicateItems((. item) => item)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. wholeDependencyRelation, abRelativePath) =>
         wholeDependencyRelation
         |> WonderCommonlib.ImmutableHashMapService.set(
              abRelativePath,
              imageDependencyRelation
              |> WonderCommonlib.ImmutableHashMapService.get(abRelativePath)
              |> Js.Option.getWithDefault(
                   geometryDependencyRelation
                   |> WonderCommonlib.ImmutableHashMapService.unsafeGet(
                        abRelativePath,
                      ),
                 ),
            ),
       _createDependencyRelation(),
     );