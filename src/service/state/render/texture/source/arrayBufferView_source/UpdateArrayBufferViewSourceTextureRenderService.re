open StateRenderType;

open RenderArrayBufferViewSourceTextureType;

open AllBrowserDetectType;

/* let _setUnpackAlignmentaToOne = [%bs.raw
     {|
            function(gl){

        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            }
            |}
   ]; */

let _drawTexture =
    (gl, (target, index, source, glFormat, glType), (width, height)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|width/height shouldn't be 0|j},
                ~actual={j|width is $width; height is $height|j},
              ),
              () => {
                width <>= 0;
                height <>= 0;
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  /* _setUnpackAlignmentaToOne(gl); */
  gl
  |> WonderWebgl.Gl.texImage2DWithArrayBufferView(
       target,
       index,
       glFormat,
       width,
       height,
       0,
       glFormat,
       glType,
       source,
     );
};

let _drawTwoDTexture = (gl, (target, glFormat, glType), sizeTuple, source) =>
  _drawTexture(gl, (target, 0, source, glFormat, glType), sizeTuple);

let _allocateSourceToTexture = (sizeTuple, gl, paramTuple, source) =>
  _drawTwoDTexture(gl, paramTuple, sizeTuple, source);

let update =
    (
      gl,
      (texture, textureInTypeArray),
      (arrayBufferViewSourceTextureRecord, browserDetectRecord),
    ) => {
  let {
    sourceMap,
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
    widths,
    heights,
    setFlipYFunc,
  } = arrayBufferViewSourceTextureRecord;

  switch (TextureSourceMapService.getSource(texture, sourceMap)) {
  | None => (arrayBufferViewSourceTextureRecord, browserDetectRecord)
  | Some(source) =>
    let width =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.getWidth(
        textureInTypeArray,
        widths,
      );
    let height =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.getHeight(
        textureInTypeArray,
        heights,
      );
    let glWrapS =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.getWrapS(
        textureInTypeArray,
        wrapSs,
      )
      |> TextureType.uint8ToWrap
      |> TextureWrapService.getGlWrap(gl);
    let glWrapT =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.getWrapT(
        textureInTypeArray,
        wrapTs,
      )
      |> TextureType.uint8ToWrap
      |> TextureWrapService.getGlWrap(gl);
    let magFilter =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.getMagFilter(
        textureInTypeArray,
        magFilters,
      )
      |> TextureType.uint8ToFilter;
    let minFilter =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.getMinFilter(
        textureInTypeArray,
        minFilters,
      )
      |> TextureType.uint8ToFilter;
    let glFormat =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.getFormat(
        textureInTypeArray,
        formats,
      )
      |> TextureType.uint8ToFormat
      |> TextureFormatService.getGlFormat(gl);
    let glType =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.getType(
        textureInTypeArray,
        types,
      )
      |> TextureTypeService.getGlType(gl);
    let flipY =
      OperateTypeArrayAllArrayBufferViewSourceTextureService.isFlipY(
        textureInTypeArray,
        flipYs,
      );
    let target = WonderWebgl.Gl.getTexture2D(gl);
    UpdateGLTextureRenderService.update(
      (gl, textureInTypeArray, source),
      (
        width,
        height,
        glWrapS,
        glWrapT,
        magFilter,
        minFilter,
        glFormat,
        glType,
        flipY,
        target,
      ),
      (isNeedUpdates, browserDetectRecord),
      (_allocateSourceToTexture((width, height)), setFlipYFunc),
    );
    (arrayBufferViewSourceTextureRecord, browserDetectRecord);
  };
};

let isNeedUpdate = (textureInTypeArray, arrayBufferViewSourceTextureRecord) =>
  UpdateTextureRenderService.isNeedUpdate(
    textureInTypeArray,
    BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate(),
    arrayBufferViewSourceTextureRecord.isNeedUpdates,
    OperateTypeArrayAllArrayBufferViewSourceTextureService.getIsNeedUpdate,
  );