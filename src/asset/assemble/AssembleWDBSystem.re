open StateDataMainType;

open WDType;

open Js.Typed_array;

open Js.Promise;

/* let _getSourcePath = (filePath, sourceRelativePath) =>
   PathService.resolve(filePath, sourceRelativePath); */

let _getArrayBuffer = (binBuffer, bufferView, bufferViews: array(bufferView)) => {
  let {byteOffset, byteLength}: bufferView =
    Array.unsafe_get(bufferViews, bufferView);

  binBuffer
  |> Js.Typed_array.ArrayBuffer.slice(
       ~start=byteOffset,
       ~end_=byteOffset + byteLength,
     );
};

let _buildImageArray = ({images, bufferViews}: wd, binBuffer) => {
  let blobObjectUrlImageArr = [||];

  (
    images |> OptionService.isJsonSerializedValueNone ?
      blobObjectUrlImageArr :
      images
      |> OptionService.unsafeGetJsonSerializedValue
      |> WonderCommonlib.ArrayService.reduceOneParami(
           (. streamArr, {bufferView, mimeType}: image, imageIndex) => {
             let arrayBuffer =
               _getArrayBuffer(binBuffer, bufferView, bufferViews);

             let blob = Blob.newBlobFromArrayBuffer(arrayBuffer, mimeType);

             streamArr
             |> ArrayService.push(
                  LoadImageSystem.loadBlobImage(
                    blob |> Blob.createObjectURL,
                    {j|load image error. imageIndex: $imageIndex|j},
                  )
                  |> WonderBsMost.Most.tap(image => {
                       Blob.revokeObjectURL(blob);

                       blobObjectUrlImageArr
                       |> ArrayService.push(image)
                       |> ignore;
                     }),
                );
           },
           [||],
         )
  )
  |> WonderBsMost.Most.mergeArray
  |> WonderBsMost.Most.drain
  |> then_(() => blobObjectUrlImageArr |> resolve);
};

/* let _decodeArrayBuffer = (base64Str: string) => {
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
   }; */

let _buildBufferArray = (buffers: array(int), binBuffer) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      let bufferLen = buffers |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|has only one buffer|j},
          ~actual={j|has $bufferLen|j},
        ),
        () =>
        bufferLen == 1
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  [|binBuffer|];
};
/* buffers
   |> WonderCommonlib.ArrayService.reduceOneParam(
        (. arrayBufferArr, byteLength) =>
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
      ); */

/* let assemble = ({indices, buffers, uriImages, blobImages} as wd, state) =>
   _buildImageArray(uriImages, blobImages)
   |> then_(imageArrTuple =>
        BatchCreateSystem.batchCreate(wd, state)
        |> BatchOperateSystem.batchOperate(
             wd,
             imageArrTuple,
             _buildBufferArray(buffers),
           )
        |> BuildRootGameObjectSystem.build(wd)
        |> resolve
      )
   |> WonderBsMost.Most.fromPromise; */

let _checkWDB = dataView => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      test(
        Log.buildAssertMessage(
          ~expect={j|Source file to be a WDB (wd Binary) model|j},
          ~actual={j|not|j},
        ),
        () => {
          let (value, _) = DataViewCommon.getUint32_1(. 0, dataView);

          value == 0x46546C68;
        },
      );

      let (readVersion, _) = DataViewCommon.getUint32_1(. 4, dataView);

      test(
        Log.buildAssertMessage(
          ~expect={j|Only WDB version 1 is supported|j},
          ~actual={j|Detected version: $readVersion|j},
        ),
        () =>
        readVersion == 1
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  dataView;
};

let assembleGLBData = (({buffers}: wd) as wd, binBuffer, state) =>
  _buildImageArray(wd, binBuffer)
  |> then_(blobObjectUrlImageArr =>
       BatchCreateSystem.batchCreate(wd, state)
       |> BatchOperateSystem.batchOperate(
            wd,
            blobObjectUrlImageArr,
            _buildBufferArray(buffers, binBuffer),
          )
       |> BuildRootGameObjectSystem.build(wd)
       |> resolve
     )
  |> WonderBsMost.Most.fromPromise;

let assemble = (wdb, state) => {
  let (wdFileContent, binBuffer) = BinaryUtils.decode(wdb, _checkWDB);

  assembleGLBData(
    wdFileContent |> Js.Json.parseExn |> Obj.magic,
    binBuffer,
    state,
  );
};