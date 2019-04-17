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

let checkCircleDependency = dependencyRelation =>
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
     );

/* let _createDependencyRelation = () =>
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
        ); */

module RAB = {
  open Js.Typed_array;

  let readHeader = dataView => {
    let (jsonByteLength, byteOffset) =
      DataViewCommon.getUint32_1(. 0, dataView);

    let (bufferByteLength, byteOffset) =
      DataViewCommon.getUint32_1(. byteOffset, dataView);

    (byteOffset, jsonByteLength, bufferByteLength);
  };

  let getJsonStr = (jsonByteLength, rab) => {
    let decoder = TextDecoder.newTextDecoder("utf-8");

    decoder
    |> TextDecoder.decodeUint8Array(
         Uint8Array.fromBufferRange(
           rab,
           ~offset=GenerateABUtils.getHeaderTotalByteLength(),
           ~length=jsonByteLength,
         ),
       );
  };

  let getBuffer = (jsonByteLength, rab) =>
    rab
    |> ArrayBuffer.sliceFrom(
         GenerateABUtils.getHeaderTotalByteLength()
         + jsonByteLength
         |> BufferUtils.alignedLength,
       );
};

module SAB = {};