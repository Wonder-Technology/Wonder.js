open StateDataMainType;

open WDType;

open Js.Typed_array;

open Js.Promise;

let _getSourcePath = (filePath, sourceRelativePath) =>
  PathService.resolve(filePath, sourceRelativePath);

let _buildImageArray = (images: array(image)) => {
  let imageArr = [||];
  images
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. streamArr, {uri}: image) =>
         switch (ConvertCommon.isBase64(uri)) {
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
                LoadImageSystem.loadBase64Image(uri)
                |> Most.tap(image =>
                     imageArr |> ArrayService.push(image) |> ignore
                   ),
              )
         },
       [||],
     )
  |> Most.mergeArray
  |> Most.drain
  |> then_(() => imageArr |> resolve);
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
       (. arrayBufferArr, {uri}: buffer) =>
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
         },
       [||],
     );

let assemble = ({indices, buffers, images} as wdRecord, state) =>
  _buildImageArray(images)
  |> then_(imageArr =>
       BatchCreateSystem.batchCreate(wdRecord, state)
       |> BatchOperateSystem.batchOperate(
            wdRecord,
            imageArr,
            _buildBufferArray(buffers),
          )
       |> BuildSceneGameObjectSystem.build(wdRecord)
       |> resolve
     )
  |> Most.fromPromise;