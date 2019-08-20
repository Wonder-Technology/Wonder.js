open StateDataMainType;

open SceneGraphType;

module ExtendData = {
  let _buildCustomControlData = state => {
    funcMap:
      ExtendIMGUIMainService.ExtendData.CustomControl.getFuncMap(state)
      |> SerializeAllIMGUIService.CustomControl.serializeFuncMap,
  };

  let _buildSkinData = state: SceneGraphType.skinData => {
    allSkinDataMap:
      ExtendIMGUIMainService.ExtendData.Skin.getAllSkinDataMap(state)
      |> SerializeAllIMGUIService.Skin.serializeAllSkinDataMap,
  };

  let buildExtendData = state => {
    customControlData: _buildCustomControlData(state),
    skinData: _buildSkinData(state),
  };
};

module AssetData = {
  open Js.Typed_array;

  let _addBufferData =
      (
        (alignedByteLength, byteLength),
        data,
        (
          (totalByteLength, byteOffset, bufferViewDataArr),
          assetArrayBufferDataArr,
        ),
      ) => (
    (
      totalByteLength + alignedByteLength,
      byteOffset + alignedByteLength,
      bufferViewDataArr
      |> ArrayService.push(
           {buffer: 0, byteOffset, byteLength}: GenerateSceneGraphType.bufferViewData,
         ),
    ),
    assetArrayBufferDataArr
    |> ArrayService.push(
         {byteOffset, arrayBuffer: data}: GenerateSceneGraphType.imguiAssetData,
       ),
  );

  let _buildBitmapData =
      (
        state,
        (
          (totalByteLength, byteOffset, bufferViewDataArr),
          assetArrayBufferDataArr,
        ),
      ) => {
    let data = SetAssetIMGUIMainService.unsafeGetSettedAssetBitmapData(state);

    let byteLength = ArrayBuffer.byteLength(data);
    let alignedByteLength = byteLength |> BufferUtils.alignedLength;

    (
      {bufferView: bufferViewDataArr |> Js.Array.length},
      _addBufferData(
        (alignedByteLength, byteLength),
        data,
        (
          (totalByteLength, byteOffset, bufferViewDataArr),
          assetArrayBufferDataArr,
        ),
      ),
    );
  };

  let _buildCustomImagesData =
      (
        state,
        (
          (totalByteLength, byteOffset, bufferViewDataArr),
          assetArrayBufferDataArr,
        ),
      ) =>
    SetAssetIMGUIMainService.getSettedAssetCustomImageDataArr(state)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             customImages,
             (
               (totalByteLength, byteOffset, bufferViewDataArr),
               assetArrayBufferDataArr,
             ),
           ),
           (arrayBuffer, id, mimeType),
         ) => {
           let byteLength = ArrayBuffer.byteLength(arrayBuffer);
           let alignedByteLength = byteLength |> BufferUtils.alignedLength;

           (
             customImages
             |> ArrayService.push({
                  id,
                  mimeType,
                  bufferView: bufferViewDataArr |> Js.Array.length,
                }),
             _addBufferData(
               (alignedByteLength, byteLength),
               arrayBuffer,
               (
                 (totalByteLength, byteOffset, bufferViewDataArr),
                 assetArrayBufferDataArr,
               ),
             ),
           );
         },
         (
           WonderCommonlib.ArrayService.createEmpty(),
           (
             (totalByteLength, byteOffset, bufferViewDataArr),
             assetArrayBufferDataArr,
           ),
         ),
       );

  let _hasFontData = state =>
    SetAssetIMGUIMainService.getSettedAssetFntData(state) |> Js.Option.isSome;

  let _hasCustomImagesData = state =>
    SetAssetIMGUIMainService.getSettedAssetCustomImageDataArr(state)
    |> Js.Array.length > 0;

  let buildAssetData =
      (state, (totalByteLength, byteOffset, bufferViewDataArr)) => {
    let assetArrayBufferDataArr = WonderCommonlib.ArrayService.createEmpty();

    let (
      fontData,
      (
        (totalByteLength, byteOffset, bufferViewDataArr),
        assetArrayBufferDataArr,
      ),
    ) =
      _hasFontData(state) ?
        {
          let (
            bitmapData,
            (
              (totalByteLength, byteOffset, bufferViewDataArr),
              assetArrayBufferDataArr,
            ),
          ) =
            _buildBitmapData(
              state,
              (
                (totalByteLength, byteOffset, bufferViewDataArr),
                assetArrayBufferDataArr,
              ),
            );

          (
            Some({
              fntData: {
                content:
                  SetAssetIMGUIMainService.unsafeGetSettedAssetFntData(state),
              },
              bitmapData,
            }),
            (
              (totalByteLength, byteOffset, bufferViewDataArr),
              assetArrayBufferDataArr,
            ),
          );
        } :
        (
          None,
          (
            (totalByteLength, byteOffset, bufferViewDataArr),
            assetArrayBufferDataArr,
          ),
        );

    let (
      customImagesData,
      (
        (totalByteLength, byteOffset, bufferViewDataArr),
        assetArrayBufferDataArr,
      ),
    ) =
      _hasCustomImagesData(state) ?
        {
          let (
            customImages,
            (
              (totalByteLength, byteOffset, bufferViewDataArr),
              assetArrayBufferDataArr,
            ),
          ) =
            _buildCustomImagesData(
              state,
              (
                (totalByteLength, byteOffset, bufferViewDataArr),
                assetArrayBufferDataArr,
              ),
            );

          (
            Some({customImages: customImages}),
            (
              (totalByteLength, byteOffset, bufferViewDataArr),
              assetArrayBufferDataArr,
            ),
          );
        } :
        (
          None,
          (
            (totalByteLength, byteOffset, bufferViewDataArr),
            assetArrayBufferDataArr,
          ),
        );

    (
      {fontData, customImagesData},
      (
        (totalByteLength, byteOffset, bufferViewDataArr),
        assetArrayBufferDataArr,
      ),
    );
  };
};

let build = (state, (totalByteLength, byteOffset, bufferViewDataArr)) => (
  ManageIMGUIMainService.getCustomData(state)
  |> SerializeService.serializeValueWithFunction,
  switch (ManageIMGUIMainService.getIMGUIFunc(state)) {
  | None => None
  | Some(imguiFunc) => imguiFunc |> SerializeService.serializeFunction
  },
  ExtendData.buildExtendData(state),
  AssetData.buildAssetData(
    state,
    (totalByteLength, byteOffset, bufferViewDataArr),
  ),
);