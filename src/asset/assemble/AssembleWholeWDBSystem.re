open StateDataMainType;

open WDType;

open Js.Typed_array;

open Js.Promise;

open WonderBsMost;

/* let _getSourcePath = (filePath, sourceRelativePath) =>
   PathService.resolve(filePath, sourceRelativePath); */

let _buildImageArray = (isLoadImage, {images, bufferViews}: wd, binBuffer) => {
  let blobObjectUrlImageArr = [||];
  let imageUint8ArrayDataMap =
    WonderCommonlib.MutableSparseMapService.createEmpty();

  !isLoadImage ?
    resolve((blobObjectUrlImageArr, imageUint8ArrayDataMap)) :
    (
      images |> OptionService.isJsonSerializedValueNone ?
        blobObjectUrlImageArr :
        images
        |> OptionService.unsafeGetJsonSerializedValue
        |> ArrayService.reduceOneParamValidi(
             (. streamArr, {name, bufferView, mimeType}: image, imageIndex) => {
               let arrayBuffer =
                 AssembleCommon.getArrayBuffer(
                   binBuffer,
                   bufferView,
                   bufferViews,
                 );

               imageUint8ArrayDataMap
               |> WonderCommonlib.MutableSparseMapService.set(
                    imageIndex,
                    (mimeType, Uint8Array.fromBuffer(arrayBuffer)),
                  )
               |> ignore;

               streamArr
               |> ArrayService.push(
                    AssembleUtils.buildLoadImageStream(
                      arrayBuffer,
                      mimeType,
                      {j|load image error. imageName: $name|j},
                    )
                    |> Most.tap(image => {
                         ImageUtils.setImageName(image, name);

                         Array.unsafe_set(
                           blobObjectUrlImageArr,
                           imageIndex,
                           image,
                         );
                       }),
                  );
             },
             [||],
           )
    )
    |> Most.mergeArray
    |> Most.drain
    |> then_(() => (blobObjectUrlImageArr, imageUint8ArrayDataMap) |> resolve);
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

let checkWDB = dataView => {
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

let assembleWDBData =
    (
      ({buffers}: wd) as wd,
      binBuffer,
      (
        isHandleIMGUI,
        isBindEvent,
        isActiveCamera,
        isRenderLight,
        isLoadImage,
      ),
      state,
    ) => {
  let resultData = ref(Obj.magic(-1));

  _buildImageArray(isLoadImage, wd, binBuffer)
  |> then_(imageDataTuple => {
       resultData := imageDataTuple;

       resolve();
     })
  |> Most.fromPromise
  |> Most.merge(
       HandleIMGUISystem.handleIMGUI(isHandleIMGUI, wd, binBuffer, state),
     )
  |> Most.drain
  |> Most.fromPromise
  |> Most.map(_ => {
       let state =
         StateDataMainService.unsafeGetState(StateDataMain.stateData);

       let imageDataTuple = resultData^;

       let (
         state,
         imageUint8ArrayDataMapTuple,
         gameObjectArr,
         cubemapTextureArr,
       ) =
         state
         |> BatchCreateSystem.batchCreate(isRenderLight, wd)
         |> BatchOperateWholeSystem.batchOperate(
              wd,
              imageDataTuple,
              AssembleWholeWDBUtils.buildBufferArray(buffers, binBuffer),
              (isBindEvent, isActiveCamera),
            );

       let (state, rootGameObject) =
         BuildRootGameObjectSystem.build(wd, (state, gameObjectArr));

       let state =
         state
         |> DisposeGameObjectNotExistInSceneSystem.dispose(
              rootGameObject,
              gameObjectArr,
            );

       (
         state,
         (
           imageUint8ArrayDataMapTuple,
           HandleIMGUISystem.getHasIMGUIData(wd),
         ),
         (
           rootGameObject,
           SkyboxCubemapSystem.getSkyboxCubemap(wd, cubemapTextureArr, state),
         ),
       );
     });
};

let assemble = (wdb, configTuple, state) => {
  let (wdFileContent, streamChunk, binBuffer) =
    BufferUtils.decodeWDB(wdb, checkWDB);

  assembleWDBData(
    wdFileContent |> Js.Json.parseExn |> Obj.magic,
    binBuffer,
    configTuple,
    state,
  );
};
