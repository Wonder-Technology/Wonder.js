open StateDataMainType;

open WDType;

open Js.Typed_array;

open Js.Promise;

let _getSourcePath = (filePath, sourceRelativePath) =>
  PathService.resolve(filePath, sourceRelativePath);

let _buildImageArray = (uriImages, uint8ArrayImages) => {
  let imageBase64Arr = [||];
  let imageUint8ArrayArr = [||];

  (
    switch (uriImages) {
    | Some(uriImages) =>
      uriImages
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. streamArr, {uriBase64}: uriImage) =>
             switch (ConvertCommon.isBase64(uriBase64)) {
             | false =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_buildImageArray",
                   ~description={j|only support base64 uri|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j},
                 ),
               )
             | true =>
               streamArr
               |> ArrayService.push(
                    LoadImageSystem.loadBase64Image(uriBase64)
                    |> Most.tap(image =>
                         imageBase64Arr |> ArrayService.push(image) |> ignore
                       ),
                  )
             },
           [||],
         )

    | None =>
      uint8ArrayImages
      |> OptionService.unsafeGet
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. streamArr, uint8ArrayImage) => {
             imageUint8ArrayArr
             |> ArrayService.push(uint8ArrayImage)
             |> ignore;
             streamArr;
           },
           [||],
         )
    }
  )
  |> Most.mergeArray
  |> Most.drain
  |> then_(() =>
       (imageBase64Arr, imageUint8ArrayArr)
       |> AssembleCommon.getOnlyHasOneTypeImage(uriImages, uint8ArrayImages)
       |> resolve
     );
};

let _decodeArrayBuffer = (base64Str: string) => {
  open Js.Typed_array;
  let arr = base64Str |> Js.String.split(",");
  let base64 = arr |> Js.Array.length > 1 ? arr[1] : arr[0];
  let decodedString = File.atob(base64);
  let bufferLength = decodedString |> Js.String.length;
  let arrayBuffer = ArrayBuffer.make(bufferLength);
  let typeArr = Uint8Array.fromBuffer(arrayBuffer);

  for (i in 0 to bufferLength - 1) {
    Uint8Array.unsafe_set(
      typeArr,
      i,
      decodedString |> Js.String.charCodeAt(i) |> Obj.magic,
    );
  };

  typeArr |> Uint8Array.buffer;
};

let _buildBufferArray = (buffers: array(buffer)) =>
  buffers
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arrayBufferArr, {uri, buffer}: buffer) =>
         switch (uri) {
         | Some(uri) =>
           switch (ConvertCommon.isBase64(uri)) {
           | false =>
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="_buildBufferArray",
                 ~description={j|only support base64 uri|j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j},
               ),
             )
           | true =>
             arrayBufferArr |> ArrayService.push(_decodeArrayBuffer(uri))
           }
         | None =>
           arrayBufferArr
           |> ArrayService.push(buffer |> OptionService.unsafeGet)
         },
       [||],
     );

let assemble =
    ({indices, buffers, uriImages, uint8ArrayImages} as wdRecord, state) =>
  _buildImageArray(uriImages, uint8ArrayImages)
  |> then_(imageArrTuple =>
       BatchCreateSystem.batchCreate(wdRecord, state)
       |> BatchOperateSystem.batchOperate(
            wdRecord,
            imageArrTuple,
            _buildBufferArray(buffers),
          )
       |> BuildSceneGameObjectSystem.build(wdRecord)
       |> resolve
     )
  |> Most.fromPromise;