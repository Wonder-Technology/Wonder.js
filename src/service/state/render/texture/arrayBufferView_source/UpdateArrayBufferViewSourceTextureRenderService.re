open StateRenderType;

open RenderArrayBufferViewSourceTextureType;

open BrowserDetectType;

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
      OperateTypeArrayArrayBufferViewSourceTextureService.getWidth(
        textureInTypeArray,
        widths,
      );
    let height =
      OperateTypeArrayArrayBufferViewSourceTextureService.getHeight(
        textureInTypeArray,
        heights,
      );
    let glWrapS =
      OperateTypeArrayArrayBufferViewSourceTextureService.getWrapS(
        textureInTypeArray,
        wrapSs,
      )
      |> SourceTextureType.uint8ToWrap
      |> TextureWrapService.getGlWrap(gl);
    let glWrapT =
      OperateTypeArrayArrayBufferViewSourceTextureService.getWrapT(
        textureInTypeArray,
        wrapTs,
      )
      |> SourceTextureType.uint8ToWrap
      |> TextureWrapService.getGlWrap(gl);
    let magFilter =
      OperateTypeArrayArrayBufferViewSourceTextureService.getMagFilter(
        textureInTypeArray,
        magFilters,
      )
      |> SourceTextureType.uint8ToFilter;
    let minFilter =
      OperateTypeArrayArrayBufferViewSourceTextureService.getMinFilter(
        textureInTypeArray,
        minFilters,
      )
      |> SourceTextureType.uint8ToFilter;
    let glFormat =
      OperateTypeArrayArrayBufferViewSourceTextureService.getFormat(
        textureInTypeArray,
        formats,
      )
      |> SourceTextureType.uint8ToFormat
      |> TextureFormatService.getGlFormat(gl);
    let glType =
      OperateTypeArrayArrayBufferViewSourceTextureService.getType(
        textureInTypeArray,
        types,
      )
      |> TextureTypeService.getGlType(gl);
    let flipY =
      OperateTypeArrayArrayBufferViewSourceTextureService.isFlipY(
        textureInTypeArray,
        flipYs,
      );
    let target = WonderWebgl.Gl.getTexture2D(gl);
    UpdateSourceTextureRenderService.update(
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
  UpdateSourceTextureRenderService.isNeedUpdate(
    textureInTypeArray,
    BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate(),
    arrayBufferViewSourceTextureRecord.isNeedUpdates,
    OperateTypeArrayArrayBufferViewSourceTextureService.getIsNeedUpdate,
  );